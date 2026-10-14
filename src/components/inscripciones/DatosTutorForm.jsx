import { Row } from 'react-bootstrap'
import CampoTexto from '../common/CampoTexto'
import CampoSelect from '../common/CampoSelect'
import { CARACTERES, NIVELES_ESTUDIO, ESTADOS_ESTUDIO, PLAN_SOCIAL } from '../../data/opcionesFicha'
import { soloDigitos, soloLetras, soloTelefono } from '../../utils/filtros'

function DatosTutorForm({ titulo, prefijo, datos, onChange, esTutor = false, errores = {} }) {
  return (
    <>
      <h2 className="h4 mb-1">{titulo}</h2>
      <p className="text-body-secondary mb-3">
        {esTutor
          ? 'Es el tutor del niño: nombre, DNI y teléfono son obligatorios.'
          : 'Opcional: completalo si corresponde.'}
      </p>
      <Row className="g-3">
        <CampoTexto id={`${prefijo}-apellidoNombres`} label="Apellido y nombres" name="apellidoNombres"
          value={datos.apellidoNombres} onChange={onChange} md={8}
          requerido={esTutor} error={errores.apellidoNombres} filtro={soloLetras} />
        <CampoTexto id={`${prefijo}-dni`} label="CUIL o DNI" name="dni" value={datos.dni} onChange={onChange} md={4}
          requerido={esTutor} error={errores.dni} filtro={soloDigitos} inputMode="numeric" maxLength={11} />

        <CampoTexto id={`${prefijo}-ocupacion`} label="Ocupación" name="ocupacion"
          value={datos.ocupacion} onChange={onChange} md={6} />
        <CampoSelect id={`${prefijo}-caracter`} label="Carácter" name="caracter"
          value={datos.caracter} onChange={onChange} opciones={CARACTERES} md={6} />

        <CampoSelect id={`${prefijo}-nivelEstudio`} label="Estudios cursados" name="nivelEstudio"
          value={datos.nivelEstudio} onChange={onChange} opciones={NIVELES_ESTUDIO} md={6} />
        <CampoSelect id={`${prefijo}-estadoEstudio`} label="¿Completo o incompleto?" name="estadoEstudio"
          value={datos.estadoEstudio} onChange={onChange} opciones={ESTADOS_ESTUDIO} md={6} />

        <CampoTexto id={`${prefijo}-telefonos`} label="Teléfonos (fijo y celular)" name="telefonos" type="tel"
          value={datos.telefonos} onChange={onChange} md={6}
          requerido={esTutor} error={errores.telefonos} filtro={soloTelefono} />
        <CampoTexto id={`${prefijo}-mail`} label="Mail" name="mail" type="email"
          value={datos.mail} onChange={onChange} md={6} error={errores.mail} />

        <CampoTexto id={`${prefijo}-domicilio`} label="Domicilio" name="domicilio"
          value={datos.domicilio} onChange={onChange} md={8} />
        <CampoSelect id={`${prefijo}-planSocial`} label="¿Cobra AUH u otro plan social?" name="planSocial"
          value={datos.planSocial} onChange={onChange} opciones={PLAN_SOCIAL} md={4} />
      </Row>
    </>
  )
}

export default DatosTutorForm