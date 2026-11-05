import { Button, Table } from 'react-bootstrap'
import { descargarCSV, fechaDeHoy } from '../../utils/exportarCSV'

function TablaResumenGrados({ datos, ciclo, cicloComparado, grado }) {
  const suma = (campo) => datos.reduce((total, fila) => total + fila[campo], 0)
  const columnas = [
    { titulo: 'Grado', valor: (fila) => fila.grado },
    { titulo: `Total ${ciclo}`, valor: (fila) => fila.total },
    ...(cicloComparado ? [{ titulo: `Total ${cicloComparado}`, valor: (fila) => fila.totalComparado }] : []),
    { titulo: 'Femenino', valor: (fila) => fila.Femenino },
    { titulo: 'Masculino', valor: (fila) => fila.Masculino },
    { titulo: 'X', valor: (fila) => fila.X },
    { titulo: 'Sin dato', valor: (fila) => fila.sinDato },
    { titulo: 'Repitentes', valor: (fila) => fila.repitentes },
  ]

  return (
    <>
      <div className="d-flex justify-content-end mb-2">
        <Button variant="outline-primary" size="sm" onClick={() => descargarCSV(`resumen-por-grado-${ciclo}-${grado || 'todos-los-grados'}-${fechaDeHoy()}.csv`, columnas, datos)}>
          Exportar a Excel (CSV)
        </Button>
      </div>
      <Table responsive hover className="align-middle mb-0 position-relative">
        <thead>
          <tr>
            {columnas.map((columna) => (
              <th key={columna.titulo} scope="col" className={columna.titulo === 'Grado' ? '' : 'text-end'}>{columna.titulo}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map((fila) => (
            <tr key={fila.grado}>
              {columnas.map((columna) => (
                <td key={columna.titulo} className={columna.titulo === 'Grado' ? 'fw-semibold' : 'text-end'}>{columna.valor(fila)}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="fw-bold">
            <td>Total</td>
            <td className="text-end">{suma('total')}</td>
            {cicloComparado && <td className="text-end">{suma('totalComparado')}</td>}
            <td className="text-end">{suma('Femenino')}</td>
            <td className="text-end">{suma('Masculino')}</td>
            <td className="text-end">{suma('X')}</td>
            <td className="text-end">{suma('sinDato')}</td>
            <td className="text-end">{suma('repitentes')}</td>
          </tr>
        </tfoot>
      </Table>
    </>
  )
}

export default TablaResumenGrados