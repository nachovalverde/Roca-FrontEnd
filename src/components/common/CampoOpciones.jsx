import { Col, Form, ToggleButton } from 'react-bootstrap'

function CampoOpciones({ id, label, name, value, onChange, opciones, md = 6, requerido = false, error }) {
  return (
    <Col md={md}>
      <Form.Group as="fieldset">
        <Form.Label as="legend" className="fs-6">
          {label}
          {requerido && <span className="text-danger" aria-hidden="true"> *</span>}
        </Form.Label>
        {/* Botones en lugar de círculos de 16 px: se tocan fácil con el dedo en el celular */}
        <div className="d-flex flex-wrap gap-2">
          {opciones.map((opcion) => (
            <ToggleButton
              key={opcion}
              id={`${id}-${opcion}`}
              type="radio"
              name={id}
              value={opcion}
              checked={value === opcion}
              onChange={() => onChange(name, opcion)}
              variant={error ? 'outline-danger' : 'outline-primary'}
            >
              {opcion}
            </ToggleButton>
          ))}
        </div>
        {error && <div className="invalid-feedback d-block">{error}</div>}
      </Form.Group>
    </Col>
  )
}

export default CampoOpciones
