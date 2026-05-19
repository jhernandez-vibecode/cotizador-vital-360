# Cotizador Vital 360 · Diseño

**Fecha:** 2026-05-18
**Producto:** Seguro Vital 360 (gastos médicos · INS Costa Rica)
**Registro SUGESE:** P20-76-A01-1097 V3 · 02 abril 2025
**Repo:** `jhernandez-vibecode/cotizador-vital-360`
**Deploy:** `vital360.appsegurosdigitales.com` (Netlify)
**Marca:** Seguros Digitales SDI · 100 años INS

---

## 1. Objetivo

App web single-file que permite a JC (agente INS) cotizar Vital 360 para clientes, comparar los 7 planes y enviar al cliente una vista personalizada vía WhatsApp con los 3 planes recomendados.

**Dos vistas en la misma aplicación:**

1. **Vista agente** (requiere login Google con whitelist) — flujo de cotización completo.
2. **Vista cliente** (link público stateless) — solo los 3 planes elegidos por el agente más documentos requeridos.

---

## 2. Datos del producto Vital 360

### 2.1 Planes (7 en total)

| Ámbito | Plan | Suma asegurada USD | Suma asegurada CRC | Deducible USD | Deducible CRC |
|---|---|---|---|---|---|
| Local · Costa Rica | Esencial 1 | $15.000 | ₡8.250.000 | $0 | ₡0 |
| Local · Costa Rica | Esencial 2 | $25.000 | ₡13.750.000 | $0 | ₡0 |
| Regional · Centroamérica | Pro 1 | $50.000 | ₡27.500.000 | $100 | ₡55.000 |
| Regional · Centroamérica | Pro 2 | $100.000 | ₡55.000.000 | $200 | ₡110.000 |
| Internacional · Mundo | Platinum 1 | $300.000 | ₡165.000.000 | $250 | ₡137.500 |
| Internacional · Mundo | Platinum 2 | $500.000 | ₡275.000.000 | $500 | ₡275.000 |
| Internacional · Mundo | Deluxe | $1.000.000 | ₡550.000.000 | $1.000 | ₡550.000 |

### 2.2 Rangos de edad para tarifación (13 rangos)

`0-25`, `26-29`, `30-34`, `35-39`, `40-44`, `45-49`, `50-54`, `55-59`, `60-64`, `65-69`, `70-75`, `76-80`, `81+`

### 2.3 Matriz de primas

- **2 tablas paralelas oficiales del INS** (CRC y USD), no se derivan una de otra.
- Cada tabla = 13 rangos de edad × 7 planes = **182 valores por moneda** (364 totales).
- **Prima familiar** = suma de primas individuales de cada asegurado según su edad y el plan elegido.

### 2.4 Moneda

- La póliza se emite en CRC **o** en USD (no hay conversión).
- El cliente elige una sola moneda al contratar.
- El toggle CRC↔USD en el cotizador cambia entre las 2 tablas paralelas oficiales.
- No existe campo "tipo de cambio".

### 2.5 IVA

- **2 %** sobre prima neta (tarifa especial para seguros de personas, Ley 9635 Costa Rica).
- **NO se suma** a los montos mostrados.
- Se muestra como nota visual `+ 2 % IVA` debajo del precio.
- El disclaimer completo aparece en el pie del cliente.

### 2.6 Formas de pago

| Modalidad | Recargo CRC | Recargo USD | Cuotas/año |
|---|---|---|---|
| Anual (recomendada) | 0 % | 0 % | 1 |
| Semestral | +5 % | +3 % | 2 |
| Trimestral | +7 % | +4 % | 4 |

**No se ofrece pago mensual** (decisión de la oficina, no del producto). La oficina de JC no vende mensual en ninguna línea.

### 2.7 Coberturas

Cada plan tiene aprox. **27 coberturas** con sublímites distintos. Se almacenan en una matriz `coberturas[plan][cobertura] = {usd, crc}` o el valor `'NA'` cuando no aplica.

Lista de coberturas (orden fijo, mostrado en el detalle):
`gastos_medicos`, `deducible`, `stop_loss`, `maternidad`, `prematurez`, `congenitas`, `trasplantes`, `aparatos_apoyo`, `medicamentos`, `epidemicas`, `mentales`, `deportivas`, `futbol`, `ambulancia_aerea`, `dental_accidente`, `asistencia_viajero`, `chequeos`, `nino_sano`, `fallecimiento`, `salpingectomia`, `vasectomia`, `vih_sida`, `terapias`, `preexistencias`, `medicina_virtual`, `transporte_evacuacion`, `emergencias_medicas`.

### 2.8 Periodos de espera

- Maternidad / embarazo: 13 meses
- Preexistencias declaradas: 12 meses
- Trasplantes: 24 meses
- Chequeos: 24 meses
- Cataratas, glaucoma, próstata, tiroides, amígdalas, sinusitis, tiroides, vesícula biliar, vías urinarias, aparato genital femenino, hemorroides, hernias, rodillas: 10 meses

---

## 3. Datos del asegurado

Cada asegurado tiene:
- `nombre` (string)
- `parentesco` (titular | conyuge | hijo | otro)
- `edad` (number)
- `nacionalidad` (CR | extranjero_residente_permanente | extranjero_residente_temporal | extranjero_pasaporte)

Reglas de elegibilidad (Guía INS):
- Titular debe ser mayor de 18 años.
- Hijos: solteros, residentes con titular, estudiantes, dependientes, edad ≤ 25 años.
- Otros dependientes (padres, hermanos): deben tener dependencia económica.
- Sin titular no se pueden asegurar dependientes (excepciones documentadas).

El cotizador valida elegibilidad al agregar/editar asegurado y muestra alerta no bloqueante.

---

## 4. Arquitectura técnica

### 4.1 Stack

- **HTML + CSS + JS vanilla** single-file (`index.html`)
- **Sin backend**, sin base de datos
- **Sin frameworks** (zero build step)
- **Tipografía Google Fonts:** IBM Plex Sans + IBM Plex Serif + IBM Plex Mono
- **Auth Google** vía Google Identity Services (GIS) con `id_token` en cliente y whitelist hardcoded

### 4.2 Estructura del repo

```
cotizador-vital-360/
├── index.html              # single-file app (HTML + CSS + JS embebidos)
├── docs/                   # PDFs descargables
│   ├── solicitud-vital-360.pdf
│   ├── autorizacion-expedientes.pdf
│   ├── declaracion-salud.pdf
│   ├── declaracion-medica.pdf
│   ├── boleta-examen-fisico.pdf
│   ├── solicitud-abreviada.pdf
│   ├── solicitud-beneficios.pdf
│   ├── condiciones-generales.pdf
│   ├── guia-aseguramiento.pdf
│   ├── coberturas-planes-crc.pdf
│   ├── coberturas-planes-usd.pdf
│   ├── periodos-espera.jpg
│   └── red-medica.pdf
├── docs/superpowers/specs/ # documentación del proyecto (este archivo)
├── netlify.toml            # config de deploy
└── README.md
```

### 4.3 Auth (vista agente)

- Whitelist hardcoded en JS como objeto `AGENTES[email]` con el perfil del agente:
  ```js
  const AGENTES = {
    "jhernandez@segurosdelins.com": { nombre: "JC Hernández", whatsapp: "8624 8757", codigo: "XXX" },
    // emails adicionales se agregan por commit
  };
  ```
- El email autenticado por Google se usa como llave: si existe en `AGENTES` → acceso permitido, el perfil se usa para personalizar el payload (nombre, WhatsApp del agente).
- Si el usuario no está en `AGENTES` → mensaje de bloqueo + link a contactar al owner.
- La whitelist NO bloquea la vista cliente (`?c=…`).

### 4.4 Vistas y enrutamiento

Una sola URL. La query string determina la vista:

| URL | Vista | Auth |
|---|---|---|
| `/` | Vista agente | Sí (Google whitelist) |
| `/?c=BASE64STRING` | Vista cliente | No |

La vista cliente decodifica el payload de Base64URL → objeto JSON con la cotización completa, y la renderiza. **Stateless**, sin servidor.

### 4.5 Persistencia

- **Vista agente:** borrador en `localStorage` con clave `vital360.borrador` (último estado del formulario por usuario).
- **Vista cliente:** sin persistencia. Toda la cotización viene en la URL.

---

## 5. Vista agente · flujo

3 pasos en una sola página (no wizard separado, todo scrollable):

### Paso 1 · Datos del cliente y asegurados (banda compacta arriba)
- Nombre cliente, cédula, WhatsApp
- Lista horizontal de asegurados como chips (avatar inicial + nombre + edad + ✕)
- Cada chip clickeable abre mini-form con: nombre, parentesco, edad, nacionalidad
- Botón "Agregar asegurado"
- Toggle moneda CRC / USD

### Paso 2 · Los 7 planes · primas calculadas (scanner)
- Grid de 7 mini-cards (uno por plan)
- Cada card muestra: ámbito, nombre, suma asegurada, prima familiar/año + nota IVA
- Click en estrella ★ marca el plan como "incluir en vista cliente" (máx. 3)
- Debajo: comparativa detallada · tabla con 7 columnas (uno por plan) y filas por cobertura. Las columnas seleccionadas se resaltan visualmente.
- Toggle "Mostrar todas las coberturas" (expande de 9 filas top a las 27 completas)

### Paso 3 · Enviar al cliente (banda teal de cierre)
- Confirma los 3 planes seleccionados (chips)
- 3 botones:
  - **Enviar por WhatsApp** → genera link cliente, abre `web.whatsapp.com/send/?phone=…&text=…` con mensaje preformateado
  - **Vista previa cliente** → abre nueva pestaña con la URL `?c=…`
  - **Copiar link** → copia URL al portapapeles

---

## 6. Vista cliente · flujo

Página de scroll vertical, sin formulario. Todo precargado desde el payload Base64.

Secciones en orden:

1. **Hero personalizado** (teal): nombre cliente, agente preparador (nombre y datos desde `payload.agente`), fecha, vigencia 30 días + tarjeta con los asegurados
2. **Toggle CRC/USD sticky** en barra superior — permite al cliente alternar entre las 2 tablas paralelas
3. **Comparativa de 3 planes** lado a lado (cards). El plan central queda destacado como "Recomendado" (configurable por el agente).
4. **Formas de pago** del plan recomendado (3 opciones: anual / semestral / trimestral)
5. **Servicios incluidos** (medicina virtual, asistencia viajero, dental, red médica) — bullets visuales
6. **Documentos para iniciar el aseguramiento** (sección dinámica · ver §7)
7. **Periodos de espera** (grid amigable)
8. **CTA WhatsApp** (banda teal con foto del agente)
9. **Disclaimers** (IVA, vigencia, registro SUGESE)

---

## 7. Lógica de documentos requeridos (auto-cargada)

Este es el corazón de la automatización pedida por JC. Las reglas vienen de la **Guía de Suscripción Seguro Vital 360 (INS, 15/05/2024)**.

### 7.1 Base (siempre, independiente de composición)

| Documento | Archivo |
|---|---|
| Solicitud de Seguro Vital 360 | `docs/solicitud-vital-360.pdf` |
| Autorización Consulta de Expedientes | `docs/autorizacion-expedientes.pdf` |
| Declaración de Salud + COVID-19 | `docs/declaracion-salud.pdf` |

### 7.2 Disparadores condicionales

Cada disparador, si se activa, agrega su sección al bloque de documentos, con un chip que indica qué lo activó (UX: el agente y el cliente entienden por qué aparece).

| Disparador (condición) | Sección que se agrega |
|---|---|
| Algún asegurado entre 66 y 70 años | Telesuscripción · entrevista dirigida (el INS coordina llamada). NO entrega documento físico. |
| Algún asegurado de 71 años en adelante | Boleta de Examen Físico (PDF) + Lista de 11 exámenes de laboratorio (cubiertos por INS) |
| Plan Internacional (Platinum 1/2/Deluxe) + algún asegurado con `nacionalidad ∈ {extranjero_residente_temporal, extranjero_pasaporte}` | Comprobación de arraigo (4 alternativas: DIMEX / carta patrono / CCSS 2+ años / cónyuge CR 3+ años) |
| 3 o más dependientes mayores de 18 años | Solicitud Abreviada Vital (segunda hoja) |
| Inclusión de menor recién nacido (parto cubierto, edad < 30 días) | Aviso post-emisión: constancia de nacimiento en 3 meses |

### 7.3 Cuestionarios condicionales (no automatizables)

El cotizador NO puede anticiparlos porque dependen de respuestas en la Declaración de Salud. Se muestra una nota al pie:

> Si al llenar la Declaración de Salud algún asegurado responde afirmativamente a alguna pregunta sobre afecciones específicas (diabetes, hipertensión, problemas digestivos, sistema nervioso, etc.), el INS puede requerir un cuestionario adicional. El agente indicará cuál según las respuestas.

### 7.4 Vigencias mostradas

- Solicitud: 60 días naturales desde que se completa.
- Pruebas de salud: 90 días naturales desde que se realizan.

### 7.5 Batería de exámenes para 71+

Lista exacta a mostrar (cubierta por INS, debe hacerse en proveedor autorizado):

1. Uroanálisis
2. Electrocardiograma de reposo
3. Valoración cardiovascular
4. Hemoglobina glicosilada
5. Glicemia en ayunas
6. Enzimas hepáticas (ALT, AST, GGT)
7. Bilirrubina total (directa e indirecta)
8. Creatinina
9. Perfil de lípidos
10. Antígeno prostático (PSA) · hombres
11. Sangre oculta en heces (Guayaco)

---

## 8. Diseño visual

Dirección estética seleccionada: **Institucional INS** (Mockup C).

### 8.1 Paleta

| Token | Hex | Uso |
|---|---|---|
| `--ins-teal` | `#1F5C6B` | Primario · headers, botones, chips |
| `--ins-teal-deep` | `#143F4A` | Foot, hero, utility bar |
| `--ins-teal-soft` | `#E3EEF1` | Fondos secundarios, hover |
| `--ins-coral` | `#E36B43` | Acento · CTAs, badges, "recomendado" |
| `--ins-coral-deep` | `#B94F2B` | Hover de coral, números 360 |
| `--cream` | `#F7F1E4` | Fondos cálidos, breadcrumbs |
| `--ink` | `#0E2127` | Texto principal |
| `--ink-2`, `--ink-3` | `#34464D`, `#6A7A80` | Texto secundario |
| `--green-ok` | `#19A65A` | Estados positivos (check) |
| `--ins-gold` | `#C18A2C` | Notas, etiquetas condicionales |

### 8.2 Tipografía

- **IBM Plex Serif** (display): nombres de planes, headlines, números grandes de prima
- **IBM Plex Sans** (body): UI general
- **IBM Plex Mono** (datos): cédulas, montos en celdas de comparativa, badges

### 8.3 Componentes clave

- **Cards de plan** con `border-radius: 6px`, borde fino, header con ámbito coral + nombre serif
- **Comparativa tabla** estilo folleto INS, con columnas seleccionadas resaltadas en teal soft
- **Chips de disparador** con dot de color según tipo (verde = base, coral = extra, dorado = condicional)
- **Botón WhatsApp** coral con icono

---

## 9. Cálculos · fórmulas

### 9.1 Prima familiar

```
primaFamiliar(plan, moneda, asegurados) =
  Σ primaIndividual(plan, moneda, edadDeAsegurado_i)
```

### 9.2 Prima individual

```
primaIndividual(plan, moneda, edad) =
  tablaPrimas[moneda][rangoEdad(edad)][plan]
```

Donde `rangoEdad(edad)` mapea edad → rango (0-25, 26-29, … 81+).

### 9.3 Recargo por fraccionamiento

```
totalAnualConRecargo(modalidad, moneda, primaFamiliar) =
  primaFamiliar × (1 + recargo[moneda][modalidad])
cuota(modalidad, totalAnualConRecargo) =
  totalAnualConRecargo / cuotasPorAño[modalidad]
```

### 9.4 Por persona/año (referencia para cliente)

```
porPersona(primaFamiliar, N) = primaFamiliar / N
```

Solo informativo, **no se muestra como precio cobrable**.

### 9.5 IVA (cosmético)

No se calcula, no se suma. Solo se muestra como nota textual "+ 2 % IVA" debajo de cada precio.

---

## 10. Payload del link cliente

Estructura JSON que se serializa a Base64URL:

```json
{
  "v": 1,
  "id": "0184",
  "fecha": "2026-05-18",
  "vigenciaDias": 30,    // constante en código (no editable en UI)
  "cliente": {
    "nombre": "José Vargas Mora",
    "telefono": "8765 4321"
  },
  "asegurados": [
    {"nombre":"José Vargas","parentesco":"titular","edad":42,"nacionalidad":"CR"},
    {"nombre":"Ana Solano","parentesco":"conyuge","edad":39,"nacionalidad":"CR"},
    {"nombre":"Luis Vargas","parentesco":"hijo","edad":12,"nacionalidad":"CR"},
    {"nombre":"Sofía Vargas","parentesco":"hijo","edad":8,"nacionalidad":"CR"}
  ],
  "monedaInicial": "CRC",
  "planes": ["esencial2","pro1","platinum1"],
  "planRecomendado": "pro1",
  "agente": {
    "nombre": "JC Hernández",
    "whatsapp": "8624 8757",
    "email": "jhernandez@segurosdelins.com"
  }
}
```

El cliente puede cambiar la moneda (toggle) — recalcula desde la tabla USD si elige dólares. El resto del payload es read-only.

---

## 11. WhatsApp · endpoint y mensaje

**Endpoint:** SIEMPRE `web.whatsapp.com/send/?phone=…&text=…` (no `wa.me`, ya que corrompe emojis).

**Mensaje preformateado** que se envía al cliente desde la vista agente:

```
Hola {nombreCliente}, le comparto su cotización Vital 360 con tres opciones que pensé para su familia:

🟢 {plan1}: {prima1} anual
🟡 {plan2}: {prima2} anual (recomendado)
🔵 {plan3}: {prima3} anual

Puede revisar el detalle, cambiar entre colones y dólares, y descargar los formularios aquí:
{linkCliente}

Cualquier consulta me escribe directo.
{agente.nombre} · {agente.whatsapp}
```

El bloque `{agente.…}` se rellena desde el perfil del agente logueado (mapeado por email Google al objeto `AGENTES[email]` con nombre, whatsapp, email).

---

## 12. Mantenimiento

### 12.1 Actualización de tarifas

Las tarifas INS se actualizan 1–2 veces al año. Cuando esto ocurra:

1. JC pasa nuevas tablas (CRC + USD)
2. Se actualiza el objeto `tablaPrimas` en el JS
3. Se incrementa la constante `TARIFAS_VERSION` (ej. `"2026-mayo"` → `"2026-noviembre"`)
4. Commit + push → deploy automático

### 12.2 Actualización de PDFs

Si INS modifica algún formulario:
1. Reemplazar PDF en `/docs/`
2. Si cambian las reglas de aseguramiento → revisar la lógica de disparadores en este spec

### 12.3 Versionado

- `v1.0.0` = primera versión estable en producción
- SemVer (-rc para release candidates con cooldown 1 semana)

---

## 13. Out of scope (v1)

Estos quedan explícitamente FUERA del MVP:

- ❌ Persistencia de cotizaciones (no se guardan en backend). Si se necesita historial → v2 con Google Sheets como base.
- ❌ Envío automático de cotización por email. Solo WhatsApp.
- ❌ Login de cliente (todo el flujo cliente es público via URL).
- ❌ Firma digital de solicitudes desde el cotizador. Se entrega PDF; el cliente firma aparte.
- ❌ Upload de documentos por el cliente. Los entrega físicamente a JC.
- ❌ Carga de fotos del cliente / asegurados.
- ❌ Cálculo de descuentos por familia numerosa o promociones (no existen en el producto).
- ❌ Conversión CRC↔USD con tipo de cambio (las tablas son paralelas, no derivadas).
- ❌ Pago en línea.
- ❌ Soporte multi-idioma (solo español).

---

## 14. Aprobaciones y revisiones

- **Diseño aprobado por JC:** 2026-05-18 (mockup C · institucional INS, vista agente con 7 planes → selección 3, vista cliente con bloque docs dinámico)
- **Reglas IVA y formas de pago confirmadas:** IVA 2 % (seguros de personas, Ley 9635). Pago sin mensual (decisión oficina).
- **Reglas de disparadores de documentos confirmadas:** extraídas de Guía de Suscripción INS 15/05/2024.

---

## 15. Referencias

- Guía de Suscripción Seguro VITAL 360 (Dirección de Seguros Personales INS, 15/05/2024)
- Condiciones Generales Vital 360 (registro SUGESE P20-76-A01-1097 V3)
- Cobertura de Asistencia al Viajero Anexo #1
- Cuadros de esquemas Vital 360 (CRC + USD) — folletos oficiales
- Tabla de Primas Anuales Vital 360 (CRC + USD)
- Periodos de espera · folleto oficial
