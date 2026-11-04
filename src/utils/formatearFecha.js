// Convierte las fechas al formato '10/05/2026'.
// Acepta una fecha sola ('2026-05-10') o con hora ('2026-11-04T02:30:00Z').
// Con hora, se pasa primero a la hora local: si no, una inscripción cargada
// a las 23 h en Tucumán aparecería con la fecha del día siguiente (hora universal).
export function formatearFecha(fechaISO) {
  if (!fechaISO) return ''
  const soloFecha = fechaISO.length > 10 ? new Date(fechaISO).toLocaleDateString('en-CA') : fechaISO
  const [anio, mes, dia] = soloFecha.split('-')
  return `${dia}/${mes}/${anio}`
}