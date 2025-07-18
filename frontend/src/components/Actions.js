import React from 'react';

const Actions = ({ users, selectedUser, onSelectUser, onClaim }) => {
  return (
    <div className="actions-panel card">
      <h3>Claim Points</h3>
      <select value={selectedUser} onChange={(e) => onSelectUser(e.target.value)}>
        <option value="" disabled>-- Select a User --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
      <button onClick={onClaim} disabled={!selectedUser}>
        Claim Random Points
      </button>
    </div>
  );
};

export default Actions;