import { Button, Container, Image, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '../../context/AuthContext'
import { RUTA_POR_ROL } from '../../data/roles'
import logoEscuela from '../../assets/LogoEscuelaRoca2.jpeg'

function NavbarPrincipal() {
    const { usuario, logout } = useAuth()
    const navigate = useNavigate()

    async function manejarCerrarSesion() {
        const resultado = await Swal.fire({
            title: '¿Cerrar sesión?',
            text: 'Vas a salir de tu cuenta.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Cancelar',
        })

        if (resultado.isConfirmed) {
            logout()
            navigate('/', { replace: true })
        }
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container className="flex-wrap">
                <Navbar.Brand
                    as={Link}
                    to="/"
                    className="d-flex align-items-center gap-2 me-2 flex-grow-1 flex-lg-grow-0 flex-shrink-1 text-wrap"
                    style={{
                        minWidth: 0,
                        maxWidth: 'calc(100% - 72px)',
                    }}
                >
                    <Image
                        src={logoEscuela}
                        alt="Logo de la Escuela Roca"
                        className="d-block d-sm-none flex-shrink-0"
                        style={{ width: '48px', height: 'auto' }}
                    />

                    <Image
                        src={logoEscuela}
                        alt="Logo de la Escuela Roca"
                        className="d-none d-sm-block d-md-none flex-shrink-0"
                        style={{ width: '56px', height: 'auto' }}
                    />

                    <Image
                        src={logoEscuela}
                        alt="Logo de la Escuela Roca"
                        className="d-none d-md-block d-lg-none flex-shrink-0"
                        style={{ width: '64px', height: 'auto' }}
                    />

                    <Image
                        src={logoEscuela}
                        alt="Logo de la Escuela Roca"
                        className="d-none d-lg-block d-xl-none flex-shrink-0"
                        style={{ width: '72px', height: 'auto' }}
                    />

                    <Image
                        src={logoEscuela}
                        alt="Logo de la Escuela Roca"
                        className="d-none d-xl-block flex-shrink-0"
                        style={{ width: '80px', height: 'auto' }}
                    />

                    <span className="d-none d-xl-flex flex-column lh-sm">
                        <span className="small fw-semibold">
                            Escuela Presidente Julio Argentino Roca
                        </span>
                        <span className="small text-secondary">
                            Nivel Inicial y Primario - Sector Estatal
                        </span>
                    </span>

                    <span className="d-flex d-xl-none flex-column lh-sm">
                        <span className="small fw-semibold">
                            Escuela Presidente Julio A. Roca
                        </span>
                        <span className="small text-secondary">
                            Nivel Inicial y Primario
                        </span>
                    </span>
                </Navbar.Brand>

                <Navbar.Toggle
                    aria-controls="navegacion-principal"
                    className="ms-auto flex-shrink-0"
                />

                <Navbar.Collapse
                    id="navegacion-principal"
                    className="flex-grow-1"
                >
                    <div className="row w-100 align-items-center">
                        <div className="d-none d-lg-flex col-lg-8 justify-content-center">
                            <Nav
                                className="flex-row align-items-center"
                                style={{
                                    transform:
                                        'translateX(clamp(0px, calc(507.6px - 42.3vw), 88px))',
                                }}
                            >
                                <Nav.Link as={Link} to="/">
                                    Inicio
                                </Nav.Link>

                                <Nav.Link as={Link} to="/institucional">
                                    Institucional
                                </Nav.Link>

                                {usuario && RUTA_POR_ROL[usuario.rol] && (
                                    <Nav.Link
                                        as={Link}
                                        to={RUTA_POR_ROL[usuario.rol]}
                                    >
                                        Mi panel
                                    </Nav.Link>
                                )}
                            </Nav>
                        </div>

                        <div className="d-none d-lg-flex col-lg-4 align-items-center justify-content-end">
                            {usuario ? (
                                <div className="d-flex align-items-center gap-3">
                                    <Navbar.Text>
                                        {usuario.nombre} · {usuario.rol}
                                    </Navbar.Text>

                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline-primary"
                                        onClick={manejarCerrarSesion}
                                    >
                                        Salir
                                    </Button>
                                </div>
                            ) : (
                                <Nav>
                                    <Nav.Link as={Link} to="/login">
                                        Ingresar
                                    </Nav.Link>
                                </Nav>
                            )}
                        </div>

                        <div className="col-12 d-lg-none">
                            <Nav className="flex-column align-items-end text-end">
                                <Nav.Link as={Link} to="/">
                                    Inicio
                                </Nav.Link>

                                <Nav.Link as={Link} to="/institucional">
                                    Institucional
                                </Nav.Link>

                                {usuario && RUTA_POR_ROL[usuario.rol] && (
                                    <Nav.Link
                                        as={Link}
                                        to={RUTA_POR_ROL[usuario.rol]}
                                    >
                                        Mi panel
                                    </Nav.Link>
                                )}

                                {usuario ? (
                                    <>
                                        <Navbar.Text>
                                            {usuario.nombre} · {usuario.rol}
                                        </Navbar.Text>

                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="outline-primary"
                                            className="my-2"
                                            onClick={manejarCerrarSesion}
                                        >
                                            Salir
                                        </Button>
                                    </>
                                ) : (
                                    <Nav.Link as={Link} to="/login">
                                        Ingresar
                                    </Nav.Link>
                                )}
                            </Nav>
                        </div>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarPrincipal