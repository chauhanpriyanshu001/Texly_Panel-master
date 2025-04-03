import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../variable';

const AddUserForm = ({ promoCodeId, onSubmit, onCancel }) => {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem('adminToken');
      
      await axios.put(
        `${BASE_URL}/admin/addUserInPromo`,
        { promoCodeId, userId },
        {
          headers: { token }
        }
      );

      onSubmit();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add user to promo code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      style={{
        maxWidth: '32rem',
        margin: '0 auto',
        padding: '1.5rem',
        backgroundColor: '#1f2937',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        color: '#f3f4f6'
      }}
    >
      {error && (
        <div style={{
          marginBottom: '1.5rem',
          padding: '1rem',
          backgroundColor: '#4c1d1d',
          borderLeft: '4px solid #ef4444',
          color: '#fecaca',
          borderRadius: '0 0.375rem 0.375rem 0'
        }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: '1.5rem' }}>
        <label 
          htmlFor="userId"
          style={{ 
            display: 'block', 
            color: '#d1d5db', 
            fontWeight: '600', 
            marginBottom: '0.5rem' 
          }}
        >
          User ID<span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input
          id="userId"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem 1rem',
            border: '1px solid #4b5563',
            borderRadius: '0.375rem',
            backgroundColor: '#2d3748',
            color: '#f3f4f6',
            transition: 'all 0.2s',
            outline: 'none'
          }}
          placeholder="Enter user's MongoDB ObjectId"
          required
          onFocus={(e) => e.target.style.borderColor = '#60a5fa'}
          onBlur={(e) => e.target.style.borderColor = '#4b5563'}
        />
        <p style={{
          fontSize: '0.875rem',
          color: '#9ca3af',
          marginTop: '0.25rem'
        }}>
          Enter the MongoDB ObjectId of the user to add to this promo code
        </p>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        gap: '1rem', 
        marginTop: '2rem' 
      }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: '#4b5563',
            color: '#f3f4f6',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '500',
            transition: 'background-color 0.2s',
            opacity: loading ? '0.7' : '1'
          }}
          disabled={loading}
          onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#6b7280')}
          onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#4b5563')}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: loading ? '#60a5fa' : '#3b82f6',
            color: '#fff',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '500',
            transition: 'background-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          disabled={loading}
          onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
          onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#3b82f6')}
        >
          {loading ? (
            <>
              <svg 
                style={{
                  animation: 'spin 1s linear infinite',
                  marginRight: '0.5rem',
                  height: '1rem',
                  width: '1rem'
                }} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  style={{ opacity: '0.25' }} 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                ></circle>
                <path 
                  style={{ opacity: '0.75' }} 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Adding...
            </>
          ) : 'Add User'}
        </button>
      </div>

      {/* Add this style tag for the spinning animation */}
      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </form>
  );
};

export default AddUserForm;