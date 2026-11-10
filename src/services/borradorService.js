import { inscripcionVacia } from '../data/inscripcionVacia'
import { guardarEnNavegador } from '../utils/almacenamiento'

// Guarda lo que se está cargando en una inscripción nueva, para no perderlo
// si se cierra la pestaña o se recarga la página. Es solo del navegador:
// nunca va a ir al backend, por eso estas funciones no son async.
const CLAVE = 'roca:borrador-inscripcion'

const estaVacio = (datos) => JSON.stringify(datos) === JSON.stringify(inscripcionVacia)

// Se llama mientras la maestra escribe: nunca tira un error, porque lo atraparía el límite
// de errores y se perdería lo cargado. Devuelve false si no pudo guardar.
export function guardarBorrador(datos) {
  try {
    if (estaVacio(datos)) {
      localStorage.removeItem(CLAVE)
    } else {
      guardarEnNavegador(CLAVE, JSON.stringify({ datos, guardadoEl: new Date().toISOString() }))
    }
    return true
  } catch {
    return false
  }
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
