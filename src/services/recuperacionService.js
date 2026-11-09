import {
    buscarConPassword,
    cambiarPassword,
} from './usuariosService'
import {
    EVENTOS,
    registrar,
} from './registroAccesosService'

const CLAVE = 'roca_recuperacion'
const MINUTOS_DE_VALIDEZ = 15
const INTENTOS_MAXIMOS = 3

function leerPendientes() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE)) ?? {}
    } catch {
        return {}
    }
}

function guardarPendientes(pendientes) {
    localStorage.setItem(CLAVE, JSON.stringify(pendientes))
}

export function enmascararMail(mail) {
    const [nombre, dominio] = String(mail ?? '').split('@')

    if (!nombre || !dominio) return 'tu mail'

    const asteriscos = '*'.repeat(Math.max(nombre.length - 1, 3))
    return `${nombre[0]}${asteriscos}@${dominio}`
}

export async function solicitarCodigo(usuarioOMail) {
    const usuario = await buscarConPassword(usuarioOMail)

    // Se responde igual si la cuenta no existe o está desactivada.
    if (!usuario || !usuario.activo) {
        return {
            codigoDemo: null,
            mailOculto: null,
        }
    }

    const codigo = String(
        Math.floor(100000 + Math.random() * 900000)
    )

    const pendientes = leerPendientes()

    // Una nueva solicitud reemplaza al código anterior.
    pendientes[usuario.id] = {
        codigo,
        venceEl: Date.now() + MINUTOS_DE_VALIDEZ * 60 * 1000,
        intentos: 0,
    }

    guardarPendientes(pendientes)

    await registrar({
        evento: EVENTOS.RECUPERACION_SOLICITADA,
        usuario,
    })

    return {
        codigoDemo: codigo,
        mailOculto: enmascararMail(usuario.mail),
    }
}

export async function restablecer(
    usuarioOMail,
    codigo,
    nuevaPassword
) {
    const usuario = await buscarConPassword(usuarioOMail)
    const pendientes = leerPendientes()
    const pendiente = usuario ? pendientes[usuario.id] : null

    if (!pendiente) {
        throw new Error('El código no es válido. Pedí uno nuevo.')
    }

    if (Date.now() >= pendiente.venceEl) {
        delete pendientes[usuario.id]
        guardarPendientes(pendientes)
        throw new Error('El código venció. Pedí uno nuevo.')
    }

    if (pendiente.codigo !== String(codigo).trim()) {
        pendiente.intentos += 1

        const agotado = pendiente.intentos >= INTENTOS_MAXIMOS

        if (agotado) {
            delete pendientes[usuario.id]
        }

        guardarPendientes(pendientes)

        throw new Error(
            agotado
                ? 'Te equivocaste 3 veces. Pedí un código nuevo.'
                : 'El código no coincide.'
        )
    }

    await cambiarPassword(usuario.id, nuevaPassword)

    delete pendientes[usuario.id]
    guardarPendientes(pendientes)

    await registrar({
        evento: EVENTOS.CONTRASENA_CAMBIADA,
        usuario,
        detalle: 'Por recuperación',
    })
}