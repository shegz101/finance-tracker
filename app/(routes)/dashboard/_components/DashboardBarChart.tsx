import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type BudgetItem = {
  totalSpent: number;
  totalItem: number;
  id: number;
  name: string;
  amount: string;
  icon: string | null;
  createdBy: string;
};

interface DashboardBarChartProps {
    budgetItem: BudgetItem[]
}

function DashboardBarChart({ budgetItem }: DashboardBarChartProps) {
  return (
    <div className='border rounded-lg shadow-md p-3'>
      <h2 className='font-bold text-lg'>Ongoing Activities</h2>
      <ResponsiveContainer width={"80%"} height={300}>
        <BarChart
        data={budgetItem}
        margin={{
          top:7
        }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpent" stackId={"a"} fill="#0085FF" />
          <Bar dataKey="amount" stackId={"a"} fill="#66B3FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DashboardBarChart
