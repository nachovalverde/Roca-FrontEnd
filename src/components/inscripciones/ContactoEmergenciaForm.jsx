import { Row } from 'react-bootstrap'
import CampoTexto from '../common/CampoTexto'
import { soloLetras, soloTelefono } from '../../utils/filtros'
import { contactoEmpezado } from '../../utils/validarInscripcion'

function ContactoEmergenciaForm({ numero, datos, onChange, obligatorio = false, errores = {} }) {
  const prefijo = `contacto${numero}`
  // El opcional pasa a obligatorio en cuanto se empieza a completar: así se ven los asteriscos
  const requerido = obligatorio || contactoEmpezado(datos)

  return (
    <fieldset className="mb-4">
      <legend className="h5">
        Contacto N.º {numero}
        {!obligatorio && <span className="fs-6 fw-normal text-body-secondary"> (opcional)</span>}
      </legend>
      <Row className="g-3">
        <CampoTexto id={`${prefijo}-apellido`} label="Apellido" name="apellido"
          value={datos.apellido} onChange={onChange} md={6}
          requerido={requerido} error={errores.apellido} filtro={soloLetras} maxLength={60} />
        <CampoTexto id={`${prefijo}-nombres`} label="Nombres" name="nombres"
          value={datos.nombres} onChange={onChange} md={6}
          requerido={requerido} error={errores.nombres} filtro={soloLetras} maxLength={60} />
        <CampoTexto id={`${prefijo}-parentesco`} label="Parentesco" name="parentesco"
          placeholder="Tía, abuelo, hermana…" value={datos.parentesco} onChange={onChange} md={4}
          requerido={requerido} error={errores.parentesco} filtro={soloLetras} maxLength={30} />
        <CampoTexto id={`${prefijo}-telefono`} label="Teléfono" name="telefono" type="tel"
          value={datos.telefono} onChange={onChange} md={4}
          requerido={requerido} error={errores.telefono} filtro={soloTelefono} maxLength={20} />
        <CampoTexto id={`${prefijo}-telefonoAlternativo`} label="Otro teléfono" name="telefonoAlternativo" type="tel"
          value={datos.telefonoAlternativo} onChange={onChange} md={4}
          error={errores.telefonoAlternativo} filtro={soloTelefono} maxLength={20} />
      </Row>
    </fieldset>
  )
}

export default ContactoEmergenciaForm