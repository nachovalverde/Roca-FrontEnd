// Pesos oficiales para el dígito verificador del CUIL/CUIT
const PESOS = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]

// Dígito verificador de los primeros 10 dígitos. Si da 10, esa combinación no es un CUIL válido.
export function digitoVerificadorCuil(primerosDiez) {
  const suma = [...primerosDiez].reduce((total, digito, indice) => total + Number(digito) * PESOS[indice], 0)
  const resto = suma % 11
  return resto === 0 ? 0 : 11 - resto
}

// CUIL de una persona: empieza con 20, 23, 24 o 27 y el último dígito tiene que ser el verificador
export function cuilValido(cuil) {
  if (!/^(20|23|24|27)\d{9}$/.test(cuil)) return false
  const digito = digitoVerificadorCuil(cuil.slice(0, 10))
  return digito < 10 && digito === Number(cuil[10])
}

// El DNI que lleva adentro el CUIL: 20-08123456-3 → '8123456'
export const dniDelCuil = (cuil) => String(Number(cuil.slice(2, 10)))