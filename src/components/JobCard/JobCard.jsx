import React from 'react';
import './JobCard.css';
import StatusTag from '../StatusTag/StatusTag';

const JobCard = ({ role, company, status, link, appliedDate, index }) => {
  const isEven = index % 2 === 0;
  return (
    <div class={isEven?'job-card-primary':'job-card-secondary'}>
      <div class="card-header">
        <h2>{role}</h2>
        <StatusTag status={status}/>
      </div>
      <p class="company-name"><em>{company}</em></p>
      <div class='card-bottom'>
      <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
      <div class={isEven?'date-primary':'date-secondary'}>{new Date(appliedDate).toLocaleDateString('en-GB')}</div>
      </div>
    </div>
  );
};

export default JobCard;
