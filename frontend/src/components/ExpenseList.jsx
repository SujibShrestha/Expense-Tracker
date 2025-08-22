import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card" // relative path
import { useState,useEffect } from "react";

// Sample expense data


export default function ExpenseList() {
const [expenses,setExpenses]=useState([]);
  const fetchExpenses = () => {
      fetch("http://localhost/Web2/Expense-Tracker/backend/getexpense.php", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status !== "success") {
            navigate("/login"); // redirect if not logged in
          } else {
            setExpenses(data.data);
          }
        })
        .catch((err) => console.error("Error fetching expenses:", err));
    };
  
    useEffect(() => {
      fetchExpenses();
    }, []);
  

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        {expenses.length === 0 && <p>No expenses yet</p>}
        <ul className="divide-y divide-gray-200">
          
          {expenses.slice(0,6).map((expense) => (
            <li
  key={expense.id}
  className="flex justify-between md:justify-start md:gap-8 py-2 items-center"
>
  <span className="font-medium w-1/3">{expense.title}</span>
  <span className="w-1/3 text-center">${expense.amount}</span>
  <span className="w-1/3 text-right text-gray-500 text-sm">{expense.date}</span>
</li>

          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
