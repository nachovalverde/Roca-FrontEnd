import { Link, useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import FormularioInscripcion from '../components/inscripciones/FormularioInscripcion'
import * as inscripcionesService from '../services/inscripcionesService'

function NuevaInscripcion () {
  const navigate = useNavigate()

  const guardar = async (datos) => {
    const nueva = await inscripcionesService.crear(datos)
    navigate(`/inscripciones/${nueva.id}`, {state: {recienGuardada: true } })
  }
  return (
    <Container className="py-4">
      <title>Nueva inscripcion en la Escuela Roca</title>
      <meta name="robots" content="noindex" />

      <Link to="/docente" className="d-inline-block mb-3">
        Volver al panel
      </Link>
      <h1 className="h2 mb-4">Nueva Inscripción</h1>

      <FormularioInscripcion onGuardar={guardar} />
    </Container>
  )
}

export default NuevaInscripcion