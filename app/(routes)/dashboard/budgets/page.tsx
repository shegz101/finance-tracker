import BudgetsList from './_components/BudgetsList'

function Budgets() {
  return (
    <div className='p-5 md:p-10'>
      <h1 className='font-bold text-3xl'>My Budgets</h1>
      <BudgetsList/>
    </div>
  )
}

export default Budgets
