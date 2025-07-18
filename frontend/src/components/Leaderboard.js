import React from 'react';

const Leaderboard = ({ users }) => {
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  const getRankClass = (rank) => {
    switch (rank) {
      case 1: return 'rank-1';
      case 2: return 'rank-2';
      case 3: return 'rank-3';
      default: return 'rank-other';
    }
  };

  return (
    <div className="leaderboard">
      <h2>🏆 Leaderboard</h2>
      
      {users.length === 0 ? (
        <div className="empty-state">
          <p>No users found. Add some users to get started!</p>
        </div>
      ) : (
        <div className="leaderboard-list">
          {users.map((user, index) => (
            <div 
              key={user._id} 
              className={`leaderboard-item ${getRankClass(user.rank)}`}
            >
              <div className="rank">
                <span className="rank-icon">{getRankIcon(user.rank)}</span>
                <span className="rank-number">#{user.rank}</span>
              </div>
              
              <div className="user-info">
                <h3 className="user-name">{user.name}</h3>
                <div className="user-stats">
                  <span className="points">{user.totalPoints} points</span>
                </div>
              </div>

              <div className="points-display">
                <span className="points-value">{user.totalPoints}</span>
                <span className="points-label">pts</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
