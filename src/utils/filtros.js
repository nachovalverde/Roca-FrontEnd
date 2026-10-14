
export const soloDigitos = (texto) => texto.replace(/\D/g, '')
export const soloTelefono = (texto) => texto.replace(/[^\d\s+\-/]/g, '')
export const soloLetras = (texto) => texto.replace(/[^\p{L}\s',.-]/gu, '')