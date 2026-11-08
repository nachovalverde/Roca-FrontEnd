import { useState } from 'react'
import AuthContext from './contextoAuth'
import {
    cerrarSesion as cerrarSesionService,
    iniciarSesion as iniciarSesionService,
    obtenerSesion,
} from '../services/authService'

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(obtenerSesion)

    async function login(usuarioOMail, password) {
        const usuarioAutenticado = await iniciarSesionService(
            usuarioOMail,
            password
        )
        setUsuario(usuarioAutenticado)
        return usuarioAutenticado
    }

    async function logout() {
        await cerrarSesionService()
        setUsuario(null)
    }

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}