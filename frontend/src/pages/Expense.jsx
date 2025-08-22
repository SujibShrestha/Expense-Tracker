import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Expense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch existing expenses
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

  // Add new expense
  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!title || !amount) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost/Web2/Expense-Tracker/backend/addexpense.php",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, amount }),
        }
      );

      const data = await res.json();
      if (data.status === "success") {
        setTitle("");
        setAmount("");
        setError(null);
        fetchExpenses(); // refresh list
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="ml-[40%] pt-32 p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
      <form className="flex gap-2 mb-6" onSubmit={handleAddExpense}>
        <Input
          type="text"
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button type="submit">Add</Button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <h3 className="text-xl font-bold mb-2">Your Expenses</h3>
      <div className="bg-white p-4 rounded-lg shadow">
        {expenses.length === 0 && <p>No expenses yet</p>}
        {expenses.map((exp) => (
          <div
            key={exp.id}
            className="flex justify-between py-2 border-b last:border-b-0"
          >
            <span>{exp.title}</span>
            <span>${exp.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
