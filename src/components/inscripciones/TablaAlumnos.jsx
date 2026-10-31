import { Table } from 'react-bootstrap'
import FilaAlumno from './FilaAlumno'

function TablaAlumnos({ inscripciones, onEliminar }) {
  return (
    <Table responsive hover className="align-middle position-relative">
      <caption className="visually-hidden">Alumnos inscriptos</caption>
      <thead>
        <tr>
          <th scope="col">Alumno</th>
          <th scope="col" className="d-none d-sm-table-cell">DNI</th>
          <th scope="col">Grado</th>
          <th scope="col" className="d-none d-lg-table-cell">Tutor</th>
          <th scope="col" className="d-none d-md-table-cell">Teléfono</th>
          <th scope="col" className="d-none d-lg-table-cell">Cargada</th>
          <th scope="col">
            <span className="visually-hidden">Acciones</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {inscripciones.map((inscripcion) => (
          <FilaAlumno key={inscripcion.id} inscripcion={inscripcion} onEliminar={onEliminar} />
        ))}
      </tbody>
    </Table>
  )
}

export default TablaAlumnos