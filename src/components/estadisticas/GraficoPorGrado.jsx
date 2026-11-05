import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { COLORES } from '../../data/coloresGraficos'

function GraficoPorGrado({ datos, ciclo, cicloComparado }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={datos} margin={{ top: 20, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="grado" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        {/* El texto de la leyenda va en el color normal: en el color de la serie, el gris claro casi no se lee */}
        <Legend formatter={(texto) => <span className="text-body">{texto}</span>} />
        <Bar dataKey="total" name={`Ciclo ${ciclo}`} fill={COLORES.cicloActual} label={{ position: 'top', fontSize: 12 }} />
        {cicloComparado && <Bar dataKey="totalComparado" name={`Ciclo ${cicloComparado}`} fill={COLORES.cicloComparado} />}
      </BarChart>
    </ResponsiveContainer>
  )
}

export default GraficoPorGrado