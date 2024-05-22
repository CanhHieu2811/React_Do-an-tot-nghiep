/* eslint-disable no-shadow */
import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Typography from './typography';

const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '70vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 150,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const images = [
  {
    url: 'public/assets/images/products/Mo_khoa.png',
    title: 'Mở khóa',
    width: '35%',
    description: 'Nếu bạn muốn mở khóa, hãy theo các bước sau:\nB1: Đăng nhập vào ứng dụng (Đăng kí nếu bạn chưa có tài khoản)\nB2: Nạp tiền nếu như bạn không đủ để thuê xe, xác nhận số tiền muốn nạp thông qua MoMo hoặc ngân hàng\nB3: Chọn xe hoặc vé bạn đã đặt từ trước để quét QR(hoặc nhập path QR)\nB4: Từ lúc này trên ứng dụng đã hiển thị thông tin chi tiết về xe bạn muốn thuê cũng như giá tiền yêu cầu, hãy nhấn "Mở khóa" để trải nghiệm nhé!!',
  },
  {
    url: 'public/assets/images/products/Trai-nghiem.png',
    title: 'Trải nghiệm',
    width: '30%',
    description: 'Bạn hãy trải nghiệm nó, tận hưởng chuyến đi bạn sẽ thích điều này đấy. Nên đội mũ bảo hiểm và tuân thủ luật giao thông, trong quá trình sử dụng bạn có thể "Khóa xe tạm thời" và mở lại bất cứ lúc nào trong ứng dụng.',
  },
  {
    url: 'public/assets/images/products/Tra-xe.png',
    title: 'Trả xe',
    width: '35%',
    description: '\nKhi bạn đã trả nghiệm xong dịch vụ của chúng tôi, bạn có thể nhấn trả xe ở ngay tại màn hình thuê xe của bạn tại ứng dụng và nhấn vào nút "Trả xe" khi bạn đã đổ xe tại trạm. Bạn đã thành công trả được xe sau khi trải nghiệm dịch vụ của chúng tôi, khi bạn trả xe xong hãy gửi cho chúng tôi về cảm nhận của bạn khi sử dụng dịch vụ nhé, đó là điều vinh dự của chúng tôi khi được phục vụ bạn ♥',
  },
];

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'black',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};

export default function CacBuocTienHanh() {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClickOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <Container component="section" sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" marked="center" align="center" component="h2">
          Hướng dẫn về trải nghiệm ứng dụng
        </Typography>
        <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
          {images.map((img) => (
            <ImageIconButton
              key={img.title}
              style={{
                width: img.width,
              }}
              onClick={() => handleClickOpen(img)}
            >
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 40%',
                  backgroundImage: `url(${img.url})`,
                }}
              />
              <ImageBackdrop className="imageBackdrop" />
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'common.white',
                }}
              >
                <Typography component="h3" variant="h6" color="inherit" className="imageTitle">
                  {img.title}
                  <div className="imageMarked" />
                </Typography>
              </Box>
            </ImageIconButton>
          ))}
        </Box>
      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedItem?.title}</DialogTitle>
        <DialogContent>
          <img src={selectedItem?.url} alt={selectedItem?.title} style={{ width: '100%' }} />
          <DialogContentText sx={{ whiteSpace: 'pre-wrap' }}>
            {selectedItem?.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Box component="section" sx={{ display: 'flex', bgcolor: '#74992e', overflow: 'hidden' }}>
        <Container
          sx={{
            mt: 10,
            mb: 15,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src="/static/themes/onepirate/productCurvyLines.png"
            alt="curvy lines"
            sx={{
              pointerEvents: 'none',
              position: 'absolute',
              top: -180,
              opacity: 0.7,
            }}
          />
          <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
            Các thông tin cụ thể về chúng tôi
          </Typography>
          <div>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <Box sx={item}>
                  <Box sx={number}>1.</Box>
                  <Box
                    component="img"
                    src="/static/themes/onepirate/productHowItWorks1.svg"
                    alt="suitcase"
                    sx={image}
                  />
                  <Typography variant="h5" align="center">
                    Chúng tôi mở cừa từ 5:00 - 22:00.
                    {'\n'}
                    -Tuy đóng cửa nhưng các bạn có thể trả xe bất cứ thời điểm nào các bạn muốn-
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={item}>
                  <Box sx={number}>2.</Box>
                  <Box
                    component="img"
                    src="/static/themes/onepirate/productHowItWorks2.svg"
                    alt="graph"
                    sx={image}
                  />
                  <Typography variant="h5" align="center">
                    Bạn sẽ được rất nhiều ưu đãi từ phía chúng tôi khi bản trải nghiệm xe, khuyến mãi hay bất cứ thứ gì kiến các bạn thoải mái nhất
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={item}>
                  <Box sx={number}>3.</Box>
                  <Box
                    component="img"
                    src="/static/themes/onepirate/productHowItWorks3.svg"
                    alt="clock"
                    sx={image}
                  />
                  <Typography variant="h5" align="center">
                    Hãy để chúng tôi giúp bạn biến ngày hôm nay trở nên trọn vẹn ♥.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </div>
          <Button
            color="success"
            size="large"
            variant="contained"
            component="a"
            href="http://localhost:3030/dang-ky"
            sx={{ mt: 8 }}
          >
            Get started
          </Button>
          <Typography variant="h5" align="center">
            Vào ứng dụng của chúng tôi và trải nghiệm thôi nào
          </Typography>
        </Container>
      </Box>
    </>
  );
}
