import { inscripcionVacia } from '../data/inscripcionVacia'

// Guarda lo que se está cargando en una inscripción nueva, para no perderlo
// si se cierra la pestaña o se recarga la página. Es solo del navegador:
// nunca va a ir al backend, por eso estas funciones no son async.
const CLAVE = 'roca:borrador-inscripcion'

const estaVacio = (datos) => JSON.stringify(datos) === JSON.stringify(inscripcionVacia)

export function guardarBorrador(datos) {
  if (estaVacio(datos)) {
    localStorage.removeItem(CLAVE)
    return
  }
  localStorage.setItem(CLAVE, JSON.stringify({ datos, guardadoEl: new Date().toISOString() }))
}

export function leerBorrador() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE))
  } catch {
    return null
  }
}

export function borrarBorrador() {
  localStorage.removeItem(CLAVE)
}
