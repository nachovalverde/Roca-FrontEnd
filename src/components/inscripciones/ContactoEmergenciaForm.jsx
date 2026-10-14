import { Row } from 'react-bootstrap'
import CampoTexto from '../common/CampoTexto'
import { soloLetras, soloTelefono } from '../../utils/filtros'

function ContactoEmergenciaForm({ numero, datos, onChange, obligatorio = false, errores = {} }) {
  const prefijo = `contacto${numero}`

  return (
    <fieldset className="mb-4">
      <legend className="h5">
        Contacto N.º {numero}
        {!obligatorio && <span className="fs-6 fw-normal text-body-secondary"> (opcional)</span>}
      </legend>
      <Row className="g-3">
        <CampoTexto id={`${prefijo}-apellidoNombres`} label="Apellido y nombres" name="apellidoNombres"
          value={datos.apellidoNombres} onChange={onChange} md={6}
          requerido={obligatorio} error={errores.apellidoNombres} filtro={soloLetras} />
        <CampoTexto id={`${prefijo}-parentesco`} label="Parentesco" name="parentesco"
          placeholder="Tía, abuelo, hermana…" value={datos.parentesco} onChange={onChange} md={3}
          requerido={obligatorio} error={errores.parentesco} filtro={soloLetras} />
        <CampoTexto id={`${prefijo}-telefonos`} label="Teléfonos" name="telefonos" type="tel"
          value={datos.telefonos} onChange={onChange} md={3}
          requerido={obligatorio} error={errores.telefonos} filtro={soloTelefono} />
      </Row>
    </fieldset>
  )
}

export default ContactoEmergenciaForm