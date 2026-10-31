import { Col, Container, Row } from 'react-bootstrap'

function Footer() {
    return (
        <footer className="bg-primary text-white py-4 mt-auto">
            <Container>
                <Row className="align-items-start g-4">
                    <Col md={4}>
                        <h2 className="small fw-semibold mb-1">
                            Escuela Presidente Julio Argentino Roca
                        </h2>
                        <p className="small text-white mb-0">
                            Nivel Inicial y Primario · Sector Estatal
                        </p>
                    </Col>

                    <Col md={8}>
                        <Row className="g-3">
                            <Col sm={6} lg={5}>
                                <h3 className="small fw-semibold mb-1">Dirección</h3>
                                <address className="small mb-0">
                                    España 507
                                    <br />
                                    San Miguel de Tucumán, Tucumán (C.P. T4000)
                                </address>
                            </Col>

                            <Col sm={6} lg={3}>
                                <h3 className="small fw-semibold mb-1">Teléfono</h3>
                                <a className="small text-white" href="tel:+543814216059">
                                    0381 421-6059
                                </a>
                            </Col>

                            <Col sm={12} lg={4}>
                                <h3 className="small fw-semibold mb-1">
                                    Correo electrónico
                                </h3>
                                <a
                                    className="small text-break text-white"
                                    href="mailto:rocaporsiempre@yahoo.com.ar"
                                >
                                    rocaporsiempre@yahoo.com.ar
                                </a>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer