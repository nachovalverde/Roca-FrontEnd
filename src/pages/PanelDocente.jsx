import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, Container, Spinner } from 'react-bootstrap'
import Swal from 'sweetalert2'
import FiltrosAlumnos from '../components/inscripciones/FiltrosAlumnos'
import TablaAlumnos from '../components/inscripciones/TablaAlumnos'
import { useAuth } from '../context/AuthContext'
import * as inscripcionesService from '../services/inscripcionesService'
import { normalizarTexto } from '../utils/normalizarTexto'

function textoCantidad(mostradas, total) {
  const palabra = total === 1 ? 'inscripción cargada' : 'inscripciones cargadas'
  if (mostradas === total) return `${total} ${palabra}`
  return `Mostrando ${mostradas} de ${total} ${palabra}`
}

function PanelDocente() {
  const { usuario } = useAuth()

  const [inscripciones, setInscripciones] = useState([])
  const [cargando, setCargando] = useState(true)
  // La maestra arranca viendo su grado; la vice, todos
  const [filtros, setFiltros] = useState({
    busqueda: '',
    grado: usuario?.rol === 'maestro' ? (usuario.grado ?? '') : '',
  })

  // Al entrar al panel, pide las inscripciones una sola vez
  useEffect(() => {
    inscripcionesService.listar().then((lista) => {
      setInscripciones(lista)
      setCargando(false)
    })
  }, [])

  const cambiarFiltro = (campo, valor) => {
    setFiltros((anterior) => ({ ...anterior, [campo]: valor }))
  }

  // Lo que muestra la tabla se calcula en cada render: no es estado
  const textoBuscado = normalizarTexto(filtros.busqueda)
  const inscripcionesVisibles = inscripciones
    .filter(({ alumno }) => {
      const coincideGrado = !filtros.grado || alumno.grado === filtros.grado
      const coincideTexto =
        !textoBuscado ||
        normalizarTexto(alumno.apellidoNombres).includes(textoBuscado) ||
        alumno.dni.includes(textoBuscado)
      return coincideGrado && coincideTexto
    })
    .sort((a, b) => b.creadaEl.localeCompare(a.creadaEl))

  const eliminarInscripcion = async (inscripcion) => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Eliminar la inscripción?',
      text: `Se va a borrar la inscripción de ${inscripcion.alumno.apellidoNombres}. No se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      focusCancel: true,
    })
    if (!isConfirmed) return

    await inscripcionesService.eliminar(inscripcion.id)
    setInscripciones((anterior) => anterior.filter((item) => item.id !== inscripcion.id))

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Inscripción eliminada',
      showConfirmButton: false,
      timer: 2000,
    })
  }

  let contenido
  if (cargando) {
    contenido = (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando inscripciones</span>
        </Spinner>
      </div>
    )
  } else if (inscripciones.length === 0) {
    contenido = (
      <Alert variant="light" className="border">
        Todavía no hay inscripciones cargadas. Empezá con{' '}
        <Link to="/inscripciones/nueva">Nueva inscripción</Link>.
      </Alert>
    )
  } else {
    contenido = (
      <>
        <FiltrosAlumnos filtros={filtros} onCambiar={cambiarFiltro} />
        {inscripcionesVisibles.length > 0 ? (
          <TablaAlumnos inscripciones={inscripcionesVisibles} onEliminar={eliminarInscripcion} />
        ) : (
          <p className="text-body-secondary py-4">
            Ninguna inscripción coincide con la búsqueda. Probá con otro nombre o con «Todos los grados».
          </p>
        )}
      </>
    )
  }

  return (
    <Container className="py-4">
      <title>Panel docente · Escuela Roca</title>
      <meta name="robots" content="noindex" />

      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h1 className="h2 mb-1">Panel docente</h1>
          <p className="text-body-secondary mb-0">
            {cargando
              ? 'Cargando inscripciones…'
              : textoCantidad(inscripcionesVisibles.length, inscripciones.length)}
          </p>
        </div>
        <Button as={Link} to="/inscripciones/nueva">
          Nueva inscripción
        </Button>
      </div>

      {contenido}
    </Container>
  )
}

export default PanelDocente