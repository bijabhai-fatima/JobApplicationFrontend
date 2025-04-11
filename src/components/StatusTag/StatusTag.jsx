import React from 'react';
import './StatusTag.css';  

const statusStyles = {
  applied: {
    backgroundColor: '#6a0dad',
    color: '#fff',
  },
  offer: {
    backgroundColor: '#00c96f',
    color: '#fff',
  },
  rejected: {
    backgroundColor: '#fb5757',
    color: '#fff',
  },
  interview: {
    backgroundColor: '#ffd966',
    color: '#222',
  },
  all: {
    backgroundColor: '#fff3f3',
    color: '#000',
    border: '1px solid #9565e3'
  }
};

const StatusTag = ({ status, handleClick }) => { 
  const style = statusStyles[status.toLowerCase()] || {};
  return (
    <div className="status-tag" style={style} onClick={handleClick}>
      {status}
    </div>
  );
};

export default StatusTag;
