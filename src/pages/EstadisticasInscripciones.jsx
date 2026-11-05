import { useEffect, useState } from 'react'
import { Alert, Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import CampoSelect from '../components/common/CampoSelect'
import TarjetaIndicador from '../components/common/TarjetaIndicador'
import GraficoEvolucion from '../components/estadisticas/GraficoEvolucion'
import GraficoPorGrado from '../components/estadisticas/GraficoPorGrado'
import GraficoSexoPorGrado from '../components/estadisticas/GraficoSexoPorGrado'
import TablaResumenGrados from '../components/estadisticas/TablaResumenGrados'
import { GRADOS } from '../data/opcionesFicha'
import * as inscripcionesService from '../services/inscripcionesService'
import { calcularEstadisticas } from '../utils/calcularEstadisticas'
import { ciclosDisponibles } from '../utils/ciclos'

function EstadisticasInscripciones() {
  const [inscripciones, setInscripciones] = useState([])
  const [cargando, setCargando] = useState(true)
  const [filtros, setFiltros] = useState({ ciclo: '', cicloComparado: '', grado: '' })

  // Al entrar, pide las inscripciones una sola vez y arranca en el ciclo más reciente
  useEffect(() => {
    inscripcionesService
      .listar()
      .then((lista) => {
        setInscripciones(lista)
        const [actual, anterior = ''] = ciclosDisponibles(lista)
        setFiltros((previos) => ({ ...previos, ciclo: previos.ciclo || actual || '', cicloComparado: previos.cicloComparado || anterior }))
      })
      .finally(() => setCargando(false))
  }, [])

  const cambiarFiltro = (campo, valor) => setFiltros((previos) => ({ ...previos, [campo]: valor }))

  const ciclos = ciclosDisponibles(inscripciones)
  const estadisticas = calcularEstadisticas(inscripciones, filtros)
  // Las inscripciones de un ciclo se cargan el año anterior: si el ciclo es el del año que viene, la inscripción sigue abierta
  const inscripcionAbierta = Number(filtros.ciclo) === new Date().getFullYear() + 1
  let variacion = 'Sin comparar'
  if (estadisticas.variacion !== null) {
    variacion = `${estadisticas.variacion > 0 ? '+' : ''}${estadisticas.variacion} % vs. ${filtros.cicloComparado}`
    if (inscripcionAbierta) variacion += ' (la inscripción sigue abierta)'
  }

  const indicadores = [
    { titulo: `Inscriptos ${filtros.ciclo}`, valor: estadisticas.total, detalle: variacion },
    { titulo: 'Cargadas en los últimos 7 días', valor: estadisticas.ultimosSieteDias, detalle: 'Ritmo de carga reciente' },
    { titulo: 'Repitentes', valor: `${estadisticas.porcentajeRepitentes} %`, detalle: 'Sobre el total del ciclo' },
    { titulo: 'Con AUH u otro plan social', valor: `${estadisticas.porcentajePlanSocial} %`, detalle: 'Según los datos del tutor' },
  ]

  return (
    <Container className="py-4">
      <title>Estadísticas de inscripciones · Escuela Roca</title>
      <meta name="robots" content="noindex" />

      <h1 className="h2 mb-1">Estadísticas de inscripciones</h1>
      <p className="text-body-secondary mb-4">Resumen de las inscripciones de cada ciclo lectivo: por grado, por sexo y semana a semana.</p>

      {cargando && <div className="text-center py-5"><Spinner animation="border" role="status"><span className="visually-hidden">Cargando</span></Spinner></div>}

      {!cargando && inscripciones.length === 0 && (
        <Alert variant="light" className="border">Todavía no hay inscripciones. Desde el panel docente podés cargar datos de demostración.</Alert>
      )}

      {!cargando && inscripciones.length > 0 && (
        <>
          <Row className="g-3 mb-4" role="search">
            <CampoSelect id="filtro-ciclo" label="Ciclo lectivo" name="ciclo" value={filtros.ciclo} onChange={cambiarFiltro} opciones={ciclos} md={4} opcionVacia="Elegí un ciclo" />
            <CampoSelect id="filtro-comparar" label="Comparar con" name="cicloComparado" value={filtros.cicloComparado} onChange={cambiarFiltro} opciones={ciclos.filter((c) => c !== filtros.ciclo)} md={4} opcionVacia="Sin comparar" />
            <CampoSelect id="filtro-grado-estadisticas" label="Grado" name="grado" value={filtros.grado} onChange={cambiarFiltro} opciones={GRADOS} md={4} opcionVacia="Todos los grados" />
          </Row>

          <Row className="g-3 mb-4">
            {indicadores.map((indicador) => (
              <Col key={indicador.titulo} xs={6} lg={3}>
                <TarjetaIndicador {...indicador} />
              </Col>
            ))}
          </Row>

          <Row className="g-3 mb-4">
            <Col lg={6}>
              <Card className="h-100"><Card.Body>
                <h2 className="h5">Alumnos por grado</h2>
                <GraficoPorGrado datos={estadisticas.porGrado} ciclo={filtros.ciclo} cicloComparado={filtros.cicloComparado} />
              </Card.Body></Card>
            </Col>
            <Col lg={6}>
              <Card className="h-100"><Card.Body>
                <h2 className="h5">Composición por sexo en cada grado</h2>
                <GraficoSexoPorGrado datos={estadisticas.porGrado} />
              </Card.Body></Card>
            </Col>
          </Row>

          <Card className="mb-4"><Card.Body>
            <h2 className="h5">Evolución de la carga, semana a semana</h2>
            <GraficoEvolucion datos={estadisticas.porSemana} />
          </Card.Body></Card>

          <Card><Card.Body>
            <h2 className="h5 mb-3">Resumen por grado</h2>
            <TablaResumenGrados datos={estadisticas.porGrado} ciclo={filtros.ciclo} cicloComparado={filtros.cicloComparado} grado={filtros.grado} />
          </Card.Body></Card>
        </>
      )}
    </Container>
  )
}

export default EstadisticasInscripciones