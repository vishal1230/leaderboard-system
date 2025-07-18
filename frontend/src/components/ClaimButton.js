import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { claimPoints } from '../services/api';

const ClaimButton = ({ selectedUser, onPointsClaimed }) => {
  const [claiming, setClaiming] = useState(false);

  const handleClaimPoints = async () => {
    if (!selectedUser) {
      toast.error('Please select a user first!');
      return;
    }

    try {
      setClaiming(true);
      const response = await claimPoints(selectedUser._id);
      
      toast.success(
        `🎉 ${response.data.user.name} claimed ${response.data.pointsAwarded} points!`,
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
      
      onPointsClaimed();
    } catch (error) {
      toast.error('Failed to claim points. Please try again.');
      console.error('Error claiming points:', error);
    } finally {
      setClaiming(false);
    }
  };

  return (
    <button
      className={`claim-button ${claiming ? 'claiming' : ''}`}
      onClick={handleClaimPoints}
      disabled={claiming || !selectedUser}
    >
      {claiming ? (
        <>
          <span className="spinner-small"></span>
          Claiming...
        </>
      ) : (
        <>
          🎯 Claim Points
        </>
      )}
    </button>
  );
};

export default ClaimButton;
