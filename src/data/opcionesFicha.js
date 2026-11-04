export const PASOS = ['Alumno', 'Padre', 'Madre', 'Vivienda', 'Contactos', 'Revisión']

export const GRADOS = ['Jardín', '1°', '2°', '3°', '4°', '5°', '6°']
export const SI_NO = ['Sí', 'No']
export const TUTORES = ['Padre', 'Madre']

export const CARACTERES = ['Permanente', 'Contratado', 'Independiente']
export const NIVELES_ESTUDIO = ['Primario', 'Secundario', 'Terciario', 'Universitario']
export const ESTADOS_ESTUDIO = ['Completo', 'Incompleto']
export const PLAN_SOCIAL = ['No', 'Asignación Universal', 'Otro plan social']

export const TENENCIAS = ['Propia', 'Alquilada', 'Otros']
export const TIPOS_VIVIENDA = ['Material', 'Prefabricada', 'Otros']

export const SEXOS = ['Femenino', 'Masculino', 'X']

const ANIO_ACTUAL = new Date().getFullYear()
export const CICLOS = [ANIO_ACTUAL - 2, ANIO_ACTUAL - 1, ANIO_ACTUAL, ANIO_ACTUAL + 1].map(String)