import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function RutaProtegida({ rol, children }) {
    const { usuario } = useAuth()
    const location = useLocation()

    if (!usuario) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ desde: location.pathname }}
            />
        )
    }

    const rolesPermitidos = Array.isArray(rol) ? rol : [rol]

    if (rol && !rolesPermitidos.includes(usuario.rol)) {
        return <Navigate to="/" replace />
    }

    return children
}

export default RutaProtegida