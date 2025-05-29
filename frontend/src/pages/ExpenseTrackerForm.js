import React, { useState } from 'react';
import { handleError } from '../utils';

function ExpenseTrackerForm({ addExpense }) {
  const [formData, setFormData] = useState({
    text: '',
    amount: '',
    type: 'expense'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = formData.type === 'expense' 
      ? -Math.abs(Number(formData.amount))
      : Math.abs(Number(formData.amount));
    
    addExpense({
      text: formData.text,
      amount: amount
    });

    setFormData({
      text: '',
      amount: '',
      type: 'expense'
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <h3 style={{ marginBottom: '20px', color: '#1a1a1a' }}>Add New Transaction</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#666' }}>
            Description
          </label>
          <input
            type="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#666' }}>
            Amount
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#666'
            }}>$</span>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px 12px 8px 28px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#666' }}>
            Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              backgroundColor: 'white'
            }}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            padding: '12px',
            backgroundColor: formData.type === 'expense' ? '#dc3545' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          Add {formData.type === 'expense' ? 'Expense' : 'Income'}
        </button>
      </form>
    </div>
  );
}

export default ExpenseTrackerForm;
