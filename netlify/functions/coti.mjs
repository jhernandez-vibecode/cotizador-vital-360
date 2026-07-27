// =====================================================================
// Enlace corto para la cotización y la guía de reclamos
// ---------------------------------------------------------------------
// POR QUÉ EXISTE (27 jul 2026): el enlace del cliente llevaba el payload
// completo en la URL (~1000 caracteres). WhatsApp lo colapsa con "Leer
// más" y lo parte a la mitad; una clienta terminó abriendo el sitio sin
// el parámetro, cayó en el login de agentes y le apareció "Acceso
// restringido" con su propio correo. Ahora el enlace es:
//
//     https://cotizador-vital360.netlify.app/c/K7M4PQ2XRB   (~46 chars)
//
// La URL larga sigue existiendo y sigue funcionando: esto es un alias
// que redirige a ella. Los enlaces viejos NO se rompen, y el CORREO
// mantiene a propósito el enlace largo (el botón lo esconde igual, y de
// ese ?c= depende "✉ Recuperar desde Gmail" para reconstruir el
// historial). Ver SKILL.md.
//
// Modelo de seguridad: idéntico al de la URL larga — quien tiene el
// enlace ve la cotización. El id son 10 caracteres de un alfabeto de 32
// (32^10 ≈ 1,1 × 10^15 combinaciones), generados con crypto: no se
// adivina ni se enumera.
// =====================================================================

import { getStore } from '@netlify/blobs';
import { randomBytes } from 'node:crypto';

export const config = { path: ['/c', '/c/:id'] };

// Sin 0/O/1/I para que un id leído en voz alta o tecleado no se preste a confusión.
const ALFABETO  = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
const LARGO_ID  = 10;
const RE_ID     = /^[A-Z2-9]{10}$/;
const RE_B64URL = /^[A-Za-z0-9_-]+$/;
const MAX_LARGO = 12000;   // ~9 KB de JSON: una cotización real ronda los 1000

const store = () => getStore({ name: 'enlaces-cotizacion', consistency: 'strong' });

function nuevoId(){
  // 256 / 32 = 8 exacto: el módulo no introduce sesgo hacia ninguna letra.
  const bytes = randomBytes(LARGO_ID);
  let id = '';
  for(const b of bytes) id += ALFABETO[b % ALFABETO.length];
  return id;
}

function decodificar(b64url){
  let b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  while(b64.length % 4) b64 += '=';
  return JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));
}

// Solo se guarda lo que de verdad parece una cotización o una guía nuestra.
// Sin esto el endpoint sería un almacén abierto para cualquiera.
function esPayloadNuestro(tipo, b64url){
  if(typeof b64url !== 'string') return false;
  if(b64url.length < 40 || b64url.length > MAX_LARGO) return false;
  if(!RE_B64URL.test(b64url)) return false;

  let o;
  try { o = decodificar(b64url); } catch { return false; }
  if(!o || typeof o !== 'object' || Array.isArray(o)) return false;

  if(tipo === 'c'){
    return o.cliente && typeof o.cliente === 'object'
      && Array.isArray(o.asegurados)
      && Array.isArray(o.planes) && o.planes.length > 0;
  }
  if(tipo === 'p'){
    return o.agente && typeof o.agente === 'object'
      && typeof o.poliza === 'string';
  }
  return false;
}

const json = (obj, status = 200) => new Response(JSON.stringify(obj), {
  status,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
});

const irA = destino => new Response(null, {
  status: 302,
  headers: { Location: destino, 'Cache-Control': 'no-store' }
});

export default async (req, context) => {
  const id = context.params?.id;

  // ---------------------------------------------------------------
  // GET /c/:id → 302 a la URL larga de siempre
  // ---------------------------------------------------------------
  if(req.method === 'GET'){
    if(!id || !RE_ID.test(id)) return irA('/?enlace=roto');

    let reg;
    try { reg = await store().get(id, { type: 'json' }); }
    catch(e){ console.error('[coti] fallo al leer', id, e); return irA('/?enlace=roto'); }

    if(!reg || !reg.d || !RE_B64URL.test(reg.d)) return irA('/?enlace=roto');

    // El destino se arma acá, nunca sale del blob: no hay redirección abierta.
    return irA(reg.t === 'p' ? '/guia-reclamos?p=' + reg.d : '/?c=' + reg.d);
  }

  // ---------------------------------------------------------------
  // POST /c  { t:"c"|"p", d:"<base64url>" } → { id }
  // ---------------------------------------------------------------
  if(req.method === 'POST'){
    let body;
    try { body = await req.json(); }
    catch { return json({ error: 'cuerpo ilegible' }, 400); }

    const t = body?.t;
    const d = body?.d;
    if(t !== 'c' && t !== 'p')   return json({ error: 'tipo inválido' }, 400);
    if(!esPayloadNuestro(t, d))  return json({ error: 'payload inválido' }, 400);

    const s = store();
    for(let intento = 0; intento < 5; intento++){
      const nid = nuevoId();
      try {
        if(await s.get(nid)) continue;                       // colisión (improbable)
        await s.setJSON(nid, { t, d, creado: new Date().toISOString() });
        return json({ id: nid });
      } catch(e){
        console.error('[coti] fallo al guardar', e);
        return json({ error: 'no se pudo guardar' }, 500);
      }
    }
    return json({ error: 'no se pudo generar un id' }, 500);
  }

  return json({ error: 'método no permitido' }, 405);
};
