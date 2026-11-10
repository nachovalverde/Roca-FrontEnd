import {
    buscarConPassword,
    registrarUltimoAcceso,
} from './usuariosService'
import {
    EVENTOS,
    registrar as registrarAcceso,
} from './registroAccesosService'
import { guardarEnNavegador } from '../utils/almacenamiento'

const CLAVE_SESION = 'roca_sesion'

export async function iniciarSesion(usuarioOMail, password) {
    const usuario = await buscarConPassword(usuarioOMail)

    if (!usuario || usuario.password !== password) {
        await registrarAcceso({
            evento: EVENTOS.INGRESO_FALLIDO,
            usuario,
            nombreIngresado: usuarioOMail,
            detalle: usuario ? 'Contraseña incorrecta' : 'Usuario inexistente',
        })

        throw new Error('Usuario o contraseña incorrectos.')
    }

    if (!usuario.activo) {
        await registrarAcceso({
            evento: EVENTOS.INGRESO_FALLIDO,
            usuario,
            detalle: 'Cuenta desactivada',
        })

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

    guardarEnNavegador(CLAVE_SESION, JSON.stringify(sesion))

    await registrarAcceso({
        evento: EVENTOS.INGRESO,
        usuario,
    })

    return sesion
}

export function obtenerSesion() {
    const sesionGuardada = localStorage.getItem(CLAVE_SESION)
    return sesionGuardada ? JSON.parse(sesionGuardada) : null
}

export async function cerrarSesion() {
    const sesion = obtenerSesion()
    localStorage.removeItem(CLAVE_SESION)

    if (sesion) {
        await registrarAcceso({
            evento: EVENTOS.SALIDA,
            usuario: sesion,
        })
    }
}