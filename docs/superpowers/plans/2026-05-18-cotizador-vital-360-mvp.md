# Cotizador Vital 360 · MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir el cotizador Vital 360 single-file (HTML + CSS + JS vanilla) con vista agente (7 planes, scanner, comparativa, selección de 3, envío WhatsApp) y vista cliente (link stateless con 3 planes elegidos, toggle CRC/USD, formas de pago, documentos dinámicos según composición), deployar a Netlify en `vital360.appsegurosdigitales.com`.

**Architecture:** Single-file `index.html` con CSS en `<style>` y JS en `<script>` embebidos. Cero backend, cero build step, cero frameworks. Routing por query param `?c=BASE64` distingue vista cliente. Auth Google con whitelist hardcoded (`AGENTES` object). Datos del producto (tablas de primas, coberturas, recargos) hardcoded como constantes JS. Lógica determinística de documentos requeridos (5 disparadores) basada en composición de la cotización.

**Tech Stack:**
- HTML5 + CSS3 + JS vanilla (ES2020+)
- Google Fonts: IBM Plex Sans / Serif / Mono
- Google Identity Services (GIS) para auth
- Netlify para deploy y subdominio
- Sin Node, sin npm, sin bundler

**Spec:** `docs/superpowers/specs/2026-05-18-cotizador-vital-360-design.md`

**Mockups visuales de referencia** (existen en `C:\Users\segur\vital 360\mockups\`):
- `mockup-C-institucional-ins.html` — vista agente versión inicial
- `mockup-C-vista-agente-v2.html` — vista agente final (7 planes scanner + comparativa)
- `mockup-C-vista-cliente.html` — vista cliente caso simple
- `mockup-C-vista-cliente-caso-extremo.html` — vista cliente con 3 disparadores activos

**Estrategia de testing:** Por ser vanilla single-file sin build step, no hay framework de tests. Se usan:
1. **Smoke tests inline** con `console.assert` para funciones puras (cálculos, routing, disparadores) — se ejecutan al cargar la página y reportan en consola
2. **Verificación visual** abriendo `index.html` en navegador después de cada tarea
3. **Commits frecuentes** después de cada tarea

---

## Estructura de archivos del proyecto

```
cotizador-vital-360/
├── index.html              # Single-file app
├── docs/                   # PDFs descargables (Task 13)
│   ├── solicitud-vital-360.pdf
│   ├── autorizacion-expedientes.pdf
│   ├── declaracion-salud.pdf
│   ├── boleta-examen-fisico.pdf
│   ├── solicitud-abreviada.pdf
│   ├── condiciones-generales.pdf
│   ├── guia-aseguramiento.pdf
│   ├── coberturas-planes-crc.pdf
│   ├── coberturas-planes-usd.pdf
│   ├── periodos-espera.jpg
│   └── red-medica.pdf
├── docs/superpowers/       # Documentación del proyecto (ya existe)
│   ├── specs/
│   └── plans/
├── netlify.toml            # Config deploy (Task 14)
├── README.md               # Task 14
└── .gitignore              # Task 1
```

Toda la aplicación vive en `index.html`. El JS está organizado en secciones lógicas dentro del mismo `<script>`:

1. Datos del producto (constantes)
2. Funciones de cálculo
3. Lógica de disparadores de documentos
4. Routing y payload Base64URL
5. Auth Google
6. Estado y persistencia
7. Render vista agente
8. Render vista cliente
9. WhatsApp
10. Init

---

## Task 1: Setup del repo · skeleton HTML, .gitignore y README inicial

**Files:**
- Create: `index.html`
- Create: `.gitignore`
- Create: `README.md`

- [ ] **Step 1: Crear `.gitignore`**

```
# OS
.DS_Store
Thumbs.db
desktop.ini

# IDE
.vscode/
.idea/
*.swp
*.swo

# Local notes / drafts
notas-locales/
*.local.md

# Netlify
.netlify/
```

- [ ] **Step 2: Crear `README.md` inicial**

```markdown
# Cotizador Vital 360

Cotizador del seguro Vital 360 del Instituto Nacional de Seguros de Costa Rica, desarrollado por Seguros Digitales SDI.

- **Producto:** Seguro Vital 360 (gastos médicos · INS Costa Rica)
- **Deploy:** https://vital360.appsegurosdigitales.com
- **Stack:** HTML + CSS + JS vanilla single-file, sin backend, deploy en Netlify
- **Diseño:** ver [docs/superpowers/specs/2026-05-18-cotizador-vital-360-design.md](docs/superpowers/specs/2026-05-18-cotizador-vital-360-design.md)
- **Plan de implementación:** ver [docs/superpowers/plans/2026-05-18-cotizador-vital-360-mvp.md](docs/superpowers/plans/2026-05-18-cotizador-vital-360-mvp.md)

## Uso local

Abrir `index.html` con doble clic. No requiere servidor ni build.

## Deploy

Push a `main` → Netlify hace deploy automático.

## Mantenimiento

Cuando el INS actualice tarifas:
1. Reemplazar el objeto `TABLA_PRIMAS` en `index.html`
2. Incrementar la constante `TARIFAS_VERSION`
3. Commit + push
```

- [ ] **Step 3: Crear `index.html` con skeleton mínimo**

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Vital 360 · Cotizador · Seguros Digitales</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Serif:ital,wght@0,400;0,500;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    /* CSS se agrega en Task 2 */
    body { font-family: 'IBM Plex Sans', sans-serif; padding: 40px; }
  </style>
</head>
<body>
  <h1>Cotizador Vital 360</h1>
  <p id="status">Cargando…</p>

  <script>
    // ===== Sección 10: Init =====
    document.getElementById('status').textContent = 'Skeleton OK · ' + new Date().toISOString();
    console.log('[vital360] skeleton cargado');
  </script>
</body>
</html>
```

- [ ] **Step 4: Verificar en navegador**

Abrir `index.html` con doble clic. Esperado: la página muestra "Cotizador Vital 360" y "Skeleton OK · <fecha actual>". En la consola del navegador (F12) debe aparecer `[vital360] skeleton cargado`.

- [ ] **Step 5: Commit**

```bash
git add .gitignore README.md index.html
git commit -m "feat: skeleton inicial del cotizador Vital 360"
```

---

## Task 2: CSS tokens, tipografía y componentes base

**Files:**
- Modify: `index.html` (reemplazar el `<style>` placeholder por el sistema visual completo)

- [ ] **Step 1: Reemplazar el bloque `<style>` con los tokens y componentes base**

Reemplazar todo el contenido entre `<style>` y `</style>` con:

```css
:root{
  --ins-teal:#1F5C6B;
  --ins-teal-deep:#143F4A;
  --ins-teal-soft:#E3EEF1;
  --ins-teal-line:#C7DBE0;
  --ins-coral:#E36B43;
  --ins-coral-soft:#FCE6DC;
  --ins-coral-deep:#B94F2B;
  --ins-gold:#C18A2C;
  --cream:#F7F1E4;
  --cream-2:#EFE8D5;
  --paper:#FFFFFF;
  --ink:#0E2127;
  --ink-2:#34464D;
  --ink-3:#6A7A80;
  --line:#D7DCDE;
  --line-2:#EBEDEE;
  --green-ok:#19A65A;
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{font-family:"IBM Plex Sans",sans-serif;background:var(--paper);color:var(--ink);-webkit-font-smoothing:antialiased}
body{font-size:13.5px;line-height:1.5;letter-spacing:-0.005em;min-height:100vh}
.serif{font-family:"IBM Plex Serif",serif}
.mono{font-family:"IBM Plex Mono",monospace;font-size:.88em}

/* Brand */
.brand-logo{display:flex;align-items:baseline;gap:6px}
.brand-logo .word{font-family:"IBM Plex Sans";font-weight:300;font-size:30px;letter-spacing:-0.02em;line-height:1;color:var(--ink)}
.brand-logo .num{font-family:"IBM Plex Sans";font-weight:300;font-size:16px;vertical-align:super;color:var(--ins-coral);margin-left:-2px}

/* Buttons */
.btn{padding:11px 16px;border-radius:4px;font-family:inherit;font-size:13.5px;font-weight:600;cursor:pointer;border:1px solid;letter-spacing:-0.005em;display:inline-flex;align-items:center;justify-content:center;gap:8px}
.btn-primary{background:var(--ins-coral);color:#fff;border-color:var(--ins-coral)}
.btn-primary:hover{background:var(--ins-coral-deep);border-color:var(--ins-coral-deep)}
.btn-secondary{background:var(--paper);color:var(--ink-2);border-color:var(--line)}
.btn-secondary:hover{border-color:var(--ink-3)}

/* Hidden by default — vistas se muestran/ocultan con JS */
[data-view]{display:none}
[data-view].active{display:block}

/* Loading state */
.loading{padding:60px 40px;text-align:center;color:var(--ink-3);font-family:"IBM Plex Mono";font-size:12px}
```

- [ ] **Step 2: Actualizar el `<body>` para reflejar el sistema de vistas**

Reemplazar el contenido del `<body>` (antes del `<script>`) con:

```html
  <!-- Vistas: una sola se muestra según routing (data-view + clase 'active' por JS) -->
  <div data-view="loading" class="active">
    <div class="loading">Cargando cotizador Vital 360…</div>
  </div>

  <div data-view="agente">
    <!-- Vista agente — se construye en Tasks 6-10 -->
    <div class="loading">Vista agente (placeholder)</div>
  </div>

  <div data-view="cliente">
    <!-- Vista cliente — se construye en Tasks 11-15 -->
    <div class="loading">Vista cliente (placeholder)</div>
  </div>

  <div data-view="bloqueado">
    <div class="loading">Acceso restringido (placeholder)</div>
  </div>
```

- [ ] **Step 3: Verificar en navegador**

Abrir `index.html`. Esperado: aparece la palabra "Cargando cotizador Vital 360…" en gris pequeño, centrada. Las otras vistas no son visibles (display:none).

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: tokens CSS + sistema de vistas (loading, agente, cliente, bloqueado)"
```

---

## Task 3: Datos del producto · constantes JS y smoke tests

**Files:**
- Modify: `index.html` (agregar la sección 1 del `<script>`: constantes del producto)

Reemplazar el contenido del `<script>` con la primera sección de datos y un smoke test que loguea conteos en consola para verificar:

- [ ] **Step 1: Agregar las constantes del producto**

```javascript
    // =====================================================================
    // Sección 1: Datos del producto Vital 360
    // Fuente: folletos oficiales INS — Coberturas y Planes, Primas Anuales
    // =====================================================================

    const TARIFAS_VERSION = "INS-2026-mayo";

    // Los 7 planes, ordenados por ámbito
    const PLANES = [
      { id: "esencial1",  nombre: "Esencial 1",  ambito: "Local · Costa Rica",      sumaUSD: 15000,   sumaCRC: 8250000,    deducibleUSD: 0,    deducibleCRC: 0 },
      { id: "esencial2",  nombre: "Esencial 2",  ambito: "Local · Costa Rica",      sumaUSD: 25000,   sumaCRC: 13750000,   deducibleUSD: 0,    deducibleCRC: 0 },
      { id: "pro1",       nombre: "Pro 1",       ambito: "Regional · Centroamérica", sumaUSD: 50000,   sumaCRC: 27500000,   deducibleUSD: 100,  deducibleCRC: 55000 },
      { id: "pro2",       nombre: "Pro 2",       ambito: "Regional · Centroamérica", sumaUSD: 100000,  sumaCRC: 55000000,   deducibleUSD: 200,  deducibleCRC: 110000 },
      { id: "platinum1",  nombre: "Platinum 1",  ambito: "Internacional · Mundo",    sumaUSD: 300000,  sumaCRC: 165000000,  deducibleUSD: 250,  deducibleCRC: 137500 },
      { id: "platinum2",  nombre: "Platinum 2",  ambito: "Internacional · Mundo",    sumaUSD: 500000,  sumaCRC: 275000000,  deducibleUSD: 500,  deducibleCRC: 275000 },
      { id: "deluxe",     nombre: "Deluxe",      ambito: "Internacional · Mundo",    sumaUSD: 1000000, sumaCRC: 550000000,  deducibleUSD: 1000, deducibleCRC: 550000 }
    ];

    const ID_PLAN_INTERNACIONAL = ["platinum1", "platinum2", "deluxe"];

    // Rangos de edad — 13 rangos definidos por INS
    const RANGOS_EDAD = [
      "0-25", "26-29", "30-34", "35-39", "40-44", "45-49",
      "50-54", "55-59", "60-64", "65-69", "70-75", "76-80", "81+"
    ];

    // Tabla de primas anuales USD — primas[rango][plan_id]
    // Fuente: Primas.pdf · folleto oficial INS dólares
    const PRIMAS_USD = {
      "0-25":  { esencial1: 334,   esencial2: 353,   pro1: 445,   pro2: 682,   platinum1: 855,   platinum2: 1174, deluxe: 1176 },
      "26-29": { esencial1: 478,   esencial2: 504,   pro1: 632,   pro2: 968,   platinum1: 1035,  platinum2: 1421, deluxe: 1541 },
      "30-34": { esencial1: 568,   esencial2: 599,   pro1: 758,   pro2: 1114,  platinum1: 1190,  platinum2: 1492, deluxe: 1618 },
      "35-39": { esencial1: 675,   esencial2: 712,   pro1: 910,   pro2: 1270,  platinum1: 1356,  platinum2: 1521, deluxe: 1666 },
      "40-44": { esencial1: 731,   esencial2: 771,   pro1: 1001,  pro2: 1384,  platinum1: 1492,  platinum2: 1613, deluxe: 1799 },
      "45-49": { esencial1: 836,   esencial2: 882,   pro1: 1151,  pro2: 1508,  platinum1: 1641,  platinum2: 1726, deluxe: 1925 },
      "50-54": { esencial1: 965,   esencial2: 1018,  pro1: 1347,  pro2: 1644,  platinum1: 1772,  platinum2: 1898, deluxe: 2060 },
      "55-59": { esencial1: 1153,  esencial2: 1216,  pro1: 1616,  pro2: 1792,  platinum1: 1914,  platinum2: 2088, deluxe: 2349 },
      "60-64": { esencial1: 1436,  esencial2: 1513,  pro1: 2020,  pro2: 2330,  platinum1: 2469,  platinum2: 2547, deluxe: 2818 },
      "65-69": { esencial1: 1859,  esencial2: 1959,  pro1: 2626,  pro2: 2889,  platinum1: 3013,  platinum2: 3133, deluxe: 3664 },
      "70-75": { esencial1: 2425,  esencial2: 2554,  pro1: 3677,  pro2: 4045,  platinum1: 4127,  platinum2: 4386, deluxe: 4946 },
      "76-80": { esencial1: 3404,  esencial2: 3586,  pro1: 5515,  pro2: 5865,  platinum1: 5943,  platinum2: 6229, deluxe: 6430 },
      "81+":   { esencial1: 4775,  esencial2: 5029,  pro1: 8272,  pro2: 8797,  platinum1: 8855,  platinum2: 9281, deluxe: 9645 }
    };

    // Tabla de primas anuales CRC — primas[rango][plan_id]
    // Fuente: Primas.pdf · folleto oficial INS colones
    const PRIMAS_CRC = {
      "0-25":  { esencial1: 183868,  esencial2: 194304,  pro1: 244750,  pro2: 375100,   platinum1: 470250,   platinum2: 645700,   deluxe: 646800 },
      "26-29": { esencial1: 262745,  esencial2: 277356,  pro1: 347545,  pro2: 532642,   platinum1: 569003,   platinum2: 781297,   deluxe: 847308 },
      "30-34": { esencial1: 312438,  esencial2: 329679,  pro1: 417054,  pro2: 612538,   platinum1: 654353,   platinum2: 820362,   deluxe: 889673 },
      "35-39": { esencial1: 371076,  esencial2: 391420,  pro1: 500465,  pro2: 698294,   platinum1: 745962,   platinum2: 836769,   deluxe: 916364 },
      "40-44": { esencial1: 401828,  esencial2: 423800,  pro1: 550511,  pro2: 761140,   platinum1: 820559,   platinum2: 886975,   deluxe: 989673 },
      "45-49": { esencial1: 459950,  esencial2: 484998,  pro1: 633088,  pro2: 829643,   platinum1: 902614,   platinum2: 949063,   deluxe: 1058950 },
      "50-54": { esencial1: 530941,  esencial2: 559746,  pro1: 740713,  pro2: 904311,   platinum1: 974824,   platinum2: 1043970,  deluxe: 1133076 },
      "55-59": { esencial1: 634352,  esencial2: 668630,  pro1: 888856,  pro2: 985698,   platinum1: 1052809,  platinum2: 1148367,  deluxe: 1291707 },
      "60-64": { esencial1: 789794,  esencial2: 832299,  pro1: 1111069, pro2: 1281408,  platinum1: 1358124,  platinum2: 1401008,  deluxe: 1550048 },
      "65-69": { esencial1: 1022699, esencial2: 1077530, pro1: 1444390, pro2: 1588946,  platinum1: 1656911,  platinum2: 1723239,  deluxe: 2015063 },
      "70-75": { esencial1: 1333506, esencial2: 1404787, pro1: 2022146, pro2: 2224524,  platinum1: 2269969,  platinum2: 2412535,  deluxe: 2720335 },
      "76-80": { esencial1: 1872239, esencial2: 1972033, pro1: 3033219, pro2: 3225560,  platinum1: 3268755,  platinum2: 3425800,  deluxe: 3536435 },
      "81+":   { esencial1: 2626466, esencial2: 2766176, pro1: 4549829, pro2: 4838340,  platinum1: 4870445,  platinum2: 5104442,  deluxe: 5304653 }
    };

    // Recargos por fraccionamiento (decisión oficina: SIN mensual)
    const RECARGOS = {
      anual:      { CRC: 0,    USD: 0,    cuotas: 1 },
      semestral:  { CRC: 0.05, USD: 0.03, cuotas: 2 },
      trimestral: { CRC: 0.07, USD: 0.04, cuotas: 4 }
    };

    const IVA_PCT = 0.02; // 2 % — seguros de personas, Ley 9635 CR. NUNCA sumado, solo nota visual.

    // Whitelist de agentes (auth Google)
    const AGENTES = {
      "jhernandez@segurosdelins.com": {
        nombre:   "JC Hernández",
        whatsapp: "8624 8757",
        email:    "jhernandez@segurosdelins.com",
        codigo:   "001"
      }
      // Agregar más agentes acá cuando se autoricen
    };

    // ID de Google OAuth Client — reemplazar con el real antes de deploy
    const GOOGLE_CLIENT_ID = "REEMPLAZAR_ANTES_DE_DEPLOY.apps.googleusercontent.com";
```

- [ ] **Step 2: Agregar smoke tests al final del `<script>`**

```javascript
    // =====================================================================
    // Sección 10: Init + smoke tests
    // =====================================================================
    (function smokeTests(){
      console.assert(PLANES.length === 7, '[smoke] PLANES debe tener 7 elementos');
      console.assert(RANGOS_EDAD.length === 13, '[smoke] RANGOS_EDAD debe tener 13 elementos');
      console.assert(Object.keys(PRIMAS_USD).length === 13, '[smoke] PRIMAS_USD debe tener 13 rangos');
      console.assert(Object.keys(PRIMAS_CRC).length === 13, '[smoke] PRIMAS_CRC debe tener 13 rangos');
      console.assert(PRIMAS_USD["40-44"].pro1 === 1001, '[smoke] prima USD 40-44 Pro 1 debe ser 1001');
      console.assert(PRIMAS_CRC["40-44"].pro1 === 550511, '[smoke] prima CRC 40-44 Pro 1 debe ser 550511');
      console.assert(RECARGOS.semestral.CRC === 0.05, '[smoke] recargo semestral CRC = 5 %');
      console.assert(IVA_PCT === 0.02, '[smoke] IVA = 2 %');
      console.assert(!RECARGOS.mensual, '[smoke] NO debe existir RECARGOS.mensual');
      console.log('[vital360] smoke tests de datos OK · tarifas ' + TARIFAS_VERSION);
    })();

    document.getElementById('status') && (document.getElementById('status').textContent = 'Datos cargados · ' + TARIFAS_VERSION);
```

- [ ] **Step 3: Verificar en navegador**

Abrir `index.html`, abrir consola (F12). Esperado:
- Ningún `console.assert` falla (las assertion errors se mostrarían en rojo)
- Aparece `[vital360] smoke tests de datos OK · tarifas INS-2026-mayo`

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: constantes del producto (7 planes, 2 tablas de primas, recargos, IVA, agentes)"
```

---

## Task 4: Funciones de cálculo + smoke tests

**Files:**
- Modify: `index.html` (agregar Sección 2 del `<script>` antes de la sección 10 de init)

- [ ] **Step 1: Agregar funciones de cálculo justo después de la sección 1**

```javascript
    // =====================================================================
    // Sección 2: Cálculos de prima
    // =====================================================================

    function rangoEdad(edad){
      if(edad < 0) throw new Error('edad inválida: ' + edad);
      if(edad <= 25) return "0-25";
      if(edad <= 29) return "26-29";
      if(edad <= 34) return "30-34";
      if(edad <= 39) return "35-39";
      if(edad <= 44) return "40-44";
      if(edad <= 49) return "45-49";
      if(edad <= 54) return "50-54";
      if(edad <= 59) return "55-59";
      if(edad <= 64) return "60-64";
      if(edad <= 69) return "65-69";
      if(edad <= 75) return "70-75";
      if(edad <= 80) return "76-80";
      return "81+";
    }

    function primaIndividual(planId, moneda, edad){
      const tabla = moneda === "USD" ? PRIMAS_USD : PRIMAS_CRC;
      const rango = rangoEdad(edad);
      const prima = tabla[rango] && tabla[rango][planId];
      if(prima == null) throw new Error('no se encontró prima para plan=' + planId + ' rango=' + rango);
      return prima;
    }

    function primaFamiliar(planId, moneda, asegurados){
      return asegurados.reduce((sum, a) => sum + primaIndividual(planId, moneda, a.edad), 0);
    }

    function totalConRecargo(modalidad, moneda, primaFamiliarAnual){
      const r = RECARGOS[modalidad];
      if(!r) throw new Error('modalidad no válida: ' + modalidad);
      const recargo = moneda === "USD" ? r.USD : r.CRC;
      return primaFamiliarAnual * (1 + recargo);
    }

    function cuotaPorPeriodo(modalidad, moneda, primaFamiliarAnual){
      const r = RECARGOS[modalidad];
      return totalConRecargo(modalidad, moneda, primaFamiliarAnual) / r.cuotas;
    }

    function porPersonaAnio(primaFamiliarAnual, numAsegurados){
      return primaFamiliarAnual / numAsegurados;
    }

    // Formatter: número → "₡1.234.567" o "$1,234.56" según moneda
    function fmtMoneda(n, moneda){
      const v = Math.round(n);
      if(moneda === "USD"){
        return "$" + v.toLocaleString("en-US");
      }
      return "₡" + v.toLocaleString("es-CR");
    }
```

- [ ] **Step 2: Agregar tests al bloque `smokeTests` (DENTRO de la IIFE existente, después de los asserts de Sección 1)**

```javascript
      // Sección 2 · rangoEdad
      console.assert(rangoEdad(0)  === "0-25",  '[smoke] rangoEdad(0)');
      console.assert(rangoEdad(25) === "0-25",  '[smoke] rangoEdad(25)');
      console.assert(rangoEdad(26) === "26-29", '[smoke] rangoEdad(26)');
      console.assert(rangoEdad(42) === "40-44", '[smoke] rangoEdad(42)');
      console.assert(rangoEdad(70) === "70-75", '[smoke] rangoEdad(70)');
      console.assert(rangoEdad(85) === "81+",   '[smoke] rangoEdad(85)');

      // Sección 2 · primaIndividual
      console.assert(primaIndividual("pro1","USD",42) === 1001,   '[smoke] primaIndividual USD 42 pro1');
      console.assert(primaIndividual("pro1","CRC",42) === 550511, '[smoke] primaIndividual CRC 42 pro1');

      // Sección 2 · primaFamiliar (familia ejemplo del spec: 42, 39, 12, 8)
      const familia = [{edad:42},{edad:39},{edad:12},{edad:8}];
      const familiarPro1USD = primaFamiliar("pro1","USD",familia);
      const familiarPro1CRC = primaFamiliar("pro1","CRC",familia);
      // 1001 + 910 + 445 + 445 = 2801 USD
      console.assert(familiarPro1USD === 2801, '[smoke] familia 42·39·12·8 pro1 USD = 2801, got ' + familiarPro1USD);
      // 550511 + 500465 + 244750 + 244750 = 1540476 CRC
      console.assert(familiarPro1CRC === 1540476, '[smoke] familia 42·39·12·8 pro1 CRC = 1540476, got ' + familiarPro1CRC);

      // Sección 2 · recargos
      const totSem = totalConRecargo("semestral","CRC",1000000);
      console.assert(totSem === 1050000, '[smoke] semestral CRC × 1M = 1.05M, got ' + totSem);
      const cuotaSem = cuotaPorPeriodo("semestral","CRC",1000000);
      console.assert(cuotaSem === 525000, '[smoke] cuota semestral CRC × 1M = 525k, got ' + cuotaSem);

      // Sección 2 · formato
      console.assert(fmtMoneda(1768350, "CRC") === "₡1.768.350", '[smoke] fmt CRC, got ' + fmtMoneda(1768350,"CRC"));
      console.assert(fmtMoneda(2801, "USD") === "$2,801", '[smoke] fmt USD, got ' + fmtMoneda(2801,"USD"));
```

- [ ] **Step 3: Verificar en navegador**

Abrir `index.html`, abrir consola. Esperado: ningún `console.assert` falla. Aparece `[vital360] smoke tests de datos OK · tarifas INS-2026-mayo`.

Si algún assert falla aparecerá una línea roja en consola con el mensaje del assert.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: funciones de cálculo (rangoEdad, primaIndividual, primaFamiliar, recargos, fmt)"
```

---

## Task 5: Routing por URL + payload Base64URL

**Files:**
- Modify: `index.html` (agregar Sección 4 del `<script>`)

- [ ] **Step 1: Agregar Sección 3 (disparadores de documentos) y Sección 4 (routing) justo después de la Sección 2**

```javascript
    // =====================================================================
    // Sección 3: Lógica de disparadores de documentos
    // Reglas extraídas de la Guía de Suscripción Vital 360 (INS 15/05/2024)
    // =====================================================================

    function calcularDocumentos(asegurados, planIdRecomendado){
      const docs = {
        base: [
          { id: "solicitud",        nombre: "Solicitud de Seguro Vital 360",     archivo: "docs/solicitud-vital-360.pdf",       desc: "Formulario principal del titular y dependientes. Vigencia 60 días." },
          { id: "autorizacion",     nombre: "Autorización Consulta Expedientes", archivo: "docs/autorizacion-expedientes.pdf",  desc: "Permite al INS verificar información en CCSS y fuentes oficiales." },
          { id: "declaracion-salud",nombre: "Declaración de Salud + COVID-19",   archivo: "docs/declaracion-salud.pdf",         desc: "Declaración jurada. Una por cada asegurado mayor de edad." }
        ],
        disparadores: []
      };

      // Disparador 1: edad 66-70 → telesuscripción
      const conTelesuscripcion = asegurados.filter(a => a.edad >= 66 && a.edad <= 70);
      if(conTelesuscripcion.length){
        docs.disparadores.push({
          id: "telesuscripcion",
          chip: "disparador: edad 66–70",
          titulo: "Por asegurado de 66 a 70 años · " + conTelesuscripcion.map(a => a.nombre).join(", "),
          items: [{
            tipo: "aviso",
            nombre: "Telesuscripción · entrevista dirigida",
            desc: "El INS coordinará una llamada con la persona para una entrevista de aseguramiento. No requiere documento físico; lo coordina el agente una vez completada la solicitud."
          }]
        });
      }

      // Disparador 2: edad 71+ → batería de exámenes
      const conBateria = asegurados.filter(a => a.edad >= 71);
      if(conBateria.length){
        docs.disparadores.push({
          id: "bateria-71plus",
          chip: "disparador: edad ≥ 71",
          titulo: "Por asegurado mayor de 71 años · " + conBateria.map(a => a.nombre + ", " + a.edad).join("; "),
          items: [
            { tipo: "pdf", nombre: "Boleta de Examen Físico", archivo: "docs/boleta-examen-fisico.pdf", desc: "Examen médico presencial firmado por un médico autorizado por el INS." },
            { tipo: "lista", nombre: "Lista de exámenes de laboratorio", desc: "Cubiertos por el INS, deben hacerse en proveedor autorizado. Vigencia 90 días.", examenes: [
              "Uroanálisis",
              "Electrocardiograma de reposo",
              "Valoración cardiovascular",
              "Hemoglobina glicosilada",
              "Glicemia en ayunas",
              "Enzimas hepáticas (ALT, AST, GGT)",
              "Bilirrubina total (directa e indirecta)",
              "Creatinina",
              "Perfil de lípidos",
              "Antígeno prostático (PSA) · hombres",
              "Sangre oculta en heces (Guayaco)"
            ]}
          ]
        });
      }

      // Disparador 3: plan internacional + extranjero sin residencia permanente
      const esInternacional = ID_PLAN_INTERNACIONAL.includes(planIdRecomendado);
      const extranjeros = asegurados.filter(a => a.nacionalidad === "extranjero_residente_temporal" || a.nacionalidad === "extranjero_pasaporte");
      if(esInternacional && extranjeros.length){
        docs.disparadores.push({
          id: "arraigo",
          chip: "disparador: plan internacional + extranjero",
          titulo: "Por plan Internacional + asegurado extranjero · " + extranjeros.map(a => a.nombre).join(", "),
          items: [{
            tipo: "aviso",
            nombre: "Comprobación de arraigo en Costa Rica",
            desc: "Para planes Internacional debe presentar UNO de estos: (a) Cédula de residencia DIMEX, (b) carta del patrono con período de contrato, (c) certificación CCSS con 2+ años de cotización, o (d) certificación de cónyuge costarricense con 3+ años. El agente le indica cuál es la más fácil de aportar."
          }]
        });
      }

      // Disparador 4: 3+ dependientes mayores de 18
      const mayoresDependientes = asegurados.filter(a => a.parentesco !== "titular" && a.edad >= 18);
      if(mayoresDependientes.length >= 3){
        docs.disparadores.push({
          id: "abreviada",
          chip: "disparador: 3+ dependientes mayores de 18",
          titulo: "Por incluir 3 o más dependientes mayores de 18 años",
          items: [{
            tipo: "pdf",
            nombre: "Solicitud Abreviada Vital",
            archivo: "docs/solicitud-abreviada.pdf",
            desc: "Segunda hoja para firmas adicionales. La solicitud principal solo tiene 2 espacios de firma para mayores de edad."
          }]
        });
      }

      return docs;
    }

    // =====================================================================
    // Sección 4: Routing y payload Base64URL
    // =====================================================================

    function determinarVista(){
      const params = new URLSearchParams(location.search);
      const c = params.get("c");
      if(c) return { tipo: "cliente", payload: decodePayload(c) };
      return { tipo: "agente" };
    }

    function encodePayload(obj){
      const json = JSON.stringify(obj);
      // Base64URL: usa - _ en lugar de + / y sin padding
      const b64 = btoa(unescape(encodeURIComponent(json)));
      return b64.replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
    }

    function decodePayload(b64url){
      try {
        let b64 = b64url.replace(/-/g,'+').replace(/_/g,'/');
        while(b64.length % 4) b64 += '=';
        const json = decodeURIComponent(escape(atob(b64)));
        return JSON.parse(json);
      } catch(e){
        console.error('[vital360] payload inválido', e);
        return null;
      }
    }
```

- [ ] **Step 2: Agregar tests al bloque smokeTests**

```javascript
      // Sección 3 · disparadores
      const fam0 = [
        {nombre:"José", parentesco:"titular", edad:42, nacionalidad:"CR"},
        {nombre:"Ana",  parentesco:"conyuge", edad:39, nacionalidad:"CR"},
        {nombre:"Luis", parentesco:"hijo",    edad:12, nacionalidad:"CR"},
        {nombre:"Sofí", parentesco:"hijo",    edad:8,  nacionalidad:"CR"}
      ];
      const docs0 = calcularDocumentos(fam0, "pro1");
      console.assert(docs0.base.length === 3, '[smoke] base = 3 docs');
      console.assert(docs0.disparadores.length === 0, '[smoke] familia simple no debe activar disparadores');

      const fam1 = [
        {nombre:"Klaus",  parentesco:"titular", edad:68, nacionalidad:"extranjero_residente_temporal"},
        {nombre:"María",  parentesco:"conyuge", edad:35, nacionalidad:"CR"},
        {nombre:"Lukas",  parentesco:"hijo",    edad:12, nacionalidad:"CR"},
        {nombre:"Rafael", parentesco:"otro",    edad:72, nacionalidad:"CR"}
      ];
      const docs1 = calcularDocumentos(fam1, "platinum2");
      console.assert(docs1.disparadores.length === 3, '[smoke] familia compleja debe activar 3 disparadores, got ' + docs1.disparadores.length);
      const ids1 = docs1.disparadores.map(d => d.id);
      console.assert(ids1.includes("telesuscripcion"), '[smoke] debe incluir telesuscripcion');
      console.assert(ids1.includes("bateria-71plus"),  '[smoke] debe incluir bateria-71plus');
      console.assert(ids1.includes("arraigo"),         '[smoke] debe incluir arraigo');

      // Sección 4 · payload
      const sample = { id:"0001", cliente:{nombre:"Test"}, asegurados:fam0, planes:["pro1"], moneda:"CRC" };
      const enc = encodePayload(sample);
      const dec = decodePayload(enc);
      console.assert(dec.id === "0001", '[smoke] payload roundtrip id');
      console.assert(dec.cliente.nombre === "Test", '[smoke] payload roundtrip cliente');
      console.assert(dec.asegurados.length === 4, '[smoke] payload roundtrip asegurados');
      console.assert(!enc.includes("+") && !enc.includes("/") && !enc.includes("="), '[smoke] base64url no debe tener + / =');
```

- [ ] **Step 3: Verificar en navegador**

Abrir `index.html` en navegador, consola abierta. Esperado: todos los smoke tests pasan sin errors en rojo. Probar manualmente: abrir `index.html?c=cualquiercosa` y verificar en consola que aparece `[vital360] payload inválido` (es esperado porque "cualquiercosa" no es JSON Base64URL válido).

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: lógica de disparadores de documentos + routing con payload Base64URL"
```

---

## Task 6: Estado central + persistencia localStorage + función de inicialización

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Agregar Secciones 5 (estado), 6 (auth stub) entre Sección 4 y Sección 10**

```javascript
    // =====================================================================
    // Sección 5: Estado central de la app
    // =====================================================================

    const ESTADO_INICIAL = {
      cotizacionId: null,        // generado al primer guardado
      fechaCreacion: null,
      cliente: { nombre: "", cedula: "", telefono: "" },
      asegurados: [
        // Por defecto vacío. El agente agrega al menos al titular.
      ],
      moneda: "CRC",
      planesSeleccionados: [],   // ids · máx 3
      planRecomendado: null      // id de uno de los 3
    };

    let state = JSON.parse(JSON.stringify(ESTADO_INICIAL)); // deep clone

    const LS_KEY = "vital360.borrador";

    function saveDraft(){
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(state));
      } catch(e){ console.warn('[vital360] no se pudo guardar borrador', e); }
    }

    function loadDraft(){
      try {
        const raw = localStorage.getItem(LS_KEY);
        if(!raw) return false;
        const parsed = JSON.parse(raw);
        if(parsed && typeof parsed === "object"){
          state = Object.assign({}, ESTADO_INICIAL, parsed);
          return true;
        }
      } catch(e){ console.warn('[vital360] borrador inválido', e); }
      return false;
    }

    function clearDraft(){
      localStorage.removeItem(LS_KEY);
      state = JSON.parse(JSON.stringify(ESTADO_INICIAL));
    }

    // =====================================================================
    // Sección 6: Auth (stub — se completa en Task 14)
    // =====================================================================

    let agenteActual = null; // se setea cuando Google auth completa

    function isAuthorized(email){
      return Object.prototype.hasOwnProperty.call(AGENTES, email);
    }
```

- [ ] **Step 2: Reemplazar la IIFE `smokeTests` por la función init real**

Reemplazar TODA la sección 10 (la IIFE smokeTests y el `document.getElementById('status')…`) con:

```javascript
    // =====================================================================
    // Sección 10: Init
    // =====================================================================

    function showView(viewName){
      document.querySelectorAll('[data-view]').forEach(el => {
        el.classList.toggle('active', el.dataset.view === viewName);
      });
    }

    function runSmokeTests(){
      // Sección 1
      console.assert(PLANES.length === 7, '[smoke] PLANES debe tener 7 elementos');
      console.assert(RANGOS_EDAD.length === 13, '[smoke] RANGOS_EDAD');
      console.assert(PRIMAS_USD["40-44"].pro1 === 1001, '[smoke] prima USD 40-44 Pro 1');
      console.assert(PRIMAS_CRC["40-44"].pro1 === 550511, '[smoke] prima CRC 40-44 Pro 1');
      console.assert(IVA_PCT === 0.02, '[smoke] IVA = 2 %');
      console.assert(!RECARGOS.mensual, '[smoke] NO debe existir RECARGOS.mensual');
      // Sección 2
      console.assert(rangoEdad(42) === "40-44", '[smoke] rangoEdad(42)');
      console.assert(primaIndividual("pro1","CRC",42) === 550511, '[smoke] primaIndividual');
      const familia = [{edad:42},{edad:39},{edad:12},{edad:8}];
      console.assert(primaFamiliar("pro1","CRC",familia) === 1540476, '[smoke] primaFamiliar 42·39·12·8 pro1');
      console.assert(fmtMoneda(1768350,"CRC") === "₡1.768.350", '[smoke] fmt CRC');
      console.assert(fmtMoneda(2801,"USD") === "$2,801", '[smoke] fmt USD');
      // Sección 3
      const docs0 = calcularDocumentos([
        {nombre:"A",parentesco:"titular",edad:42,nacionalidad:"CR"},
        {nombre:"B",parentesco:"conyuge",edad:39,nacionalidad:"CR"}
      ], "pro1");
      console.assert(docs0.disparadores.length === 0, '[smoke] sin disparadores');
      // Sección 4
      const enc = encodePayload({x:1});
      console.assert(decodePayload(enc).x === 1, '[smoke] payload roundtrip');
      console.log('[vital360] smoke tests OK · ' + TARIFAS_VERSION);
    }

    function init(){
      runSmokeTests();
      const ruta = determinarVista();
      if(ruta.tipo === "cliente"){
        if(!ruta.payload){
          showView("bloqueado");
          return;
        }
        renderCliente(ruta.payload);
        showView("cliente");
        return;
      }
      // Vista agente: por ahora sin auth (Task 14 agrega Google)
      loadDraft();
      // renderAgente(); — se implementa en Tasks 7-10
      showView("agente");
    }

    document.addEventListener('DOMContentLoaded', init);
```

- [ ] **Step 3: Agregar un placeholder de `renderCliente` antes de la sección 10**

```javascript
    // =====================================================================
    // Sección 8: Render vista cliente (stub — se completa en Tasks 11-15)
    // =====================================================================
    function renderCliente(payload){
      const el = document.querySelector('[data-view="cliente"]');
      el.innerHTML = '<div class="loading">Vista cliente · payload recibido: ' + payload.cliente.nombre + '</div>';
    }
```

- [ ] **Step 4: Verificar en navegador**

Abrir `index.html`. Esperado: muestra "Vista agente (placeholder)" (ya que sin `?c=…` cae en la vista agente). Consola: smoke tests OK.

Probar la vista cliente con un payload válido: en consola, ejecutar:
```js
location.search = "?c=" + encodePayload({cliente:{nombre:"Prueba"},asegurados:[]})
```
Esperado: la página recarga y muestra "Vista cliente · payload recibido: Prueba".

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: estado central + persistencia localStorage + init con routing"
```

---

## Task 7: Vista agente · Paso 1 (datos cliente + asegurados como chips + moneda)

**Files:**
- Modify: `index.html`

Esta tarea construye el primer bloque del Mockup C agente v2 (banda compacta arriba).

- [ ] **Step 1: Reemplazar el contenido de `<div data-view="agente">` con el HTML de los 3 pasos vacíos**

En el body, reemplazar:
```html
  <div data-view="agente">
    <div class="loading">Vista agente (placeholder)</div>
  </div>
```
con:
```html
  <div data-view="agente">
    <header class="masthead-agente">
      <div class="masthead-inner">
        <div class="brand">
          <div class="brand-logo"><span class="word">Vital<span class="num">360</span></span></div>
          <div class="brand-divider"></div>
          <div class="brand-tag">
            <div class="a">Cotizador · vista agente</div>
            <div class="b">Seguros Digitales · 100 años INS</div>
          </div>
        </div>
        <div class="mh-user" id="mh-user">
          <span class="av" id="mh-user-av">··</span>
          <span id="mh-user-name">Sin sesión</span>
        </div>
      </div>
    </header>
    <main class="page-agente">

      <!-- Paso 1 -->
      <section class="input-band">
        <div class="ib-h">
          <span class="t"><span class="num1">1</span>Datos del cliente y asegurados</span>
          <span class="step">paso 1 · 3</span>
        </div>
        <div class="ib-body" id="paso1-body"><!-- render dinámico --></div>
      </section>

      <!-- Paso 2 -->
      <section class="scanner" id="paso2-scanner"><!-- render dinámico (Task 8) --></section>

      <!-- Paso 3 -->
      <section class="send-band" id="paso3-send"><!-- render dinámico (Task 10) --></section>

    </main>
  </div>
```

- [ ] **Step 2: Agregar CSS específico del Paso 1 dentro del `<style>` (al final, antes de `</style>`)**

```css
/* === VISTA AGENTE === */
.masthead-agente{background:var(--paper);border-bottom:1px solid var(--line)}
.masthead-inner{max-width:1480px;margin:0 auto;padding:14px 32px;display:flex;align-items:center;justify-content:space-between}
.brand{display:flex;align-items:center;gap:16px}
.brand-divider{width:1px;height:30px;background:var(--line)}
.brand-tag .a{font-size:13px;font-weight:600;color:var(--ink)}
.brand-tag .b{font-size:11.5px;color:var(--ink-3);line-height:1.2}
.mh-user{display:flex;align-items:center;gap:8px;padding:6px 10px 6px 6px;border:1px solid var(--line);border-radius:24px;background:var(--paper);font-size:12.5px}
.mh-user .av{width:26px;height:26px;border-radius:50%;background:var(--ins-teal);color:#fff;display:grid;place-items:center;font-weight:600;font-size:11px}
.page-agente{max-width:1480px;margin:0 auto;padding:24px 32px 60px}

/* PASO 1 — banda de inputs */
.input-band{background:var(--paper);border:1px solid var(--line);border-radius:6px;overflow:hidden;margin-bottom:20px}
.ib-h{padding:12px 20px;background:var(--cream);border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:center}
.ib-h .t{font-weight:600;font-size:13.5px;color:var(--ink);display:flex;align-items:center;gap:8px}
.ib-h .num1,.ib-h .num2,.ib-h .num3{display:inline-grid;place-items:center;width:20px;height:20px;background:var(--ins-teal);color:#fff;border-radius:50%;font-family:"IBM Plex Mono";font-size:11px}
.ib-h .step{font-family:"IBM Plex Mono";font-size:11px;color:var(--ink-3);text-transform:uppercase;letter-spacing:.04em}
.ib-body{padding:18px 20px;display:grid;grid-template-columns:1.5fr 2.5fr 1fr;gap:24px;align-items:start}
.ib-section .h{font-size:11px;color:var(--ink-3);text-transform:uppercase;letter-spacing:.04em;font-weight:600;margin-bottom:8px}
.ib-section .row{display:grid;gap:8px;margin-bottom:8px}
.ib-section .row.two-col{grid-template-columns:1fr 1fr}
.ib-section input,.ib-section select{padding:7px 9px;border:1px solid var(--line);border-radius:4px;font-family:inherit;font-size:13px;outline:none;background:var(--paper);width:100%}
.ib-section input:focus,.ib-section select:focus{border-color:var(--ins-teal);box-shadow:0 0 0 2px var(--ins-teal-soft)}

.aseg-chips{display:flex;flex-wrap:wrap;gap:6px;align-items:flex-start}
.aseg-chip{display:flex;align-items:center;gap:8px;padding:7px 12px 7px 10px;background:var(--ins-teal-soft);border:1px solid var(--ins-teal-line);border-radius:18px;font-size:12.5px;color:var(--ins-teal-deep);font-weight:500;cursor:pointer}
.aseg-chip .ico{width:18px;height:18px;border-radius:50%;background:var(--ins-teal);color:#fff;display:grid;place-items:center;font-family:"IBM Plex Serif";font-size:11px;font-style:italic;font-weight:400}
.aseg-chip .age{font-family:"IBM Plex Mono";font-size:11.5px;color:var(--ink-2);background:var(--paper);padding:1px 6px;border-radius:8px}
.aseg-chip .x{background:none;border:none;color:var(--ink-3);font-size:14px;line-height:1;cursor:pointer;padding:0;margin-left:2px}
.aseg-add{padding:7px 12px;background:transparent;border:1.5px dashed var(--line);color:var(--ink-3);border-radius:18px;font-family:inherit;font-size:12.5px;cursor:pointer;font-weight:500}
.aseg-add:hover{border-color:var(--ins-teal);color:var(--ins-teal-deep)}

.cur-tog{display:flex;background:var(--cream);border:1px solid var(--line);border-radius:6px;padding:3px;gap:0}
.cur-tog button{flex:1;padding:7px 12px;background:transparent;border:none;font-family:inherit;font-size:12.5px;font-weight:600;color:var(--ink-2);cursor:pointer;border-radius:4px;display:flex;align-items:center;justify-content:center;gap:6px}
.cur-tog button.on{background:var(--ins-teal);color:#fff}
.cur-tog button .sym{font-family:"IBM Plex Mono";font-size:13px}

/* Modal mini para editar asegurado */
.aseg-modal-bg{position:fixed;inset:0;background:rgba(14,33,39,.6);display:none;align-items:center;justify-content:center;z-index:50}
.aseg-modal-bg.open{display:flex}
.aseg-modal{background:var(--paper);border-radius:8px;padding:24px 28px;width:420px;max-width:90vw}
.aseg-modal h3{font-family:"IBM Plex Serif",serif;font-size:18px;margin-bottom:14px;font-weight:500}
.aseg-modal .row{display:grid;gap:8px;margin-bottom:10px}
.aseg-modal .row.two-col{grid-template-columns:1fr 1fr}
.aseg-modal label{font-size:11px;color:var(--ink-3);text-transform:uppercase;letter-spacing:.04em;font-weight:600;display:block;margin-bottom:4px}
.aseg-modal input,.aseg-modal select{width:100%;padding:8px 10px;border:1px solid var(--line);border-radius:4px;font-family:inherit;font-size:13.5px;outline:none}
.aseg-modal .actions{display:flex;justify-content:flex-end;gap:8px;margin-top:14px}
```

- [ ] **Step 3: Agregar Sección 7 (render vista agente) entre Sección 6 y Sección 8**

```javascript
    // =====================================================================
    // Sección 7: Render vista agente
    // =====================================================================

    const PARENTESCOS = ["titular","conyuge","hijo","otro"];
    const NACIONALIDADES = ["CR","extranjero_residente_permanente","extranjero_residente_temporal","extranjero_pasaporte"];
    const NACIONALIDAD_LABEL = {
      CR: "Costa Rica",
      extranjero_residente_permanente: "Extranjero · residente permanente",
      extranjero_residente_temporal: "Extranjero · residente temporal",
      extranjero_pasaporte: "Extranjero · pasaporte"
    };

    function inicialDe(nombre){
      return (nombre || "?").trim().charAt(0).toUpperCase();
    }

    function renderPaso1(){
      const body = document.getElementById('paso1-body');
      const chips = state.asegurados.map((a, i) =>
        `<span class="aseg-chip" data-idx="${i}">
           <span class="ico">${inicialDe(a.nombre)}</span>
           <span>${escapeHtml(a.nombre || '(sin nombre)')}</span>
           <span class="age">${a.edad}</span>
           <button class="x" data-action="del" data-idx="${i}" title="Quitar">×</button>
         </span>`
      ).join('');

      body.innerHTML = `
        <div class="ib-section">
          <div class="h">Cliente</div>
          <div class="row"><input id="cli-nombre" placeholder="Nombre completo" value="${escapeAttr(state.cliente.nombre)}"></div>
          <div class="row two-col">
            <input id="cli-cedula" placeholder="Cédula" value="${escapeAttr(state.cliente.cedula)}">
            <input id="cli-tel" placeholder="WhatsApp" value="${escapeAttr(state.cliente.telefono)}">
          </div>
        </div>
        <div class="ib-section">
          <div class="h">Asegurados · ${state.asegurados.length} ${state.asegurados.length === 1 ? "persona" : "personas"}</div>
          <div class="aseg-chips">
            ${chips}
            <button class="aseg-add" data-action="add">+ Agregar asegurado</button>
          </div>
        </div>
        <div class="ib-section">
          <div class="h">Moneda</div>
          <div class="cur-tog">
            <button data-cur="CRC" class="${state.moneda === 'CRC' ? 'on' : ''}"><span class="sym">₡</span>Colones</button>
            <button data-cur="USD" class="${state.moneda === 'USD' ? 'on' : ''}"><span class="sym">$</span>Dólares</button>
          </div>
        </div>
      `;
    }

    function escapeHtml(s){
      return String(s || "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c]));
    }
    function escapeAttr(s){ return escapeHtml(s); }

    // Modal para editar/agregar asegurado
    function openAsegModal(idx){
      const ex = idx == null ? { nombre:"", parentesco:"titular", edad:30, nacionalidad:"CR" } : state.asegurados[idx];
      const isEdit = idx != null;
      const html = `
        <div class="aseg-modal-bg open" id="aseg-modal-bg">
          <div class="aseg-modal">
            <h3>${isEdit ? "Editar" : "Agregar"} asegurado</h3>
            <div class="row"><label>Nombre</label><input id="am-nombre" value="${escapeAttr(ex.nombre)}"></div>
            <div class="row two-col">
              <div><label>Parentesco</label>
                <select id="am-parentesco">
                  ${PARENTESCOS.map(p => `<option value="${p}" ${p===ex.parentesco?"selected":""}>${p}</option>`).join('')}
                </select>
              </div>
              <div><label>Edad</label><input id="am-edad" type="number" min="0" max="100" value="${ex.edad}"></div>
            </div>
            <div class="row"><label>Nacionalidad / residencia</label>
              <select id="am-nac">
                ${NACIONALIDADES.map(n => `<option value="${n}" ${n===ex.nacionalidad?"selected":""}>${NACIONALIDAD_LABEL[n]}</option>`).join('')}
              </select>
            </div>
            <div class="actions">
              ${isEdit ? `<button class="btn btn-secondary" data-action="del-from-modal" data-idx="${idx}">Quitar</button>` : ""}
              <button class="btn btn-secondary" data-action="cancel-modal">Cancelar</button>
              <button class="btn btn-primary" data-action="save-modal" data-idx="${idx==null?'':idx}">${isEdit ? "Guardar" : "Agregar"}</button>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', html);
    }
    function closeAsegModal(){
      const bg = document.getElementById('aseg-modal-bg');
      if(bg) bg.remove();
    }

    function bindPaso1Events(){
      const root = document.querySelector('[data-view="agente"]');
      root.addEventListener('input', e => {
        if(e.target.id === 'cli-nombre') state.cliente.nombre = e.target.value;
        if(e.target.id === 'cli-cedula') state.cliente.cedula = e.target.value;
        if(e.target.id === 'cli-tel')    state.cliente.telefono = e.target.value;
        saveDraft();
      });
      root.addEventListener('click', e => {
        const action = e.target.dataset.action;
        const idx = e.target.dataset.idx;
        if(action === 'add')      openAsegModal(null);
        if(action === 'del'){ state.asegurados.splice(Number(idx), 1); saveDraft(); renderPaso1(); renderPaso2(); }
        if(e.target.classList.contains('aseg-chip') || e.target.closest('.aseg-chip')){
          const chip = e.target.closest('.aseg-chip');
          if(chip && e.target.tagName !== 'BUTTON') openAsegModal(Number(chip.dataset.idx));
        }
        if(e.target.dataset.cur){
          state.moneda = e.target.dataset.cur;
          saveDraft();
          renderPaso1();
          renderPaso2();
        }
      });
      // Eventos del modal (delegados sobre body)
      document.body.addEventListener('click', e => {
        const action = e.target.dataset.action;
        if(action === 'cancel-modal') closeAsegModal();
        if(action === 'del-from-modal'){
          state.asegurados.splice(Number(e.target.dataset.idx), 1);
          saveDraft(); closeAsegModal(); renderPaso1(); renderPaso2();
        }
        if(action === 'save-modal'){
          const nombre = document.getElementById('am-nombre').value.trim();
          const parentesco = document.getElementById('am-parentesco').value;
          const edad = Number(document.getElementById('am-edad').value);
          const nacionalidad = document.getElementById('am-nac').value;
          if(!nombre || isNaN(edad) || edad < 0){
            alert('Nombre y edad válida son requeridos');
            return;
          }
          const aseg = { nombre, parentesco, edad, nacionalidad };
          const idx = e.target.dataset.idx;
          if(idx === '') state.asegurados.push(aseg);
          else           state.asegurados[Number(idx)] = aseg;
          saveDraft(); closeAsegModal(); renderPaso1(); renderPaso2();
        }
      });
    }

    // Placeholder de renderPaso2 — se completa en Task 8
    function renderPaso2(){
      const el = document.getElementById('paso2-scanner');
      if(el) el.innerHTML = '<div class="loading">Paso 2 — scanner (Task 8)</div>';
    }

    function renderAgente(){
      renderPaso1();
      renderPaso2();
      bindPaso1Events();
    }
```

- [ ] **Step 4: Activar el render en `init()`**

Editar la función `init()` reemplazando `// renderAgente(); — se implementa en Tasks 7-10` por `renderAgente();`.

- [ ] **Step 5: Verificar en navegador**

Abrir `index.html`. Esperado:
- Aparece el header con el logo "Vital360" y el slot de usuario
- Aparece la banda Paso 1 con 3 columnas: Cliente / Asegurados (chips vacíos + botón "+ Agregar") / Moneda
- Hacer clic en "Agregar asegurado" → abre el modal con campos vacíos
- Agregar "José Vargas, titular, 42, CR" → aparece como chip
- Agregar 3 más → quedan 4 chips
- Click en un chip → abre modal con datos del asegurado para editar
- Click en × del chip → lo quita
- Toggle moneda CRC ↔ USD funciona visualmente
- Recargar la página → los datos persisten (localStorage)

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: vista agente Paso 1 — datos cliente, chips de asegurados, modal CRUD, moneda"
```

---

## Task 8: Vista agente · Paso 2 (scanner de los 7 planes + selección)

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Agregar CSS del scanner al `<style>`**

```css
/* PASO 2 — scanner de 7 planes */
.scanner{margin-bottom:20px}
.scanner-h{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.scanner-h .t{font-family:"IBM Plex Serif",serif;font-size:22px;font-weight:500;letter-spacing:-0.015em;line-height:1.1;display:flex;align-items:center;gap:10px}
.scanner-h .num2{display:inline-grid;place-items:center;width:24px;height:24px;background:var(--ins-teal);color:#fff;border-radius:50%;font-family:"IBM Plex Mono";font-size:12px}
.scanner-h .selector{display:flex;align-items:center;gap:10px;font-size:12.5px;color:var(--ink-3)}
.scanner-h .selector .pill{background:var(--ins-coral);color:#fff;padding:5px 12px;border-radius:4px;font-weight:600;font-size:11.5px;letter-spacing:.02em}
.scanner-h .selector .clear{background:transparent;border:none;color:var(--ins-teal);font-family:inherit;font-size:12px;cursor:pointer;text-decoration:underline}

.plans7{display:grid;grid-template-columns:repeat(7, 1fr);gap:8px;background:var(--line);border:1px solid var(--line);border-radius:6px;padding:1px;overflow:hidden}
.p7{background:var(--paper);padding:14px 12px 12px;display:flex;flex-direction:column;position:relative;cursor:pointer}
.p7:hover{background:var(--ins-teal-soft)}
.p7.selected{background:var(--ins-teal-soft);box-shadow:inset 0 0 0 2px var(--ins-teal)}
.p7 .top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px}
.p7 .ambito{font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--ins-coral-deep);font-weight:700;line-height:1.2}
.p7 .star{width:22px;height:22px;border-radius:5px;background:var(--paper);border:1px solid var(--line);color:var(--ink-3);display:grid;place-items:center;font-size:11px;font-weight:700;flex-shrink:0}
.p7 .star::before{content:"☆"}
.p7.selected .star{color:#fff;background:var(--ins-coral);border-color:var(--ins-coral)}
.p7.selected .star::before{content:"★"}
.p7 .nm{font-family:"IBM Plex Serif",serif;font-size:18px;font-weight:500;letter-spacing:-0.015em;line-height:1;margin-bottom:4px}
.p7 .suma{font-size:11px;color:var(--ink-3);margin-bottom:10px}
.p7 .suma .v{font-family:"IBM Plex Mono";font-size:11px;color:var(--ink);font-weight:600;display:block;margin-top:1px}
.p7 .prima-box{margin-top:auto;padding:10px 0 6px;border-top:1px solid var(--line)}
.p7 .prima-box .lbl{font-size:9.5px;letter-spacing:.04em;text-transform:uppercase;color:var(--ink-3);font-weight:700;margin-bottom:3px}
.p7 .prima-box .amt-row{display:flex;align-items:baseline;gap:2px}
.p7 .prima-box .cur{font-family:"IBM Plex Serif",serif;font-size:13px;color:var(--ink-3)}
.p7 .prima-box .amt{font-family:"IBM Plex Serif",serif;font-size:20px;font-weight:500;letter-spacing:-0.02em;line-height:1;color:var(--ink)}
.p7 .prima-box .per{font-size:10.5px;color:var(--ink-3);margin-top:3px;font-style:italic}
.p7 .nodata{font-size:11px;color:var(--ink-3);font-style:italic;padding:8px 0;text-align:center;font-family:"IBM Plex Serif"}
```

- [ ] **Step 2: Reemplazar el `renderPaso2` stub por la implementación real**

Reemplazar la función placeholder de `renderPaso2` por:

```javascript
    function renderPaso2(){
      const el = document.getElementById('paso2-scanner');
      const sel = state.planesSeleccionados;
      const tieneAsegurados = state.asegurados.length > 0;

      const cards = PLANES.map(p => {
        if(!tieneAsegurados){
          return `<article class="p7" data-plan="${p.id}">
            <div class="top"><div class="ambito">${escapeHtml(p.ambito)}</div></div>
            <div class="nm">${p.nombre}</div>
            <div class="suma">suma anual<span class="v">${fmtMoneda(state.moneda==='USD'?p.sumaUSD:p.sumaCRC, state.moneda)}</span></div>
            <div class="prima-box"><div class="nodata">agregar asegurados para ver prima</div></div>
          </article>`;
        }
        const fam = primaFamiliar(p.id, state.moneda, state.asegurados);
        const isSel = sel.includes(p.id);
        return `<article class="p7 ${isSel?"selected":""}" data-plan="${p.id}">
          <div class="top">
            <div class="ambito">${escapeHtml(p.ambito)}</div>
            <span class="star" data-action="toggle-plan" data-plan="${p.id}"></span>
          </div>
          <div class="nm">${p.nombre}</div>
          <div class="suma">suma anual<span class="v">${fmtMoneda(state.moneda==='USD'?p.sumaUSD:p.sumaCRC, state.moneda)}</span></div>
          <div class="prima-box">
            <div class="lbl">Prima familiar/año</div>
            <div class="amt-row"><span class="cur">${state.moneda==='USD'?'$':'₡'}</span><span class="amt">${fmtMoneda(fam, state.moneda).replace(/^[₡$]/,'')}</span></div>
            <div class="per">+ 2 % IVA</div>
          </div>
        </article>`;
      }).join('');

      el.innerHTML = `
        <div class="scanner-h">
          <div class="t"><span class="num2">2</span>Los 7 planes · primas calculadas para esta familia</div>
          <div class="selector">
            Click ★ para seleccionar hasta 3
            <span class="pill">${sel.length} / 3 seleccionados</span>
            ${sel.length ? '<button class="clear" data-action="clear-sel">limpiar selección</button>' : ''}
          </div>
        </div>
        <div class="plans7">${cards}</div>
      `;
    }

    // Bind events de Paso 2 (extender el listener delegado)
    function bindPaso2Events(){
      const root = document.querySelector('[data-view="agente"]');
      root.addEventListener('click', e => {
        if(e.target.dataset.action === 'toggle-plan'){
          e.stopPropagation();
          const planId = e.target.dataset.plan;
          const sel = state.planesSeleccionados;
          if(sel.includes(planId)){
            state.planesSeleccionados = sel.filter(id => id !== planId);
            if(state.planRecomendado === planId) state.planRecomendado = null;
          } else if(sel.length < 3){
            state.planesSeleccionados.push(planId);
          } else {
            alert('Máximo 3 planes seleccionados. Quita uno primero.');
            return;
          }
          saveDraft();
          renderPaso2();
          renderPaso3();
        }
        if(e.target.dataset.action === 'clear-sel'){
          state.planesSeleccionados = [];
          state.planRecomendado = null;
          saveDraft();
          renderPaso2();
          renderPaso3();
        }
      });
    }
```

- [ ] **Step 3: Llamar a `bindPaso2Events()` desde `renderAgente()`**

Modificar `renderAgente`:
```javascript
    function renderAgente(){
      renderPaso1();
      renderPaso2();
      renderPaso3();
      bindPaso1Events();
      bindPaso2Events();
    }
```

Y agregar un stub temporal de renderPaso3 (se completa en Task 10):
```javascript
    function renderPaso3(){
      const el = document.getElementById('paso3-send');
      if(el) el.innerHTML = '<div class="loading">Paso 3 — envío (Task 10)</div>';
    }
```

- [ ] **Step 4: Verificar en navegador**

Abrir `index.html`. Esperado:
- Sin asegurados → los 7 cards muestran "agregar asegurados para ver prima"
- Agregar asegurados (42, 39, 12, 8) → los 7 cards muestran primas correctas: Esencial 1 ≈ ₡1.063.420 … Deluxe ≈ ₡5.214.380
- Cambiar a USD → primas en dólares
- Click en estrella de Esencial 2 → se marca ★ con fondo coral, card con borde teal, contador "1 / 3 seleccionados"
- Marcar Pro 1 y Platinum 1 → contador "3 / 3"
- Intentar marcar un 4to → alert "Máximo 3"
- Click en "limpiar selección" → todos desmarcados
- Datos se mantienen al refrescar

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: vista agente Paso 2 — scanner de los 7 planes con selección máx 3"
```

---

## Task 9: Vista agente · Comparativa detallada tabla 7×N coberturas

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Agregar la matriz `COBERTURAS` (tabla de sublímites por plan) en la Sección 1, después de `PRIMAS_CRC`**

```javascript
    // Coberturas por plan — sublímites en USD y CRC. 'NA' = no aplica.
    // Fuente: Coberturas y Planes.pdf (USD) + Coberturas Planes Colones.pdf (CRC)
    const COBERTURAS_DEFS = [
      { id: "gastos_medicos",        label: "Gastos médicos" },
      { id: "deducible",             label: "Deducible anual" },
      { id: "stop_loss",             label: "Stop loss" },
      { id: "maternidad",            label: "Maternidad" },
      { id: "prematurez",            label: "Prematurez" },
      { id: "congenitas",            label: "Enfermedades congénitas" },
      { id: "trasplantes",           label: "Trasplantes" },
      { id: "aparatos_apoyo",        label: "Aparatos de apoyo" },
      { id: "medicamentos",          label: "Medicamentos ambulatorios" },
      { id: "epidemicas",            label: "Epidémicas y pandémicas" },
      { id: "mentales",              label: "Mentales / trastornos nerviosos" },
      { id: "deportivas",            label: "Actividades deportivas" },
      { id: "futbol",                label: "Práctica competitiva de fútbol" },
      { id: "ambulancia_aerea",      label: "Ambulancia aérea" },
      { id: "dental_accidente",      label: "Cobertura dental por accidente" },
      { id: "asistencia_viajero",    label: "Asistencia al viajero" },
      { id: "chequeos",              label: "Cobertura de chequeos" },
      { id: "nino_sano",             label: "Niño sano" },
      { id: "fallecimiento",         label: "Fallecimiento" },
      { id: "salpingectomia",        label: "Salpingectomía" },
      { id: "vasectomia",            label: "Vasectomía" },
      { id: "vih_sida",              label: "VIH / SIDA" },
      { id: "terapias",              label: "Terapias" },
      { id: "preexistencias",        label: "Preexistencias declaradas" },
      { id: "medicina_virtual",      label: "Medicina virtual",       included:true },
      { id: "transporte_evacuacion", label: "Transporte por evacuación" },
      { id: "emergencias_medicas",   label: "Emergencias médicas" }
    ];

    // Sublímites en USD por plan (mismo valor en formato CRC × 550 aproximado, ver COBERTURAS_CRC)
    const COBERTURAS_USD = {
      esencial1: { gastos_medicos:15000, deducible:0, stop_loss:1500, maternidad:"NA", prematurez:"NA", congenitas:"NA", trasplantes:15000, aparatos_apoyo:500, medicamentos:500, epidemicas:"NA", mentales:750, deportivas:500, futbol:500, ambulancia_aerea:1000, dental_accidente:1000, asistencia_viajero:"NA", chequeos:"NA", nino_sano:"NA", fallecimiento:10000, salpingectomia:"NA", vasectomia:"NA", vih_sida:7500, terapias:750, preexistencias:"NA", medicina_virtual:"Incluido", transporte_evacuacion:5000, emergencias_medicas:5000 },
      esencial2: { gastos_medicos:25000, deducible:0, stop_loss:2500, maternidad:"NA", prematurez:"NA", congenitas:"NA", trasplantes:25000, aparatos_apoyo:1000, medicamentos:500, epidemicas:"NA", mentales:750, deportivas:1250, futbol:1250, ambulancia_aerea:1000, dental_accidente:1000, asistencia_viajero:"NA", chequeos:"NA", nino_sano:"NA", fallecimiento:10000, salpingectomia:"NA", vasectomia:"NA", vih_sida:7500, terapias:750, preexistencias:"NA", medicina_virtual:"Incluido", transporte_evacuacion:5000, emergencias_medicas:5000 },
      pro1:      { gastos_medicos:50000, deducible:100, stop_loss:"2500 CA", maternidad:"NA", prematurez:"NA", congenitas:"NA", trasplantes:50000, aparatos_apoyo:2000, medicamentos:500, epidemicas:15000, mentales:750, deportivas:2500, futbol:2500, ambulancia_aerea:1000, dental_accidente:1000, asistencia_viajero:10000, chequeos:"Incluido", nino_sano:200, fallecimiento:10000, salpingectomia:"NA", vasectomia:"NA", vih_sida:7500, terapias:750, preexistencias:"NA", medicina_virtual:"Incluido", transporte_evacuacion:500, emergencias_medicas:5000 },
      pro2:      { gastos_medicos:100000, deducible:200, stop_loss:"2500 CA", maternidad:3000, prematurez:25000, congenitas:25000, trasplantes:100000, aparatos_apoyo:2000, medicamentos:1000, epidemicas:15000, mentales:1125, deportivas:10000, futbol:10000, ambulancia_aerea:7000, dental_accidente:1000, asistencia_viajero:10000, chequeos:"Incluido", nino_sano:200, fallecimiento:10000, salpingectomia:"NA", vasectomia:"NA", vih_sida:7500, terapias:1125, preexistencias:"NA", medicina_virtual:"Incluido", transporte_evacuacion:10000, emergencias_medicas:10000 },
      platinum1: { gastos_medicos:300000, deducible:250, stop_loss:"2500 CA / 5000 INT", maternidad:4500, prematurez:100000, congenitas:100000, trasplantes:150000, aparatos_apoyo:10000, medicamentos:10000, epidemicas:15000, mentales:1125, deportivas:300000, futbol:300000, ambulancia_aerea:10000, dental_accidente:1000, asistencia_viajero:10000, chequeos:"Incluido", nino_sano:200, fallecimiento:10000, salpingectomia:"NA", vasectomia:"NA", vih_sida:15000, terapias:1500, preexistencias:"NA", medicina_virtual:"Incluido", transporte_evacuacion:10000, emergencias_medicas:10000 },
      platinum2: { gastos_medicos:500000, deducible:500, stop_loss:"2500 CA / 5000 INT", maternidad:6000, prematurez:100000, congenitas:100000, trasplantes:250000, aparatos_apoyo:10000, medicamentos:50000, epidemicas:15000, mentales:1125, deportivas:500000, futbol:500000, ambulancia_aerea:25000, dental_accidente:1000, asistencia_viajero:10000, chequeos:"Incluido", nino_sano:200, fallecimiento:10000, salpingectomia:500, vasectomia:250, vih_sida:15000, terapias:1500, preexistencias:50000, medicina_virtual:"Incluido", transporte_evacuacion:10000, emergencias_medicas:10000 },
      deluxe:    { gastos_medicos:1000000, deducible:1000, stop_loss:"2500 CA / 5000 INT", maternidad:7000, prematurez:100000, congenitas:100000, trasplantes:300000, aparatos_apoyo:10000, medicamentos:100000, epidemicas:15000, mentales:1125, deportivas:1000000, futbol:1000000, ambulancia_aerea:50000, dental_accidente:1000, asistencia_viajero:10000, chequeos:"Incluido", nino_sano:200, fallecimiento:10000, salpingectomia:500, vasectomia:250, vih_sida:15000, terapias:1500, preexistencias:100000, medicina_virtual:"Incluido", transporte_evacuacion:20000, emergencias_medicas:20000 }
    };

    // Misma estructura para CRC. Los valores son los del folleto oficial colones.
    const COBERTURAS_CRC = {
      esencial1: { gastos_medicos:8250000, deducible:0, stop_loss:825000, maternidad:"NA", prematurez:"NA", congenitas:"NA", trasplantes:8250000, aparatos_apoyo:275000, medicamentos:275000, epidemicas:"NA", mentales:412500, deportivas:275000, futbol:275000, ambulancia_aerea:550000, dental_accidente:550000, asistencia_viajero:"NA", chequeos:"NA", nino_sano:"NA", fallecimiento:5500000, salpingectomia:"NA", vasectomia:"NA", vih_sida:4125000, terapias:412500, preexistencias:"NA", medicina_virtual:"Incluido", transporte_evacuacion:2750000, emergencias_medicas:2750000 },
      esencial2: { gastos_medicos:13750000, deducible:0, stop_loss:1375000, maternidad:"NA", prematurez:"NA", congenitas:"NA", trasplantes:13750000, aparatos_apoyo:550000, medicamentos:275000, epidemicas:"NA", mentales:412500, deportivas:687500, futbol:687500, ambulancia_aerea:550000, dental_accidente:550000, asistencia_viajero:"NA", chequeos:"NA", nino_sano:"NA", fallecimiento:5500000, salpingectomia:"NA", vasectomia:"NA", vih_sida:4125000, terapias:412500, preexistencias:"NA", medicina_virtual:"Incluido", transporte_evacuacion:2750000, emergencias_medicas:2750000 },
      pro1:      { gastos_medicos:27500000, deducible:55000, stop_loss:"1.375.000 CA", maternidad:"NA", prematurez:"NA", congenitas:"NA", trasplantes:27500000, aparatos_apoyo:1100000, medicamentos:275000, epidemicas:8250000, mentales:412500, deportivas:1375000, futbol:1375000, ambulancia_aerea:550000, dental_accidente:550000, asistencia_viajero:5500000, chequeos:"Incluido", nino_sano:110000, fallecimiento:5500000, salpingectomia:"NA", vasectomia:"NA", vih_sida:4125000, terapias:412500, preexistencias:"NA", medicina_virtual:"Incluido", transporte_evacuacion:275000, emergencias_medicas:2750000 },
      pro2:      { gastos_medicos:55000000, deducible:110000, stop_loss:"1.375.000 CA", maternidad:1650000, prematurez:13750000, congenitas:13750000, trasplantes:55000000, aparatos_apoyo:1100000, medicamentos:550000, epidemicas:8250000, mentales:618750, deportivas:5500000, futbol:5500000, ambulancia_aerea:3850000, dental_accidente:550000, asistencia_viajero:5500000, chequeos:"Incluido", nino_sano:110000, fallecimiento:5500000, salpingectomia:"NA", vasectomia:"NA", vih_sida:4125000, terapias:618750, preexistencias:"NA", medicina_virtual:"Incluido", transporte_evacuacion:5500000, emergencias_medicas:5500000 },
      platinum1: { gastos_medicos:165000000, deducible:137500, stop_loss:"1.375.000 CA / 2.750.000 INT", maternidad:2475000, prematurez:55000000, congenitas:55000000, trasplantes:82500000, aparatos_apoyo:5500000, medicamentos:5500000, epidemicas:8250000, mentales:618750, deportivas:165000000, futbol:165000000, ambulancia_aerea:5500000, dental_accidente:550000, asistencia_viajero:5500000, chequeos:"Incluido", nino_sano:110000, fallecimiento:5500000, salpingectomia:"NA", vasectomia:"NA", vih_sida:8250000, terapias:825000, preexistencias:"NA", medicina_virtual:"Incluido", transporte_evacuacion:5500000, emergencias_medicas:5500000 },
      platinum2: { gastos_medicos:275000000, deducible:275000, stop_loss:"1.375.000 CA / 2.750.000 INT", maternidad:3300000, prematurez:55000000, congenitas:55000000, trasplantes:137500000, aparatos_apoyo:5500000, medicamentos:27500000, epidemicas:8250000, mentales:618750, deportivas:275000000, futbol:275000000, ambulancia_aerea:13750000, dental_accidente:550000, asistencia_viajero:5500000, chequeos:"Incluido", nino_sano:110000, fallecimiento:5500000, salpingectomia:275000, vasectomia:137500, vih_sida:8250000, terapias:825000, preexistencias:27500000, medicina_virtual:"Incluido", transporte_evacuacion:5500000, emergencias_medicas:5500000 },
      deluxe:    { gastos_medicos:550000000, deducible:550000, stop_loss:"1.375.000 CA / 2.750.000 INT", maternidad:3850000, prematurez:55000000, congenitas:55000000, trasplantes:165000000, aparatos_apoyo:5500000, medicamentos:55000000, epidemicas:8250000, mentales:618750, deportivas:550000000, futbol:550000000, ambulancia_aerea:27500000, dental_accidente:550000, asistencia_viajero:5500000, chequeos:"Incluido", nino_sano:110000, fallecimiento:5500000, salpingectomia:275000, vasectomia:137500, vih_sida:8250000, terapias:825000, preexistencias:55000000, medicina_virtual:"Incluido", transporte_evacuacion:11000000, emergencias_medicas:11000000 }
    };

    function getCobertura(planId, covId, moneda){
      const tabla = moneda === "USD" ? COBERTURAS_USD : COBERTURAS_CRC;
      return tabla[planId][covId];
    }
```

- [ ] **Step 2: Agregar CSS de la comparativa tabla**

```css
/* Comparativa tabla detallada */
.cmp-table-wrap{margin-top:18px;background:var(--paper);border:1px solid var(--line);border-radius:6px;overflow:hidden}
.cmp-table-h{padding:12px 20px;background:var(--cream);border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:center}
.cmp-table-h .t{font-weight:600;font-size:13px;color:var(--ink)}
.cmp-table-h .toggle-expand{font-size:12px;color:var(--ins-teal);background:none;border:none;cursor:pointer;font-family:inherit;font-weight:500;text-decoration:underline}
.cmp-table{width:100%;border-collapse:collapse;font-size:12px}
.cmp-table thead th{font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--ink-3);padding:8px 10px;text-align:right;background:var(--cream-2);border-bottom:1px solid var(--line)}
.cmp-table thead th:first-child{text-align:left;color:var(--ink)}
.cmp-table thead th.selected{background:var(--ins-teal-soft);color:var(--ins-teal-deep)}
.cmp-table thead th.selected::after{content:" ★";color:var(--ins-coral);font-size:11px}
.cmp-table tbody td{padding:7px 10px;font-size:12px;border-bottom:1px solid var(--line-2);text-align:right;font-family:"IBM Plex Mono";color:var(--ink);font-weight:500;white-space:nowrap}
.cmp-table tbody td:first-child{text-align:left;font-family:"IBM Plex Sans";color:var(--ink-2);font-weight:400;white-space:normal}
.cmp-table tbody td.na{color:var(--ink-3);font-style:italic;font-family:"IBM Plex Sans";font-weight:400}
.cmp-table tbody td.selected{background:var(--ins-teal-soft)}
```

- [ ] **Step 3: Extender `renderPaso2` para incluir la tabla comparativa**

Al final del template literal de `renderPaso2`, justo antes del cierre, agregar la tabla. Reemplazar:
```javascript
        <div class="plans7">${cards}</div>
      `;
```
por:
```javascript
        <div class="plans7">${cards}</div>
        ${tieneAsegurados ? renderComparativaTabla() : ""}
      `;
```

Y agregar la nueva función:

```javascript
    let comparativaExpandida = false;
    const COVS_TOP = ["gastos_medicos","deducible","maternidad","prematurez","trasplantes","medicamentos","epidemicas","asistencia_viajero","fallecimiento"];

    function renderComparativaTabla(){
      const sel = state.planesSeleccionados;
      const covs = comparativaExpandida ? COBERTURAS_DEFS : COBERTURAS_DEFS.filter(c => COVS_TOP.includes(c.id));
      const ths = PLANES.map(p =>
        `<th class="${sel.includes(p.id)?"selected":""}">${p.nombre}</th>`
      ).join('');
      const rows = covs.map(cov => {
        const cells = PLANES.map(p => {
          const v = getCobertura(p.id, cov.id, state.moneda);
          const isSel = sel.includes(p.id);
          if(v === "NA") return `<td class="na ${isSel?"selected":""}">no aplica</td>`;
          if(typeof v === "number") return `<td class="${isSel?"selected":""}">${fmtMoneda(v, state.moneda)}</td>`;
          return `<td class="${isSel?"selected":""}">${escapeHtml(String(v))}</td>`;
        }).join('');
        return `<tr><td>${escapeHtml(cov.label)}</td>${cells}</tr>`;
      }).join('');

      return `
        <div class="cmp-table-wrap">
          <div class="cmp-table-h">
            <span class="t">Comparativa detallada · coberturas por plan</span>
            <button class="toggle-expand" data-action="toggle-cmp">${comparativaExpandida ? "▴ Ocultar coberturas adicionales" : "▾ Mostrar todas las coberturas"}</button>
          </div>
          <table class="cmp-table">
            <thead><tr><th>Cobertura</th>${ths}</tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      `;
    }
```

- [ ] **Step 4: Agregar el handler de `toggle-cmp` al `bindPaso2Events`**

Dentro del listener de click ya existente en `bindPaso2Events`, agregar:
```javascript
        if(e.target.dataset.action === 'toggle-cmp'){
          comparativaExpandida = !comparativaExpandida;
          renderPaso2();
        }
```

- [ ] **Step 5: Agregar smoke test de coberturas**

Dentro de `runSmokeTests`, agregar:
```javascript
      console.assert(getCobertura("pro1","gastos_medicos","USD") === 50000, '[smoke] cobertura pro1 gastos USD');
      console.assert(getCobertura("pro1","gastos_medicos","CRC") === 27500000, '[smoke] cobertura pro1 gastos CRC');
      console.assert(getCobertura("esencial1","maternidad","CRC") === "NA", '[smoke] cobertura esencial1 maternidad = NA');
      console.assert(COBERTURAS_DEFS.length === 27, '[smoke] 27 coberturas definidas');
```

- [ ] **Step 6: Verificar en navegador**

Abrir `index.html`. Esperado:
- Con asegurados agregados, debajo del scanner aparece la tabla "Comparativa detallada"
- Tabla por defecto muestra 9 filas (las top)
- Click en "Mostrar todas las coberturas" → expande a 27 filas, botón cambia a "Ocultar"
- Las columnas de los planes seleccionados se ven con fondo teal soft y un ★ en el header
- Cambiar moneda CRC↔USD → la tabla actualiza los valores

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "feat: comparativa detallada tabla 27 coberturas × 7 planes con resaltado de selección"
```

---

## Task 10: Vista agente · Paso 3 (envío + WhatsApp + copiar link)

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Agregar CSS del Paso 3**

```css
/* PASO 3 — banda envío */
.send-band{margin-top:20px;background:var(--ins-teal-deep);color:#fff;border-radius:6px;overflow:hidden;display:grid;grid-template-columns:1.5fr 1fr;gap:0}
.send-l{padding:24px 28px}
.send-l .h{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.6);font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.send-l .num3{display:inline-grid;place-items:center;width:18px;height:18px;background:var(--ins-coral);color:#fff;border-radius:50%;font-size:10px;font-family:"IBM Plex Mono"}
.send-l .t{font-family:"IBM Plex Serif",serif;font-size:24px;font-weight:400;letter-spacing:-0.015em;line-height:1.1}
.send-l .sel-list{display:flex;gap:8px;margin-top:14px;flex-wrap:wrap}
.send-l .sl-chip{background:rgba(255,255,255,.1);padding:6px 12px;border-radius:18px;font-size:12px;border:1px solid rgba(255,255,255,.2);display:flex;align-items:center;gap:8px}
.send-l .sl-chip.rec{border-color:var(--ins-coral);background:rgba(227,107,67,.15)}
.send-l .sl-chip .set-rec{background:transparent;border:none;color:rgba(255,255,255,.6);font-family:inherit;font-size:11px;cursor:pointer;text-decoration:underline}
.send-l .sl-chip.rec .set-rec{color:var(--ins-coral)}
.send-l p{font-size:13px;color:rgba(255,255,255,.75);margin-top:14px;max-width:48ch;line-height:1.55}
.send-l .empty{padding:30px 0 10px;color:rgba(255,255,255,.55);font-style:italic;font-family:"IBM Plex Serif";font-size:15px}
.send-r{padding:24px 28px;background:rgba(0,0,0,.18);border-left:1px solid rgba(255,255,255,.08);display:flex;flex-direction:column;gap:10px;justify-content:center}
.send-r button{padding:12px 18px;border:none;border-radius:6px;font-family:inherit;font-size:13.5px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;text-align:left}
.send-r .btn-wa{background:var(--ins-coral);color:#fff}
.send-r .btn-wa:hover{background:var(--ins-coral-deep)}
.send-r .btn-preview{background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.18)}
.send-r .btn-copy{background:transparent;color:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.15);font-size:12px}
.send-r button:disabled{opacity:.4;cursor:not-allowed}
```

- [ ] **Step 2: Reemplazar el stub de `renderPaso3` por la implementación real**

```javascript
    function renderPaso3(){
      const el = document.getElementById('paso3-send');
      const sel = state.planesSeleccionados;

      if(sel.length === 0){
        el.innerHTML = `
          <div class="send-l">
            <div class="h"><span class="num3">3</span>Enviar al cliente</div>
            <div class="t">Seleccione al menos un plan en el paso 2</div>
            <div class="empty">— sin planes seleccionados aún —</div>
          </div>
          <div class="send-r">
            <button class="btn-wa" disabled>📱 Enviar por WhatsApp</button>
            <button class="btn-preview" disabled>👁 Vista previa</button>
            <button class="btn-copy" disabled>🔗 Copiar link</button>
          </div>
        `;
        return;
      }

      const chips = sel.map(planId => {
        const p = PLANES.find(pl => pl.id === planId);
        const fam = primaFamiliar(planId, state.moneda, state.asegurados);
        const isRec = state.planRecomendado === planId;
        return `<span class="sl-chip ${isRec?"rec":""}">
          ${isRec ? "★ " : ""}${p.nombre} · ${fmtMoneda(fam, state.moneda)}
          ${isRec ? "<em>recomendado</em>" : `<button class="set-rec" data-action="set-rec" data-plan="${planId}">marcar recomendado</button>`}
        </span>`;
      }).join('');

      el.innerHTML = `
        <div class="send-l">
          <div class="h"><span class="num3">3</span>Enviar al cliente</div>
          <div class="t">Vista cliente con ${sel.length} plan${sel.length>1?'es':''} ${state.planRecomendado?"+ uno marcado como recomendado":""}</div>
          <div class="sel-list">${chips}</div>
          <p>El cliente recibirá un link con solo estos planes, con la posibilidad de alternar moneda. La cotización mantiene vigencia 30 días naturales.</p>
        </div>
        <div class="send-r">
          <button class="btn-wa"      data-action="send-wa">📱 Enviar por WhatsApp</button>
          <button class="btn-preview" data-action="preview">👁 Vista previa cliente</button>
          <button class="btn-copy"    data-action="copy">🔗 Copiar link</button>
        </div>
      `;
    }
```

- [ ] **Step 3: Agregar Sección 9 (WhatsApp) y construcción del payload**

Agregar después de la Sección 8 (vista cliente) y antes de Sección 10:

```javascript
    // =====================================================================
    // Sección 9: WhatsApp + payload del link cliente
    // =====================================================================

    function buildPayloadCliente(){
      if(!agenteActual) agenteActual = { nombre:"Agente INS", whatsapp:"", email:"" };
      return {
        v: 1,
        id: state.cotizacionId || ("0" + Date.now().toString().slice(-4)),
        fecha: new Date().toISOString().slice(0,10),
        vigenciaDias: 30,
        cliente: state.cliente,
        asegurados: state.asegurados,
        monedaInicial: state.moneda,
        planes: state.planesSeleccionados.slice(),
        planRecomendado: state.planRecomendado,
        agente: agenteActual
      };
    }

    function buildLinkCliente(payload){
      const enc = encodePayload(payload);
      const base = location.origin + location.pathname.replace(/index\.html$/,'');
      return base + (base.endsWith('/') ? '' : '/') + '?c=' + enc;
    }

    function buildWhatsAppMessage(payload, link){
      const planesTxt = payload.planes.map(planId => {
        const p = PLANES.find(pl => pl.id === planId);
        const fam = primaFamiliar(planId, payload.monedaInicial, payload.asegurados);
        const star = planId === payload.planRecomendado ? "🟡" : "🔵";
        return `${star} ${p.nombre}: ${fmtMoneda(fam, payload.monedaInicial)} anual`;
      }).join('\n');
      return `Hola ${payload.cliente.nombre || "estimado"}, le comparto su cotización Vital 360 con ${payload.planes.length === 1 ? "una opción" : payload.planes.length + " opciones"} que pensé para usted:\n\n${planesTxt}\n\nPuede revisar el detalle, cambiar entre colones y dólares, y descargar los formularios aquí:\n${link}\n\nCualquier consulta me escribe directo.\n${payload.agente.nombre} · ${payload.agente.whatsapp}`;
    }

    function sendByWhatsApp(){
      const payload = buildPayloadCliente();
      const link = buildLinkCliente(payload);
      const msg = buildWhatsAppMessage(payload, link);
      const phone = String(state.cliente.telefono || "").replace(/\D/g,'');
      // Endpoint web.whatsapp.com — NUNCA wa.me (corrompe emojis)
      const url = "https://web.whatsapp.com/send/?phone=" + (phone ? "506"+phone : "") + "&text=" + encodeURIComponent(msg);
      window.open(url, "_blank");
    }

    function previewCliente(){
      const payload = buildPayloadCliente();
      const link = buildLinkCliente(payload);
      window.open(link, "_blank");
    }

    function copyLinkCliente(){
      const payload = buildPayloadCliente();
      const link = buildLinkCliente(payload);
      navigator.clipboard.writeText(link).then(
        () => alert("Link copiado al portapapeles."),
        () => prompt("Copie el link manualmente:", link)
      );
    }
```

- [ ] **Step 4: Extender el `bindPaso2Events` con los handlers del Paso 3**

Agregar dentro del listener de click:
```javascript
        if(e.target.dataset.action === 'set-rec'){
          state.planRecomendado = e.target.dataset.plan;
          saveDraft();
          renderPaso3();
        }
        if(e.target.dataset.action === 'send-wa')  sendByWhatsApp();
        if(e.target.dataset.action === 'preview')  previewCliente();
        if(e.target.dataset.action === 'copy')     copyLinkCliente();
```

- [ ] **Step 5: Verificar en navegador**

Abrir `index.html`. Esperado:
- Sin planes seleccionados → banda teal con mensaje "— sin planes seleccionados aún —" y los 3 botones deshabilitados
- Seleccionar 2-3 planes → aparecen como chips. Click en "marcar recomendado" → el chip se vuelve coral con texto "recomendado"
- Click en "Vista previa cliente" → abre nueva pestaña con la URL `?c=…` (mostrará el placeholder de vista cliente todavía)
- Click en "Copiar link" → alert "Link copiado al portapapeles"
- Click en "Enviar por WhatsApp" → abre web.whatsapp.com con el mensaje preformateado en el campo de texto

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: vista agente Paso 3 — selección recomendado + WhatsApp + preview + copy link"
```

---

## Task 11: Vista cliente · hero + asegurados + toggle moneda sticky

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Agregar CSS específico de la vista cliente**

```css
/* === VISTA CLIENTE === */
[data-view="cliente"]{background:#F4F0E2;min-height:100vh;font-size:14.5px}

.hero{background:var(--ins-teal-deep);color:#fff;position:relative;overflow:hidden}
.hero::before{content:"";position:absolute;right:-100px;top:-100px;width:400px;height:400px;background:radial-gradient(circle, rgba(227,107,67,.25), transparent 70%);pointer-events:none}
.hero::after{content:"";position:absolute;left:-80px;bottom:-180px;width:380px;height:380px;background:radial-gradient(circle, rgba(31,92,107,.5), transparent 70%);pointer-events:none}
.hero-top{padding:14px 0;border-bottom:1px solid rgba(255,255,255,.08);position:relative;z-index:1}
.hero-top-inner{max-width:1140px;margin:0 auto;padding:0 28px;display:flex;justify-content:space-between;align-items:center;font-size:12.5px}
.hero-top .l{display:flex;align-items:center;gap:10px}
.hero-top .l .logo{font-family:"IBM Plex Sans";font-size:24px;font-weight:300;letter-spacing:-0.02em;line-height:1}
.hero-top .l .logo .n{color:var(--ins-coral);font-size:13px;vertical-align:super}
.hero-top .l .sep{width:1px;height:22px;background:rgba(255,255,255,.18)}
.hero-top .l .who{color:rgba(255,255,255,.75)}
.hero-top .r{color:rgba(255,255,255,.55)}
.hero-body{max-width:1140px;margin:0 auto;padding:48px 28px 56px;position:relative;z-index:1;display:grid;grid-template-columns:1.5fr 1fr;gap:48px;align-items:end}
.hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(227,107,67,.18);color:var(--ins-coral);padding:5px 12px;border-radius:999px;font-size:11.5px;letter-spacing:.04em;font-weight:600;margin-bottom:18px;text-transform:uppercase}
.hero-eyebrow::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--ins-coral)}
.hero h1{font-family:"IBM Plex Serif",serif;font-weight:400;font-size:50px;letter-spacing:-0.025em;line-height:1.04}
.hero h1 .accent{color:var(--ins-coral);font-style:italic;font-weight:400}
.hero .lead{font-size:15.5px;color:rgba(255,255,255,.78);margin-top:14px;max-width:50ch;line-height:1.6}
.hero-card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);border-radius:12px;padding:22px 24px}
.hero-card .lbl{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.55);font-weight:600;margin-bottom:6px}
.hero-card .nm{font-family:"IBM Plex Serif",serif;font-size:24px;letter-spacing:-0.015em;line-height:1.1;margin-bottom:14px}
.hero-card .row{display:flex;justify-content:space-between;padding:7px 0;border-top:1px solid rgba(255,255,255,.1);font-size:13px;color:rgba(255,255,255,.85)}
.hero-card .row:first-of-type{border-top:none;padding-top:0}
.hero-card .row .v{font-family:"IBM Plex Mono";font-weight:500}

/* TOGGLE BAR sticky */
.toggle-bar{background:var(--paper);border-bottom:1px solid var(--line);position:sticky;top:0;z-index:20;box-shadow:0 1px 0 rgba(0,0,0,.02)}
.toggle-inner{max-width:1140px;margin:0 auto;padding:14px 28px;display:flex;justify-content:space-between;align-items:center;gap:24px}
.toggle-meta{display:flex;align-items:center;gap:18px;font-size:12.5px;color:var(--ink-3)}
.toggle-meta .badge{background:var(--ins-teal-soft);color:var(--ins-teal-deep);padding:4px 10px;border-radius:4px;font-size:11.5px;font-weight:600}
.toggle-meta .sep{width:1px;height:14px;background:var(--line)}
.toggle-meta strong{color:var(--ink);font-weight:600}
.cur-toggle-c{display:flex;align-items:center;gap:10px}
.cur-toggle-c .lbl{font-size:12px;color:var(--ink-3);font-weight:500}
.cur-toggle-c .swap{display:flex;background:var(--cream);border:1px solid var(--line);border-radius:999px;padding:3px;gap:0}
.cur-toggle-c .swap button{padding:7px 18px;background:transparent;border:none;font-family:inherit;font-size:13px;font-weight:600;color:var(--ink-2);cursor:pointer;border-radius:999px;display:flex;align-items:center;gap:6px}
.cur-toggle-c .swap button.on{background:var(--ins-teal);color:#fff}

.wrap-cliente{max-width:1140px;margin:0 auto;padding:36px 28px 60px}
```

- [ ] **Step 2: Reemplazar el placeholder de vista cliente en el `<body>` con la estructura base**

Reemplazar:
```html
  <div data-view="cliente">
    <!-- Vista cliente — se construye en Tasks 11-15 -->
    <div class="loading">Vista cliente (placeholder)</div>
  </div>
```
por:
```html
  <div data-view="cliente">
    <header class="hero" id="cli-hero"></header>
    <div class="toggle-bar"><div class="toggle-inner" id="cli-toggle"></div></div>
    <main class="wrap-cliente" id="cli-main"></main>
  </div>
```

- [ ] **Step 3: Reemplazar el stub de `renderCliente` por la versión que renderiza el hero y el toggle**

Reemplazar:
```javascript
    function renderCliente(payload){
      const el = document.querySelector('[data-view="cliente"]');
      el.innerHTML = '<div class="loading">Vista cliente · payload recibido: ' + payload.cliente.nombre + '</div>';
    }
```
por:
```javascript
    // Estado local del cliente: la moneda puede cambiar con el toggle
    let cli = null;

    function renderCliente(payload){
      cli = {
        payload,
        moneda: payload.monedaInicial || "CRC"
      };
      renderClienteHero();
      renderClienteToggle();
      renderClienteMain();
    }

    function renderClienteHero(){
      const p = cli.payload;
      const filas = p.asegurados.map(a => {
        const rel = a.parentesco === "titular" ? "Titular" :
                    a.parentesco === "conyuge" ? "Cónyuge" :
                    a.parentesco === "hijo"    ? "Hijo/a" : "Otro";
        return `<div class="row"><span>${rel}</span><span class="v">${escapeHtml(a.nombre)}, ${a.edad} a.</span></div>`;
      }).join('');

      document.getElementById('cli-hero').innerHTML = `
        <div class="hero-top">
          <div class="hero-top-inner">
            <div class="l">
              <span class="logo">Vital<span class="n">360</span></span>
              <span class="sep"></span>
              <span class="who">Cotización preparada por ${escapeHtml(p.agente.nombre)} · Agente INS</span>
            </div>
            <div class="r">Cotización N.º ${escapeHtml(p.id)} · ${p.fecha} · vigencia ${p.vigenciaDias} días</div>
          </div>
        </div>
        <div class="hero-body">
          <div>
            <span class="hero-eyebrow">Su cotización personal está lista</span>
            <h1>${p.planes.length > 1 ? p.planes.length + " caminos" : "Una opción"} para cuidar a su familia,<br><span class="accent">${p.planRecomendado ? "uno a su medida." : "elegidos para usted."}</span></h1>
            <p class="lead">Preparé ${p.planes.length === 1 ? "una opción" : p.planes.length + " planes"} Vital 360 del INS pensando en usted. Compare las coberturas, decida con calma y cualquier consulta me escribe directo por WhatsApp.</p>
          </div>
          <div class="hero-card">
            <div class="lbl">Cotización para</div>
            <div class="nm">${escapeHtml(p.cliente.nombre || "Cliente Vital 360")}</div>
            ${filas}
            <div class="row"><span>Total asegurados</span><span class="v">${p.asegurados.length} personas</span></div>
          </div>
        </div>
      `;
    }

    function renderClienteToggle(){
      document.getElementById('cli-toggle').innerHTML = `
        <div class="toggle-meta">
          <span class="badge">Tarifas vigentes ${TARIFAS_VERSION}</span>
          <span class="sep"></span>
          <span>Comparando <strong>${cli.payload.planes.length} plan${cli.payload.planes.length>1?'es':''}</strong></span>
        </div>
        <div class="cur-toggle-c">
          <span class="lbl">Ver montos en</span>
          <div class="swap">
            <button data-cur="CRC" class="${cli.moneda==='CRC'?'on':''}">₡ Colones</button>
            <button data-cur="USD" class="${cli.moneda==='USD'?'on':''}">$ Dólares</button>
          </div>
        </div>
      `;
      // Bind toggle moneda
      document.getElementById('cli-toggle').addEventListener('click', e => {
        if(e.target.dataset.cur){
          cli.moneda = e.target.dataset.cur;
          renderClienteToggle();
          renderClienteMain();
        }
      });
    }

    function renderClienteMain(){
      // Placeholder hasta Task 12-15
      document.getElementById('cli-main').innerHTML = `<div class="loading">Plan recomendado: ${cli.payload.planRecomendado || "—"} · moneda: ${cli.moneda}</div>`;
    }
```

- [ ] **Step 4: Verificar en navegador**

1. Abrir `index.html` y crear una cotización completa con asegurados y planes seleccionados (4 asegurados, 3 planes).
2. Click en "Vista previa cliente" → se abre la URL `?c=…`.
3. Esperado en la vista cliente:
   - Hero teal con headline grande, nombre del agente, lista de asegurados en tarjeta lateral
   - Barra sticky con badge "Tarifas vigentes …" + toggle CRC/USD
   - Main todavía con placeholder
4. Click en toggle USD → la barra cambia (en próximas tasks la moneda se reflejará en planes)

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: vista cliente hero + toggle moneda sticky"
```

---

## Task 12: Vista cliente · comparativa 3 planes + formas de pago

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Agregar CSS de los planes cliente y formas de pago**

```css
/* CLIENTE — comparativa de planes */
.comp{background:var(--paper);border:1px solid var(--line);border-radius:8px;overflow:hidden;margin-bottom:24px}
.comp-h{padding:18px 24px;background:var(--ins-teal);color:#fff;display:flex;justify-content:space-between;align-items:center}
.comp-h .t{font-family:"IBM Plex Serif",serif;font-size:18px;font-weight:500}
.comp-h .sub{font-size:12.5px;color:rgba(255,255,255,.7)}
.cols-c{display:grid;gap:1px;background:var(--line)}
.cols-c.n-1{grid-template-columns:1fr}
.cols-c.n-2{grid-template-columns:1fr 1fr}
.cols-c.n-3{grid-template-columns:repeat(3,1fr)}
.col-c{background:var(--paper);padding:24px 22px 0;display:flex;flex-direction:column;position:relative}
.col-c.rec{background:linear-gradient(180deg, var(--ins-teal-soft), var(--paper) 30%)}
.col-c-flag{position:absolute;top:0;left:50%;transform:translateX(-50%);background:var(--ins-coral);color:#fff;font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;padding:5px 14px;border-bottom-left-radius:4px;border-bottom-right-radius:4px;font-weight:700}
.col-c-ambito{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--ins-coral-deep);font-weight:700;margin-bottom:6px}
.col-c.rec .col-c-ambito{margin-top:8px}
.col-c-name{font-family:"IBM Plex Serif",serif;font-size:28px;font-weight:500;letter-spacing:-0.02em;line-height:1;margin-bottom:8px}
.col-c-suma{font-size:11.5px;color:var(--ink-3)}
.col-c-suma .v{font-family:"IBM Plex Mono";color:var(--ink);font-weight:500}
.col-c-price{padding:22px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:18px}
.col-c-price .lbl{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3);font-weight:700;margin-bottom:6px}
.col-c-price .amt-row{display:flex;align-items:baseline;gap:3px;color:var(--ink)}
.col-c-price .cur{font-family:"IBM Plex Serif",serif;font-size:20px;color:var(--ink-3);font-weight:400}
.col-c-price .amt{font-family:"IBM Plex Serif",serif;font-size:42px;font-weight:500;letter-spacing:-0.025em;line-height:1}
.col-c-price .per{font-size:12px;color:var(--ink-3);margin-top:6px;display:flex;justify-content:space-between;align-items:center}
.col-c-price .per .iva{font-size:10.5px;background:var(--cream);padding:2px 7px;border-radius:4px;color:var(--ink-2);font-style:italic}
.col-c-price .breakdown{margin-top:10px;font-size:12px;color:var(--ink-3);display:flex;justify-content:space-between}
.col-c-price .breakdown .v{color:var(--ink);font-family:"IBM Plex Mono"}
.col-c-feat{padding:20px 0;flex:1}
.col-c-feat .h{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3);font-weight:700;margin-bottom:12px}
.col-c-feat ul{list-style:none}
.col-c-feat li{padding:7px 0;font-size:13.5px;color:var(--ink-2);display:flex;justify-content:space-between;gap:10px;align-items:baseline;border-bottom:1px solid var(--line-2)}
.col-c-feat li:last-child{border-bottom:none}
.col-c-feat li .k{display:inline-flex;align-items:center;gap:8px}
.col-c-feat li .k .check{color:var(--green-ok);font-size:12px}
.col-c-feat li .k .x{color:var(--ink-3);font-size:12px}
.col-c-feat li .v{font-family:"IBM Plex Mono";font-size:12.5px;color:var(--ink);font-weight:500;white-space:nowrap}
.col-c-feat li .v.na{font-family:"IBM Plex Sans";font-style:italic;color:var(--ink-3);font-weight:400}

/* CLIENTE — formas de pago */
.pay-cli{background:var(--paper);border:1px solid var(--line);border-radius:8px;padding:24px 28px;margin-bottom:24px}
.pay-cli-h{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:18px;padding-bottom:14px;border-bottom:1px solid var(--line)}
.pay-cli-h .t{font-family:"IBM Plex Serif",serif;font-size:22px;font-weight:500;letter-spacing:-0.015em}
.pay-cli-h .t .em{color:var(--ins-coral);font-style:italic}
.pay-cli-h .legend{font-size:12px;color:var(--ink-3);max-width:42ch;text-align:right;line-height:1.5}
.pay-options{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.pay-opt{padding:18px;border:1px solid var(--line);border-radius:6px;background:var(--paper);position:relative}
.pay-opt.best{background:var(--ins-teal-soft);border-color:var(--ins-teal)}
.pay-opt.best::after{content:"sin recargo";position:absolute;top:8px;right:10px;font-size:9.5px;background:var(--ins-coral);color:#fff;padding:2px 7px;border-radius:3px;letter-spacing:.04em;text-transform:uppercase;font-weight:700}
.pay-opt .nm{font-weight:600;font-size:14px;color:var(--ink);margin-bottom:2px}
.pay-opt .rec{font-size:11.5px;color:var(--ink-3);margin-bottom:14px}
.pay-opt .ct{font-family:"IBM Plex Serif",serif;font-size:24px;letter-spacing:-0.02em;line-height:1;color:var(--ink)}
.pay-opt .tot{font-size:11.5px;color:var(--ink-3);margin-top:4px}
```

- [ ] **Step 2: Definir las "coberturas top" que se muestran en cada card cliente y reemplazar `renderClienteMain`**

```javascript
    // Coberturas que se muestran en la vista cliente como features (top 7 + 3 extra que pueden cambiar)
    const COVS_CLIENTE = [
      { id:"gastos_medicos",     label:"Hospitalización" },
      { id:"deducible",          label:"Deducible anual" },
      { id:"trasplantes",        label:"Trasplantes" },
      { id:"medicamentos",       label:"Medicamentos" },
      { id:"maternidad",         label:"Maternidad" },
      { id:"asistencia_viajero", label:"Asistencia viajero" },
      { id:"fallecimiento",      label:"Fallecimiento" }
    ];

    function renderClienteMain(){
      const main = document.getElementById('cli-main');
      const p = cli.payload;
      main.innerHTML = renderClienteCmp() + renderClientePago();
    }

    function renderClienteCmp(){
      const p = cli.payload;
      const cols = p.planes.map(planId => {
        const plan = PLANES.find(pl => pl.id === planId);
        const fam = primaFamiliar(planId, cli.moneda, p.asegurados);
        const isRec = planId === p.planRecomendado;
        const suma = cli.moneda === "USD" ? plan.sumaUSD : plan.sumaCRC;
        const feats = COVS_CLIENTE.map(cov => {
          const v = getCobertura(planId, cov.id, cli.moneda);
          if(v === "NA") return `<li><span class="k"><span class="x">—</span>${escapeHtml(cov.label)}</span><span class="v na">no incluye</span></li>`;
          const valTxt = typeof v === "number" ? fmtMoneda(v, cli.moneda) :
                         cov.id === "deducible" && v === 0 ? "Sin deducible" : escapeHtml(String(v));
          return `<li><span class="k"><span class="check">✓</span>${escapeHtml(cov.label)}</span><span class="v">${valTxt}</span></li>`;
        }).join('');
        return `<article class="col-c ${isRec?"rec":""}">
          ${isRec ? '<span class="col-c-flag">★ Recomendado</span>' : ""}
          <div class="col-c-ambito">${escapeHtml(plan.ambito)}</div>
          <div class="col-c-name">${plan.nombre}</div>
          <div class="col-c-suma">Suma asegurada anual <span class="v">${fmtMoneda(suma, cli.moneda)}</span></div>
          <div class="col-c-price">
            <div class="lbl">Prima familiar anual</div>
            <div class="amt-row"><span class="cur">${cli.moneda==='USD'?'$':'₡'}</span><span class="amt">${fmtMoneda(fam, cli.moneda).replace(/^[₡$]/,'')}</span></div>
            <div class="per"><span>por los ${p.asegurados.length} asegurados</span><span class="iva">+ 2 % IVA</span></div>
            <div class="breakdown"><span>≈ por persona/año</span><span class="v">${fmtMoneda(fam / p.asegurados.length, cli.moneda)}</span></div>
          </div>
          <div class="col-c-feat">
            <div class="h">Lo que cubre</div>
            <ul>${feats}</ul>
          </div>
        </article>`;
      }).join('');

      const n = p.planes.length;
      return `
        <section class="comp">
          <div class="comp-h">
            <div class="t">Comparativa de ${n > 1 ? n + " planes" : "plan"}</div>
            <div class="sub">Primas calculadas para los ${p.asegurados.length} asegurados · cuota anual</div>
          </div>
          <div class="cols-c n-${n}">${cols}</div>
        </section>
      `;
    }

    function renderClientePago(){
      const p = cli.payload;
      const planRec = p.planRecomendado || p.planes[0];
      const plan = PLANES.find(pl => pl.id === planRec);
      const fam = primaFamiliar(planRec, cli.moneda, p.asegurados);

      const opts = [
        { mod:"anual",      nm:"Anual",      rec:"recargo 0 %",      cuotas:"una sola cuota" },
        { mod:"semestral",  nm:"Semestral",  rec:"recargo + " + (cli.moneda==='USD'?'3':'5') + " %", cuotas:"2 cuotas" },
        { mod:"trimestral", nm:"Trimestral", rec:"recargo + " + (cli.moneda==='USD'?'4':'7') + " %", cuotas:"4 cuotas" }
      ];
      const items = opts.map(o => {
        const tot   = totalConRecargo(o.mod, cli.moneda, fam);
        const cuota = cuotaPorPeriodo(o.mod, cli.moneda, fam);
        const isBest = o.mod === "anual";
        const totLine = isBest ? `una sola cuota` : `${o.cuotas} · total año ${fmtMoneda(tot, cli.moneda)}`;
        return `<div class="pay-opt ${isBest?"best":""}">
          <div class="nm">${o.nm}</div>
          <div class="rec">${o.rec}</div>
          <div class="ct">${fmtMoneda(cuota, cli.moneda)}</div>
          <div class="tot">${totLine}</div>
        </div>`;
      }).join('');

      return `
        <section class="pay-cli">
          <div class="pay-cli-h">
            <div class="t">Formas de pago <em class="em">· ${plan.nombre}${p.planRecomendado ? " (recomendado)" : ""}</em></div>
            <div class="legend">Tarifas oficiales INS. Pagando anual no hay recargo. El fraccionamiento incrementa el total del año.</div>
          </div>
          <div class="pay-options">${items}</div>
        </section>
      `;
    }
```

- [ ] **Step 3: Verificar en navegador**

Continuando desde la previa de vista cliente:
- Aparecen las 1–3 cards lado a lado con primas, suma asegurada, coberturas top
- El plan marcado como recomendado tiene el flag coral "★ Recomendado" y fondo degradado teal
- Bloque "Formas de pago · {plan recomendado}" con 3 opciones (anual / semestral / trimestral), la anual marcada como "sin recargo"
- Toggle moneda USD ↔ CRC actualiza todos los montos correctamente
- Verificar: prima Pro 1 familia 42·39·12·8 en CRC debe ser ₡1.540.476. Si fuera el plan recomendado, su forma de pago semestral debe ser cuota ₡808.750 con total año ₡1.617.500.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: vista cliente comparativa de planes + formas de pago dinámicas"
```

---

## Task 13: Vista cliente · servicios incluidos + bloque documentos + periodos espera + CTA + disclaimers

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Agregar CSS de las secciones finales**

```css
/* CLIENTE — Servicios incluidos */
.included{background:var(--cream);border:1px solid var(--line);border-radius:8px;padding:28px 32px;margin-bottom:24px;display:grid;grid-template-columns:1fr 1.5fr;gap:36px;align-items:start}
.included h3{font-family:"IBM Plex Serif",serif;font-size:24px;font-weight:500;letter-spacing:-0.015em;line-height:1.15;margin-bottom:8px}
.included .sub{font-size:13.5px;color:var(--ink-3);line-height:1.55}
.included-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.inc-item{display:flex;gap:12px;align-items:flex-start;padding:12px 14px;background:var(--paper);border:1px solid var(--line);border-radius:6px}
.inc-item .ico{width:32px;height:32px;border-radius:6px;background:var(--ins-teal-soft);color:var(--ins-teal-deep);display:grid;place-items:center;font-family:"IBM Plex Serif";font-size:18px;font-style:italic;flex-shrink:0}
.inc-item .t{font-weight:600;font-size:13.5px;color:var(--ink);margin-bottom:2px}
.inc-item .d{font-size:12px;color:var(--ink-3);line-height:1.5}

/* CLIENTE — documentos */
.docs-c{background:var(--paper);border:1px solid var(--line);border-radius:8px;margin-bottom:24px;overflow:hidden}
.docs-c-h{padding:22px 28px;background:linear-gradient(135deg, var(--ins-teal-soft), var(--paper) 70%);border-bottom:1px solid var(--line)}
.docs-c-h h3{font-family:"IBM Plex Serif",serif;font-size:24px;font-weight:500;letter-spacing:-0.015em;line-height:1.15;color:var(--ink);margin-bottom:6px}
.docs-c-h h3 em{font-style:italic;color:var(--ins-teal-deep)}
.docs-c-h .sub{font-size:13.5px;color:var(--ink-2);max-width:65ch;line-height:1.55}
.docs-c-h .sub strong{color:var(--ink);font-weight:600}
.docs-c-body{padding:18px 28px 22px}
.docs-section-c{margin-bottom:22px}
.docs-section-c:last-of-type{margin-bottom:0}
.docs-section-c .label-c{display:flex;align-items:center;gap:8px;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-3);font-weight:700;margin-bottom:10px;flex-wrap:wrap}
.docs-section-c .lpin{width:7px;height:7px;border-radius:50%}
.docs-section-c .lpin.base{background:var(--green-ok)}
.docs-section-c .lpin.extra{background:var(--ins-coral)}
.docs-section-c .lpin.cond{background:var(--ins-gold)}
.docs-section-c .trigger-chip{font-family:"IBM Plex Mono";text-transform:none;font-size:10.5px;letter-spacing:0;color:var(--ink-2);background:var(--cream);padding:2px 8px;border-radius:3px;border:1px solid var(--line);font-weight:500}
.docs-list-c{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.doc-c{display:flex;gap:14px;align-items:flex-start;padding:14px 16px;background:var(--cream);border:1px solid var(--line);border-radius:6px}
.doc-c .icon{width:42px;height:42px;border-radius:6px;background:var(--paper);display:grid;place-items:center;flex-shrink:0;border:1px solid var(--line);position:relative}
.doc-c .icon::before{content:"PDF";font-family:"IBM Plex Mono";font-size:9px;color:var(--ins-coral-deep);font-weight:700;position:absolute;bottom:5px;left:50%;transform:translateX(-50%);letter-spacing:.04em}
.doc-c .icon::after{content:"";position:absolute;top:7px;left:50%;transform:translateX(-50%);width:18px;height:14px;border:1.5px solid var(--ins-coral-deep);border-radius:2px}
.doc-c.aviso .icon::before{content:"!";color:var(--ink-2);font-family:"IBM Plex Serif";font-style:italic;font-size:18px;top:50%;bottom:auto;transform:translate(-50%,-50%)}
.doc-c.aviso .icon::after{display:none}
.doc-c .info{flex:1;min-width:0}
.doc-c .info .nm{font-weight:600;font-size:13.5px;color:var(--ink);margin-bottom:3px;line-height:1.3}
.doc-c .info .desc{font-size:11.5px;color:var(--ink-3);line-height:1.5}
.doc-c .dl{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:34px;height:34px;background:var(--ins-teal);color:#fff;border-radius:6px;border:none;cursor:pointer;font-size:14px;text-decoration:none;font-weight:700;margin-top:2px}
.exam-list{background:var(--paper);border:1px solid var(--line);border-radius:6px;padding:14px 18px;margin-top:8px;grid-column:span 2}
.exam-list .eh{font-size:12px;font-weight:600;color:var(--ink-2);margin-bottom:8px;display:flex;justify-content:space-between;align-items:center}
.exam-list .eh .note{font-size:11px;color:var(--ink-3);font-weight:500;font-style:italic;font-family:"IBM Plex Serif"}
.exam-list ul{list-style:none;display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px 18px;padding-top:6px}
.exam-list li{font-size:12px;color:var(--ink-2);padding:3px 0;display:flex;align-items:center;gap:6px}
.exam-list li::before{content:"·";color:var(--ins-coral);font-weight:700;font-size:16px}
.docs-note{margin-top:18px;padding:14px 16px;background:var(--paper);border-left:3px solid var(--ins-gold);border-radius:0 6px 6px 0;font-size:12.5px;color:var(--ink-2);line-height:1.6}
.docs-note strong{color:var(--ink);font-weight:600;display:block;margin-bottom:3px}
.docs-note .small{font-size:11.5px;color:var(--ink-3);margin-top:6px;display:block}

/* CLIENTE — periodos */
.wait{background:var(--paper);border:1px solid var(--line);border-radius:8px;padding:24px 28px;margin-bottom:24px}
.wait h3{font-family:"IBM Plex Serif",serif;font-size:22px;font-weight:500;letter-spacing:-0.015em;margin-bottom:8px}
.wait .sub{font-size:13px;color:var(--ink-3);margin-bottom:18px;max-width:62ch}
.wait-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border-top:1px solid var(--line)}
.wait-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--line-2);font-size:13px}
.wait-row .k{color:var(--ink-2)}
.wait-row .v{font-family:"IBM Plex Mono";color:var(--ink);font-weight:600;font-size:12px}
.wait-grid > div{padding:0 22px;border-right:1px solid var(--line-2)}
.wait-grid > div:last-child{border-right:none}

/* CLIENTE — CTA */
.cta-strip{background:var(--ins-teal-deep);color:#fff;border-radius:8px;padding:32px 36px;margin-bottom:24px;display:grid;grid-template-columns:1.4fr 1fr;gap:36px;align-items:center;position:relative;overflow:hidden}
.cta-strip::after{content:"";position:absolute;right:-60px;top:-60px;width:240px;height:240px;background:radial-gradient(circle, rgba(227,107,67,.3), transparent 70%);pointer-events:none}
.cta-strip h3{font-family:"IBM Plex Serif",serif;font-size:30px;font-weight:400;letter-spacing:-0.02em;line-height:1.1}
.cta-strip h3 em{font-style:italic;color:var(--ins-coral)}
.cta-strip p{font-size:14px;color:rgba(255,255,255,.78);margin-top:8px;max-width:48ch;line-height:1.55}
.cta-strip-r{position:relative;z-index:1;display:flex;flex-direction:column;gap:10px}
.cta-strip-r .agent{display:flex;align-items:center;gap:14px;padding:14px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);border-radius:8px}
.cta-strip-r .agent .av{width:46px;height:46px;border-radius:50%;background:var(--ins-coral);color:#fff;display:grid;place-items:center;font-family:"IBM Plex Serif";font-size:20px;font-weight:600}
.cta-strip-r .agent .n{font-size:14px;font-weight:600}
.cta-strip-r .agent .r{font-size:12px;color:rgba(255,255,255,.65)}
.cta-strip-r .btn-wa{display:flex;align-items:center;justify-content:center;gap:10px;background:var(--ins-coral);color:#fff;padding:14px 18px;border-radius:8px;font-weight:600;font-size:14.5px;text-decoration:none;border:none;cursor:pointer;font-family:inherit}
.cta-strip-r .btn-wa:hover{background:var(--ins-coral-deep)}

/* CLIENTE — disclaimers */
.fine{background:var(--cream);border:1px solid var(--line);border-radius:8px;padding:22px 28px;font-size:12px;color:var(--ink-3);line-height:1.65}
.fine strong{color:var(--ink-2);font-weight:600}
```

- [ ] **Step 2: Extender `renderClienteMain` para incluir las 4 secciones finales (servicios, docs, periodos, cta, disclaimer)**

Reemplazar `renderClienteMain` por:
```javascript
    function renderClienteMain(){
      const main = document.getElementById('cli-main');
      main.innerHTML =
        renderClienteCmp() +
        renderClientePago() +
        renderClienteServicios() +
        renderClienteDocs() +
        renderClienteEspera() +
        renderClienteCTA() +
        renderClienteDisclaimers();
    }

    function renderClienteServicios(){
      return `
        <section class="included">
          <div>
            <h3>Servicios que vienen sin costo adicional</h3>
            <div class="sub">Independientemente del plan que elija, su póliza Vital 360 incluye estos beneficios complementarios.</div>
          </div>
          <div class="included-grid">
            <div class="inc-item"><div class="ico">+</div><div><div class="t">Medicina virtual 360</div><div class="d">Consultas médicas por video, sin costo, las 24 horas.</div></div></div>
            <div class="inc-item"><div class="ico">a</div><div><div class="t">Asistencia al viajero 360</div><div class="d">Hasta US$10.000 por viaje en planes Regional e Internacional.</div></div></div>
            <div class="inc-item"><div class="ico">d</div><div><div class="t">Cobertura dental</div><div class="d">Por accidente y/o emergencia en todos los planes.</div></div></div>
            <div class="inc-item"><div class="ico">r</div><div><div class="t">Red médica INS</div><div class="d">Acceso a hospitales y especialistas en toda Costa Rica.</div></div></div>
          </div>
        </section>
      `;
    }

    function renderClienteDocs(){
      const p = cli.payload;
      const planRec = p.planRecomendado || p.planes[0];
      const docs = calcularDocumentos(p.asegurados, planRec);

      const baseItems = docs.base.map(d => `
        <div class="doc-c">
          <div class="icon"></div>
          <div class="info">
            <div class="nm">${escapeHtml(d.nombre)}</div>
            <div class="desc">${escapeHtml(d.desc)}</div>
          </div>
          <a class="dl" href="${d.archivo}" download title="Descargar PDF">↓</a>
        </div>`).join('');

      const dispSections = docs.disparadores.map(d => {
        const items = d.items.map(it => {
          if(it.tipo === "lista"){
            const exs = it.examenes.map(e => `<li>${escapeHtml(e)}</li>`).join('');
            return `<div class="exam-list">
              <div class="eh"><span>${escapeHtml(it.nombre)}</span><span class="note">vigencia 90 días</span></div>
              <ul>${exs}</ul>
            </div>`;
          }
          if(it.tipo === "pdf"){
            return `<div class="doc-c">
              <div class="icon"></div>
              <div class="info"><div class="nm">${escapeHtml(it.nombre)}</div><div class="desc">${escapeHtml(it.desc)}</div></div>
              <a class="dl" href="${it.archivo}" download title="Descargar PDF">↓</a>
            </div>`;
          }
          // aviso
          return `<div class="doc-c aviso" style="grid-column:span 2;background:var(--ins-teal-soft);border-color:var(--ins-teal-line)">
            <div class="icon" style="background:var(--paper)"></div>
            <div class="info"><div class="nm">${escapeHtml(it.nombre)}</div><div class="desc">${escapeHtml(it.desc)}</div></div>
          </div>`;
        }).join('');
        return `<div class="docs-section-c">
          <div class="label-c"><span class="lpin extra"></span>${escapeHtml(d.titulo)}<span class="trigger-chip">${escapeHtml(d.chip)}</span></div>
          <div class="docs-list-c">${items}</div>
        </div>`;
      }).join('');

      return `
        <section class="docs-c">
          <div class="docs-c-h">
            <h3>Documentos para <em>iniciar el aseguramiento</em></h3>
            <p class="sub">Cuando decida proceder con cualquiera de los planes cotizados, estos son los formularios que necesitamos completar. <strong>Su agente le acompaña en todo el proceso.</strong></p>
          </div>
          <div class="docs-c-body">
            <div class="docs-section-c">
              <div class="label-c"><span class="lpin base"></span>Para todos los asegurados · ${docs.base.length} documentos base</div>
              <div class="docs-list-c">${baseItems}</div>
            </div>
            ${dispSections}
            <div class="docs-note">
              <strong>Nota sobre cuestionarios médicos adicionales</strong>
              Si al llenar la Declaración de Salud algún asegurado responde afirmativamente alguna pregunta sobre afecciones específicas (diabetes, hipertensión, problemas digestivos, depresión/ansiedad, etc.), el INS puede requerir un cuestionario adicional específico. El agente le indicará cuál corresponde según sus respuestas.
              <span class="small">Las pruebas de salud tienen vigencia de 90 días naturales. La solicitud tiene vigencia de 60 días naturales.</span>
            </div>
          </div>
        </section>
      `;
    }

    function renderClienteEspera(){
      return `
        <section class="wait">
          <h3>Periodos de espera</h3>
          <div class="sub">El INS aplica un tiempo de espera para ciertas coberturas, desde la fecha en que inicia la póliza. Después de cumplido el plazo, la cobertura opera con normalidad.</div>
          <div class="wait-grid">
            <div>
              <div class="wait-row"><span class="k">Maternidad / embarazo</span><span class="v">13 m</span></div>
              <div class="wait-row"><span class="k">Preexistencias declaradas</span><span class="v">12 m</span></div>
              <div class="wait-row"><span class="k">Chequeo general</span><span class="v">24 m</span></div>
            </div>
            <div>
              <div class="wait-row"><span class="k">Trasplantes</span><span class="v">24 m</span></div>
              <div class="wait-row"><span class="k">Cataratas y glaucoma</span><span class="v">10 m</span></div>
              <div class="wait-row"><span class="k">Enfermedad de próstata</span><span class="v">10 m</span></div>
            </div>
            <div>
              <div class="wait-row"><span class="k">Tiroides</span><span class="v">10 m</span></div>
              <div class="wait-row"><span class="k">Hernias</span><span class="v">10 m</span></div>
              <div class="wait-row"><span class="k">Litiasis (vesícula/urinaria)</span><span class="v">10 m</span></div>
            </div>
          </div>
        </section>
      `;
    }

    function renderClienteCTA(){
      const a = cli.payload.agente;
      const wa = String(a.whatsapp || "").replace(/\D/g,'');
      const waLink = "https://web.whatsapp.com/send/?phone=506" + wa + "&text=" + encodeURIComponent("Hola " + a.nombre + ", quisiera consultar sobre la cotización Vital 360 N.º " + cli.payload.id);
      return `
        <section class="cta-strip">
          <div>
            <h3>¿Tiene una duda?<br><em>Hablemos directo.</em></h3>
            <p>Le explico cualquier detalle del plan, los periodos de espera o cómo cotizar diferente. Sin compromiso.</p>
          </div>
          <div class="cta-strip-r">
            <div class="agent">
              <div class="av">${inicialDe(a.nombre)}</div>
              <div>
                <div class="n">${escapeHtml(a.nombre)}</div>
                <div class="r">Agente autorizado INS · 100 Años INS</div>
              </div>
            </div>
            <a class="btn-wa" href="${waLink}" target="_blank">Escribir por WhatsApp · ${escapeHtml(a.whatsapp)}</a>
          </div>
        </section>
      `;
    }

    function renderClienteDisclaimers(){
      return `
        <section class="fine">
          <strong>Información importante.</strong> Esta cotización es de carácter informativo y se basa en las tarifas oficiales del Instituto Nacional de Seguros vigentes a la fecha indicada. Mantiene vigencia por ${cli.payload.vigenciaDias} días naturales. Las primas mostradas <strong>no incluyen el impuesto al valor agregado (IVA 2 %, tarifa especial para seguros de personas, Ley 9635 de Costa Rica)</strong>. La aceptación final del riesgo y la emisión de la póliza corresponden al INS conforme a la Ley Reguladora del Contrato de Seguros y al producto registrado bajo norma SUGESE P20-76-A01-1097 V3.
        </section>
      `;
    }
```

- [ ] **Step 3: Verificar en navegador**

Recargar vista cliente. Esperado:
- Bloque "Servicios que vienen sin costo adicional" con 4 cards (medicina virtual, asistencia, dental, red médica)
- Bloque "Documentos para iniciar el aseguramiento" — para una familia simple muestra solo los 3 base
- Bloque "Periodos de espera" con 3 columnas
- Banda teal CTA "¿Tiene una duda? Hablemos directo." con avatar del agente y botón WhatsApp
- Disclaimer al pie con texto del IVA 2%

Probar caso disparadores:
- Volver a la vista agente
- Agregar/editar asegurados para tener: 1 titular 68 años (extranjero_pasaporte) + 1 dependiente 72 años + 1 cónyuge 35
- Seleccionar plan Platinum 2 como recomendado
- Vista previa cliente → el bloque de documentos debe mostrar 3 secciones extra: telesuscripción, batería 71+ con lista de 11 exámenes, arraigo

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: vista cliente — servicios, documentos dinámicos, periodos espera, CTA, disclaimers"
```

---

## Task 14: Auth Google con whitelist + perfil del agente

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Agregar el script de Google Identity Services en el `<head>` antes del CSS**

```html
  <script src="https://accounts.google.com/gsi/client" async defer></script>
```

- [ ] **Step 2: Agregar HTML del bloqueado y del botón de Google en el view "agente"**

Reemplazar el contenido del `<div data-view="bloqueado">`:
```html
  <div data-view="bloqueado">
    <div style="max-width:520px;margin:80px auto;padding:40px;text-align:center;background:var(--paper);border:1px solid var(--line);border-radius:8px;font-family:'IBM Plex Sans'">
      <h2 style="font-family:'IBM Plex Serif';font-size:28px;font-weight:500;margin-bottom:12px">Acceso restringido</h2>
      <p style="color:var(--ink-3);font-size:14px;margin-bottom:18px">Este cotizador está reservado para agentes autorizados de Seguros Digitales SDI.</p>
      <p style="color:var(--ink-3);font-size:13px">Para solicitar acceso, contacte a <a href="mailto:jhernandez@segurosdelins.com" style="color:var(--ins-teal-deep)">jhernandez@segurosdelins.com</a>.</p>
      <p id="block-email" style="margin-top:18px;font-family:'IBM Plex Mono';font-size:12px;color:var(--ink-3)"></p>
    </div>
  </div>

  <div data-view="login">
    <div style="max-width:420px;margin:80px auto;padding:40px;text-align:center;background:var(--paper);border:1px solid var(--line);border-radius:8px">
      <h2 style="font-family:'IBM Plex Serif';font-size:28px;font-weight:500;margin-bottom:8px">Cotizador Vital 360</h2>
      <p style="color:var(--ink-3);font-size:14px;margin-bottom:24px">Inicie sesión con su cuenta autorizada para continuar.</p>
      <div id="g_id_signin"></div>
    </div>
  </div>
```

- [ ] **Step 3: Reemplazar la función `init()` y agregar las funciones de auth**

Reemplazar `init()` por:
```javascript
    function init(){
      runSmokeTests();
      const ruta = determinarVista();
      if(ruta.tipo === "cliente"){
        if(!ruta.payload){ showView("bloqueado"); return; }
        renderCliente(ruta.payload);
        showView("cliente");
        return;
      }
      // Vista agente requiere auth
      initGoogleAuth();
    }

    function initGoogleAuth(){
      // Si el SDK de Google ya cargó, configurar; si no, esperar
      if(!window.google || !google.accounts){
        setTimeout(initGoogleAuth, 200);
        return;
      }
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse
      });
      google.accounts.id.renderButton(
        document.getElementById('g_id_signin'),
        { theme: "filled_blue", size: "large", text: "signin_with", width: 280 }
      );
      showView("login");
      // Auto-prompt si hay sesión previa
      google.accounts.id.prompt();
    }

    function handleGoogleResponse(response){
      const payload = parseJwt(response.credential);
      if(!payload || !payload.email){
        document.getElementById('block-email').textContent = "Token sin email.";
        showView("bloqueado");
        return;
      }
      if(!isAuthorized(payload.email)){
        document.getElementById('block-email').textContent = "Email autenticado: " + payload.email;
        showView("bloqueado");
        return;
      }
      // Autorizado: cargar perfil del agente
      agenteActual = Object.assign({}, AGENTES[payload.email]);
      document.getElementById('mh-user-av').textContent = agenteActual.nombre.split(" ").map(w => w[0]).slice(0,2).join("").toUpperCase();
      document.getElementById('mh-user-name').textContent = agenteActual.nombre;
      loadDraft();
      renderAgente();
      showView("agente");
    }

    function parseJwt(token){
      try {
        const b64 = token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');
        return JSON.parse(decodeURIComponent(escape(atob(b64))));
      } catch(e){ return null; }
    }
```

- [ ] **Step 4: Bypass de desarrollo (para poder probar sin OAuth configurado todavía)**

Agregar en `initGoogleAuth`, justo antes del `if(!window.google …)`, un bypass condicionado por la URL para desarrollo local:

```javascript
      // Bypass para desarrollo: ?dev=1 simula login con el primer agente
      if(new URLSearchParams(location.search).get('dev') === '1'){
        const email = Object.keys(AGENTES)[0];
        agenteActual = Object.assign({}, AGENTES[email]);
        document.getElementById('mh-user-av').textContent = agenteActual.nombre.split(" ").map(w => w[0]).slice(0,2).join("").toUpperCase();
        document.getElementById('mh-user-name').textContent = agenteActual.nombre + " (dev)";
        loadDraft();
        renderAgente();
        showView("agente");
        return;
      }
```

- [ ] **Step 5: Verificar en navegador**

1. Abrir `index.html` (sin `?dev=1` y sin `?c=…`) → debe aparecer la pantalla "Cotizador Vital 360" con un botón de Google. Como el `GOOGLE_CLIENT_ID` aún es placeholder, el botón aparecerá pero el flujo no completará — esto es esperado.
2. Abrir `index.html?dev=1` → entra directo a la vista agente con el perfil "JC Hernández (dev)" en la esquina superior derecha.
3. Crear cotización → vista previa → todo funciona como antes.

**Nota:** Para que el login real funcione hay que crear un OAuth Client ID en Google Cloud Console (https://console.cloud.google.com/apis/credentials), tipo "Web application", agregar `https://vital360.appsegurosdigitales.com` y `http://localhost` como Authorized JavaScript Origins, y reemplazar `GOOGLE_CLIENT_ID` en el código. Esta tarea no incluye crear el OAuth Client (lo hace el owner antes de deployar).

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: auth Google con whitelist AGENTES + bypass ?dev=1 para desarrollo"
```

---

## Task 15: Assets PDFs, netlify.toml, README final y push a producción

**Files:**
- Create: `docs/*.pdf` (copiar de la carpeta de origen)
- Create: `netlify.toml`
- Modify: `README.md`

- [ ] **Step 1: Copiar los PDFs de `C:\Users\segur\vital 360\` a `docs/` del repo, renombrando**

```bash
cd "C:/Users/segur/cotizador-vital-360"
mkdir -p docs

cp "C:/Users/segur/vital 360/Solicitud Seguro Vital 360.pdf"       docs/solicitud-vital-360.pdf
cp "C:/Users/segur/vital 360/Autorización Consulta Expedientes.pdf" docs/autorizacion-expedientes.pdf
cp "C:/Users/segur/vital 360/Declaración Salud V7.pdf"             docs/declaracion-salud.pdf
cp "C:/Users/segur/vital 360/Declaración Médica V5.pdf"            docs/declaracion-medica.pdf
cp "C:/Users/segur/vital 360/Boleta Exámen Físico.pdf"             docs/boleta-examen-fisico.pdf
cp "C:/Users/segur/vital 360/Solicitud Abreviada Vital.pdf"        docs/solicitud-abreviada.pdf
cp "C:/Users/segur/vital 360/Solicitud Beneficios.pdf"             docs/solicitud-beneficios.pdf
cp "C:/Users/segur/vital 360/Condiciones generales vital 360.pdf"  docs/condiciones-generales.pdf
cp "C:/Users/segur/vital 360/Guia Aseguramiento.pdf"               docs/guia-aseguramiento.pdf
cp "C:/Users/segur/vital 360/Coberturas Planes Colones.pdf"        docs/coberturas-planes-crc.pdf
cp "C:/Users/segur/vital 360/Coberturas y Planes.pdf"              docs/coberturas-planes-usd.pdf
cp "C:/Users/segur/vital 360/Periodos de Espera.jpg"               docs/periodos-espera.jpg
cp "C:/Users/segur/vital 360/Red Médica.pdf"                       docs/red-medica.pdf

ls docs/
```

Expected output: lista de 13 archivos (12 PDF + 1 JPG).

- [ ] **Step 2: Crear `netlify.toml`**

```toml
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/docs/*"
  [headers.values]
    Cache-Control = "public, max-age=86400"
    Content-Disposition = "attachment"
```

- [ ] **Step 3: Actualizar el README con instrucciones completas de deploy**

Reemplazar el contenido de `README.md` por:
```markdown
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
```

- [ ] **Step 4: Verificar que los links de PDFs funcionan**

Abrir `index.html?dev=1`, crear una cotización, vista previa cliente. En el bloque de documentos, click en la flecha ↓ de cada documento — debe descargar el PDF correspondiente.

- [ ] **Step 5: Commit**

```bash
git add docs/ netlify.toml README.md
git commit -m "feat: assets PDFs + netlify.toml + README final con guías de mantenimiento"
```

- [ ] **Step 6: Push final**

```bash
git push origin main
```

- [ ] **Step 7: Setup Netlify (manual, fuera del código)**

El owner ejecuta una sola vez:
1. Conectar el repo `jhernandez-vibecode/cotizador-vital-360` a Netlify (login con GitHub)
2. Build settings: dejar todo por defecto (publish directory `.`, no build command)
3. Configurar dominio personalizado: `vital360.appsegurosdigitales.com`
4. Agregar CNAME en el DNS de `appsegurosdigitales.com`
5. Crear el Google OAuth Client ID y actualizar `GOOGLE_CLIENT_ID` en `index.html`
6. Push final con el Client ID real

- [ ] **Step 8: Smoke test en producción**

Una vez deployado:
1. Abrir https://vital360.appsegurosdigitales.com → debe pedir login Google
2. Loguearse con `jhernandez@segurosdelins.com` → entrar a vista agente
3. Crear cotización completa, click "Vista previa cliente" → abre nueva pestaña con la URL `?c=…`
4. Verificar que los PDFs se descargan
5. Probar "Enviar por WhatsApp" → abre WhatsApp Web con el mensaje

---

## Notas de implementación

- **Consistencia con mockups:** Los mockups en `C:\Users\segur\vital 360\mockups\` son la fuente de verdad visual. Si surge una duda de estilo, comparar con los archivos `mockup-C-*.html`.
- **Versionado:** Después del primer deploy estable y 1 semana de cooldown sin incidentes, taguear como `v1.0.0`. Releases mayores usan `-rc` con cooldown 1 semana antes de promoción.
- **Backups del estado:** El borrador del agente está solo en `localStorage`. Si JC cambia de dispositivo o limpia su navegador pierde el borrador. Esto es aceptable para MVP — la cotización final ya se envió como link y queda en el chat de WhatsApp.

---

## Self-Review (interna al plan)

1. **Cobertura del spec:** ✅ las 15 secciones del spec tienen tarea asociada. Datos (Task 3), cálculos (Task 4), disparadores (Task 5, lógica + Task 13 render), routing (Task 5), vistas (Tasks 7-13), auth (Task 14), WhatsApp (Task 10), PDFs y deploy (Task 15).
2. **Placeholders:** ✅ ningún "TBD" / "TODO" / "implement later" / "similar to Task N" sin código.
3. **Type consistency:** ✅ los nombres `state`, `cli`, `agenteActual`, `AGENTES`, `PLANES`, `RECARGOS`, `COBERTURAS_DEFS`, `calcularDocumentos`, `renderPaso1/2/3`, `renderClienteHero/Toggle/Main/Cmp/Pago/Servicios/Docs/Espera/CTA/Disclaimers` son consistentes entre tasks.
4. **Scope:** este plan cubre el MVP completo. No requiere decomposición.
