import React from 'react';
import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, image }) => {
    return (
        <div className="service-card">
            <Image src={image} alt={title} width={400} height={300} />
            <h2>{title}</h2>
            <p>{description}</p>
            <button>Learn More</button>
        </div>
    );
};

export default ServiceCard;
