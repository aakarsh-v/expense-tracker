import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { handleError, handleSuccess } from '../utils'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError('Please fill all the fields');
    }
    try {
      const url = "http://localhost:3001/auth/signup"
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      })
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login');
        }, 1000)
      } else if (error) {
        const details = error?.details;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'white',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          marginBottom: '24px',
          color: '#1a1a1a',
          textAlign: 'center',
          fontSize: '28px'
        }}>Create Account</h1>
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#666',
              fontSize: '14px'
            }}>Name</label>
            <input
              onChange={handleChange}
              type='text'
              name='name'
              autoFocus
              placeholder='Enter your name'
              value={signupInfo.name}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#666',
              fontSize: '14px'
            }}>Email</label>
            <input
              onChange={handleChange}
              type='email'
              name='email'
              placeholder='Enter your email'
              value={signupInfo.email}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#666',
              fontSize: '14px'
            }}>Password</label>
            <input
              onChange={handleChange}
              type='password'
              name='password'
              placeholder='Enter your password'
              value={signupInfo.password}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>
          <button
            type='submit'
            style={{
              padding: '12px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            Sign Up
          </button>
          <div style={{
            textAlign: 'center',
            marginTop: '16px',
            color: '#666'
          }}>
            Already have an account?{' '}
            <Link to='/login' style={{
              color: '#007bff',
              textDecoration: 'none',
              fontWeight: '500'
            }}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
