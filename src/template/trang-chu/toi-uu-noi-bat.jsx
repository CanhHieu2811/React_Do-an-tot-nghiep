import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from './typography';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ToiUuNoiBat() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: '#74992e' }}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        

        <Grid container spacing={5}>
          <Grid xs={12}>
          <Typography variant="h2" marked="center" align="center" component="h2">
          Giới thiệu về HUE Bike
        </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="/static/themes/onepirate/productValues2.svg"
                alt="suitcase"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Mục tiêu
              </Typography>
              <Typography variant="h5">
                Dịch vụ xe đạp công cộng HUE Bike đem đến một hình thức giao thông đô
                thị mới văn minh, tiện lợi tốt cho sức khỏe và thân thiện với môi trường
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="/static/themes/onepirate/productValues1.svg"
                alt="graph"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Thuận tiện
              </Typography>
              <Typography variant="h5">
                Chỉ 1 vài thao tác đơn giản trên ứng dụng di động, người tham gia giao
                thông có thể dễ dàng thuê xe, di chuyển và trả xe tại các trạm xe đạp 
                HUE Bike bất kì trên địa bàn thành phố.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="/static/themes/onepirate/productValues3.svg"
                alt="clock"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Xuất xứ
              </Typography>
              <Typography variant="h5">
                Đội ngũ chúng tôi xuất thân từ những người con của Huế yêu môi trường, muốn
                giữ gìn được sự trong lành của cố đô, cũng như muốn đem đến cho khách hàng
                1 chất lượng dịch vụ tốt nhất. 
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ToiUuNoiBat;
