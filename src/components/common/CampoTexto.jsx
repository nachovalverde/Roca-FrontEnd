import { Col, Form } from 'react-bootstrap'

function CampoTexto({
  id, label, name, value, onChange,
  type = 'text', md = 6, requerido = false, error, filtro, ...resto
}) {
  const manejarCambio = (evento) => {
    const texto = evento.target.value
    
    onChange(name, filtro ? filtro(texto) : texto)
  }

  return (
    <Col md={md}>
      <Form.Group controlId={id}>
        <Form.Label>
          {label}
          {requerido && <span className="text-danger" aria-hidden="true"> *</span>}
        </Form.Label>
        <Form.Control
          type={type}
          name={name}
          value={value}
          onChange={manejarCambio}
          required={requerido}
          isInvalid={Boolean(error)}
          {...resto}
        />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Form.Group>
    </Col>
  )
}

export default CampoTexto