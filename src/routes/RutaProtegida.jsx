import { Container, Spinner } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RutaProtegida({ rol, children }) {
    const { usuario, cargando } = useAuth()

    if (cargando) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Verificando sesión...</span>
                </Spinner>
            </Container>
        )
    }

    if (!usuario) {
        return <Navigate to="/login" replace />
    }

    const rolesPermitidos = Array.isArray(rol) ? rol : [rol]

    if (rol && !rolesPermitidos.includes(usuario.rol)) {
        return <Navigate to="/" replace />
    }

    return children
}

export default RutaProtegida