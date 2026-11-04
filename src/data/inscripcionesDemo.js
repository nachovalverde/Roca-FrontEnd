import { inscripcionVacia } from './inscripcionVacia'
import { GRADOS } from './opcionesFicha'

// Datos inventados para probar el listado, los reportes y el tablero.
// Todas llevan esDemo: true, así se pueden borrar sin tocar las reales.
const NOMBRES = {
  Femenino: ['Martina', 'Sofía', 'Valentina', 'Catalina', 'Emma', 'Olivia', 'Mía', 'Julieta', 'Lucía', 'Renata'],
  Masculino: ['Benjamín', 'Mateo', 'Thiago', 'Bautista', 'Joaquín', 'Felipe', 'Santino', 'Lorenzo', 'Tomás', 'Lautaro'],
  X: ['Alex', 'Sasha', 'Noa'],
}
const APELLIDOS = ['González', 'Rodríguez', 'Gómez', 'Fernández', 'López', 'Díaz', 'Martínez', 'Pérez', 'Romero', 'Sosa', 'Álvarez', 'Ruiz', 'Herrera', 'Medina', 'Aguirre']
const LOCALIDADES = ['San Miguel de Tucumán', 'Yerba Buena', 'Tafí Viejo', 'Banda del Río Salí', 'Las Talitas']
const EDAD_POR_GRADO = { 'Jardín': 5, '1°': 6, '2°': 7, '3°': 8, '4°': 9, '5°': 10, '6°': 11 }

const azar = (lista) => lista[Math.floor(Math.random() * lista.length)]
const probabilidad = (porcentaje) => Math.random() * 100 < porcentaje
const dosDigitos = (numero) => String(numero).padStart(2, '0')

// Fecha al azar entre dos fechas, en formato ISO
function fechaEntre(desde, hasta) {
  return new Date(desde.getTime() + Math.random() * (hasta.getTime() - desde.getTime())).toISOString()
}

function crearUna(ciclo, indice, hoy) {
  const sexo = probabilidad(2) ? 'X' : probabilidad(50) ? 'Femenino' : 'Masculino'
  const grado = azar(GRADOS)
  const apellido = azar(APELLIDOS)
  const anioNacimiento = Number(ciclo) - EDAD_POR_GRADO[grado] - 1
  const tutor = probabilidad(75) ? 'Madre' : 'Padre'
  // Las inscripciones de un ciclo se cargan entre septiembre y diciembre del año anterior
  const inicioCampania = new Date(Number(ciclo) - 1, 8, 1)
  const finCampania = new Date(Math.min(new Date(Number(ciclo) - 1, 11, 20).getTime(), hoy.getTime()))
  const creadaEl = fechaEntre(inicioCampania, finCampania)

  const inscripcion = structuredClone(inscripcionVacia)
  inscripcion.alumno = {
    ...inscripcion.alumno,
    apellidoNombres: `${apellido}, ${azar(NOMBRES[sexo])}`,
    dni: String(50000000 + Math.floor(Math.random() * 9000000)),
    sexo,
    fechaNacimiento: `${anioNacimiento}-${dosDigitos(1 + Math.floor(Math.random() * 12))}-${dosDigitos(1 + Math.floor(Math.random() * 28))}`,
    provinciaNacimiento: 'Tucumán',
    lugarNacimiento: azar(LOCALIDADES),
    domicilio: `Calle ${1 + Math.floor(Math.random() * 900)}`,
    cicloLectivo: ciclo,
    grado,
    repitente: probabilidad(7) ? 'Sí' : 'No',
    tutor,
  }
  const responsable = tutor === 'Madre' ? 'madre' : 'padre'
  inscripcion[responsable] = {
    ...inscripcion[responsable],
    apellidoNombres: `${apellido}, ${tutor === 'Madre' ? 'Laura' : 'Jorge'}`,
    dni: String(28000000 + Math.floor(Math.random() * 9000000)),
    telefonos: `381 ${400 + Math.floor(Math.random() * 500)}-${1000 + Math.floor(Math.random() * 8999)}`,
    planSocial: probabilidad(30) ? 'Asignación Universal' : 'No',
  }
  inscripcion.vivienda = {
    personasEnCasa: String(3 + Math.floor(Math.random() * 4)),
    tenencia: azar(['Propia', 'Alquilada', 'Otros']),
    tipo: 'Material',
    distanciaCuadras: String(Math.floor(Math.random() * 30)),
  }
  inscripcion.contactos[0] = { apellidoNombres: `${azar(APELLIDOS)}, Rosa`, parentesco: 'Abuela', telefonos: '381 555-1234' }

  return {
    ...inscripcion,
    id: `demo-${ciclo}-${indice}`,
    esDemo: true,
    creadaEl,
    actualizadaEl: creadaEl,
    creadaPor: { id: 1, nombre: 'Vicedirectora' },
  }
}

// Tres ciclos: los dos anteriores completos y el que se está inscribiendo ahora
export function generarInscripcionesDemo() {
  const hoy = new Date()
  const proximo = hoy.getFullYear() + 1
  const cantidades = { [proximo - 2]: 72, [proximo - 1]: 80, [proximo]: 55 }
  return Object.entries(cantidades).flatMap(([ciclo, cantidad]) =>
    Array.from({ length: cantidad }, (_, indice) => crearUna(String(ciclo), indice, hoy))
  )
}