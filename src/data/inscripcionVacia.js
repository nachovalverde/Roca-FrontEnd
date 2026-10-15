const tutorVacio = {
  apellidoNombres: '',
  dni: '',
  ocupacion: '',
  caracter: '',
  nivelEstudio: '',
  estadoEstudio: '',
  telefonos: '',
  mail: '',
  domicilio: '',
  planSocial: '',
}

const contactoVacio = { apellidoNombres: '', parentesco: '', telefonos: '' }

export const inscripcionVacia = {
  alumno: {
    apellidoNombres: '',
    dni: '',
    fechaNacimiento: '',
    actaNacimiento: '',
    provinciaNacimiento: '',
    lugarNacimiento: '',
    domicilio: '',
    grado: '',
    repitente: '',
    escuelaOrigen: '',
    cantidadHermanos: '',
    tutor: '',
  },
  padre: { ...tutorVacio },
  madre: { ...tutorVacio },
  vivienda: { personasEnCasa: '', tenencia: '', tipo: '', distanciaCuadras: '' },
  contactos: [{ ...contactoVacio }, { ...contactoVacio }],
}