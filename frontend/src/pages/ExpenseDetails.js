import React from 'react'

const ExpenseDetails = ({incomeAmount, expenseAmount}) => {
  return (
    <div>
    <div>
      Your balance is : {incomeAmount - expenseAmount}
    </div>

    <div className='amounts-container'> 
        Income
        <span className='income-amount'> {incomeAmount} </span>

        Expense
        <span className='expense-amount'> {expenseAmount} </span>
    </div>
    </div>
  )
}

export default ExpenseDetails
