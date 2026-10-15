import { useEffect, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import IndicadorPasos from './IndicadorPasos'
import PasoAlumno from './PasoAlumno'
import DatosTutorForm from './DatosTutorForm'
import PasoVivienda from './PasoVivienda'
import ContactoEmergenciaForm from './ContactoEmergenciaForm'
import { PASOS } from '../../data/opcionesFicha'
import { inscripcionVacia } from '../../data/inscripcionVacia'
import { validarPaso, hayErrores } from '../../utils/validarInscripcion'
import ResumenInscripcion from './ResumenInscripcion'


function FormularioInscripcion({
  inscripcionInicial = inscripcionVacia,
  onGuardar,
  onCambio,
  textoGuardar = 'Guardar inscripción',
}) {
  const [datos, setDatos] = useState(inscripcionInicial)
  const [pasoActual, setPasoActual] = useState(0)
  const [mostrarErrores, setMostrarErrores] = useState(false)
  useEffect(() => {
    onCambio?.(datos)
  }, [datos, onCambio])


  const esPrimerPaso = pasoActual === 0
  const esUltimoPaso = pasoActual === PASOS.length - 1

  // Los errores no se guardan: se calculan desde los datos,
  // así cada mensaje desaparece solo cuando el maestro corrige el campo
  const errores = mostrarErrores ? validarPaso(pasoActual, datos) : {}

  // Cambia un campo de una sección: alumno, padre, madre o vivienda
  const actualizarCampo = (seccion, campo, valor) => {
    setDatos((anterior) => ({
      ...anterior,
      [seccion]: { ...anterior[seccion], [campo]: valor },
    }))
  }

  // Cambia un campo de uno de los dos contactos de emergencia
  const actualizarContacto = (indice, campo, valor) => {
    setDatos((anterior) => ({
      ...anterior,
      contactos: anterior.contactos.map((contacto, i) =>
        i === indice ? { ...contacto, [campo]: valor } : contacto
      ),
    }))
  }

  const irAPaso = (paso) => {
    setMostrarErrores(false)
    setPasoActual(paso)
  }

  const manejarEnvio = (evento) => {
    evento.preventDefault()

    // Mientras el paso actual tenga errores, no se avanza
    if (hayErrores(validarPaso(pasoActual, datos))) {
      setMostrarErrores(true)
      return
    }

    if (esUltimoPaso) {
      onGuardar?.(datos)
    } else {
      irAPaso(pasoActual + 1)
    }
  }

  return (
    <Card>
      <Card.Body className="p-4">
        <IndicadorPasos pasos={PASOS} pasoActual={pasoActual} onIrAPaso={irAPaso} />

        <p className="text-body-secondary small">
          Los campos con <span className="text-danger">*</span> son obligatorios.
        </p>

        {hayErrores(errores) && (
          <Alert variant="danger">Revisá los campos marcados en rojo para continuar.</Alert>
        )}

        <Form noValidate onSubmit={manejarEnvio}>
          {pasoActual === 0 && (
            <PasoAlumno
              datos={datos.alumno}
              errores={errores}
              onChange={(campo, valor) => actualizarCampo('alumno', campo, valor)}
            />
          )}

          {pasoActual === 1 && (
            <DatosTutorForm
              titulo="Datos del padre"
              prefijo="padre"
              datos={datos.padre}
              esTutor={datos.alumno.tutor === 'Padre'}
              errores={errores}
              onChange={(campo, valor) => actualizarCampo('padre', campo, valor)}
            />
          )}

          {pasoActual === 2 && (
            <DatosTutorForm
              titulo="Datos de la madre"
              prefijo="madre"
              datos={datos.madre}
              esTutor={datos.alumno.tutor === 'Madre'}
              errores={errores}
              onChange={(campo, valor) => actualizarCampo('madre', campo, valor)}
            />
          )}

          {pasoActual === 3 && (
            <PasoVivienda
              datos={datos.vivienda}
              errores={errores}
              onChange={(campo, valor) => actualizarCampo('vivienda', campo, valor)}
            />
          )}

          {pasoActual === 4 && (
            <>
              <h2 className="h4 mb-3">Contactos en caso de emergencia</h2>
              {datos.contactos.map((contacto, indice) => (
                <ContactoEmergenciaForm
                  key={indice}
                  numero={indice + 1}
                  datos={contacto}
                  obligatorio={indice === 0}
                  errores={errores[indice] ?? {}}
                  onChange={(campo, valor) => actualizarContacto(indice, campo, valor)}
                />
              ))}
            </>
          )}

          {pasoActual === 5 && (
            <>
              <p className="mb-4">
                Revisá los datos antes de guardar. Si algo está mal, tocá Editar en esa sección.
              </p>
              <ResumenInscripcion datos={datos} onEditarPaso={irAPaso} />
            </>
          )}

          <div className="d-flex justify-content-between mt-4">
            <Button
              type="button"
              variant="outline-primary"
              disabled={esPrimerPaso}
              onClick={() => irAPaso(pasoActual - 1)}
            >
              Anterior
            </Button>
            <Button type="submit" variant="primary">
              {esUltimoPaso ? textoGuardar : 'Siguiente'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default FormularioInscripcion