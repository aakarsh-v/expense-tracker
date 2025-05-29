import React from 'react'

const ExpensesTable = ({expenses, handleDelete}) => {
  console.log("expenses ---> ", expenses);
  return (
    <div className='expense-list'>
      {
        expenses?.map((expense, index) => (
          <div key={index} className='expense-item'>
            <button className='delete-button'
              onClick={() => handleDelete(expense._id)}
            >X</button>
            <div className='expense-description'>{expense.text}</div>
            <div className='expense-amount'>{expense.amount}</div>
          </div>
        ))
      }
    </div>
  )
}

export default ExpensesTable
