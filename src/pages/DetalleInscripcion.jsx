import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Container, Card, Alert, Spinner } from 'react-bootstrap'
import ResumenInscripcion from '../components/inscripciones/ResumenInscripcion'
import * as inscripcionesService from '../services/inscripcionesService'
import { formatearFecha } from '../utils/formatearFecha'

function DetalleInscripcion() {
  const { id } = useParams()
  const location = useLocation()
  const recienGuardada = location.state?.recienGuardada

  const [inscripcion, setInscripcion] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState ('')

  //Se ejecuta al entrar y cada vez que cambia el id de la URL

  useEffect(() => {
    const cargar = async () => {
      try {
        setInscripcion(await inscripcionesService.obtener(id))
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [id])

  if (cargando) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando Inscripción</span>
        </Spinner>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-4">
        <title>Inscripción no encontrada en la Escuela Roca</title>
        <Alert variant="warning">
          {error}. Puede que se haya borrado o que el enlace esté incompleto.
        </Alert>
        <Link to="/docente">Volver al panel</Link>
      </Container>
    )
  }

  const { alumno } = inscripcion

  return (
    <Container className="py-4">
      <title>{`${alumno.apellidoNombres} - Inscripcion - Escuela Roca`}</title>
      <meta name="robots" content="noindex" />


      <Link to="/docente" className="d-inline-block mb-3">
        Volver al panel
      </Link>

      {recienGuardada && <Alert variant="success">La inscripción se guardó correctamente.</Alert>}

      <h1 className="h2 mb-1">{alumno.apellidoNombres}</h1>
      <p className="text-body-secondary mb-4">
        {alumno.grado} · DNI {alumno.dni} · cargada el {formatearFecha(inscripcion.creadaEl)}
      </p>

      <Card>
        <Card.Body className="p-4">
          <ResumenInscripcion datos={inscripcion} />
        </Card.Body>
      </Card>

    </Container>
  )
}

export default DetalleInscripcion