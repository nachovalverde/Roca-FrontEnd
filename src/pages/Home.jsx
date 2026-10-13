import { Col, Container, Row } from 'react-bootstrap'
import HeroInicio from '../components/noticias/HeroInicio'
import NoticiaCard from '../components/noticias/NoticiaCard'
import noticias from '../data/noticias'

function Home() {
    return (
        <>
            <HeroInicio
                titulo="Bienvenidos a nuestra comunidad educativa"
                subtitulo="Conoce las novedades, actividades y comunicados de la Escuela Presidente Julio Argentino Roca"
            />

            <section id="novedades" className="py-5">
                <Container>
                    <h2 className="mb-4">Novedades de la escuela</h2>
                    
                    <Row className="g-8">
                        {noticias.map((noticia) => (
                            <Col key={noticia.id} md={6} lg={4}>
                                <NoticiaCard noticia={noticia} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Home