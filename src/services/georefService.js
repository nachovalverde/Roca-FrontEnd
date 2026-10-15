import axios from 'axios'

// La URL sale del .env: nunca se escribe en los componentes
const API_URL = import.meta.env.VITE_GEOREF_URL

// Devuelve [{ id: '90', nombre: 'Tucumán' }, ...] ordenadas por nombre
export async function listarProvincias() {
  const response = await axios.get(`${API_URL}/provincias`, {
    params: { campos: 'id,nombre', orden: 'nombre', max: 30 },
    timeout: 8000,
  })
  return response.data.provincias
}

// Devuelve los nombres de las localidades de las provincias
export async function listarLocalidades(provinciaId) {
  const response = await axios.get(`${API_URL}/localidades`, {
    params: { provincia: provinciaId, campos: 'id,nombre', orden: 'nombre', max: 1000 },
    timeout: 8000,
  })
  return [...new Set(response.data.localidades.map((localidad) => localidad.nombre))]
}