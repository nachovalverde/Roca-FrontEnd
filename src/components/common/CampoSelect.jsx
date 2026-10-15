import { Col, Form } from 'react-bootstrap'

function CampoSelect({ id, label, name, value, onChange, opciones, md = 6, requerido = false, error, opcionVacia = 'Elegí una opción',  }) {
  return (
    <Col md={md}>
      <Form.Group controlId={id}>
        <Form.Label>
          {label}
          {requerido && <span className="text-danger" aria-hidden="true"> *</span>}
        </Form.Label>
        <Form.Select
          name={name}
          value={value}
          onChange={(evento) => onChange(name, evento.target.value)}
          required={requerido}
          isInvalid={Boolean(error)}
        >
          <option value="">{opcionVacia}</option>
          {opciones.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Form.Group>
    </Col>
  )
}

export default CampoSelect