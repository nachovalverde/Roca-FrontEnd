const CAMPOS_TUTOR = [
  ['apellidoNombres', 'Apellido y nombres'],
  ['dni', 'CUIL o DNI'],
  ['ocupacion', 'Ocupación'],
  ['caracter', 'Carácter'],
  ['nivelEstudio', 'Estudios cursados'],
  ['estadoEstudio', 'Completo o incompleto'],
  ['telefonos', 'Teléfonos'],
  ['mail', 'Mail'],
  ['domicilio', 'Domicilio'],
  ['planSocial', 'Cobra AUH u otro plan social'],
]

export const SECCIONES_RESUMEN = [
  {
    clave: 'alumno',
    titulo: 'Datos del alumno',
    paso: 0,
    campos: [
      ['apellidoNombres', 'Apellido y nombres'],
      ['dni', 'CUIL o DNI'],
      ['fechaNacimiento', 'Fecha de nacimiento'],
      ['actaNacimiento', 'N.º de acta de nacimiento'],
      ['provinciaNacimiento', 'Provincia de nacimiento'],
      ['lugarNacimiento', 'Localidad de nacimiento'],
      ['domicilio', 'Domicilio'],
      ['grado', 'Grado en el que se inscribe'],
      ['repitente', 'Repitente'],
      ['escuelaOrigen', 'Escuela de origen'],
      ['cantidadHermanos', 'Cantidad de hermanos'],
      ['tutor', 'Tutor del niño'],
    ],
  },
  { clave: 'padre', titulo: 'Datos del padre', paso: 1, campos: CAMPOS_TUTOR},
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
  ['apellidoNombres', 'Apellido y nombres'],
  ['parentesco', 'Parentesco'],
  ['telefonos', 'Teléfonos'],
]

export const PASO_CONTACTOS = 4