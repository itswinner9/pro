import React from 'react';

const ServiceCard = ({ title, description, image }) => {
    return (
        <div className="service-card">
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <p>{description}</p>
            <button>Learn More</button>
        </div>
    );
};

export default ServiceCard;