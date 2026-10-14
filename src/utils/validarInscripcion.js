const MENSAJE_OBLIGATORIO = 'Completá este campo'

// Campos obligatorios de cada sección. 
export const CAMPOS_REQUERIDOS = {
  alumno: ['apellidoNombres', 'dni', 'fechaNacimiento', 'domicilio', 'grado', 'repitente', 'tutor'],
  tutor: ['apellidoNombres', 'dni', 'telefonos'],
  vivienda: ['personasEnCasa', 'tenencia', 'tipo'],
  contacto: ['apellidoNombres', 'parentesco', 'telefonos'],
}

const estaVacio = (valor) => String(valor ?? '').trim() === ''
const dniValido = (dni) => /^(\d{7,8}|\d{11})$/.test(dni)
const telefonoValido = (telefono) => telefono.replace(/\D/g, '').length >= 7
const mailValido = (mail) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)

// Devuelve un error por cada campo obligatorio que esté vacío
function faltantes(datos, campos) {
  const errores = {}
  campos.forEach((campo) => {
    if (estaVacio(datos[campo])) errores[campo] = MENSAJE_OBLIGATORIO
  })
  return errores
}

export function validarAlumno(alumno) {
  const errores = faltantes(alumno, CAMPOS_REQUERIDOS.alumno)

  if (!errores.dni && !dniValido(alumno.dni)) {
    errores.dni = 'Ingresá un DNI de 7 u 8 dígitos o un CUIL de 11'
  }
  if (!errores.fechaNacimiento && new Date(`${alumno.fechaNacimiento}T00:00:00`) > new Date()) {
    errores.fechaNacimiento = 'La fecha no puede ser posterior a hoy'
  }
  return errores
}

export function validarTutor(tutor, esTutor) {
  // Solo es obligatorio para quien figura como tutor; del otro se revisa el formato
  const errores = esTutor ? faltantes(tutor, CAMPOS_REQUERIDOS.tutor) : {}

  if (!errores.dni && !estaVacio(tutor.dni) && !dniValido(tutor.dni)) {
    errores.dni = 'Ingresá un DNI de 7 u 8 dígitos o un CUIL de 11'
  }
  if (!errores.telefonos && !estaVacio(tutor.telefonos) && !telefonoValido(tutor.telefonos)) {
    errores.telefonos = 'Ingresá al menos un teléfono completo (7 dígitos o más)'
  }
  if (!estaVacio(tutor.mail) && !mailValido(tutor.mail)) {
    errores.mail = 'Revisá el mail: ejemplo como nombre@gmail.com'
  }
  return errores
}

export function validarVivienda(vivienda) {
  const errores = faltantes(vivienda, CAMPOS_REQUERIDOS.vivienda)

  if (!errores.personasEnCasa && Number(vivienda.personasEnCasa) < 1) {
    errores.personasEnCasa = 'Tiene que vivir al menos una persona'
  }
  return errores
}

export function validarContacto(contacto, esObligatorio) {
  const errores = esObligatorio ? faltantes(contacto, CAMPOS_REQUERIDOS.contacto) : {}

  if (!errores.telefonos && !estaVacio(contacto.telefonos) && !telefonoValido(contacto.telefonos)) {
    errores.telefonos = 'Ingresá al menos un teléfono completo (7 dígitos o más)'
  }
  return errores
}

// Errores del paso que se está mostrando. En Contactos devuelve uno por contacto.
export function validarPaso(paso, datos) {
  switch (paso) {
    case 0:
      return validarAlumno(datos.alumno)
    case 1:
      return validarTutor(datos.padre, datos.alumno.tutor === 'Padre')
    case 2:
      return validarTutor(datos.madre, datos.alumno.tutor === 'Madre')
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