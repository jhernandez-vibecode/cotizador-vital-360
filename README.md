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
