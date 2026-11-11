import { documentoCompleto, domicilioCompleto, nombreCompleto, telefonosDe } from '../utils/personas'

// Cada fila es [campo, etiqueta] o [clave, etiqueta, función que arma el valor].
// Los datos se guardan separados, pero en el resumen y en la ficha impresa se muestran
// juntos en una fila, como en la ficha en papel.
const CAMPOS_TUTOR = [
  ['nombre', 'Apellido y nombres', nombreCompleto],
  ['documento', 'Documento', documentoCompleto],
  ['ocupacion', 'Ocupación'],
  ['caracter', 'Carácter'],
  ['nivelEstudio', 'Estudios cursados'],
  ['estadoEstudio', 'Completo o incompleto'],
  ['telefonos', 'Teléfonos', telefonosDe],
  ['mail', 'Mail'],
  ['domicilio', 'Domicilio', domicilioCompleto],
  ['planSocial', 'Cobra AUH u otro plan social'],
]

export const SECCIONES_RESUMEN = [
  {
    clave: 'alumno',
    titulo: 'Datos del alumno',
    paso: 0,
    campos: [
      ['nombre', 'Apellido y nombres', nombreCompleto],
      ['documento', 'Documento', documentoCompleto],
      ['sexo', 'Sexo según DNI'],
      ['fechaNacimiento', 'Fecha de nacimiento'],
      ['actaNacimiento', 'N.º de acta de nacimiento'],
      ['provinciaNacimiento', 'Provincia de nacimiento'],
      ['lugarNacimiento', 'Localidad de nacimiento'],
      ['domicilio', 'Domicilio', domicilioCompleto],
      ['cicloLectivo', 'Ciclo lectivo'],
      ['grado', 'Grado en el que se inscribe'],
      ['repitente', 'Repitente'],
      ['escuelaOrigen', 'Escuela de origen'],
      ['cantidadHermanos', 'Cantidad de hermanos'],
      ['tutor', 'Tutor del niño'],
    ],
  },
  { clave: 'padre', titulo: 'Datos del padre', paso: 1, campos: CAMPOS_TUTOR },
  { clave: 'madre', titulo: 'Datos de la madre', paso: 2, campos: CAMPOS_TUTOR },
  {
    clave: 'vivienda',
    titulo: 'Datos de la vivienda',
    paso: 3,
    campos: [
      ['personasEnCasa', 'Personas que viven en la casa'],
      ['tenencia', 'La vivienda es'],
      ['tipo', 'Tipo de construcción'],
      ['distanciaCuadras', 'Distancia en cuadras'],
    ],
  },
]

export const CAMPOS_CONTACTO = [
  ['nombre', 'Apellido y nombres', nombreCompleto],
  ['parentesco', 'Parentesco'],
  ['telefonos', 'Teléfonos', telefonosDe],
]

export const PASO_CONTACTOS = 4