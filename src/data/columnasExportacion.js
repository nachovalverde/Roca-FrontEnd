import { calcularEdad } from '../utils/calcularEdad'
import { formatearFecha } from '../utils/formatearFecha'
import { domicilioCompleto, nombreCompleto, telefonosDe } from '../utils/personas'

const tutorDe = (inscripcion) => (inscripcion.alumno.tutor === 'Padre' ? inscripcion.padre : inscripcion.madre)
// ="..." hace que Excel lo trate como texto y no muestre el CUIL en notación científica
const comoTexto = (valor) => (valor ? `="${valor}"` : '')

export const COLUMNAS_INSCRIPCIONES = [
  { titulo: 'Apellido', valor: (i) => i.alumno.apellido },
  { titulo: 'Nombres', valor: (i) => i.alumno.nombres },
  { titulo: 'DNI', valor: (i) => comoTexto(i.alumno.dni) },
  { titulo: 'CUIL', valor: (i) => comoTexto(i.alumno.cuil) },
  { titulo: 'Sexo', valor: (i) => i.alumno.sexo },
  { titulo: 'Fecha de nacimiento', valor: (i) => formatearFecha(i.alumno.fechaNacimiento) },
  { titulo: 'Edad', valor: (i) => calcularEdad(i.alumno.fechaNacimiento) },
  { titulo: 'Ciclo', valor: (i) => i.alumno.cicloLectivo },
  { titulo: 'Grado', valor: (i) => i.alumno.grado },
  { titulo: 'Repitente', valor: (i) => i.alumno.repitente },
  { titulo: 'Domicilio', valor: (i) => domicilioCompleto(i.alumno) },
  { titulo: 'Barrio', valor: (i) => i.alumno.domicilioBarrio },
  { titulo: 'Tutor', valor: (i) => nombreCompleto(tutorDe(i)) },
  { titulo: 'Parentesco', valor: (i) => i.alumno.tutor },
  { titulo: 'Teléfonos del tutor', valor: (i) => telefonosDe(tutorDe(i)) },
  { titulo: 'Mail del tutor', valor: (i) => tutorDe(i).mail },
  { titulo: 'Cargada por', valor: (i) => i.creadaPor?.nombre },
  { titulo: 'Fecha de carga', valor: (i) => formatearFecha(i.creadaEl) },
]