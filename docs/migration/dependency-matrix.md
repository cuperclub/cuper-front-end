# Matriz de dependencias

**Checkpoint Angular 14 (2026-11-09):** framework 14.3.0, CLI/build 14.2.13, Material/CDK 14.2.7, TypeScript 4.6.4, RxJS 6.6.7 y Zone.js 0.11.8. Node 14.21.3/npm 6 y lockfile v1 conservados. Build, tests 8/8 en Chrome/Karma y navegador aprobados; formularios Untyped transitorios, lint legacy y bibliotecas View Engine pendientes. Este es el estado vigente por encima de los checkpoints históricos.

**Checkpoint Angular 13 (2026-11-09):** framework 13.4.0, CLI/build 13.3.11, Material/CDK 13.3.9, TypeScript 4.6.4, RxJS 6.6.7 y Zone.js 0.11.8. Node 14.21.3/npm 6 y lockfile v1 conservados. Build, tests 8/8 y navegador aprobados; lint legacy no aprobado (TSLint directo, pendiente ESLint). Las bibliotecas View Engine aún pasan por ngcc y deben sustituirse/actualizarse antes de Angular 16. Estado vigente por encima de los checkpoints históricos.

**Checkpoint Angular 12 (2026-11-09):** framework 12.2.17, CLI/build 12.2.18, Material/CDK 12.2.13, TypeScript 4.3.5, RxJS 6.6.7 y Zone.js 0.11.8. Toolchain transitorio Node 14.21.3/npm 6; lockfile v1. Build y navegador aprobados; suite existente 8/8 en Chrome/Karma, ya no en PhantomJS. Dependencia PhantomJS conservada temporalmente, no predeterminada. Este checkpoint reemplaza los inferiores como estado vigente.

**Checkpoint Angular 11 (2026-11-09):** framework 11.2.14, CLI/build 11.2.19, Material/CDK 11.2.13, TypeScript 4.0.8, RxJS 6.6.7, Zone.js 0.10.3, Codelyzer 6.0.2 y Karma 6.4.4. Lockfile v1 conservado; build, tests 8/8 y navegador aprobados. Este es el estado vigente; los checkpoints y tablas inferiores son históricos.

**Checkpoint Angular 10 (2026-11-05):** framework 10.2.5, CLI/build 10.2.4, Material/CDK 10.2.7, TypeScript 4.0.8, tslib 2.9.1, RxJS 6.6.7 y Zone.js 0.10.3. Lockfile v1 conservado; build, tests 8/8 y navegador aprobados. Reemplaza los checkpoints inferiores como estado vigente; las tablas de inventario Angular 7 siguen siendo históricas.

**Checkpoint Angular 9 (2026-11-04/05):** framework 9.1.13, CLI/build 9.1.15, Material/CDK 9.2.4, TypeScript 3.8.3, RxJS 6.6.7, Zone.js 0.10.3; HammerJS retirado por schematic oficial. Ivy/AOT, build, tests 8/8 y navegador aprobados. Este checkpoint reemplaza al de Angular 8 como estado vigente.

**Checkpoint instalado/verificado (2026-11-04):** Angular 8.2.14, CLI 8.3.29, Material/CDK 8.2.3, TypeScript 3.5.3, RxJS 6.6.7 y Zone.js 0.9.1 (`e438225`). Las tablas inferiores conservan el inventario inicial Angular 7 como referencia histórica; no describen ya el lockfile vigente. Build, tests 8/8 y navegador aprobados para el salto a Angular 8.

Versiones `actual` corresponden al lockfile, no a una instalación local. “Versión vigente” consultada en npm el 2026-10-30; revisar de nuevo antes de ejecutar cada salto. Compatibilidad del paquete no equivale a pruebas propias de compatibilidad zoneless.

Revisión de estrategia mediante Context7: 2026-11-04. No se renovó la consulta npm en esta revisión; las versiones de tablas siguen siendo una fotografía fechada, no un lock autorizado para instalar.

## Stack objetivo verificado

| Paquete | Destino consultado | Consideración |
|---|---:|---|
| Angular framework | 22.2.4 | Angular 22.x |
| Angular CLI / `@angular/build` | 22.2.5 | CLI y builder pueden tener parche diferente al framework |
| Angular Material/CDK | 22.2.5 | Alinear Material y CDK; peers Angular 22 |
| TypeScript | 6.0.3 | Angular 22 admite `>=6.0 <6.1`; no usar TS 7.0.2 |
| RxJS | 7.8.2 | Angular 22 acepta RxJS 6.5.3 o 7.4+; proyecto objetivo usa 7.x |
| Node.js | 24 LTS, `>=24.15.0` | Angular 22 acepta `^22.22.3 || ^24.15.0 || ^26.0.0` |

Fuentes: [tabla de compatibilidad Angular](https://angular.dev/reference/versions), registro npm y peers de versiones consultadas. Angular 21+ es zoneless por defecto. No fijar sin necesidad el parche exacto en documentos permanentes; elegir el último parche compatible al iniciar cada PR.

## Dependencias runtime del frontend web

| Paquete | Resuelto en lock | Vigente consultado | Uso/estado/compatibilidad | Recomendación |
|---|---:|---:|---|---|
| `@angular/*` core/common/compiler/forms/router/platform-browser | 7.1.4 | 22.2.4 | Framework activo; migración mayor secuencial | Actualizar por majors con CLI oficial |
| `@angular/animations` | 7.1.4 | 22.2.4 | API y providers legacy deprecados desde 20.2 | Mantener solo si hay consumidor transitorio; preferir CSS/animate.enter/animate.leave según el caso |
| `@angular/platform-browser-dynamic` | 7.1.4 | 22.2.4 | Bootstrap actual `platformBrowserDynamic` | Retirar del bootstrap al usar `bootstrapApplication`; verificar si queda necesario durante transición |
| `@angular/material` | 7.3.7 | 22.2.5 | Uso amplio en formularios/dialogs/tables; mantenido | Actualizar cada major; completar schematic MDC en escalón 15/16 compatible antes de 17; tema M3 es decisión aparte |
| `@angular/cdk` | 7.3.7 | 22.2.5 | Material | Mantener alineado con Material |
| `@ngx-translate/core` | 11.0.1 | 18.1.0 | Usado globalmente; peer requiere Angular >=18/RxJS >=7 en actual | Actualizar junto con loader; comprobar traducciones tardías zoneless |
| `@ngx-translate/http-loader` | 4.0.0 | 18.1.0 | Traducciones HTTP | Actualizar junto con core; comprobar URL de assets |
| `angular-token` | 7.0.1 | retirado (2026-11-04) | Deprecated/no longer supported; peers Angular 7; auth/OAuth/storage/interceptor | Sustituido por `AuthService`/`AuthInterceptor` internos que preservan el protocolo Rails; no es auth propia de servidor ni criptografía |
| `core-js` | 2.6.11 | 3.51.0 | imports legacy en polyfills | Eliminar solo imports no requeridos por matriz de navegadores |
| `express` | 4.17.1 | 5.3.0 | Solo server estático `server.js`; Express 4 tiene advisories | Sacar del destino si hosting estático; si continúa temporalmente, actualizar tras validar hosting |
| `hammerjs` | 2.0.8 | 2.0.8 | Import global; no release reciente | Retirar cuando Material moderno no lo requiera; revisar gestos |
| `intl` | 1.2.5 | 1.2.5 | Polyfill antiguo | Sustituir por Intl nativo de browsers destino |
| `mapbox-gl` | 1.7.0 | 3.34.1 | Usado para mapa, marker, geoloc; cambio mayor, CSP/coste/licencia | Probar upgrade mantenido o MapLibre; no quitar funcionalidad de ubicación |
| `ngx-infinite-scroll` | 8.0.1 | 22.0.0 | Solo lista notificaciones; existe versión Angular 22 | Preferir `IntersectionObserver` pequeño + control “cargar más” accesible |
| `pusher-js` | 5.1.1 | 8.6.0 | Notificaciones realtime | Actualizar SDK; importar modularmente, limpiar listeners/conexión; preservar protocolo Rails |
| `rxjs` | 6.3.3 | 7.8.2 | HTTP, forms, async pipe, realtime | Migrar observables necesarios; no eliminar RxJS |
| `tslib` | 1.10.0 | 2.8.1 | Helpers TypeScript | Actualizar según peer Angular |
| `zone.js` | 0.8.29 | 0.16.3 | Runtime actual | Mantener solo en escalones legacy; eliminar en hito zoneless explícito Angular 20.3 |

No se encontró Ionic, Capacitor, Cordova, NgRx, service worker o dependencia de Wallet en `cuper-front-end`.

Consumir un NgModule externo mantenido no contradice una aplicación 100% standalone. Evaluar compatibilidad con Angular/zoneless y alcance de providers, no exigir que la implementación interna de cada biblioteca sea standalone. Los interceptors class-based que queden temporalmente deben habilitarse con `withInterceptorsFromDi` al migrar HttpClient. Validar fetch/XHR del escalón si hay progreso de subida; no incorporar un paquete para resolver solo multipart.

## Dependencias del repositorio mobile, consideradas para sustitución (no actualizar allí como parte de este plan)

Fuente: `../cuper-mobile/package.json` y lock.

| Paquete | Lock | Uso comprobado | Decisión para SPA/PWA |
|---|---:|---|---|
| Angular core | 7.2.13 | Base app incompleta | No mezclar con árbol web; referencia, no base destino |
| `@ionic/angular` | 4.2.0 | Componentes y route strategy | No trasladar; reemplazar layout y controles con Angular/CSS |
| `@ionic/storage` | 2.2.0 | `onboardingComplete` | Sustituir por storage browser sencillo para preferencia no sensible; fallback si bloqueado |
| `@ionic-native/core` | 5.4.0 | API puente Cordova | Eliminar del destino PWA |
| splash-screen / status-bar | 5.4.0 | Inicialización nativa en AppComponent | Manifest/browser UX; no requerir plugin nativo |
| `cordova-sqlite-storage` | 3.2.0 | Declarado en config/plugin; uso de app no encontrado | Eliminar del destino; no reemplazar DB sin requerimiento |
| `@angular/http` | 7.2.13 | API HTTP deprecada en esa generación; no se observan servicios API reales | No trasladar; `HttpClient` |
| `@ionic/angular-toolkit`, `@ionic/lab` | 1.4.1, 1.0.24 | Toolchain antiguo | No trasladar |
| core-js 2, intl, Zone 0.8 | legacy | Polyfills mobile | No trasladar; matriz browser PWA |
| NgModules/rutas string | app modules | Lazy loading legacy | Reemplazo standalone/router moderno |

No se recomienda modernizar Ionic dentro del repositorio web. Si el negocio decidiera mantener una app de tiendas en el futuro, ese sería un proyecto separado con compatibilidad y coste evaluados en ese momento.

## Tooling y testing: eliminación explícita

**Actualización 2026-11-04:** el usuario pidió después ejecutar tests en cada iteración. Las decisiones de eliminación siguientes son históricas y quedan suspendidas hasta aclaración. Conservar e intentar suite existente; no añadir suite nueva. Playwright MCP permite inspección de navegador sin paquete nuevo en la aplicación.

| Paquetes/archivos web | Estado | Decisión |
|---|---|---|
| `karma`, `jasmine-core`, `@types/jasmine`, `karma-jasmine` | Unit runner legado | Eliminar |
| `karma-chrome-launcher`, `karma-phantomjs-launcher` | Browser launchers; PhantomJS deprecated | Eliminar ambos |
| `karma-coverage-istanbul-reporter`, HTML reporter, Jasmine spec reporter | Reportes | Eliminar |
| `protractor`, `@types/jasminewd2`, `ts-node` si solo E2E, `e2e/` | E2E Protractor EOL | Eliminar luego de revisar consumidores |
| `src/test.ts`, `src/karma.conf.js`, `src/tsconfig.spec.json`, specs, targets `test/e2e` | Harness | Eliminar luego de revisar diff |
| `codelyzer`, `tslint` | TSLint deprecated y Codelyzer incompatible con Angular moderno | Eliminar; si se desea lint, migrar a ESLint/angular-eslint compatible como verificación estática, no tests |

La decisión es no instalar Vitest, Playwright, Jest ni alternativa de tests. Ajustar CircleCI a install/build/typecheck/lint únicamente. No llamarlo “reemplazo de cobertura”.

## Nuevos paquetes aceptados si aportan el caso de uso

| Paquete | Uso previsto | Criterio |
|---|---|---|
| `@angular/build` | Builder ESM/esbuild/Vite CLI | Oficial, compatible; preferido frente a builder Webpack deprecado |
| `@angular/service-worker`, `@angular/pwa` | PWA | Oficial; cachear shell estático y excluir API privada |
| `angular-eslint` | Lint estático, si se conserva | Solo versión compatible con Angular CLI; no incorporar suite de tests |

## Alternativas acotadas

- **Mapas:** MapLibre GL (versión consultada 6.16.0) es candidato; validar WebGL, estilo, workers, licencia y proveedor de tiles. No asumir tiles sin coste.
- **Infinite scroll:** API browser `IntersectionObserver`; un componente propio pequeño es suficiente.
- **Onboarding:** Angular + CSS Scroll Snap/Router, accessible, sin Ionic Slides.
- **Status/splash:** comportamiento PWA/web; no equivalencia con status bar nativa, que no forma parte del alcance.
- **Wallet:** no añadir SDK que firme; frontend abre artefactos/enlaces emitidos por Rails.

## Seguridad y advisories

La auditoría bulk npm del lockfile encontró advisories asociados a numerosos paquetes, incluso transitivos; no se interpretan automáticamente como vulnerabilidad explotable en runtime. Ejemplos fijados: Angular 7.1.4, Express 4.17.1, node-sass 4.10.0, lodash 4.17.15, handlebars 4.5.3, minimist y tar. En la implementación ejecutar análisis actualizado del lockfile final, separar runtime/build/dev y verificar reachability. No usar `audit fix --force` como migración.
