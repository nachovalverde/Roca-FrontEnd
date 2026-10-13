import { Alert, Button, Container, Image } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import noticias from '../data/noticias'

function NoticiasDetalle() {
    const { id } = useParams()
    const noticia = noticias.find((item) => String(item.id) === id)

    if (!noticia) {
        return (
            <Container className="py-5">
                <Alert variant="warning">No se encontro esa noticia.</Alert>
                <Button as={Link} to="/" variant="primary">
                    Volver al inicio
                </Button>
            </Container>
        )
    }

    return (
        <Container className="py-5">
            <Button as={Link} to="/" variant="outline-primary" className="mb-4">
                Volver al inicio
            </Button>

            <article>
                <p className="text-primary fw-semibold">{noticia.categoria}</p>
                <h1>{noticia.titulo}</h1>

                <Image
                    src={noticia.imagen}
                    alt={noticia.titulo}
                    fluid
                    rounded
                    className="my-3"
                />

                <p className="text-secondary">{noticia.descripcion}</p>
            </article>
        </Container>
    )
}

export default NoticiasDetalle