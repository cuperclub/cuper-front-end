# Auditoría frontend Cuper

## Iteración 21 — Rutas standalone y retiro de NgModules propios (2026-11-10)

Se reemplazó `AppRoutingModule` por `APP_ROUTES`/`provideRouter`; las rutas lazy de admin, company, customer y employee ahora cargan arrays `Routes` standalone. Se eliminaron los NgModules propios de app/features/components y módulos de routing. Los paths, jerarquía y guards se copiaron sin cambios; el HTTP client XHR y `AuthInterceptor` quedan registrados una vez en el bootstrap. Los módulos de librerías externas necesarios (traducción y animaciones) siguen importados solo para providers.

- Build application/development: exit 0, `/tmp/routes-standalone-dist`.
- Tests existentes: 8/8 en Chrome/Karma, `test_exit=0`.
- `grep` confirma cero `@NgModule` propios en `src/app`; no se tocaron guards, URLs ni contrato Rails.
- La revisión autenticada de roles y rutas continúa bloqueada por Rails/PostgreSQL no disponible.
- Próximo: revisar alcance/proveedores standalone y auditar notificaciones por HTTP/forms/Pusher/FileReader/timers. No retirar Zone.js hasta validar esas interacciones; el runtime sigue cargado.

## Auditoría zoneless — hallazgo y puente temporal (2026-11-10)

Angular 22 aplica scheduling zoneless por defecto al bootstrap standalone; mantener `zone.js` en polyfills no equivale a habilitar detección por Zone. El inventario encuentra más de 100 suscripciones/callbacks en componentes y servicios, incluyendo respuestas HTTP/Translate que mutan campos, un `UserService` con `Subscriber` mutable, Reactive Forms con setters programáticos, callbacks Pusher en `HomeComponent`, dos `FileReader.onload` y un timer. Para preservar el comportamiento Zone-based heredado mientras se migran y validan notificaciones, se añadió `provideZoneChangeDetection()` explícito en el bootstrap. Build exit 0 y suite existente 8/8 con el puente activo. No es el destino final: no retirar Zone ni habilitar zoneless hasta cubrir cada flujo con validación manual autorizada.

Como primer ajuste de estado, `UserService` sustituye el `Subscriber` mutable único por `Subject` y `startWith` para conservar el primer valor inmediato; `updateCurrentUserData` centraliza la mutación/emisión y actualiza los cinco puntos de uso (perfil, empresa, alta de empresa y notificación Pusher). Esto permite que `AsyncPipe` notifique el render al actualizar el usuario, pero no resuelve los demás callbacks/fields del inventario. Build exit 0 y suite 8/8.

Siguiente ajuste acotado: `HomeComponent` marca para revisión tras respuestas asíncronas de notificaciones, callback Pusher, cambio de empresa y vencimiento del timer. Build exit 0 y suite 8/8. Aún requieren atención las suscripciones/callbacks de las demás pantallas y las mutaciones programáticas de formularios.

Se añadió también `markForCheck()` en ambos callbacks `FileReader.onload` (avatar y preview de reward), después de actualizar el archivo/emitirlo. Build exit 0 y suite 8/8. La comprobación de uploads reales depende de los flujos autenticados pendientes.

## Iteración 20 — Declaraciones y poda de NgModules (2026-11-10)

Se aplicó el primer modo del schematic oficial `@angular/core:standalone` (`convert-to-standalone`) sobre Angular 22.2.5. Los componentes, directivas y pipes declarados en los módulos pasan a ser standalone (standalone es el default en Angular 22); los módulos conservan temporalmente esas clases en `imports`, manteniendo su API y composición hasta las fases `prune-ng-modules` y `standalone-bootstrap`. `AppComponent` se conserva explícitamente `standalone: false` para seguir siendo bootstrappeado por `AppModule` durante este checkpoint.

- Dry-run y conversión aplicados; build application/development exit 0 en `/tmp/standalone-convert-dist`; los tests de conversión pasaron 8/8.
- Después, dry-run y migración oficial `prune-ng-modules`: quitó el módulo de solo re-export de Material y sacó referencias redundantes a módulos de imports standalone; preservó los feature NgModules/rutas lazy que aún tienen función. Build tras pruning exit 0 en `/tmp/standalone-prune-dist`.
- Tests posteriores al prune: 8/8 en Chrome Headless/Karma, `test_exit=0`; no se añadieron ni retiraron suites.
- Se aplicó en checkpoint separado `standalone-bootstrap`: `main.ts` usa `bootstrapApplication`, `AppComponent` es standalone e importa `RouterOutlet`; CLI generó `importProvidersFrom(...)` para mantener provisionalmente routers/features NgModule, HTTP/interceptor, Material, forms y traducción. Build application/development exit 0 en `/tmp/standalone-bootstrap-dist`.
- Se retiró el `AppModule` residual generado por la transición y se movió su factory de traducción a `src/app/translate-loader.ts`; build tras la limpieza exit 0 en `/tmp/standalone-bootstrap-clean-dist`.
- Tests posteriores al bootstrap: 8/8 en Chrome/Karma externo, `test_exit=0`; no se modificó la suite. Zone.js sigue instalado; no se modifica en esta subfase. Rails/API intactos.
- Tras validar tests: revisar providers duplicados/transitorios y deshacer módulos de routing por fases; zoneless requiere auditoría y pruebas de notificaciones/callbacks antes de retirar Zone.

## Iteración 19 — Application builder en Angular 22 (2026-11-10)

Se ejecutó la migración oficial `ng update @angular/cli --name use-application-builder` en CLI 22.2.6. El builder de build pasó de Webpack `browser` a `application`; `main` pasó a `browser`, `polyfills` a arreglo y se retiraron `vendorChunk`/`buildOptimizer` que no aplican. Se añadió `esModuleInterop` al tsconfig.

La salida del builder application separa browser en `browser/` por defecto. Se configuró `outputPath.browser: ""` para conservar `dist/cuper-front-end`, requerido por `server.js` y el comando Heroku, sin cambiar rutas de despliegue en esta fase.

- Build development y staging: exit 0. `index.html` se genera en la ruta raíz de cada `outputPath`; staging conserva aviso de budget warning para `home.component.scss` (6.61 kB frente a 6 kB).
- Tests existentes: 8/8 en Chrome/Karma externo, `test_exit=0`; no se modificó la suite.
- No se modificó UI ni lógica de app y, por la petición explícita de apagar servidores, no se inició servidor web ni se repitió Playwright en esta subfase.
- Quedan los targets de dev-server, Karma y Protractor con builders legacy, y `@angular-devkit/build-angular` aún aparece deprecado. Migrar los builders de serve/test y revisar posible movimiento a `@angular/build` requiere su propia iteración; no se cambió el runner de tests.
- Producción no ejecutada: `environment.prod.ts` solo declara `production` y no contiene `apiBase`; no inventar valores de API. Rails/backend intacto.

## Iteración 18 — Angular 22 y Node 22 (2026-11-10)

Actualización a framework 22.2.5, CLI/build 22.2.6, Material/CDK 22.2.6, TypeScript 6.0.3, Node destino 22.22.3, RxJS 6.6.7 y Zone.js 0.16.3. `ngx-infinite-scroll` pasa a 22.0.0. El cambio de runtime/`engines.node` fue autorizado antes de esta fase; Angular 22 ya no admite Node 20. La instalación npm se resolvió sin `--force` ni `--legacy-peer-deps`.

Migraciones oficiales CLI/core/Material. CLI añadió `istanbul-lib-instrument` como peer necesario para Karma. Core añadió `ChangeDetectionStrategy.Eager` a 67 componentes para conservar el change detection previo a v22, añade `withXhr()` a los providers migrados para preservar el backend HTTP anterior, actualizó cuatro expresiones opcionales con `$safeNavigationMigration()` y fijó `strictTemplates: false` (no estaba habilitado previamente). El compilador v22 eliminó `ComponentFactoryResolver`; `CellTableComponent` usa ahora `ViewContainerRef.createComponent(this.type)`, preservando la creación dinámica.

TypeScript 6 generó errores porque el proyecto heredado no explicitaba `strict: false`; se fijó ese valor explícitamente para mantener el nivel de comprobación previo, sin iniciar una migración de tipos ajena al salto. `downlevelIteration` (redundante con target ES2022) se quitó y `ignoreDeprecations: "6.0"` permite mantener `baseUrl`, aún usado por imports `src/...`, frente a una opción que TS6 marca para retirada futura. Se quitó `extendedDiagnostics` en tsconfigs de app/spec porque Angular exige `strictTemplates` activo al configurar esos diagnósticos.

- Build development en Node 22.22.3: exit 0, `/tmp/ng22-dist3`.
- Suite existente: 8/8 en Chrome/Karma externo, `test_exit=0`; sin suites añadidas ni eliminadas.
- Playwright MCP: login sin errores JS de carga a 1280×800 y 390×844, Lato preservado, inputs visibles y sin overflow horizontal.
- El builder Webpack y Karma builder anuncian deprecación; migración a application/esbuild y Vitest era opcional y queda fuera de esta fase. Persisten avisos Sass, Mapbox CommonJS y browserslist.
- Producción, lint, harness e2e, OAuth/correos y mapa con token real pendientes. Rails/PostgreSQL no está disponible para completar autenticación, roles y endpoints; no se modificó backend ni datos.

## Iteración 17 — Angular 21 (2026-11-10)

Framework 21.2.25, CLI/build 21.2.29, Material/CDK 21.2.14, TypeScript 5.9.3, Node 20.19.6, RxJS 6.6.7 y Zone.js 0.16.3 (Angular 21 admite `~0.15.0 || ~0.16.0`). `ngx-infinite-scroll` 21.0.0. Instalación limpia y peers resueltos.

Se ejecutaron migraciones oficiales CLI/core/Material. CLI elevó `lib` a ES2022; core migró bootstrap options y control flow en 34 templates a bloques `@if/@for/@switch` como parte de la migración no opcional, aunque se había planificado evaluar control flow por separado. Se conserva NgModule; no se ejecutó la migración opcional al application builder ni `Router.currentNavigation`. Un error del build por importar interfaces desde barrel como valores se corrigió con `import type` en `user.service.ts`. No se cambió autenticación/API Rails ni el tema Material 2/MDC/Lato.

- Build development: exit 0, `/tmp/ng21-dist2`. Siguen avisos Sass (`@import`/división), Mapbox CommonJS y Browserslist.
- Suite existente: 8/8 en Chrome/Karma externo, `test_exit=0`; no se añadió ni quitó suite.
- Playwright MCP: login visible a 1280×800 y 390×844, Lato preservado y sin overflow horizontal. Autenticación/endpoints requieren DB Rails que sigue inaccesible.
- Production/OAuth/correos, token Mapbox, lint y harness e2e permanecen pendientes.

## Iteración 16 — Angular 20 (2026-11-10)

Framework 20.3.18, CLI/build 20.3.17, Material/CDK 20.2.14, TypeScript 5.8.3, Node 20.19.6, RxJS 6.6.7 y Zone.js 0.15.1. `ngx-infinite-scroll` sube a 20.0.0. Instalación limpia y peers resueltos sin opciones de fuerza.

Se aplicaron migraciones oficiales CLI/core/Material: defaults de generación explícitos en `angular.json`, `moduleResolution: bundler`, y sustitución de `TestBed.get` por `TestBed.inject`. Control flow, router signal y application builder son migraciones opcionales y se dejaron para fases independientes. No se cambiaron autenticación, API Rails, tema MDC/Material 2 ni Lato.

- Build development: exit 0, `/tmp/ng20-dist`. Siguen avisos Sass (`@import`/división), Mapbox CommonJS y Browserslist; Angular 20 avisa además que algunas entradas Browserslist existentes están fuera de soporte.
- Suite existente: 8/8 en Chrome/Karma externo, `test_exit=0`; no se modificó la cantidad de suites.
- Playwright MCP: login visible en desktop 1280×800 y móvil 390×844, Lato y sin overflow horizontal. Pruebas autenticadas continúan bloqueadas por la base PostgreSQL de Rails inaccesible.
- Production/OAuth/correos, token Mapbox, lint y harness e2e siguen pendientes. Próximo: Angular 21.

## Iteración 15 — Angular 19 (2026-11-10)

Framework 19.2.15, CLI/build 19.2.17, Material/CDK 19.2.19, TypeScript 5.8.3, Node 20.19.6, RxJS 6.6.7 y Zone.js 0.15.1. Angular 19 requiere Zone.js `~0.15.0`; se actualizó desde 0.14.10. `ngx-infinite-scroll` sube a 19.0.0 por peer Angular 19. Instalación npm limpia, sin `--force`/`--legacy-peer-deps`.

Migraciones oficiales CLI/core/Material ejecutadas. Core migró los componentes no standalone a `standalone: false` explícito, acorde al nuevo default; Material ajustó el setup global a `elevation-classes` y `app-background`, preservando Material 2, paletas CUPer y tipografía Lato. Migración opcional al application builder e initializer no aplicada. No se alteraron autenticación, interceptor ni contrato Rails.

- Build development: exit 0, `/tmp/ng19-dist`. Permanecen advertencias preexistentes Sass `@import` y Mapbox CommonJS.
- Suite existente: 8/8 en Chrome/Karma externo, `test_exit=0`; cantidad de suites sin cambios.
- Playwright MCP: login visible en desktop 1280×800 y móvil 390×844; Lato conservado y sin overflow horizontal. API autenticada pendiente por PostgreSQL Rails no disponible, igual que en iteraciones anteriores.
- Production/OAuth/correos, mapa con token real, lint y harness e2e pendientes.

## Iteración 14 — Angular 18 (2026-11-10)

Framework 18.2.14, CLI/build 18.2.21, Material/CDK 18.2.14 y TypeScript 5.5.4. Node 20.19.6 cumple `^20.11.1`, TypeScript cumple `>=5.4 <5.6`; se conserva Zone.js 0.14.10 y RxJS 6.6.7. `ngx-infinite-scroll` sube a 18.0.0 por su peer Angular 18. `@ngx-translate` se mantiene.

Se ejecutaron migraciones oficiales CLI/core/Material: core reemplazó usos de `HttpClientModule` por `provideHttpClient(withInterceptorsFromDi())`; se corrigió la referencia residual a `HttpClientModule` en AppModule que dejó el schematic. No se cambió la lógica del interceptor ni contrato de autenticación Rails. Material ajustó las funciones de tema a `m2-*`, preservando el tema Material 2 existente, paletas y Lato. La migración opcional application builder, control flow y zoneless no se aplicaron.

- Instalación npm limpia y árbol de peers válido sin flags de fuerza; lockfile v3.
- Build development: exit 0, `/tmp/ng18-dist-final`. Advertencias conservadas Sass division y Mapbox CommonJS; browserslist ignora ES5.
- Suite existente: 8/8 en Chrome/Karma externo, `test_exit=0`; sin cambios de cantidad de suites.
- Playwright MCP: login cargó sin errores JS en desktop 1200×800 y móvil 390×844; inputs presentes/visibles, Lato y sin overflow horizontal. Flujos de login autenticado, roles y endpoints no verificables: PostgreSQL (5432) no está disponible; API Rails no puede conectar a DB y la integración se ejecutó en 4201 porque 4200 pertenece a otro workspace. No se modificó backend ni datos/seeds.
- Production/OAuth/correos, mapa con token real, lint y harness e2e siguen pendientes. Siguiente: Angular 19.

## Iteración 13 — MDC / Angular Material 17 sobre Angular 17 (2026-11-10)

Se migró Material 16.2.14→17.3.10 y CDK 16.2.14→17.3.10 sin cambiar Angular (17.3.12), Node 20.19.6 ni TypeScript 5.4.5. Se usó el schematic oficial `ng generate @angular/material:mdc-migration --components all --defaults`, seguido por migración oficial `ng update @angular/material --migrate-only --from=16.2.14 --to=17.3.10`. Pasaron imports runtime y de tests, atributos de templates, selectores SCSS detectables y tema global a MDC. El tema continúa Material 2 con paletas CUPer y tipografía Lato; no se aplicó Material 3 ni rediseño. Cinco comentarios TODO sobre `mat-dialog-actions` se retiraron tras verificar que son reglas sobre el selector público del elemento, no clases internas MDC. Sin TODO MDC pendiente.

- Build development: exit 0, `/tmp/mdc-ng17-dist-final`. Se quitaron advertencias por mixins de tema/densidad duplicados que el schematic inicial había dejado en la hoja global. Permanecen advertencias Sass division, autoprefixer y Mapbox CommonJS.
- Suite existente: 8/8 en Chrome/Karma externo, `test_exit=0`; no se agregaron ni eliminaron tests. La primera ejecución headless dentro de Docker no encontró Chrome; se repitió mediante el mecanismo externo habitual y pasó.
- Playwright MCP: login carga en desktop 1280×800 y móvil 390×844, Lato preservado y sin overflow horizontal en esta pantalla. No fue posible validar dialogs/flujos autenticados: PostgreSQL no está disponible; Rails responde error de conexión a DB y el puerto 4200 está ocupado por otra app, por lo que se usó 4201 y Rails development (CORS predeterminado solo permite 4200) bloqueó autenticación. No se tocaron Rails ni datos/seeds. Pendiente repetir revisión visual de dialogs/tablas/roles cuando haya base y puerto de integración disponibles.
- Próximo: Angular 18, ya con Material/CDK 17 compatibles; abordar builder/zoneless/control flow únicamente si procede, en subpasos verificables.

## Iteración 12 — Angular 17 (2026-11-10)

Framework 17.3.12, CLI/build 17.3.17 y TypeScript 5.4.5. Angular 17 no admite oficialmente Node 22; esta fase fija Node 20.19.6/npm 10.8.2, dentro del rango `^20.9.0`, con lockfile v3. RxJS 6.6.7 queda dentro del rango soportado. Zone.js pasa a 0.14.10. `ngx-infinite-scroll` pasa a 17.0.0 por su peer `<18`; `@ngx-translate/core` 15.0.0 y loader 8.0.0 se conservan.

Se ejecutaron migraciones oficiales CLI/core desde 16.2.16/16.2.12: reemplazo de `browserTarget` por `buildTarget` en `angular.json`; no se requirieron cambios de código de core. No se aplicaron las migraciones opcionales de application builder ni control flow. La migración oficial Material 17 reportó que no puede ejecutarse mientras el proyecto use componentes legacy, eliminados del paquete v17. Se mantiene Material/CDK 16.2.14, cuyos peers admiten Angular 17 y que aún compila; así se evita forzar el schematic o cambiar estilos sin validación visual. Deuda: Material legacy queda sin fixes/mejoras; migrar MDC y validar apariencia accesible en una iteración visual explícita.

- Instalación npm limpia sin `--force`/`--legacy-peer-deps`; lockfile v3.
- Build development: exit 0, `/tmp/ng17-dist`. Avisos heredados Sass division, autoprefixer `align-items: end`, Mapbox CommonJS y Browserslist sin ES5.
- Tests existentes: 8/8 en Chrome/Karma, `test_exit=0`; no se añadieron ni eliminaron suites.
- Playwright MCP abrió la pantalla de login con el servidor Angular 17 sin errores al cargar. Validación integral de login/roles/endpoints bloqueada: el puerto 4200 está ocupado por un servidor de otro workspace, y Rails no pudo conectar a PostgreSQL (5432 rechazó conexión); por ello las peticiones de autenticación fallaron. No se tocaron datos/seeds ni archivos/backend Rails. Repetir browser end-to-end al disponer de DB y puerto autorizado.
- Lint legacy y production siguen pendientes; `npm install` informa dependencias obsoletas/vulnerabilidades heredadas, sin ejecutar auditorías correctivas automáticas.

## Iteración 11 — Angular 16 (2026-11-09)

Framework 16.2.12, CLI/build 16.2.16, Material/CDK 16.2.14 y TypeScript 5.1.6. Toolchain Node 22.23.2/npm 10.9.8 (Angular 16 admite Node >=18.10) y lockfile v3. npm detectó que el reporter de Karma requiere Jasmine >=3.8 (estaba fijado 3.6); se actualizan Jasmine 4.6, types 4.3.6 y karma-jasmine 5.1, sin `--force`/`--legacy-peer-deps`. Zone.js 0.13.3. RxJS 6.6.7 se conserva.

Se actualizan `@ngx-translate/core` a 15.0.0 y `@ngx-translate/http-loader` a 8.0.0 (compatibles con Angular >=16), además de `ngx-infinite-scroll` a 16.0.0 (peer Angular 16). Se mantiene el API NgModule actual, sin adelantar standalone/proveedores nuevos. La instalación limpia npm 10 y el build Ivy/AOT terminan sin ngcc/View Engine. Migraciones oficiales CLI/core eliminan resoluciones/interfases deprecated de guards, preservando lógica de autorización; Material 16 no requiere cambios y mantiene imports legacy.

- Build development: exit 0, salida `/tmp/ng16-dist`; no se ejecuta ngcc. Avisos conservados: Browserslist `kaios 2.5`/`op_mini all` sin ES5, Sass division legacy del Loader, autoprefixer `align-items: end` y Mapbox CommonJS.
- Suite existente: 8/8 en Chrome/Karma, `test_exit=0`. No se añadieron ni borraron specs. Se mantiene configuración de captura externa de Docker.
- Playwright MCP: desktop 1280×800, login/logout, recarga validate_token 200 y cinco claves eliminadas. Cajero: entradas/salidas 200; partner: empresa 202, oficinas/empleados 201 y solicitudes 200; admin empresas 201. Cliente redirigido desde admin. Sin errores de consola de aplicación. A 390×844 el dashboard mantiene desbordamiento horizontal preexistente por anchos fijos; no modificado en upgrade framework.
- Production/OAuth/correos, mapa con token real, lint legacy y harness e2e siguen pendientes. API Rails y datos no se modificaron. Próximo: Angular 17; abordar legacy Material y migraciones asociadas de forma separada y explícita.

## Iteración 10 — Angular 15 (2026-11-09)

Framework 15.2.10, CLI/build 15.2.11, Material/CDK 15.2.9 y TypeScript 4.9.5 mediante migraciones oficiales. Se conservan RxJS 6.6.7, Zone.js 0.11.8, Node 14.21.3/npm 6 y lockfile v1. CLI retiró `require.context` de `src/test.ts` (el builder descubre specs), subió el target a ES2022 con `useDefineForClassFields: false`, eliminó `relativeLinkResolution` y migró `RouterLinkWithHref`. No se tocó autenticación, contrato Rails ni lógica de negocio.

La primera ejecución del schematic de Material terminó con código 137 (proceso terminado por memoria) después de instalar las versiones. Se repitió con `--migrate-only --from=14.2.7 --to=15.2.9`, CI y más heap, y completó 39 archivos. La migración optó por la capa legacy (`MatLegacy*`, `mat.legacy-core`, `all-legacy-component-typographies`, `all-legacy-component-themes`) para preservar la apariencia; no se adoptó MDC todavía. Se ajustó `define-light-theme` a la forma de mapa (`color`/`typography`/`density`) para eliminar la advertencia de tema sin cambiar los componentes.

- Build development Ivy/AOT: exit 0, salida `/tmp/ng15-dist`. Persisten advertencias de división Sass en Loader, `flex-end` de autoprefixer y Mapbox CommonJS; la advertencia de tema Material quedó resuelta. El CLI ignora `kaios 2.5`/`op_mini all` porque ya no emite ES5.
- Suite existente 8/8 en Chrome capturado por Karma, `test_exit=0`. No se añaden ni eliminan tests. Con Angular 15 el proceso `ng test` permaneció vivo tras detener Karma hasta cerrar el navegador externo de Playwright; la suite ya había terminado y el código de salida fue 0, sin fallo de spec.
- Playwright MCP 1280×800: sesión heredada, login/logout, recarga validate_token 200 y limpieza de las cinco claves. Cajero: transacciones entrada/salida 200; partner: empresas 202, sucursales/empleados 201 y solicitudes 200; admin: empresas 201. Cliente redirigido fuera de admin. Se abrió el diálogo legacy de sucursal y se renderizaron tabla, tabs, paginador y formularios. Consola sin errores de aplicación; el diálogo con mapa registra el error esperado de Mapbox por no configurar token, y el dashboard móvil conserva el desbordamiento horizontal de su layout de anchos fijos preexistente.
- Production/OAuth/correos, mapas con token real, lint legacy y harness e2e siguen pendientes. Backend y seeds sin cambios. Angular/Rails se apagan al concluir. Siguiente salto: Angular 16, que retira ngcc; actualizar/sustituir `@ngx-translate/*` y `ngx-infinite-scroll`, y planificar el abandono de Material legacy antes de Angular 17.

## Iteración 9 — Angular 14 (2026-11-09)

Framework 14.3.0, CLI/build 14.2.13 y Material/CDK 14.2.7. Se conservan TypeScript 4.6.4, RxJS 6.6.7, Zone.js 0.11.8, Node 14.21.3/npm 6 y lockfile v1. El CLI anterior no pudo ejecutar el primer schematic (`tree.readText`); reejecutar migraciones CLI/core con CLI 14 instalado, `--migrate-only` desde las versiones 13 anteriores, las completó sin parches de dependencias ni peers forzados.

Cambios oficiales: formularios existentes migrados a `UntypedFormBuilder`/`UntypedFormGroup`/`UntypedFormControl` para preservar comportamiento, target ES2020 en app y specs, retirada de defaultProject y rangos Angular con prefijo `^`. No se inicia standalone ni se cambian reglas de negocio/API Rails. Mapbox continúa usando la variable de entorno y archivo generado ignorado.

- Build development Ivy/AOT: exit 0, salida `/tmp/ng14-dist`. Advertencias: divisiones Sass legacy del Loader, bibliotecas View Engine procesadas por ngcc y Mapbox CommonJS (optimization bailout); no se ocultan.
- Suite existente 8/8 en Chrome capturado por Karma, `test_exit=0`, usando el mecanismo de Angular 12. No se añaden ni eliminan tests. Se elimina el target ES5 transitorio mediante la migración oficial.
- Playwright MCP: 1280×800 y 390×844; sesión heredada, login por botón, logout limpia las cinco claves y recarga validate_token 200. Cajero: transacciones entrada/salida 200; partner: empresas 202, sucursales/empleados 201 y solicitudes 200; admin: empresas 201. Cliente redirigido fuera de admin. Cero errores de consola; warning del dev server por Mapbox CommonJS.
- Production/OAuth/correos, mapas con token real, lint legacy y harness e2e siguen pendientes. Backend y seeds sin cambios. Angular/Rails se apagan al concluir. Siguiente salto: Angular 16; planificar MDC antes de retirar compatibilidad legacy de Material.

## Iteración 8 — Angular 13 (2026-11-09)

Framework 13.4.0, CLI/build 13.3.11, Material/CDK 13.3.9 y TypeScript 4.6.4 mediante migraciones oficiales. Se conservan Node 14.21.3/npm 6, RxJS 6.6.7, Zone.js 0.11.8 y lockfile v1. CLI 12 instaló las versiones pero no pudo resolver `././schematics/migrations.json` de core; reejecutar `ng update @angular/core --migrate-only --from=12.2.17 --to=13.4.0` con el CLI 13 instalado completó las migraciones, sin parchear dependencias ni forzar peers.

Cambios oficiales: retirada de polyfills exclusivos de IE, `entryComponents` innecesarios y targets del builder TSLint eliminado; imports Sass Material sin `~`; TestBed conserva teardown legacy explícito. Se añadió `.angular/cache` al gitignore (el schematic no encontró el gitignore en la copia aislada). No se cambió autenticación ni contrato Rails.

- Build development Ivy/AOT: exit 0, `/tmp/ng13-dist`. Ya no produce bundles diferenciales ES5. Sass advierte divisiones legacy del Loader; ngcc advierte bibliotecas View Engine (`ngx-translate`/infinite-scroll) que deberán actualizarse antes de Angular 16.
- Tests existentes: 8/8 en Chrome capturado externamente por Karma, `test_exit=0`. Se mantiene el mecanismo documentado en Angular 12 y no se añaden/eliminan specs. Desconexión de captura al cerrar Karma después de completar los tests, sin fallo de salida.
- Playwright MCP: 1280×800 y 390×844. Sesión heredada válida, recarga validate_token 200, logout limpia cinco claves, login por botón correcto. Cajero: transacciones entrada/salida 200; partner: empresas 202, sucursales/empleados 201 y solicitudes 200; admin: empresas 201. Cliente redirigido fuera de admin. Cero errores y warnings de consola de aplicación.
- Lint adicional: `npm run lint` invoca TSLint directamente para no depender del builder retirado; exit 2 por infracciones legacy y excepción de la regla `deprecation` con TypeScript 4.6. No se deshabilitaron reglas ni se hizo un reformateo masivo. Migración a ESLint pendiente, no considerar lint aprobado. Harness e2e conservado, no ejecutado.
- Production/OAuth/correos siguen pendientes. Backend y seeds sin cambios; Angular/Rails se apagan al concluir. Se solicita push de los commits independientes de Angular 11/12/13. Siguiente salto: Angular 14.

## Iteración 7 — Angular 12 (2026-11-09)

Framework 12.2.17, CLI/build 12.2.18, Material/CDK 12.2.13, TypeScript 4.3.5 y Zone.js 0.11.8. Toolchain aislado actualizado a Node 14.21.3/npm 6; `engines.node` refleja ese escalón transitorio (no es el runtime destino). Lockfile v1 conservado. Migraciones oficiales: Webpack 5, defaults de build explícitos preservando development, imports públicos Zone, retirada de emitDecoratorMetadata y tema Material con API Sass namespaced. Se conserva AOT por defecto del builder, sin cambiar auth/API Rails.

- Build development con bundles ES2015/ES5: exit 0, salida `/tmp/ng12-dist` dentro del contenedor. Persisten tres warnings SCSS; Dart Sass también advierte divisiones `/` legacy en Loader (pendientes, sin modificar apariencia).
- PhantomJS se intentó y dejó de ejecutar la suite con este build: primero falló su OpenSSL legacy en Bullseye; con configuración SSL aislada inició pero ejecutó 0 tests (no se aceptó ese resultado). Se conserva su dependencia temporalmente, pero Karma usa ChromeHeadless por defecto. No se añadieron ni eliminaron specs.
- Los mismos ocho tests pasaron conectando Chrome de Playwright MCP a Karma, sin dependencia Playwright en el proyecto. Repetición final: 8/8 y `test_exit=0`; Karma registra desconexión del navegador externo al cerrar el servidor, después de completar los tests, no un fallo de spec. Para el contenedor sin Chrome instalado: publicar 127.0.0.1:9876, establecer `KARMA_EXTERNAL_BROWSER=true`, ejecutar `npm test -- --watch=false --progress=false` y conectar el navegador a `http://127.0.0.1:9876/`. Sin esa variable se usa ChromeHeadless instalado localmente, configurable con CHROME_BIN. No se desactiva el sandbox. Una imagen de pruebas con Chromium no pudo instalarse por 404 de paquetes Debian; se usó captura externa en lugar de alterar el sistema/repositorios del proyecto.
- Playwright MCP contra Rails: desktop 1280×800 y móvil 390×844; sesión heredada, logout limpia las cinco claves, login por botón y recarga con validate_token 200. Cajero: transacciones entrada/salida 200; partner: empresas 202, sucursales/empleados 201 y solicitudes 200; admin: empresas 201. Cliente redirigido fuera de admin. Cero errores de consola de la aplicación; warnings del dev server por SCSS existentes.
- Backend y seeds sin cambios; production/OAuth/correos/harness e2e siguen pendientes. Angular/Rails se apagan al finalizar. Siguiente salto: Angular 13.

## Iteración 6 — Angular 11 (2026-11-09)

Framework 11.2.14, CLI/build 11.2.19 y Material/CDK 11.2.13 mediante migraciones oficiales. TypeScript 4.0.8, RxJS 6.6.7 y Zone.js 0.10.3 permanecen compatibles; Node 10.16/npm 6 y lockfile v1 conservados. Se actualizó Codelyzer a 6.0.2 antes del salto para resolver sus peers sin `--force`. El schematic actualizó Jasmine/Karma, renombró `async` a `waitForAsync` en los ocho specs activos, fijó `relativeLinkResolution: 'legacy'` para preservar rutas y retiró `extractCss` deprecado. No se modificó el contrato Rails ni la lógica de autenticación.

- Build development Ivy/AOT con bundles diferenciales: exit 0, salida `/tmp/ng11-dist` dentro del contenedor; tres warnings SCSS preexistentes.
- Tests existentes: 8/8, exit 0, en dos ejecuciones. La primera reintentó PhantomJS tras timeout de captura. No se añadieron ni eliminaron pruebas.
- Playwright MCP: escritorio 1280×800 y móvil 390×844; sesión heredada válida, recarga con validate_token 200, logout limpia las cinco claves y login por botón correcto. Cajero: transacciones entrada/salida 200; partner: empresas 202, sucursales/empleados 201 y solicitudes 200; admin: empresas 201. Cliente redirigido fuera de admin. Cero errores de consola; warnings del dev server por los tres SCSS existentes.
- Rails sigue en `feat/backend-modernization`; backend y seeds sin cambios. Production/OAuth/correos y harness e2e legacy siguen pendientes. Los servidores Angular/Rails se detienen al concluir las pruebas. Siguiente salto: Angular 12.

## Iteración 5 — Angular 10 (2026-11-05)

Framework 10.2.5, CLI/build 10.2.4, Material/CDK 10.2.7 y TypeScript 4.0.8 mediante migraciones oficiales, conservando Ivy/AOT, Node 10.16/npm 6 y lockfile v1. CLI renombró browserslist a `.browserslistrc`, actualizó helpers tslib y herramientas de tests/TSLint, y cambió module a es2020. No hubo cambios de lógica de aplicación ni de contrato Rails.

La primera migración se detuvo porque `tslint.json` tenía una coma final no aceptada por el lector AST del schematic. Se eliminó esa coma y se ejecutaron explícitamente las migraciones CLI/core desde las versiones 9.1 anteriores; después se actualizaron Material/CDK. Se conserva el harness e2e legacy, no ejecutado; los schematics advierten que buscan `e2e/tsconfig.json`, mientras el proyecto conserva `e2e/tsconfig.e2e.json`.

- Build development con bundles diferenciales ES2015/ES5: exit 0, salida `/tmp/ng10-dist` dentro del contenedor. Tres warnings SCSS preexistentes, sin errores.
- Tests existentes: 8/8, exit 0. La primera ejecución concurrente esperó el lock ngcc y PhantomJS reintentó tras timeout de captura; una segunda ejecución aislada pasó sin ese timeout. No se añadieron ni eliminaron specs.
- Playwright MCP en 1280×800 y 390×844: sesión heredada válida, recarga con validate_token 200, logout limpia las cinco claves y login por botón correcto. Cajero: transacciones entrada/salida 200; partner: empresas 202, sucursales/empleados 201, solicitudes 200; admin: empresas 201. Cliente redirigido fuera de admin. Cero errores de consola; warnings solo del dev server por los tres SCSS existentes.
- Production, OAuth y flujos de correo siguen pendientes por los límites documentados. Backend y seeds sin cambios. Siguiente salto: Angular 11.

## Iteración 4 — Angular 9 (2026-11-04/05)

Framework 9.1.13, CLI/build 9.1.15, Material/CDK 9.2.4, TypeScript 3.8.3, Zone.js 0.10.3. Migraciones oficiales de core/CLI/Material ejecutadas en copia aislada con Node 10/npm 6; lockfile v1 conservado. CLI 8 intentaba descargar el CLI vigente incompatible con Node 10: se instaló explícitamente CLI/build 9 y se ejecutaron sus migraciones `--migrate-only --from=8.3.29 --to=9.1.15`, antes de actualizar Material. No se forzaron peers incompatibles.

Ivy y AOT habilitados. Se completaron tipos usados por plantillas (User, Category, OptionPlan y filas de tabla), preservando incluso el campo legacy `permisions`. El schematic retiró HammerJS sin consumidores. El navegador detectó una emisión durante render: `getCurrentUserData()` notificaba al observable en cada lectura, incluidas las de plantillas. Ahora la lectura es pura y el observable entrega su valor inicial al suscribirse; las emisiones explícitas de edición/cambio de empresa permanecen.

- Build development final (Ivy/AOT, salida dentro de contenedor): exit 0; solo tres warnings SCSS existentes.
- Tests existentes finales en PhantomJS: 8/8, exit 0. No se añadieron ni eliminaron pruebas.
- Playwright MCP después de la corrección: cero errores y warnings de consola. Sesión heredada y recarga válidas, logout limpia las cinco claves, login por botón válido, escritorio y 390×844. Cajero: ambos endpoints de transacciones 200; partner: empresas 202, sucursales/empleados 201 y solicitudes 200; admin accede a empresas (201), cliente redirigido fuera de admin. Las respuestas se esperaron antes de cambiar de rol para distinguir cancelaciones por navegación de errores API.
- Production/OAuth/correos siguen pendientes por los límites anteriores. Backend y seeds sin cambios. Próximo salto: Angular 10.

## Iteración 3 — Angular 8 (2026-11-04)

Completada en `e438225`: framework 8.2.14, CLI 8.3.29, Material/CDK 8.2.3, TypeScript 3.5.3 y RxJS 6.6.7. Migraciones oficiales: lazy loading con imports dinámicos, imports secundarios de Material, `ViewChild.static`, browserslist en raíz y configuración TypeScript/TSLint. Lockfile v1 conservado con npm 6/Node 10.

- Build development final: exit 0, incluyendo bundles diferenciales ES2015/ES5. Salida dentro del contenedor (`/tmp/ng8-dist`) para evitar EACCES al copiar bundles ES5 de caché al bind mount macOS.
- Tests existentes: 8/8, exit 0. Se conserva PhantomJS temporalmente con target ES5 solo para specs; TableCard y PlaceholderCard importan únicamente los módulos Material necesarios, evitando timeouts sin retirar pruebas.
- Playwright MCP contra Rails: sesión heredada, logout/login y recarga válidos; desktop 1280×800 y móvil 390×844. Cajero accede a transacciones (ambos endpoints 200), partner a empresa (202/201 existentes), admin a empresas y cliente rechazado por AdminGuard. Cero errores de consola; warnings del dev server por SCSS existentes.
- Servidor recreado y caché temporal de node_modules eliminada tras actualizar dependencias; no se modificó código para solventar la caché. Reiniciar el navegador resolvió inicialmente el canal de puntero; se volvió a usar requestSubmit al reproducirse el fallo de automatización.

Production, OAuth y flujos de correo siguen pendientes por los límites ya documentados. Próximo salto: Angular 9, en un commit separado y con build/tests/navegador.

## Iteración 2 — adaptador de autenticación propio (2026-11-04)

Se sustituyó `angular-token@7.0.1` por una fachada `AuthService` + `AuthInterceptor` construida sobre `HttpClient`, preservando el contrato observado: mismos paths (`auth/sign_in`, `auth/sign_out`, `auth/validate_token`, `auth`, `auth/password`), mismos cinco headers (`access-token`, `client`, `expiry`, `token-type`, `uid`), mismas claves de `localStorage` y las mismas URLs de OAuth (`auth/facebook`, `auth/google_oauth2`, callback `origin/oauth_callback`, ventana nueva con postMessage). No se cambió almacenamiento, backend, contrato ni configuración de entornos.

Consumidores migrados: `UserService`, guards `AuthGuard`/`AdminGuard`/`CashierGuard`/`PartnerGuard`/`IsntSignedInGuard`, `LoginComponent`, `RegisterComponent`, `HomeComponent`, `AdministrationComponent` y `UpdatePasswordFormComponent`. `package.json` y `package-lock.json` dejaron de declarar `angular-token` (9 líneas eliminadas) usando npm 6 en el toolchain Node 10; no se regeneró el lock con npm moderno.

Validación de esta iteración:
- Build development en toolchain aislado: exit 0, antes y después de retirar la dependencia.
- Suite existente: 8/8, exit 0, antes y después de retirar la dependencia.
- Navegador (Playwright MCP, desktop 1280 y móvil 390×844) contra Rails `feat/backend-modernization`: sesión previa creada por `angular-token` siguió válida tras el cambio (compatibilidad de almacenamiento); logout limpió sesión y volvió a `/login`; login nuevo contra `POST /auth/sign_in` 200; recarga de `/home/dashboard` ejecutó `GET /auth/validate_token` 200 y mantuvo sesión. Consola sin errores.

Límites: OAuth social no se probó, y la app no define ruta `oauth_callback` (ausencia preexistente; el adaptador conserva esa URL para no alterar el flujo). Recuperación/reset de contraseña y cambio de contraseña no se ejercitaron en navegador en esta iteración. Production sigue bloqueado por `environment.prod.ts` incompleto. La base test continúa sin crear y RSpec no se ejecutó.

Validación adicional por rol contra cuentas del seed: cajero (`/home/transactions` con `GET /api/transaction_inputs` y `/api/transaction_outputs` 200), partner (`/home/company/home` con endpoints de partner; se observaron 202/201 en GET, comportamiento del backend ya documentado) y admin (login redirige a `/admin/companies` y `AdminGuard` lo permite). Un cliente autenticado que abre `/admin/companies` es redirigido a `/home/dashboard`, confirmando el camino negativo del guard. Consola sin errores en estos recorridos. En la sesión de automatización, tras navegar a caja el canal de puntero del navegador dejó de entregar eventos; el envío del formulario se realizó con `form.requestSubmit()` y las peticiones/handlers de Angular respondieron normal. No se interpreta como defecto de la aplicación y no se cambió código por ello.

Nota: `LoginComponent` sigue dependiendo de `data.is_admin` de la respuesta de Rails para elegir `/admin/companies`; no se alteró esa regla de negocio.

## Estado local vigente tras seed autorizado (2026-11-04)

El usuario autorizó expresamente ejecutar el seed porque la base local estaba vacía. Se confirmó que la base development no existía, se creó **solo** `cuperclub-backend_development` en 127.0.0.1:5432 y se cargó el schema de `feat/backend-modernization` (`7a3b9db`). Después se ejecutó el seed original mediante `Rails.application.load_seed` dentro de una transacción, con guardas de entorno/host/base y validación de resultados. Correos desactivados solo en el proceso de seed. No se crearon ni modificaron otras bases.

Resultado: 4 usuarios activos (cliente/partner/cajero/admin), 2 empresas, 5 categorías, 3 membresías aprobadas, 1 sucursal, 1 promoción, 1 plan y 1 configuración de aplicación. Las cuatro contraseñas del seed se verificaron sin imprimir tokens. No se modificaron modelos, seed, schema ni configuración del backend.

Rails development está levantado en 127.0.0.1:3000 con Ruby 3.4.12/Bundler 2.6.9. Comprobación HTTP sin sesión: `/auth/validate_token` devuelve 401. Playwright MCP contra frontend Angular 7 en localhost:4200: login cliente devuelve 200, abre `/home/dashboard`; al recargar esa ruta, `/auth/validate_token` devuelve 200 y se conserva la sesión. Consola sin errores/warnings en ese recorrido. Esto demuestra solo login y persistencia básica cliente, no validación de todos los roles, OAuth, caja o Pusher.

El cliente del seed tiene saldo 0; no se cambiaron reglas ni saldos para simular operaciones. Los 10 puntos configurados al final del seed no se aplican retrospectivamente a usuarios creados antes de esa configuración. No se realizaron acumulaciones/canjes ni envío de correos.

Comprobaciones repetidas en esta iteración: build development correcto (exit 0) y suite frontend existente 8/8 correcta (exit 0), en la copia Node 10 aislada con el spec ajustado. Logs locales `seed-integration-build.log` y `seed-integration-tests.log` en el directorio temporal de baseline. No se repitió production: su fallo de configuración sigue pendiente y no se presenta como aprobado.

Las secciones de preparación y bloqueos siguientes conservan evidencia histórica; el estado vigente de development/arranque es el de esta sección. Production frontend continúa con configuración incompleta y la base test aún no se creó.

**Base backend actualizada (2026-11-04):** por indicación del usuario se seleccionó `feat/backend-modernization` de `../cuper-backend` (commit inspeccionado `7a3b9db`), con Ruby 3.4.12/Rails 8.0.5.1/Bundler 2.6.9. Las referencias y bloqueos Ruby 2.5/Rails 5.2 de esta auditoría son historia de `master`, no la base vigente. Ruby 3.4.12 fue instalado/seleccionado con RVM; bundle y boot verificados, sin crear datos. Consultar la sección vigente de `api-contract.md` para cambios de contrato/seguridad.

La rama nueva usa `credentials.dig` para correo en development y configura secret_key_base desde su configuración de secrets. Por tanto la ausencia de master.key observada en master no basta para declarar bloqueado el arranque de esta rama; comprobar el runtime real sin inventar credenciales ni modificar secretos.

Comprobación PostgreSQL posterior: consulta de solo lectura mediante libpq/psql en 127.0.0.1:5432 con el usuario local configurado. Servidor PostgreSQL 18.4 (Postgres.app); no existen `cuperclub-backend_development` ni `cuperclub-backend_test` en ese servidor. No se crearon bases ni se cargaron schemas, migraciones o seeds. Confirmar destino y autorización de preparación de datos antes de validar login/caja. El seed sigue siendo destructivo también en la rama modernizada y no se ejecutó.

### Runtime backend instalado y utilizado

- `rvm install ruby-3.4.12 --autolibs=disable` usando OpenSSL 3/libyaml/readline ya presentes en Homebrew; sin actualizar Homebrew ni cambiar Ruby global. `rvm use ruby-3.4.12` aplicado a comandos del backend; default global continúa en 3.0.0.
- `ruby --version`: Ruby 3.4.12 nativo arm64; `bundle --version`: 2.6.9.
- Bundle instalado con `BUNDLE_FROZEN=true`, sin modificar Gemfile/lock, en gemset RVM de ese Ruby. Bundler avisó sobre plataformas nativas Darwin y recomendó normalizarlas; no se ejecutó actualización/normalización del lock backend.
- `BUNDLE_FROZEN=true bundle _2.6.9_ check`: correcto.
- Comprobación de sintaxis mediante compilación sin ejecución de 76 archivos Ruby: 0 errores.
- `RAILS_ENV=development DISABLE_BOOTSNAP=1 bundle _2.6.9_ exec rails runner ...`: boot correcto, reporta Rails 8.0.5.1/Ruby 3.4.12. La ausencia de master.key no bloqueó este arranque.
- Backend permanece limpio en `feat/backend-modernization`; no se ejecutaron setup, migraciones, seed, correos ni RSpec (requiere una BD de pruebas aislada). Boot correcto no equivale a disponibilidad de API/auth con BD.

**Fecha:** 2026-10-30
**Alcance inicial:** `cuper-front-end` y el repositorio hermano `../cuper-mobile`. La auditoría inicial fue estática. En la ampliación del 2026-11-04 se ejecutaron instalación/build/tests en una copia temporal y revisión de navegador, y se contrastó parcialmente código Rails en modo lectura. No se modificó código de aplicación ni backend. Los contratos siguen siendo provisionales.

**Revisión documental:** 2026-11-04. Contraste con documentación oficial mediante Context7: corregidos hitos zoneless, notificaciones de formularios, requisitos standalone y configuración de SW en el plan. Los parches npm indicados son los observados el 2026-10-30, no una comprobación renovada del último parche vigente.

## Preparación del baseline (2026-11-04)

La sesión dispone de Node 20.19.5 y npm 10.8.2; el proyecto legacy declara Node 10.16.0. No existe `node_modules`. No se intentó instalar ni compilar con un runtime incompatible. El script disponible es `npm run build` (`ng build`); production y staging requieren los perfiles de `angular.json`, y production presenta el bloqueo de configuración documentado abajo.

Existe el directorio hermano `../cuper-backend`, pero no se comprobó su estado operativo, contrato o disponibilidad HTTP. Están pendientes URL Rails local/staging, dominios y callbacks autorizados, cuentas de revisión por rol y selección de UX/assets mobile. El baseline funcional sigue pendiente: este registro es preparación, no aceptación de funcionamiento.

## Resumen ejecutivo

- `cuper-front-end` es una SPA Angular 7.1.4 con Angular Material 7, RxJS 6.3.3, TypeScript 3.1.6 y Zone.js 0.8.29. Su toolchain declara Node 10.16.0. Fuentes: `package.json`, `package-lock.json`, `angular.json`, `.circleci/config.yml`.
- La aplicación web implementa acceso, administración, negocios, sucursales, promociones/recompensas, caja, historial, notificaciones y mapas. No hay evidencia de Ionic, Capacitor, Wallet o PWA en este repositorio. Fuentes: `src/app/app-routing.module.ts`, `src/app/services/`, `src/app/pages/`, `src/app/components/`.
- `../cuper-mobile` es otro proyecto: Angular 7.2.13, Ionic 4.2.0, Cordova y Zone.js. Sus páginas de inicio están prácticamente vacías y su login solo registra en consola y navega; no constituye una implementación móvil autenticada equivalente. Fuentes: `../cuper-mobile/package.json`, `../cuper-mobile/config.xml`, `../cuper-mobile/src/app/login/login.page.ts:17-20`, `../cuper-mobile/src/app/pages/*/home/home.page.html`.
- El destino acordado es modernizar la SPA web y recuperar selectivamente UX/assets de móvil. No trasladar Ionic/Cordova ni mantener dos aplicaciones como destino del producto.
- El bloqueo principal para actualizar Angular es `angular-token@7.0.1`, abandonado y con peer dependencies limitadas a Angular 7. Es responsable de persistencia, headers, login y OAuth.
- El usuario decidió expresamente **no mantener ninguna suite de tests**: retirar PhantomJS, Protractor, Karma/Jasmine y sus configuraciones. La validación será build, tipos/lint si se conserva y revisión manual; esto aumenta el riesgo de regresión y debe reconocerse como riesgo aceptado.
- El objetivo vigente consultado en fuentes oficiales/registro npm es Angular **22.2.4**, CLI y builder **22.2.5**, TypeScript **6.0.x** (registro: 6.0.3; Angular exige `>=6.0 <6.1`), RxJS 6.5.3 o 7.4+ y Node `^22.22.3 || ^24.15.0 || ^26.0.0`. Node 24 LTS compatible es la opción operativa preferida. Angular 22 es zoneless por defecto.

La revisión Context7 confirma que zoneless ya puede activarse explícitamente en Angular 20, sin esperar a 21 para retirar Zone; la compatibilidad real debe comprobarse en los consumidores de estado, formularios y SDKs. No se infiere compatibilidad solo de las peer dependencies.

## Ejecución del baseline (2026-11-04)

**Actualización que prevalece sobre la preparación anterior:** el usuario pidió build, tests y navegador en cada iteración. Se conservan tests existentes hasta aclarar la política definitiva; no se creó suite nueva ni se ejecutó la eliminación prevista. Playwright se utilizó como MCP, no como dependencia de proyecto.

### Entorno aislado

- Copia de `src`, `e2e`, manifests/lock y configs en directorio temporal autorizado de OpenCode (`cuper-baseline-*`), sin `.git`, datos backend ni secretos adicionales.
- Imagen Docker `node:10.16.0`, plataforma `linux/amd64` bajo emulación en host arm64; no se instaló Node legacy en el host. Imagen fijada por digest observado `sha256:523f767f8907f002316d3334bdb9d1154c7c6f6157c7aed3de5305726a963616`.
- `npm ci --ignore-scripts` instaló 1237 paquetes. Los primeros intentos fallaron por binarios postinstall ausentes: no se consideran defectos funcionales del código.
- Después se ejecutó `npm rebuild node-sass phantomjs-prebuilt` solo en la copia temporal, restaurando ambos binarios y permitiendo repetir build/tests con dependencias nativas disponibles.
- No se modificaron package.json/lockfile/código originales. Node 10, node-sass y PhantomJS son únicamente herramientas de reproducción legacy, no opciones de arquitectura destino.

### Resultados

| Comprobación | Resultado | Alcance / evidencia |
|---|---|---|
| PostgreSQL `127.0.0.1:5432` | TCP disponible | No verifica autenticación, existencia de BD ni esquema |
| Rails `localhost:3000/auth/validate_token` | Conexión rechazada | No hay API operativa en ese puerto en la comprobación |
| Backend `bundle check` | Falló: Ruby 3.0.0 disponible, Gemfile exige 2.5.0 | No se instalaron gems ni migraron datos; debe preparar runtime/servidor el responsable Rails |
| `npm run build -- --progress=false` | **Correcto**, tras restaurar binarios | Build development/JIT legacy, no equivale a build production |
| `npm run build -- --configuration=staging` | **Correcto** | Solo compilación de perfil staging; no se validó API remota ni se navegó ese artefacto |
| `npm run build -- --configuration=production` | **Falló** | TS2339 por ausencia de apiBase/pusher_key/pusher_cluster/mapboxAuth en environment production; warning de DI de PusherService |
| `npm test -- --watch=false --progress=false` | **7 correctos / 1 fallido, reproducido en dos ejecuciones** | Ocho specs activos en PhantomJS 2.1.1; `BillingCardComponent should create` falla por timeout Jasmine también sin builds simultáneos. Causa raíz pendiente; no aumentar timeout ni ocultar fallo sin diagnóstico |
| Navegador desktop/móvil 390×844 | **Parcial** | Login, registro y recuperación renderizan; ruta `/home/dashboard` sin sesión redirige a login; registro presenta claves `register.*` sin traducir y recuperación `recover_password.*` |
| Autenticación/caja/realtime | **Bloqueados** | API Rails no levantada, sin cuentas de revisión confirmadas. Network/console muestran fallo de conexión a auth; no se acredita integración funcional |

Servidor frontend de baseline: contenedor temporal `cuper-baseline-web`, expuesto solo en `127.0.0.1:4200`; no es deploy de producción. Capturas/snapshots MCP bajo `.playwright-mcp/` son evidencia local generada, no código ni suite. No se enviaron intencionalmente transacciones ni correos de recuperación. No se contactó el backend remoto de staging.

### Hallazgos del contraste Rails

Ver `api-contract.md`: multiplicación del importe por puntos por dólar confirmada en código; envoltorios JSON de listas confirmados parcialmente; ParamsWrapper JSON habilitado; invitación por email comentada/no expuesta y POST de empleados no declarado en rutas del checkout. No cambiar estos contratos unilateralmente. El baseline sigue sin ser una aprobación funcional completa.

## Iteración 1 — Aislamiento del test de facturación (2026-11-04)

Cambio acotado a `src/app/components/billing-card/billing-card.component.spec.ts`: reemplazar el agregador Material por `MatCardModule`/`MatDividerModule`, configurar `TranslateModule.forRoot()` en el módulo raíz del test y cargar traducciones deterministas. Mantener template/component reales y agregar assertions sobre título/fallback. No modificar componente productivo, timeouts, versiones, lockfile ni deshabilitar specs.

El primer intento con la configuración aislada dio 8/8 correctos frente a los dos timeouts previos del baseline. La verificación final con assertions de render también dio **8/8**. Esto comprueba que el timeout deja de reproducirse con el fixture reducido; no prueba una causa interna única de PhantomJS/JIT.

| Verificación final de iteración 1 | Resultado |
|---|---|
| Build development | Correcto, exit 0 |
| Build staging | Correcto, exit 0 |
| Build production | Fallo preexistente, exit 1: TS2339 por environment production incompleto; warning DI Pusher |
| Suite existente | 8/8 correctos, exit 0; no tests omitidos ni aumento de timeout |
| Navegador MCP | Login desktop/móvil renderiza; consola sin errores/warnings al cargar; sin validación privada Rails |
| Diff whitespace / backend | `git diff --check` correcto; backend sin cambios |

Logs de esta ejecución en el directorio temporal `cuper-baseline-liiinuo9`: `iteration-1-{development,staging,production,tests}.log` y `iteration-1-results.json`. Son evidencia local, no fixtures de API ni suites nuevas. La aceptación del ajuste del spec no convierte production o integración Rails en aprobados.

Navegador MCP: login desktop vuelve a renderizar sin errores/warnings de consola y sin petición fallida de API al cargar esa ruta. Persisten claves de traducción faltantes preexistentes; no se afirma validación de facturación privada sin sesión/backend.

### Requisitos pendientes para Rails local

- Runtime Ruby 2.5.0 y Bundler 2.0.2 fijados por Gemfile/lock; no cambiar versiones del backend para acomodar la sesión frontend.
- No existe `config/master.key` y no hay `RAILS_MASTER_KEY` definido en esta sesión. Development lee `Rails.application.credentials[...][:gmail_user/gmail_pass]` en `config/environments/development.rb:55-63`; el equipo Rails debe proveer su configuración autorizada sin compartir secretos en el chat/repositorio.
- Confirmar conexión/BD/esquema/cuentas autorizadas y levantar API en el puerto acordado. No ejecutar migraciones, seeds, reset ni operaciones de caja como solución automática.
- Production frontend sigue necesitando URL/API y configuración pública aprobadas; no copiar staging a producción ni inventar endpoints para obtener un build verde.

## Estado y arquitectura observados

| Área | Hallazgo | Evidencia |
|---|---|---|
| Build | CLI 7, Webpack `browser`, salida `dist/cuper-front-end` | `angular.json:16-35` |
| Bootstrap | `platformBrowserDynamic().bootstrapModule(AppModule)` | `src/main.ts:1-12` |
| Módulos web | 12 `@NgModule`; 67 `@Component`; 20 `@Injectable`; sin Signals, directivas o pipes propios detectados | `src/app/**/*.ts` |
| Rutas | guards class-based; lazy loading string antiguo; admin importado eager y también declarado lazy | `src/app/app-routing.module.ts:36-56`, `src/app/app.module.ts:15,50` |
| HTTP | servicios `HttpClient` con URLs construidas desde environment; interceptor auth provisto por angular-token | `src/app/services/`, `src/app/app.module.ts:64-72` |
| Forms | formularios template-driven y reactive; muchas respuestas mutan estado directamente | `src/app/pages/`, `src/app/components/` |
| Estado | estado de usuario centralizado mediante `Subscriber` mutable único | `src/app/services/user/user.service.ts:21-38` |
| Realtime | Pusher instanciado por constructor y canal; no se observa teardown | `src/app/pages/home/home.component.ts:37-49`, `src/app/services/pusher/pusher.service.ts` |
| Polyfills | core-js 2, reflect, intl y Zone runtime | `src/polyfills.ts:48-88` |
| PWA | no se encontró manifest, ngsw config ni Angular service worker | `src/`, `angular.json`, `package.json` |
| Node/CI | `engines.node` y CircleCI fijados a 10.16; CI usa `yarn install`, sin `yarn.lock` observado | `package.json:4-6`, `.circleci/config.yml:7-34` |
| Deploy | Express sirve archivos estáticos con fallback SPA; Heroku Procfile | `server.js`, `Procfile`, `package.json:14-15` |
| Config | `environment.prod.ts` tiene solo `production`; desarrollo usa API localhost; staging apunta a Heroku | `src/environments/*.ts` |

## Funcionalidad real del frontend web

| Flujo | Evidencia y observaciones |
|---|---|
| Login/registro/social OAuth | `src/app/pages/login/`, `register/`; angular-token |
| Recuperación/cambio de password y perfil | `src/app/pages/recover-password/`, `reset-password/`, `src/app/components/profile-form/`, `update-password-form/` |
| Roles cliente/partner/cajero/admin | `src/app/guards/`, `src/app/pages/admin/`, `pages/employee/`, `pages/company/` |
| Negocio, plan, oficinas | `src/app/pages/company-register/`, `src/app/components/company-card/`, `card-office/`, `map/` |
| Promociones y recompensas | `src/app/pages/company/rewards/`, `reward/`, `src/app/components/new-reward-card/` |
| Acumulación/canje | `src/app/pages/employee/transactions/`, `src/app/components/input-transaction-form/`, `output-transaction-form/` |
| Búsqueda e historial | `src/app/components/user-search/`, `user-transactions/`, `src/app/components/card-points/` |
| Admin | empresas, clientes, categorías, planes y settings en `src/app/pages/admin/` |
| Notificaciones | HTTP, infinite-scroll y canal Pusher en `src/app/pages/home/home.component.ts` |
| Wallet/QR | No implementados en el frontend web. El tab `wallet` de móvil apunta a páginas home vacías; no es Wallet real. |

## Riesgos y hallazgos

### Críticos/altos

1. **Dependencias y framework obsoletos.** Angular 7, Node 10, TS 3.1, RxJS 6.3 y builder Webpack antiguo. El lockfile contiene dependencias transitivas con avisos de seguridad. Consulta bulk de npm sobre versiones fijadas: avisos para 99 nombres de paquetes; no implica 99 hallazgos explotables ni reemplaza análisis de alcance. Ejemplos observados: Angular 7, Express 4.17.1, node-sass 4.10.0, lodash 4.17.15, minimist, handlebars y tar transitivos. Fuentes: `package.json`, `package-lock.json`; advisories GHSA.
2. **Autenticación.** `angular-token@7.0.1` está declarado no soportado, con peers Angular 7. Su código publicado usa localStorage, headers `access-token/client/expiry/token-type/uid` y OAuth popup/postMessage. Sustituir el adaptador sin cambiar unilateralmente Rails. Fuentes: `src/app/app.module.ts:64-72`, `src/app/services/user/user.service.ts`, `src/app/guards/`, `src/app/pages/login/`; bundle publicado de angular-token 7.0.1 inspeccionado.
3. **Producción/configuración.** El environment prod carece de `apiBase`, claves y configuración requerida. `recoverMyPassword` tiene redirect localhost; staging define `success_state` HTTP. Validar reemplazos y callbacks antes de desplegar. Fuentes: `src/environments/environment.prod.ts`, `src/environments/environment.staging.ts`, `src/app/services/user/user.service.ts:130-135`, `angular.json:37-68`.
4. **Contrato Rails débilmente tipado.** Servicios anuncian listas donde consumidores acceden a envoltorios como `promotions`, `users`, `meta`, `transaction_inputs` y `notifications`. DTOs tienen propiedades incompletas y fechas declaradas `Date` aunque JSON no instancia fechas. Fuentes: `src/app/services/`, `src/app/models/`, `src/app/pages/company/rewards/rewards.component.ts`, `src/app/pages/home/home.component.ts`.
5. **Semántica transaccional.** La caja envía el costo de compra como `points`; canje envía `promotion_id` y `points_required`. No cambiar nombres ni significado sin confirmación Rails. Fuentes: `src/app/components/input-transaction-form/input-transaction-form.component.ts:25-35`, `output-transaction-form.component.ts:36-47`.
6. **Zona/estado.** Zone está cargado runtime y testing; HTTP, timers, FileReader, Pusher y actualizaciones programáticas de formularios mutan estado. Revisar para zoneless. Fuentes: `src/polyfills.ts:85`, `src/test.ts:3`, `src/app/pages/home/home.component.ts`, `src/app/components/avatar-file/avatar-file.component.ts`, formularios.
7. **Contexto multiempresa.** `PUT /api/users/current_view` cambia el contexto en el servidor; concurrencia/pestañas y aislamiento no son evidentes. Fuente: `src/app/services/user/user.service.ts:50-63`.
8. **Pusher.** Canal predecible `usernotifications.{id}`, no se verifica aquí autorización del canal privado ni limpieza de conexión. Confirmar autorización/sensibilidad con Rails. Fuente: `src/app/pages/home/home.component.ts:37-49`, `src/app/services/pusher/pusher.service.ts`.

### Otros riesgos

- Angular Material 7: imports antiguos, Sass legacy, `::ng-deep`, tablas, diálogos y componentes dinámicos. Fuentes: `src/app/material.module.ts`, `src/styles/styles.scss`, `src/app/components/table/cell-table/cell-table.component.ts`.
- Mapbox GL 1.7, CSS remoto 1.0.0 y `mapbox://` real: revisar compatibilidad, workers, CSP, licencias y costes antes de sustituir. Fuente: `src/app/components/map/map.component.ts`, `src/index.html`.
- `ngx-infinite-scroll` es reemplazable por `IntersectionObserver`; Pusher debe mantenerse si sigue siendo requisito de producto.
- El mobile no tiene contratos API observados: búsqueda en `../cuper-mobile/src/app` encontró solo tab wallet, sin servicios REST. No inferir que sus pantallas placeholders usan Rails.
- El login mobile imprime el objeto de usuario en consola y no autentica; no promoverlo a producción tal cual. Fuente: `../cuper-mobile/src/app/login/login.page.ts:17-20`.
- No se observó uso propio de `bypassSecurityTrust*` ni `[innerHTML]` en la búsqueda efectuada; esto no es una certificación XSS.

## Auditoría mobile/Ionic

Versiones lock: Angular 7.2.13, Ionic Angular 4.2.0, Ionic Storage 2.2.0, Ionic Native 5.4.0, RxJS 6.3.3, Zone 0.8.29, Cordova SQLite Storage 3.2.0, Ionic toolkit 1.4.1. Fuente: `../cuper-mobile/package.json`, `../cuper-mobile/package-lock.json`.

Usos comprobados: `ion-app`, `ion-router-outlet`, `ion-content`, `ion-input`, `ion-button`, `ion-slides`, tabs; Platform, splash screen y status bar; Storage para `onboardingComplete`; SQLite declarado como plugin, pero sin uso de aplicación encontrado. Fuentes: `../cuper-mobile/src/app/app.module.ts`, `app.component.ts`, `login/login.page.html`, `shared/onboarding/`, `shared/tabs/`, `guards/onboarding.guard.ts`, `../cuper-mobile/config.xml`.

El destino PWA puede reemplazar los componentes visuales con Angular/CSS y APIs del navegador. No se justifica Ionic/Capacitor nativo: la dirección de producto es PWA-first y las capacidades nativas encontradas (splash/status bar/SQLite) no sostienen una funcionalidad de negocio demostrada. Recuperar onboarding, iconografía e ideas de tabs solo tras revisión funcional. No borrar/archivar mobile en esta migración sin decisión explícita del propietario.

## Herramientas de tests: decisión explícita

El frontend web contiene 83 specs; 75 están comentados y solo 8 contienen código activo, principalmente tests de creación. Tiene Karma con PhantomJS y un E2E Protractor generado por CLI. Fuentes: `src/app/**/*.spec.ts`, `src/karma.conf.js:4-31`, `src/test.ts`, `e2e/`, `angular.json`.

**Decisión del producto:** no necesitamos PhantomJS, Protractor, ni suite alguna de tests. Retirar estas herramientas, configs, scripts y specs durante fase de limpieza, tras revisar el diff para no borrar documentación/código ajeno. No añadir Vitest, Playwright, mocks de testing ni cobertura. Ejecutar build, typecheck/lint si se conserva y validación manual. Es un riesgo aceptado, no una afirmación de cobertura equivalente.

## Referencias oficiales

- [Angular compatibility](https://angular.dev/reference/versions)
- [Angular update guide](https://angular.dev/update-guide)
- [Standalone migration](https://angular.dev/reference/migrations/standalone)
- [Zoneless](https://angular.dev/guide/zoneless)
- [Application build system](https://angular.dev/tools/cli/build-system-migration)
- [Angular service worker](https://angular.dev/ecosystem/service-workers/getting-started)
- [Security](https://angular.dev/best-practices/security)
