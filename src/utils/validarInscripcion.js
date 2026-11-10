import { cuilValido, dniDelCuil } from './cuil'

const MENSAJE_OBLIGATORIO = 'Completá este campo'

// Campos obligatorios de cada sección
export const CAMPOS_REQUERIDOS = {
  alumno: ['apellido', 'nombres', 'dni', 'sexo', 'fechaNacimiento', 'domicilioCalle', 'domicilioNumero', 'cicloLectivo', 'grado', 'repitente', 'tutor'],
  tutor: ['apellido', 'nombres', 'dni', 'telefono'],
  vivienda: ['personasEnCasa', 'tenencia', 'tipo'],
  contacto: ['apellido', 'nombres', 'parentesco', 'telefono'],
}

// Edades que recibe la escuela: Nivel Inicial y Primario, contando repitentes
const EDAD_MINIMA = 3
const EDAD_MAXIMA = 14

const estaVacio = (valor) => String(valor ?? '').trim() === ''
const dniValido = (dni) => /^\d{7,8}$/.test(dni)
const telefonoValido = (telefono) => telefono.replace(/\D/g, '').length >= 7
const mailValido = (mail) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)
const numeroDeCasaValido = (numero) => /^(\d{1,5}|S\/N)$/.test(numero)

// Edad que tiene el alumno a mitad del ciclo al que se inscribe (30 de junio).
// Si todavía no eligió el ciclo, se calcula a hoy.
function edadEnElCiclo(fechaNacimiento, cicloLectivo) {
  const nacimiento = new Date(`${fechaNacimiento}T00:00:00`)
  const referencia = cicloLectivo ? new Date(Number(cicloLectivo), 5, 30) : new Date()
  let edad = referencia.getFullYear() - nacimiento.getFullYear()
  const todaviaNoCumplio =
    referencia.getMonth() < nacimiento.getMonth() ||
    (referencia.getMonth() === nacimiento.getMonth() && referencia.getDate() < nacimiento.getDate())
  if (todaviaNoCumplio) edad -= 1
  return edad
}

// Devuelve un error por cada campo obligatorio que esté vacío
function faltantes(datos, campos) {
  const errores = {}
  campos.forEach((campo) => {
    if (estaVacio(datos[campo])) errores[campo] = MENSAJE_OBLIGATORIO
  })
  return errores
}

// Apellido y nombres: si se escribieron, al menos 2 letras cada uno
function revisarNombre(datos, errores) {
  for (const campo of ['apellido', 'nombres']) {
    const largo = String(datos[campo] ?? '').trim().length
    if (!errores[campo] && largo > 0 && largo < 2) errores[campo] = 'Tiene que tener al menos 2 letras'
  }
}

// DNI obligatorio donde corresponda; el CUIL es opcional, pero si está tiene que ser válido y del mismo DNI
function revisarDocumento(persona, errores) {
  if (!errores.dni && !estaVacio(persona.dni) && !dniValido(persona.dni)) {
    errores.dni = 'Ingresá un DNI de 7 u 8 dígitos'
  }
  if (!estaVacio(persona.cuil)) {
    if (persona.cuil.length !== 11) {
      errores.cuil = 'El CUIL tiene 11 dígitos'
    } else if (!cuilValido(persona.cuil)) {
      errores.cuil = 'Revisá el CUIL: el último dígito no coincide'
    } else if (dniValido(persona.dni) && dniDelCuil(persona.cuil) !== String(Number(persona.dni))) {
      errores.cuil = 'Este CUIL no corresponde al DNI'
    }
  }
}

function revisarTelefonos(persona, errores) {
  for (const campo of ['telefono', 'telefonoAlternativo']) {
    if (!errores[campo] && !estaVacio(persona[campo]) && !telefonoValido(persona[campo])) {
      errores[campo] = 'Ingresá un teléfono completo (7 dígitos o más)'
    }
  }
}

function revisarDomicilio(persona, errores) {
  if (!errores.domicilioCalle && !estaVacio(persona.domicilioCalle) && persona.domicilioCalle.trim().length < 3) {
    errores.domicilioCalle = 'Escribí el nombre de la calle'
  }
  if (!errores.domicilioNumero && !estaVacio(persona.domicilioNumero) && !numeroDeCasaValido(persona.domicilioNumero)) {
    errores.domicilioNumero = 'Número o S/N'
  }
}

export function validarAlumno(alumno) {
  const errores = faltantes(alumno, CAMPOS_REQUERIDOS.alumno)
  revisarNombre(alumno, errores)

  revisarDocumento(alumno, errores)
  revisarDomicilio(alumno, errores)
  if (!errores.fechaNacimiento) {
    if (new Date(`${alumno.fechaNacimiento}T00:00:00`) > new Date()) {
      errores.fechaNacimiento = 'La fecha no puede ser posterior a hoy'
    } else {
      const edad = edadEnElCiclo(alumno.fechaNacimiento, alumno.cicloLectivo)
      if (edad < EDAD_MINIMA || edad > EDAD_MAXIMA) {
        errores.fechaNacimiento = `Revisá la fecha: el alumno tendría ${edad} años en el ciclo, y la escuela recibe de ${EDAD_MINIMA} a ${EDAD_MAXIMA}`
      }
    }
  }
  return errores
}

export function validarTutor(tutor, esTutor, dniAlumno = '') {
  // Solo es obligatorio para quien figura como tutor; del otro se revisa el formato
  const errores = esTutor ? faltantes(tutor, CAMPOS_REQUERIDOS.tutor) : {}
  revisarNombre(tutor, errores)

  revisarDocumento(tutor, errores)
  if (!errores.dni && dniValido(tutor.dni) && Number(tutor.dni) === Number(dniAlumno)) {
    errores.dni = 'Es el mismo DNI del alumno: revisalo'
  }
  revisarTelefonos(tutor, errores)
  revisarDomicilio(tutor, errores)
  if (!estaVacio(tutor.mail) && !mailValido(tutor.mail)) {
    errores.mail = 'Revisá el mail: tiene que ser como nombre@gmail.com'
  }
  return errores
}

export function validarVivienda(vivienda) {
  const errores = faltantes(vivienda, CAMPOS_REQUERIDOS.vivienda)
  const personas = Number(vivienda.personasEnCasa)

  if (!errores.personasEnCasa && (personas < 2 || personas > 30)) {
    errores.personasEnCasa = 'Tienen que ser entre 2 y 30 personas, contando al alumno'
  }
  return errores
}

// El segundo contacto es opcional, pero si se empezó a completar, se completa entero
export const contactoEmpezado = (contacto) =>
  ['apellido', 'nombres', 'parentesco', 'telefono', 'telefonoAlternativo'].some((campo) => !estaVacio(contacto[campo]))

export function validarContacto(contacto, esObligatorio) {
  const errores = esObligatorio || contactoEmpezado(contacto) ? faltantes(contacto, CAMPOS_REQUERIDOS.contacto) : {}
  revisarNombre(contacto, errores)
  revisarTelefonos(contacto, errores)
  return errores
}

// Errores del paso que se está mostrando. En Contactos devuelve uno por contacto.
export function validarPaso(paso, datos) {
  switch (paso) {
    case 0:
      return validarAlumno(datos.alumno)
    case 1:
      return validarTutor(datos.padre, datos.alumno.tutor === 'Padre', datos.alumno.dni)
    case 2:
      return validarTutor(datos.madre, datos.alumno.tutor === 'Madre', datos.alumno.dni)
    case 3:
      return validarVivienda(datos.vivienda)
    case 4:
      return datos.contactos.map((contacto, indice) => validarContacto(contacto, indice === 0))
    default:
      return {}
  }
}

// true si queda algún mensaje, aunque esté dentro del array de contactos
export function hayErrores(errores) {
  return Object.values(errores).some((valor) =>
    typeof valor === 'object' ? hayErrores(valor) : Boolean(valor)
  )
}