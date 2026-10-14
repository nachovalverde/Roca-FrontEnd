import usuariosIniciales from '../data/usuarios'

const CLAVE_USUARIOS = 'roca_usuarios'
const CLAVE_SESION = 'roca_sesion'

function obtenerUsuarios() {
  const usuariosGuardados = localStorage.getItem(CLAVE_USUARIOS)

  if (usuariosGuardados) {
    return JSON.parse(usuariosGuardados)
  }

  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuariosIniciales))
  return usuariosIniciales
}

export function iniciarSesion(nombreUsuario, password) {
  const usuarioEncontrado = obtenerUsuarios().find(
    (usuario) =>
      usuario.usuario === nombreUsuario &&
      usuario.password === password &&
      usuario.activo
  )

  if (!usuarioEncontrado) {
    throw new Error('Usuario o contraseña incorrectos.')
  }

  const sesion = {
    id: usuarioEncontrado.id,
    nombre: usuarioEncontrado.nombre,
    usuario: usuarioEncontrado.usuario,
    rol: usuarioEncontrado.rol,
    grado: usuarioEncontrado.grado,
  }

  localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion))
  return sesion
}

export function obtenerSesion() {
  const sesionGuardada = localStorage.getItem(CLAVE_SESION)
  return sesionGuardada ? JSON.parse(sesionGuardada) : null
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION)
}