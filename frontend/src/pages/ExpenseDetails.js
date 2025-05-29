import React from 'react';

function ExpenseDetails({ incomeAmount, expenseAmount }) {
  const balance = incomeAmount - expenseAmount;

  return (
    <div>
      <h3 style={{ marginBottom: '20px', color: '#1a1a1a' }}>Financial Overview</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div style={{
          padding: '20px',
          backgroundColor: '#e8f5e9',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ color: '#2e7d32', marginRight: '8px' }}>↑</span>
            <span style={{ color: '#2e7d32', fontWeight: 500 }}>Total Income</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>
            ${incomeAmount.toFixed(2)}
          </div>
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: '#ffebee',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ color: '#c62828', marginRight: '8px' }}>↓</span>
            <span style={{ color: '#c62828', fontWeight: 500 }}>Total Expenses</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>
            ${expenseAmount.toFixed(2)}
          </div>
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: balance >= 0 ? '#e3f2fd' : '#fff3e0',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ 
              color: balance >= 0 ? '#1565c0' : '#ef6c00', 
              marginRight: '8px' 
            }}>💰</span>
            <span style={{ 
              color: balance >= 0 ? '#1565c0' : '#ef6c00', 
              fontWeight: 500 
            }}>Balance</span>
          </div>
          <div style={{ 
            fontSize: '24px', 
            fontWeight: 600, 
            color: balance >= 0 ? '#1565c0' : '#ef6c00'
          }}>
            ${balance.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseDetails;
