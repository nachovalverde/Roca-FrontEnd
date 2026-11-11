import { dniDelCuil } from './cuil'

// ── Cómo se muestran los datos de una persona ──────────────────────────────
// Se guardan separados (como van a estar en la base) y se muestran juntos

// 'Pérez, Martina'
export function nombreCompleto(persona) {
  const apellido = persona?.apellido?.trim() ?? ''
  const nombres = persona?.nombres?.trim() ?? ''
  if (apellido && nombres) return `${apellido}, ${nombres}`
  return apellido || nombres
}

// 'DNI 50111222 · CUIL 27-50111222-4'
export function documentoCompleto(persona) {
  if (!persona?.dni) return ''
  const { cuil } = persona
  const cuilConGuiones = cuil ? ` · CUIL ${cuil.slice(0, 2)}-${cuil.slice(2, 10)}-${cuil.slice(10)}` : ''
  return `DNI ${persona.dni}${cuilConGuiones}`
}

// '381 555-1234 / 381 444-5555'
export const telefonosDe = (persona) =>
  [persona?.telefono, persona?.telefonoAlternativo].filter(Boolean).join(' / ')

// 'Lavalle 450, 2.º B, Barrio Norte'
export function domicilioCompleto(persona) {
  const calleYNumero = `${persona?.domicilioCalle ?? ''} ${persona?.domicilioNumero ?? ''}`.trim()
  return [calleYNumero, persona?.domicilioPisoDepto, persona?.domicilioBarrio].filter(Boolean).join(', ')
}

// ── Migración de las inscripciones guardadas con el formato viejo ──────────
// Se aplica al leer: si el dato ya está separado, no cambia nada

// 'Pérez, Martina' → apellido 'Pérez' y nombres 'Martina'. Sin coma, todo queda en apellido.
export function separarApellidoNombres(texto) {
  const limpio = String(texto ?? '').trim()
  const coma = limpio.indexOf(',')
  if (coma === -1) return { apellido: limpio, nombres: '' }
  return { apellido: limpio.slice(0, coma).trim(), nombres: limpio.slice(coma + 1).trim() }
}

// Un CUIL cargado en el campo «CUIL o DNI» pasa al campo CUIL, y su DNI al campo DNI
export function separarDocumento(documento) {
  const limpio = String(documento ?? '').replace(/\D/g, '')
  return limpio.length === 11 ? { dni: dniDelCuil(limpio), cuil: limpio } : { dni: limpio, cuil: '' }
}

// '381 555-1234 / 381 444-5555' → el primero y el resto
export function separarTelefonos(texto) {
  const [telefono = '', ...otros] = String(texto ?? '').split(/\s*[/,;]\s*|\s+y\s+/).map((t) => t.trim()).filter(Boolean)
  return { telefono, telefonoAlternativo: otros.join(' / ') }
}

// 'Lavalle 450 2.º B' → calle 'Lavalle', número '450', piso y depto. '2.º B'.
// El número es el último número suelto de 2 cifras o más (o S/N): así «25 de Mayo 340» da 340 y no 25.
// Si no hay número, todo queda en calle, para revisarlo al editar.
export function separarDomicilio(texto) {
  const limpio = String(texto ?? '').trim()
  const vacio = { domicilioCalle: limpio, domicilioNumero: '', domicilioPisoDepto: '', domicilioBarrio: '' }
  const candidatos = [...limpio.matchAll(/\s(\d{1,5}|s\/n)(?=[\s,]|$)/gi)]
  const elegido = candidatos.filter((c) => c[1].length >= 2).pop() ?? candidatos.pop()
  if (!elegido) return vacio
  return {
    ...vacio,
    domicilioCalle: limpio.slice(0, elegido.index).replace(/[\s,]+$/, ''),
    domicilioNumero: elegido[1].toUpperCase(),
    domicilioPisoDepto: limpio.slice(elegido.index + elegido[0].length).replace(/^[\s,]+/, ''),
  }
}

export function migrarPersona(persona) {
  if (!persona) return persona
  let migrada = { ...persona }
  if ('apellidoNombres' in migrada) {
    const { apellidoNombres, ...resto } = migrada
    migrada = { ...separarApellidoNombres(apellidoNombres), ...resto }
  }
  if ('dni' in migrada && !('cuil' in migrada)) {
    migrada = { ...migrada, ...separarDocumento(migrada.dni) }
  }
  if ('telefonos' in migrada) {
    const { telefonos, ...resto } = migrada
    migrada = { ...resto, ...separarTelefonos(telefonos) }
  }
  if (typeof migrada.domicilio === 'string') {
    const { domicilio, ...resto } = migrada
    migrada = { ...resto, ...separarDomicilio(domicilio) }
  }
  return migrada
}

export function migrarInscripcion(inscripcion) {
  return {
    ...inscripcion,
    alumno: migrarPersona(inscripcion.alumno),
    padre: migrarPersona(inscripcion.padre),
    madre: migrarPersona(inscripcion.madre),
    contactos: (inscripcion.contactos ?? []).map(migrarPersona),
  }
}