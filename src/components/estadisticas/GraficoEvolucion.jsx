import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { COLORES } from '../../data/coloresGraficos'

// '2026-10-26' → '26/10'
const diaYMes = (fecha) => `${fecha.slice(8, 10)}/${fecha.slice(5, 7)}`

function GraficoEvolucion({ datos }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={datos} margin={{ top: 16, right: 32, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="semana" tickFormatter={diaYMes} />
        <YAxis allowDecimals={false} />
        <Tooltip labelFormatter={(semana) => `Semana del ${diaYMes(semana)}`} />
        <Line type="monotone" dataKey="cantidad" name="Inscripciones" stroke={COLORES.evolucion} strokeWidth={2} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default GraficoEvolucion