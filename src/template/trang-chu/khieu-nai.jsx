import * as React from 'react';
import { Button, Box, TextField, Container, Grid, Snackbar } from '@mui/material';
import Typography from './typography';

function CauHoi() {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="section" sx={{ mt: 10, display: 'flex' }}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              bgcolor: '#74992e',
              py: 8,
              px: 3,
            }}
          >
            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500 }}>
              <Typography variant="h2" component="h2" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="h5">
                Gửi cho chúng tôi về cảm nhận của bạn
              </Typography>
              <TextField
                placeholder="Your email"
                variant="standard"
                sx={{ width: '100%', mt: 3, mb: 2 }}
              />
              <Button type="submit" color="primary" variant="contained" sx={{ width: '100%' }}>
                Keep me updated
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: 'block', xs: 'none' }, position: 'relative' }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: '100%',
              background: 'url(/static/themes/onepirate/productCTAImageDots.png)',
            }}
          />
          <Box
            component="img"
            src="public/assets/images/products/pexels-cristiana-raluca-213635-686230.jpg"
            alt="call to action"
            sx={{
              position: 'absolute',
              top: -28,
              left: -28,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: 600,
            }}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        closeFunc={handleClose}
        message="We will send you our best offers, once a week."
      />
    </Container>
  );
}

export default CauHoi;
