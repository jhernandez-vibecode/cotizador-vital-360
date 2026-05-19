# Cotizador Vital 360

Cotizador del seguro Vital 360 del Instituto Nacional de Seguros de Costa Rica, desarrollado por Seguros Digitales SDI.

- **Producto:** Seguro Vital 360 · Registro SUGESE P20-76-A01-1097 V3
- **Deploy:** https://vital360.appsegurosdigitales.com
- **Stack:** HTML + CSS + JS vanilla single-file, sin backend, deploy en Netlify
- **Diseño:** [docs/superpowers/specs/2026-05-18-cotizador-vital-360-design.md](docs/superpowers/specs/2026-05-18-cotizador-vital-360-design.md)
- **Plan de implementación:** [docs/superpowers/plans/2026-05-18-cotizador-vital-360-mvp.md](docs/superpowers/plans/2026-05-18-cotizador-vital-360-mvp.md)

## Uso

- **Agentes:** entrar a https://vital360.appsegurosdigitales.com, autenticarse con Google. Solo los emails en la whitelist `AGENTES` (en `index.html`) tienen acceso.
- **Clientes:** reciben un link `?c=…` por WhatsApp del agente. No requieren login.

## Desarrollo local

1. Clonar el repo
2. Abrir `index.html` con doble clic, **o**
3. Para probar la vista agente sin Google Auth: abrir `index.html?dev=1`

No requiere Node, npm, ni build step.

## Deploy

Push a `main` → Netlify hace deploy automático en 1-2 minutos.

Para el primer deploy del subdominio `vital360.appsegurosdigitales.com`:
1. En Netlify dashboard del site, configurar el dominio personalizado
2. En el DNS de `appsegurosdigitales.com`, agregar CNAME `vital360` → `<sitio-netlify>.netlify.app`

## Configurar Google OAuth (antes del primer deploy real)

1. Ir a https://console.cloud.google.com/apis/credentials
2. Crear un proyecto o usar el de Seguros Digitales
3. Crear "OAuth 2.0 Client ID" tipo "Web application"
4. Authorized JavaScript origins:
   - `https://vital360.appsegurosdigitales.com`
   - `http://localhost`
5. Copiar el Client ID y reemplazarlo en `index.html`:
   ```js
   const GOOGLE_CLIENT_ID = "TU-CLIENT-ID.apps.googleusercontent.com";
   ```

## Mantenimiento

### Actualizar tarifas

El INS actualiza tarifas 1-2 veces al año.

1. Reemplazar las tablas `PRIMAS_CRC` y `PRIMAS_USD` en `index.html`
2. Incrementar `TARIFAS_VERSION` (ej. `"INS-2026-mayo"` → `"INS-2026-noviembre"`)
3. Si cambiaron coberturas, actualizar `COBERTURAS_USD` y `COBERTURAS_CRC`
4. Commit + push → deploy automático

### Agregar un agente nuevo

Editar la constante `AGENTES` en `index.html`:
```js
const AGENTES = {
  "jhernandez@segurosdelins.com": { nombre: "JC Hernández", whatsapp: "8624 8757", email: "jhernandez@segurosdelins.com", codigo: "001" },
  "nuevo@ejemplo.com":             { nombre: "Nuevo Agente", whatsapp: "8888 8888", email: "nuevo@ejemplo.com",             codigo: "002" }
};
```

Commit + push. El agente nuevo podrá entrar con su cuenta Google.

### Actualizar PDFs

Reemplazar el archivo en `docs/` manteniendo el mismo nombre. Si INS cambia las reglas de aseguramiento, revisar la lógica de disparadores en `calcularDocumentos()`.
