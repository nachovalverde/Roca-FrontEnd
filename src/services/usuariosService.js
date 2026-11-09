import usuariosIniciales from '../data/usuarios'
import {
    EVENTOS,
    registrar as registrarAcceso,
} from './registroAccesosService'

const CLAVE = 'roca_usuarios'

function leerTodos() {
    try {
        const guardados = JSON.parse(localStorage.getItem(CLAVE))

        if (guardados) return guardados
    } catch {
        // Si el dato guardado está dañado, se inicializa con los usuarios de prueba.
    }

    localStorage.setItem(CLAVE, JSON.stringify(usuariosIniciales))
    return usuariosIniciales
}

function guardarTodos(usuarios) {
    localStorage.setItem(CLAVE, JSON.stringify(usuarios))
}

// Las páginas reciben la información del usuario sin su contraseña.
function sinPassword(usuario) {
    const copia = { ...usuario }
    delete copia.password
    return copia
}

function mismoTexto(a, b) {
    return String(a ?? '').trim().toLowerCase() === String(b ?? '').trim().toLowerCase()
}

function validarUnicos(usuarios, datos, idActual = null) {
    const otrosUsuarios = usuarios.filter((usuario) => usuario.id !== idActual)

    if (otrosUsuarios.some((usuario) => mismoTexto(usuario.usuario, datos.usuario))) {
        throw new Error('Ya existe una cuenta con ese nombre de usuario.')
    }

    if (datos.mail && otrosUsuarios.some((usuario) => mismoTexto(usuario.mail, datos.mail))) {
        throw new Error('Ya existe una cuenta con ese mail.')
    }
}

export async function listar() {
    return leerTodos().map(sinPassword)
}

// Solo lo usan los servicios de autenticación y recuperación.
export async function buscarConPassword(usuarioOMail) {
    return (
        leerTodos().find(
            (usuario) =>
                mismoTexto(usuario.usuario, usuarioOMail) ||
                mismoTexto(usuario.mail, usuarioOMail)
        ) ?? null
    )
}

export async function crear(datos, quienLoHace) {
    const usuarios = leerTodos()
    validarUnicos(usuarios, datos)

    const nuevo = {
        ...datos,
        id: Math.max(0, ...usuarios.map((usuario) => usuario.id)) + 1,
        grado: datos.rol === 'maestro' ? datos.grado : '',
        activo: true,
        creadoEl: new Date().toISOString(),
        ultimoAcceso: null,
    }

    guardarTodos([...usuarios, nuevo])

    await registrarAcceso({
        evento: EVENTOS.USUARIO_CREADO,
        usuario: quienLoHace,
        detalle: `Creó la cuenta ${nuevo.usuario}`,
    })

    return sinPassword(nuevo)
}

export async function actualizar(id, datos, quienLoHace) {
    const usuarios = leerTodos()
    const anterior = usuarios.find((usuario) => usuario.id === id)

    if (!anterior) {
        throw new Error('No encontramos esa cuenta.')
    }

    validarUnicos(usuarios, datos, id)

    const actualizado = {
        ...anterior,
        ...datos,
        password: datos.password ? datos.password : anterior.password,
        grado: datos.rol === 'maestro' ? datos.grado : '',
    }

    guardarTodos(
        usuarios.map((usuario) => (usuario.id === id ? actualizado : usuario))
    )

    const detallePassword = datos.password ? ' y su contraseña' : ''

    await registrarAcceso({
        evento: EVENTOS.USUARIO_EDITADO,
        usuario: quienLoHace,
        detalle: `Modificó la cuenta ${actualizado.usuario}${detallePassword}`,
    })

    return sinPassword(actualizado)
}

export async function cambiarEstado(id, activo, quienLoHace) {
    const usuarios = leerTodos()
    const usuario = usuarios.find((item) => item.id === id)

    if (!usuario) {
        throw new Error('No encontramos esa cuenta.')
    }

    if (!activo && id === quienLoHace?.id) {
        throw new Error('No podés desactivar tu propia cuenta.')
    }

    const vicedirectorasActivas = usuarios.filter(
        (item) => item.rol === 'vicedirectora' && item.activo
    )

    if (
        !activo &&
        usuario.rol === 'vicedirectora' &&
        vicedirectorasActivas.length === 1
    ) {
        throw new Error(
            'Tiene que quedar al menos una cuenta de vicedirección activa.'
        )
    }

    const actualizado = { ...usuario, activo }

    guardarTodos(
        usuarios.map((item) => (item.id === id ? actualizado : item))
    )

    await registrarAcceso({
        evento: activo
            ? EVENTOS.USUARIO_REACTIVADO
            : EVENTOS.USUARIO_DESACTIVADO,
        usuario: quienLoHace,
        detalle: `${activo ? 'Reactivó' : 'Desactivó'} la cuenta ${actualizado.usuario}`,
    })

    return sinPassword(actualizado)
}

export async function registrarUltimoAcceso(id) {
    const usuarios = leerTodos().map((usuario) =>
        usuario.id === id
            ? { ...usuario, ultimoAcceso: new Date().toISOString() }
            : usuario
    )

    guardarTodos(usuarios)
}

// La usa la recuperación de contraseña.
export async function cambiarPassword(id, nuevaPassword) {
    const usuarios = leerTodos().map((usuario) =>
        usuario.id === id
            ? { ...usuario, password: nuevaPassword }
            : usuario
    )

    guardarTodos(usuarios)
}