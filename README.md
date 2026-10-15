# Escuela Presidente Julio Argentino Roca

Este proyecto es el portal institucional de la Escuela Presidente Julio Argentino Roca, que cuenta con Nivel Inicial y Primario. La idea es que las familias puedan consultar información y novedades de la escuela, y que el personal tenga herramientas para realizar las inscripciones.

## Estado actual

El portal publico tiene una pagina de inicio con noticias de ejemplo, un filtro por categoria, paginas de detalle y una seccion con informacion institucional y de contacto.

Tambien se puede iniciar sesion con una cuenta de demostracion y acceder a una pagina protegida para la vicedirectora.

El formulario de inscripcion, esta organizado en varios pasos: alumno, padre, madre, vivienda y contactos de emergencia. Incluye campos reutilizables, validaciones y el calculo de edad a partir de la fecha de nacimiento.

Las noticias y cuentas utilizadas para la demostracion son datos de prueba.

## Roles previstos

- **Público:** consulta las noticias y la información institucional.
- **Vicedirectora:** accede al panel privado. Desde ahi gestiona las noticias y las cuentas de los maestros.
- **Maestro/a:** accede a las funciones relacionadas con las inscripciones.

Por el momento, el acceso privado implementado corresponde al panel de la vicedirectora. Las funciones de gestión y el area docente están en desarrollo.

## Tecnologías

- React y Vite
- JavaScript
- React Bootstrap y Bootstrap
- React Router DOM
- SweetAlert2
- Axios

## Como ejecutar el proyecto

Clona el repositorio:

git clone https://github.com/nachovalverde/Roca-FrontEnd.git

Entra en la carpeta:

cd TFI-ROCA

Instala las dependencias:

npm install

Inicia el servidor de desarrollo:

npm run dev

Vite mostrara en la terminal la dirección local para abrir el sitio en el navegador.

## Cuenta de demostracion

- **Usuario:** admin
- **Contraseña:** admin123

La cuenta es solo para la demostracion academica. La sesion de prueba se guarda en el navegador y todavia no hay autenticación conectada a un backend.

## Integrantes

- Uncos Sebastian
- Valverde José Ignacio