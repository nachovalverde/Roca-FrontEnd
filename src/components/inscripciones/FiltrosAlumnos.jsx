import { Row } from 'react-bootstrap'
import CampoTexto from '../common/CampoTexto'
import CampoSelect from '../common/CampoSelect'
import { GRADOS } from '../../data/opcionesFicha'

function FiltrosAlumnos({ filtros, onCambiar, ciclos }) {
  return (
    <Row className="g-3 mb-3" role="search">
      <CampoTexto
        id="filtro-busqueda"
        label="Buscar por nombre o DNI"
        name="busqueda"
        type="search"
        value={filtros.busqueda}
        onChange={onCambiar}
        md={6}
        placeholder="Ej.: Pérez o 45123456"
      />
      <CampoSelect
        id="filtro-ciclo"
        label="Ciclo lectivo"
        name="ciclo"
        value={filtros.ciclo}
        onChange={onCambiar}
        opciones={ciclos}
        md={3}
        opcionVacia="Todos los ciclos"
      />
      <CampoSelect
        id="filtro-grado"
        label="Grado"
        name="grado"
        value={filtros.grado}
        onChange={onCambiar}
        opciones={GRADOS}
        md={3}
        opcionVacia="Todos los grados"
      />
    </Row>
  )
}

export default FiltrosAlumnos