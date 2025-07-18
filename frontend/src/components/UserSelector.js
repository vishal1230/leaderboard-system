import React from 'react';

const UserSelector = ({ users, selectedUser, onUserSelect }) => {
  const handleUserChange = (event) => {
    const userId = event.target.value;
    const user = users.find(u => u._id === userId);
    onUserSelect(user);
  };

  return (
    <div className="user-selector">
      <label htmlFor="user-select">Select User:</label>
      <select
        id="user-select"
        value={selectedUser?._id || ''}
        onChange={handleUserChange}
        className="user-select"
      >
        <option value="">Choose a user...</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>
            {user.name} ({user.totalPoints} points)
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelector;
