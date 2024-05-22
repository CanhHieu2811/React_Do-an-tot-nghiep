import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { STATIONALL } from 'src/api/master-data';
import { VITE_REACT_APP_API_MASTER_DATA, STATUS_200 } from 'src/utils/constant';
import { authGetData } from 'src/utils/request';
import DanhSachTramXeTemplates from 'src/template/tram-xe';


const AnyReactComponent = ({ text }) => <div>{text}</div>;
AnyReactComponent.propTypes = {
  text: PropTypes.string,
};

// Define your handleApiLoaded function
const handleApiLoaded = (map, maps) => {
  // Do something with map and maps
  console.log('Map loaded!', map, maps);
};

export default function DanhSachTramXePages() {
  const [rows, setRows] = useState([]); // Total data
  const [conditionsData] = useState({}); // Add conditionsData state if needed
  const [selectedStation, setSelectedStation] = useState(null);

  const fetchData = useCallback((conditions) => {
    // Fetch data from API
    authGetData({
      url: VITE_REACT_APP_API_MASTER_DATA + STATIONALL,
      onSuccess: (res) => {
        console.log('API Response:', res);
        if (res && res.statusCode === STATUS_200) {
          setRows(res.data);
        }
      },
    });
  }, []);

  useEffect(() => {
    fetchData(conditionsData);
  }, [conditionsData, fetchData]);

  const handleMarkerClick = (station) => {
    setSelectedStation(station);
  };

  const handleListItemClick = (station) => {
    setSelectedStation(station);
  };

  const handleStationClick = (station) => {
    setSelectedStation(station);
  }
  const handleCloseInfo = () => {
    setSelectedStation(null);
  };

  console.log('API Response:', rows);
  return (
    <DanhSachTramXeTemplates
    handleApiLoaded={handleApiLoaded}
    AnyReactComponent={AnyReactComponent}
    rows={rows}
    stations={rows}
    selectedStation={selectedStation}
    onMarkerClick={handleMarkerClick}
    onCloseInfo={handleCloseInfo}
    onListItemClick={handleListItemClick}
    handleStationClick={handleStationClick}
  />
  );
  
}
