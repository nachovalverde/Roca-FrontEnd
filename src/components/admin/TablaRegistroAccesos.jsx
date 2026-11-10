import { Badge, Table } from 'react-bootstrap'
import { NOMBRE_ROL } from '../../data/roles'

function varianteEvento(evento) {
    if (evento === 'Ingreso') return 'success'
    if (evento === 'Intento fallido') return 'danger'
    if (evento === 'Salida') return 'secondary'

    return 'primary'
}

function TablaRegistroAccesos({ registros }) {
    return (
        <Table responsive hover className="align-middle position-relative">
            <caption className="visually-hidden">
                Historial de accesos y cambios de cuentas
            </caption>

            <thead>
                <tr>
                    <th scope="col">Fecha y hora</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Evento</th>
                    <th scope="col">Detalle</th>
                </tr>
            </thead>

            <tbody>
                {registros.length > 0 ? (
                    registros.map((registro) => (
                        <tr key={registro.id}>
                            <td>
                                {new Date(registro.fecha).toLocaleString('es-AR')}
                            </td>
                            <td>{registro.usuario || '—'}</td>
                            <td>{registro.nombre || '—'}</td>
                            <td>
                                {NOMBRE_ROL[registro.rol] ?? registro.rol ?? '—'}
                            </td>
                            <td>
                                <Badge bg={varianteEvento(registro.evento)}>
                                    {registro.evento}
                                </Badge>
                            </td>
                            <td>{registro.detalle || '—'}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={6}
                            className="py-4 text-center text-body-secondary"
                        >
                            No hay eventos que coincidan con los filtros.
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}

export default TablaRegistroAccesos