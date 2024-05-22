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
import TextareaAutosize from '@mui/material/TextareaAutosize';
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
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
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
    url: 'https://images.unsplash.com/photo-1534081333815-ae5019106622?auto=format&fit=crop&w=400',
    title: 'Mở khóa',
    width: '35%',
    description: 'Hướng dẫn mở khóa',
  },
  {
    url: 'https://images.unsplash.com/photo-1531299204812-e6d44d9a185c?auto=format&fit=crop&w=400',
    title: 'Trải nghiệm',
    width: '30%',
    description: 'Hãy trải nghiệm nó',
  },
  {
    url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400',
    title: 'Trả xe',
    width: '35%',
    description: 'Hướng dẫn trả xe',
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
          <DialogContentText>
  <TextareaAutosize
    value={selectedItem?.description}
    aria-label="empty textarea"
    placeholder="Empty"
    style={{ width: '100%', minHeight: '100px', resize: 'vertical' }}
    readOnly
  />
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
            color="secondary"
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
