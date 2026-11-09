import { useState } from 'react'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Alerta } from '../utils/alertas'
import { validarPassword } from '../utils/validarUsuario'
import {
    restablecer,
    solicitarCodigo,
} from '../services/recuperacionService'

function RecuperarContrasena() {
    const navigate = useNavigate()

    const [paso, setPaso] = useState(1)
    const [usuarioOMail, setUsuarioOMail] = useState('')
    const [codigo, setCodigo] = useState('')
    const [nuevaPassword, setNuevaPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')
    const [errores, setErrores] = useState({})
    const [error, setError] = useState('')
    const [enviando, setEnviando] = useState(false)

    async function manejarSolicitud(evento) {
        evento.preventDefault()
        setError('')
        setEnviando(true)

        try {
            const resultado = await solicitarCodigo(usuarioOMail.trim())
            setPaso(2)

            const mensaje = resultado.codigoDemo
                ? `En una versión con servidor, el código se enviaría a ${resultado.mailOculto}. Para probar esta demo, tu código es: ${resultado.codigoDemo}.`
                : 'Si la cuenta existe y está activa, recibirás instrucciones para restablecer tu contraseña.'

            await Alerta.fire({
                icon: 'info',
                title: 'Solicitud procesada',
                text: mensaje,
                confirmButtonText: 'Continuar',
            })
        } catch (errorSolicitud) {
            setError(errorSolicitud.message)
        } finally {
            setEnviando(false)
        }
    }

    async function manejarRestablecimiento(evento) {
        evento.preventDefault()
        setError('')

        const erroresPassword = validarPassword(
            nuevaPassword,
            repetirPassword
        )
        setErrores(erroresPassword)

        if (Object.keys(erroresPassword).length > 0) return

        setEnviando(true)

        try {
            await restablecer(usuarioOMail.trim(), codigo, nuevaPassword)

            await Alerta.fire({
                icon: 'success',
                title: 'Contraseña actualizada',
                text: 'Ya podés ingresar con tu nueva contraseña.',
                confirmButtonText: 'Ir al login',
            })

            navigate('/login', { replace: true })
        } catch (errorRestablecimiento) {
            setError(errorRestablecimiento.message)
        } finally {
            setEnviando(false)
        }
    }

    function solicitarOtroCodigo() {
        setPaso(1)
        setCodigo('')
        setNuevaPassword('')
        setRepetirPassword('')
        setErrores({})
        setError('')
    }

    return (
        <Container className="py-5">
            <title>Recuperar contraseña · Escuela Roca</title>
            <meta name="robots" content="noindex" />

            <Card className="mx-auto" style={{ maxWidth: '500px' }}>
                <Card.Body className="p-4">
                    <h1 className="h3 mb-3">Recuperar contraseña</h1>

                    {error && <Alert variant="danger">{error}</Alert>}

                    {paso === 1 ? (
                        <>
                            <p className="text-body-secondary">
                                Escribí tu usuario o mail para solicitar un
                                código de recuperación.
                            </p>

                            <Form onSubmit={manejarSolicitud}>
                                <Form.Group
                                    className="mb-4"
                                    controlId="usuarioOMailRecuperacion"
                                >
                                    <Form.Label>Usuario o mail</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoComplete="username"
                                        value={usuarioOMail}
                                        onChange={(evento) =>
                                            setUsuarioOMail(evento.target.value)
                                        }
                                        required
                                    />
                                </Form.Group>

                                <Button
                                    type="submit"
                                    className="w-100"
                                    disabled={enviando}
                                >
                                    {enviando
                                        ? 'Solicitando…'
                                        : 'Solicitar código'}
                                </Button>
                            </Form>
                        </>
                    ) : (
                        <>
                            <p className="text-body-secondary">
                                Ingresá el código de seis dígitos y elegí una
                                contraseña nueva.
                            </p>

                            <Form onSubmit={manejarRestablecimiento}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="codigoRecuperacion"
                                >
                                    <Form.Label>Código de recuperación</Form.Label>
                                    <Form.Control
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                        pattern="[0-9]{6}"
                                        maxLength={6}
                                        value={codigo}
                                        onChange={(evento) =>
                                            setCodigo(evento.target.value)
                                        }
                                        required
                                    />
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId="nuevaPassword"
                                >
                                    <Form.Label>Nueva contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        autoComplete="new-password"
                                        value={nuevaPassword}
                                        onChange={(evento) =>
                                            setNuevaPassword(evento.target.value)
                                        }
                                        isInvalid={Boolean(errores.password)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errores.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group
                                    className="mb-4"
                                    controlId="repetirPassword"
                                >
                                    <Form.Label>
                                        Repetí la nueva contraseña
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        autoComplete="new-password"
                                        value={repetirPassword}
                                        onChange={(evento) =>
                                            setRepetirPassword(
                                                evento.target.value
                                            )
                                        }
                                        isInvalid={Boolean(
                                            errores.repetirPassword
                                        )}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errores.repetirPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button
                                    type="submit"
                                    className="w-100"
                                    disabled={enviando}
                                >
                                    {enviando
                                        ? 'Actualizando…'
                                        : 'Cambiar contraseña'}
                                </Button>
                            </Form>

                            <Button
                                type="button"
                                variant="link"
                                className="px-0 mt-3"
                                onClick={solicitarOtroCodigo}
                            >
                                Solicitar otro código
                            </Button>
                        </>
                    )}

                    <div className="mt-3">
                        <Link to="/login">Volver al login</Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default RecuperarContrasena