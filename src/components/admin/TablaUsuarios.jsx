import { Badge, Button, Table } from 'react-bootstrap'
import { NOMBRE_ROL } from '../../data/roles'

function TablaUsuarios({
    usuarios,
    usuarioActual,
    onEditar,
    onCambiarEstado,
}) {
    return (
        <Table responsive hover className="align-middle position-relative">
            <caption className="visually-hidden">
                Cuentas de usuarios de la escuela
            </caption>

            <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col" className="d-none d-sm-table-cell">
                        Usuario
                    </th>
                    <th scope="col" className="d-none d-md-table-cell">
                        Mail
                    </th>
                    <th scope="col" className="d-none d-sm-table-cell">
                        Rol
                    </th>
                    <th scope="col" className="d-none d-md-table-cell">
                        Grado
                    </th>
                    <th scope="col">Estado</th>
                    <th scope="col" className="d-none d-lg-table-cell">
                        Último acceso
                    </th>
                    <th scope="col">
                        <span className="visually-hidden">Acciones</span>
                    </th>
                </tr>
            </thead>

            <tbody>
                {usuarios.length > 0 ? (
                    usuarios.map((usuario) => {
                        const esUsuarioActual = usuarioActual?.id === usuario.id

                        return (
                            <tr key={usuario.id}>
                                <td className="fw-semibold">{usuario.nombre}</td>

                                <td className="d-none d-sm-table-cell">
                                    {usuario.usuario}
                                </td>

                                <td className="d-none d-md-table-cell">
                                    {usuario.mail || '—'}
                                </td>

                                <td className="d-none d-sm-table-cell">
                                    {NOMBRE_ROL[usuario.rol] ?? usuario.rol}
                                </td>

                                <td className="d-none d-md-table-cell">
                                    {usuario.grado || '—'}
                                </td>

                                <td>
                                    <Badge
                                        bg={usuario.activo ? 'success' : 'secondary'}
                                    >
                                        {usuario.activo ? 'Activa' : 'Inactiva'}
                                    </Badge>
                                </td>

                                <td className="d-none d-lg-table-cell">
                                    {usuario.ultimoAcceso
                                        ? new Date(usuario.ultimoAcceso).toLocaleString(
                                              'es-AR'
                                          )
                                        : 'Nunca'}
                                </td>

                                <td>
                                    <div className="d-flex flex-wrap justify-content-end gap-2">
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="outline-primary"
                                            onClick={() => onEditar(usuario)}
                                            aria-label={`Editar la cuenta de ${usuario.nombre}`}
                                        >
                                            Editar
                                        </Button>

                                        {!esUsuarioActual && (
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant={
                                                    usuario.activo
                                                        ? 'outline-danger'
                                                        : 'outline-success'
                                                }
                                                onClick={() =>
                                                    onCambiarEstado(
                                                        usuario.id,
                                                        !usuario.activo
                                                    )
                                                }
                                                aria-label={`${usuario.activo ? 'Desactivar' : 'Reactivar'} la cuenta de ${usuario.nombre}`}
                                            >
                                                {usuario.activo
                                                    ? 'Desactivar'
                                                    : 'Reactivar'}
                                            </Button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan={8} className="text-center text-body-secondary py-4">
                            No hay usuarios para mostrar.
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}

export default TablaUsuarios