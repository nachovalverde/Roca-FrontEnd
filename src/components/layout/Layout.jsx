import Footer from './Footer'
import NavbarPrincipal from './NavbarPrincipal'

function Layout({ children }) {
    return (
        <div className="d-flex min-vh-100 flex-column">
            <NavbarPrincipal />
            <main className="flex-grow-1">{children}</main>
            <Footer />
        </div>
    )
}

export default Layout