import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import ExpensesTable from './ExpensesTable';
import ExpenseTrackerForm from './ExpenseTrackerForm';
import ExpenseDetails from './ExpenseDetails';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])

  useEffect(() => {
    const amounts = expenses.map((item) => item.amount);
    const income = amounts.filter(item => item > 0)
      .reduce((acc, item) => (acc += item), 0);
    const expense = amounts.filter(item => item < 0)
      .reduce((acc, item) => (acc += item), 0) * -1;

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
      const url = "https://expense-tracker-sduo.onrender.com/expenses";
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }
      const response = await fetch(url, headers);
      if (response.status === 403) {
        navigate('/login');
        return;
      }
      const result = await response.json();
      setExpenses(result.data);
    } catch (error) {
      handleError(error);
    }
  }

  const addExpense = async (data) => {
    try {
      const url = "https://expense-tracker-sduo.onrender.com/expenses";
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
      }
      const response = await fetch(url, headers);
      if (response.status === 403) {
        navigate('/login');
        return;
      }
      const result = await response.json();
      setExpenses(result.data);
      handleSuccess(result.message);
    } catch (error) {
      handleError(error);
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, [])

  const handleDelete = async (expenseId) => {
    try {
      const url = `https://expense-tracker-sduo.onrender.com/expenses/${expenseId}`;
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      }
      const response = await fetch(url, headers);
      if (response.status === 403) {
        navigate('/login');
        return;
      }
      const result = await response.json();
      setExpenses(result.data);
      handleSuccess(result.message);
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: 'white',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ margin: 0 }}>Expense Tracker</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>{loggedInUser}</span>
          <button 
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <ExpenseDetails incomeAmount={incomeAmount} expenseAmount={expenseAmount} />
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr',
          gap: '20px'
        }}>
          <div>
            <ExpenseTrackerForm addExpense={addExpense} />
          </div>
          <div>
            <ExpensesTable expenses={expenses} handleDelete={handleDelete} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
