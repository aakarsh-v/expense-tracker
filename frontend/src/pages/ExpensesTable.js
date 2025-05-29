import React from 'react';

function ExpensesTable({ expenses, handleDelete }) {
  return (
    <div>
      <h3 style={{ marginBottom: '20px', color: '#1a1a1a' }}>Transaction History</h3>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Description</th>
              <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #dee2e6' }}>Amount</th>
              <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #dee2e6' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense._id} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '12px' }}>{expense.text}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: expense.amount > 0 ? '#e8f5e9' : '#ffebee',
                    color: expense.amount > 0 ? '#2e7d32' : '#c62828',
                    fontSize: '14px'
                  }}>
                    ${Math.abs(expense.amount).toFixed(2)}
                  </span>
                </td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <button
                    onClick={() => handleDelete(expense._id)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {expenses.length === 0 && (
              <tr>
                <td colSpan={3} style={{ padding: '24px', textAlign: 'center', color: '#666' }}>
                  No transactions yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpensesTable;
