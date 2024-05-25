import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from './typography';

function Copyright() {
  return (
    <>
      {'© '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
    </>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#74992e',
  mr: 1,
  '&:hover': {
    bgcolor: '#74992e',
  },
};

const LANGUAGES = [
  {
    code: 'en-US',
    name: 'English',
  },
  {
    code: 'fr-FR',
    name: 'Français',
  },
];

export default function AppFooter() {
  return (
    <Typography component="footer" sx={{ display: 'flex', bgcolor: '#74992e', marginTop: -50, position: 'relative' }}>
      <Container sx={{ my: 8, display: 'flex' }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
              sx={{ height: 120 }}
            >
              <Grid item sx={{ display: 'flex' }}>
                <Box component="a" href="https://www.facebook.com/emperor0409" sx={iconStyle}>
                  <img src="public/assets/images/products/2023_Facebook_icon.svg.webp" alt="Facebook" />
                </Box>
                <Box component="a" href="https://www.instagram.com/cristiano/" sx={iconStyle}>
                  <img src="public/assets/images/Instagram_icon.png.webp" alt="Instagram" />
                </Box>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Typography variant="h6" marked="left" gutterBottom>
              Liên hệ
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="https://www.facebook.com/emperor0409">Fb: Nguyễn Văn Hùng</Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="">SDT: 0835462017</Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="">Email:npchieu281102@gmail.com</Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={8} md={4}>
            <Typography variant="h6" marked="left" gutterBottom>
              Language
            </Typography>
            <TextField
              select
              size="medium"
              variant="standard"
              SelectProps={{
                native: true,
              }}
              sx={{ mt: 1, width: 150 }}
            >
              {LANGUAGES.map((language) => (
                <option value={language.code} key={language.code}>
                  {language.name}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} sm={8} md={6}>
            <Typography variant="caption">
              {'Icons made by '}
              <Link href="https://www.freepik.com" rel="sponsored" title="Freepik">
                Freepik
              </Link>
              {' from '}
              <Link href="https://www.flaticon.com" rel="sponsored" title="Flaticon">
                www.flaticon.com
              </Link>
              {' is licensed by '}
              <Link
                href="https://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC 3.0 BY
              </Link>
            </Typography>
          </Grid>
          <Grid xs={6} sm={8} md={6}>
          <Typography variant="h6" marked="left" gutterBottom>
              Liên kết nhanh
            </Typography>
            <Grid xs={6} sm={8} md={6}>
            <Link href="http://localhost:3030/tin-tuc-su-kien" rel="sponsored">
                Tin tức sự kiện
            </Link>
            </Grid>
            <Grid xs={6} sm={8} md={6}>
            <Link href="http://localhost:3030/danh-sach-tram-xe" rel="sponsored">
                Trạm xe
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
