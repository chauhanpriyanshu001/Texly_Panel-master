import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import PromoCodeForm from './PromoCodeForm';
import AddUserForm from './AddUserForm';
import BASE_URL from '../../variable';

const PromoCodeList = () => {
    const [promocodes, setPromocodes] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingPromo, setEditingPromo] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUserForm, setShowUserForm] = useState(false);
    const [selectedPromoId, setSelectedPromoId] = useState(null);

    // Styles
    const styles = {
        container: {
            padding: '2rem',
            backgroundColor: '#111827',
            minHeight: '100vh',
            color: '#f3f4f6',
            fontFamily: "'Inter', 'Segoe UI', sans-serif"
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            borderBottom: '1px solid #374151',
            paddingBottom: '1rem'
        },
        title: {
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#f3f4f6',
            margin: 0
        },
        button: {
            padding: '0.75rem 1.5rem',
            backgroundColor: '#4f46e5',
            color: '#fff',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontWeight: '600',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 6px rgba(79, 70, 229, 0.25)'
        },
        addIcon: {
            fontSize: '1.25rem'
        },
        tableContainer: {
            overflowX: 'auto',
            backgroundColor: '#1f2937',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            marginBottom: '2rem'
        },
        table: {
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: '0',
            fontSize: '0.95rem'
        },
        tableHead: {
            backgroundColor: '#111827'
        },
        tableHeaderCell: {
            padding: '1rem 1.5rem',
            textAlign: 'left',
            fontSize: '0.8rem',
            fontWeight: '600',
            color: '#9ca3af',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderBottom: '2px solid #374151'
        },
        tableRow: {
            transition: 'background-color 0.2s',
            cursor: 'default'
        },
        tableRowHover: {
            backgroundColor: '#283548'
        },
        tableCell: {
            padding: '1.25rem 1.5rem',
            color: '#e5e7eb',
            borderBottom: '1px solid #374151'
        },
        badgeCell: {
            padding: '1.25rem 1.5rem',
            color: '#e5e7eb',
            borderBottom: '1px solid #374151'
        },
        badge: {
            padding: '0.35rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '600',
            display: 'inline-block'
        },
        actionButton: {
            padding: '0.4rem 0.75rem',
            borderRadius: '0.375rem',
            border: 'none',
            fontWeight: '500',
            fontSize: '0.8rem',
            marginRight: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem'
        },
        editButton: {
            backgroundColor: '#1e40af',
            color: '#fff'
        },
        deleteButton: {
            backgroundColor: '#991b1b',
            color: '#fff'
        },
        addUserButton: {
            backgroundColor: '#065f46',
            color: '#fff'
        },
        pagination: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
            gap: '0.5rem'
        },
        pageButton: {
            padding: '0.6rem 1rem',
            backgroundColor: '#374151',
            color: '#e5e7eb',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontWeight: '500',
            minWidth: '2.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        activePageButton: {
            backgroundColor: '#4f46e5',
            boxShadow: '0 2px 4px rgba(79, 70, 229, 0.4)'
        },
        disabledButton: {
            backgroundColor: '#1f2937',
            color: '#6b7280',
            cursor: 'not-allowed'
        },
        loadingContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
            fontSize: '1rem',
            color: '#9ca3af'
        },
        errorContainer: {
            backgroundColor: '#7f1d1d',
            color: '#fecaca',
            padding: '1rem',
            borderRadius: '0.5rem',
            textAlign: 'center',
            marginBottom: '1rem'
        },
        modal: {
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            backdropFilter: 'blur(4px)'
        },
        modalContent: {
            backgroundColor: '#1f2937',
            padding: '2rem',
            borderRadius: '0.75rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            width: '100%',
            maxWidth: '32rem',
            border: '1px solid #374151',
            maxHeight: '85vh',
            overflowY: 'auto'
        },
        modalTitle: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#f3f4f6',
            marginBottom: '1.5rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid #374151'
        }
    };

    const fetchPromoCodes = async (page = 1) => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem("adminToken");
            const response = await axios.get(`${BASE_URL}/admin/getPromo?page=${page}&limit=10`, {
                headers: { token },
            });
            setPromocodes(response.data.promocodes);
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.currentPage);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch promo codes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPromoCodes();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this promo code?')) {
            try {
                const token = sessionStorage.getItem("adminToken");
                await axios.delete(`${BASE_URL}/admin/deletePromo/${id}`, {
                    headers: { token },
                });
                fetchPromoCodes(currentPage);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete promo code');
            }
        }
    };

    const handleEdit = (promo) => {
        setEditingPromo(promo);
        setShowAddForm(true);
    };

    const handleAddUser = (promoId) => {
        setSelectedPromoId(promoId);
        setShowUserForm(true);
    };

    const handleFormClose = () => {
        setShowAddForm(false);
        setEditingPromo(null);
    };

    const handleUserFormClose = () => {
        setShowUserForm(false);
        setSelectedPromoId(null);
    };

    const handleFormSubmit = () => {
        fetchPromoCodes(currentPage);
        handleFormClose();
    };

    const handleUserFormSubmit = () => {
        fetchPromoCodes(currentPage);
        handleUserFormClose();
    };

    const handlePageChange = (page) => {
        fetchPromoCodes(page);
    };

    // Row hover state management
    const [hoveredRow, setHoveredRow] = useState(null);

    if (loading && promocodes.length === 0) {
        return (
            <div style={styles.container}>
                <div style={styles.loadingContainer}>
                    <div>
                        <div style={{
                            border: '4px solid #374151',
                            borderTop: '4px solid #4f46e5',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            animation: 'spin 1s linear infinite',
                            margin: '0 auto 1rem auto'
                        }}></div>
                        <div>Loading promo codes...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error && promocodes.length === 0) {
        return (
            <div style={styles.container}>
                <div style={styles.errorContainer}>
                    <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Error</p>
                    <p>{error}</p>
                </div>
                <button 
                    onClick={() => fetchPromoCodes()} 
                    style={{...styles.button, margin: '0 auto', display: 'block'}}
                >
                    Try Again
                </button>
            </div>
        );
    }

    // Calculate expiry status for badges
    const getExpiryStatus = (expiryDate) => {
        const today = new Date();
        const expiry = new Date(expiryDate);
        const daysLeft = Math.floor((expiry - today) / (1000 * 60 * 60 * 24));
        
        if (daysLeft < 0) {
            return { status: 'expired', color: '#991b1b', backgroundColor: 'rgba(153, 27, 27, 0.2)' };
        } else if (daysLeft <= 7) {
            return { status: 'expiring soon', color: '#d97706', backgroundColor: 'rgba(217, 119, 6, 0.2)' };
        } else {
            return { status: 'active', color: '#047857', backgroundColor: 'rgba(4, 120, 87, 0.2)' };
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Promo Codes</h1>
                <button
                    onClick={() => setShowAddForm(true)}
                    style={styles.button}
                    onMouseOver={e => { e.target.style.backgroundColor = '#6366f1'; e.target.style.transform = 'translateY(-2px)'; }}
                    onMouseOut={e => { e.target.style.backgroundColor = '#4f46e5'; e.target.style.transform = 'translateY(0)'; }}
                >
                    <span style={styles.addIcon}>+</span> New Promo Code
                </button>
            </div>

            {/* Error message if loading completed but there was an error */}
            {error && promocodes.length > 0 && (
                <div style={styles.errorContainer}>
                    <p>{error}</p>
                </div>
            )}

            {/* Promo Code Table */}
            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead style={styles.tableHead}>
                        <tr>
                            {['Name', 'Discount (%)', 'Description', 'Policy', 'Expiry', 'Status', 'Used By', 'Actions'].map(header => (
                                <th key={header} style={styles.tableHeaderCell}>
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {promocodes.map(promo => {
                            const expiryStatus = getExpiryStatus(promo.expiry);
                            return (
                                <tr 
                                    key={promo._id} 
                                    style={{
                                        ...styles.tableRow,
                                        backgroundColor: hoveredRow === promo._id ? '#283548' : 'transparent'
                                    }}
                                    onMouseEnter={() => setHoveredRow(promo._id)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                >
                                    <td style={styles.tableCell}>
                                        <div style={{ fontWeight: '600' }}>{promo.name}</div>
                                    </td>
                                    <td style={styles.tableCell}>
                                        <div style={{ 
                                            fontWeight: '600', 
                                            color: '#a855f7'
                                        }}>
                                            {promo.discount}%
                                        </div>
                                    </td>
                                    <td style={styles.tableCell}>{promo.description}</td>
                                    <td style={styles.tableCell}>{promo.policy}</td>
                                    <td style={styles.tableCell}>
                                        {format(new Date(promo.expiry), 'MMM dd, yyyy')}
                                    </td>
                                    <td style={styles.badgeCell}>
                                        <span style={{
                                            ...styles.badge,
                                            color: expiryStatus.color,
                                            backgroundColor: expiryStatus.backgroundColor,
                                        }}>
                                            {expiryStatus.status}
                                        </span>
                                    </td>
                                    <td style={styles.tableCell}>
                                        <div style={{ 
                                            padding: '0.35rem 0.75rem',
                                            borderRadius: '9999px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            display: 'inline-block',
                                            backgroundColor: 'rgba(79, 70, 229, 0.2)',
                                            color: '#818cf8'
                                        }}>
                                            {promo.usedByUsers?.length || 0} users
                                        </div>
                                    </td>
                                    <td style={styles.tableCell}>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => handleEdit(promo)}
                                                style={{...styles.actionButton, ...styles.editButton}}
                                                onMouseOver={e => { e.target.style.backgroundColor = '#2563eb' }}
                                                onMouseOut={e => { e.target.style.backgroundColor = '#1e40af' }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(promo._id)}
                                                style={{...styles.actionButton, ...styles.deleteButton}}
                                                onMouseOver={e => { e.target.style.backgroundColor = '#b91c1c' }}
                                                onMouseOut={e => { e.target.style.backgroundColor = '#991b1b' }}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => handleAddUser(promo._id)}
                                                style={{...styles.actionButton, ...styles.addUserButton}}
                                                onMouseOver={e => { e.target.style.backgroundColor = '#047857' }}
                                                onMouseOut={e => { e.target.style.backgroundColor = '#065f46' }}
                                            >
                                                Add User
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* No results message */}
            {promocodes.length === 0 && !loading && (
                <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    backgroundColor: '#1f2937',
                    borderRadius: '0.5rem',
                    color: '#9ca3af'
                }}>
                    <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>No promo codes found</p>
                    <button
                        onClick={() => setShowAddForm(true)}
                        style={{...styles.button, margin: '0 auto'}}
                        onMouseOver={e => { e.target.style.backgroundColor = '#6366f1'; e.target.style.transform = 'translateY(-2px)'; }}
                        onMouseOut={e => { e.target.style.backgroundColor = '#4f46e5'; e.target.style.transform = 'translateY(0)'; }}
                    >
                        <span style={styles.addIcon}>+</span> Create Your First Promo Code
                    </button>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div style={styles.pagination}>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{
                            ...styles.pageButton,
                            ...(currentPage === 1 ? styles.disabledButton : {})
                        }}
                        onMouseOver={e => currentPage !== 1 && (e.target.style.backgroundColor = '#4b5563')}
                        onMouseOut={e => currentPage !== 1 && (e.target.style.backgroundColor = '#374151')}
                    >
                        ←
                    </button>

                    {[...Array(totalPages)].map((_, index) => {
                        // Show limited page buttons if too many pages
                        if (totalPages > 7) {
                            const currentPageIndex = currentPage - 1;
                            // Always show first and last page
                            if (index === 0 || index === totalPages - 1) {
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(index + 1)}
                                        style={{
                                            ...styles.pageButton,
                                            ...(currentPage === index + 1 ? styles.activePageButton : {})
                                        }}
                                        onMouseOver={e => currentPage !== index + 1 && (e.target.style.backgroundColor = '#4b5563')}
                                        onMouseOut={e => currentPage !== index + 1 && (e.target.style.backgroundColor = '#374151')}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            }
                            // Show ellipsis for skipped pages
                            if ((index === 1 && currentPageIndex > 2) || 
                                (index === totalPages - 2 && currentPageIndex < totalPages - 3)) {
                                return (
                                    <span key={index} style={{
                                        padding: '0.6rem 0.5rem',
                                        color: '#9ca3af'
                                    }}>...</span>
                                );
                            }
                            // Show pages around current page
                            if (Math.abs(currentPageIndex - index) <= 1) {
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(index + 1)}
                                        style={{
                                            ...styles.pageButton,
                                            ...(currentPage === index + 1 ? styles.activePageButton : {})
                                        }}
                                        onMouseOver={e => currentPage !== index + 1 && (e.target.style.backgroundColor = '#4b5563')}
                                        onMouseOut={e => currentPage !== index + 1 && (e.target.style.backgroundColor = '#374151')}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            }
                            return null;
                        }
                        // Show all page buttons if not too many pages
                        return (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                style={{
                                    ...styles.pageButton,
                                    ...(currentPage === index + 1 ? styles.activePageButton : {})
                                }}
                                onMouseOver={e => currentPage !== index + 1 && (e.target.style.backgroundColor = '#4b5563')}
                                onMouseOut={e => currentPage !== index + 1 && (e.target.style.backgroundColor = '#374151')}
                            >
                                {index + 1}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={{
                            ...styles.pageButton,
                            ...(currentPage === totalPages ? styles.disabledButton : {})
                        }}
                        onMouseOver={e => currentPage !== totalPages && (e.target.style.backgroundColor = '#4b5563')}
                        onMouseOut={e => currentPage !== totalPages && (e.target.style.backgroundColor = '#374151')}
                    >
                        →
                    </button>
                </div>
            )}

            {/* Add/Edit Promo Code Form Modal */}
            {showAddForm && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <h2 style={styles.modalTitle}>
                            {editingPromo ? 'Edit Promo Code' : 'Add New Promo Code'}
                        </h2>
                        <PromoCodeForm
                            promo={editingPromo}
                            onSubmit={handleFormSubmit}
                            onCancel={handleFormClose}
                        />
                    </div>
                </div>
            )}

            {/* Add User Form Modal */}
            {showUserForm && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <h2 style={styles.modalTitle}>
                            Add User to Promo Code
                        </h2>
                        <AddUserForm
                            promoCodeId={selectedPromoId}
                            onSubmit={handleUserFormSubmit}
                            onCancel={handleUserFormClose}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PromoCodeList;