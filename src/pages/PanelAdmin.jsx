import { Container } from 'react-bootstrap'

function PanelAdmin() {
    return (
        <Container className="py-5">
            <h1>Panel de administración</h1>
            <p className="text-secondary">
                Desde aca la vicedirectora podra gestionar las noticias y las cuentas
                de los maestros.
            </p>
        </Container>
    )
}

export default PanelAdmin