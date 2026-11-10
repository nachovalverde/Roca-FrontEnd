import { useEffect, useState } from 'react'
import {
    Button,
    Col,
    Container,
    Row,
    Spinner,
    Tab,
    Tabs,
} from 'react-bootstrap'
import {
    Alerta,
    mostrarError,
    mostrarExito,
} from '../utils/alertas'
import CampoSelect from '../components/common/CampoSelect'
import CampoTexto from '../components/common/CampoTexto'
import FormularioUsuario from '../components/admin/FormularioUsuario'
import FiltrosRegistro from '../components/admin/FiltrosRegistro'
import TablaRegistroAccesos from '../components/admin/TablaRegistroAccesos'
import TablaUsuarios from '../components/admin/TablaUsuarios'
import Paginacion from '../components/common/Paginacion'
import TarjetaIndicador from '../components/common/TarjetaIndicador'
import { useAuth } from '../context/useAuth'
import {
    actualizar,
    cambiarEstado as cambiarEstadoServicio,
    crear,
    listar,
} from '../services/usuariosService'
import {
    EVENTOS,
    listar as listarAccesos,
} from '../services/registroAccesosService'
import { paginar } from '../utils/paginar'
import { descargarCSV, fechaDeHoy } from '../utils/exportarCSV'
import { NOMBRE_ROL } from '../data/roles'

const ESTADOS = ['Activos', 'Inactivos', 'Todos']

const COLUMNAS_REGISTRO = [
    {
        titulo: 'Fecha y hora',
        valor: (registro) => new Date(registro.fecha).toLocaleString('es-AR'),
    },
    {
        titulo: 'Usuario',
        valor: (registro) => registro.usuario || '—',
    },
    {
        titulo: 'Nombre',
        valor: (registro) => registro.nombre || '—',
    },
    {
        titulo: 'Rol',
        valor: (registro) =>
            NOMBRE_ROL[registro.rol] ?? registro.rol ?? '—',
    },
    {
        titulo: 'Evento',
        valor: (registro) => registro.evento,
    },
    {
        titulo: 'Detalle',
        valor: (registro) => registro.detalle || '—',
    },
]

function GestionUsuarios() {
    const { usuario: usuarioActual } = useAuth()

    const [usuarios, setUsuarios] = useState([])
    const [registro, setRegistro] = useState([])
    const [cargando, setCargando] = useState(true)
    const [ahora] = useState(() => Date.now())
    const [filtroEstado, setFiltroEstado] = useState('Activos')
    const [busqueda, setBusqueda] = useState('')
    const [pagina, setPagina] = useState(1)
    const [filtrosRegistro, setFiltrosRegistro] = useState({
        usuario: '',
        evento: '',
        desde: '',
        hasta: '',
    })
    const [paginaRegistro, setPaginaRegistro] = useState(1)
    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [usuarioEditando, setUsuarioEditando] = useState(null)

    useEffect(() => {
        Promise.all([listar(), listarAccesos()])
            .then(([listaUsuarios, listaRegistro]) => {
                setUsuarios(listaUsuarios)
                setRegistro(listaRegistro)
            })
            .catch((error) => {
                mostrarError(error, 'No se pudieron cargar los datos')
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
            [usuario.nombre, usuario.usuario, usuario.mail].some((dato) =>
                String(dato ?? '').toLocaleLowerCase('es').includes(consulta)
            )

        return coincideEstado && coincideBusqueda
    })

    const usuariosPaginados = paginar(usuariosVisibles, pagina, 20)

    const fechaHoy = new Date(ahora).toLocaleDateString('en-CA')
    const limiteSemana = ahora - 7 * 24 * 60 * 60 * 1000

    const usuariosActivos = usuarios.filter((usuario) => usuario.activo).length
    const usuariosInactivos = usuarios.filter((usuario) => !usuario.activo).length

    const ingresosHoy = registro.filter(
        (evento) =>
            evento.evento === EVENTOS.INGRESO &&
            new Date(evento.fecha).toLocaleDateString('en-CA') === fechaHoy
    ).length

    const intentosFallidos7Dias = registro.filter((evento) => {
        const fechaEvento = new Date(evento.fecha).getTime()

        return (
            evento.evento === EVENTOS.INGRESO_FALLIDO &&
            fechaEvento >= limiteSemana &&
            fechaEvento <= ahora
        )
    }).length

    const registroFiltrado = registro.filter((evento) => {
        const fechaEvento = new Date(evento.fecha).toLocaleDateString('en-CA')

        const coincideUsuario =
            !filtrosRegistro.usuario ||
            evento.usuario === filtrosRegistro.usuario

        const coincideTipo =
            !filtrosRegistro.evento ||
            evento.evento === filtrosRegistro.evento

        const coincideDesde =
            !filtrosRegistro.desde || fechaEvento >= filtrosRegistro.desde

        const coincideHasta =
            !filtrosRegistro.hasta || fechaEvento <= filtrosRegistro.hasta

        return (
            coincideUsuario &&
            coincideTipo &&
            coincideDesde &&
            coincideHasta
        )
    })

    const registrosPaginados = paginar(registroFiltrado, paginaRegistro, 25)

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

    async function recargarDatos() {
        const [listaUsuarios, listaRegistro] = await Promise.all([
            listar(),
            listarAccesos(),
        ])

        setUsuarios(listaUsuarios)
        setRegistro(listaRegistro)
    }

    async function guardarUsuario(datos) {
        const esEdicion = Boolean(usuarioEditando)

        try {
            if (esEdicion) {
                await actualizar(usuarioEditando.id, datos, usuarioActual)
            } else {
                await crear(datos, usuarioActual)
            }

            await recargarDatos()
            cerrarFormulario()

            await mostrarExito(
                esEdicion ? 'Cuenta actualizada' : 'Cuenta creada'
            )
        } catch (error) {
            await mostrarError(error, 'No se pudo guardar la cuenta')
        }
    }

    async function manejarCambioEstado(id, activo) {
        const cuenta = usuarios.find((item) => item.id === id)
        if (!cuenta) return

        if (!activo) {
            const resultado = await Alerta.fire({
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
            await recargarDatos()

            await mostrarExito(
                activo ? 'Cuenta reactivada' : 'Cuenta desactivada'
            )
        } catch (error) {
            await mostrarError(error, 'No se pudo cambiar el estado')
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

    function cambiarFiltroRegistro(campo, valor) {
        setFiltrosRegistro((filtrosActuales) => ({
            ...filtrosActuales,
            [campo]: valor,
        }))
        setPaginaRegistro(1)
    }

    function exportarRegistro() {
        descargarCSV(
            `registro-de-accesos-${fechaDeHoy()}.csv`,
            COLUMNAS_REGISTRO,
            registroFiltrado
        )
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

            <Row className="g-3 mb-4">
                <Col xs={12} sm={6} lg={3}>
                    <TarjetaIndicador
                        titulo="Usuarios activos"
                        valor={usuariosActivos}
                        detalle="Cuentas habilitadas"
                    />
                </Col>

                <Col xs={12} sm={6} lg={3}>
                    <TarjetaIndicador
                        titulo="Usuarios inactivos"
                        valor={usuariosInactivos}
                        detalle="Cuentas desactivadas"
                    />
                </Col>

                <Col xs={12} sm={6} lg={3}>
                    <TarjetaIndicador
                        titulo="Ingresos de hoy"
                        valor={ingresosHoy}
                        detalle="Inicios de sesión exitosos"
                    />
                </Col>

                <Col xs={12} sm={6} lg={3}>
                    <TarjetaIndicador
                        titulo="Intentos fallidos · 7 días"
                        valor={intentosFallidos7Dias}
                        detalle="Se resalta al llegar a 5"
                        destacada={intentosFallidos7Dias >= 5}
                    />
                </Col>
            </Row>

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

                <Tab eventKey="registro" title="Registro de accesos">
                    <FiltrosRegistro
                        usuarios={usuarios}
                        filtros={filtrosRegistro}
                        onCambiar={cambiarFiltroRegistro}
                    />

                    <div className="d-flex justify-content-end mb-3">
                        <Button
                            type="button"
                            variant="outline-primary"
                            onClick={exportarRegistro}
                            disabled={registroFiltrado.length === 0}
                        >
                            Exportar a Excel (CSV)
                        </Button>
                    </div>

                    {cargando ? (
                        <div className="py-5 text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">
                                    Cargando registro de accesos
                                </span>
                            </Spinner>
                        </div>
                    ) : (
                        <>
                            <div id="tabla-registro-accesos" />

                            <TablaRegistroAccesos
                                registros={registrosPaginados.items}
                            />

                            <Paginacion
                                {...registrosPaginados}
                                onCambiar={setPaginaRegistro}
                                nombre="eventos"
                                nombreSingular="evento"
                                idInicio="tabla-registro-accesos"
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
