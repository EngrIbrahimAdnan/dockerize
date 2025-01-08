"use client";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const monthlyData = [
  { month: "Aug", balance: 300, spending: 150, saving: 200 },
  { month: "Sep", balance: 320, spending: 180, saving: 220 },
  { month: "Oct", balance: 280, spending: 160, saving: 190 },
  { month: "Nov", balance: 350, spending: 200, saving: 240 },
  { month: "Dec", balance: 310, spending: 170, saving: 210 },
];

const weeklyData = [
  { name: "Balance", value: 35 },
  { name: "Spending", value: 40 },
  { name: "Saving", value: 25 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export function DashboardCharts() {
  return (
    <div className="space-y-8">
      {/* Monthly Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              balance: {
                label: "Balance",
                color: "hsl(var(--chart-1))",
              },
              spending: {
                label: "Spending",
                color: "hsl(var(--chart-2))",
              },
              saving: {
                label: "Saving",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar
                  dataKey="balance"
                  fill="var(--color-balance)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="spending"
                  fill="var(--color-spending)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="saving"
                  fill="var(--color-saving)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Weekly Pie Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((week) => (
              <div key={week} className="flex flex-col items-center">
                <ChartContainer
                  config={{
                    balance: {
                      label: "Balance",
                      color: COLORS[0],
                    },
                    spending: {
                      label: "Spending",
                      color: COLORS[1],
                    },
                    saving: {
                      label: "Saving",
                      color: COLORS[2],
                    },
                  }}
                  className="h-[150px] w-[150px]"
                >
                  <PieChart>
                    <Pie
                      data={weeklyData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={60}
                    >
                      {weeklyData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="text-center mt-2">Week {week}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
