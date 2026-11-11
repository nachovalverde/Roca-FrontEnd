import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { formatearFecha } from '../../utils/formatearFecha'
import { nombreCompleto } from '../utils/personas'

// Datos del padre o de la madre, según quién figure como tutor del alumno
function datosDelTutor(inscripcion) {
  const clave = inscripcion.alumno.tutor === 'Padre' ? 'padre' : 'madre'
  return inscripcion[clave]
}

function FilaAlumno({ inscripcion, onEliminar }) {
  const { alumno } = inscripcion
  const tutor = datosDelTutor(inscripcion)

  return (
    <tr>
      <td>
        <Link to={`/inscripciones/${inscripcion.id}`} className="fw-semibold">
          {nombreCompleto(alumno)}
        </Link>
      </td>
      <td className="d-none d-sm-table-cell">{alumno.dni}</td>
      <td>{alumno.grado}</td>
      <td className="d-none d-lg-table-cell">{nombreCompleto(tutor) || '—'}</td>
      <td className="d-none d-md-table-cell">{tutor.telefono || '—'}</td>
      <td className="d-none d-lg-table-cell">{formatearFecha(inscripcion.creadaEl)}</td>
      <td>
        {/* En el celular los botones pasan uno debajo del otro, así la tabla entra sin deslizarse */}
        <div className="d-flex flex-wrap justify-content-end gap-2">
          <Button
            as={Link}
            to={`/inscripciones/${inscripcion.id}/editar`}
            variant="outline-primary"
            aria-label={`Editar la inscripción de ${nombreCompleto(alumno)}`}
          >
            Editar
          </Button>
          <Button
            variant="outline-danger"
            aria-label={`Eliminar la inscripción de ${nombreCompleto(alumno)}`}
            onClick={() => onEliminar(inscripcion)}
          >
            Eliminar
          </Button>
        </div>
      </td>
    </tr>
  )
}

export default FilaAlumno
