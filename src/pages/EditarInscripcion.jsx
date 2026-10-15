
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Alert, Container, Spinner } from 'react-bootstrap'
import FormularioInscripcion from '../components/inscripciones/FormularioInscripcion'
import * as inscripcionesService from '../services/inscripcionesService'

function EditarInscripcion() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [inscripcion, setInscripcion] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  // Se ejecuta al entrar y cada vez que cambia el id de la URL
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

  const guardar = async (datos) => {
    await inscripcionesService.actualizar(id, datos)
    navigate(`/inscripciones/${id}`, { state: { recienGuardada: true } })
  }

  if (cargando) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando inscripción</span>
        </Spinner>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-4">
        <title>Inscripción no encontrada · Escuela Roca</title>
        <Alert variant="warning">
          {error}. Puede que se haya borrado o que el enlace esté incompleto.
        </Alert>
        <Link to="/docente">Volver al panel</Link>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <title>{`Editar ${inscripcion.alumno.apellidoNombres} · Escuela Roca`}</title>
      <meta name="robots" content="noindex" />

      <Link to={`/inscripciones/${id}`} className="d-inline-block mb-3">
        Volver a la ficha
      </Link>
      <h1 className="h2 mb-4">Editar inscripción</h1>

      {/* Se arma recién cuando la inscripción llegó: useState toma el valor inicial una sola vez */}
      <FormularioInscripcion
        key={inscripcion.id}
        inscripcionInicial={inscripcion}
        onGuardar={guardar}
        textoGuardar="Guardar cambios"
      />
    </Container>
  )
}

export default EditarInscripcion