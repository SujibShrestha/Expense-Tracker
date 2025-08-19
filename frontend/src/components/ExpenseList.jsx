import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card" // relative path

// Sample expense data
const expenses = [
  { id: 1, description: "Groceries", amount: 120, date: "2025-08-01" },
  { id: 2, description: "Electricity Bill", amount: 75, date: "2025-08-03" },
  { id: 3, description: "Internet", amount: 40, date: "2025-08-05" },
]

export default function ExpenseList() {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-gray-200">
          {expenses.slice(0,6).map((expense) => (
            <li
  key={expense.id}
  className="flex justify-between md:justify-start md:gap-8 py-2 items-center"
>
  <span className="font-medium w-1/3">{expense.description}</span>
  <span className="w-1/3 text-center">${expense.amount}</span>
  <span className="w-1/3 text-right text-gray-500 text-sm">{expense.date}</span>
</li>

          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
