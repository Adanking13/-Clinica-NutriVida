# NutriVida · Evidencias EP1

## 1. HTML5 y semántica
- Todas las páginas usan `<!DOCTYPE html>`, `lang="es"`, `charset`, `viewport` y descripción.
- Estructura compartida con `header`, `nav`, `main`, `section`, `article` y `footer` según el contenido.
- Navegación interconectada mediante rutas relativas.
- Tablas administrativas con `caption`, `thead`, `tbody` y `scope`.

## 2. CSS externo
- Todo el diseño está centralizado en `assets/css/estilos.css`.
- No se usan bloques `<style>` ni estilos inline.
- Variables CSS, componentes reutilizables, estados hover/focus y media queries.
- Diseño responsive probado conceptualmente para escritorio, tablet y móvil.

## 3. JavaScript y validaciones
- `assets/js/form-utils.js` centraliza mensajes de error y estados `aria-invalid`.
- `registro.js`, `reserva.js`, `contacto.js`, `login.js`, `admin-producto.js` y `admin-usuario.js` validan formularios con mensajes contextuales.
- Se usan `label`, `id`, `name`, `required`, tipos HTML, límites de longitud, autocomplete y sugerencias mediante `datalist` cuando corresponde.
- RUN chileno validado mediante módulo de dígito verificador.
- Reserva valida fecha y horario.

## 4. Interacción y persistencia frontend
- Menú hamburguesa lateral accesible: abre/cierra, overlay, Escape, `aria-expanded`, `aria-hidden` y `aria-current`.
- Carrito persistente con `localStorage`, cantidades y total.
- Detalle de servicio dinámico mediante query string.
- Registro demo guarda datos no sensibles en `localStorage`.
- Sesión demo usa `sessionStorage`; no se almacenan contraseñas.

## 5. Multimedia
- `assets/media/nutrivida-presentacion.mp4` es un MP4 válido y liviano para la página Recursos.
- El video usa controles y una imagen `poster`.

## 6. Presentación
Para la demostración individual se puede mostrar:
1. Inicio y menú hamburguesa.
2. Navegación entre páginas.
3. Productos + carrito + detalle.
4. Formulario de reserva con error contextual y envío correcto.
5. Registro con RUN, región/comuna y contraseña.
6. Panel administrativo y alerta de stock.
7. Repositorio Git y commits descriptivos.

