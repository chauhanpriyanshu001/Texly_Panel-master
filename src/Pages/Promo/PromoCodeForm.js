import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../variable';

const PromoCodeForm = ({ promo, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: promo?.name || '',
    discount: promo?.discount || '',
    description: promo?.description || '',
    policy: promo?.policy || '',
    expiry: promo?.expiry
      ? new Date(promo.expiry).toISOString().split('T')[0]
      : ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem('adminToken');
      
      if (promo) {
        await axios.put(
          `${BASE_URL}/admin/updatePromo/${promo._id}`,
          formData,
          { headers: { token } }
        );
      } else {
        await axios.post(`${BASE_URL}/admin/addPromo`, formData, {
          headers: { token }
        });
      }

      onSubmit();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save promo code');
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

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div>
          <label 
            htmlFor="name"
            style={{ 
              display: 'block', 
              color: '#d1d5db', 
              fontWeight: '600', 
              marginBottom: '0.5rem' 
            }}
          >
            Name<span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem 1rem',
              border: '1px solid #4b5563',
              borderRadius: '0.375rem',
              backgroundColor: promo ? '#374151' : '#2d3748',
              color: '#f3f4f6',
              cursor: promo ? 'not-allowed' : 'text',
              transition: 'all 0.2s'
            }}
            required
            disabled={promo}
          />
        </div>

        <div>
          <label 
            htmlFor="discount"
            style={{ 
              display: 'block', 
              color: '#d1d5db', 
              fontWeight: '600', 
              marginBottom: '0.5rem' 
            }}
          >
            Discount (%)<span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            id="discount"
            name="discount"
            type="number"
            min="0"
            max="100"
            value={formData.discount}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem 1rem',
              border: '1px solid #4b5563',
              borderRadius: '0.375rem',
              backgroundColor: '#2d3748',
              color: '#f3f4f6',
              transition: 'all 0.2s'
            }}
            required
          />
        </div>

        <div>
          <label 
            htmlFor="description"
            style={{ 
              display: 'block', 
              color: '#d1d5db', 
              fontWeight: '600', 
              marginBottom: '0.5rem' 
            }}
          >
            Description<span style={{ color: '#ef4444' }}>*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem 1rem',
              border: '1px solid #4b5563',
              borderRadius: '0.375rem',
              backgroundColor: '#2d3748',
              color: '#f3f4f6',
              minHeight: '4.5rem',
              transition: 'all 0.2s'
            }}
            rows="3"
            required
          />
        </div>

        <div>
          <label 
            htmlFor="policy"
            style={{ 
              display: 'block', 
              color: '#d1d5db', 
              fontWeight: '600', 
              marginBottom: '0.5rem' 
            }}
          >
            Policy<span style={{ color: '#ef4444' }}>*</span>
          </label>
          <textarea
            id="policy"
            name="policy"
            value={formData.policy}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem 1rem',
              border: '1px solid #4b5563',
              borderRadius: '0.375rem',
              backgroundColor: '#2d3748',
              color: '#f3f4f6',
              minHeight: '4.5rem',
              transition: 'all 0.2s'
            }}
            rows="3"
            required
          />
        </div>

        <div>
          <label 
            htmlFor="expiry"
            style={{ 
              display: 'block', 
              color: '#d1d5db', 
              fontWeight: '600', 
              marginBottom: '0.5rem' 
            }}
          >
            Expiry Date<span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            id="expiry"
            name="expiry"
            type="date"
            value={formData.expiry}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem 1rem',
              border: '1px solid #4b5563',
              borderRadius: '0.375rem',
              backgroundColor: '#2d3748',
              color: '#f3f4f6',
              transition: 'all 0.2s'
            }}
            required
          />
        </div>
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
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={e => e.target.style.backgroundColor = '#6b7280'}
          onMouseOut={e => e.target.style.backgroundColor = '#4b5563'}
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
            transition: 'background-color 0.2s'
          }}
          disabled={loading}
          onMouseOver={e => !loading && (e.target.style.backgroundColor = '#2563eb')}
          onMouseOut={e => !loading && (e.target.style.backgroundColor = '#3b82f6')}
        >
          {loading ? 'Saving...' : (promo ? 'Update' : 'Create')}
        </button>
      </div>
    </form>
  );
};

export default PromoCodeForm;