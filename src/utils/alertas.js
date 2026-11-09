import Swal from 'sweetalert2'

export const Alerta = Swal.mixin({
    buttonsStyling: false,
    customClass: {
        confirmButton: 'btn btn-primary mx-1',
        cancelButton: 'btn btn-outline-secondary mx-1',
    },
})

export function mostrarError(
    error,
    titulo = 'No se pudo completar la acción'
) {
    return Alerta.fire({
        icon: 'error',
        title: titulo,
        text:
            error?.message ||
            'Ocurrió un error inesperado. Probá de nuevo en unos minutos.',
        confirmButtonText: 'Entendido',
    })
}

export function mostrarExito(titulo) {
    return Alerta.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: titulo,
        showConfirmButton: false,
        timer: 2000,
    })
}