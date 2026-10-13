import { Container } from 'react-bootstrap'
import Layout from './components/layout/Layout'

function App() {
  return (
    <Layout>
      <Container className="py-5">
        <h1>Portal de la Escuela Roca</h1>
        <p>Bienvenidos al sitio institucional.</p>
      </Container>
    </Layout>
  )
}

export default App