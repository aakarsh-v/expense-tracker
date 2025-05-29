import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import ExpensesTable from './ExpensesTable';
import ExpenseTrackerForm from './ExpenseTrackerForm';
import ExpenseDetails from './ExpenseDetails';


function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [expenses,setExpenses] = useState([]);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser( localStorage.getItem('loggedInUser'))
  }, [])

  useEffect(() => {
    const amounts = expenses.map((item) => item.amount);
    console.log(amounts);

    const income = amounts.filter(item => item > 0)
      .reduce((acc, item) => (acc += item), 0);
      console.log('income: ',income);

    const expense = amounts.filter(item => item < 0)
      .reduce((acc, item) => (acc += item), 0)* -1;
      console.log('expense: ', expense)

    setIncomeAmount(income);
    setExpenseAmount(expense);

  }, [expenses])

const handleLogout = (e) => {
  localStorage.removeItem('token');
  localStorage.removeItem('loggedInUser');
  handleSuccess('Logout successful');
  setTimeout(() => {
    navigate('/login');
  }, 1000)
}


  const fetchExpenses = async () => {
    try {
      const url = "http://localhost:3001/expenses";
      const headers = {
        headers: {
          'Authorization' : localStorage.getItem('token')
        }
      }
      const response = await fetch(url, headers);
      if(response.status === 403){
        navigate('/login');
        return;
      }
      const result = await response.json();
      console.log(result.data);
      setExpenses(result.data);
    } catch (error) {
      handleError(error);
    }
  }

  const addExpense = async(data) => {
    try {
      const url = "http://localhost:3001/expenses";
      const headers = {
        headers: {
          'Authorization' : localStorage.getItem('token'),
          'Content-Type' : 'application/json'
        },
        method: 'POST',
        body : JSON.stringify(data)
      }
      const response = await fetch(url, headers);
      if(response.status === 403){
        navigate('/login');
        return;
      }
      const result = await response.json();
      console.log(result.data);
      setExpenses(result.data);
      handleSuccess(result.message);
    } catch (error) {
      handleError(error);
    }
  }


  useEffect(() => {
    fetchExpenses();
  }, [])

  const handleDelete = async(expenseId) => {
    try {
      const url = `http://localhost:3001/expenses/${expenseId}`;
      const headers = {
        headers: {
          'Authorization' : localStorage.getItem('token'),
          'Content-Type' : 'application/json'
        },
        method: 'DELETE'
      }
      const response = await fetch(url, headers);
      if(response.status === 403){
        navigate('/login');
        return;
      }
      const result = await response.json();
      console.log(result.data);
      setExpenses(result.data);
      handleSuccess(result.message);
    } catch (error) {
      handleError(error);
    }
  }

  

return (
  <div>
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
    <ExpenseDetails incomeAmount = {incomeAmount} expenseAmount = {expenseAmount}/>
    <ExpenseTrackerForm addExpense={addExpense}/>
    <ExpensesTable expenses={expenses} handleDelete = {handleDelete}/>
    </div>
  )
}

export default Home
