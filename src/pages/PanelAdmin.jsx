import { Link } from 'react-router-dom'
import { Card, Col, Container, Row } from 'react-bootstrap'


const ACCESOS_ADMIN = [
    {
        titulo: 'Inscripciones',
        texto: 'Consultar, filtrar y cargar fichas de inscripción.',
        ruta: '/docente',
    },
]

function PanelAdmin() {
    return (
        <Container className="py-5">
            <title>Panel de administración · Escuela Roca</title>
            <meta name="robots" content="noindex" />

            <h1>Panel de administracion</h1>
            <p className="text-secondary">
                Desde aca la vicedirectora puede acceder a las herramientas de administracion de la escuela.
            </p>

            <Row className="g-3 mt-2">
                {ACCESOS_ADMIN.map((acceso) => (
                    <Col md={4} key={acceso.ruta}>
                        <Card
                            as={Link}
                            to={acceso.ruta}
                            className="h-100 text-decoration-none"
                        >
                            <Card.Body>
                                <Card.Title as="h2" className="h5">
                                    {acceso.titulo}
                                </Card.Title>
                                <Card.Text className="text-body-secondary">
                                    {acceso.texto}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default PanelAdmin