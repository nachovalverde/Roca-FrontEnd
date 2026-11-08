import {
    buscarConPassword,
    registrarUltimoAcceso,
} from './usuariosService'

const CLAVE_SESION = 'roca_sesion'

export async function iniciarSesion(usuarioOMail, password) {
    const usuario = await buscarConPassword(usuarioOMail)

    if (!usuario || usuario.password !== password) {
        throw new Error('Usuario o contraseña incorrectos.')
    }

    if (!usuario.activo) {
        throw new Error(
            'Tu cuenta está desactivada. Consultá con la vicedirección.'
        )
    }

    await registrarUltimoAcceso(usuario.id)

    const sesion = {
        id: usuario.id,
        nombre: usuario.nombre,
        usuario: usuario.usuario,
        rol: usuario.rol,
        grado: usuario.grado,
    }

    localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion))
    return sesion
}

export function obtenerSesion() {
    const sesionGuardada = localStorage.getItem(CLAVE_SESION)
    return sesionGuardada ? JSON.parse(sesionGuardada) : null
}

export async function cerrarSesion() {
    localStorage.removeItem(CLAVE_SESION)
}