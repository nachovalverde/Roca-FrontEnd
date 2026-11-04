import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, Container, Spinner } from 'react-bootstrap'
import Swal from 'sweetalert2'
import FiltrosAlumnos from '../components/inscripciones/FiltrosAlumnos'
import TablaAlumnos from '../components/inscripciones/TablaAlumnos'
import Paginacion from '../components/common/Paginacion'
import { useAuth } from '../context/AuthContext'
import * as inscripcionesService from '../services/inscripcionesService'
import { normalizarTexto } from '../utils/normalizarTexto'
import { ciclosDisponibles } from '../utils/ciclos'
import { paginar } from '../utils/paginar'

// El encabezado muestra siempre el total; lo filtrado se cuenta abajo de la tabla
function textoCantidad(total) {
  return `${total} ${total === 1 ? 'inscripción cargada' : 'inscripciones cargadas'}`
}

function PanelDocente() {
  const { usuario } = useAuth()

  const [inscripciones, setInscripciones] = useState([])
  const [cargando, setCargando] = useState(true)
  // La maestra arranca viendo su grado; la vice, todos
  const [filtros, setFiltros] = useState({
    busqueda: '',
    ciclo:'',
    grado: usuario?.rol === 'maestro' ? (usuario.grado ?? '') : '',
  })

  const [pagina, setPagina] = useState(1)

  // Al entrar al panel, pide las inscripciones una sola vez
  useEffect(() => {
    inscripcionesService.listar().then((lista) => {
      setInscripciones(lista)
      setFiltros((anterior) => ({...anterior, ciclo:anterior.ciclo || ciclosDisponibles(lista)[0]|| ''}))
      setCargando(false)
    })
  }, [])

  const cambiarFiltro = (campo, valor) => {
    setFiltros((anterior) => ({ ...anterior, [campo]: valor }))
    setPagina(1)
  }

  // Lo que muestra la tabla se calcula en cada render: no es estado
  const textoBuscado = normalizarTexto(filtros.busqueda)
  const inscripcionesVisibles = inscripciones
    .filter(({ alumno }) => {
      const coincideCiclo = !filtros.ciclo || alumno.cicloLectivo ===filtros.ciclo
      const coincideGrado = !filtros.grado || alumno.grado === filtros.grado
      const coincideTexto =
        !textoBuscado ||
        normalizarTexto(alumno.apellidoNombres).includes(textoBuscado) ||
        alumno.dni.includes(textoBuscado)
      return coincideCiclo && coincideGrado && coincideTexto
    })
    .sort((a, b) => b.creadaEl.localeCompare(a.creadaEl))

  const paginaActual =paginar(inscripcionesVisibles, pagina, 20)

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

    // Vuelve a pedir la lista y salta al ciclo más reciente que haya quedado
  const recargarLista = async () => {
    const lista = await inscripcionesService.listar()
    setInscripciones(lista)
    setFiltros((anterior) => ({ ...anterior, ciclo: ciclosDisponibles(lista)[0] || '' }))
    setPagina(1)
  }

  const cargarDemo = async () => {
    await inscripcionesService.cargarDatosDemo()
    await recargarLista()
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Datos de demostración cargados',
      showConfirmButton: false,
      timer: 2000,
    })
  }

  const quitarDemo = async () => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Quitar los datos de demostración?',
      text: 'Las inscripciones cargadas a mano no se tocan.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, quitar',
      cancelButtonText: 'Cancelar',
      focusCancel: true,
    })
    if (!isConfirmed) return

    await inscripcionesService.borrarDatosDemo()
    await recargarLista()
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
        <div id="lista-inscripciones" />
        <FiltrosAlumnos filtros={filtros} onCambiar={cambiarFiltro} ciclos={ciclosDisponibles(inscripciones)} />
        {inscripcionesVisibles.length > 0 ? (
          <>
            <TablaAlumnos inscripciones={paginaActual.items} onEliminar={eliminarInscripcion} />
            <Paginacion {...paginaActual} onCambiar={setPagina} nombre="inscripciones" nombreSingular="inscripción" idInicio="lista-inscripciones" />
          </>
        ) : (
          <p className="text-body-secondary py-4">
            Ninguna inscripción coincide con la búsqueda. Probá con otro nombre o con «Todos los ciclos» o «Todos los grados».
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
              : textoCantidad(inscripciones.length)}
          </p>
        </div>
        <Button as={Link} to="/inscripciones/nueva">
          Nueva inscripción
        </Button>
      </div>
      
      {/* Solo la vice ve estos botones: sirven para probar el listado, los reportes y el tablero */}
      {usuario?.rol === 'vicedirectora' && (
        <div className="d-flex flex-wrap gap-2 mb-4">
          <Button variant="outline-secondary" size="sm" onClick={cargarDemo}>
            Cargar datos de demostración
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={quitarDemo}
            disabled={!inscripciones.some((item) => item.esDemo)}
          >
            Quitar datos de demostración
          </Button>
        </div>
      )}

      {contenido}
    </Container>
  )
}

export default PanelDocente