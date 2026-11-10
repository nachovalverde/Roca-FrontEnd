const mailValido = (mail) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)

export function validarPassword(password, repetirPassword) {
    const errores = {}
    const clave = password ?? ''
    const repeticion = repetirPassword ?? ''

    // Mínimo 8 caracteres, con al menos una letra y un número
    if (clave.length < 8) {
        errores.password = 'La contraseña debe tener al menos 8 caracteres'
    } else if (!/\p{L}/u.test(clave) || !/\d/.test(clave)) {
        errores.password =
            'La contraseña tiene que tener al menos una letra y un número'
    } else if (clave !== repeticion) {
        errores.repetirPassword = 'Las contraseñas no coinciden'
    }

    return errores
}

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

    // Al editar, la contraseña es opcional; si se completa, se valida.
    if (esNuevo || password || repetirPassword) {
        Object.assign(
            errores,
            validarPassword(password, repetirPassword)
        )
    }

    return errores
}