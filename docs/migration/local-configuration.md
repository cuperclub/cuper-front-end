# Configuración Mapbox

El frontend lee `MAPBOX_ACCESS_TOKEN` del entorno al ejecutar `npm start`, `npm run build`, `npm test`, `npm run e2e` o `npm run heroku-postbuild`. Los hooks generan `src/environments/environment.generated.ts`, ignorado por Git, para development y staging. No se registra el valor en logs.

```sh
export MAPBOX_ACCESS_TOKEN="<token público pk.*>"
npm start
```

Configurar la misma variable en CI/deploy **antes del build**. Cambiarla requiere regenerar/recompilar. `.env.example` es solo una referencia: no se cargan archivos `.env` automáticamente. Si se invoca `ng` directamente, ejecutar antes `npm run config:env`. En Docker, pasar la variable con `-e MAPBOX_ACCESS_TOKEN`.

Solo se aceptan tokens públicos `pk.*`; los secretos `sk.*` nunca deben llegar al frontend. El token público será visible en el bundle/navegador: restringir sus scopes y URLs en Mapbox. Un secreto debe permanecer en backend y rotarse si se expuso. La configuración production general sigue pendiente; este cambio no inventa los valores faltantes de `environment.prod.ts`.

Sin variable, se genera una cadena vacía para permitir build/tests sin credenciales. Los mapas requieren un token público válido para funcionar; no se proporciona uno compartido como fallback.

Se eliminó el literal Mapbox de los commits locales de migración antes de publicar. El historial remoto anterior no se reescribe; revisar/rotar las credenciales históricas con el propietario si corresponde.

Validación 2026-11-09: generador acepta ausencia y prefijo público, rechaza prefijo secreto sin imprimir el valor; archivo generado ignorado por Git. Build Angular 13 exit 0, suite existente 8/8 (`test_exit=0`) y navegador desktop/móvil: sesión heredada, login/logout/recarga con validate_token 200 y consola sin errores/warnings. Estas pruebas no validan mapas: hace falta configurar un token público real autorizado.
