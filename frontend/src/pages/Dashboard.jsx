import { SectionCard } from "../components/SectionCard" // relative path
import { Button } from "../components/ui/button"         // relative path
import { Link, useNavigate } from "react-router-dom"
import PieChartCard from "../components/PieChartCard"    // relative path
import ExpenseList from "../components/ExpenseList"

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="ml-65  min-h-[90vh] p-4 w-[85%]">
      {/* Section Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        <SectionCard title="Total amount" description="Monthly Total amount">
          <p className="text-lg font-semibold">$5,200</p>
        </SectionCard>

        <SectionCard title="Saving" description="Monthly saving summary">
          <p className="text-lg font-semibold">$2,800</p>
        </SectionCard>

        <SectionCard
          title="Expenses"
          description="Monthly expense summary"
          footer={
            <Link to={"/expense"}>
              <Button className={"cursor-pointer"}>View Details</Button>
            </Link>
          }
        >
          <p className="text-lg font-semibold">$2,800</p>
        </SectionCard>
      </div>

      {/* Pie Chart Card */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <PieChartCard /> <ExpenseList/>
      </div>
      <div>
       
      </div>
    </div>
  )
}
