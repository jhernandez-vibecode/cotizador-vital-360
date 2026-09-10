---
name: especialista-cotizador-vital-360
description: ESPECIALISTA COTIZADOR VITAL 360 INS — Cotizador de seguro de gastos médicos Vital 360 del INS (SUGESE P20-76-A01-1097 V3), bajo marca Seguros Digitales SDI. Single-file HTML/CSS/JS vanilla en Netlify desde repo jhernandez-vibecode/cotizador-vital-360. EN PROD en cotizador-vital360.netlify.app (subdominio futuro vital360.appsegurosdigitales.com). Auth Google con whitelist AGENTES, envío de correos via Gmail API directo (mismo Client ID que Cotizador Autos SDI). 7 planes × 13 rangos de edad × 2 monedas (CRC/USD). 28 coberturas con tooltips de Condiciones Generales. Historial localStorage con estados pendiente/aceptada/eliminada. 3 plantillas de correo: cotización corta con CTA al detalle + póliza vigente con guía completa de reclamos (4 modalidades INS: Medicina Virtual / Hospitalización pre-auth / Reembolso clientescgsp@grupoins.com / Internacional) + correo con botón a la guía standalone guia-reclamos.html. Usar este skill cuando JC pida cualquier cambio o mejora al proyecto Cotizador Vital 360, al cotizador, a los correos o a la guía de reclamos.
---

# Especialista Cotizador Vital 360 INS

Contexto completo del proyecto para retomar trabajo sin perder contexto. Leer COMPLETO antes de tocar código.

## Qué es

Cotizador online del **Seguro Vital 360** del INS (gastos médicos), operado por Seguros Digitales SDI bajo whitelist Google. Producto registrado bajo norma **SUGESE P20-76-A01-1097 V3**. La aplicación cubre el ciclo completo agente → cliente:

1. **Vista agente** (con auth): cotiza con los 7 planes, selecciona hasta 3, marca recomendado, envía cotización al cliente y posteriormente la guía de uso/reclamos cuando la póliza se emite.
2. **Vista cliente** (stateless, vía link `?c=BASE64URL`): comparativa de planes cotizados + tabla detallada de 28 coberturas desplegable + esquemas oficiales INS por plan (lightbox) + formas de pago × N planes + características del producto + material informativo + CTA WhatsApp + footer Seguros Digitales SDI.

## Estado actual (9 sep 2026)

- **EN PROD:** [cotizador-vital360.netlify.app](https://cotizador-vital360.netlify.app) (auto-deploy desde `main` en 1-2 min después de cada push)
- **Subdominio previsto:** vital360.appsegurosdigitales.com (CNAME en DNS de `appsegurosdigitales.com` pendiente)
- **Repo:** [jhernandez-vibecode/cotizador-vital-360](https://github.com/jhernandez-vibecode/cotizador-vital-360)
- **Repo local:** `C:/Users/segur/cotizador-vital-360`
- **Preview local:** `npx serve` puerto 8930 — nombre `vital360` en `~/.claude/launch.json`
- **Plan MVP:** 15 tareas completadas + ~30 mejoras post-MVP en commits siguientes
- **Último commit estable:** `67e6a2e` (9 sep 2026 · **estilo "línea clara" en toda la cara + Plantilla A del correo** — ver la sección propia "Línea clara"). Antes: `339913e` (mismo día, el re-skin de la app). Antes: `5e6144a` (6 ago 2026 · **fuera el Formulario COVID-19 de los requisitos** — el INS lo eliminó como requisito de suscripción por comunicado "Somos Socios"; el doc base vuelve a llamarse "Declaración de Salud". OJO: el PDF oficial `declaracion-salud.pdf` (INS-F-1008238) aún trae preguntas COVID adentro — es formulario oficial del INS, NO editarlo; se reemplaza cuando el INS publique versión nueva. En el mismo commit se estrenó el **registro de cambios al pie de la vista agente** — `<details class="sdi-changelog">` dentro del `.sdi-foot`, historial en lenguaje de usuario, entrada más reciente arriba: **todo update futuro DEBE agregar su entrada ahí antes del commit**, regla del 5 ago 2026. La cara del cliente NO lo lleva todavía — proponérselo a JC antes. Nota: en INS Medical NO había nada que tocar — su lista de documentos nunca listó el formulario COVID). Antes: `4de3209` (3 ago 2026 · **las otras opciones también traen sus formas de pago** — ver "Formas de pago en cada plan"). Antes: `a7942ac` (27 jul 2026 · **"Copiar HTML" mandaba el código fuente al cliente** — ver la sección "Portapapeles" ). Antes: `3c547d0` (27 jul · **las 7 opciones + desglose por miembro + IVA en todo cálculo** — la feature grande; ver Pendientes #1 y #2, ambos ✅ EN PROD. Smoke de JC pendiente). Antes: `b1bbe2a` (27 jul · **`?dev=1` solo en localhost** — cerraba la consola de agente a cualquiera en producción; ver "Arquitectura de vistas"). Antes: `4cb9038` (27 jul · tope de 6 s al acortador para que la pestaña de WhatsApp no quede en blanco) · `122f63f` (27 jul · saca del repo `mockup-tab-polizas.html`, que se coló en el commit anterior por un `git add -A`; queda en disco, ignorado). Antes: `7bc338a` (27 jul · **enlace corto `/c/XXXXXXXXXX`**, ver sección propia — primera Netlify Function del proyecto) · `571075c` (27 jul · **el cliente con enlace cortado ya no ve "Acceso restringido"**: vista `enlace` + avisos en login/bloqueado). Antes: `5f2309c` (21 jul 2026 · **fix dedup del pie** — la leyenda IP nueva se había apilado sobre la línea vieja "Esta cotización/guía pertenece a Seguros Digitales SDI®", repitiendo la marca; se quitó esa línea vieja en footer cliente + 3 correos). Antes: `16f7827` (21 jul · pie branded en la **vista agente** — la leyenda SDI faltaba donde arranca la cotización; footer `.sdi-foot` estático al fondo del `data-view=agente`, después de los 3 paneles, con `.foot-agente{max-width:1480px}`). Antes: `bb514ed` (21 jul · **leyenda de propiedad intelectual FIJA a JC Vargas** en footer vista cliente + los 3 correos, y agente `paolo@segurosticos.com` / Seguros Ticos habilitado). Antes: `45aa20b` (21 jul · batch vista cliente: tipografía Camino B Hanken Grotesk + periodos de espera "m"→"meses" + link "Red de proveedores del INS"). Antes: `22c1835` (20 jul · agente Innova Seguros CR) · `e8b294d` (20 jul · fix `[hidden]` del nudge y la ⚙) · `68dc1dd` (20 jul · tuerca de ajustes ⚙ — perfil editable) · `535dbcd` (16 jul · recuperación del historial desde Gmail) · `4a91b72` (16 jul · **evacuación Pro 1 ₡2.750.000**, ver sección propia) · `3f0119e` (15 jul · primas oficiales INS 2026)
- **Tarifas vigentes:** `TARIFAS_VERSION = "INS-2026"`. `PRIMAS_USD` (con centavos exactos) y `PRIMAS_CRC` (enteros) actualizadas el 15 jul 2026 (`3f0119e`) desde `docs/Primas en Colones 2026.pdf` + `docs/Primas en Dolares 2026.pdf` (ambos PDFs commiteados como fuente auditable). 182 valores (7 planes × 13 rangos × 2 monedas) verificados celda a celda contra el PDF con script Python/PyMuPDF → 0 errores. **Sumas aseguradas y deducibles sin cambio** — solo subieron las primas (~15%). Smoke tests actualizados a los valores nuevos (Pro 1 40-44: USD 1101.10 / CRC 605562; familia ejemplo 42/39/12/8: USD 3081.10 con tolerancia float / CRC 1694523). Para próximas actualizaciones: reemplazar las dos tablas + bump `TARIFAS_VERSION` + actualizar esos smoke tests.
- **🔴 `TARIFAS_VERSION` NO es una constante interna — el cliente la LEE.** Se declara en `index.html` (hoy línea 705) y alimenta el badge **"Tarifas vigentes {TARIFAS_VERSION}"** de la vista cliente (hoy línea 4027), además del `console.log` de los smoke tests. El 15 jul 2026 pasó de `"INS-2026-mayo"` a `"INS-2026"`: **JC lo dejó GENÉRICO, sin mes, a propósito** (se le ofreció ponerle el mes y dijo que no). Al bumpearla, escribir un texto que se lea bien en pantalla del cliente y **no volver a meterle el mes** sin que JC lo pida.
- **OJO — `docs/primas-vital-360.pdf` es la tarifa VIEJA.** La auditoría del 11 jun 2026 (`d7307f9..fc54621`) verificó 210 celdas bit-for-bit contra ese PDF, pero esos VALORES quedaron superados por la tarifa 2026. El método de verificación sí sigue válido. Lo que NO cambió y NO hay que re-verificar desde cero: las 27 coberturas × 7 planes × 2 monedas contra `coberturas-planes-{usd,crc}.pdf` (única excepción deliberada: evacuación de Pro 1, sección aparte).


## Línea clara · el estilo de la cara (9 sep 2026 · `339913e` + `67e6a2e`)

JC pidió aplicar a Vital 360 el estilo que aprobó el 9 sep para el portal EBI, con
`business.google.com/en-all/google-ads` de referencia. Las 10 reglas y el prompt
reutilizable viven en la memoria `style_linea_clara_google_ads`; acá solo lo propio de
este proyecto. **Encargo textual: "solo la cara: cero cambios de lógica, mismos ids y
enganches de JS".** Se cumplió — ver "Lo que NO cambió".

**Tokens** (declarados al final del `<style>`, en un bloque rotulado LÍNEA CLARA que va
DE ÚLTIMO a propósito para ganar por orden de fuente): acento único `--lc-blue #0369A1`,
banda `--lc-band #EEF4F9`, hairline de tarjeta `--lc-line #DADCE0`, borde de control
`--lc-line-btn #8A939C` (3.1:1), estado `--lc-ok-bg #E9F5F0` / `--lc-ok-tx #037D61`,
color del producto `--lc-prod #1F5C6B`, radios 32 / 24 / 20.

**Fuentes: cambiaron.** Space Grotesk (títulos) · Inter (texto) · JetBrains Mono (cifras),
por instrucción expresa de JC. **Esto deroga el "Camino B Hanken sola" del 21 jul** — no
reinstalarlo sin que él lo pida.

### 🔴 El ₡ de Space Grotesk se monta sobre el dígito siguiente
El glifo U+20A1 de Space Grotesk es **más ancho que su avance**: `₡1.877.216` sale con el
símbolo pisando el 1, con cualquier `letter-spacing` (probado hasta 0). No es tracking y
no se arregla con tracking. **Toda cifra grande va en la pila monoespaciada** — en la
página JetBrains Mono, en el correo `Courier New`. Es además lo que manda el kit SDI
(Cifras = JetBrains Mono). Arial tiene el mismo defecto en el correo. Vale para cualquier
app SDI que muestre colones en Space Grotesk.

### Decisiones de marca dentro del estilo
- **Cliente:** arriba el logo del **INS**; SDI al pie. **Agente:** arriba el logo **SDI a
  color**. Es la regla de las dos marcas, no una inconsistencia.
- El `ins-logo.png` hosteado es **BLANCO** (para fondo oscuro). En la página se pinta en
  tinta con `filter:brightness(0)`; en el correo se usa `img/ins-logo-tinta.png`.
- El pie estrena `img/sdi-logo-compacto.svg` (kit v1.2) y **jubila las tres barras
  inventadas**. El wordmark queda accesible pero oculto (`clip-path`), no borrado.
- La envoltura de 2 px de la regla #12 pasó de teal a **azul SDI** (un solo acento). La
  regla en sí no se tocó.
- El color del producto solo como chip, regla de 28×3 px o tinte de hover. **Ninguna cifra
  pintada:** lo que mejora/empeora se marca con un punto verde/ámbar al lado del número.

### El correo (Plantilla A) · `67e6a2e`
Solo la A. **B y C siguen con el look viejo**, a la espera del visto bueno de JC — si se
toca el pie de una, ojo con la regla de los 5 pies (el TEXTO de la leyenda no cambió).
- Dos imágenes nuevas con URL absoluta vía la constante **`EMAIL_IMG`**
  (`https://cotizador-vital360.netlify.app`): `img/ins-logo-tinta.png` y
  `img/sdi-logo-color.png`. **Van en ESTE repo**, no en el del cotizador de autos, para no
  meterle una dependencia nueva a las tres apps que jalan imágenes de aquel dominio.
  🔴 Si se despliega el correo sin las imágenes, salen los dos logos rotos: van juntos.
- **Sin webfonts.** Gmail y Outlook no los cargan: el correo cae a Arial y Courier New. La
  forma es línea clara; la letra no puede serlo. Outlook además cuadra las píldoras
  (`border-radius` ignorado) — degradación aceptada.
- La **regla crítica #11 se verificó de punta a punta**: el cuerpo conserva el `?c=` largo,
  la regex de `recuperarDesdeGmail` lo encuentra y decodifica al payload completo.

### 🔴 Lo que NO cambió (verificado función por función contra `main`, no repetir)
Byte a byte idénticas: `buildEmailGuiaReclamos`, `buildEmailPolizaVigente`,
`buildMimeVital360`, `buildRawMimeMultipart`, `totalesPlan`, `desgloseMiembros`,
`cuotasReconciliadas`, `fmtMoneda`, `calcularDocumentos`, `justificacionPlan`,
`diferenciasCobertura`, `getCobertura`, `encodePayload`/`decodePayload`, `acortarLink`,
`buildLinkCliente`/`buildLinkGuia`, `renderPaso1/2/3`, `renderHistorial`,
`renderPolizasVigentes`, `textoCuotas`, `txtRecargo`, `nPagos`, `renderTabla28`,
`renderPanelPlan`. La vista agente cambió **solo por CSS** salvo el masthead.
`guia-reclamos.html` no se tocó: **sigue con el look anterior.**

### Defectos de paso cerrados en el camino
- A 375 px la barra de moneda empujaba el documento a **422 px** (scroll horizontal en toda
  la página): el `.lbl` traía `flex:1 1 100%` de la hoja vieja y le comía el ancho al
  selector, que se encogía a 119 px con 180 px de botones adentro.
- La reja de "Servicios que vienen sin costo" seguía en 2 columnas en móvil.
- El "no incluye" de las coberturas iba en rojo por estilo **en línea** (`#B0562C`), fuera
  del alcance de cualquier hoja de sobreescritura. Hubo que tocar el template.

### 🔴 El preview local servía el HTML viejo
`python -m http.server` **no manda `Cache-Control`**: Chrome cachea por heurística y sirve
el `index.html` de la visita anterior. Le pasó a JC —revisó el mockup y lo vio idéntico— y
me pasó dos veces a mí el mismo día. La entrada `vital360` de `~/.claude/launch.json` ya
usa `npx http-server -c-1`, que manda `no-cache, no-store, must-revalidate`. **No volver a
apuntarla a `http.server`.** Ante un "no veo el cambio", lo primero es `curl -I`.

### Verificado en producción el 9 sep (no repetir)
Los 3 assets 200 con su Content-Type correcto (el SVG como `image/svg+xml`, no
octet-stream) · `/` y `/guia-reclamos` 200 · la Function del enlace corto viva: POST `/c`
→ 200 con id, GET `/c/<id>` → 302 al `?c=`, id inexistente → `/?enlace=roto` · vista
cliente en prod con hero blanco, panel de 32 px, banda `#EEF4F9` y sin scroll horizontal ·
`runSmokeTests()` 0 fallos · XSS: un `<script>` en el nombre sale escapado en el correo.

## Stack

- **HTML + CSS + JS vanilla single-file** (`index.html`, ~4750 líneas)
- **Sin frameworks y sin build step.** Desde el 27 jul 2026 hay **una sola** Netlify Function (`netlify/functions/coti.mjs`, enlace corto) y por eso existe un `package.json` con una única dependencia (`@netlify/blobs`) + `package-lock.json`. **El SITIO sigue sin build**: ese `package.json` está ahí solo para que Netlify instale la dependencia de la Function. No meterle build tools ni framework al front.
- **Google Identity Services (GIS)** Token Model — mismo Client ID que Cotizador Autos SDI: `255791314248-apgnrs0tiii72ogau5dpsjm2eie6d2hu.apps.googleusercontent.com`
- **Gmail API directo** desde el browser para envío de correos (scope `gmail.send`, patrón del cotizador-autos)
- **localStorage** para borrador del agente + historial de cotizaciones
- **Tipografía (desde 21 jul, Camino B aprobado por JC):** Hanken Grotesk (cuerpo + títulos, jerarquía por peso/tamaño, sin serif) · Spline Sans Mono con cifras tabulares para montos. Cargadas por Google Fonts `<link>`, referenciadas por vars CSS `--font-display`/`--font-body`/`--font-mono` (display = body = Hanken). Antes era IBM Plex Sans/Serif/Mono (JC la halló fría/techy). Se evaluó también "Camino A" Fraunces+Hanken (editorial) pero JC eligió B (minimal, arranque rápido, un solo webfont de texto).
- **Paleta:** teal/cyan/coral oficial INS Vital 360 (`--ins-teal #1F5C6B`, `--ins-coral #E36B43`, `--cream #F7F1E4`, `--ins-gold #C18A2C`)

## Modelo de datos (constantes en `index.html`)

- `PLANES` — array de 7 planes con `id`, `nombre`, `ambito` (Local/Regional/Internacional), `sumaUSD`, `sumaCRC`, `deducibleUSD`, `deducibleCRC`
- `RANGOS_EDAD` — 13 rangos del INS (`0-25` hasta `81+`)
- `PRIMAS_USD` y `PRIMAS_CRC` — tablas paralelas `[rango][plan_id]` con primas anuales (NO se hace conversión de moneda, se usan las dos tablas oficiales por separado). **USD guarda los centavos exactos del folleto** (ej. `1101.10`); `fmtMoneda` hace `Math.round` al mostrar, así que en pantalla se ve dólar entero sin decimales feos, pero el cálculo interno gana precisión. CRC son enteros. El pipeline (recargos ×1.05/×1.04, suma familiar) ya manejaba decimales antes, así que las primas base con decimales no cambian el comportamiento visual.
- `RECARGOS` — anual 0 % / semestral 5%CRC o 3%USD / trimestral 7%CRC o 4%USD (SIN mensual por decisión de oficina)
- `COASEGURO_PCT` — `0.10` uniforme para todos los planes
- `IVA_PCT` — `0.02` (Ley 9635, seguros de personas). **Desde la decisión de JC del 21 jul 2026 el IVA SÍ se suma y se muestra desglosado (prima + IVA = total); la regla vieja "nunca sumado, solo nota visual" quedó DEROGADA** — ver Reglas críticas #1
- `COBERTURAS_DEFS` — 28 coberturas con `id`, `label` y `desc` (tooltips redactados a partir de cláusulas I, VII y VIII de Condiciones Generales)
- `COBERTURAS_USD` y `COBERTURAS_CRC` — sublímites por plan. **Contienen un apartamiento DELIBERADO del folleto INS en "Transporte por evacuación" de Pro 1 — leer la sección siguiente antes de tocar nada acá**
- `INS_CONTACTOS` — todos los teléfonos y correos del INS (Tele-INS, Red Médica, autorizaciones, reembolso clientescgsp@grupoins.com, internacional, etc.) + plazos (5 días pre-auth, 60 días reembolso, 30 días resolución Ley 8956)
- `LOGO_INS_URL` — `https://cotizador.appsegurosdigitales.com/img/ins-logo.png` (compartido con cotizador-autos)
- `AGENTES` — whitelist OAuth, normalizada en lowercase. Hoy: `jhernandez@segurosdelins.com` (JC, WhatsApp 8822 1348, Lic. SUGESE 08-1318) + `rnbseguros@gmail.com` (Agente RNB Seguros, colega de revisión, WhatsApp 8892 9543) + `innovaseguroscrc@gmail.com` (Innova Seguros CR, agente amigo habilitado 20 jul; stub `codigo:"003"`, whatsapp `""` y licencia `"—"` — se auto-configura por ⚙) + `paolo@segurosticos.com` (Seguros Ticos, habilitado 21 jul; stub `codigo:"004"`, whatsapp `""` y licencia `"—"`). **Desde 20 jul los campos `nombre`/`whatsapp`/`licencia` son editables por el propio agente** vía la tuerca ⚙ (perfil en `vital360.perfil.<email>`, superpuesto sobre `agenteActual`); `AGENTES` quedó como pura whitelist de acceso — ver sección "Tuerca de ajustes ⚙".

### 🔴 Transporte por evacuación de Pro 1 · apartamiento DELIBERADO del folleto (16 jul 2026 · `4a91b72`)

**El cotizador publica ₡2.750.000 / $5.000 en "Transporte por evacuación" del plan Pro 1, y el folleto oficial del INS dice ₡275.000 / $500. NO es un error de transcripción ni un cero de más: es una decisión expresa de JC.** El apartamiento está documentado en un comentario arriba de `COBERTURAS_USD` en `index.html`.

- **Por qué:** el folleto le daba a Pro 1 diez veces menos que a Esencial 1 y Esencial 2 (₡2.750.000), siendo Pro 1 el plan superior — la única inversión en 28 coberturas × 7 planes. JC (agente INS, Lic. SUGESE 08-1318) confirmó que el valor correcto es ₡2.750.000 y ordenó corregirlo. Con la corrección la escalera queda monótona y coherente con el resto de la tabla, duplicándose por tramo: **2.750.000** (Esencial 1, Esencial 2, Pro 1) → **5.500.000** (Pro 2, Platinum 1, Platinum 2) → **11.000.000** (Deluxe). El ₡275.000 era el único valor que rompía la progresión.
- **NO "arreglar" esto de vuelta al folleto** creyendo que es un error de tipeo. El código copiaba el folleto bien; el apartamiento es intencional.
- **Única condición de reversión: que el INS confirme POR ESCRITO otra cosa** → ahí sí volver a `275000` / `500`. **Esa consulta al INS SIGUE PENDIENTE:** se le propuso a JC mandarla y él decidió corregir sin esperarla.
- **Ya verificado — no repetir el trabajo:**
  - `docs/coberturas-planes-{crc,usd}.pdf` leídos celda a celda con PyMuPDF: dicen ₡275.000 / $500 en **ambas** monedas con ratio 550 exacto → no es un cero perdido al digitar de nuestro lado.
  - La carpeta `C:/Users/segur/vital 360/` tiene los **mismos archivos** que `docs/` del repo (md5 idéntico). No hay versión más nueva del folleto ahí.
  - Los Cuadros de Esquemas por plan (`docs/esquemas/pro1-crc.jpg`) **no traen** la fila de evacuación (solo deducible, ambulatorios, hospitalización, coaseguro).
  - **Condiciones Generales pág. 25: NO fijan el monto.** La cobertura opera "de acuerdo a lo establecido en la Cláusula Cobertura de Gastos Médicos de las **Condiciones Particulares**" → el folleto es referencial y el monto vinculante vive en las Condiciones Particulares de cada póliza emitida. Eso es lo que hace el riesgo tolerable: el cotizador es orientativo, no contractual.
  - **"Ambulancia aérea"** (CG pág. 24 · avión particular acondicionado) y **"Transporte por evacuación"** (CG pág. 25 · ambulancia local o avión comercial en clase económica) son **coberturas distintas** con montos separados. No confundirlas.
- **Patrón durable:** cuando un dato del INS se ve mal, el orden es (1) cotejar contra el PDF oficial, (2) buscar segunda fuente (esquemas, Condiciones Generales), (3) si el código es fiel a la fuente, **el problema es del INS, no del cotizador** — y apartarse de la fuente es decisión de JC, no del programador. Dejar siempre el rastro en el código y en el commit, no solo en el chat.

## Arquitectura de vistas

`init()` decide qué vista mostrar según query params:

- Sin params → `agente` (requiere OAuth)
- `?c=BASE64URL` → `cliente` (sin auth, decodifica el payload)
- `?enlace=…` → `enlace` ("El enlace llegó incompleto") · lo manda la Function cuando el id corto no existe
- `?dev=1` → bypass de auth **SOLO en localhost** (27 jul 2026 · `b1bbe2a`). 🔴 Hasta esa fecha funcionaba también en producción: `cotizador-vital360.netlify.app/?dev=1` le abría la consola de agente a cualquiera, cargada como el **primer agente de `AGENTES`**, o sea que un desconocido podía emitir cotizaciones con el nombre y la **licencia SUGESE 08-1318 de JC**. No había fuga de datos (el historial vive en el localStorage de cada navegador y sin OAuth real no se mandan correos), pero sí suplantación de un intermediario registrado. **JC decidió cerrarlo el 27 jul; no volver a habilitarlo fuera de localhost.** La regex está anclada a propósito (`localhost.evil.com` no pasa).
- Si `GOOGLE_CLIENT_ID` empieza con `REEMPLAZAR` → bypass automático con banner "MODO PRUEBA" (ya no aplica desde 19 may con Client ID real)

Seis vistas: `loading` · `login` · `agente` · `cliente` · `bloqueado` · `enlace`.

### 🔴 Enlace corto `/c/XXXXXXXXXX` (27 jul 2026 · `571075c` + `7bc338a`)

**Qué lo provocó:** una clienta de un agente amigo abrió el enlace de su cotización y le salió **"Acceso restringido · Email autenticado: …"**. El diagnóstico (leyendo el código, no suponiendo): esa pantalla **solo** se renderiza desde el camino de Google no-autorizado, o sea que `init()` tomó la rama de agente, o sea que **`?c=` no venía en la URL**. El enlace medía **996 caracteres** (medido con una cotización real de 3 asegurados × 3 planes); WhatsApp lo colapsa con "Leer más" y lo parte. La clienta terminó en el sitio pelado, One Tap la hizo autenticarse y el cotizador le respondió con un rechazo.

**Arquitectura (primera Function del proyecto):**
- `netlify/functions/coti.mjs` — **POST `/c`** `{t:"c"|"p", d:"<base64url>"}` guarda en **Netlify Blobs** (store `enlaces-cotizacion`, `consistency:'strong'` — el cliente puede abrir el link a los segundos) y devuelve `{id}` de **10 caracteres**, alfabeto de 32 sin `0/O/1/I`, `randomBytes`. **GET `/c/:id`** responde **302** a `/?c=…` (o `/guia-reclamos?p=…` si `t==="p"`). La ruta la declara la propia Function con `export const config = { path: ['/c','/c/:id'] }` — **no hay regla de redirect en `netlify.toml`**.
- `acortarLink(linkLargo)` en `index.html` — **si la Function falla devuelve el link largo**. Acortar nunca debe impedir un envío. En `npx serve` local siempre cae al largo (no hay Functions): eso es lo esperado, no un bug.

**Reglas que NO se pueden romper:**
1. **El CORREO conserva el enlace largo `?c=` a propósito.** El botón lo esconde igual, y **"✉ Recuperar desde Gmail" depende de ese `?c=` en el cuerpo HTML** para reconstruir el historial (regex en `recuperarDesdeGmail`). Si alguien "mejora" el correo poniéndole el link corto, **rompe la recuperación** — el respaldo real de JC. El corto va solo donde el cliente ve la URL cruda: **WhatsApp del cotizador, WhatsApp de la guía, Copiar link, y el reenvío WA del historial** (4 puntos).
2. **`?c=` sigue vivo para siempre.** Los enlaces ya enviados a clientes tienen que seguir abriendo. El corto es un **alias que redirige**, no un reemplazo del formato.
3. **La pestaña de WhatsApp se reserva ANTES del `await`** (`window.open('','_blank')` y después `win.location.href = url`). Abrirla después de una llamada de red ya no cuenta como gesto del usuario y el navegador la bloquea como popup. Por eso el botón **📱 WA del historial pasó de `<a href>` a `<button data-action="wa-reenviar">`**.
4. **El destino del 302 se arma en el servidor** (`'/?c=' + reg.d`), nunca sale del blob, y `d` se valida contra `^[A-Za-z0-9_-]+$`. Así no hay redirección abierta ni inyección de headers. No aflojar esa validación.

**Modelo de seguridad (deliberado, ya discutido):** el POST **no pide OAuth**. Se decidió así porque exigir token degradaría en silencio a link largo al vencerse la sesión. A cambio la Function **solo acepta lo que parece una cotización o una guía nuestra** (el base64 tiene que decodificar a JSON con `cliente`+`asegurados`+`planes`, o con `agente`+`poliza`), con tope de 12.000 caracteres. Quien tenga el enlace ve la cotización — **exactamente el mismo modelo que la URL larga**, sin regresión de privacidad; 32^10 ≈ 1,1 × 10^15 ids no se adivinan ni se enumeran. Riesgo residual aceptado: alguien podría crear entradas basura válidas; está acotado por el tope de tamaño y es purgable.

**✅ Smoke de JC hecho el 27 jul 2026 — NO volver a pedirlo.** Mandó una cotización real por WhatsApp (clienta ANDREATERESA MURILLO KELLY, 3 planes) con el enlace `https://cotizador-vital360.netlify.app/c/6TCNN4A3GS`: el mensaje entra **completo, sin "Leer más"**, el enlace se lee de un vistazo y resuelve 302 al `?c=` correcto. El objetivo de la feature está cumplido en el flujo real, no solo en pruebas.

**Verificado en producción el 27 jul** (no repetir): POST 200 con id · GET 302 al `?c=` correcto · id inexistente y id mal formado → `/?enlace=roto` · POST con basura, con JSON que no es cotización y con intento de redirección externa → **400** · `DELETE` → 405 · enlace corto abierto en el browser → vista cliente completa (10 secciones) · fallback al link largo cuando no hay Function (18 ms). URL final: **51 caracteres** contra 996.

### Vista agente (3 pestañas)

**Pestaña 1 · Cotizador:**
- Paso 1: form de asegurados (chips con modal CRUD · titular tiene campos extras de cédula, WhatsApp y email del cliente · solo un titular permitido)
- Paso 2: scanner de los 7 planes con primas calculadas en vivo + tabla comparativa de 27 coberturas expandible
- Paso 3: chips de planes seleccionados + 4 botones de envío (WhatsApp · Email cotización · Vista previa · Copiar link)

**Pestaña 2 · Mis cotizaciones:**
- Lista cronológica de cotizaciones guardadas en localStorage
- Estados: `pendiente` (default) / `aceptada` / `eliminada` (oculta por defecto)
- Filtro Activas / Todas
- **Botón "📨 Enviar póliza vigente"** dorado SOLO en filas con estado `aceptada` → abre modal de captura (N.º póliza + fecha + plan contratado abierto a los 7 + moneda) y luego modal preview del correo "Póliza vigente + guía de reclamos"
- Botón **"+ Nueva cotización"** en las tabs para resetear todo

**Pestaña 3 · Pólizas vigentes** (29 may 2026 · `7ceab7e` · Opción A: pestaña independiente):
- `renderPolizasVigentes()` lista `historial.filter(estado==='aceptada')` con contador `tab-count-vig`. Reutiliza `.hist-table` + estilos `.vig-*`.
- Desde acá se dispara `openGuiaModal(h)` → guía de uso y reclamos del cliente (ver sección "Página standalone `guia-reclamos.html`").
- Desde la auditoría del 11 jun el flujo "Enviar póliza vigente" **persiste `polizaData`** (`guardarDatosPoliza`), así que esta pestaña muestra el N.º de póliza en vez de "por capturar". La guía web mantiene su propio estado `guiaEnviada`, aparte.

**Detección de cliente nuevo:** si cambia nombre o cédula del titular respecto a la fila ya guardada, se descarta el `cotizacionId` viejo y se genera uno nuevo — así cada cliente queda como entrada independiente.

### Tuerca de ajustes ⚙ · perfil editable del agente (20 jul 2026 · `68dc1dd`)

Botón ⚙ en el header (`#btnSettings`, dentro de `.mh-right`, junto a la píldora `#mh-user`) → modal compacto "Mis datos de agente" con **Nombre · WhatsApp · Licencia SUGESE**. El **correo va en solo-lectura** (`agenteActual.email`): es la identidad Gmail/OAuth y NO se edita — el envío sale siempre desde la cuenta autenticada. Réplica del patrón de Cotizador Autos / Hogar Comprensivo, adaptado a la arquitectura snapshot de Vital.

- **Almacenamiento POR CUENTA:** `vital360.perfil.<email>` en localStorage (aislamiento por agente, cumple la regla multi-agente replicable). Guarda solo `{nombre, whatsapp, licencia}`.
- **Overlay:** `aplicarPerfilOverlay()` superpone los campos NO vacíos sobre `agenteActual` (copia de `AGENTES[email]`) justo después de resolver el login, en **ambas rutas** (`handleGoogleResponse` real + bypass `?dev=1`/MODO PRUEBA). Como `buildPayloadCliente` snapshotea `agente: agenteActual` en el payload, la identidad editada se propaga sola a la cotización, los 3 correos, el link de WhatsApp, el hero y el footer.
- **`AGENTES` sigue siendo SOLO la whitelist de OAuth.** Para habilitar un agente nuevo basta agregar su correo como llave (con `nombre` default, `whatsapp:""`, `licencia:"—"`, `codigo`); él completa lo demás desde la ⚙. Ojo: la licencia default debe ser `"—"` (truthy) y NUNCA `""`, porque los correos hacen `a.licencia || '08-1318'` y un string vacío filtraría la licencia de JC.
- **Nudge** dorado de primera vez ("Configurá tus datos"), namespaced por cuenta (`sessionStorage vital360.nudgeCerrado.<email>`), se oculta al guardar o al descartar.
- **Bug que cazó JC en prod (`e8b294d`, 20 jul) — no reintroducir:** el atributo `[hidden]` NO ocultaba ni el nudge ni el ⚙ porque `.set-nudge{display:flex}` y `.mh-gear{display:grid}` (hoja de autor) le ganan a `[hidden]{display:none}` (hoja del navegador). Fix: `.mh-gear[hidden],.set-nudge[hidden]{display:none}`. Regla: **verificar visibilidad con `getComputedStyle().display`, NUNCA con `.hidden`** — el `.hidden` dio falso positivo en la revisión.
- **Helpers añadidos:** `_perfilKey`/`_nudgeKey`, `cargarPerfilAgente`/`guardarPerfilAgente`, `aplicarPerfilOverlay`, `tienePerfilGuardado`, `refrescarHeaderAgente(suffix)` (recuerda el sufijo dev en `_headerSuffix`), `actualizarNudgePerfil`, `_toast`, `abrirSettingsModal`/`guardarSettings`. Al guardar, un campo vaciado **revierte al default de la whitelist** en vivo (sin divergencia live/reload). Escaping XSS en todos los sinks. Revisión adversarial 3-lentes pasada (XSS limpio, aislamiento OK, 3 fixes low/nit cerrados en el mismo commit).

### Vista cliente

Orden de secciones **real** (`renderClienteMain`, layout "v7" desde `3c547d0`; el listado viejo de cards horizontales + tabla de 28 desplegable **ya no existe**):
1. Hero teal-deep con logo INS + Vital 360 + datos del agente
2. Toggle moneda sticky (CRC/USD)
3. `renderClienteRecomendado` — plan recomendado en teal-deep, total del año con IVA y **justificación calculada** contra el plan anterior y el siguiente
4. `renderClienteRecibo` — cuánto aporta cada asegurado (del plan recomendado)
5. `renderClientePagoV7` — formas de pago del recomendado: chips anual / semestral / trimestral (ver "Formas de pago en cada plan")
6. `renderClienteCobertura` — 9 coberturas clave del recomendado + botón "Ver las 28" (`renderTabla28` con UN plan) + botón "Esquema INS" (lightbox con el JPG oficial según moneda)
7. `renderClienteEscalera` — las otras opciones cotizadas, agrupadas por ámbito; cada fila abre su `renderPanelPlan` **anclado** (regla crítica #12)
8. `renderClienteComparador` — el CLIENTE marca hasta 3 planes y `renderTabla28` los pone lado a lado
9. Características del producto (renovación vitalicia, edad mínima, hijos hasta 25, habitación cubierta, coaseguro 10 %, mecánica de pago dinámica según ámbito)
10. Servicios incluidos sin costo (Medicina Virtual / Asistencia Viajero / Dental / Red Médica)
11. Documentos para iniciar aseguramiento (3 base + 4 disparadores condicionales: edad 66-70 telesuscripción, edad 71+ batería exámenes, plan internacional + extranjero arraigo, 3+ dependientes mayores 18 abreviada)
12. Periodos de espera (matriz de 9 ítems · 3 columnas)
13. **Material informativo del producto** (4 PDFs · asistencia viajero condicional según ámbito)
14. CTA WhatsApp con avatar del agente
15. Disclaimers SUGESE
16. Footer Seguros Digitales con leyenda de propiedad intelectual (ver "Leyenda de propiedad intelectual del pie")

### Formas de pago en cada plan (3 ago 2026 · `4de3209`)

**Qué lo provocó:** JC vio que el plan recomendado cierra con anual / semestral / trimestral, pero las otras opciones de la escalera solo enseñaban el total anual — el cliente que se inclinaba por una de ellas no podía ver qué le pasaba al fraccionar.

- **`renderPanelPlan` lleva ahora un bloque "Cómo pagarlo"** después del recibo por miembro, en el mismo orden que la página (recibo → pago). Las **tres modalidades juntas, sin chips**: en el recomendado los chips sirven porque es el plan que se está eligiendo; en el panel lo que sirve es compararlas de un vistazo, y evita meter un estado de modalidad por plan. La fila que coincide con `cli.modalidad` (el chip que el cliente marcó arriba) queda resaltada, para que los dos bloques se lean como uno solo.
- **Todo sale de `totalesPlan`**, la misma fuente de la página, el correo y el WhatsApp. Nada se recalcula en el panel.
- **🔴 `textoCuotas(t, mon)` — las cuotas no pueden insinuar un total que no existe.** Como se reconcilian contra el total, no siempre son idénticas. Poner "4 de ₡462.351" al lado de un total de ₡1.849.403 invita al cliente a multiplicar y a no cuadrar. Cuando difieren se dicen las dos cifras con su cantidad (`3 de ₡462.351 y 1 de ₡462.350`); con **dos** cuotas se dicen ambas sin el "1 de" (`2 pagos: ₡741.347 y ₡741.346`), que sonaba raro. Es la misma regla del pendiente #1, aplicada a la redacción.
- **`txtRecargo(mod, moneda)` y `nPagos(mod)` leen de `RECARGOS`** — los porcentajes estaban escritos a mano en `renderClientePagoV7` (5/7 CRC, 3/4 USD). Ahora hay una sola fuente y la página no puede publicar un recargo distinto al que se cobra. Constante `MODALIDADES` compartida por los dos bloques.
- El título del bloque del recomendado pasa a **"Elija el ritmo para {plan}"**: con formas de pago en varios lugares, un bloque sin nombre quedaba ambiguo.
- **Defecto de paso cerrado en el mismo commit:** en `.v7-row` (fila de la escalera) `.nm`, `.sm` y `.big` son `<span>` **sin `display:block`**, así que corrían EN LÍNEA y su `margin-top` no hacía nada — a 375 px la fila se leía como un párrafo corrido (*"Esencial 2 Suma ₡13.750.000 ₡1.412.089 −₡316.324 vs Pro 1"*). Venía de `3c547d0`. Confirmado con `getComputedStyle`, no con `.hidden` (regla #9). La fila bajó de 122 px a 79 px de alto. **Es el mismo patrón que el bug del `[hidden]` del 20 jul: verificar layout con el estilo computado, nunca con la clase.**
- **Verificado en preview** (no repetir): smoke tests en verde con los casos nuevos (`textoCuotas` en sus tres formas, `txtRecargo` en las 4 combinaciones moneda-modalidad, `nPagos`, y las cuotas sumando el total exacto en los **42 casos** = 7 planes × 2 monedas × 3 modalidades) · panel abierto a 375 px y en desktop, **sin desborde horizontal** · toggle CRC↔USD recalculando el panel · el chip del recomendado propagando el resaltado. **Falta el smoke de JC en un teléfono real** (ver Pendientes).

### Leyenda de propiedad intelectual del pie (21 jul 2026 · `bb514ed`/`16f7827`/`5f2309c`)

A pedido de JC, el pie lleva la **misma leyenda que los avisos de SASINS**, con la propiedad intelectual del **software FIJA a Juan Carlos Hernández Vargas** (no al agente que cotiza). Está en **5 lugares idénticos** de `index.html` (verificado por grep, 22 jul 2026): (1) footer de la vista **agente** (`.sdi-foot` estático al fondo del `data-view=agente`, hoy línea 671), (2) footer de la vista **cliente** (`renderClienteDisclaimers`, hoy línea 4360) y (3-5) los **3 correos** (`buildEmailVital360` ~1961, `buildEmailGuiaReclamos` ~2101, `buildEmailPolizaVigente` ~2363). Al tocar el pie hay que tocar los **5**, si no quedan divergentes. (`guia-reclamos.html` tiene su propia línea de pie, con otra redacción — no es una sexta copia de esta leyenda.)

Estructura final (limpia, SIN duplicar marca):
- Wordmark **Seguros Digitales** (logo, ya existía)
- *(solo cliente y correos)* línea del **agente**: `Agente {nombre} · Lic. SUGESE {licencia} · {whatsapp}` — la COTIZACIÓN sí le pertenece al agente, por eso su identidad se mantiene aparte
- `Un producto de **SDI · Seguros Digitales**`
- `© 2026 · Propiedad intelectual de **Juan Carlos Hernández Vargas**`

**OJO — no re-introducir:** la primera versión (`bb514ed`) dejó apilada la línea vieja `Esta cotización/guía pertenece a Seguros Digitales SDI®` JUNTO con `Un producto de SDI · Seguros Digitales`, duplicando la marca en el mismo pie. JC lo cazó en prod. `5f2309c` la quitó. **No volver a agregar la línea "Esta cotización/guía pertenece a…".** Regla general: al agregar a un pie/bloque, releer lo que ya está para no duplicar (ver memoria `revisar-antes-de-agregar-no-duplicar`).

**Patrón replicable (alcance más allá de Vital 360):** este pie extiende a los cotizadores el estándar de pie de correo de SASINS (`decision_sasins_pie_correo_branding_sdi_sasins_tricolor_21jul`). Es **replicable a los demás cotizadores SDI** (autos, hogar comprensivo, INS Medical, viajero, Plenisalud…) **si JC lo pide** — no ir a aplicarlo por cuenta propia. Al replicarlo, mantener la distinción de fondo: el copyright del **software** es de JC Vargas FIJO, y la línea del **agente** (nombre · licencia · WhatsApp) va aparte porque la cotización sí le pertenece a él.

### 3 plantillas de correo

**Plantilla A · "Su cotización Vital 360 está lista"** (`buildEmailVital360`):
- Corta · CTA "VER MI COTIZACIÓN COMPLETA" al link `?c=...`
- 3 cards con primas anuales · fondo teal-soft #E3EEF1 · estrellita coral cuadrada en el recomendado · 22 px serif para el monto
- Lista de "En la guía completa encontrará" con line-height 2
- Cierre humano + footer Seguros Digitales

**Plantilla B · "Su póliza Vital 360 está vigente"** (`buildEmailPolizaVigente`) — autocontenida, ~21 KB:
- Bienvenida + tarjeta de póliza (N.º, plan, vigencia, asegurados, suma, deducible + coaseguro)
- **4 modalidades INS** (basadas en cláusulas XXIV-XXVII de Condiciones Generales):
  1. **Medicina Virtual 360** (verde · sin costo · App INS 24/7)
  2. **Hospitalización o cirugía** (teal · pago directo · pre-autorización a `autorizacionesins@grupoins.com` con 5 días hábiles)
  3. **Ambulatorio y urgencias en CR** (coral · reembolso a `clientescgsp@grupoins.com` en 60 días naturales · adjunta Solicitud de Beneficios + Autorización Consulta Expedientes)
  4. **Emergencia fuera del país** (navy · solo aplica si plan Regional o Internacional · 4 teléfonos del Administrador de Servicios Médicos)
- Documentos adicionales según caso (odontología accidente, fallecimiento)
- Caja navy "Números y correos clave" con 3 teléfonos + 3 emails INS
- Caja dorada "Sus derechos como asegurado" (Ley 8956, 30 días resolución, revocatoria, apelación)
- Footer Seguros Digitales con propiedad intelectual JC

**Plazo de reembolso — verificado contra el contrato y CONGELADO por JC (22 jun 2026):** la Cláusula XXV de las Condiciones Generales (pág. 42) dice "dentro de los sesenta (60) días naturales **de iniciado el tratamiento**". `guia-reclamos.html` lo cita correcto. El correo dice "60 días siguientes [al pago]" y **JC decidió DEJARLO ASÍ — no cambiarlo.** La resolución del INS son 30 días naturales (Cláusula XXVII / Ley 8956).

**Plantilla C · "Su guía de uso y reclamos · Vital 360"** (`buildEmailGuiaReclamos`) — 22 jun 2026 · `bb1fa62`:
- Correo HTML corto que reemplazó al de texto plano que mostraba el link crudo (base64) feo.
- Header navy + mini-tarjeta de póliza (N.º, plan, vigencia) + **botón teal "ABRIR MI GUÍA DE USO Y RECLAMOS →"** que oculta la URL larga al cliente · lista "qué encontrará" + footer SDI.
- El botón apunta a la página standalone `guia-reclamos.html?p=BASE64URL` (no es autocontenido como Plantilla B). Se dispara desde pestaña "Pólizas vigentes" → `openGuiaModal` → "✉️ Enviar por correo" → `openEmailGuiaPreviewModal`.

### Página standalone `guia-reclamos.html` (EN PROD desde 29 may 2026 · `f04a431`)

Página aparte en el mismo repo (`C:/Users/segur/cotizador-vital-360/guia-reclamos.html`) → **cotizador-vital360.netlify.app/guia-reclamos.html**. Es la referencia que el cliente guarda en favoritos para gestionar sus reclamos SOLO, sin cargar al agente: el INS y los proveedores médicos hacen el trabajo, la guía solo orienta. **Why:** JC quiere quitarse la carga administrativa de reclamos. Single-file, paleta Vital 360, mobile-first.

**Estructura:** top bar sticky con logo INS + botón 800-TELE-INS · hero con los datos de la póliza (llegan por `?p=`) · **6 escenarios en acordeón exclusivo** (Medicina Virtual · Consulta ambulatoria · Hospitalización con pre-auth · Emergencia en CR · Emergencia en el extranjero · Accidente dental), cada uno con pasos numerados, alertas de color, pills de formularios y botón mailto/tel al canal INS correcto · **grid de 8 documentos ORDENADO POR IMPORTANCIA**: Condiciones Particulares primero (`.featured`, borde teal + degradado + badge "SU PÓLIZA"), Condiciones Generales segunda, después los anexos (Solicitud de Beneficios, Pre-autorización, Red Médica, Asistencia Viajero, Medicina Virtual, Dental) · contactos clave INS + tarjeta del agente con sello "Asegurado por [logo INS]" · footer SDI + propiedad intelectual JC.

**Decisiones cerradas con JC (no re-preguntar):**
- **Autorización de Expedientes NO va en el grid de documentos** (el cliente la firma desde la emisión). Sigue como *pill* dentro de los pasos de reclamo (consulta ambulatoria + emergencia en CR).
- Pre-autorizaciones = `autorizacionesins@grupoins.com`. **JC confirmó grupoins.com; NO usar el `ins-cr.com` que trae el PDF oficial.**
- Reembolsos = `clientescgsp@grupoins.com`.
- El logo INS va ABAJO en la tarjeta del agente, como sello (`filter: brightness(0) invert(1)`), NO al lado del nombre — al ser logo horizontal quedaba apretado.
- Sin avatar emoji 👨‍💼 en la tarjeta "Su agente INS" (se quitó el 22 jun). No re-agregarlo.

**Integración con el cotizador (`7ceab7e`, 29 may):** `openGuiaModal(h)` captura N.º de póliza, fecha, plan (los 7 abiertos) y moneda, más un campo opcional con el link a las Condiciones Particulares (Drive) y preview en vivo; botones copiar / WhatsApp / correo, cada uno persiste vía `guardarDatosGuia()`. En el objeto del historial quedan `polizaData {numero,fechaInicio,planId,moneda}` + `linkCP` + `guiaEnviada` + `guiaEnviadaAt`. Helpers en `index.html`: `buildLinkGuia()`, `fmtFechaEs()`, `vigenciaTexto()` (desde +1 año −1 día), `polizasVigentes()`, `bindVigentesEvents()`. En la guía, `personalizar()` lee `?p=` y rellena hero (`#g-asegurado` / `plan` / `poliza` / `vigencia` / `suma`) + agente (`#g-agente-*`) + tarjeta CP (`#doc-particulares` con `linkCP`); sin `?p=` o sin `linkCP` → `cpSinDocumento()` deja la tarjeta gris "lo entrega el INS".

**El payload `?p=` lleva los strings YA resueltos** (la guía no conoce `PLANES`): `{v, nombre, plan, poliza, vigencia, suma, linkCP, agente:{nombre, lic, wa}}`.

**GOTCHA verificado — el link va SIN `.html`:** `buildLinkGuia()` genera `base + 'guia-reclamos?p=' + enc`. Si se le pone `.html`, `serve` (local) redirige quitando la extensión y **pierde el query string**; Netlify sirve `/guia-reclamos` con 200 OK. Tampoco romper el flujo "Enviar póliza vigente" (Plantilla B) de Mis cotizaciones: es independiente y sigue intacto.

**Probar en local:** `?dev=1` bypassa OAuth + inyectar historial en `localStorage vital360.historial`.

### Adjuntar PDF a los correos (22 jun 2026 · `bb1fa62..fa00942`)

**Sesión completa del 22 jun 2026, EN PROD — 4 commits en orden:** `bb1fa62` (3.ª plantilla: correo de la guía en HTML con botón + fix del nombre del agente) → `b478ad0` (adjuntar PDF a los correos vía Gmail API multipart + hardening) → `cdacdbf` (mover "Adjuntar PDF" al modal de captura de la guía) → `fa00942` (quitar el avatar emoji de la tarjeta del agente en la guía).

Botón **"➕ Adjuntar PDF"** (`setupAdjuntosControl(modalEl, opts)` — genérico, acepta `anchorSelector`/`sendBtnSelector`/`heading`): el agente abre el explorador, selecciona PDF de la carpeta del cliente (ej. Condiciones Particulares / Documentos de Emisión), y se mandan dentro del mismo correo (`multipart/mixed`).
- **Flujo guía** (el que usa JC): el selector vive en el modal de captura `openGuiaModal` (sección "📎 Adjuntar al correo"), no en la preview. Los adjuntos seleccionados se pasan a `openEmailGuiaPreviewModal({...,attachments})`, que los muestra read-only y los manda. Decisión de JC 22 jun: el adjuntar debe estar donde se arma el correo.
- **Flujo póliza vigente**: el selector sigue en `openEmailPolizaPreviewModal` (preview).
- `buildRawMimeMultipart` arma el string MIME (HTML base64 + N adjuntos base64); `buildMimeVital360WithAttachments` lo envuelve en base64url. El `.eml` descargado reutiliza el mismo builder cuando hay adjuntos.
- Guards: tope 25 MB **antes** de leer · `isReady()` bloquea el envío mientras un FileReader está leyendo (si no, se enviaba sin el adjunto en silencio — bug encontrado en revisión adversarial) · nombre de archivo RFC 2231 (acentos/ñ) o quoted-pair (ASCII) · `mimeType` saneado contra inyección CRLF · `.pdf` se fuerza a `application/pdf`.
- "Abrir Gmail manualmente" (compose URL) NO puede llevar adjuntos: ahora es botón que avisa con `confirm()` si hay adjuntos pendientes.
- **Revisión adversarial multi-agente sobre la feature de adjuntos:** 1 hallazgo alto (el race) + 12 de hardening, **todos remediados** en la misma sesión (RFC 2231, saneo de `mimeType` anti-CRLF, `.eml` con adjuntos, guards de tamaño).

**🔴 Lección DURABLE del race de FileReader — alcance: CUALQUIER cotizador con adjuntos por Gmail API, no solo Vital 360.** Enviar mientras un `readAsDataURL` asíncrono no terminó mandaba el correo **sin el adjunto, en silencio** (el usuario cree que lo mandó). Fix: contador `leyendo` + `isReady()` que bloquea el botón de envío hasta que todos los FileReader resolvieron. Aplica igual a **cotizador-autos** y **hogar comprensivo** (y a cualquier flujo futuro que adjunte archivos a un correo). Es el mismo patrón de fondo que `feedback_engine_write_proxy_no_fallback`: **nunca actuar sobre un estado asíncrono incompleto.** Si se agrega adjuntos a otro cotizador, replicar el guard antes que la feature.

### 🔴 Portapapeles: "Copiar correo" tiene que copiar HTML, no texto (27 jul 2026 · `a7942ac`)

**Qué pasó:** un agente (Innova Seguros) mandó una cotización de prueba y al cliente le llegó el `<!DOCTYPE html>` **en texto crudo**. Causa: el botón usaba `clipboard.writeText(html)`, que solo pone `text/plain` en el portapapeles; Gmail pega texto y muestra el código. **No fue error del agente: la propia app documentaba ese camino** ("Alternativa manual: Copiar HTML → Abrir Gmail → pegar en el cuerpo").

- **Fix:** `copiarCorreoAlPortapapeles()` usa `ClipboardItem` con las variantes **`text/html` + `text/plain`**. Si el navegador no lo soporta cae a texto plano **pero avisa con un alert** y manda al botón de envío directo — antes fallaba en silencio. Handler compartido `manejarCopiarHtml()` en los **3** modales de correo.
- El botón se llama **"Copiar correo"**, no "Copiar HTML": lo que se copia es el correo, no código para un editor.
- La instrucción advierte que **`Ctrl+Shift+V` pega sin formato** y reproduce el problema.
- **El envío por Gmail API nunca estuvo afectado** (`buildMimeVital360` declara `Content-Type: text/html`). Si vuelve a reportarse un correo "en código", lo primero es preguntar **qué botón se usó**: si fue "🚀 Enviar ahora desde Gmail", el problema es otro.
- ⚠️ **No verificado de punta a punta:** el portapapeles necesita foco de ventana real y el navegador automatizado no lo tiene. Se verificó que el `ClipboardItem` se construye con ambas variantes; el pegado real en Gmail lo tiene que confirmar un humano.

**🔴 Alcance transversal — revisar los otros cotizadores.** Autos, Hogar Comprensivo e INS Medical tienen modales de correo con el mismo patrón "Copiar HTML". Si comparten el código, comparten la falla. Es la misma clase de lección que el race del FileReader en los adjuntos: **nunca se verificó qué llega del otro lado**. Pendiente de que JC lo pida proyecto por proyecto.

### Respaldo y recuperación del historial (16 jul 2026 · `535dbcd`)

**🔴 POR QUÉ existe esta feature (no borrar este contexto):** un limpiador de disco (**CCleaner**) borró el `localStorage` de **TODOS los proyectos SDI** y **JC perdió el histórico** de cotizaciones y pólizas de Vital 360. **NO lo causó la actualización de tarifas del 15 jul (`3f0119e`)**: ese commit solo tocó las tablas `PRIMAS_USD`/`PRIMAS_CRC` y `TARIFAS_VERSION`, que únicamente alimenta el badge del cliente y un `console.log` — no toca el historial. Dejar el dato escrito para que la próxima vez **no se vuelva a culpar al cambio de tarifas**. Diagnóstico y método en la memoria `feedback_localstorage_limpiadores_disco_borrado_masivo`. Corolario de diseño: **el `localStorage` NO es la fuente de la verdad**; por eso los correos enviados pasaron a ser el respaldo real.

Banda dorada en la pestaña "Mis cotizaciones" (visible incluso con historial vacío) con 3 botones:

- **⬇ Respaldar** (`exportarRespaldo`) — descarga `vital360-respaldo-AAAA-MM-DD.json`.
- **⬆ Importar** (`importarRespaldo`) — restaura desde el archivo; dedup por nombre+cédula, no sobrescribe.
- **✉ Recuperar desde Gmail** (`recuperarDesdeGmail`) — **los correos enviados SON el respaldo real.** Busca `in:sent subject:"Vital 360"` (los 3 asuntos lo contienen), extrae de cada cuerpo HTML el link `?c=` → `decodePayload` → registro completo. El `?p=` de la guía reconstruye `polizaData` (nº, plan vía nombre→id, vigencia, moneda inferida de `suma`) y marca `aceptada`; el asunto "…está vigente · N.º X" cubre la plantilla B (autocontenida, sin link). **Fusiona con dedup por nombre+cédula** (mismo criterio que ⬆ Importar) y **sin sobrescribir** lo que ya está; renumera si un N.º de póliza choca con otro cliente.

**Scope `gmail.readonly` por AUTORIZACIÓN INCREMENTAL** — regla de diseño, no tocar: cliente OAuth aparte (`getGmailReadToken`, `prompt:'consent'`), se pide **solo** al pulsar el botón y se **revoca al terminar** (`revocarTokenLectura`). La app opera siempre con `gmail.send`. Razón: ningún agente de la whitelist (RNB, futuros) debe conceder lectura de todo su correo solo para cotizar. Si al pulsar sale `invalid_scope`, hay que declarar `gmail.readonly` en Google Cloud Console → OAuth consent screen → Scopes.

**Dos trampas ya resueltas (no reintroducir) — cazadas en verificación, NO en el review:**
- `_gmailCuerpo` **debe** barrer el árbol MIME buscando `text/html` ANTES de caer a `text/plain`: en un multipart el plano va primero, y sin HTML no hay link `?c=` → los correos con PDF adjunto **no se habrían recuperado nunca**.
- `_parseVigenciaInicio` revierte `vigenciaTexto`, cuyo formato real es **"15 jul 2026"** (mes abreviado de 3 letras vía `fmtFechaEs`), NO "15 de julio de 2026".

**Registro de verificación (16 jul 2026) — no repetir este trabajo:** **28 pruebas en preview**, a saber: round-trip exacto del payload sobre un correo real de `buildEmailVital360` **con tildes y ñ** · árbol MIME **con adjunto** · vigencia ida y vuelta en **5 fechas, incluidos los bordes dic/ene** · dedup · archivo inválido · **1 click = 1 handler tras 10 binds** (regla #9 de idempotencia). Smoke tests en verde. **La feature no toca primas ni cálculo.**

### Envío de correos · Gmail API directo

Mismo patrón que cotizador-autos:
- `initGmailTokenClient` (GIS Token Model)
- `getGmailToken` → popup OAuth con scope `gmail.send` la primera vez, después cacheado 1 hora
- `buildMimeVital360` arma el MIME (HTML en base64 + `Content-Disposition: inline`) y lo pasa por base64url
- `sendGmailRaw` POST a `https://gmail.googleapis.com/gmail/v1/users/me/messages/send`
- `enviarEmailDirecto({to,subject,html,attachments,btnEl,wrapEl})` elige builder según haya adjuntos
- Botón "🚀 Enviar ahora desde Gmail" en los modales de preview
- Alternativas manuales: copiar HTML / abrir Gmail compose / descargar .eml

## Assets en `docs/`

- **15 PDFs informativos** del INS: solicitud-vital-360, autorizacion-expedientes, declaracion-salud, declaracion-medica, boleta-examen-fisico, solicitud-abreviada, solicitud-beneficios, condiciones-generales, guia-aseguramiento, coberturas-planes-crc, coberturas-planes-usd, red-medica, medicina-virtual-360, asistencia-viajero-360, cobertura-dental-360
- **solicitud-preautorizacion.pdf** (INS-F-1003916 · Parte I la llena el cliente, Partes II-III el médico) — agregado para la guía de reclamos
- **Tarifas:** `Primas en Colones 2026.pdf` + `Primas en Dolares 2026.pdf` (VIGENTES) · `primas-vital-360.pdf` (tarifa VIEJA, se conserva como respaldo de la auditoría del 11 jun; venía suelta de `C:/Users/segur/vital 360/Primas.pdf`)
- **periodos-espera.jpg** (imagen oficial INS)
- **13 esquemas oficiales JPG** en `docs/esquemas/` — pares CRC/USD por plan (Platinum 2 solo en USD, fallback con nota aclaratoria)
- **Spec y plan originales** (verificado en disco 22 jul 2026, son los dos únicos archivos ahí):
  - `docs/superpowers/specs/2026-05-18-cotizador-vital-360-design.md` — diseño inicial
  - `docs/superpowers/plans/2026-05-18-cotizador-vital-360-mvp.md` — plan MVP, las 15 tareas ejecutadas

## Reglas críticas (R1/R2/R3 estilo SASINS)

1. **IVA 2 % — REGLA NUEVA (JC, 21 jul 2026): el IVA SÍ se suma y se muestra DESGLOSADO** (prima + IVA = total, ambos visibles para el cliente). Esto **revierte y deroga** la regla vieja "el IVA nunca se suma, solo es nota visual, sumarlo es bug crítico SUGESE" — **no reinstalarla.** `IVA_PCT = 0.02` (Ley 9635, seguros de personas). **Layout DEFINIDO el 27 jul 2026 — ya no hay nada que preguntarle:** el IVA se refleja en TODO cálculo que vea el cliente (incluido el desglose por miembro), la cifra grande es siempre el total con IVA y `prima + IVA` va como línea susurro debajo. Redondeo, excepción de WhatsApp y regla de cuotas: ver **Pendientes abiertos #1**, que trae la decisión completa. ⚠️ El comentario de `IVA_PCT` en `index.html` (hoy línea 885) todavía dice *"NUNCA sumado, solo nota visual"* — la regla derogada. **Corregirlo en el mismo commit que implemente el IVA.**
2. **WhatsApp endpoint** SIEMPRE `web.whatsapp.com/send/?phone=506...` — NUNCA `wa.me` (corrompe emojis a `�`).
3. **fmtMoneda CRC** fuerza punto manual (no `toLocaleString("es-CR")` porque Chrome moderno usa NBSP en lugar de punto).
4. **Solo un titular permitido** entre asegurados — validar en el guardado del modal.
5. **Plan emitido puede diferir del cotizado** — el selector del modal de póliza vigente expone los 7 planes (no solo los cotizados).
6. **Email del cliente** se captura en el modal del TITULAR (no como form separado). El cliente del cotizador y el contratante son la misma persona por diseño.
7. **Disparadores de documentos** son deterministas según asegurados + planes cotizados (`calcularDocumentos()`). Cualquier cambio a esas reglas tiene que verificarse contra la Guía de Aseguramiento INS. **Arraigo (Guía de Suscripción INS, sección E):** aplica a los planes **Internacionales** (para Local/Regional basta el pasaporte) y desde la auditoría del 11 jun se dispara si **CUALQUIER** plan cotizado es internacional y hay extranjero temporal/pasaporte — antes solo miraba el plan recomendado.
8. **Reembolso** SIEMPRE a `clientescgsp@grupoins.com` (Centro de Gestión de Seguros Personales). No usar otro email aunque parezca lógico.
9. **Funciones `bind*Events()` deben ser idempotentes.** `renderAgente()` las llama en CADA render y el login real dispara varios renders. Las que registran listeners en elementos persistentes (`root [data-view=agente]`, `document.body`) DEBEN tener guard `if(el.dataset.xBound) return; el.dataset.xBound="1"`. Sin guard los listeners se acumulan → un click dispara N handlers → N modales apilados con IDs duplicados → `getElementById` lee el modal equivocado (vacío). Bug del 29 may (commit `d7307f9`): el modal "Agregar asegurado" rechazaba datos válidos con "Nombre y edad válida son requeridos". `bindPaso1Events`/`bindPaso2Events` arreglados; `bindHistorialEvents`/`bindTabsEvents`/`bindVigentesEvents` ya tenían guard. Defensa extra: `openAsegModal()` remueve cualquier modal previo antes de insertar.
10. **NO "corregir" el ₡2.750.000 / $5.000 de "Transporte por evacuación" del plan Pro 1** al ₡275.000 / $500 del folleto INS: es un apartamiento deliberado por orden de JC (16 jul 2026, `4a91b72`) y solo se revierte si el INS lo confirma **por escrito**. Detalle completo y evidencia en la sección "Transporte por evacuación de Pro 1".
11. **El correo NUNCA lleva el enlace corto** — conserva el `?c=` largo porque de él depende "✉ Recuperar desde Gmail". El corto va solo en WhatsApp y en Copiar link. Detalle y las otras 3 reglas del enlace corto en su sección propia.
12. **El detalle se abre ANCLADO a la fila que se tocó** (regla de JC, 27 jul 2026) — nunca al final del subgrupo ni de la lista. En un teléfono, un panel que abre fuera de pantalla se lee como "el botón no sirve". Tres exigencias: (a) el panel se inserta inmediatamente después de la fila tocada; (b) la fila acusa recibo en el acto (borde teal de 2 px envolviendo fila y panel como una sola pieza, chevron de › a ⌄); (c) al abrir, la fila se pega bajo la barra y el panel entra en pantalla. **Verificar con `getComputedStyle`, nunca con `.hidden`** (ver regla #9 y el bug del 20 jul).
13. **XSS — escapar SIEMPRE en los sinks de `innerHTML`** (fix de la auditoría del 11 jun): la vista cliente `?c=` inyectaba `p.fecha`, `p.vigenciaDias` y `a.edad` sin escapar → hoy pasan por `escapeHtml`. Y `guia-reclamos.html` asignaba `linkCP` a un `href` sin validar → hoy **solo acepta `http(s)://`**, lo que neutraliza `javascript:` y `data:`. No aflojar ninguno de los dos.

## Recursos externos

- **Logo INS** (hosteado en Portal SDI): `https://cotizador.appsegurosdigitales.com/img/ins-logo.png`
- **OAuth Client ID** (compartido con Cotizador Autos SDI · proyecto Google Cloud "Cotizador Autos SDI"): `255791314248-apgnrs0tiii72ogau5dpsjm2eie6d2hu.apps.googleusercontent.com`
- **Authorized JavaScript origins** en Google Cloud: 3 URLs de Vital 360 (vital360.appsegurosdigitales.com / cotizador-vital360.netlify.app / localhost:8930) + las 2 del cotizador-autos (no tocar)
- **Test Users en Google Cloud Console** (modo Prueba): `jhernandez@segurosdelins.com`, `chernandez@seguros-ins.com`, `tramites@segurosdelins.com`, `rnbseguros@gmail.com`, `innovaseguroscrc@gmail.com` (agregado 20 jul), `paolo@segurosticos.com` (Seguros Ticos, agregado en `AGENTES` el 21 jul — **JC debe confirmar el paso Test User en Cloud**). Nota: para habilitar un agente hacen falta DOS pasos → (1) Test Users en Google Cloud y (2) llave en `AGENTES`. Si aparece "Acceso restringido · Email autenticado: X" es que pasó (1) pero falta (2). Link directo a la pantalla de Test users: `https://console.cloud.google.com/auth/audience?project=255791314248`.

## Pendientes abiertos

**Batch de mejoras (revisión del colega RNB + JC, 21 jul 2026 — para otra sesión).** Origen: una conversación de WhatsApp con observaciones. Los QUICK WINS ya se hicieron (`45aa20b`: tipografía Camino B, periodos "meses", link Red de Proveedores). Quedan:

1. **IVA 2 % sumado y desglosado** — ✅ **EN PROD desde el 27 jul 2026 (`3c547d0`).** Implementado en la sección 2b de `index.html`: `totalesPlan()` + `desgloseMiembros()` + `cuotasReconciliadas()`, fuente ÚNICA de página, correo y WhatsApp. 42 casos verificados (7 planes × 2 monedas × 3 modalidades). 🔴 Un detalle que costó un ciclo de smoke: **el total es la suma de las PARTES redondeadas (prima + IVA), no el redondeo de la suma** — si no, lo que el cliente ve en pantalla no le cuadra (Pro 1 trimestral: 1.813.140 + 36.263 = **1.849.403**). El aporte por persona es su prima × 1,02, reproducible a mano por el cliente; repartir proporcionalmente sobre el total daba cifras no verificables. JC ratificó: el IVA **se refleja en TODO cálculo que vea el cliente**, incluido el desglose por miembro. Regla de jerarquía: **la cifra grande es siempre el TOTAL CON IVA**; `prima + IVA` va como línea susurro debajo, en gris pequeño — no se esconde el IVA, se le quita rango. **Redondeo ratificado por JC:** el total oficial es el **2 % sobre la prima total** (es lo que factura el INS) y el residuo de ±1 colón se carga **al titular**, NUNCA "al de mayor residuo" (si no, dos hijos de la misma edad y misma prima salen con cifras distintas). **Excepción autorizada por JC para WhatsApp:** ahí no cabe el desglose sin que el mensaje se colapse, así que la única cifra del mensaje ya es el total con IVA, rotulado antes de aparecer ("ya con IVA"); el desglose vive en la página y el correo. **Cuotas: se reconcilian, no se multiplican** — Pro 1 trimestral total ₡1.849.402 = 2 cuotas de 462.351 + 2 de 462.350; imprimir la cuota redondeada × 4 publica ₡1.849.404, un total que no existe en ninguna tabla del INS. Con pago fraccionado el renglón por persona **no se llama "prima"** (la prima de tarifa no cambia nunca): se llama **"aporte del año"** = prima + fraccionamiento + IVA.
2. **Enviar las 7 opciones + desglose por miembro + comparador — ✅ EN PROD desde el 27 jul 2026 (`3c547d0`).** Origen: un agente amigo pidió mandar las 7 y que se vea cuánto aporta cada miembro. Mockups a 375 px con cifras reales: artifact `769915c8-7708-4672-beb6-a93144623565`. **Sistema elegido: "El consejo objetivo".** Un plan manda la pantalla y los otros 6 nacen VISIBLES en una escalera vertical (nunca detrás de un acordeón; el acordeón es solo para el DETALLE). 🔴 **El porqué del recomendado NO lo escribe el agente** — JC dijo expresamente "que sea standard y objetivo": el agente solo marca el recomendado (un clic, ya existe) y **la app calcula la justificación** contra el plan anterior y el siguiente (delta de precio + coberturas que cambian, sin adjetivos). Verificado que alcanza: cada par de planes vecinos tiene 6-14 diferencias reales de cobertura. Ventaja no obvia: el texto calculado está **obligado a decir lo que empeora** (Pro 1→Pro 2 el deducible sube de ₡55.000 a ₡110.000), cosa que un texto de venta se salta — importa con licencia SUGESE. **Orden de la página (10 bloques):** encabezado · recomendado con porqué calculado · recibo por miembro · formas de pago · qué cubre (9 clave visibles + 28 y esquema INS a un toque) · escalera de las otras 6 · **comparador del cliente (elige hasta 3)** · servicios · documentos y esperas · cierre. **El comparador reutiliza `renderClienteCmpDetallada`**, que ya arma sus columnas desde una lista de plan ids: solo cambia el origen de la lista (selección del agente → casillas del cliente). Tope de 3 por ancho de pantalla, no por límite técnico. **La tabla de 28 pasa a un plan a la vez** (con 7 planes serían 8 columnas). Ver también las Reglas críticas #12 (anclaje) y el pendiente 1 (IVA). *Histórico, SUPERSEDIDO — no trabajar desde acá:* el 21 jul JC había descartado un rediseño grande (panel lateral / bottom-sheet) y el alcance era "dejar la vista cliente ACTUAL intacta". El 27 jul se reabrió a pedido suyo, porque el desglose por miembro cambia la presentación de raíz, y **quedaron contestadas** sus dos preguntas de entonces: el agente manda los 7 (no hay tope de 3 en el envío) y **el comparador va aparte**, al final, sin reemplazar la tabla de 28.
3. **[BUG prioritario] WhatsApp no abre desde el móvil** — `web.whatsapp.com/send/` falla en celular. Tensión directa con la regla #2 (nunca `wa.me`, corrompe emojis). Resolverlo sin romper desktop ni los emojis.
4. **Interfaz móvil** en general por mejorar.
5. ~~**Acortar el link `?c=`**~~ — ✅ **HECHO el 27 jul 2026** con Function propia (`/c/XXXXXXXXXX`, 51 caracteres). Se descartó TinyURL justamente por la privacidad del payload: los datos quedan en nuestro Netlify. Ver la sección "Enlace corto".
6. **Flujo de intake / aceptación:** formulario pre-llenado + correo de la opción aceptada.
7. **KYC** en los formularios.
8. **Documentos linkeados / resumidos** — pedirle a JC que precise el alcance.

**Otros pendientes:**
- 🔴 **Línea clara, segunda tanda (JC, 9 sep 2026):** faltan los correos **B (póliza vigente)** y **C (guía de reclamos)**. En la B hay una decisión pendiente: la caja navy de teléfonos INS y la dorada de derechos del asegurado — ¿pasan a banda pálida o el color se queda porque son avisos operativos? Proponérselo antes de tocar. Después, `guia-reclamos.html`, que sigue con el look anterior.
- 🔴 **El disclaimer legal del cliente contradice al IVA.** `renderClienteDisclaimers` sigue diciendo que las primas **"no incluyen el IVA"**, cuando desde el 27 jul (`3c547d0`) TODA cifra lo incluye. Es un texto que firma un intermediario con licencia; la redacción la decide JC, por eso no se corrigió dentro de un commit de estética. Se le planteó el 9 sep y quedó abierto.
- En la consola del agente los botones aún llevan emojis (⬇ ✉ 👁 🗑). Quitarlos toca muchas plantillas de texto, no CSS; JC no lo ha pedido.
- Quedó una entrada de prueba en los Blobs de producción del enlace corto (`R2W6K687LB`, datos ficticios) del smoke del 9 sep. La Function no expone DELETE; es inofensiva y purgable.
- 🔴 **Smoke de JC sobre la feature grande (`3c547d0`) — SIN HACER.** Es un cambio que tocó el cálculo, la vista cliente, el correo y el WhatsApp en un solo commit, y **no tuvo cooldown**. Lo que hay que mirar en un teléfono real: (1) que el WhatsApp entre sin "Leer más" y el enlace esté en la línea 2; (2) **que al tocar un plan de la escalera se vea que pasó algo** — es la regla #12 y es lo que no se puede validar en emulador; (3) que el comparador deje marcar 3 y bloquee el cuarto; (4) que al cambiar a dólares se recalcule todo, incluido el recibo. Hasta entonces, no mandarla a un cliente real.
- **Smoke de JC sobre las formas de pago por plan (`4de3209`) — pendiente.** Se acumula al de `3c547d0` (misma sección de la vista cliente). En el teléfono: abrir una de "las otras opciones" y ver que el bloque **Cómo pagarlo** aparece completo, que la fila resaltada es la del chip elegido arriba, y que las filas de la escalera **ya no se leen como un párrafo corrido** (ese era el defecto que se cerró de paso).
- **Verificar el pegado real de "📋 Copiar correo" en Gmail** — el fix `a7942ac` no se pudo probar de punta a punta (el portapapeles necesita foco de ventana). Que un agente copie y pegue una vez.
- Reenviar la cotización de la clienta de Innova Seguros (N.º 01926) que salió en código crudo.
- CNAME `vital360` → `cotizador-vital360.netlify.app` en el DNS de `appsegurosdigitales.com`.
- Confirmar que `gmail.readonly` funciona en el OAuth real (JC debe pulsar "✉ Recuperar desde Gmail" una vez; si sale `invalid_scope`, declararlo en el consent screen).
- `paolo@segurosticos.com` como **Test User** en Google Cloud — paso de JC, no del repo (link y detalle en "Recursos externos").
- Si el proyecto pasa a verificación/producción en Google: pre-declarar el scope `gmail.send` en "Acceso a los datos" del OAuth Client.
- Recoger el feedback de revisión del colega RNB Seguros (`rnbseguros@gmail.com`, WhatsApp 8892 9543).
- Eventual app-link desde el Portal SDI launcher.
- **Consulta al INS por el monto de "Transporte por evacuación" de Pro 1** — sigue sin enviarse (ver esa sección).
- **Guía de reclamos:** (a) que la Plantilla B (`buildEmailPolizaVigente`) incluya el link a la guía — hoy son flujos separados, la B embebe la guía en HTML y la página es la referencia persistente; (b) ~~mockup-tab-polizas.html~~ ✅ resuelto el 27 jul (`122f63f`): fuera del repo, en disco e ignorado; (c) el modo demo de `guia-reclamos.html` (sin `?p=`) todavía muestra datos de ejemplo "Carlos Rodríguez" en el hero — inofensivo porque el flujo real siempre lleva `?p=`, pulir a placeholders si molesta.

## Cuándo usar este skill

- Cualquier cambio o mejora al cotizador Vital 360
- Bugs reportados por JC o por agentes que prueben el cotizador
- Agregar nuevos agentes a la whitelist
- Ajustar tarifas cuando INS las actualice (`PRIMAS_USD`, `PRIMAS_CRC`, `TARIFAS_VERSION`)
- Ajustes a las plantillas de correo (cotización corta, póliza vigente, o correo de la guía)
- Cambios a la página standalone `guia-reclamos.html` (escenarios de reclamo, documentos, contactos INS)
- Cambios a los textos legales (Condiciones Generales, periodos de espera, modalidades de reclamo)
- Agregar nuevos esquemas o PDFs informativos cuando el INS los publique
- Migración del subdominio Netlify al definitivo `vital360.appsegurosdigitales.com`

## Protocolo de trabajo

1. **Leer este SKILL.md COMPLETO antes de tocar código.**
2. Tener el preview local corriendo (`npx serve` puerto 8930 vía launch.json `vital360`).
3. Hacer ediciones en `C:/Users/segur/cotizador-vital-360/index.html`.
4. Verificar en el preview con `mcp__Claude_Preview__preview_eval` o screenshot antes de pushear.
5. Commit por cambio coherente (mensaje descriptivo, no `wip`) → `git push origin main`.
6. Netlify deploya automático en 1-2 min.
7. Si hay duda sobre cláusulas INS, consultar `docs/condiciones-generales.pdf` con `pdftotext`.

---

> **Ubicaciones canon (desde el 6 sep 2026, decisión 10-C):** `jhernandez-vibecode/cotizador-vital-360` → `.claude/skills/especialista-cotizador-vital-360/SKILL.md` y `C:\Users\segur\.claude\skills\especialista-cotizador-vital-360\SKILL.md`, byte-idénticas. Se edita en el repo, se commitea y se copia al user-level (o al revés, pero siempre las dos en el mismo día).
