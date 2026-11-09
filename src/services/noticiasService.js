import noticiasIniciales from '../data/noticias'

const CLAVE = 'roca_noticias'
const UN_DIA = 24 * 60 * 60 * 1000

function leerTodas() {
    try {
        const guardadas = JSON.parse(localStorage.getItem(CLAVE))

        if (guardadas) return guardadas
    } catch {
        // Si el dato está dañado, se usan las noticias de ejemplo.
    }

    // La imagen importada por Vite no se guarda: su ruta puede cambiar en cada build.
    const iniciales = noticiasIniciales.map((noticia, indice) => ({
        ...noticia,
        imagen: '',
        contenido: noticia.contenido ?? noticia.descripcion,
        fecha: new Date(Date.now() - indice * UN_DIA).toISOString(),
        publicada: true,
        autor: {
            id: 1,
            nombre: 'Vicedirectora',
        },
    }))

    localStorage.setItem(CLAVE, JSON.stringify(iniciales))
    return iniciales
}

function guardarTodas(noticias) {
    localStorage.setItem(CLAVE, JSON.stringify(noticias))
}

const masNuevaPrimero = (a, b) => b.fecha.localeCompare(a.fecha)
const mismoId = (a, b) => String(a) === String(b)

export async function listar() {
    return [...leerTodas()].sort(masNuevaPrimero)
}

export async function listarPublicadas() {
    const noticias = await listar()
    return noticias.filter((noticia) => noticia.publicada)
}

export async function obtenerPublicada(id) {
    const noticia = leerTodas().find(
        (item) => mismoId(item.id, id) && item.publicada
    )

    if (!noticia) {
        throw new Error('No encontramos esa noticia.')
    }

    return noticia
}

export async function crear(datos, autor) {
    const nueva = {
        ...datos,
        id: crypto.randomUUID(),
        fecha: new Date().toISOString(),
        autor: {
            id: autor.id,
            nombre: autor.nombre,
        },
    }

    guardarTodas([...leerTodas(), nueva])
    return nueva
}

export async function actualizar(id, datos) {
    const noticias = leerTodas()
    const anterior = noticias.find((item) => mismoId(item.id, id))

    if (!anterior) {
        throw new Error('No encontramos esa noticia.')
    }

    const actualizada = {
        ...anterior,
        ...datos,
        id: anterior.id,
    }

    guardarTodas(
        noticias.map((item) =>
            mismoId(item.id, id) ? actualizada : item
        )
    )

    return actualizada
}

export async function cambiarPublicacion(id, publicada) {
    return actualizar(id, { publicada })
}

export async function eliminar(id) {
    const noticias = leerTodas().filter((item) => !mismoId(item.id, id))
    guardarTodas(noticias)
}