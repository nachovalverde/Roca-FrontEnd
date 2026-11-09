import { useEffect, useState } from 'react'
import {
    Button,
    Container,
    Row,
    Spinner,
    Tab,
    Tabs,
} from 'react-bootstrap'
import Swal from 'sweetalert2'
import CampoSelect from '../components/common/CampoSelect'
import CampoTexto from '../components/common/CampoTexto'
import FormularioUsuario from '../components/admin/FormularioUsuario'
import TablaUsuarios from '../components/admin/TablaUsuarios'
import Paginacion from '../components/common/Paginacion'
import { useAuth } from '../context/useAuth'
import {
    actualizar,
    cambiarEstado as cambiarEstadoServicio,
    crear,
    listar,
} from '../services/usuariosService'
import { paginar } from '../utils/paginar'

const ESTADOS = ['Activos', 'Inactivos', 'Todos']

function GestionUsuarios() {
    const { usuario: usuarioActual } = useAuth()

    const [usuarios, setUsuarios] = useState([])
    const [cargando, setCargando] = useState(true)
    const [filtroEstado, setFiltroEstado] = useState('Activos')
    const [busqueda, setBusqueda] = useState('')
    const [pagina, setPagina] = useState(1)
    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [usuarioEditando, setUsuarioEditando] = useState(null)

    useEffect(() => {
        listar()
            .then(setUsuarios)
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'No se pudieron cargar las cuentas',
                    text: error.message,
                    confirmButtonText: 'Entendido',
                })
            })
            .finally(() => setCargando(false))
    }, [])

    const consulta = busqueda.trim().toLocaleLowerCase('es')

    const usuariosVisibles = usuarios.filter((usuario) => {
        const coincideEstado =
            filtroEstado === 'Todos' ||
            (filtroEstado === 'Activos' && usuario.activo) ||
            (filtroEstado === 'Inactivos' && !usuario.activo)

        const coincideBusqueda =
            !consulta ||
            [usuario.nombre, usuario.usuario, usuario.mail]
                .some((dato) =>
                    String(dato ?? '').toLocaleLowerCase('es').includes(consulta)
                )

        return coincideEstado && coincideBusqueda
    })

    const usuariosPaginados = paginar(usuariosVisibles, pagina, 20)

    function abrirFormularioNuevo() {
        setUsuarioEditando(null)
        setMostrarFormulario(true)
    }

    function abrirFormularioEdicion(usuario) {
        setUsuarioEditando(usuario)
        setMostrarFormulario(true)
    }

    function cerrarFormulario() {
        setMostrarFormulario(false)
        setUsuarioEditando(null)
    }

    async function recargarUsuarios() {
        const lista = await listar()
        setUsuarios(lista)
    }

    async function guardarUsuario(datos) {
        const esEdicion = Boolean(usuarioEditando)

        try {
            if (esEdicion) {
                await actualizar(usuarioEditando.id, datos)
            } else {
                await crear(datos)
            }

            await recargarUsuarios()
            cerrarFormulario()

            await Swal.fire({
                icon: 'success',
                title: esEdicion ? 'Cuenta actualizada' : 'Cuenta creada',
                timer: 1600,
                showConfirmButton: false,
            })
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'No se pudo guardar la cuenta',
                text: error.message,
                confirmButtonText: 'Entendido',
            })
        }
    }

    async function manejarCambioEstado(id, activo) {
        const cuenta = usuarios.find((item) => item.id === id)
        if (!cuenta) return

        if (!activo) {
            const resultado = await Swal.fire({
                icon: 'warning',
                title: '¿Desactivar esta cuenta?',
                text: `${cuenta.nombre} ya no podrá ingresar al sistema.`,
                showCancelButton: true,
                confirmButtonText: 'Sí, desactivar',
                cancelButtonText: 'Cancelar',
            })

            if (!resultado.isConfirmed) return
        }

        try {
            await cambiarEstadoServicio(id, activo, usuarioActual)
            await recargarUsuarios()

            await Swal.fire({
                icon: 'success',
                title: activo ? 'Cuenta reactivada' : 'Cuenta desactivada',
                timer: 1600,
                showConfirmButton: false,
            })
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'No se pudo cambiar el estado',
                text: error.message,
                confirmButtonText: 'Entendido',
            })
        }
    }

    function cambiarFiltro(campo, valor) {
        if (campo === 'busqueda') {
            setBusqueda(valor)
        } else {
            setFiltroEstado(valor)
        }

        setPagina(1)
    }

    return (
        <Container className="py-5">
            <title>Usuarios · Escuela Roca</title>
            <meta name="robots" content="noindex" />

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div>
                    <h1>Gestión de usuarios</h1>
                    <p className="text-body-secondary mb-0">
                        Creá y administrá las cuentas del personal de la escuela.
                    </p>
                </div>

                <Button type="button" onClick={abrirFormularioNuevo}>
                    Nueva cuenta
                </Button>
            </div>

            <Tabs
                defaultActiveKey="usuarios"
                id="pestanas-gestion-usuarios"
                className="mb-3"
            >
                <Tab eventKey="usuarios" title="Usuarios">
                    <Row className="g-3 align-items-end mb-3">
                        <CampoTexto
                            id="buscar-usuario"
                            label="Buscar por nombre, usuario o mail"
                            name="busqueda"
                            value={busqueda}
                            onChange={cambiarFiltro}
                            md={8}
                        />

                        <CampoSelect
                            id="filtrar-estado-usuario"
                            label="Estado"
                            name="estado"
                            value={filtroEstado}
                            onChange={cambiarFiltro}
                            opciones={ESTADOS}
                            md={4}
                        />
                    </Row>

                    {cargando ? (
                        <div className="py-5 text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">
                                    Cargando cuentas
                                </span>
                            </Spinner>
                        </div>
                    ) : (
                        <>
                            <div id="lista-usuarios" />

                            <TablaUsuarios
                                usuarios={usuariosPaginados.items}
                                usuarioActual={usuarioActual}
                                onEditar={abrirFormularioEdicion}
                                onCambiarEstado={manejarCambioEstado}
                            />

                            <Paginacion
                                {...usuariosPaginados}
                                onCambiar={setPagina}
                                nombre="usuarios"
                                nombreSingular="usuario"
                                idInicio="lista-usuarios"
                            />
                        </>
                    )}
                </Tab>
            </Tabs>

            {mostrarFormulario && (
                <FormularioUsuario
                    key={usuarioEditando?.id ?? 'nuevo'}
                    usuarioInicial={usuarioEditando}
                    onGuardar={guardarUsuario}
                    onCancelar={cerrarFormulario}
                />
            )}
        </Container>
    )
}

export default GestionUsuarios