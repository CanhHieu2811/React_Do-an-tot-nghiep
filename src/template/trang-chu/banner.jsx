/* eslint-disable react/prop-types */
  import * as React from 'react';
  import PropTypes from 'prop-types';
  import Button from './button';
  import Typography from './typography';
  import ProductHeroLayout from './product-hero-layout';

  export default function Banner({ bannerData}) {
    console.log('Props in Banner:', bannerData);
    // eslint-disable-next-line react/prop-types
    console.log('BannerImage', bannerData.bannerData.image)
    return (
      <ProductHeroLayout
        sxBackground={{
          backgroundImage: `url(${bannerData.bannerData.image})`,
          backgroundColor: '#7fc7d9', // Màu sắc trung bình của hình nền.
          backgroundPosition: 'center',
        width: '100%', // Chiếm toàn bộ chiều rộng của cửa sổ.
        }}
      >
        {/* Tăng ưu tiên tải hình nền. */}
        <img style={{ display: 'none' }} src={bannerData.image} alt="increase priority" />
        <Typography color="inherit" align="center" variant="h2" marked="center">
          {bannerData.bannerData.tilte}
        </Typography>
        <Typography color="inherit" align="center" variant="h5" sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}>
          Ở đây sẽ giúp bạn biến hôm nay thành một ngày hoàn hảo!!!
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          component="a"
          href="http://localhost:3030/dang-ky"
          sx={{ minWidth: 200 }}
        >
          Register
        </Button>
        <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
          Discover the experience
        </Typography>
      </ProductHeroLayout>
    );
  }

  Banner.propTypes = {
    bannerData: PropTypes.shape({
      tilte: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired,
  };
