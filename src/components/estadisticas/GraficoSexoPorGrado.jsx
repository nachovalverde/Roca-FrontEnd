import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { COLORES } from '../../data/coloresGraficos'
import { SEXOS_ESTADISTICA } from '../../utils/calcularEstadisticas'

function GraficoSexoPorGrado({ datos }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={datos} stackOffset="expand" margin={{ top: 20, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="grado" />
        {/* Ancho fijo y espacio duro (\u00a0) para que «100 %» entre en un solo renglón */}
        <YAxis width={64} tickFormatter={(valor) => `${Math.round(valor * 100)}\u00a0%`} />
        <Tooltip />
        {/* El texto de la leyenda va en el color normal: en el color de la serie, el gris claro casi no se lee */}
        <Legend formatter={(texto) => <span className="text-body">{texto}</span>} />
        {SEXOS_ESTADISTICA.map((sexo) => (
          <Bar key={sexo} dataKey={sexo} stackId="sexo" fill={COLORES[sexo]} />
        ))}
        <Bar dataKey="sinDato" name="Sin dato" stackId="sexo" fill={COLORES.sinDato} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default GraficoSexoPorGrado