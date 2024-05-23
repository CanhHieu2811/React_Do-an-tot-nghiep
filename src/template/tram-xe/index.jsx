import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Toolbar, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import HeaderTrangChu from 'src/template/trang-chu/header';
import Navbar from 'src/pages/tram-xe/navbar';

const Marker = ({ text, onClick }) => (
  <div
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
    style={{ color: 'red', cursor: 'pointer' }}

  >
    {text}
  </div>
);

Marker.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

const InfoWindow = ({ station, onClose }) => (
  <div style={{ 
    position: 'absolute',
    transform: 'translate(-50%, -100%)',
    background: 'white',
    padding: 20, 
    borderRadius: 10,
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)', 
    minWidth: 200, 
    maxWidth: 300, 
    }}>
    <h4>{station.stationName}</h4>
    <p>Tên Trạm: {station.locationName}</p>
    <p>Kinh độ: {station.longitude}</p>
    <p>Vĩ độ {station.latitude}</p>
    <p>Trạng thái: {station.statusName}</p>
    <p>Xe đang sử dụng: {station.activeBikeCount}</p>
    <p>Số xe còn trống: {station.inactiveBikeCount}</p>
    <button type="button" onClick={onClose}>Close</button>
  </div>
);

InfoWindow.propTypes = {
  station: PropTypes.object,
  onClose: PropTypes.func,
};

const handleApiLoaded = (map, maps) => {
  console.log('Map loaded!', map, maps);
};

export default function DanhSachTramXeTemplates({ stations, selectedStation, onMarkerClick, onCloseInfo, handleListItemClick, rows, handleStationClick }) {
  const defaultProps = {
    center: {
      lat: 16.463713,
      lng: 107.590866,
    },
    zoom: 15,
  };

  return (
    <Grid container spacing={2}>
    <Grid item xs={12} md={3} style={{ position: 'relative', zIndex: 1000}}>
    <Navbar stations={stations} onStationClick={handleStationClick} />
    </Grid>
      <Grid item xs={12} md={9}>
        <Toolbar id="back-to-top-anchor" sx={{ position: 'absolute' }} />
        <HeaderTrangChu />
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBKhPV1r6BbCxwOQV2PAxhmy0u4G2-lhYQ' }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            {stations.map((station) => (
              <Marker
                key={station.id}
                lat={station.latitude}
                lng={station.longitude}
                text={<img src="public/assets/images/location_4676457.png" alt="Location Icon" />} // Icon marker
                onClick={() => onMarkerClick(station)}
              />
            ))}
            {selectedStation && (
              <InfoWindow
                station={selectedStation}
                lat={selectedStation.latitude}
                lng={selectedStation.longitude}
                onClose={onCloseInfo}
              />
            )}
          </GoogleMapReact>
        </div>
      </Grid>
    </Grid>
  );
}

DanhSachTramXeTemplates.propTypes = {
  stations: PropTypes.array.isRequired,
  selectedStation: PropTypes.object,
  onMarkerClick: PropTypes.func.isRequired,
  onCloseInfo: PropTypes.func.isRequired,
  handleListItemClick: PropTypes.any,
  rows: PropTypes.any,
  handleStationClick: PropTypes.func, // Thêm PropTypes cho handleStationClick
};