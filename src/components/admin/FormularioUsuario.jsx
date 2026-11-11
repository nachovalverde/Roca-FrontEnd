import { useRef, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import CampoSelect from '../common/CampoSelect'
import CampoTexto from '../common/CampoTexto'
import { soloLetras } from '../../utils/filtros'
import { NOMBRE_ROL } from '../../data/roles'
import { GRADOS } from '../../data/opcionesFicha'
import { validarUsuario } from '../../utils/validarUsuario'

function crearDatosIniciales(usuarioInicial) {
    return {
        nombres: usuarioInicial?.nombres ?? '',
        apellido: usuarioInicial?.apellido ?? '',
        usuario: usuarioInicial?.usuario ?? '',
        mail: usuarioInicial?.mail ?? '',
        rol: usuarioInicial?.rol ?? '',
        grado: usuarioInicial?.grado ?? '',
        password: '',
        repetirPassword: '',
    }
}

function FormularioUsuario({ usuarioInicial = null, onGuardar, onCancelar }) {
    const esNuevo = usuarioInicial === null
    const [datos, setDatos] = useState(() => crearDatosIniciales(usuarioInicial))
    const [errores, setErrores] = useState({})
    const [guardando, setGuardando] = useState(false)
    const guardandoRef = useRef(false)

    function cambiarCampo(campo, valor) {
        setDatos((anterior) => ({
            ...anterior,
            [campo]: valor,
            ...(campo === 'rol' && valor !== 'maestro' ? { grado: '' } : {}),
        }))
    }

    async function manejarEnvio(evento) {
        evento.preventDefault()

        const erroresFormulario = validarUsuario(datos, esNuevo)
        setErrores(erroresFormulario)

        if (Object.keys(erroresFormulario).length > 0) return

        const datosParaGuardar = { ...datos }
        delete datosParaGuardar.repetirPassword

        if (guardandoRef.current) return
        guardandoRef.current = true
        setGuardando(true)

        let guardo = false
        try {
            guardo = await onGuardar(datosParaGuardar)
        } finally {
            if (!guardo) {
                guardandoRef.current = false
                setGuardando(false)
            }
        }
    }

    return (
        <Modal
            show
            onHide={onCancelar}
            centered
            size="lg"
            fullscreen="sm-down"
        >
            <Form noValidate onSubmit={manejarEnvio}>
                <Modal.Header closeButton closeLabel="Cerrar">
                    <Modal.Title as="h2" className="h5">
                        {esNuevo ? 'Nueva cuenta' : 'Editar cuenta'}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row className="g-3">
                        <CampoTexto
                            id="usuario-nombres"
                            label="Nombres"
                            name="nombres"
                            value={datos.nombres}
                            onChange={cambiarCampo}
                            error={errores.nombres}
                            requerido
                            md={6}
                            autoComplete="given-name"
                            filtro={soloLetras}
                            maxLength={60}
                        />

                        <CampoTexto
                            id="usuario-apellido"
                            label="Apellido"
                            name="apellido"
                            value={datos.apellido}
                            onChange={cambiarCampo}
                            error={errores.apellido}
                            requerido
                            md={6}
                            autoComplete="family-name"
                            filtro={soloLetras}
                            maxLength={60}
                        />

                        <CampoTexto
                            id="usuario-usuario"
                            label="Nombre de usuario"
                            name="usuario"
                            value={datos.usuario}
                            onChange={cambiarCampo}
                            error={errores.usuario}
                            requerido
                            md={6}
                            autoComplete="username"
                        />

                        <CampoTexto
                            id="usuario-mail"
                            label="Mail"
                            name="mail"
                            type="email"
                            maxLength={100}
                            value={datos.mail}
                            onChange={cambiarCampo}
                            error={errores.mail}
                            requerido
                            md={6}
                            autoComplete="email"
                        />

                        <Col md={6}>
                            <Form.Group controlId="usuario-rol">
                                <Form.Label>Rol</Form.Label>
                                <Form.Select
                                    name="rol"
                                    value={datos.rol}
                                    onChange={(evento) =>
                                        cambiarCampo('rol', evento.target.value)
                                    }
                                    isInvalid={Boolean(errores.rol)}
                                    required
                                >
                                    <option value="">Elegí un rol</option>
                                    {Object.entries(NOMBRE_ROL).map(
                                        ([valor, nombre]) => (
                                            <option key={valor} value={valor}>
                                                {nombre}
                                            </option>
                                        )
                                    )}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errores.rol}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        {datos.rol === 'maestro' && (
                            <CampoSelect
                                id="usuario-grado"
                                label="Grado a cargo"
                                name="grado"
                                value={datos.grado}
                                onChange={cambiarCampo}
                                opciones={GRADOS}
                                error={errores.grado}
                                requerido
                                md={6}
                            />
                        )}

                        <CampoTexto
                            id="usuario-password"
                            label="Contraseña"
                            name="password"
                            type="password"
                            value={datos.password}
                            onChange={cambiarCampo}
                            error={errores.password}
                            requerido={esNuevo}
                            md={6}
                            autoComplete="new-password"
                            minLength={6}
                        />

                        <CampoTexto
                            id="usuario-repetir-password"
                            label="Repetir contraseña"
                            name="repetirPassword"
                            type="password"
                            value={datos.repetirPassword}
                            onChange={cambiarCampo}
                            error={errores.repetirPassword}
                            requerido={esNuevo}
                            md={6}
                            autoComplete="new-password"
                        />

                        {!esNuevo && (
                            <Col xs={12}>
                                <Form.Text>
                                    Dejá la contraseña vacía si no querés cambiarla.
                                </Form.Text>
                            </Col>
                        )}
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        type="button"
                        variant="outline-secondary"
                        onClick={onCancelar}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={guardando}
                    >
                        {guardando
                            ? 'Guardando…'
                            : esNuevo
                              ? 'Crear cuenta'
                              : 'Guardar cambios'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default FormularioUsuario