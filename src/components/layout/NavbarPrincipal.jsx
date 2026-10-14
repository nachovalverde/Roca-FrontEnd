import { Button, Container, Image, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '../../context/AuthContext'
import logoEscuela from '../../assets/LogoEscuelaRoca2.jpeg'

function NavbarPrincipal() {
    const { usuario, logout } = useAuth()
    const navigate = useNavigate()

    async function manejarCerrarSesion() {
        const resultado = await Swal.fire({
            title: '¿Cerrar sesion?',
            text: 'Vas a salir de tu cuenta.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Si, salir',
            cancelButtonText: 'Cancelar',
        })

        if (resultado.isConfirmed) {
            logout()
            navigate('/', { replace: true })
        }
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand
                    as={Link}
                    to="/"
                    className="col-auto col-lg-3 d-flex align-items-center gap-2 me-0"
                >
                    <Image
                        src={logoEscuela}
                        alt="Logo de la Escuela Roca"
                        style={{
                            width: '80px',
                            height: 'auto',
                            objectFit: 'contain',
                        }}
                    />
                    <span className="d-flex flex-column lh-sm">
                        <span className="small fw-semibold">
                            Escuela Presidente Julio Argentino Roca
                        </span>
                        <span className="small text-secondary">
                            Nivel Inicial y Primario · Sector Estatal
                        </span>
                    </span>
                </Navbar.Brand>

                <Navbar.Toggle
                    aria-controls="navegacion-principal"
                    className="ms-auto"
                />

                <Navbar.Collapse
                    id="navegacion-principal"
                    className="col-12 col-lg-9"
                >
                    <div className="row w-100 align-items-center">
                        <div className="col-12 col-lg-8 d-flex justify-content-center">
                            <Nav>
                                <Nav.Link as={Link} to="/">
                                    Inicio
                                </Nav.Link>
                                <Nav.Link as={Link} to="/institucional">
                                    Institucional
                                </Nav.Link>
                            </Nav>
                        </div>

                        <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center justify-content-lg-end gap-3">
                            {usuario ? (
                                <>
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
                                </>
                            ) : (
                                <Nav>
                                    <Nav.Link as={Link} to="/login">
                                        Ingresar
                                    </Nav.Link>
                                </Nav>
                            )}
                        </div>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarPrincipal