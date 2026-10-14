import { useState } from 'react'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [nombreUsuario, setNombreUsuario] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [mensaje, setMensaje] = useState('')

    function manejarEnvio(evento) {
        evento.preventDefault()
        setError('')
        setMensaje('')

        try {
            const usuarioAutenticado = login(nombreUsuario, password)

            if (usuarioAutenticado.rol === 'vicedirectora') {
                navigate('/admin', { replace: true })
            } else {
                navigate('/', { replace: true })
            }
        } catch (errorLogin) {
            setError(errorLogin.message)
        }
    }

    return (
        <Container className="py-5">
            <Card className="mx-auto" style={{ maxWidth: '450px' }}>
                <Card.Body className="p-4">
                    <h1 className="h3 mb-4">Ingresar</h1>

                    {error && <Alert variant="danger">{error}</Alert>}
                    {mensaje && <Alert variant="success">{mensaje}</Alert>}

                    <Form onSubmit={manejarEnvio}>
                        <Form.Group className="mb-3" controlId="nombreUsuario">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="username"
                                value={nombreUsuario}
                                onChange={(evento) => setNombreUsuario(evento.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(evento) => setPassword(evento.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button type="submit" variant="primary" className="w-100">
                            Iniciar sesion
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Login