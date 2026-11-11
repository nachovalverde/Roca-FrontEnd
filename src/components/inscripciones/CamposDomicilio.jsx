import { Col, Row } from 'react-bootstrap'
import CampoTexto from '../common/CampoTexto'

// Número de la casa: solo dígitos o «S/N»
const soloNumeroDeCasa = (valor) => valor.toUpperCase().replace(/[^0-9S/N]/g, '')

// Los cuatro campos del domicilio, iguales para el alumno, el padre y la madre.
// Van separados porque así quedan en la base: se puede buscar y ordenar por calle o por barrio.
function CamposDomicilio({ prefijo, datos, onChange, errores = {}, requerido = false }) {
  return (
    <Col xs={12}>
      <fieldset>
        <legend className="fs-6 fw-semibold mb-2">Domicilio</legend>
        <Row className="g-3">
          <CampoTexto id={`${prefijo}-domicilioCalle`} label="Calle" name="domicilioCalle"
            value={datos.domicilioCalle} onChange={onChange} md={5}
            requerido={requerido} error={errores.domicilioCalle} maxLength={80} autoComplete="address-line1" />
          <CampoTexto id={`${prefijo}-domicilioNumero`} label="Número" name="domicilioNumero"
            placeholder="450 o S/N" value={datos.domicilioNumero} onChange={onChange} md={2}
            requerido={requerido} error={errores.domicilioNumero} filtro={soloNumeroDeCasa} maxLength={5} />
          <CampoTexto id={`${prefijo}-domicilioPisoDepto`} label="Piso y depto." name="domicilioPisoDepto"
            value={datos.domicilioPisoDepto} onChange={onChange} md={2} maxLength={20} />
          <CampoTexto id={`${prefijo}-domicilioBarrio`} label="Barrio" name="domicilioBarrio"
            value={datos.domicilioBarrio} onChange={onChange} md={3} maxLength={60} />
        </Row>
      </fieldset>
    </Col>
  )
}

export default CamposDomicilio