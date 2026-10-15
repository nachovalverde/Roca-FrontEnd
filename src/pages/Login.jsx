import { useState } from 'react'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { RUTA_POR_ROL } from '../data/roles'

function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

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

            // Si venía de una página protegida vuelve ahí; si no, va al panel de su rol
            const destino = location.state?.desde ?? RUTA_POR_ROL[usuarioAutenticado.rol] ?? '/'
            navigate(destino, { replace: true })
        } catch (errorLogin) {
            setError(errorLogin.message)
        }
    }

    return (
        <Container className="py-5">
            <title>Ingresar · Escuela Roca</title>
            <meta name="robots" content="noindex" />

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