export function ciclosDisponibles(incripciones) {
  return [...new Set(incripciones.map((item) => item.alumno.cicloLectivo).filter(Boolean))].sort().reverse()
}