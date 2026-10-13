import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home'
import NoticiasDetalle from '../pages/NoticiasDetalle'

function NotFound() {
    return (
        <div className="container py-5">
            <h1>Pagina no encontrada</h1>
            <p>La pagina que busca no existe.</p>
        </div>
    )
}

function AppRouter() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/noticias/:id" element={<NoticiasDetalle />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default AppRouter