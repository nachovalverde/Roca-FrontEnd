import { calcularEdad } from '../utils/calcularEdad'
import { formatearFecha } from '../utils/formatearFecha'

const tutorDe = (inscripcion) => (inscripcion.alumno.tutor === 'Padre' ? inscripcion.padre : inscripcion.madre)
// ="..." hace que Excel lo trate como texto y no muestre el CUIL en notación científica
const comoTexto = (valor) => (valor ? `="${valor}"` : '')

export const COLUMNAS_INSCRIPCIONES = [
  { titulo: 'Apellido y nombres', valor: (i) => i.alumno.apellidoNombres },
  { titulo: 'DNI', valor: (i) => comoTexto(i.alumno.dni) },
  { titulo: 'Sexo', valor: (i) => i.alumno.sexo },
  { titulo: 'Fecha de nacimiento', valor: (i) => formatearFecha(i.alumno.fechaNacimiento) },
  { titulo: 'Edad', valor: (i) => calcularEdad(i.alumno.fechaNacimiento) },
  { titulo: 'Ciclo', valor: (i) => i.alumno.cicloLectivo },
  { titulo: 'Grado', valor: (i) => i.alumno.grado },
  { titulo: 'Repitente', valor: (i) => i.alumno.repitente },
  { titulo: 'Domicilio', valor: (i) => i.alumno.domicilio },
  { titulo: 'Tutor', valor: (i) => tutorDe(i).apellidoNombres },
  { titulo: 'Parentesco', valor: (i) => i.alumno.tutor },
  { titulo: 'Teléfono del tutor', valor: (i) => tutorDe(i).telefonos },
  { titulo: 'Mail del tutor', valor: (i) => tutorDe(i).mail },
  { titulo: 'Cargada por', valor: (i) => i.creadaPor?.nombre },
  { titulo: 'Fecha de carga', valor: (i) => formatearFecha(i.creadaEl) },
]