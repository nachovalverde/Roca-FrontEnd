import { Container, Spinner } from 'react-bootstrap'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RutaProtegida({ rol, children }) {
    const { usuario, cargando } = useAuth()
    const location = useLocation()

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
        // Le pasa al login la página que quería abrir, para volver ahí después
        return <Navigate to="/login" replace state={{ desde: location.pathname }} />
    }

    const rolesPermitidos = Array.isArray(rol) ? rol : [rol]

    if (rol && !rolesPermitidos.includes(usuario.rol)) {
        return <Navigate to="/" replace />
    }

    return children
}

export default RutaProtegida
