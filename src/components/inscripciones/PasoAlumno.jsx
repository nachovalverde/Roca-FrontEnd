import { Row, Col, Form } from 'react-bootstrap'
import CampoTexto from '../common/CampoTexto'
import CampoSelect from '../common/CampoSelect'
import CampoOpciones from '../common/CampoOpciones'
import { GRADOS, SI_NO, TUTORES } from '../../data/opcionesFicha'
import { calcularEdad } from '../../utils/calcularEdad'
import { soloDigitos, soloLetras } from '../../utils/filtros'
import SelectorLugarNacimiento from './SelectorLugarNacimiento'

function PasoAlumno({ datos, onChange, errores = {} }) {

  const edad = calcularEdad(datos.fechaNacimiento)

  return (
    <>
      <h2 className="h4 mb-3">Datos del alumno</h2>
      <Row className="g-3">
        <CampoTexto id="alumno-apellidoNombres" label="Apellido y nombres" name="apellidoNombres"
          value={datos.apellidoNombres} onChange={onChange} md={8}
          requerido error={errores.apellidoNombres} filtro={soloLetras} />
        <CampoTexto id="alumno-dni" label="CUIL o DNI" name="dni" value={datos.dni} onChange={onChange} md={4}
          requerido error={errores.dni} filtro={soloDigitos} inputMode="numeric" maxLength={11} />

        <CampoTexto id="alumno-fechaNacimiento" label="Fecha de nacimiento" name="fechaNacimiento"
          type="date" value={datos.fechaNacimiento} onChange={onChange} md={4}
          requerido error={errores.fechaNacimiento} />
        <Col md={2}>
          <Form.Group controlId="alumno-edad">
            <Form.Label>Edad</Form.Label>
            <Form.Control plaintext readOnly value={edad === '' ? '' : `${edad} años`} />
          </Form.Group>
        </Col>

        <CampoTexto id="alumno-actaNacimiento" label="N.º de acta de nacimiento" name="actaNacimiento"
          value={datos.actaNacimiento} onChange={onChange} md={6} />

        <SelectorLugarNacimiento
          provincia={datos.provinciaNacimiento}
          localidad={datos.lugarNacimiento}
          onChange={onChange}
        />

        <CampoTexto id="alumno-domicilio" label="Domicilio" name="domicilio"
          value={datos.domicilio} onChange={onChange} md={12}
          requerido error={errores.domicilio} />

        <CampoSelect id="alumno-grado" label="Grado en el que se inscribe" name="grado"
          value={datos.grado} onChange={onChange} opciones={GRADOS} md={4}
          requerido error={errores.grado} />
        <CampoOpciones id="alumno-repitente" label="¿Es repitente?" name="repitente"
          value={datos.repitente} onChange={onChange} opciones={SI_NO} md={4}
          requerido error={errores.repitente} />
        <CampoTexto id="alumno-escuelaOrigen" label="Escuela de origen" name="escuelaOrigen"
          value={datos.escuelaOrigen} onChange={onChange} md={4} />

        <CampoTexto id="alumno-cantidadHermanos" label="Cantidad de hermanos" name="cantidadHermanos"
          value={datos.cantidadHermanos} onChange={onChange} md={4}
          filtro={soloDigitos} inputMode="numeric" maxLength={2} />
        <CampoSelect id="alumno-tutor" label="Tutor del niño" name="tutor"
          value={datos.tutor} onChange={onChange} opciones={TUTORES} md={4}
          requerido error={errores.tutor} />
      </Row>
    </>
  )
}

export default PasoAlumno