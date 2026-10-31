
// 'Pérez, Martina' → 'perez, martina'
// normalize('NFD') separa cada letra de su tilde, y el replace borra las tildes sueltas
export function normalizarTexto(texto) {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
}