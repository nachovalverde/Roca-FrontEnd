
const CLAVE = 'roca:inscripciones'

function leerTodas() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) ?? []
  } catch {
    return []
  }
}

function guardarTodas (inscrpciones) {
  localStorage.setItem(CLAVE, JSON.stringify(inscrpciones))
}

export async function listar() {
  return leerTodas()
}

export async function obtener(id) {
  const inscripcion = leerTodas().find((item) => item.id === id)
  if (!inscripcion) throw new Error('No se encuentra esa inscripción')
    return inscripcion
}

export async function crear(datos) {
  const ahora = new Date().toISOString()
  const nueva = {...datos, id: crypto.randomUUID(), creadaEl: ahora, actualizadaEl: ahora}
  guardarTodas([...leerTodas(), nueva])
  return nueva
}

export async function actualizar(id, datos) {
  const inscripciones = leerTodas()
  const anterior = inscripciones.find((item) => item.id === id)
  if (!anterior) throw new Error ('No se encuentra esa inscripción')

  const actualizada = {...anterior, ...datos, id, actualizadaEl: new Date().toISOString() }
  guardarTodas(inscripciones.map((item) => (item.id === id ? actualizada : item)))
  return actualizada
}

export async function eliminar(id) {
  guardarTodas (leerTodas().filter((item) => item.id !== id))
}