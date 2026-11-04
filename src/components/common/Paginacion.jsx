import { Pagination } from 'react-bootstrap'
import { paginasVisibles } from '../../utils/paginar'

// Recibe lo que devuelve paginar() y avisa con onCambiar(numeroDePagina).
// idInicio: el id del título o la tabla; al cambiar de página la vista vuelve ahí (en el celular, si no, queda abajo).
function Paginacion({ pagina, totalPaginas, total, desde, hasta, onCambiar, nombre = 'resultados', nombreSingular = nombre, idInicio }) {
  if (total === 0) return null

  const irA = (numero) => {
    onCambiar(numero)
    if (idInicio) document.getElementById(idInicio)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-3">
      <p className="small text-body-secondary mb-0" aria-live="polite">
        {/* Si entra en una página, solo la cantidad; si no, qué tramo se está viendo */}
        {totalPaginas === 1
          ? `${total} ${total === 1 ? nombreSingular : nombre}`
          : `${desde} a ${hasta} de ${total} ${nombre}`}
      </p>
      {totalPaginas > 1 && (
        <Pagination className="mb-0" aria-label={`Páginas de ${nombre}`}>
          {/* Flechas y puntos propios: los de React Bootstrap traen textos ocultos en inglés («Previous», «Next», «More») */}
          <Pagination.Item disabled={pagina === 1} onClick={() => irA(pagina - 1)}>
            <span aria-hidden="true">‹</span>
            <span className="visually-hidden">Página anterior</span>
          </Pagination.Item>
          {/* En el celular, solo «Página X de Y»; desde tablet, los números */}
          <Pagination.Item disabled className="d-sm-none">Página {pagina} de {totalPaginas}</Pagination.Item>
          {paginasVisibles(pagina, totalPaginas).map((numero, indice) =>
            numero === '…' ? (
              <Pagination.Item key={`salto-${indice}`} disabled className="d-none d-sm-block">
                <span aria-hidden="true">…</span>
              </Pagination.Item>
            ) : (
              <Pagination.Item key={numero} active={numero === pagina} activeLabel="(página actual)" onClick={() => irA(numero)} className="d-none d-sm-block">
                {numero}
              </Pagination.Item>
            )
          )}
          <Pagination.Item disabled={pagina === totalPaginas} onClick={() => irA(pagina + 1)}>
            <span aria-hidden="true">›</span>
            <span className="visually-hidden">Página siguiente</span>
          </Pagination.Item>
        </Pagination>
      )}
    </div>
  )
}

export default Paginacion