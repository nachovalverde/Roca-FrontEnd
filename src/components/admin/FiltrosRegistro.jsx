import { Row } from 'react-bootstrap'
import CampoSelect from '../common/CampoSelect'
import CampoTexto from '../common/CampoTexto'

function FiltrosRegistro({ usuarios, filtros, onCambiar }) {
    const nombresUsuarios = [
        ...new Set(usuarios.map((usuario) => usuario.usuario).filter(Boolean)),
    ]

    const tiposEvento = [
        'Ingreso',
        'Intento fallido',
        'Salida',
        'Pidió recuperar la contraseña',
        'Cambió la contraseña',
        'Alta de cuenta',
        'Modificación de cuenta',
        'Baja de cuenta',
        'Reactivación de cuenta',
    ]

    return (
        <Row className="g-3 align-items-end mb-3">
            <CampoSelect
                id="filtrar-registro-usuario"
                label="Usuario"
                name="usuario"
                value={filtros.usuario}
                onChange={onCambiar}
                opciones={nombresUsuarios}
                opcionVacia="Todos los usuarios"
                md={4}
            />

            <CampoSelect
                id="filtrar-registro-evento"
                label="Tipo de evento"
                name="evento"
                value={filtros.evento}
                onChange={onCambiar}
                opciones={tiposEvento}
                opcionVacia="Todos los eventos"
                md={4}
            />

            <CampoTexto
                id="filtrar-registro-desde"
                label="Desde"
                name="desde"
                type="date"
                value={filtros.desde}
                onChange={onCambiar}
                md={2}
            />

            <CampoTexto
                id="filtrar-registro-hasta"
                label="Hasta"
                name="hasta"
                type="date"
                value={filtros.hasta}
                onChange={onCambiar}
                md={2}
            />
        </Row>
    )
}

export default FiltrosRegistro