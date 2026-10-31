import axios from 'axios'

// La URL sale del .env: nunca se escribe en los componentes
const API_URL = import.meta.env.VITE_GEOREF_URL
const DIAS_GUARDADO = 7
const UN_DIA = 24 * 60 * 60 * 1000

// Pedidos en curso: si el mismo dato se pide dos veces seguidas (React lo hace en desarrollo), sale un solo pedido
const enCurso = new Map()

function leerGuardado(clave) {
  try {
    const guardado = JSON.parse(localStorage.getItem(clave))
    if (guardado && Date.now() - guardado.fecha < DIAS_GUARDADO * UN_DIA) return guardado.datos
  } catch {
    // Si el dato está roto, se vuelve a pedir
  }
  return null
}

function guardar(clave, datos) {
  try {
    localStorage.setItem(clave, JSON.stringify({ fecha: Date.now(), datos }))
  } catch {
    // Sin lugar en el navegador: se usan igual, solo que no quedan guardados
  }
}

// Un mensaje que explique qué pasó, en vez del error técnico de axios
function mensajeDeError(error) {
  if (error.response?.status === 429) {
    return 'El servicio del Gobierno recibió demasiadas consultas. Esperá unos minutos o escribí el lugar a mano.'
  }
  if (!error.response) {
    return 'No hay conexión con el servicio de provincias. Revisá internet o escribí el lugar a mano.'
  }
  return 'El servicio de provincias no respondió bien. Mientras tanto, podés escribir el lugar a mano.'
}

// Provincias y localidades casi no cambian: se guardan 7 días en el navegador y se piden una sola vez
function pedirConGuardado(clave, pedir) {
  const guardado = leerGuardado(clave)
  if (guardado) return Promise.resolve(guardado)

  if (!enCurso.has(clave)) {
    const pedido = pedir()
      .then((datos) => {
        guardar(clave, datos)
        return datos
      })
      .catch((error) => {
        throw new Error(mensajeDeError(error))
      })
      .finally(() => enCurso.delete(clave))
    enCurso.set(clave, pedido)
  }
  return enCurso.get(clave)
}

// Devuelve [{ id: '90', nombre: 'Tucumán' }, ...] ordenadas por nombre
export async function listarProvincias() {
  return pedirConGuardado('roca_georef_provincias', async () => {
    const response = await axios.get(`${API_URL}/provincias`, {
      params: { campos: 'id,nombre', orden: 'nombre', max: 30 },
      timeout: 8000,
    })
    return response.data.provincias
  })
}

// Devuelve los nombres de las localidades de una provincia
export async function listarLocalidades(provinciaId) {
  return pedirConGuardado(`roca_georef_localidades_${provinciaId}`, async () => {
    const response = await axios.get(`${API_URL}/localidades`, {
      params: { provincia: provinciaId, campos: 'id,nombre', orden: 'nombre', max: 1000 },
      timeout: 8000,
    })
    return [...new Set(response.data.localidades.map((localidad) => localidad.nombre))]
  })
}
