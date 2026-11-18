# Inventario provisional de API Rails observado

## Base backend vigente — `feat/backend-modernization`

**2026-11-04, instrucción del usuario:** integrar contra `../cuper-backend` en `feat/backend-modernization`, commit inspeccionado `7a3b9db`, no contra `master`. El checkout fue cambiado con árbol limpio. Esta sección prevalece sobre los hallazgos históricos de Rails 5.2 descritos debajo.

- Runtime fijado por esa rama: Ruby 3.4.12, Rails 8.0.5.1 y Bundler 2.6.9 (`.ruby-version`, `Gemfile.lock`). No instalar Ruby 2.5 para el baseline de integración vigente.
- El handoff backend existe en `../cuper-backend/docs/migration/api-contract.md`, `runtime-routes.txt` y `openapi.yaml`. OpenAPI está declarado parcial: usar lo confirmado y completar discrepancias con respuestas reales; no generar cliente completo a partir de schemas sin verificar.
- CORS local ahora permite `http://localhost:4200` y rechaza wildcard; staging/production requieren `CORS_ALLOWED_ORIGINS`. Se conservan los cinco headers de autenticación y no hay rotación por request.
- Acumulación conserva `points` como importe de compra, convierte con decimal por el rate de negocio y redondea half-up a entero seguro para JSON. Puntos/precios son enteros en las unidades existentes; no convertir unilateralmente a centavos ni implementar rounding del servidor en cliente.
- Canje obtiene costo de la promoción autorizada en Rails e ignora `points` del cliente. No considerar este endurecimiento una incompatibilidad a restaurar.
- Transacciones admiten opcionalmente `Idempotency-Key`: una UUID opaca por intención del usuario, conservada para reintentar esa misma intención; 201 en replay, 409 si se reutiliza para otra operación. Sin key legacy no hay deduplicación. No habilitar reintentos automáticos offline; adoptar el header como tarea coordinada que preserve compatibilidad con Rails antiguo.
- Reset de contraseña admin envía instrucciones Devise y no asigna ni envía el password introducido. El formulario actual debe adaptarse a ese comportamiento confirmado, no prometer que cambió la contraseña.
- Autorización de empresa exige membresía aprobada; búsquedas se limitan; errores Pundit pueden usar 401 según el contrato backend. No asumir que todo 401 significa token expirado: revisar cuerpo/contexto antes de cerrar sesión.
- El saldo sigue siendo global por usuario; tarjetas/saldos por negocio Wallet siguen siendo contrato futuro, no funcionalidad existente.

Fuentes verificadas: controladores de `api/transaction_inputs`, `api/transaction_outputs`, `api/admin/users`, initializer CORS y contrato de la rama. Pendiente validación HTTP de integración; estos son hallazgos estáticos, no ejecución de endpoints.

### Primera comprobación HTTP local (2026-11-04)

Después de autorización explícita del usuario se creó y pobló solo la base development local desde schema/seed de la rama. Sin modificar código backend ni emitir correos. Login cliente desde Angular legacy: `POST /auth/sign_in` responde 200 y navega al dashboard; tras reload, `GET /auth/validate_token` responde 200. Sin sesión, validate_token responde 401. Se conservaron headers/storage existentes; no se capturaron ni publicaron tokens. No se ha verificado todavía el resto del inventario, roles, OAuth ni mutaciones transaccionales.

## Inventario histórico y contraste previo con `master`

**Estado:** inventario desde `src/app/services`, modelos y consumidores del frontend web, contrastado parcialmente con código del backend hermano el 2026-11-04. No es OpenAPI ni confirmación en runtime. No asumir que un endpoint sigue disponible ni modificar su forma sin coordinación.

**Revisión 2026-11-04:** se inspeccionaron rutas, controladores y vistas de `../cuper-backend` en modo lectura. PostgreSQL acepta TCP en 5432; Rails no responde en localhost:3000. `bundle check` falla porque el entorno tiene Ruby 3.0.0 y el Gemfile exige 2.5.0. No se modificó el backend ni se ejecutaron migraciones/seeds u operaciones transaccionales.

## Contraste parcial con Rails local

Las referencias de esta tabla son relativas a `../cuper-backend/`.

| Tema | Evidencia en backend | Consecuencia frontend / coordinación |
|---|---|---|
| Auth | `config/routes.rb:10-19` monta devise_token_auth en `auth` | Confirma montaje, no todos los defaults/respuestas en runtime |
| Rotación y OAuth | `config/initializers/devise_token_auth.rb:8,27` configura `change_headers_on_each_request = false` y `omniauth_prefix = /api/auth/user` | Registrar overrides reales del checkout; no asumir rotación por request ni callback OAuth default. El adaptador debe poder consumir headers de respuesta y respetar configuración Rails |
| CORS | `config/initializers/cors.rb:18-25` permite todos los orígenes y expone los cinco headers legacy | Preservar headers actuales; restricción de orígenes requiere coordinación backend |
| Acumulación | `app/controllers/api/transaction_inputs_controller.rb:55-64` calcula `params[:transaction_input][:points] * company.category.points_per_dollar` | Confirma que `points` de entrada representa importe base; no renombrarlo ni reaplicar conversión en cliente |
| Wrapping JSON | `config/initializers/wrap_parameters.rb:7-9` habilita ParamsWrapper JSON; input/output leen raíces `transaction_input` / `transaction_output` | El payload rootless del frontend depende del wrapping automático Rails; preservar Content-Type JSON/tipos y confirmar request real antes de cambiar root/envelope |
| Canje | `app/controllers/api/transaction_outputs_controller.rb:17-24` toma `points` y `promotion_id` del cliente | Revisar con Rails validación/autorización del costo; no asumir recálculo equivalente a acumulación |
| Invitación email | Ruta comentada en `config/routes.rb:72`; acción comentada en `app/controllers/api/partner/companies_controller.rb:126-135` | El frontend consume operación no expuesta por este checkout: incompatibilidad preexistente, no inventar ruta sustituta |
| Crear empleado | `config/routes.rb:87` expone empleados solo index/show y member update_state | El método POST frontend sin consumidor observado no tiene ruta demostrada en este checkout |
| Listas | Vistas `app/views/api/transaction_inputs/transaction_inputs.json.jbuilder` y `transaction_outputs/transaction_outputs.json.jbuilder` producen raíz y `meta.total_count`; promociones partner también incluyen meta | Confirma envoltorios para DTOs, no arrays directos |
| Solicitudes pendientes | `app/views/api/notifications/notifications_request_employee.json.jbuilder` produce array directo | No imponer envoltorio estándar a todas las colecciones |
| Estados HTTP | show/update empresa usan 202; index de empleados usa 201 en sus controladores | No asumir que las lecturas responden siempre 200; conservar comportamiento hasta acuerdo Rails |

No se deduce que todo Rails esté auditado ni que estos endpoints estén operativos. Soporte documental de ParamsWrapper: [guía Rails 5.2 consultada vía Context7](https://github.com/rails/rails/blob/v5.2.2/guides/source/action_controller_overview.md).

## Configuración y autenticación

Bases observadas:

- Development: `http://localhost:3000` (`src/environments/environment.ts:5-12`).
- Staging: `https://cuper-backend.herokuapp.com` (`src/environments/environment.staging.ts:1-8`).
- Production: no configurada (`src/environments/environment.prod.ts`).

`angular-token@7.0.1` configura `apiBase`, `oAuthBase`, OAuth Facebook/Google y ventana popup en `src/app/app.module.ts:64-72`. La biblioteca declara estos defaults que deben confirmarse en Rails:

| Operación | Método/ruta | Payload observado/derivado | Uso de respuesta |
|---|---|---|---|
| Login | POST `/auth/sign_in` | `{email,password}` | Respuesta completa; `body.data`; headers auth |
| Registro | POST `/auth` | `email`, `password`, `password_confirmation`, `name`, `confirm_success_url` | Navegación y captura headers |
| Logout | DELETE `/auth/sign_out` | vacío | `success`; limpia storage al completar/error |
| Validar token | GET `/auth/validate_token` | vacío | `data` |
| Cambio contraseña usuario | PUT `/auth` | `current_password`, `password`, `password_confirmation` | respuesta mostrada como éxito |
| Recuperar contraseña | POST `/auth/password` | `{email,redirect_url}` | `message` |
| Reset contraseña | PUT `/auth/password` | `{password,password_confirmation}` | `message` |
| OAuth | navegación `/auth/facebook`, `/auth/google_oauth2` | `omniauth_window_type`, `auth_origin_url`; callback `/oauth_callback` | popup/postMessage |

Headers que agrega/consume la integración actual: `access-token`, `client`, `expiry`, `token-type`, `uid`. Storage actual de angular-token: `accessToken`, `client`, `expiry`, `tokenType`, `uid` y potencial `userType`. Reemplazar la biblioteca debe preservar temporalmente ese contrato y las sesiones existentes. No asumir refresh token, JWT o cookies. Confirmar CORS: headers allow/expose.

### Salvaguardas al migrar providers HTTP y PWA

- Cambiar a `provideHttpClient` no debe perder ni duplicar la cadena de auth: usar interceptors funcionales; activar `withInterceptorsFromDi` solo mientras quede una clase transitoria.
- Revisar uploads multipart sin cambiar campos/serialización unilateralmente. Progreso de subida no está cubierto por Fetch; elegir backend XHR solo si esa capacidad se requiere y con la API disponible en el escalón Angular.
- No añadir `dataGroups` para estos endpoints. Excluir rutas backend del mismo origen del fallback de navegación SW/hosting, sin excluir callbacks que sí resuelve el frontend; no usar patrones negativos en `dataGroups.urls`.
- Actualizar el cliente mediante recarga controlada, sin mutaciones pendientes. El backend debe preservar compatibilidad con versiones anteriores; el SW no garantiza por sí solo que clientes antiguos dejen de operar.

## Endpoints de aplicación

Todos los servicios construyen URL a partir de `environment.apiBase`.

| Método | Endpoint | Entrada | Respuesta que UI consume | Servicio / evidencia |
|---|---|---|---|---|
| PUT | `/api/users` | Multipart perfil: name/email/national_id/image opcional | User | `user/user.service.ts:40-41`; `components/profile-form/` |
| GET | `/api/users/search` | query `query` | lista users para autocomplete | User:44-47; `components/user-search/` |
| PUT | `/api/users/current_view` | `{company_id}` | ignorada | User:50-56 |
| GET | `/api/users/my_transactions` | `page`, `per_page` opcionales | `{transactions,meta.total_count}` | User:119-127; `user-transactions/` |
| GET | `/api/notifications` | `page`, `per_page` | `{notifications,meta.total_count}` | User:100-108; `home.component.ts` |
| PUT | `/api/notifications/{id}/answer_request_employee` | `{status}` approved/declined | `{notification}` | User:111-112; Home:158-177 |
| POST | `/api/notifications/read_pending_notifications` | `{}` | `{total}` | User:115-116; Home:100-105 |
| PUT | `/api/admin/users/{id}/update_password` | `{email,password}` | no tipado | User:96-97 |
| GET | `/api/partner/companies` | — | Company directa | Company:17-18 |
| POST | `/api/partner/companies` | atributos Company + `plan_id` | Company directa | Company:25-27 |
| PUT | `/api/partner/companies` | Multipart empresa/logo | Company directa | Company:21-22 |
| GET | `/api/partner/companies/send_invitation_employee` | query `email` | éxito invitación, forma no tipada | Company:30-36 |
| POST | `/api/partner/companies/request_employee` | `{user_id}` | no tipada | Company:39-43 |
| GET | `/api/partner/companies/employees` | — | `{employees}` | Employee:22-24; CardCashier |
| GET | `/api/partner/companies/pending_requests_employee` | — | array usado directamente | Employee:27-29 |
| PUT | `/api/partner/companies/employees/{id}/update_state` | `{id,status,feedback}` | Employee | Employee:32-34 |
| POST | `/api/partner/companies/employees` | `{user_id}` | Employee; método declarado, no consumidor observado | Employee:37-39 |
| GET | `/api/partner/companies/offices` | — | `{offices}` | Office:16-17 |
| POST | `/api/partner/companies/offices` | Office (`company_id`, `lat`, `long`) | Office | Office:20-21; OfficeForm |
| PUT | `/api/partner/companies/offices/{id}` | Office | Office | Office:24-26 |
| GET | `/api/partner/companies/promotions` | `page`, `per_page` opcionales | `{promotions,meta.total_count}` | Promotion:16-24; Rewards |
| GET | `/api/partner/companies/promotions/{id}` | — | Promotion directa | Promotion:27-28 |
| POST | `/api/partner/companies/offices/{officeId}/promotions` | multipart | Promotion | Promotion:31-33; formulario recompensa |
| PUT | `/api/partner/companies/offices/{officeId}/promotions/{id}` | multipart | Promotion | Promotion:36-38 |
| GET | `/api/promotions` | — | respuesta consumida como `{promotions}` | Promotion:41-43; CustomerPromotions |
| GET | `/api/partner/companies/promotions/{id}/transaction_outputs` | — | `{transaction_outputs}` | Promotion:45-47; Reward |
| GET | `/api/transaction_inputs` | `page`, `per_page` opcionales | `{transaction_inputs,meta.total_count}` | InputTransaction:20-28; Transactions |
| POST | `/api/transaction_inputs` | `{user_id,points}` | transacción | InputTransaction:16-18; InputTransactionForm |
| GET | `/api/transaction_outputs` | `page`, `per_page` opcionales | `{transaction_outputs,meta.total_count}` | OutputTransaction:20-28; Transactions |
| POST | `/api/transaction_outputs` | `{user_id,promotion_id,points}` | transacción | OutputTransaction:16-18; OutputTransactionForm |
| GET | `/api/admin/companies` | — | `{companies}` | `admin/company/company.service.ts:17-19` |
| PUT | `/api/admin/companies/{id}/change_status` | `{status,feedback}` | Company | admin company:23-25 |
| GET | `/api/admin/users` | query `role,page,per_page` | `{users,meta.total_count}` | `admin/customer/customer.service.ts:16-25` |
| GET | `/api/admin/categories` | — | `{categories}` | `admin/category/category.service.ts`; AdminCategories |
| POST | `/api/admin/categories` | Category | sin tipo fiable | CategoryService:20-21 |
| PUT | `/api/admin/categories/{id}` | Category | sin tipo fiable | CategoryService:24-25 |
| GET | `/api/admin/plans` | — | `{plans,promotional_plan?}` | `admin/plan/plan.service.ts`; CompanyRegister |
| POST | `/api/admin/plans` | Plan | sin tipo fiable | AdminPlan:21-22 |
| PUT | `/api/admin/plans/{id}` | Plan | sin tipo fiable | AdminPlan:25-26 |
| GET | `/api/admin/app_settings/settings` | — | Settings directa | `admin/setting/setting.service.ts:16-18` |
| PUT | `/api/admin/app_settings/update_settings` | Setting | respuesta tipada como array, no confirmada | AdminSetting:21-22 |

Realtime adicional: Pusher channel `usernotifications.{user.id}`, evento `new-notification`, payload leído `{message}`. Fuente `src/app/pages/home/home.component.ts:37-49`. No es endpoint REST observado; confirmar canal privado/autorización con backend.

## Payloads y transformaciones con riesgo

- **Acumulación:** el campo `points` contiene `data.invoice.cost` (importe de compra). La revisión estática de Rails confirma multiplicación por `category.points_per_dollar`; aún falta validar comportamiento real. `src/app/components/input-transaction-form/input-transaction-form.component.ts:25-30`; `../cuper-backend/app/controllers/api/transaction_inputs_controller.rb:55-64`.
- **Canje:** `points` se toma de `promotion.points_required`. `output-transaction-form.component.ts:36-41`.
- **Promoción multipart:** `title,terms,total_rewards,points_required,unlimited,start_at,end_at,image?`; valores boolean/número/fecha pasan por `FormData` como strings. `new-reward-card.component.ts:187-197`.
- **Paginación:** UI usa índice 0 de Material y suma uno al request; params solo se envían cuando `page && per_page`. Consumidores esperan `meta.total_count`.
- **Invitación:** un GET provoca invitación; preservar en migración y proponer cambio a POST a Rails separadamente.
- **Transformaciones de vista:** imagen `image_url`→`image`, `points_required`→`number`; tipos de transacción traducidos a signo; fecha de promoción parseada manualmente. `pages/company/rewards/rewards.component.ts`, `components/user-transactions/`, `components/new-reward-card/`.
- **Fechas:** modelos declaran `Date`, respuesta JSON es string/valor serializado hasta parse explícito. No asumir zona horaria, formato ISO o nullability.

## DTOs actuales y brechas

Modelos: `src/app/models/{user,company,office,promotion,input-transaction,output-transaction,category,plan,setting,notification}.ts`.

- `User` no define todos los campos consumidos (`is_admin`, `is_cashier`, `is_partner`, `plan_promotion`).
- `Company` no declara `status`, que usa administración.
- `Category` no declara `active`, que usa formulario.
- `Office.long` contrasta con `lng` emitido por el mapa; convertir solo en límite documentado.
- `Notification.created_at` declarado number; formato real no confirmado.
- Tipos `any`/arrays directos contradicen envoltorios Rails en usuarios, planes, categorías, promociones y transacciones.
- Varios errores usan `error.errors`, otros `error`, `full_messages` y `message`; no asumir un formato único hasta confirmar Rails.

## Compatibilidad y coordinación Rails

1. No renombrar endpoints, verbos, campos, headers, envoltorios ni tipos como parte de la actualización Angular.
2. Backend actualizado debe mantener contrato legacy mientras convivan clientes, o acordar deprecación explícita.
3. Frontend nuevo debe funcionar con Rails antiguo para funciones existentes.
4. Funciones nuevas (Wallet/QR) se apagan o degradan ante endpoints ausentes; no se cachean.
5. Obtener fixtures de respuestas anonimizadas y confirmación humana del equipo Rails. No se crearán tests automáticos; las fixtures sirven como documentación y guía para revisión manual.
6. El OpenAPI definitivo lo mantiene Rails. Generar cliente TypeScript solo cuando la especificación sea confiable; mantener DTOs generados separados de view models.
7. Revisar en particular CORS/exposed headers, sesión y concurrencia de `current_view`, autorización de transacciones y Pusher, errores 401/403/422 y URL segura de reset de password.

## Propuesta Wallet (no disponible aún)

Contrato de conversación, no endpoint implementado:

- Consultar tarjeta por identidad autenticada y negocio.
- Emitir/obtener pase Apple y enlace/token Google mediante Rails.
- Respuesta de tarjeta: identificador de tarjeta, negocio, saldo por negocio si aplica, recompensas, QR payload y capacidades disponibles.
- Rails posee firma, claves y actualización de pases. Frontend nunca firma ni conserva credenciales.
- Descargas y URLs temporales: `Cache-Control: no-store`; no poner tokens en logs/analytics. Definir cómo autenticar descarga, pues una navegación directa no adjunta headers custom actuales.
- QR no autoriza solo un canje; Rails valida identidad/permisos.
- Si servicio no está implementado, ocultar botón o mostrar no disponible sin afectar el resto del producto.
