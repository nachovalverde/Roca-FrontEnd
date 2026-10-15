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
import { ROLES_INSCRIPCIONES } from '../data/roles'
import EditarInscripcion from '../pages/EditarInscripcion'



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

                    <Route path="/docente" element={<RutaProtegida rol={ROLES_INSCRIPCIONES}><PanelDocente /></RutaProtegida>} />
                    <Route path="/inscripciones/nueva" element={<RutaProtegida rol={ROLES_INSCRIPCIONES}><NuevaInscripcion /></RutaProtegida>} />
                    <Route path="/inscripciones/:id" element={<RutaProtegida rol={ROLES_INSCRIPCIONES}><DetalleInscripcion /></RutaProtegida>} />
                    <Route path="/inscripciones/:id/editar" element={<RutaProtegida rol={ROLES_INSCRIPCIONES}><EditarInscripcion /></RutaProtegida>} />

                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default AppRouter