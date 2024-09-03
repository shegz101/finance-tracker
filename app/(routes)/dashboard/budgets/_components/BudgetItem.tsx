import Link from "next/link";

type BudgetItemProps = {
  budget: any; // This should match the type of each item in budgetItems
};

const BudgetItem: React.FC<BudgetItemProps> = ({ budget }) => {

  const getProgressBarValue = () => {
    const percProVal = (budget?.totalSpent/budget?.amount)*100
    return percProVal.toFixed(2);
  }

  
  return (
    <Link href={'/dashboard/expenses/' + budget?.id}>
      <div className="p-5 border-2 rounded-lg hover:shadow-md cursor-pointer h-[170px]">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
              <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">{budget?.icon}</h2>
              <div>
                  <h2 className="font-bold">{budget?.name}</h2>
                  <h2 className="text-sm text-gray-400">{budget?.totalItem} Item(s)</h2>
              </div>
          </div>
          <div>
            <h2 className="font-bold text-primary text-lg">${(budget?.amount)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs text-slate-400">${(budget?.totalSpent)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ? (budget?.totalSpent)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0} Spent</h2>
              <h2 className="text-xs text-slate-400">${(budget?.amount)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") - (budget?.totalSpent)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Remaining</h2>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full">
              <div className="h-2 bg-primary rounded-full" style={{ width: `${getProgressBarValue()}%`}}/>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BudgetItem
