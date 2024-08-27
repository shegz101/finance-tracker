import React from 'react'
import CreateNewBudget from './CreateNewBudget'

function BudgetsList() {
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            <CreateNewBudget/>
        </div>
    </div>
  )
}

export default BudgetsList
