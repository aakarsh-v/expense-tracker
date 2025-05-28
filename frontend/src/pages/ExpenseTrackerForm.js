import React, { useState } from 'react'

const ExpenseTrackerForm = () => {

    const [expenseInfo, setExpenseInfo] = useState({ text: '', amount: ''});

    const handleChange = (e) => {
    const {name, value} = e.target;
    console.log(name, value);
    const copyExpenseInfo = {...expenseInfo};
    copyExpenseInfo[name] = value;
    setExpenseInfo(copyExpenseInfo);
  }


  const handleExpense = () => {

  }

  
  return (
    <div className='container'>
      <h1>Expenses</h1>
      <form onSubmit={handleExpense}>
        <div>
          <label htmlFor='email'>Expense Description</label>
          <input
            onChange={handleChange}
            type='text'
            name='text'
            placeholder='Enter your expense description'
            value = {expenseInfo.text}
            />
        </div>
        <div>
          <label htmlFor='amount'>Amount</label>
          <input 
            onChange={handleChange}
            type='number'
            name='amount'
            placeholder='Enter the amount, -ve for expense, +ve for income'
            value = {expenseInfo.amount}
            />  
        </div>  
        <button type='submit'>Add expense</button>
        </form>

    </div>
  )
}

export default ExpenseTrackerForm
