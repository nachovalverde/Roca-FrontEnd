import { Col, Container, Row } from 'react-bootstrap'
import HeroInicio from '../components/noticias/HeroInicio'
import NoticiaCard from '../components/noticias/NoticiaCard'

const noticias = [
  {
    id: 1,
    categoria: 'Comunicado',
    titulo: 'Inicio de clases',
    descripcion: 'Compartimos información importante para las familias de nuestra comunidad.',
    imagen: '/src/assets/Fachada.jpeg',
  },
  {
    id: 2,
    categoria: 'Actividad',
    titulo: 'Actividades escolares',
    descripcion: 'Conocé algunas de las actividades realizadas en nuestra escuela.',
    imagen: '/src/assets/Fachada.jpeg',
  },
  {
    id: 3,
    categoria: 'Novedad',
    titulo: 'Nuestra comunidad educativa',
    descripcion: 'Seguimos construyendo juntos una escuela abierta a las familias.',
    imagen: '/src/assets/Fachada.jpeg',
  },
]

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