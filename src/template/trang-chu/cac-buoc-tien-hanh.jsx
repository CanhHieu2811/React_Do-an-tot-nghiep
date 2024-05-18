import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
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
    title: 'Snorkeling',
    width: '40%',
  },
  {
    url: 'https://images.unsplash.com/photo-1531299204812-e6d44d9a185c?auto=format&fit=crop&w=400',
    title: 'Massage',
    width: '20%',
  },
  {
    url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400',
    title: 'Hiking',
    width: '40%',
  },
  {
    url: 'https://images.unsplash.com/photo-1453747063559-36695c8771bd?auto=format&fit=crop&w=400',
    title: 'Tour',
    width: '38%',
  },
  {
    url: 'https://images.unsplash.com/photo-1523309996740-d5315f9cc28b?auto=format&fit=crop&w=400',
    title: 'Gastronomy',
    width: '38%',
  },
  {
    url: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=400',
    title: 'Shopping',
    width: '24%',
  },
  {
    url: 'https://images.unsplash.com/photo-1506941433945-99a2aa4bd50a?auto=format&fit=crop&w=400',
    title: 'Walking',
    width: '40%',
  },
  {
    url: 'https://images.unsplash.com/photo-1533727937480-da3a97967e95?auto=format&fit=crop&w=400',
    title: 'Fitness',
    width: '20%',
  },
  {
    url: 'https://images.unsplash.com/photo-1518136247453-74e7b5265980?auto=format&fit=crop&w=400',
    title: 'Reading',
    width: '40%',
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
  color: 'secondary.main',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};

export default function CacBuocTienHanh() {
  return (
    <>
      <Container component="section" sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" marked="center" align="center" component="h2">
          For all tastes and all desires
        </Typography>
        <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
          {images.map((img) => (
            <ImageIconButton
              key={img.title}
              style={{
                width: img.width,
              }}
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
      <Box
        component="section"
        sx={{ display: 'flex', bgcolor: 'secondary.light', overflow: 'hidden' }}
      >
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
            How it works
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
                    Appointment every Wednesday 9am.
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
                    First come, first served. Our offers are in limited quantities, so be quick.
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
                    {'New offers every week. New experiences, new surprises. '}
                    Your Sundays will no longer be alike.
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
            href="/premium-themes/onepirate/sign-up/"
            sx={{ mt: 8 }}
          >
            Get started
          </Button>
        </Container>
      </Box>
    </>
  );
}
