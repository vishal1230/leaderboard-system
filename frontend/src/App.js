import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css';

import UserSelector from './components/UserSelector';
import ClaimButton from './components/ClaimButton';
import Leaderboard from './components/Leaderboard';
import AddUser from './components/AddUser';
import History from './components/History';
import { getAllUsers } from './services/api';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response.data);
      if (response.data.length > 0 && !selectedUser) {
        setSelectedUser(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handlePointsClaimed = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🏆 Leaderboard System</h1>
          <p>Claim points and climb the ranks!</p>
        </div>
      </header>

      <main className="app-main">
        <div className="controls-section">
          <div className="user-controls">
            <UserSelector 
              users={users} 
              selectedUser={selectedUser} 
              onUserSelect={setSelectedUser} 
            />
            <ClaimButton 
              selectedUser={selectedUser} 
              onPointsClaimed={handlePointsClaimed} 
            />
          </div>
          <AddUser onUserAdded={handleUserAdded} />
        </div>

        <div className="content-grid">
          <div className="leaderboard-section">
            <Leaderboard users={users} />
          </div>
          <div className="history-section">
            <History refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
