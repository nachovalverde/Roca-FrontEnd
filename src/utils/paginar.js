// Devuelve la parte de la lista que corresponde a una página.

export function paginar(lista, pagina, porPagina) {
  const total = lista.length
  const totalPaginas = Math.max(1, Math.ceil(total / porPagina))
  // Si un filtro achicó la lista, la página no puede quedar más allá de la última
  const paginaActual = Math.min(Math.max(1, pagina), totalPaginas)
  const desde = (paginaActual - 1) * porPagina
  return {
    items: lista.slice(desde, desde + porPagina),
    total,
    pagina: paginaActual,
    totalPaginas,
    desde: total ? desde + 1 : 0,
    hasta: Math.min(desde + porPagina, total),
  }
}

// Números de página a mostrar: la primera, la última y las vecinas a la actual, con «…» en los saltos
export function paginasVisibles(pagina, totalPaginas) {
  const numeros = [...new Set([1, pagina - 1, pagina, pagina + 1, totalPaginas])]
    .filter((n) => n >= 1 && n <= totalPaginas)
    .sort((a, b) => a - b)
  return numeros.flatMap((n, i) => (i > 0 && n - numeros[i - 1] > 1 ? ['…', n] : [n]))
}