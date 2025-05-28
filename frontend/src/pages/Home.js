import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import ExpensesTable from './ExpensesTable';
import ExpenseTrackerForm from './ExpenseTrackerForm';


function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [expenses,setExpenses] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser( localStorage.getItem('loggedInUser'))
  }, [])

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


  useEffect(() => {
    fetchExpenses();
  }, [])


return (
  <div>
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
    <ExpenseTrackerForm/>
    <ExpensesTable expenses={expenses}/>
    </div>
  )
}

export default Home
