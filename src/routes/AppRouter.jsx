import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home'
import NoticiasDetalle from '../pages/NoticiasDetalle'
import Institucional from '../pages/Institucional'
import Login from '../pages/Login'
import PanelAdmin from '../pages/PanelAdmin'
import RutaProtegida from './RutaProtegida'
import PanelDocente from '../pages/PanelDocente'
import NuevaInscripcion from '../pages/NuevaInscripcion'
import DetalleInscripcion from '../pages/DetalleInscripcion'



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
                    <Route path="/institucional" element={<Institucional />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/admin" element={<RutaProtegida rol="vicedirectora"><PanelAdmin /></RutaProtegida>} />
                    <Route path="/docente" element={<PanelDocente />} />
                    <Route path="/inscripciones/nueva" element={<NuevaInscripcion />} />
                    <Route path="/inscripciones/:id" element={<DetalleInscripcion />} />

                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default AppRouter