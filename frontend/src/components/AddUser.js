import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createUser } from '../services/api';

const AddUser = ({ onUserAdded }) => {
  const [userName, setUserName] = useState('');
  const [adding, setAdding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userName.trim()) {
      toast.error('Please enter a user name!');
      return;
    }

    try {
      setAdding(true);
      await createUser(userName.trim());
      
      toast.success(`✅ User "${userName}" added successfully!`);
      setUserName('');
      onUserAdded();
    } catch (error) {
      if (error.response?.data?.error?.includes('already exists')) {
        toast.error('User with this name already exists!');
      } else {
        toast.error('Failed to add user. Please try again.');
      }
      console.error('Error adding user:', error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="add-user">
      <h3>➕ Add New User</h3>
      <form onSubmit={handleSubmit} className="add-user-form">
        <input
          type="text"
          placeholder="Enter user name..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="user-input"
          disabled={adding}
        />
        <button
          type="submit"
          className={`add-button ${adding ? 'adding' : ''}`}
          disabled={adding}
        >
          {adding ? 'Adding...' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
