import { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Container } from 'react-bootstrap'
import FormularioInscripcion from '../components/inscripciones/FormularioInscripcion'
import { inscripcionVacia } from '../data/inscripcionVacia'
import * as inscripcionesService from '../services/inscripcionesService'
import { borrarBorrador, guardarBorrador, leerBorrador } from '../services/borradorService'
import { useAuth } from '../context/useAuth'
import { mostrarError } from '../utils/alertas'

// '2026-10-15T14:30:00Z' → '15/10, 11:30'
function formatearMomento(fechaISO) {
  return new Date(fechaISO).toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function NuevaInscripcion() {
  const navigate = useNavigate()
  const { usuario } = useAuth()

  // El borrador se lee una sola vez, al entrar a la página
  const [borrador, setBorrador] = useState(() => leerBorrador())
  // Cambiar este número reinicia el formulario desde cero (es su key)
  const [reinicios, setReinicios] = useState(0)
    // Si el navegador no tiene lugar, el borrador deja de guardarse: se avisa, sin frenar la carga
  const [borradorFallo, setBorradorFallo] = useState(false)

  // useCallback: el formulario la usa en un useEffect, así que tiene que ser siempre la misma función
  const alCambiar = useCallback((datos) => {
    if (!guardarBorrador(datos)) setBorradorFallo(true)
  }, [])

  const empezarDeCero = () => {
    borrarBorrador()
    setBorrador(null)
    setReinicios((anterior) => anterior + 1)
  }

    const guardar = async (datos) => {
    try {
      const nueva = await inscripcionesService.crear(datos, usuario)
      borrarBorrador()
      navigate(`/inscripciones/${nueva.id}`, { state: { recienGuardada: true } })
      return true
    } catch (error) {
      // El borrador no se borra: la maestra no pierde lo que cargó
      mostrarError(error, 'No se pudo guardar la inscripción')
      return false
    }
  }

  return (
    <Container className="py-4">
      <title>Nueva inscripción · Escuela Roca</title>
      <meta name="robots" content="noindex" />

      <Link to="/docente" className="d-inline-block mb-3">
        Volver al panel
      </Link>
      <h1 className="h2 mb-4">Nueva inscripción</h1>

      {borrador && (
        <Alert variant="info" className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <span>Recuperamos lo que estabas cargando el {formatearMomento(borrador.guardadoEl)}.</span>
          <Button variant="outline-primary" size="sm" onClick={empezarDeCero}>
            Empezar de cero
          </Button>
        </Alert>
      )}

      {borradorFallo && (
        <Alert variant="warning">
          El borrador no se está guardando porque el almacenamiento del navegador está lleno. Podés seguir
          cargando, pero si cerrás la pestaña antes de guardar, se pierde lo cargado.
        </Alert>
      )}
      
      <FormularioInscripcion
        key={reinicios}
        inscripcionInicial={borrador?.datos ?? inscripcionVacia}
        onCambio={alCambiar}
        onGuardar={guardar}
      />
    </Container>
  )
}

export default NuevaInscripcion
