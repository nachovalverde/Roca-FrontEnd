import { Button, ButtonGroup } from 'react-bootstrap'
import { CATEGORIAS_NOTICIAS } from '../../data/categoriasNoticias'

const categorias = ['Todas', ...CATEGORIAS_NOTICIAS]

function FiltroCategorias({ activa, onCambiar }) {
    return (
        <ButtonGroup
            className="flex-wrap"
            aria-label="Filtrar novedades por categoría"
        >
            {categorias.map((categoria) => (
                <Button
                    key={categoria}
                    type="button"
                    variant={activa === categoria ? 'primary' : 'outline-primary'}
                    onClick={() => onCambiar(categoria)}
                >
                    {categoria}
                </Button>
            ))}
        </ButtonGroup>
    )
}

export default FiltroCategorias