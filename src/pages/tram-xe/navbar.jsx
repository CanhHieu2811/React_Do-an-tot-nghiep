import React from 'react';
import PropTypes from 'prop-types';

// Trong Navbar
const Navbar = ({ stations, onStationClick }) => (
    <div style={{ marginTop: '100px' }}>
      <h2>Danh sách Trạm xe</h2>
      <ul>
        {stations.map((station) => (
          <button
            key={station.id}
            type="button"
            onClick={() => onStationClick(station)}
            style={{
                display: 'block',
                width: '100%',
                padding: '10px',
                marginBottom: '5px',
                textAlign: 'left',
                backgroundColor: '#f0f0f0', // Màu nền của button
                border: 'none',
                borderRadius: '5px',
              }}
          >
            {station.stationName} - {station.locationName}
          </button>
        ))}
      </ul>
    </div>
  );
  

Navbar.propTypes = {
  stations: PropTypes.array.isRequired,
  onStationClick: PropTypes.func.isRequired,
};

export default Navbar;
