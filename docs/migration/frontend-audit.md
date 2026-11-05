# Auditoría frontend Cuper

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
