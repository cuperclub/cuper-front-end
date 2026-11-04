# Decisiones de arquitectura frontend Cuper

**Estado:** propuesta para revisión humana. Decisiones derivadas de `frontend-audit.md` y del alcance actualizado por el usuario.

**Última revisión:** 2026-11-04, incorporando contraste con documentación oficial vía Context7. Los números de parche citados son una fotografía del registro consultado el 2026-10-30; se verificarán al implementar.

## D1. Alcance y repositorios

- Mantener Angular y la historia del repositorio web `cuper-front-end`.
- Modernizar el producto web como SPA/PWA responsive.
- Considerar `../cuper-mobile` fuente de UX/assets, no base de una segunda aplicación destino: es Ionic 4/Cordova incompleta y su login no autentica.
- No tocar ni retirar el repositorio mobile durante esta migración sin autorización separada.

## D2. Versiones de destino

Angular 22.2.4; CLI/build 22.2.5; Material/CDK 22.2.5; TypeScript 6.0.x; RxJS 7.4+ (objetivo 7.8.2); Node 24 LTS con parche compatible (`>=24.15.0`). Validar todos los peers en cada PR. Angular 22 requiere TS `>=6.0 <6.1`; no instalar TypeScript 7 aunque sea más reciente.

## D3. Standalone completo

Destino: `bootstrapApplication`, `app.config.ts`, `app.routes.ts`, componentes/directivas/pipes standalone, guards e interceptors funcionales, providers globales o de route, lazy loading mediante imports dinámicos y cero NgModules propios. Usar schematics oficiales, en orden: convertir declarations, eliminar módulos innecesarios, pasar a bootstrap standalone. Revisar TODOs y imports manualmente.

No confundir eliminación de módulos de aplicación con prohibición de consumir una librería externa mantenida cuya API use NgModule. Evitar agregadores propios globales como `MaterialModule`; importar APIs standalone/componentes requeridos en cada feature.

El schematic exige Angular >=15.2, compilación sin errores y cambios guardados. En este plan se ejecuta en el hito 20.3, compilando y revisando entre los tres modos. Desde Angular 17 se incluye migración de control flow en PR separado; convertir inputs/outputs/queries a Signals no es requisito general de standalone.

## D4. Zoneless desde arquitectura objetivo

- Angular 21+ es zoneless por defecto; destino Angular 22 sin `provideZoneChangeDetection` ni Zone runtime.
- A lo largo de los saltos antiguos, Zone puede permanecer solo mientras lo exija Angular de ese escalón.
- Introducir señales/notificaciones de vista antes o junto al bootstrap zoneless; el primer bootstrap standalone objetivo debe ser zoneless.
- Hito inicial concreto: Angular 20.3 con `provideZonelessChangeDetection()` explícito; retirar Zone de runtime/polyfills/dependencias en ese hito, no esperar a Angular 21.
- En los callbacks de Pusher, FileReader, timers y formularios, actualizar Signals, usar AsyncPipe/observables o `markForCheck` si corresponde.
- Zone.js no se conserva como workaround, ni en runtime ni en config de tests (no habrá tests).
- Evitar OnPush mecánico; adoptarlo donde los inputs y las notificaciones de estado lo permitan.
- `setValue`, `patchValue` y mutaciones de `FormArray` no programan por sí solos el render: conectar observables de forms o Signals a una notificación si el template depende de ese estado.

## D5. Dependencias: compatibilidad antes que apego

Para cada paquete: verificar uso, mantenimiento, peers Angular, standalone, zoneless, licencia, seguridad y coste. Orden de preferencia: API Angular/browser → actualizar versión compatible → alternativa mantenida compatible → implementación interna pequeña → eliminar. No ignorar peers con `--force` ni mantener una dependencia que impida actualizar.

No reimplementar autenticación, criptografía o protocolos críticos. El reemplazo de angular-token es un adaptador HTTP propio del contrato Rails existente, sin inventar seguridad ni protocolo.

## D6. Ionic/Cordova

No usar Ionic/Capacitor/Cordova en el destino PWA. La aplicación web actual usa Material; móvil aporta onboarding/tabs y placeholders, no flujos backend completos. Reemplazar visuales con Angular, CSS, Router y APIs nativas del navegador. No trasladar SQLite: el único uso observado de Storage es un flag de onboarding y no se encontró uso del plugin sqlite. Evaluar manualmente activos y UX de móvil antes de reutilizarlos.

## D7. Sin suites de testing

**Decisión original, en revisión:** retirar suites legacy y no incorporar una nueva. **Instrucción posterior del usuario (2026-11-04):** ejecutar build, tests y navegador en cada iteración. Hasta resolver el alcance final, conservar specs, scripts y suites existentes, intentar su ejecución y reportar fallos/bloqueos sin presentarlos como aprobados. No instalar una suite nueva ni borrar tests unilateralmente.

La revisión de navegador usa Playwright MCP sin añadir Playwright como dependencia del proyecto. CI y política definitiva de conservación/sustitución de herramientas quedan pendientes de aclaración; build y chequeos estáticos siguen siendo necesarios.

## D8. Estado y servicios

- Sin NgRx inicial: tamaño/estado observado no lo justifican.
- Signals readonly en servicios para sesión, empresa activa y estado local; `computed` para derivaciones.
- RxJS para HTTP, búsqueda, cancelación/concurrencia y Pusher; `toSignal`/`toObservable` solo en fronteras útiles.
- Effects solo para efectos externos, no para duplicar estado derivado.
- DTOs separados de view models cuando haya una transformación concreta; preservar snake_case en frontera Rails.
- Errores/carga/vacío/success explícitos. Nunca marcar transacción exitosa antes de respuesta confirmada.

La preparación mínima de estado de sesión/empresa activa ocurre antes del hito zoneless; no posponerla a una fase de limpieza posterior. Para HttpClient, preservar interceptors con `withInterceptors` y, solo si quedan clases transitorias, `withInterceptorsFromDi`. Revisar el backend HTTP del escalón y su capacidad de upload progress; multipart solo no exige XHR.

## D9. PWA y offline

Aplicar `@angular/pwa` oficial. SPA estática; manifest, iconos, SW, HTTPS, experiencia de instalación opcional y actualización controlada.

Cache inicial: shell, bundles versionados, fuentes/assets propios públicos. Excluir API autenticada, respuestas de clientes/negocios, auth, imágenes privadas y Wallet. No almacenar tokens o datos personales en Cache Storage. No implementar operaciones offline ni background sync de acumulaciones/canjes. Con pérdida de red mostrar desconexión y no éxito.

Inicialmente no habrá `dataGroups` de API. No se admiten patrones negativos en `dataGroups.urls` ni en `assetGroups.resources.urls`; limitar positivos de assets a lo público. Las exclusiones del fallback de navegación se definen mediante `navigationUrls`, distinguiendo rutas backend del mismo origen de callbacks propios de la SPA.

Gestionar nueva versión con aviso/reload seguro, no mezclar chunks de builds. Mantener compatibilidad de API con clientes desplegados; el SW no es un mecanismo suficiente de control de versión backend.

Al recibir `VERSION_READY`, preferir recarga controlada y no `activateUpdate()` sin reload. Manejar fallos irrecuperables y no recargar mientras una transacción tenga resultado pendiente.

## D10. Render y deploy

SPA estática usando application builder, sin SSR obligatorio. Cloudflare Pages u hosting estático barato; fallback SPA; salida del build comprobada antes de configurar deploy. Compresión y headers; assets con hash cacheables a largo plazo, `index.html`/manifest/worker revalidables. No introducir runtime Node SSR. Landing SEO puede evaluarse como SSG separado.

## D11. Rails y Wallet

Base de integración vigente desde 2026-11-04: `feat/backend-modernization` del repositorio hermano, no master. Su contrato parcial y rutas capturadas son fuente de coordinación; comprobar respuestas reales antes de generar cliente. Runtime declarado Ruby 3.4.12/Rails 8.0.5.1; preparación con RVM sin default global. No ejecutar seed destructivo para obtener cuentas.

Preservar endpoints/métodos/payloads actuales; inventario provisional en `api-contract.md`. Cambios de contrato son propuestas para acuerdo Rails, nunca requisito supuesto. OpenAPI definitivo pertenece al backend; generar cliente TS solo cuando exista especificación confiable.

Aceptar endurecimiento de autorización y canje de la rama modernizada: el servidor define costo y rounding, el frontend no restaura comportamiento vulnerable. Adoptar idempotencia opcional por intención real del usuario cuando se implemente la adaptación, sin cola offline. Ajustar UX de reset admin a envío de instrucciones, no asignación directa de password.

Wallet será feature desacoplada, inactiva si endpoints no existen. Rails emite/firma pases y mantiene credenciales. UI no firma, no almacena claves y nunca anuncia éxito por abrir URL. QR no sustituye autorización del servidor.

## D12. Seguridad

No cambiar almacenamiento de tokens unilateralmente. Guards son UX, Rails autoriza. Limitar interceptor al origen API exacto; gestionar 401/403 diferenciadamente; limpiar estado al logout/cambio de usuario. Revisar OAuth, postMessage, CSP, Pusher y URLs antes de endurecer cabeceras. Claves públicas no son secretos, pero requieren restricciones de origen/cuota. Sin PII, tokens ni URLs Wallet sensibles en logs. Sesiones cookies/HttpOnly, si se desean, requieren migración conjunta Rails.

## D13. Organización y UX

Organización gradual por `core/`, `features/{account,customer,business,cashier,admin,wallet}/`, `shared/`. No mover todo en un único PR. Mantener interfaz existente salvo ajustes técnicos; prioridad móvil, accesibilidad, español Ecuador e inglés ya existentes, moneda USD y fechas con locale/timezone acordados. Cambios de rediseño son backlog posterior separado.

Material MDC no equivale a rediseñar el tema a Material 3; completar migración legacy en el escalón soportado y mantener identidad visual. Animaciones legacy/providers deprecados desde Angular 20.2 son solo transición si un consumidor lo exige; no añadirlos por defecto a la arquitectura objetivo.
