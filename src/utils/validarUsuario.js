const mailValido = (mail) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)

export function validarUsuario(datos, esNuevo) {
    const errores = {}
    const nombre = datos.nombre ?? ''
    const usuario = datos.usuario ?? ''
    const mail = datos.mail ?? ''
    const password = datos.password ?? ''
    const repetirPassword = datos.repetirPassword ?? ''

    if (!nombre.trim()) {
        errores.nombre = 'Completá este campo'
    }

    if (!/^[a-z0-9._-]{4,20}$/i.test(usuario)) {
        errores.usuario =
            'Usá entre 4 y 20 caracteres: letras, números, punto, guion o guion bajo'
    }

    if (!mailValido(mail)) {
        errores.mail = 'Revisá el mail: debe tener @ y un dominio'
    }

    if (!datos.rol) {
        errores.rol = 'Completá este campo'
    }

    if (datos.rol === 'maestro' && !datos.grado) {
        errores.grado = 'Elegí el grado a cargo'
    }

    // Al editar, si la contraseña queda vacía, se conserva la anterior.
    if (esNuevo || password || repetirPassword) {
        if (password.length < 6) {
            errores.password = 'La contraseña debe tener al menos 6 caracteres'
        } else if (password !== repetirPassword) {
            errores.repetirPassword = 'Las contraseñas no coinciden'
        }
    }

    return errores
}