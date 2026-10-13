import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import fachada from '../../assets/Fachada.jpeg'

function HeroInicio({ titulo, subtitulo }) {
    return (
        <section className="bg-primary text-white py-5">
            <Container>
                <Row className="align-items-center g-4">
                    <Col lg={6}>
                        <p className="text-uppercase fw-semibold mb-2">
                            Escuela Presidente Julio Argentino Roca
                        </p>

                        <h1 className="display-5 fw-bold">{titulo}</h1>

                        <p className="lead mb-4">{subtitulo}</p>

                        <Button href="#novedades" variant="light">
                            Ver novedades
                        </Button>
                    </Col>

                    <Col lg={6}>
                        <Image
                            src={fachada}
                            alt="Fachada de la Escuela Presidente Julio Argentino Roca"
                            fluid
                            rounded
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default HeroInicio