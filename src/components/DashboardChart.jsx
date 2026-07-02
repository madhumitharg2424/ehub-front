import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function DashboardChart({
  totalEvents,
  totalRegistrations,
  totalUsers,
}) {

  const data = [
    {
      name: "Events",
      value: totalEvents,
    },
    {
      name: "Registrations",
      value: totalRegistrations,
    },
    {
      name: "Users",
      value: totalUsers,
    },
  ];

  const COLORS = [
    "#2563eb",
    "#7c3aed",
    "#16a34a",
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-4 md:p-8 overflow-x-auto">

      <h2 className="text-xl md:text-2xl font-bold mb-6">
        Platform Analytics
      </h2>

      <div className="h-72 md:h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default DashboardChart;