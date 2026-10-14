import { Fragment } from 'react'
import { Button } from 'react-bootstrap'
import { SECCIONES_RESUMEN, CAMPOS_CONTACTO, PASO_CONTACTO, PASO_CONTACTOS } from '../../data/etiquetasFicha'
import { calcularEdad } from '../../utils/calcularEdad'
import { formatearFecha } from '../../utils/formatearFecha'

//lo que se muestra en cada fila, si no hay datos se muesta un giuon y la edad junto a la fecha de nacimiento

function formatearValor(campo, valor) {
  if (!valor) return '--'
  if (campo === 'fechaNacimiento') return `${formatearFecha(valor)} (${calcularEdad(valor)} años)`
  return valor
}

function EncabezadoSeccion ({ titulo, paso, onEditarPaso}) {
  return (
    <div className="d-flex justify-content-between align-items-center border-bottom mb-3">
      <h2 className="h5 mb-2">{titulo}</h2>
      {onEditarPaso && (
        <Button variant="link" size="sm" onClick={() => onEditarPaso(paso)}>
          Editar
        </Button>
      )}
    </div>
  )
}

function FilasDatos ({campos, datos}) {
  return (
    <dl className="row mb-0">
      {campos.map(([campo, etiqueta])=> (
        <Fragment key={campo}>
          <dt className="col-sm-5 fw-normal text-body-secondary">{etiqueta}</dt>
          <dd className="col-sm-7">{formatearValor(campo, datos[campo])}</dd>
        </Fragment>
      ))}
    </dl>
  )
}


function ResumenInscripcion ({ datos, onEditarPaso }) {
  return (
    <>
      {SECCIONES_RESUMEN.map ((seccion) => (
        <section key={seccion.clave} className="mb-4">
          <EncabezadoSeccion titulo={seccion.titulo} paso= {seccion.paso} onEditarPaso={onEditarPaso} />
          < FilasDatos campos={seccion.campos} datos={datos[seccion.clave]} />
        </section>
      ))}

      <section className="mb-2">
        <EncabezadoSeccion
          titulo= "Contactos en caso de emergencia"
          paso= {PASO_CONTACTOS}
          onEditarPaso={onEditarPaso}
          />
          {datos.contactos.map ((contacto, indice) => (
            <Fragment key={indice}>
              <h3 className="h6">Contacto N° {indice+1}</h3>
              <FilasDatos campos= {CAMPOS_CONTACTO} datos= {contacto} />
            </Fragment>
          ))}
      </section>
    </>
  )
}

export default ResumenInscripcion