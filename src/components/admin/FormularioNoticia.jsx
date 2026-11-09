import { useState } from 'react'
import {
    Button,
    Col,
    Form,
    Image,
    Modal,
    Row,
} from 'react-bootstrap'
import CampoSelect from '../common/CampoSelect'
import CampoTexto from '../common/CampoTexto'
import { CATEGORIAS_NOTICIAS } from '../../data/categoriasNoticias'
import { validarNoticia } from '../../utils/validarNoticia'

function crearDatosIniciales(noticiaInicial) {
    return {
        titulo: noticiaInicial?.titulo ?? '',
        categoria: noticiaInicial?.categoria ?? '',
        descripcion: noticiaInicial?.descripcion ?? '',
        contenido: noticiaInicial?.contenido ?? '',
        imagen: noticiaInicial?.imagen ?? '',
        publicada: noticiaInicial?.publicada ?? false,
    }
}

function esUrlHttpsValida(valor) {
    if (!valor) return false

    try {
        return new URL(valor).protocol === 'https:'
    } catch {
        return false
    }
}

function FormularioNoticia({
    noticiaInicial = null,
    onGuardar,
    onCancelar,
}) {
    const esNueva = noticiaInicial === null
    const [datos, setDatos] = useState(() =>
        crearDatosIniciales(noticiaInicial)
    )
    const [errores, setErrores] = useState({})

    function cambiarCampo(campo, valor) {
        setDatos((datosActuales) => ({
            ...datosActuales,
            [campo]: valor,
        }))
    }

    function manejarEnvio(evento) {
        evento.preventDefault()

        const erroresFormulario = validarNoticia(datos)
        setErrores(erroresFormulario)

        if (Object.keys(erroresFormulario).length > 0) return

        onGuardar(datos)
    }

    return (
        <Modal
            show
            onHide={onCancelar}
            centered
            size="lg"
            fullscreen="sm-down"
        >
            <Form noValidate onSubmit={manejarEnvio}>
                <Modal.Header closeButton closeLabel="Cerrar">
                    <Modal.Title as="h2" className="h5">
                        {esNueva ? 'Nueva noticia' : 'Editar noticia'}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row className="g-3">
                        <CampoTexto
                            id="noticia-titulo"
                            label="Título"
                            name="titulo"
                            value={datos.titulo}
                            onChange={cambiarCampo}
                            maxLength={100}
                            requerido
                            error={errores.titulo}
                            md={12}
                        />

                        <CampoSelect
                            id="noticia-categoria"
                            label="Categoría"
                            name="categoria"
                            value={datos.categoria}
                            onChange={cambiarCampo}
                            opciones={CATEGORIAS_NOTICIAS}
                            requerido
                            error={errores.categoria}
                            md={12}
                        />

                        <CampoTexto
                            id="noticia-descripcion"
                            label="Resumen"
                            name="descripcion"
                            value={datos.descripcion}
                            onChange={cambiarCampo}
                            as="textarea"
                            rows={3}
                            maxLength={200}
                            requerido
                            error={errores.descripcion}
                            md={12}
                        />

                        <div className="col-12">
                            <small className="text-body-secondary">
                                {datos.descripcion.length} de 200 caracteres
                            </small>
                        </div>

                        <CampoTexto
                            id="noticia-contenido"
                            label="Contenido"
                            name="contenido"
                            value={datos.contenido}
                            onChange={cambiarCampo}
                            as="textarea"
                            rows={8}
                            requerido
                            error={errores.contenido}
                            md={12}
                        />

                        <CampoTexto
                            id="noticia-imagen"
                            label="URL de la imagen (opcional)"
                            name="imagen"
                            type="url"
                            value={datos.imagen}
                            onChange={cambiarCampo}
                            error={errores.imagen}
                            md={12}
                        />

                        {esUrlHttpsValida(datos.imagen) && (
                            <Col xs={12}>
                                <p className="mb-2">Vista previa</p>
                                <Image
                                    src={datos.imagen}
                                    alt="Vista previa de la imagen de la noticia"
                                    thumbnail
                                    style={{
                                        maxWidth: '200px',
                                        maxHeight: '140px',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Col>
                        )}

                        <Col xs={12}>
                            <Form.Check
                                id="noticia-publicada"
                                type="checkbox"
                                label="Publicar ahora"
                                checked={datos.publicada}
                                onChange={(evento) =>
                                    cambiarCampo(
                                        'publicada',
                                        evento.target.checked
                                    )
                                }
                            />
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancelar}
                    >
                        Cancelar
                    </Button>

                    <Button type="submit" variant="primary">
                        Guardar noticia
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default FormularioNoticia