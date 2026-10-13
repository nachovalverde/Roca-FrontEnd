import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NoticiaCard({ noticia }) {
    return (
        <Card className="h-100 shadow-sm">
            <Card.Img
                variant="top"
                src={noticia.imagen}
                alt={noticia.titulo}
                style={{ height: '220px', objectFit: 'cover' }}
            />

            <Card.Body className="d-flex flex-column">
                <Card.Subtitle className="mb-2 text-primary">
                    {noticia.categoria}
                </Card.Subtitle>

                <Card.Title>{noticia.titulo}</Card.Title>

                <Card.Text className="text-secondary">
                    {noticia.descripcion}
                </Card.Text>

                <Button
                    as={Link}
                    to={`/noticias/${noticia.id}`}
                    variant="primary"
                    className="mt-auto aling-self-start"
                >
                    Leer noticia
                </Button>
            </Card.Body>
        </Card>
    )
}

export default NoticiaCard