// convierte las fechas al formato '10/05/2026', asi la podemos usar sin problemas

export function formatearFecha(fechaISO) {
    if (!fechaISO) return ''
    const [anio, mes, dia] =fechaISO.slice(0,10).split('-')
    return `${dia}/${mes}/${anio}`
}