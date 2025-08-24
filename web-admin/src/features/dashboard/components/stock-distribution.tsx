import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'On hand', value: 35 },
  { name: 'Installment', value: 28 },
  { name: 'Pre-order', value: 20 },
  { name: 'Cash', value: 17 },
];

export function StockDistribution() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart data={data}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          className="fill-primary"
          dataKey="value"
          label={({ name, value }) => `${name}: ${value}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill="currentColor" />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
