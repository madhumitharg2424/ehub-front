import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function DashboardBarChart({
  totalEvents,
  totalRegistrations,
  totalUsers,
}) {

  const data = [
    {
      name: "Events",
      count: totalEvents,
    },
    {
      name: "Registrations",
      count: totalRegistrations,
    },
    {
      name: "Users",
      count: totalUsers,
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6">
        Statistics Overview
      </h2>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="count" />

          </BarChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
}

export default DashboardBarChart;