import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../assets/css/Deliverables.css'; 

const Deliverables = ({ projectId }) => {
  const [deliverables, setDeliverables] = useState([]);

  useEffect(() => {
    const fetchDeliverables = async () => {
      try {
        const response = await fetch(`http://localhost:4000/deliverables?projectId=${projectId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDeliverables(data);
      } catch (error) {
        //console.error('Error fetching deliverables:', error);
        setDeliverables([]);
      }
    };

    fetchDeliverables();
  }, [projectId]);

  return (
    <ul className="deliverables-list">
      {deliverables.map(deliverable => (
        <li key={deliverable.id}>
          <strong>{deliverable.name}</strong> - {deliverable.description} ({deliverable.link})
        </li>
      ))}
    </ul>
  );
};

Deliverables.propTypes = {
  projectId: PropTypes.number.isRequired,
};

export default Deliverables;
