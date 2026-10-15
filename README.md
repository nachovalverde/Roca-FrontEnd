# Escuela Presidente Julio Argentino Roca

Portal web de la Escuela Presidente Julio Argentino Roca, de Nivel Inicial y Primario, en San Miguel de Tucumán. Las familias pueden consultar las novedades y la información de la escuela, y el personal carga las inscripciones de los alumnos con un formulario digital que reemplaza la ficha en papel.

Proyecto académico, desarrollado solo como front end. Las noticias, las cuentas y las inscripciones son datos de prueba.

## Funcionalidades

**Portal público**

- Inicio con portada y novedades filtradas por categoría.
- Detalle de cada noticia y página institucional con los datos de contacto.

**Inscripciones (maestros y vicedirectora)**

- Formulario de inscripción en 6 pasos: alumno, padre, madre, vivienda, contactos de emergencia y revisión, con todos los datos de la ficha de la escuela.
- Validación por paso: campos obligatorios, DNI de 7 u 8 dígitos o CUIL de 11, mail y teléfonos. En el DNI y los campos numéricos no se pueden escribir letras.
- Cálculo automático de la edad y borrador automático: si se cierra la pestaña, lo cargado se recupera.
- Provincia y localidad de nacimiento desde la API pública Georef.
- Listado de inscriptos con búsqueda por nombre o DNI, filtro por grado, edición y eliminación con confirmación.

**Acceso por roles**

- Login con sesión. Después de ingresar, la vicedirectora va a su panel y el maestro al panel docente.
- Las rutas privadas están protegidas por rol; sin sesión, se redirige al login y después se vuelve a la página pedida.

## Roles

- **Público:** consulta las noticias y la información institucional.
- **Maestro/a:** carga, consulta, edita y elimina inscripciones. Entra viendo los alumnos de su grado.
- **Vicedirectora:** todo lo del maestro, sobre todos los grados, más el panel de administración.

## Tecnologías

- React 19 y Vite
- React Bootstrap y Bootstrap
- React Router DOM
- Context API, para la sesión del usuario
- Axios, para la API pública Georef
- SweetAlert2
- localStorage, como almacenamiento mientras no hay backend

## Estructura

```
src/
├─ components/  common, inscripciones, layout, noticias
├─ pages/       una página por ruta
├─ routes/      AppRouter y RutaProtegida
├─ context/     AuthContext
├─ services/    acceso a datos: inscripciones, borrador, auth y Georef
├─ data/        opciones de la ficha, usuarios de prueba, noticias y roles
└─ utils/       validaciones, filtros y formato de fechas
```

Las páginas nunca acceden a localStorage ni a la API directamente: todo pasa por `src/services/`. Cuando se sume el backend, solo cambia el interior de los servicios.

## Cómo ejecutar el proyecto

```bash
git clone https://github.com/nachovalverde/Roca-FrontEnd.git
cd Roca-FrontEnd
npm install
```

Creá un archivo `.env` en la raíz del proyecto con la URL de la API:

```
VITE_GEOREF_URL=https://apis.datos.gob.ar/georef/api
```

Después iniciá el servidor de desarrollo:

```bash
npm run dev
```

Vite muestra en la terminal la dirección local para abrir el sitio.

## Cuentas de demostración

| Usuario | Contraseña | Rol |
| --- | --- | --- |
| admin | admin123 | Vicedirectora |
| maestra1 | maestra123 | Maestra de 1° |
| maestro2 | maestro123 | Maestro de 2° |

Las cuentas son solo para la demostración académica. La sesión se guarda en el navegador y todavía no hay autenticación conectada a un backend.

## Estrategias SEO

- **Título y descripción por página.** Cada página pública define su propio `<title>` y `<meta name="description">`, que React 19 ubica en el `<head>`. El detalle de una noticia usa su título y su descripción, así cada noticia tiene los suyos.
- **Etiquetas semánticas.** El layout usa `<nav>`, `<main>` y `<footer>`. El inicio se divide en `<section>`, la página institucional tiene su `<header>` y cada noticia es un `<article>`, tanto en las tarjetas como en el detalle.
- **Jerarquía de títulos.** Un solo `<h1>` por página y `<h2>` o `<h3>` para las secciones.
- **Idioma declarado.** `<html lang="es">`, para que los buscadores y los lectores de pantalla sepan en qué idioma está el contenido.
- **Texto alternativo.** Todas las imágenes tienen `alt` descriptivo.
- **Páginas privadas fuera del buscador.** El login, el panel de administración, las páginas del docente y las de error llevan `<meta name="robots" content="noindex">`. Además, `public/robots.txt` les indica a los buscadores que no recorran esas rutas.
- **Vista previa al compartir.** `index.html` incluye etiquetas Open Graph (`og:title`, `og:description`, `og:locale`) para que el enlace se vea bien en WhatsApp y en redes.
- **URLs legibles.** Rutas como `/institucional` o `/noticias/1`, con React Router. `vercel.json` hace que se puedan abrir o recargar directamente sin dar error 404.
- **Diseño responsive.** La etiqueta `viewport` y la grilla de Bootstrap adaptan el sitio al celular, que Google tiene en cuenta para posicionar.

## Deploy

El proyecto se publica en Vercel desde GitHub. Como el `.env` no se sube al repositorio, la variable `VITE_GEOREF_URL` se carga en Vercel, en Settings, Environment Variables.

## Integrantes

- Uncos Sebastian
- Valverde José Ignacio
