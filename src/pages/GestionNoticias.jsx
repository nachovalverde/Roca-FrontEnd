import { useEffect, useState } from 'react'
import {
    Button,
    Container,
    Row,
    Spinner,
} from 'react-bootstrap'
import Swal from 'sweetalert2'
import CampoSelect from '../components/common/CampoSelect'
import Paginacion from '../components/common/Paginacion'
import FormularioNoticia from '../components/admin/FormularioNoticia'
import TablaNoticias from '../components/admin/TablaNoticias'
import { useAuth } from '../context/useAuth'
import {
    actualizar,
    cambiarPublicacion as cambiarPublicacionServicio,
    crear,
    eliminar as eliminarServicio,
    listar,
} from '../services/noticiasService'
import { paginar } from '../utils/paginar'

const ESTADOS_PUBLICACION = ['Publicadas', 'Borradores', 'Todas']

function GestionNoticias() {
    const { usuario: usuarioActual } = useAuth()

    const [noticias, setNoticias] = useState([])
    const [cargando, setCargando] = useState(true)
    const [filtroPublicacion, setFiltroPublicacion] = useState('Todas')
    const [pagina, setPagina] = useState(1)
    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [noticiaEditando, setNoticiaEditando] = useState(null)

    useEffect(() => {
        listar()
            .then(setNoticias)
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'No se pudieron cargar las noticias',
                    text: error.message,
                    confirmButtonText: 'Entendido',
                })
            })
            .finally(() => setCargando(false))
    }, [])

    const noticiasVisibles = noticias.filter((noticia) => {
        if (filtroPublicacion === 'Publicadas') return noticia.publicada
        if (filtroPublicacion === 'Borradores') return !noticia.publicada

        return true
    })

    const noticiasPaginadas = paginar(noticiasVisibles, pagina, 10)

    function abrirFormularioNuevo() {
        setNoticiaEditando(null)
        setMostrarFormulario(true)
    }

    function abrirFormularioEdicion(noticia) {
        setNoticiaEditando(noticia)
        setMostrarFormulario(true)
    }

    function cerrarFormulario() {
        setMostrarFormulario(false)
        setNoticiaEditando(null)
    }

    async function recargarNoticias() {
        const lista = await listar()
        setNoticias(lista)
    }

    async function guardarNoticia(datos) {
        const esEdicion = Boolean(noticiaEditando)

        try {
            if (esEdicion) {
                await actualizar(noticiaEditando.id, datos)
            } else {
                await crear(datos, usuarioActual)
            }

            await recargarNoticias()
            cerrarFormulario()

            await Swal.fire({
                icon: 'success',
                title: esEdicion ? 'Noticia actualizada' : 'Noticia creada',
                timer: 1600,
                showConfirmButton: false,
            })
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'No se pudo guardar la noticia',
                text: error.message,
                confirmButtonText: 'Entendido',
            })
        }
    }

    async function manejarCambioPublicacion(id, publicada) {
        try {
            await cambiarPublicacionServicio(id, publicada)
            await recargarNoticias()

            await Swal.fire({
                icon: 'success',
                title: publicada ? 'Noticia publicada' : 'Noticia despublicada',
                timer: 1600,
                showConfirmButton: false,
            })
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'No se pudo cambiar la publicación',
                text: error.message,
                confirmButtonText: 'Entendido',
            })
        }
    }

    async function manejarEliminacion(id) {
        const noticia = noticias.find((item) => item.id === id)
        if (!noticia) return

        const confirmacion = await Swal.fire({
            icon: 'warning',
            title: '¿Eliminar esta noticia?',
            text: `Se eliminará “${noticia.titulo}”. Esta acción no se puede deshacer.`,
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        })

        if (!confirmacion.isConfirmed) return

        try {
            await eliminarServicio(id)
            await recargarNoticias()

            await Swal.fire({
                icon: 'success',
                title: 'Noticia eliminada',
                timer: 1600,
                showConfirmButton: false,
            })
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'No se pudo eliminar la noticia',
                text: error.message,
                confirmButtonText: 'Entendido',
            })
        }
    }

    function cambiarFiltro(campo, valor) {
        if (campo === 'publicacion') {
            setFiltroPublicacion(valor)
            setPagina(1)
        }
    }

    return (
        <Container className="py-5">
            <title>Gestión de noticias · Escuela Roca</title>
            <meta name="robots" content="noindex" />

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div>
                    <h1>Gestión de noticias</h1>
                    <p className="text-body-secondary mb-0">
                        Publicá y administrá las novedades de la escuela.
                    </p>
                </div>

                <Button type="button" onClick={abrirFormularioNuevo}>
                    Nueva noticia
                </Button>
            </div>

            <Row className="g-3 align-items-end mb-3">
                <CampoSelect
                    id="filtro-publicacion-noticias"
                    label="Mostrar"
                    name="publicacion"
                    value={filtroPublicacion}
                    onChange={cambiarFiltro}
                    opciones={ESTADOS_PUBLICACION}
                    md={4}
                />
            </Row>

            {cargando ? (
                <div className="py-5 text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">
                            Cargando noticias
                        </span>
                    </Spinner>
                </div>
            ) : (
                <>
                    <div id="lista-noticias-admin" />

                    <TablaNoticias
                        noticias={noticiasPaginadas.items}
                        onEditar={abrirFormularioEdicion}
                        onCambiarPublicacion={manejarCambioPublicacion}
                        onEliminar={manejarEliminacion}
                    />

                    <Paginacion
                        {...noticiasPaginadas}
                        onCambiar={setPagina}
                        nombre="noticias"
                        nombreSingular="noticia"
                        idInicio="lista-noticias-admin"
                    />
                </>
            )}

            {mostrarFormulario && (
                <FormularioNoticia
                    key={noticiaEditando?.id ?? 'nueva'}
                    noticiaInicial={noticiaEditando}
                    onGuardar={guardarNoticia}
                    onCancelar={cerrarFormulario}
                />
            )}
        </Container>
    )
}

export default GestionNoticias