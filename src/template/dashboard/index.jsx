import Slider from 'react-slick';
import PropTypes from 'prop-types';
import 'slick-carousel/slick/slick.css';
import GoogleMapReact from 'google-map-react';
import 'slick-carousel/slick/slick-theme.css';
import React, { useRef, useState } from 'react';

export default function DashboardTemplates(props) {
  const {
    handleApiLoaded,
    AnyReactComponent,
  } = props;

  const sliderRef = useRef(null);

  const goToSlide = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  const [defaultProps,] = useState({
    center: {
      lat: 16.463713,
      lng: 107.590866,
    },
    zoom: 11,
  });

  const settings = {
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    // Important! Always set the container height explicitly
    <>
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBKhPV1r6BbCxwOQV2PAxhmy0u4G2-lhYQ' }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          <AnyReactComponent lat={16.47553128402345} lng={107.55938016862828} text="My Home" />
        </GoogleMapReact>
      </div>

      {/* view hướng dẫn sử dụng  */}
      <Slider {...settings} ref={sliderRef}>
        <div>
          <img src="/dist/assets/images/dashboard/mokhoa.png" alt="Mở khóa" />
          <button 
            onClick={() => goToSlide(0)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') goToSlide(0); }}
            className="slider-button"
            type="button"
          >
            Mở khóa
          </button>
          <p>Chạm vào nút Mở khóa và quét mã QR trên xe đạp/khóa xe để tự động mở khóa.</p>
        </div>
        <div>
          <img src="/image/use-2.png" alt="Đi xe" />
          <button 
            onClick={() => goToSlide(1)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') goToSlide(1); }}
            className="slider-button"
            type="button"
          >
            Đi xe
          </button>
          <p>Tận hưởng chuyến đi, nên đội mũ bảo hiểm và tuân thủ luật giao thông. Trong quá trình sử dụng bạn có thể khóa xe tạm thời và mở lại bất kì lúc nào bằng ứng dụng di động.</p>
        </div>
        <div>
          <img src="/image/use-3.png" alt="Trả xe" />
          <button 
            onClick={() => goToSlide(2)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') goToSlide(2); }}
            className="slider-button"
            type="button"
          >
            Trả xe
          </button>
          <p>Trả xe đạp về trạm TNGo bất kỳ. Thực hiện đóng khóa xe và xác nhận kết thúc chuyến đi trên ứng dụng TNGo.</p>
        </div>
      </Slider>
    </>
  );
}

DashboardTemplates.propTypes = {
  handleApiLoaded: PropTypes.func,
  AnyReactComponent: PropTypes.element,
};
