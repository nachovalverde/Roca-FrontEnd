export function guardarEnNavegador(clave, valor) {
    try {
        localStorage.setItem(clave, valor)
    } catch {
        throw new Error(
            'No se pudo guardar: el almacenamiento del navegador está lleno o bloqueado.'
        )
    }
}