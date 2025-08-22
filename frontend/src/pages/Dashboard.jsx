import { useState, useEffect } from "react";
import { SectionCard } from "../components/SectionCard";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import PieChartCard from "../components/PieChartCard";
import ExpenseList from "../components/ExpenseList";
import Modal from "../components/Modal";
import { Input } from "../components/ui/input";

export default function Dashboard() {
  const [amount, setAmount] = useState(0);
  const [savings, setSavings] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [newAmount, setNewAmount] = useState("");
  const navigate = useNavigate();
  

  // Fetch dashboard data from backend
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("http://localhost/Web2/Expense-Tracker/backend/dashboard.php", {
          method: "GET",
          credentials: "include", // send PHP session cookie
        });

        const data = await res.json();

        if (data.status !== "success") {
          navigate("/login"); // redirect if not authorized
        } else {
          setAmount(data.total_amount);
          setSavings(data.savings);
          setExpenses(data.expenses);
        }
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleSave = () => {
    if (newAmount) {
      setAmount(newAmount);
      setNewAmount("");
    }
  };

  return (
    <div className="ml-65 min-h-[90vh] p-4 w-[85%]">
      {/* Section Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        <SectionCard
          title="Total amount"
          description="Monthly Total amount"
          footer={
            <Modal triggerText="Enter amount" title="Enter New Amount" onSave={handleSave}>
              <Input
                type="number"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </Modal>
          }
        >
          <p className="text-lg font-semibold">${amount}</p>
        </SectionCard>

        <SectionCard title="Saving" description="Monthly saving summary">
          <p className="text-lg font-semibold">${savings}</p>
        </SectionCard>

        <SectionCard
          title="Expenses"
          description="Monthly expense summary"
          footer={
            <Link to="/expense">
              <Button className="cursor-pointer">View Details</Button>
            </Link>
          }
        >
          <p className="text-lg font-semibold">${expenses}</p>
        </SectionCard>
      </div>

      {/* Pie Chart Card */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <PieChartCard />
        <ExpenseList />
      </div>
    </div>
  );
}
