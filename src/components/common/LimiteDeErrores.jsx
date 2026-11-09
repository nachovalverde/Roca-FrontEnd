import { Component } from 'react'
import { Alert, Button } from 'react-bootstrap'

class LimiteDeErrores extends Component {
    constructor(props) {
        super(props)
        this.state = { ocurrioError: false }
    }

    static getDerivedStateFromError() {
        return { ocurrioError: true }
    }

    componentDidCatch(error, informacion) {
        console.error('Error al mostrar la página:', error, informacion)
    }

    render() {
        if (this.state.ocurrioError) {
            return (
                <Alert variant="danger" role="alert" className="m-4">
                    <Alert.Heading>Ocurrió un problema</Alert.Heading>
                    <p>
                        No se pudo mostrar esta página. Recargá el sitio para
                        volver a intentarlo.
                    </p>
                    <Button
                        variant="danger"
                        onClick={() => window.location.reload()}
                    >
                        Recargar página
                    </Button>
                </Alert>
            )
        }

        return this.props.children
    }
}

export default LimiteDeErrores