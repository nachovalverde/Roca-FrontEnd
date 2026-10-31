import { Card, Col, Container, Row } from 'react-bootstrap'

function Institucional() {
    return (
        <Container className="py-5">
            <title>Institucional · Escuela Presidente Julio A. Roca</title>
            <meta
                name="description"
                content="Conocé la Escuela Presidente Julio Argentino Roca: niveles, dirección en España 507, teléfonos y correo de contacto."
            />

            <header className="mb-4">
                <p className="text-primary fw-semibold mb-2">
                    Nuestra escuela
                </p>
                <h1>Escuela Presidente Julio Argentino Roca</h1>
                <p className="lead text-secondary mb-0">
                    Nivel Inicial y Primario · Sector Estatal
                </p>
            </header>

            <Row className="g-4">
                <Col md={7}>
                    <Card className="h-100">
                        <Card.Body>
                            <Card.Title>Información institucional</Card.Title>
                            <p className="text-secondary">
                                CUE: 900076300 - Anexo: 00
                            </p>
                            <p className="text-secondary mb-0">
                                Zona de supervisión N.º 1 · Primaria · Capital
                            </p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={5}>
                    <Card className="h-100">
                        <Card.Body>
                            <Card.Title>Contacto</Card.Title>
                            <address className="text-secondary mb-0">
                                España 507 <br />
                                San Miguel de Tucumán, Tucumán <br />
                                Código postal T4000
                            </address>

                            <p className="mt-3 mb-2">
                                <a href="tel:03814216059">0381 421-6059</a>
                            </p>

                            <a href="mailto:rocaporsiempre@yahoo.com.ar">
                                rocaporsiempre@yahoo.com.ar
                            </a>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    ) 
}

export default Institucional