import { Card } from 'react-bootstrap'

function NoticiaCard({ noticia }) {
    return (
        <Card className="h-100 shadow sm">
            <Card.Img
                variant="top"
                src={noticia.imagen}
                alt={noticia.titulo}
                style={{ height: '220px', objectFit: 'cover' }}
            />

            <Card.Body>
                <Card.Subtitle className="mb-2 text-primary">
                    {noticia.categoria}
                </Card.Subtitle>

                <Card.Title>{noticia.titulo}</Card.Title>

                <Card.Text className="text-secundary">
                    {noticia.descripcion}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default NoticiaCard