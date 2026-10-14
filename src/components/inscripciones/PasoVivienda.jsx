import { Row } from 'react-bootstrap'
import CampoTexto from '../common/CampoTexto'
import CampoOpciones from '../common/CampoOpciones'
import { TENENCIAS, TIPOS_VIVIENDA } from '../../data/opcionesFicha'
import { soloDigitos } from '../../utils/filtros'

function PasoVivienda({ datos, onChange, errores = {} }) {
  return (
    <>
      <h2 className="h4 mb-3">Datos de la vivienda</h2>
      <Row className="g-3">
        <CampoTexto id="vivienda-personasEnCasa" label="Personas que viven en la casa" name="personasEnCasa"
          value={datos.personasEnCasa} onChange={onChange} md={6}
          requerido error={errores.personasEnCasa} filtro={soloDigitos} inputMode="numeric" maxLength={2} />
        <CampoTexto id="vivienda-distanciaCuadras" label="Distancia a la escuela (en cuadras)" name="distanciaCuadras"
          value={datos.distanciaCuadras} onChange={onChange} md={6}
          filtro={soloDigitos} inputMode="numeric" maxLength={3} />

        <CampoOpciones id="vivienda-tenencia" label="La vivienda es" name="tenencia"
          value={datos.tenencia} onChange={onChange} opciones={TENENCIAS} md={6}
          requerido error={errores.tenencia} />
        <CampoOpciones id="vivienda-tipo" label="Tipo de construcción" name="tipo"
          value={datos.tipo} onChange={onChange} opciones={TIPOS_VIVIENDA} md={6}
          requerido error={errores.tipo} />
      </Row>
    </>
  )
}

export default PasoVivienda