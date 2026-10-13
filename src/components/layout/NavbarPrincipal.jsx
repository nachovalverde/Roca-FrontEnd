import { Container, Image, Nav, Navbar } from 'react-bootstrap'
import logoEscuela from '../../assets/LogoEscuelaRoca2.jpeg'

function NavbarPrincipal() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand
                    href="/"
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
                                <Nav.Link href="/">Inicio</Nav.Link>
                                <Nav.Link href="/institucional">Institucional</Nav.Link>
                            </Nav>
                        </div>

                        <div className="col-12 col-lg-4 d-flex justify-content-center justify-content-lg-end">
                            <Nav>
                                <Nav.Link href="/login">Ingresar</Nav.Link>
                            </Nav>
                        </div>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarPrincipal