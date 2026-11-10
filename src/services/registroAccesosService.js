import { guardarEnNavegador } from '../utils/almacenamiento'

const CLAVE = 'roca_registro_accesos'
const MAXIMO = 500

export const EVENTOS = {
    INGRESO: 'Ingreso',
    INGRESO_FALLIDO: 'Intento fallido',
    SALIDA: 'Salida',
    RECUPERACION_SOLICITADA: 'Pidió recuperar la contraseña',
    CONTRASENA_CAMBIADA: 'Cambió la contraseña',
    USUARIO_CREADO: 'Alta de cuenta',
    USUARIO_EDITADO: 'Modificación de cuenta',
    USUARIO_DESACTIVADO: 'Baja de cuenta',
    USUARIO_REACTIVADO: 'Reactivación de cuenta',
}

function leer() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE)) ?? []
    } catch {
        return []
    }
}

export async function registrar({
    evento,
    usuario = null,
    nombreIngresado = '',
    detalle = '',
}) {
    const entrada = {
        id: crypto.randomUUID(),
        fecha: new Date().toISOString(),
        evento,
        usuarioId: usuario?.id ?? null,
        usuario: usuario?.usuario ?? nombreIngresado,
        nombre: usuario?.nombre ?? '',
        rol: usuario?.rol ?? '',
        detalle,
    }

    const registrosActualizados = [entrada, ...leer()].slice(0, MAXIMO)
    guardarEnNavegador(CLAVE, JSON.stringify(registrosActualizados))

    return entrada
}

export async function listar() {
    return leer()
}