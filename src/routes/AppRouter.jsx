import { lazy, Suspense } from 'react'
import { Spinner } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home'
import NoticiasDetalle from '../pages/NoticiasDetalle'
import Institucional from '../pages/Institucional'
import Login from '../pages/Login'
import PanelAdmin from '../pages/PanelAdmin'
import GestionUsuarios from '../pages/GestionUsuarios'
import RutaProtegida from './RutaProtegida'
import PanelDocente from '../pages/PanelDocente'
import NuevaInscripcion from '../pages/NuevaInscripcion'
import DetalleInscripcion from '../pages/DetalleInscripcion'
import { ROLES_INSCRIPCIONES } from '../data/roles'
import EditarInscripcion from '../pages/EditarInscripcion'

const EstadisticasInscripciones = lazy(() =>
    import('../pages/EstadisticasInscripciones')
)

function Cargando() {
    return (
        <div className="text-center py-5">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando</span>
            </Spinner>
        </div>
    )
}

function NotFound() {
    return (
        <div className="container py-5">
            <title>Página no encontrada · Escuela Roca</title>
            <meta name="robots" content="noindex" />
            <h1>Página no encontrada</h1>
            <p>La página que buscás no existe.</p>
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

                    <Route
                        path="/admin"
                        element={
                            <RutaProtegida rol="vicedirectora">
                                <PanelAdmin />
                            </RutaProtegida>
                        }
                    />
                    <Route
                        path="/admin/usuarios"
                        element={
                            <RutaProtegida rol="vicedirectora">
                                <GestionUsuarios />
                            </RutaProtegida>
                        }
                    />
                    <Route
                        path="/admin/estadisticas"
                        element={
                            <RutaProtegida rol="vicedirectora">
                                <Suspense fallback={<Cargando />}>
                                    <EstadisticasInscripciones />
                                </Suspense>
                            </RutaProtegida>
                        }
                    />

                    <Route
                        path="/docente"
                        element={
                            <RutaProtegida rol={ROLES_INSCRIPCIONES}>
                                <PanelDocente />
                            </RutaProtegida>
                        }
                    />
                    <Route
                        path="/inscripciones/nueva"
                        element={
                            <RutaProtegida rol={ROLES_INSCRIPCIONES}>
                                <NuevaInscripcion />
                            </RutaProtegida>
                        }
                    />
                    <Route
                        path="/inscripciones/:id"
                        element={
                            <RutaProtegida rol={ROLES_INSCRIPCIONES}>
                                <DetalleInscripcion />
                            </RutaProtegida>
                        }
                    />
                    <Route
                        path="/inscripciones/:id/editar"
                        element={
                            <RutaProtegida rol={ROLES_INSCRIPCIONES}>
                                <EditarInscripcion />
                            </RutaProtegida>
                        }
                    />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default AppRouter