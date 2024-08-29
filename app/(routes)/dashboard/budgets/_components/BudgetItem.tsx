type BudgetItemProps = {
  budget: any; // This should match the type of each item in budgetItems
};

const BudgetItem: React.FC<BudgetItemProps> = ({ budget }) => {
  return (
    <div className="p-5 border-2 rounded-lg hover:shadow-md cursor-pointer">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
            <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">{budget?.icon}</h2>
            <div>
                <h2 className="font-bold">{budget?.name}</h2>
                <h2 className="text-sm text-gray-400">{budget?.totalItem} Items</h2>
            </div>
        </div>
        <div>
            <h2 className="font-bold text-primary text-lg">${budget?.amount}</h2>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-slate-400">${budget?.totalSpent ? budget?.totalSpent : 0} Spent</h2>
            <h2 className="text-xs text-slate-400">${budget?.amount - budget?.totalSpent} Remaining</h2>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full">
            <div className="w-[40%] h-2 bg-primary rounded-full"/>
        </div>
      </div>
    </div>
  )
}

export default BudgetItem
