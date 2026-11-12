# Plan de migración frontend Cuper

**Destino:** SPA/PWA Angular 22, completamente standalone y zoneless, preservando el contrato Rails existente. El plan cubre el frontend web y una evaluación/reutilización selectiva del repositorio `../cuper-mobile`.

**Límite explícito:** este documento no autoriza reescribir endpoints, cambiar autenticación de backend ni retirar el repositorio mobile. No se implementarán suites de tests. Las fases usan build, chequeo estático y revisión manual.

**Actualización operativa 2026-11-04:** el usuario pidió posteriormente build, tests y navegador en cada iteración. Esta instrucción prevalece sobre la ejecución de limpieza: se conservan e intentan los tests existentes, sin crear una suite nueva y sin eliminar specs/harness hasta resolver el alcance. Playwright MCP se usa para navegador, no como dependencia nueva. Las tareas de retirada de fase 1 quedan suspendidas donde contradigan esta actualización.

**Base Rails vigente (instrucción posterior, 2026-11-04):** usar `../cuper-backend` en `feat/backend-modernization`, commit inspeccionado `7a3b9db` (Ruby 3.4.12/Rails 8.0.5.1/Bundler 2.6.9). Los bloqueos anteriores de Ruby 2.5 corresponden a master. Instalar/seleccionar con RVM el runtime de esta rama sin cambiar default global, verificar bundle congelado y arranque; no ejecutar `bin/setup`, seeds ni migraciones de la base existente. Priorizar el contrato/handoff backend existente antes de adaptar auth, caja y reset admin; OpenAPI es parcial.

**PostgreSQL local:** la consulta de solo lectura detecta PostgreSQL 18.4 en 5432; las bases development/test configuradas no existen. La preparación de schema/cuentas sigue pendiente de acordar y no se ejecuta automáticamente como parte de instalar Ruby.

**Runtime instalado y validado:** RVM Ruby 3.4.12 seleccionado para comandos, default global intacto; Bundler 2.6.9 y bundle congelado instalados/comprobados. Boot development correcto con Rails 8.0.5.1 y sintaxis de 76 archivos Ruby sin errores. Backend permanece limpio en la rama seleccionada. Falta base/schema/cuentas autorizados para integración HTTP y base aislada antes de ejecutar RSpec; no interpretar boot como integración funcional aprobada.

**Checkpoint posterior, seed autorizado:** creada únicamente la base development local nueva, cargado schema y seed original bajo transacción/guardas, sin correos salientes. Registros esperados y contraseñas de cuatro cuentas verificadas. Rails en localhost:3000 y frontend temporal en localhost:4200; login cliente y recarga con validate_token 200 comprobados mediante navegador, consola sin errores. No se creó base test ni se ejecutó RSpec/caja/OAuth. El baseline privado está parcialmente validado, no aprobado por completo. El estado anterior de bases inexistentes queda como historial.

**Iteración 2 (2026-11-04):** `angular-token` fue reemplazado por `AuthService` + `AuthInterceptor` propios, preservando paths, headers, claves de `localStorage` y URLs OAuth. Todos los consumidores y guards migrados; dependencia retirada de `package.json`/lock con npm 6. Build development exit 0 y tests 8/8 antes y después de retirar la dependencia. Navegador: sesión heredada de `angular-token` válida, logout/login/recarga con validate_token 200 en desktop y móvil, consola sin errores. Roles: cajero accede a caja, partner a su empresa y admin a `/admin/companies`; cliente es redirigido fuera de admin. OAuth, reset/cambio de contraseña y production siguen pendientes de validación.

**Revisión documental:** 2026-11-04, contrastada con documentación oficial mediante Context7. Los parches citados corresponden a la consulta npm del 2026-10-30: no son un lock de implementación ni una certificación del último parche disponible hoy. Reverificar versiones y peers antes de cada PR.

## Principios de ejecución

- PRs pequeños y secuenciales; migración incremental, no reescritura.
- No actualizar framework hasta documentar baseline y resolver `angular-token`.
- Un major de Angular por PR, con `ng update` oficial, build y revisión manual.
- Si un paquete no soporta Angular 22/standalone/zoneless: actualizar, sustituir por alternativa compatible o implementar internamente solo si la funcionalidad es acotada. Eliminar si no se usa. No `--force`, no Zone workaround.
- No combinar actualización Angular, cambio visual completo ni cambio de API en el mismo PR.
- No tests: retirar Karma/PhantomJS/Protractor y CI de testing; reconocer riesgo funcional incrementado.
- Cada despliegue debe permitir volver al artefacto anterior; nunca revertir trabajo ajeno sin revisar.

## Baseline de preparación (2026-11-04)

| Elemento | Resultado de inspección | Pendiente antes del build legacy |
|---|---|---|
| Runtime local | Node 20.19.5 / npm 10.8.2 | No usar este runtime para reproducir Angular 7/Node 10; preparar toolchain aislado compatible |
| Dependencias | Sin `node_modules`; existe `package-lock.json` v1 y no hay `yarn.lock` | Recomendar npm como gestor único; confirmar versión npm apropiada del escalón y reproducibilidad del lock |
| CI | Node 10.16, `yarn install`, `yarn test` | Cambiar gestor/checks en el PR de fase 1, no en esta revisión documental |
| Build disponible | `npm run build` → `ng build`; production/staging mediante configuraciones CLI | No ejecutado: faltan dependencias y runtime compatible |
| Backend | Existe `../cuper-backend` | Presencia de carpeta no demuestra API levantada; confirmar URL, disponibilidad, contrato y cuentas autorizadas |
| Production | Environment carece de configuración API requerida | Confirmar dominio API/SPA, callbacks OAuth y reset; no inventar valores |
| Mobile | Repositorio inspeccionado; login/páginas incompletos | Producto debe elegir contenido/assets a recuperar; no modificar el repo mobile |

No se instalaron dependencias, ejecutaron builds ni contactaron entornos Rails en esta revisión. No hay baseline funcional aprobado todavía. Obtener acceso a cuentas de cliente/cajero/partner/admin y usuario sin empresa/multiempresa sin registrar contraseñas o tokens en documentación.

**Ejecución posterior del baseline (2026-11-04):** se preparó copia temporal aislada y Node 10.16 en Docker amd64; instalación reproducible y build development/staging correctos tras restaurar binarios postinstall. Production falla por environment incompleto. Tests existentes: 7/8 en dos ejecuciones, timeout reproducido en BillingCardComponent; ver detalle en `frontend-audit.md`. Navegador MCP: rutas públicas cargan y guard redirige sin sesión; integración privada bloqueada por Rails no disponible. PostgreSQL acepta TCP, pero `bundle check` detecta Ruby incompatible (3.0 vs 2.5). No se cambió código backend/frontend ni datos. Las observaciones de ejecución prevalecen sobre el estado de preparación de la tabla anterior.

**Iteración 1 posterior:** ajustado únicamente el spec BillingCardComponent para imports mínimos y traducciones deterministas, conservando componente/template reales y agregando assertions de render. Resultado final: tests 8/8, builds development/staging correctos, production sigue bloqueado; login revisado en navegador desktop/móvil. No se actualizó Angular/dependencias ni se modificó backend. Rails requiere además su configuración de credenciales: no hay master.key/RAILS_MASTER_KEY en la sesión; no solicitar ni versionar secretos.

## Ruta de versiones y runtime

El actual es Angular 7.1.4/CLI 7.1.4, TS 3.1.6, RxJS 6.3.3, Zone 0.8.29, Node declarado 10.16. Angular 22 exige Node `^22.22.3 || ^24.15.0 || ^26.0.0`, TS `>=6.0 <6.1`, RxJS `^6.5.3 || ^7.4.0`. Objetivo verificado: Angular 22.2.4, CLI/build/Material/CDK 22.2.5, TS 6.0.x, RxJS 7.8.x, Node 24 LTS compatible.

Secuencia de major: 7→8→9→10→11→12→13→14→15→16→17→18→19→20→21→22. Para cada salto, usar `ng update @angular/core@N @angular/cli@N`, migraciones de Material cuando aplique, actualizar tooling y compilar antes del siguiente. Seleccionar el parche y Node/TypeScript permitidos para ese major mediante el update guide oficial; no ejecutar una receta con runtime incompatible. Node antiguos necesarios para escalones serán toolchain temporal aislado, nunca destino de deploy.

**Hitos relevantes:** Angular 9 Ivy; Angular 13 View Engine removido; Angular 15 MDC/standalone; Angular 16 compatibilidad de librerías; Angular 17 control flow/build moderno; Angular 18 migración builder; Angular 20 opt-in zoneless; Angular 21 zoneless por defecto. Confirmar los detalles exactos en update guide al ejecutar.

## Fase 0 — Aprobación de alcance y baseline

**Objetivo:** fijar qué producto conservar y qué aporta el mobile antes de tocar código.

**Dependencias:** aprobación de este documento y acceso a entornos Rails/hosting.

**Componentes/archivos:** ambos repos; `src/app/pages`, `components`, `services`, `../cuper-mobile/src/app`, `../cuper-mobile/resources`, configs y assets.

**Pasos:**
- [ ] Confirmar que `cuper-front-end` es base funcional y `cuper-mobile` referencia, no destino de build.
- [ ] Revisar con producto las pantallas mobile que se desean recuperar; login actual es placeholder, no copiar como funcional.
- [ ] Registrar cuentas/roles de revisión y entorno backend de staging autorizado.
- [ ] Identificar imágenes, traducciones y recursos con licencia aprobada.
- [x] Registrar comandos/runtime presentes y bloqueos del baseline sin instalar dependencias en la revisión documental.
- [x] Preparar runtime legacy aislado, instalación reproducible y primer build development/staging sin cambiar manifests ni lock originales.
- [ ] Resolver configuration production, revisión manual privada contra Rails y aprobación del baseline antes de actualizar Angular.
- [ ] Corregir por separado configuración de production y callbacks tras acuerdo operativo.

**Riesgos:** backend inaccesible, production no reproducible, confundir placeholders mobile con negocio existente.

**Validación:** build legacy reproducible si entorno lo permite; revisión visual y manual de flujos web existentes.

**Aceptación:** inventario aprobado y diferencia legacy/fallo preexistente documentada.

**Rails:** ningún cambio; confirmar base URL y OAuth.

**Rollback:** cambios de configuración/baseline en PR separado; no eliminar mobile.

## Fase 1 — CI sin suites de tests

**Objetivo:** eliminar infraestructura de tests obsoleta de acuerdo con la decisión explícita del usuario.

**Estado actual:** retirada suspendida por la instrucción posterior de comprobar tests en cada iteración. No ejecutar eliminación de specs, dependencias, targets o scripts de test antes de aclarar la política definitiva; registrar primero la ejecución del baseline.

**Dependencias:** Fase 0; confirmar que no hay consumidores de scripts E2E fuera del repo.

**Archivos:** `package.json`, `angular.json`, `.circleci/config.yml`, `src/karma.conf.js`, `src/test.ts`, `src/tsconfig.spec.json`, `src/app/**/*.spec.ts`, `e2e/`, `tslint.json`.

**Pasos:**
- [ ] Eliminar scripts `test` y `e2e`, target test/protractor, PhantomJS, Protractor, Karma/Jasmine, launchers, reporters y tipos exclusivos.
- [ ] Eliminar specs y harness solo después de revisar contenido/cambios locales.
- [ ] Retirar configuración CircleCI que ejecuta tests; CI queda en install/build y lint/typecheck si se mantiene.
- [ ] Determinar gestor de paquetes único: package-lock existe y CircleCI usa yarn sin yarn.lock; acordar npm o generar lock coherente en PR de implementación.
- [ ] Sustituir TSLint/Codelyzer por ESLint compatible si se necesita lint estático; lint no es suite.
- [ ] No añadir Vitest, Playwright, mocks ni cobertura.

**Riesgos:** regresión sin detección automatizada; CI actual quizá depende implícitamente de tests.

**Validación:** pipeline ejecuta instalación limpia, build y lint/typecheck; inspeccionar diff para no borrar código ajeno.

**Aceptación:** ninguna referencia a PhantomJS/Protractor/Karma/Jasmine/zone-testing/scripts de test; pipeline verde en los checks acordados.

**Rails:** ninguno.

**Rollback:** revertir PR de infraestructura conservando decisión del producto; no introducir otra suite por rollback.

## Fase 2 — Inventario Rails y desbloqueo de auth

**Objetivo:** reemplazar biblioteca incompatible manteniendo protocolo existente.

**Dependencias:** contrato provisional en `api-contract.md`; entorno Rails de staging.

**Archivos:** `src/app/app.module.ts`, `src/app/services/user/user.service.ts`, `src/app/guards/`, login/register/password, environments.

**Pasos:**
- [ ] Confirmar con Rails headers, rutas auth, OAuth callbacks, errores y CORS.
- [ ] Contrastar contra `feat/backend-modernization`: CORS local explícito, reset admin mediante instrucciones Devise y errores de autorización que pueden responder 401. No tratar indiscriminadamente un 401 de permisos como sesión expirada.
- [x] Crear fachada AuthService/adaptador usando Angular HttpClient/RxJS compatible con versión actual.
- [x] Preservar token storage y headers legacy hasta acordar migración; no implementar criptografía/token propio.
- [x] Replicar sign in/up/out/validate/change/reset/OAuth.
- [ ] Validar origen y ventana en callback; manejar cierre/timeout; no exponer tokens a logs.
- [x] Migrar guards/consumidores gradualmente y retirar `angular-token` cuando no haya imports.
- [ ] Corregir redirect de password reset y environments con plataforma/deploy.

**Riesgos:** invalidar sesiones, refresh/rotación de headers, popup bloqueado, cambios en correo de reset.

**Validación manual:** login y reload en sesión existente; logout; expirar token; OAuth Google/Facebook; registro; recuperación por enlace; usuario multirol.

**Aceptación:** flujos equivalentes contra Rails antiguo, sin dependencia angular-token; sin cambio de almacenamiento no aprobado.

**Impacto Rails:** ninguno previsto. Cualquier cambio cookie/CSRF/CORS/OAuth es propuesta coordinada.

**Rollback:** conservar deploy anterior y formato de almacenamiento compatible durante transición; PR aislado.

## Fase 3 — Angular 7→15 y Material

**Checkpoint Angular 15 (2026-11-09):** framework 15.2.10, CLI 15.2.11 y Material/CDK 15.2.9. Migración oficial optó por componentes Material legacy para conservar apariencia; tema adaptado a la API de mapa de v15. Build exit 0, tests existentes 8/8 y navegador desktop/móvil con cuatro roles. Se documenta deuda preexistente de layout móvil por anchos fijos y el error esperado de Mapbox sin token. En el siguiente salto, Angular 16, se retiró ngcc y actualizaron bibliotecas View Engine; véase checkpoint superior.

**Checkpoint Angular 16 (2026-11-09):** framework 16.2.12, CLI 16.2.16, Material/CDK 16.2.14. Node 22.23.2/npm 10.9.8 y lockfile v3 (Angular admite Node >=18.10); Jasmine actualizado para resolver peers npm 10. `ngx-translate` core/http-loader y `ngx-infinite-scroll` actualizados a peers Ivy/Angular 16; build sin ngcc, suite 8/8 y navegador con cuatro roles. Próximo: Angular 17, revisar cuidadosamente el retiro de Material legacy y mantener apariencia.

**Checkpoint Angular 17 (2026-11-10):** framework 17.3.12, CLI/build 17.3.17, Node 20.19.6/npm 10.8.2 y TypeScript 5.4.5; migraciones CLI/core oficiales y `ngx-infinite-scroll` 17. Build y tests 8/8 aprobados. Material 16.2.14 se mantiene con peer Angular 17: el schematic de Material 17 bloquea la actualización por los componentes legacy eliminados. Migración MDC pasa a trabajo visual separado; validación funcional del navegador pendiente por DB Rails no disponible y puerto 4200 ajeno ocupado.

**Checkpoint MDC / Angular Material 17 (2026-11-10):** separado del salto Angular; migration schematic oficial aplicado a todos los componentes y Material/CDK en 17.3.10. Se preservan tema M2, paletas de marca y Lato. Build y tests existentes 8/8 pasan. Browser autenticado parcial por DB Rails/puerto de integración no disponibles; repetir dialogs y roles antes de dar por cerrada la revisión visual.

**Checkpoint Angular 18 (2026-11-10):** framework 18.2.14, CLI/build 18.2.21, Material/CDK 18.2.14; Node 20.19.6, TypeScript 5.5.4, `ngx-infinite-scroll` 18. Build y suite 8/8 aprobados. Login desktop/móvil visible sin overflow; validación autenticada pendiente por DB Rails inaccesible. Builder nuevo, control flow y zoneless quedan fuera por ser opcionales y requerir sus propias iteraciones.

**Checkpoint Angular 19 (2026-11-10):** framework 19.2.15, CLI/build 19.2.17, Material/CDK 19.2.19; Node 20.19.6, TypeScript 5.8.3, Zone.js 0.15.1. Build y suite existente 8/8 aprobados; browser login responsive inspeccionado. Application builder e initializer opcionales siguen fuera de alcance.

**Checkpoint Angular 20 (2026-11-10):** framework 20.3.18, CLI/build 20.3.17, Material/CDK 20.2.14; Node 20.19.6, TypeScript 5.8.3, Zone.js 0.15.1. Build y suite existente 8/8 aprobados; login responsive validado. Control flow, router signal y application builder siguen opcionales y fuera del salto.

**Checkpoint Angular 21 (2026-11-10):** framework 21.2.25, CLI/build 21.2.29, Material/CDK 21.2.14; Node 20.19.6, TypeScript 5.9.3, Zone.js 0.16.3. Build y suite existente 8/8 aprobados; el schematic core migra control flow en 34 templates como parte de las migraciones aplicadas (ver auditoría). Browser login responsive inspeccionado.

**Checkpoint Angular 22 (2026-11-10):** Angular 22.2.5, CLI/build 22.2.6, Material/CDK 22.2.6, TypeScript 6.0.3. Node runtime `engines.node` pasa a 22.22.3 con autorización del usuario, por ser requisito oficial. Build y suite existente 8/8 aprobados; login responsive comprobado. Aplicación/control flow mantiene NgModule y tema M2; builder Webpack/Karma queda pendiente como siguiente migración independiente.

**Checkpoint application builder (2026-11-10):** migración oficial en Angular CLI 22 reemplazó el build `browser` por `application`. `main`/polyfills y flags se migraron; `outputPath.browser: ""` preserva `dist/cuper-front-end` para `server.js`/Heroku. Development/staging compilan y tests existentes 8/8; staging mantiene warning del budget CSS existente. Builders Karma y dev-server legacy pendientes.

**Checkpoint standalone (2026-11-10):** completados los tres modos oficiales: `convert-to-standalone`, `prune-ng-modules` y `standalone-bootstrap`. Componentes standalone y `bootstrapApplication`; se eliminó `AppModule` y la factoría de traducción quedó en `translate-loader.ts`. Feature/routing NgModules todavía se importan transitoriamente para conservar rutas/proveedores. Eliminado `MaterialModule`. Builds development pasan y tests 8/8 tras cada modo. Zone.js sigue presente; auditoría zoneless pendiente.

**Checkpoint rutas standalone (2026-11-10):** `provideRouter(APP_ROUTES)` reemplaza los routing NgModules; las cuatro áreas con carga lazy ahora exportan arrays de rutas. Retirados todos los NgModules propios; se conservaron URLs, estructura y guards. Build y suite 8/8. Zone.js sigue cargado; falta la auditoría de notificaciones/callbacks y validación funcional autenticada antes de declararse zoneless.

**Puente de compatibilidad zoneless (2026-11-10):** Angular 22 es zoneless por defecto al usar `bootstrapApplication`; el inventario encontró más de 100 emisiones/callbacks que mutan estado. Se agregó `provideZoneChangeDetection()` explícito para conservar el scheduling previo mientras se migran y validan notificaciones. Build y suite 8/8; esto no completa la fase zoneless: la retirada de Zone queda bloqueada por la auditoría/validación documentada.

**Estado de sesión en preparación zoneless (2026-11-10):** se reemplazó el único `Subscriber` mutable de `UserService` por emisiones `Subject`/`startWith` y una API `updateCurrentUserData`, que notifica al `AsyncPipe` también para Pusher/perfil/empresa. Build y suite 8/8; resta resolver notificaciones de otros callbacks y validar con backend.

**Notificaciones de Home (2026-11-10):** se añadieron `ChangeDetectorRef.markForCheck()` tras callbacks Pusher/HTTP y el timer del cambio de empresa. Build y suite 8/8. La compatibilidad Zone-based sigue activa mientras se revisan las pantallas restantes.

**FileReader zoneless prep (2026-11-10):** ambos `FileReader.onload` marcan la vista tras actualizar imagen/emitir archivo. Build y suite 8/8. La validación real de upload aún necesita sesión Rails.

**Bootstrap config (2026-11-10):** providers agrupados en `app.config.ts`; conserva exactamente el router/interceptor HTTP XHR/traducción/animación y el puente Zone explícito. Build y suite 8/8.

**Guards funcionales (2026-11-10):** migradas las cinco guards de auth/admin/partner/cashier/guest a `CanActivateFn` con `inject()`, manteniendo redirects y validación token. Build y suite 8/8. Flujos autenticados siguen bloqueados por la falta de Rails/PostgreSQL.

**Builders `@angular/build` (2026-11-10):** migrados build/serve/extract-i18n/Karma a `@angular/build` 22.2.6. Validación integrada dev + staging + Karma exit 0; suite intacta 8/8. Retirada la integración interna obsoleta de Angular DevKit de `karma.conf.js`; corregido `polyfills` a arreglo. Pendiente resolver 404 de fuentes durante Karma; detalles en `frontend-audit.md`.

**Errores de reset-password zoneless (2026-11-11):** los errores de validación asignados por callback HTTP notifican explícitamente con `markForCheck()`. Build pasa; tests se posponen para mantener Chrome MCP/servidores detenidos por solicitud del usuario.

**Notificaciones de formularios de perfil/empresa/reward (2026-11-11):** se agregaron marcas tras `setErrors()` de backend y tras carga/cambio de estado de profile/company/plans/uploads. Build pasa; Karma y flujos Rails siguen pendientes, sin reactivar servidores ni Chrome MCP.

**Listas async de oficinas/cajeros/promociones (2026-11-11):** las cargas HTTP y actualizaciones tras cerrar diálogos notifican la vista explícitamente. Build pasa; no se ejecutó Karma por mantener servidores/MCP detenidos.

**Smoke test local (2026-11-11/12):** Angular/Rails/PostgreSQL iniciados. Base development vacía migrada con autorización, sin seeds/correos; `validate_token` retorna 401 sin sesión. Build y Karma 8/8. Chrome a 390px sin overflow; las claves de traducción sin resolver continúan. El guard auth ahora retorna `UrlTree('/login')` y corrige la navegación vacía en rutas privadas. Queda pendiente decidir sobre la base `cuperclub-backend_test` vacía que `rails db:create` también creó, y probar roles/endpoints con datos/cuentas aprobados.

**Checkpoint Angular 14 (2026-11-09):** framework 14.3.0, CLI 14.2.13 y Material/CDK 14.2.7. Migraciones oficiales de formularios Untyped y target ES2020 para preservar compatibilidad. Build exit 0, tests existentes 8/8 y navegador desktop/móvil con cuatro roles sin errores de consola. Mapbox por variable de entorno preservado; CommonJS y otras deprecaciones siguen documentados. Próxima iteración: Angular 15, prestando atención a la transición Material/MDC.

**Checkpoint Angular 13 (2026-11-09):** framework 13.4.0, CLI 13.3.11, Material/CDK 13.3.9 y TypeScript 4.6.4. Build exit 0, tests 8/8 en Chrome/Karma y navegador desktop/móvil con cuatro roles, sin errores/warnings de consola. Migraciones oficiales de IE/entryComponents/TestBed aplicadas; contrato Rails intacto. Builder TSLint retirado por CLI; script conserva invocación directa, lint legacy falla y requiere futura migración ESLint. Próxima iteración independiente: Angular 14.

**Checkpoint Angular 12 (2026-11-09):** framework 12.2.17, CLI 12.2.18, Material/CDK 12.2.13, TypeScript 4.3.5 y toolchain Node 14.21.3/npm 6. Build exit 0 y navegador desktop/móvil con cuatro roles sin errores de consola. Los mismos ocho tests pasan en Chrome/Karma; PhantomJS ya no ejecuta los specs de este build. Se mantiene suite y dependencia legacy, con ChromeHeadless por defecto y captura externa opcional para Docker. Migraciones oficiales de tema Sass/Zone/Webpack, contrato Rails intacto. Continúa Angular 13 en un commit independiente.

**Checkpoint Angular 11 (2026-11-09):** framework 11.2.14, CLI 11.2.19 y Material/CDK 11.2.13. Build exit 0, tests existentes 8/8 y navegador desktop/móvil con cuatro roles sin errores de consola. Migraciones oficiales conservan resolución legacy de rutas y cambian specs a waitForAsync; Codelyzer 6 resuelve peers sin forzar. Contrato Rails intacto. Siguiente iteración independiente: Angular 12.

**Checkpoint Angular 10 (2026-11-05):** framework 10.2.5, CLI 10.2.4 y Material/CDK 10.2.7. Migraciones oficiales completadas; build exit 0, tests existentes 8/8 y navegador desktop/móvil con cuatro roles sin errores de consola. Sin cambios del contrato Rails. Continúa Angular 11 en una iteración y commit independientes.

**Checkpoint Angular 9 (2026-11-04/05):** Ivy/AOT habilitados y migraciones oficiales completadas. Build exit 0, tests 8/8, navegador desktop/móvil y cuatro roles sin errores de consola. Se corrigieron tipos incompletos y una emisión de UserService durante render, sin modificar API/auth Rails. Siguiente iteración: Angular 10.

**Checkpoint Angular 8 (2026-11-04):** completado en `e438225`, con build development exit 0, tests existentes 8/8 y navegador desktop/móvil contra Rails (login/logout/recarga y cuatro roles). Se conserva lockfile v1 y toolchain aislado Node 10/npm 6. PhantomJS requiere target ES5 en specs; build diferencial se emite dentro del contenedor para evitar EACCES del bind mount macOS. Continúa Angular 9 como siguiente iteración independiente.

**Objetivo:** atravesar upgrades legacy y preparar standalone/Ivy sin refactor visual masivo.

**Dependencias:** Fase 1 y auth desacoplada.

**Archivos:** lock/package, `angular.json`, tsconfig, todos los módulos y imports Material.

**Pasos:**
- [ ] Un PR por major 7→8→9→10→11→12→13→14→15→16→17 usando CLI oficial.
- [ ] Atender TS/Node y migraciones/compilación del escalón, sin saltar majors.
- [ ] Convertir sintaxis lazy routes y eliminar admin import eager cuando sea seguro.
- [ ] Resolver librerías incompatibles con Ivy antes de continuar; actualizar/sustituir/implementar pieza acotada/eliminar según matriz.
- [x] Material legacy no permite actualizar Material a v17: ejecutar iteración visual MDC independiente antes del siguiente Angular; tema M2/Lato preservado. Resta validar dialogs/forms/tables y roles en browser autenticado cuando Rails DB esté disponible.
- [ ] No confundir migración MDC con rediseño Material 3: preservar tema/identidad visual; decidir M3 por separado si hace falta.
- [ ] Modernizar Sass y los imports `@angular/material` por paquetes conforme al major.
- [ ] Mantener contenido y UX; no reescribir por estilo.

**Riesgos:** Angular Material, View Engine, Sass, CSS encapsulado, módulos dinámicos.

**Validación manual/build:** build tras cada major; navegación cliente/admin/cajero; dialogs, autocomplete, datepicker, tables, uploads y mapa.

**Aceptación:** un build limpio por major y flujos principales revisados; lock reproducible.

**Rails:** contrato inalterado.

**Rollback:** artefacto estático de versión anterior; revertir PR de major independiente.

## Fase 4 — Angular 16→20 y builder moderno

**Objetivo:** alcanzar APIs modernas, application builder y preparación zoneless.

**Dependencias:** Fase 3, dependencias Angular compatibles.

**Archivos:** `angular.json`, TS config, `src/main.ts`, polyfills, mapa, Pusher, styles, servicios.

**Pasos:**
- [ ] Migrar por 16→17→18→19→20 con update guide.
- [ ] Resolver dependencias incompatibles con Angular/Ivy o zoneless. Una biblioteca mantenida consumible desde standalone puede seguir exponiendo NgModules externos; no exigir reescritura interna de terceros.
- [x] Adoptar application builder mediante migración oficial `use-application-builder` (CLI 22); revisar builders dev-server/test de forma independiente.
- [x] Cambiar opciones `main`/polyfills y adaptar output path para conservar el contrato de `server.js`/Heroku. Pendiente revisar imports Sass/CommonJS heredados.
- [ ] Retirar script global Pusher e integrar el SDK por módulo/adaptador mantenido.
- [ ] Desde Angular 17, aplicar `ng generate @angular/core:control-flow` en PR separado y revisar `@if`/`@for`/`@switch`, tracking y templates reutilizados; conservar imports de pipes/directivas que aún hagan falta.
- [ ] Preparar antes del hito zoneless el estado de sesión/empresa activa y callbacks que actualizan vistas; sustituir el Subscriber mutable único donde bloquee esa preparación. El resto de refactors de estado queda en fase 6.
- [ ] No habilitar SSR; no configurar runner de tests.

**Riesgos:** output path, ESM/CommonJS, Mapbox workers, CSS y providers.

**Validación:** build desarrollo/staging/producción; recarga de rutas; mapa y realtime; inspección manual de consola/network.

**Aceptación:** application builder sin SSR, salida estática deployable, CI sin suites.

**Rails:** ninguno.

**Rollback:** builder/config PR separado del cambio de providers; publicar artefacto anterior.

## Fase 5 — Standalone y zoneless

**Objetivo:** arquitectura final sin módulos propios ni Zone runtime.

**Dependencias:** Angular 20.3, build sin errores y flujos críticos notificados correctamente. Primer bootstrap standalone objetivo con `provideZonelessChangeDetection()` explícito; Angular 21/22 usará el comportamiento zoneless por defecto.

**Archivos:** 12 NgModules, 67 componentes; `main.ts`, rutas, polyfills, servicios y componentes dinámicos.

**Pasos:**
- [x] Antes del schematic: Angular >=15.2 (en este plan, Angular 22), build sin errores y cambios guardados. Ejecutados los tres modos oficiales con build/tests entre checkpoints.
- [x] Convertir declarations a standalone con imports explícitos.
- [x] Eliminar módulos propios innecesarios y módulos de routing; URLs lazy quedan como arrays `Routes`.
- [ ] Crear `app.config.ts`, `app.routes.ts`; bootstrap con `bootstrapApplication`.
- [ ] Configurar providers de Router, HttpClient/interceptors, traducción y Material. No introducir providers de animación legacy como destino permanente: deprecados desde 20.2; mantener solo transitoriamente si un consumidor comprobado los exige y registrar su retirada.
- [ ] Registrar interceptors funcionales con `withInterceptors`; si queda un interceptor class-based transitorio, habilitarlo explícitamente mediante `withInterceptorsFromDi()` sin duplicar la cadena ni perder headers auth.
- [ ] Revisar backend HTTP según el escalón: multipart por sí solo no exige XHR; si existe requisito de progreso de subida, Fetch no lo cubre. Elegir la API XHR soportada por esa versión y revisar uploads, errores, CORS y headers manualmente.
- [ ] Convertir guards a funciones e interceptors funcionales.
- [ ] Migrar rutas lazy a `loadComponent`/`loadChildren` dinámico; providers de feature a route.
- [ ] Asegurar que no queden NgModules de aplicación ni import eager de Admin duplicado.
- [ ] Adaptar HTTP, callbacks Pusher, FileReader, timers y cambios programáticos de Reactive Forms a Signals/AsyncPipe/markForCheck.
- [ ] Conectar `valueChanges`/`statusChanges` o estado derivado a una notificación cuando el template dependa de `setValue`, `patchValue`, `FormArray.push` u otras mutaciones programáticas; no asumir que Reactive Forms programa el render por sí solo.
- [ ] Sustituir `ComponentFactoryResolver` legacy por APIs de creación actuales; establecer inputs mediante `ComponentRef.setInput` cuando corresponda.
- [ ] En el mismo hito Angular 20.3: activar zoneless explícito, validar flujos y retirar `zone.js` de dependencia/runtime/polyfills. No posponer su retirada a Angular 21 ni introducir workaround.

**Riesgos:** vistas que no notifican cambio, provider scope, dialog dinámico, callbacks externos.

**Validación manual:** callbacks async sin segundo click; formularios desde respuesta; notificación en vivo; login/logout; actualización de lista, timer y archivo; validar `Zone` ausente en bundle/runtime.

**Aceptación:** 0 NgModules propios, 0 Zone runtime/polyfill, aplicación funcional con zoneless explícito en Angular 20.3. No se exige aún que zoneless sea el default del framework.

**Rails:** ninguno.

**Rollback:** cambio standalone/bootstrap aislado; artefacto de hito previo. No rollback mediante reintroducción silenciosa de Zone en destino.

## Fase 6 — Angular 21/22, estado y dependencias

**Objetivo:** versión final y contratos/tipos coherentes sin rediseñar arquitectura innecesariamente.

**Dependencias:** Fase 5.

**Archivos:** `package.json`, `UserService`, modelos, servicios, guards y formularios.

**Pasos:**
- [ ] Actualizar 20→21→22 con CLI oficial; seleccionar Angular 22 último parche estable al ejecutar.
- [ ] En 21/22 confirmar zoneless por defecto y ausencia de `provideZoneChangeDetection`; no reintroducir Zone al actualizar.
- [ ] Fijar TS 6.0.x, RxJS 7 y Node compatible; eliminar platform-browser-dynamic si no usado.
- [ ] Completar encapsulación Signals readonly y refactors no bloqueantes del estado de sesión preparado en fase 4/5; no dejar para aquí adaptaciones necesarias para zoneless.
- [ ] Modelar negocio activo/roles con `computed`; limpiar estado al logout/cambio de usuario.
- [ ] Mantener RxJS para streams útiles; debounce/cancel de autocomplete; no adoptar NgRx.
- [ ] Corregir tipado DTO usando respuestas Rails observadas, manteniendo snake_case; distinguir fechas JSON de `Date` real.
- [ ] Separar DTO/view model solo para transformaciones con beneficio concreto.
- [ ] Tipar errores y estados loading/empty/error/success sin alterar payload Rails.
- [ ] Incorporar de forma coordinada `Idempotency-Key` opcional a acumulación/canje: una UUID por intención, misma key en cada retry de esa intención, nueva key solo ante nueva intención. Manejar replay/409 y compatibilidad con Rails antiguo sin habilitar reintentos offline automáticos.
- [ ] Respetar puntos/precios enteros en unidades legacy, redondeo backend half-up y costo de canje calculado por Rails. No recalcular contabilidad en cliente ni revertir validaciones de autorización del backend actualizado.
- [ ] Mantener formularios existentes; tipar gradualmente donde ayude; conectar estados programáticos a notificaciones zoneless.

**Riesgos:** interpretación de nullability/envoltorios y permisos derivados.

**Validación manual/build:** roles, usuario sin empresa, empresa múltiple, paginación, errores por campo y cada operación de caja.

**Aceptación:** Angular 22.x; estado predecible; sin NgRx nuevo; tipos reflejan respuestas confirmadas.

**Rails:** no normalizar endpoints. Cualquier propiedad mal nombrada se registra como propuesta.

**Rollback:** separar PRs de actualización de PRs de estado/tipos.

## Fase 7 — Sustitución de bibliotecas e integración UX móvil

**Objetivo:** eliminar dependencias legacy/no compatibles y aprovechar el repositorio mobile sin trasladar su deuda.

**Dependencias:** Fase 3-6 según biblioteca.

**Archivos:** `package.json`, mapa, home, assets de `../cuper-mobile/resources` y `src/assets`, estilos, navegación.

**Pasos:**
- [ ] Matriz por dependencia: uso, Angular peer, zoneless callback, mantenimiento, vulnerabilidad, alternativa.
- [ ] Resolver Mapbox GL 1.7: actualizar si compatible, o piloto MapLibre; preservar mapa, geoloc y marker.
- [ ] Actualizar Pusher y cerrar conexión/listeners; confirmar authorization channel con Rails.
- [ ] Sustituir infinite scroll con IntersectionObserver y fallback accesible si el paquete no aporta ventaja.
- [ ] Eliminar Hammer/core-js/intl/animations legacy solo después de probar consumidores.
- [ ] Reemplazar estilos Ionic por layout web móvil; onboarding si producto lo aprueba; tabs Router accesibles.
- [ ] No trasladar `@ionic/storage`, Cordova SQLite, plugins nativos o pantallas home placeholder.
- [ ] Revisar atribución/licencia de imágenes y fuentes antes de copiar assets.

**Riesgos:** proveedores de tiles/coste, permisos geolocalización, UX nativa distinta, recursos sin licencia.

**Validación manual:** Safari iOS/Chrome Android, resize, teclado, navegación, geolocalización y lectura accesible.

**Aceptación:** experiencia mobile responsive sin Ionic/Cordova y sin pérdida de funciones reales web.

**Rails:** Pusher conserva protocolo; cualquier canal privado requiere backend.

**Rollback:** PR por dependencia/feature; mantener mapa funcional y no eliminar repo mobile.

## Fase 8 — PWA, cache y deploy estático

**Objetivo:** PWA instalable y safe offline shell.

**Dependencias:** build moderno, standalone/zoneless.

**Archivos nuevos previstos:** manifest, iconos, `ngsw-config.json`, app config, config host/CI.

**Pasos:**
- [ ] Usar `ng add @angular/pwa` con versión CLI 22 compatible.
- [ ] Configurar nombre, theme-color, display, scope/start_url, iconos maskable y toque Apple.
- [ ] Cachear assets propios versionados; excluir API/auth/Wallet/private media y respuestas de usuarios.
- [ ] Dejar inicialmente `dataGroups` vacío/omitido para API y limitar `assetGroups` a recursos públicos propios. No usar patrones negativos en `dataGroups.urls` ni `assetGroups.resources.urls`, que no los soportan; no confiar solo en headers HTTP para excluir una URL mal configurada en caché SW.
- [ ] Configurar `navigationUrls` para excluir rutas backend del mismo origen del fallback shell, conservando rutas/callbacks que pertenezcan a la SPA. Revisar por separado fallback del hosting y rutas de API.
- [ ] No implementar cola offline, background sync ni reintento automático para transacciones.
- [ ] Indicador de conexión; aclarar que `navigator.onLine` no prueba que API esté disponible.
- [ ] Confirmar éxito de acumulación/canje solo en respuesta backend.
- [ ] Gestionar actualización con aviso y reload seguro, errores de versión irrecuperable y control de dos pestañas.
- [ ] Ante `VERSION_READY`, ofrecer recarga controlada fuera de una transacción; no usar `activateUpdate()` sin reload como estrategia habitual porque puede mezclar shell/chunks de distintas versiones.
- [ ] Configurar HTTPS, fallback SPA, compresión, headers de caché y despliegue atómico en hosting estático.
- [ ] Validar output path y retirar Express/Heroku solo cuando se confirme hosting final.

**Riesgos:** SW antiguo, caché privada cruzada, chunks de versión y callback de auth.

**Validación manual:** instalar, shell offline, API caída, logout/login otro usuario, cambio negocio, actualización N→N+1 y rollback.

**Aceptación:** instalable, funciona online; offline no promete operaciones; datos privados no están en cache storage; HTTPS.

**Rails:** API privada no cacheada; compatibilidad backend mientras coexistan versiones.

**Rollback:** conservar artefacto y procedimiento de SW; despliegues versionados; no creer que retirar el registro borra automáticamente workers existentes.

## Fase 9 — Seguridad y estabilización

**Objetivo:** cierre operativo sin cambiar unilateralmente el protocolo.

**Dependencias:** fases 2-8.

**Archivos:** auth facade, guards/interceptor, Pusher, environments, hosting y CI.

**Pasos:**
- [ ] Escaneo de dependencias sobre lock final; revisar reachability y separar dev/build/runtime.
- [ ] Confirmar URLs HTTPS, CSP report-only, external fonts/map workers/OAuth antes de enforcement.
- [ ] Interceptor verifica origen API exacto y no adjunta headers a terceros.
- [ ] Distinguir 401 de 403; guards solo UX y Rails autoriza.
- [ ] Revisión manual de tokens, postMessage OAuth, expiración, logout, URLs sensibles y datos de cache.
- [ ] Confirmar canal Pusher autorizado y carga útil no sensible.
- [ ] Budget de bundle basado en medición; lazy map/admin; monitoreo sin datos personales.
- [ ] Ensayar rollback de build y revisión de escenarios de convivencia con Rails.

**Riesgos:** CSP rompe OAuth/Mapbox; auditoría de dependencias confunde advisory no alcanzable con bloqueante.

**Validación manual:** login/expiración, 401/403, logout, rol directo, cambio de empresa, offline y flujos críticos completos.

**Aceptación:** sin bloqueante conocido no aceptado; excepciones registradas; rollback ensayado.

**Rails:** confirmar autorización, CORS, sesión, Pusher, caché y despliegues coordinados.

**Rollback:** artefacto y cabeceras previas documentados; no relajar permanentemente seguridad para ocultar fallos.

## Fase 10 — Wallet (futuro, opcional al lanzamiento PWA)

**Objetivo:** UX integrada sin dependencia obligatoria de endpoints nuevos.

**Dependencias:** contrato explícito Rails y modelo de puntos/tarjeta por negocio.

**Archivos previstos:** feature Wallet, servicio, tipos de DTO y vista tarjeta.

**Pasos:**
- [ ] Confirmar si saldo es global o por negocio; los modelos actuales solo prueban `User.points`.
- [ ] Definir identidad de negocio y tarjeta; QR como identificador, nunca autorización suficiente.
- [ ] Proponer endpoints de consulta, Apple pass y Google save URL a Rails; no asumir que existen.
- [ ] Backend emite/firma/actualiza; frontend no contiene credenciales ni firma.
- [ ] Añadir botones según dispositivo/capacidad, estado loading/error y respuesta backend confirmada.
- [ ] Desactivar/degradar con 404/501/feature flag; no bloquear resto de app.
- [ ] Asegurar `no-store` y no registrar enlaces temporales.

**Riesgos:** endpoints no disponibles, OAuth/headers incompatibles con descarga directa, enlaces expuestos.

**Validación manual:** endpoint ausente, error emisión, móvil admitido/no admitido, expiración URL.

**Aceptación:** producto sigue operando aunque Wallet esté apagado.

**Rails:** propietario de OpenAPI definitivo y emisión/signing.

**Rollback:** feature flag deshabilita el módulo sin revertir funciones existentes.

## Orden de PRs sugerido

1. Documentación aprobada.
2. Baseline/CI sin suites, limpieza de tests obsoletos.
3. Contrato y adaptador auth compatible con Rails.
4. Angular majors hasta 15 + Material.
5. Angular 16-20 + application builder.
6. Standalone/zoneless bootstrap.
7. Angular 21-22 y Signals/DTOs.
8. Sustitución de dependencias una por PR.
9. UX móvil aprobada.
10. PWA y hosting estático.
11. Seguridad y estabilización.
12. Wallet futuro, independiente.

## Riesgos aceptados/decisiones pendientes

- Sin tests automatizados habrá defectos no detectados antes de deploy; solo build y revisión manual.
- Acordar gestor de paquetes y pipeline antes de primer cambio de toolchain.
- Confirmar URLs production/OAuth/hosting; environment production actual incompleto.
- Confirmar con Rails contratos, Pusher privado, contexto multiempresa y reglas de transacción.
- Confirmar con producto qué UX/assets del mobile se rescatan.
- Decidir Mapbox vs MapLibre después de revisar tiles/licencia/operación.

## Fuentes de revisión Context7

Consultadas el 2026-11-03 y reconfirmadas parcialmente el 2026-11-04; las referencias versionadas no deben confundirse con documentación de otro escalón:

- [Standalone: requisitos y modos](https://angular.dev/reference/migrations/standalone)
- [Zoneless y formularios](https://angular.dev/guide/zoneless)
- [Control flow migration](https://angular.dev/reference/migrations/control-flow)
- [Application builder migration](https://angular.dev/tools/cli/build-system-migration)
- [Guía histórica MDC](https://github.com/angular/components/blob/17.3.10/guides/v15-mdc-migration.md)
- [Deprecación de providers de animaciones](https://angular.dev/api/platform-browser/animations/provideAnimations)
- [HTTP: interceptors](https://angular.dev/guide/http/interceptors) y [backend/configuración](https://angular.dev/guide/http/setup)
- [SW: configuración](https://angular.dev/ecosystem/service-workers/config) y [actualizaciones](https://angular.dev/ecosystem/service-workers/communications)
