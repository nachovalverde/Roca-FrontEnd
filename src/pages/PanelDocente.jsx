import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import * as inscripcionesService from '../services/inscripcionesService'


function textoCantidad(cantidad) {
  if (cantidad === null) return 'Cargando inscripciones...'
  if (cantidad === 1) return '1 inscripción cargada'
  return `${cantidad} inscripciones cargadas`
}

function PanelDocente() {
  const [cantidad, setCantidad] = useState(null)

  //Al ingresar pido las inscripciones una sola vez
  useEffect (()=> {
    inscripcionesService.listar().then((inscripciones) => setCantidad(inscripciones.length))
  }, [])

  return (
    <Container className="py-4">
      <title>Panel Docente de la Escuela Roca</title>
      <meta name="robots" content="noindex"/>

      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h1 className="h2 mb-1">Panel Docente</h1>
          <p className="text-body-secondary mb-0">{textoCantidad(cantidad)}</p>
        </div>
        <Button as={Link} to="/inscripciones/nueva">Nueva Inscripción
        </Button>

      </div>

      
    </Container>
  )
}

export default PanelDocente