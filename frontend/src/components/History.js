import React, { useState, useEffect } from 'react';
import { getAllHistory } from '../services/api';

const History = ({ refreshTrigger }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, [refreshTrigger]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await getAllHistory();
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="history">
        <h2>📈 Recent Activity</h2>
        <div className="loading-small">
          <div className="spinner-small"></div>
          <p>Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history">
      <h2>📈 Recent Activity</h2>
      
      {history.length === 0 ? (
        <div className="empty-state">
          <p>No activity yet. Start claiming points!</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((entry) => (
            <div key={entry._id} className="history-item">
              <div className="history-content">
                <div className="history-main">
                  <span className="user-name">{entry.userName}</span>
                  <span className="action">claimed</span>
                  <span className="points">+{entry.pointsAwarded} points</span>
                </div>
                <div className="history-time">
                  {formatDate(entry.claimedAt)}
                </div>
              </div>
              <div className="points-badge">
                +{entry.pointsAwarded}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
