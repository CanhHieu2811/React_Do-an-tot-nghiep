import PropTypes from 'prop-types';

import DanhSachTramXeTemplates from 'src/template/tram-xe';
// import { Map, GoogleApiWrapper } from 'google-maps-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
AnyReactComponent.propTypes = {
    text: PropTypes.string
}

// Define your handleApiLoaded function
const handleApiLoaded = (map, maps) => {
  // Do something with map and maps
  console.log('Map loaded!', map, maps);
};

export default function DanhSachTramXePages() {
    return (
    <DanhSachTramXeTemplates 
        handleApiLoaded = {handleApiLoaded}
        AnyReactComponent = {AnyReactComponent}
    />)
}