import React from 'react';
import '../Styles/styles1.css';

const ConfirmationPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>Are you sure you want to Logout?</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;