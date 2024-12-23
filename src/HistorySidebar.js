import React from 'react';

const HistorySidebar = ({ history }) => {
  return (
    <div className="history-sidebar">
      <h3>History</h3>
      <ul>
        {history.map((url, index) => (
          <li key={index}>{url}</li>
        ))}
      </ul>
    </div>
  );
};

export default HistorySidebar; 