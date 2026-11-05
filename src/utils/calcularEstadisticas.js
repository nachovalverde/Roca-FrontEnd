import { GRADOS } from '../data/opcionesFicha'

export const SEXOS_ESTADISTICA = ['Femenino', 'Masculino', 'X']

function tienePlanSocial(inscripcion) {
  const tutor = inscripcion.alumno.tutor === 'Padre' ? inscripcion.padre : inscripcion.madre
  return Boolean(tutor?.planSocial) && tutor.planSocial !== 'No'
}

// Lunes de la semana de una fecha, como '2026-10-26'
function inicioDeSemana(fechaISO) {
  const fecha = new Date(fechaISO)
  fecha.setDate(fecha.getDate() - ((fecha.getDay() + 6) % 7))
  const dosDigitos = (numero) => String(numero).padStart(2, '0')
  return `${fecha.getFullYear()}-${dosDigitos(fecha.getMonth() + 1)}-${dosDigitos(fecha.getDate())}`
}

export function calcularEstadisticas(inscripciones, { ciclo, cicloComparado = '', grado = '' }) {
  const delCiclo = (valor) =>
    inscripciones.filter((item) => item.alumno.cicloLectivo === valor && (!grado || item.alumno.grado === grado))

  const actuales = delCiclo(ciclo)
  const comparadas = cicloComparado ? delCiclo(cicloComparado) : []
  const total = actuales.length
  const porcentaje = (cantidad) => (total ? Math.round((cantidad * 100) / total) : 0)
  const haceSieteDias = Date.now() - 7 * 24 * 60 * 60 * 1000

  const porGrado = GRADOS.filter((valor) => !grado || valor === grado).map((valor) => {
    const delGrado = actuales.filter((item) => item.alumno.grado === valor)
    const fila = {
      grado: valor,
      total: delGrado.length,
      totalComparado: comparadas.filter((item) => item.alumno.grado === valor).length,
      repitentes: delGrado.filter((item) => item.alumno.repitente === 'Sí').length,
    }
    SEXOS_ESTADISTICA.forEach((sexo) => {
      fila[sexo] = delGrado.filter((item) => item.alumno.sexo === sexo).length
    })
    fila.sinDato = fila.total - SEXOS_ESTADISTICA.reduce((suma, sexo) => suma + fila[sexo], 0)
    return fila
  })

  const semanas = new Map()
  actuales.forEach((item) => {
    const semana = inicioDeSemana(item.creadaEl)
    semanas.set(semana, (semanas.get(semana) ?? 0) + 1)
  })
  const porSemana = [...semanas.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([semana, cantidad]) => ({ semana, cantidad }))

  return {
    total,
    totalComparado: comparadas.length,
    variacion: comparadas.length ? Math.round(((total - comparadas.length) * 100) / comparadas.length) : null,
    porcentajeRepitentes: porcentaje(actuales.filter((item) => item.alumno.repitente === 'Sí').length),
    ultimosSieteDias: actuales.filter((item) => new Date(item.creadaEl).getTime() >= haceSieteDias).length,
    porcentajePlanSocial: porcentaje(actuales.filter(tienePlanSocial).length),
    porGrado,
    porSemana,
  }
}