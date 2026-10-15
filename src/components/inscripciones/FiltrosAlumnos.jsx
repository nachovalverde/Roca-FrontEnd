import { Row } from 'react-bootstrap'
import CampoTexto from '../common/CampoTexto'
import CampoSelect from '../common/CampoSelect'
import { GRADOS } from '../../data/opcionesFicha'

function FiltrosAlumnos({ filtros, onCambiar }) {
  return (
    <Row className="g-3 mb-3" role="search">
      <CampoTexto
        id="filtro-busqueda"
        label="Buscar por nombre o DNI"
        name="busqueda"
        type="search"
        value={filtros.busqueda}
        onChange={onCambiar}
        md={8}
        placeholder="Ej.: Pérez o 45123456"
      />
      <CampoSelect
        id="filtro-grado"
        label="Grado"
        name="grado"
        value={filtros.grado}
        onChange={onCambiar}
        opciones={GRADOS}
        md={4}
        opcionVacia="Todos los grados"
      />
    </Row>
  )
}

export default FiltrosAlumnos