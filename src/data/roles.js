
// Panel al que va cada rol después de ingresar.
// Lo vamos a usar en  Login (para redirigir) y NavbarPrincipal (para el enlace Mi panel).
export const RUTA_POR_ROL = {
  vicedirectora: '/admin',
  maestro: '/docente',
}

// Quiénes pueden entrar al módulo de inscripciones
export const ROLES_INSCRIPCIONES = ['maestro', 'vicedirectora']

// Cómo se muestra cada rol en pantalla
export const NOMBRE_ROL = { vicedirectora: 'Vicedirectora', maestro: 'Maestro/a' }
