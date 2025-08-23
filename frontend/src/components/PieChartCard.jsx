import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"; // relative path
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4ade80", "#60a5fa", "#f87171"]; // green, blue, red

export default function PieChartCard({
  title = "Monthly Overview",
  savings,
  expenses,
  amount,
}) {
  const data = [
    { name: "Total Amount", value: amount},
    { name: "Saving", value: savings },
    { name: "Expenses", value: expenses },
  ];
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-66">
        <ResponsiveContainer width="100%" height="100%">
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
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
