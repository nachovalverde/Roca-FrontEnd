
const domicilioVacio = { domicilioCalle: '', domicilioNumero: '', domicilioPisoDepto: '', domicilioBarrio: '' }

const tutorVacio = {
  apellido: '',
  nombres: '',
  dni: '',
  cuil: '',
  ocupacion: '',
  caracter: '',
  nivelEstudio: '',
  estadoEstudio: '',
  telefono: '',
  telefonoAlternativo: '',
  mail: '',
  ...domicilioVacio,
  planSocial: '',
}

const contactoVacio = { apellido: '', nombres: '', parentesco: '', telefono: '', telefonoAlternativo: '' }

export const inscripcionVacia = {
  alumno: {
    apellido: '',
    nombres: '',
    dni: '',
    cuil: '',
    sexo: '',
    fechaNacimiento: '',
    actaNacimiento: '',
    provinciaNacimiento: '',
    lugarNacimiento: '',
    ...domicilioVacio,
    cicloLectivo: '',
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