import { Nav } from 'react-bootstrap'

function IndicadorPasos({ pasos, pasoActual, onIrAPaso }) {
  return (
    <Nav variant="underline" className="mb-4 flex-nowrap overflow-auto">
      {pasos.map((paso, indice) => (
        <Nav.Item key={paso}>
          <Nav.Link
            active={indice === pasoActual}
            disabled={indice > pasoActual}
            onClick={() => onIrAPaso(indice)}
          >
            {indice + 1}. {paso}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  )
}

export default IndicadorPasos