import { Row } from 'react-bootstrap'
import CampoTexto from '../common/CampoTexto'
import CampoSelect from '../common/CampoSelect'
import { CARACTERES, NIVELES_ESTUDIO, ESTADOS_ESTUDIO, PLAN_SOCIAL } from '../../data/opcionesFicha'
import { soloDigitos, soloLetras, soloTelefono } from '../../utils/filtros'
import CamposDomicilio from './CamposDomicilio'

function DatosTutorForm({ titulo, prefijo, datos, onChange, esTutor = false, errores = {} }) {
  return (
    <>
      <h2 className="h4 mb-1">{titulo}</h2>
      <p className="text-body-secondary mb-3">
        {esTutor
          ? 'Es el tutor del niño: apellido, nombres, DNI y teléfono son obligatorios.'
          : 'Opcional: completalo si corresponde.'}
      </p>
      <Row className="g-3">
        <CampoTexto id={`${prefijo}-apellido`} label="Apellido" name="apellido"
          value={datos.apellido} onChange={onChange} md={6}
          requerido={esTutor} error={errores.apellido} filtro={soloLetras} maxLength={60} />
        <CampoTexto id={`${prefijo}-nombres`} label="Nombres" name="nombres"
          value={datos.nombres} onChange={onChange} md={6}
          requerido={esTutor} error={errores.nombres} filtro={soloLetras} maxLength={60} />
        <CampoTexto id={`${prefijo}-dni`} label="DNI" name="dni" value={datos.dni} onChange={onChange} md={3}
          requerido={esTutor} error={errores.dni} filtro={soloDigitos} inputMode="numeric" maxLength={8} />
        <CampoTexto id={`${prefijo}-cuil`} label="CUIL" name="cuil" value={datos.cuil} onChange={onChange} md={3}
          error={errores.cuil} filtro={soloDigitos} inputMode="numeric" maxLength={11} placeholder="Sin guiones" />
        <CampoTexto id={`${prefijo}-ocupacion`} label="Ocupación" name="ocupacion"
          value={datos.ocupacion} onChange={onChange} md={6} maxLength={80} />

        <CampoSelect id={`${prefijo}-caracter`} label="Carácter" name="caracter"
          value={datos.caracter} onChange={onChange} opciones={CARACTERES} md={4} />
        <CampoSelect id={`${prefijo}-nivelEstudio`} label="Estudios cursados" name="nivelEstudio"
          value={datos.nivelEstudio} onChange={onChange} opciones={NIVELES_ESTUDIO} md={4} />
        <CampoSelect id={`${prefijo}-estadoEstudio`} label="¿Completo o incompleto?" name="estadoEstudio"
          value={datos.estadoEstudio} onChange={onChange} opciones={ESTADOS_ESTUDIO} md={4} />

        <CampoTexto id={`${prefijo}-telefono`} label="Teléfono" name="telefono" type="tel"
          value={datos.telefono} onChange={onChange} md={4}
          requerido={esTutor} error={errores.telefono} filtro={soloTelefono} maxLength={20} />
        <CampoTexto id={`${prefijo}-telefonoAlternativo`} label="Otro teléfono" name="telefonoAlternativo" type="tel"
          value={datos.telefonoAlternativo} onChange={onChange} md={4}
          error={errores.telefonoAlternativo} filtro={soloTelefono} maxLength={20} />
        <CampoTexto id={`${prefijo}-mail`} label="Mail" name="mail" type="email"
          value={datos.mail} onChange={onChange} md={4} error={errores.mail} maxLength={100} />

        <CamposDomicilio prefijo={prefijo} datos={datos} onChange={onChange} errores={errores} />

        <CampoSelect id={`${prefijo}-planSocial`} label="¿Cobra AUH u otro plan social?" name="planSocial"
          value={datos.planSocial} onChange={onChange} opciones={PLAN_SOCIAL} md={6} />
      </Row>
    </>
  )
}

export default DatosTutorForm