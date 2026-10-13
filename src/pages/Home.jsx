import { Container } from 'react-bootstrap'
import HeroInicio from '../components/noticias/HeroInicio'

function Home() {
    return (
        <>
            <HeroInicio
                titulo="Bienvenidos a nuestra comunidad educativa"
                subtitulo="Conoce las novedades, actividades y comunicados de la Escuela Presidente Julio Argentino Roca"
            />

            <section id="novedades" className="py-5">
                <Container>
                    <h2>Novedades de la escuela</h2>
                    <p className="text-secondary mb-0">
                        Proximamente vas a encontrar aca las novedades de la escuela.
                    </p>
                </Container>
            </section>
        </>
    )
}

export default Home