import React from 'react';
import { useNavigate } from 'react-router-dom';

const LearnCard = ({ resource }) => {
  const nav = useNavigate()
  const tags = ["Community", "Education", "Prevention"];
  return (
    <div className="resource-card">
      <img src={resource.image} alt={resource.name} className="resource-img" />
      <div className="resource-content">
        <h3>{resource.name}</h3>
        <p>{resource.description}</p>
        <div className="tags">
          {tags?.map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>
        <button onClick={()=>{
          nav('/TrainingArticlePage/'+resource.id)
        }} className="view-btn">
          {resource.type === 'video' ? 'Watch Video' : 'View Guide'}
        </button>
      </div>
    </div>
  );
};

export default LearnCard;
