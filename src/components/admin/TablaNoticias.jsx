import { Badge, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { formatearFecha } from '../../utils/formatearFecha'

function TablaNoticias({
    noticias,
    onEditar,
    onCambiarPublicacion,
    onEliminar,
}) {
    return (
        <Table responsive hover className="align-middle position-relative">
            <caption className="visually-hidden">
                Noticias de la escuela
            </caption>

            <thead>
                <tr>
                    <th scope="col" className="d-none d-sm-table-cell">Fecha</th>
                    <th scope="col">Título</th>
                    <th scope="col" className="d-none d-md-table-cell">Categoría</th>
                    <th scope="col">Estado</th>
                    <th scope="col">
                        <span className="visually-hidden">Acciones</span>
                    </th>
                </tr>
            </thead>

            <tbody>
                {noticias.length > 0 ? (
                    noticias.map((noticia) => (
                        <tr key={noticia.id}>
                            <td className="d-none d-sm-table-cell">
                                {formatearFecha(noticia.fecha)}
                            </td>

                            <td className="fw-semibold">
                                {noticia.publicada ? (
                                    <Link to={`/noticias/${noticia.id}`}>
                                        {noticia.titulo}
                                    </Link>
                                ) : (
                                    noticia.titulo
                                )}
                            </td>

                            <td className="d-none d-md-table-cell">{noticia.categoria}</td>

                            <td>
                                <Badge
                                    bg={
                                        noticia.publicada
                                            ? 'success'
                                            : 'secondary'
                                    }
                                >
                                    {noticia.publicada
                                        ? 'Publicada'
                                        : 'Borrador'}
                                </Badge>
                            </td>

                            <td>
                                <div className="d-flex flex-wrap gap-2">
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline-primary"
                                        onClick={() => onEditar(noticia)}
                                        aria-label={`Editar ${noticia.titulo}`}
                                    >
                                        Editar
                                    </Button>

                                    <Button
                                        type="button"
                                        size="sm"
                                        variant={
                                            noticia.publicada
                                                ? 'outline-secondary'
                                                : 'outline-success'
                                        }
                                        onClick={() =>
                                            onCambiarPublicacion(
                                                noticia.id,
                                                !noticia.publicada
                                            )
                                        }
                                    >
                                        {noticia.publicada
                                            ? 'Despublicar'
                                            : 'Publicar'}
                                    </Button>

                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline-danger"
                                        onClick={() => onEliminar(noticia.id)}
                                        aria-label={`Eliminar ${noticia.titulo}`}
                                    >
                                        Eliminar
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={5}
                            className="py-4 text-center text-body-secondary"
                        >
                            No hay noticias para mostrar.
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}

export default TablaNoticias