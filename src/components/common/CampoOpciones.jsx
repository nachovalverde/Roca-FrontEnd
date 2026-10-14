import { Col, Form } from 'react-bootstrap'

function CampoOpciones({ id, label, name, value, onChange, opciones, md = 6, requerido = false, error }) {
  return (
    <Col md={md}>
      <Form.Group as="fieldset">
        <Form.Label as="legend" className="fs-6">
          {label}
          {requerido && <span className="text-danger" aria-hidden="true"> *</span>}
        </Form.Label>
        <div>
          {opciones.map((opcion) => (
            <Form.Check
              key={opcion}
              inline
              type="radio"
              id={`${id}-${opcion}`}
              name={id}
              label={opcion}
              checked={value === opcion}
              onChange={() => onChange(name, opcion)}
              isInvalid={Boolean(error)}
            />
          ))}
        </div>
        {error && <div className="invalid-feedback d-block">{error}</div>}
      </Form.Group>
    </Col>
  )
}

export default CampoOpciones