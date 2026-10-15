import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { formatearFecha } from '../../utils/formatearFecha'

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
          {alumno.apellidoNombres}
        </Link>
      </td>
      <td>{alumno.dni}</td>
      <td>{alumno.grado}</td>
      <td>{tutor.apellidoNombres || '—'}</td>
      <td>{tutor.telefonos || '—'}</td>
      <td>{formatearFecha(inscripcion.creadaEl)}</td>
      <td className="text-end text-nowrap">
        <Button
          as={Link}
          to={`/inscripciones/${inscripcion.id}/editar`}
          variant="outline-primary"
          size="sm"
          className="me-2"
          aria-label={`Editar la inscripción de ${alumno.apellidoNombres}`}
        >
          Editar
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          aria-label={`Eliminar la inscripción de ${alumno.apellidoNombres}`}
          onClick={() => onEliminar(inscripcion)}
        >
          Eliminar
        </Button>
      </td>
    </tr>
  )
}

export default FilaAlumno
