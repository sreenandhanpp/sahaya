import React from 'react';
import PropTypes from 'prop-types';
import './Card.css'; // Import the CSS file

const AppCard = ({ children }) => {
  return (
    <div className="card">
      {children}
    </div>
  );
};

// Define prop types for the Card component
AppCard.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppCard;
