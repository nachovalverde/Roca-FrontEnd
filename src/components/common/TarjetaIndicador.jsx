import { Card } from 'react-bootstrap'

function TarjetaIndicador({ titulo, valor, detalle, destacada = false }) {
  return (
    <Card className={`h-100 ${destacada ? 'border-danger border-2' : ''}`}>
      <Card.Body>
        <p className="small text-body-secondary mb-1">{titulo}</p>
        <p className={`fs-2 fw-bold mb-1 ${destacada ? 'text-danger' : ''}`}>{valor}</p>
        {detalle && <p className="small text-body-secondary mb-0">{detalle}</p>}
      </Card.Body>
    </Card>
  )
}

export default TarjetaIndicador