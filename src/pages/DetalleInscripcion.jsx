import { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Alert, Button, Card, Container, Spinner } from 'react-bootstrap'
import ResumenInscripcion from '../components/inscripciones/ResumenInscripcion'
import * as inscripcionesService from '../services/inscripcionesService'
import { formatearFecha } from '../utils/formatearFecha'
import FichaImprimible from '../components/inscripciones/FichaImprimible'
import { ESTILO_FICHA_IMPRESA } from '../components/inscripciones/estiloFichaImpresa'


function DetalleInscripcion() {
  const { id } = useParams()
  const location = useLocation()
  const recienGuardada = location.state?.recienGuardada

  const [inscripcion, setInscripcion] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState ('')

  const fichaRef = useRef(null)
  const imprimir = useReactToPrint({
    contentRef: fichaRef,
    // Es el nombre que propone el navegador al guardar el PDF
    documentTitle: inscripcion
      ? `Ficha ${inscripcion.alumno.apellidoNombres} ${inscripcion.alumno.cicloLectivo ?? ''}`.trim()
      : 'Ficha de inscripción',
    pageStyle: ESTILO_FICHA_IMPRESA,
  })

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

      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h1 className="h2 mb-1">{alumno.apellidoNombres}</h1>
          <p className="text-body-secondary mb-0">
            {alumno.grado} · Ciclo {alumno.cicloLectivo || '--'} · DNI {alumno.dni} 
          </p>
          <p className="small text-body-secondary mb-0">
            Cargada por {inscripcion.creadaPor?.nombre ?? '--'} el {formatearFecha(inscripcion.creadaEl)}
            {inscripcion.actualizadaPor && ` · Última edición: 
            ${inscripcion.actualizadaPor.nombre}, ${formatearFecha(inscripcion.actualizadaEl)}`}
          </p>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <Button variant="outline-secondary" onClick={() => imprimir()}>
            Imprimir o guardar PDF
          </Button>
          <Button as={Link} to={`/inscripciones/${id}/editar`} variant="outline-primary">
            Editar
          </Button>
        </div>
      </div>


      <Card>
        <Card.Body className="p-4">
          <ResumenInscripcion datos={inscripcion} />
        </Card.Body>
      </Card>

      {/* Oculta en pantalla: react-to-print copia su contenido a una ventana aparte para imprimir */}
      <div className="d-none">
        <FichaImprimible ref={fichaRef} inscripcion={inscripcion} />
      </div>

    </Container>
  )
}

export default DetalleInscripcion