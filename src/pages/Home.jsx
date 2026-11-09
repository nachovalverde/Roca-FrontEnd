import { useEffect, useState } from 'react'
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap'
import HeroInicio from '../components/noticias/HeroInicio'
import NoticiaCard from '../components/noticias/NoticiaCard'
import FiltroCategorias from '../components/noticias/FiltroCategorias'
import Paginacion from '../components/common/Paginacion'
import { listarPublicadas } from '../services/noticiasService'
import { paginar } from '../utils/paginar'

function Home() {
    const [noticias, setNoticias] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')
    const [categoriaActiva, setCategoriaActiva] = useState('Todas')
    const [pagina, setPagina] = useState(1)

    useEffect(() => {
        listarPublicadas()
            .then(setNoticias)
            .catch((errorCarga) => setError(errorCarga.message))
            .finally(() => setCargando(false))
    }, [])

    const noticiasFiltradas =
        categoriaActiva === 'Todas'
            ? noticias
            : noticias.filter(
                  (noticia) => noticia.categoria === categoriaActiva
              )

    const noticiasPaginadas = paginar(noticiasFiltradas, pagina, 6)

    function cambiarCategoria(categoria) {
        setCategoriaActiva(categoria)
        setPagina(1)
    }

    return (
        <>
            <title>Inicio · Escuela Presidente Julio A. Roca</title>
            <meta
                name="description"
                content="Novedades, comunicados y actividades de la Escuela Presidente Julio Argentino Roca, Nivel Inicial y Primario, en San Miguel de Tucumán."
            />

            <HeroInicio
                titulo="Bienvenidos a nuestra comunidad educativa"
                subtitulo="Conocé las novedades, actividades y comunicados de la Escuela Presidente Julio Argentino Roca"
            />

            <section id="novedades" className="py-5">
                <Container>
                    <h2 className="mb-4">Novedades de la escuela</h2>

                    <div className="mb-4">
                        <FiltroCategorias
                            activa={categoriaActiva}
                            onCambiar={cambiarCategoria}
                        />
                    </div>

                    {cargando ? (
                        <div className="py-5 text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">
                                    Cargando novedades
                                </span>
                            </Spinner>
                        </div>
                    ) : error ? (
                        <Alert variant="danger">
                            No se pudieron cargar las novedades: {error}
                        </Alert>
                    ) : noticiasFiltradas.length === 0 ? (
                        <Alert variant="light">
                            Todavía no hay novedades publicadas para esta
                            categoría.
                        </Alert>
                    ) : (
                        <>
                            <div id="lista-novedades" />

                            <Row className="g-4">
                                {noticiasPaginadas.items.map((noticia) => (
                                    <Col key={noticia.id} md={6} lg={4}>
                                        <NoticiaCard noticia={noticia} />
                                    </Col>
                                ))}
                            </Row>

                            <Paginacion
                                {...noticiasPaginadas}
                                onCambiar={setPagina}
                                nombre="noticias"
                                nombreSingular="noticia"
                                idInicio="lista-novedades"
                            />
                        </>
                    )}
                </Container>
            </section>
        </>
    )
}

export default Home