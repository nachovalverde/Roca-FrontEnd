// CSV que Excel en español abre bien: separador ";" y BOM para las tildes
function celda(valor) {
  const texto = String(valor ?? '')
  return /[;"\r\n]/.test(texto) ? `"${texto.replace(/"/g, '""')}"` : texto
}

export function armarCSV(columnas, filas) {
  const encabezado = columnas.map((columna) => celda(columna.titulo)).join(';')
  const lineas = filas.map((fila) => columnas.map((columna) => celda(columna.valor(fila))).join(';'))
  return [encabezado, ...lineas].join('\r\n')
}


export function fechaDeHoy() {
  return new Date().toLocaleDateString('en-CA')
}

export function descargarCSV(nombreArchivo, columnas, filas) {
  const contenido = '\uFEFF' + armarCSV(columnas, filas)
  const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const enlace = document.createElement('a')
  enlace.href = url
  enlace.download = nombreArchivo
  enlace.click()
  URL.revokeObjectURL(url)
}