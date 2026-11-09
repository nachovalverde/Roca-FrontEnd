import { CATEGORIAS_NOTICIAS } from '../data/categoriasNoticias'

export function validarNoticia(datos) {
    const errores = {}
    const titulo = String(datos.titulo ?? '').trim()
    const categoria = String(datos.categoria ?? '').trim()
    const descripcion = String(datos.descripcion ?? '').trim()
    const contenido = String(datos.contenido ?? '').trim()
    const imagen = String(datos.imagen ?? '').trim()

    if (titulo.length < 5 || titulo.length > 100) {
        errores.titulo = 'El título debe tener entre 5 y 100 caracteres.'
    }

    if (!CATEGORIAS_NOTICIAS.includes(categoria)) {
        errores.categoria = 'Elegí una categoría válida.'
    }

    if (!descripcion) {
        errores.descripcion = 'Completá el resumen.'
    } else if (descripcion.length > 200) {
        errores.descripcion = 'El resumen puede tener hasta 200 caracteres.'
    }

    if (!contenido) {
        errores.contenido = 'Completá el contenido de la noticia.'
    }

    if (imagen && !/^https:\/\//i.test(imagen)) {
        errores.imagen = 'La imagen debe tener una dirección que empiece con https://.'
    } else if (imagen) {
        try {
            new URL(imagen)
        } catch {
            errores.imagen = 'Ingresá una URL válida para la imagen.'
        }
    }

    return errores
}