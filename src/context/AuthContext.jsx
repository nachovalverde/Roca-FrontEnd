import { createContext, useContext, useEffect, useState } from 'react'
import {
  cerrarSesion as cerrarSesionService,
  iniciarSesion as iniciarSesionService,
  obtenerSesion,
} from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    setUsuario(obtenerSesion())
    setCargando(false)
  }, [])

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
    <AuthContext.Provider value={{ usuario, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const contexto = useContext(AuthContext)

  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de AuthProvider.')
  }

  return contexto
}