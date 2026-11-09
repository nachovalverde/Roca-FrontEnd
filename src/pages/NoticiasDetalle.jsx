import { useEffect, useState } from 'react'
import {
    Alert,
    Button,
    Container,
    Image,
    Spinner,
} from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import fachada from '../assets/Fachada.jpeg'
import { obtenerPublicada } from '../services/noticiasService'
import { formatearFecha } from '../utils/formatearFecha'

function NoticiasDetalle() {
    const { id } = useParams()

    const [resultado, setResultado] = useState(() => ({
        id,
        noticia: null,
        error: '',
        cargando: true,
    }))

    useEffect(() => {
        let vigente = true

        obtenerPublicada(id)
            .then((noticia) => {
                if (vigente) {
                    setResultado({
                        id,
                        noticia,
                        error: '',
                        cargando: false,
                    })
                }
            })
            .catch((errorCarga) => {
                if (vigente) {
                    setResultado({
                        id,
                        noticia: null,
                        error: errorCarga.message,
                        cargando: false,
                    })
                }
            })

        return () => {
            vigente = false
        }
    }, [id])

    const resultadoActual = resultado.id === id
    const cargando = !resultadoActual || resultado.cargando
    const noticia = resultadoActual ? resultado.noticia : null
    const error = resultadoActual ? resultado.error : ''

    if (cargando) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">
                        Cargando noticia
                    </span>
                </Spinner>
            </Container>
        )
    }

    if (error || !noticia) {
        return (
            <Container className="py-5">
                <title>Noticia no encontrada · Escuela Roca</title>
                <meta name="robots" content="noindex" />

                <Alert variant="warning">
                    {error || 'No encontramos esa noticia.'}
                </Alert>

                <Button as={Link} to="/" variant="primary">
                    Volver al inicio
                </Button>
            </Container>
        )
    }

    const parrafos = String(noticia.contenido ?? '')
        .split(/\r?\n/)
        .filter((parrafo) => parrafo.trim())

    return (
        <Container className="py-5">
            <title>{`${noticia.titulo} · Escuela Presidente Julio A. Roca`}</title>
            <meta name="description" content={noticia.descripcion} />

            <Button as={Link} to="/" variant="outline-primary" className="mb-4">
                Volver al inicio
            </Button>

            <article>
                <h1>{noticia.titulo}</h1>

                <p className="text-body-secondary">
                    {formatearFecha(noticia.fecha)} · {noticia.categoria}
                </p>

                <Image
                    src={noticia.imagen || fachada}
                    alt={noticia.titulo}
                    fluid
                    rounded
                    className="my-3"
                />

                <p className="text-secondary">{noticia.descripcion}</p>

                {parrafos.map((parrafo, indice) => (
                    <p key={`${noticia.id}-${indice}`}>{parrafo}</p>
                ))}
            </article>
        </Container>
    )
}

export default NoticiasDetalle