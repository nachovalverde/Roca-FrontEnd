export function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return ''

  // 'T00:00:00' evita que la fecha se corra un día por la zona horaria
  const nacimiento = new Date(`${fechaNacimiento}T00:00:00`)
  const hoy = new Date()

  let edad = hoy.getFullYear() - nacimiento.getFullYear()
  const todaviaNoCumplio =
    hoy.getMonth() < nacimiento.getMonth() ||
    (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate())

  if (todaviaNoCumplio) edad--
  return edad >= 0 ? edad : ''
}