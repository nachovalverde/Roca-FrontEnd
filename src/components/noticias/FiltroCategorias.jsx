import { Button, ButtonGroup } from 'react-bootstrap'


const categorias = ['Todas', 'Comunicados', 'Actividades', 'Novedades']

function FiltroCategorias({ activa, onCambiar }) {
    return (
        <ButtonGroup className="flex-wrap" aria-label="Filtrar novedades por categoria">
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