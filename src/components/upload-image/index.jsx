/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import { Grid, Button, Tooltip, Box, Avatar } from '@mui/material';
import 'react-medium-image-zoom/dist/styles.css';
import Zoom from 'react-medium-image-zoom';
import { useTheme } from '@emotion/react';
import Iconify from '../iconify';

export default function UploadImages({
  imageUrl,
  setImageUrl,
  setFile,
  minHeight = 200, // Tăng chiều cao tối thiểu
  width = '100%',
  maxHeight = 200, // Tăng chiều cao tối đa
  maxWidth = 300,  // Tăng chiều rộng tối đa
  setIsUpload,
  circles = false,
  btnRemove = false,
  btnUpload = true,
}) {
  const theme = useTheme();

  const handleUploadClick = (event) => {
    setImageUrl(URL.createObjectURL(event.target.files[0]));

    if (setFile) {
      setFile(event.target.files[0]);
    }

    if (setIsUpload) {
      setIsUpload(true);
    }
    console.log(URL.createObjectURL(event.target.files[0]));
  };

  const handleDelete = () => {
    setImageUrl('');
    if (setFile) {
      setFile(null);
    }

    setIsUpload(true);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item sx={{ position: 'relative' }}>
        <Zoom>
          <Avatar
            src={imageUrl}
            srcSet={imageUrl ?? '/assets/default.png'}
            sx={{
              width,
              height: '100%',
              margin: 'auto',
              maxWidth,
              maxHeight,
              minWidth: 200, // Tăng chiều rộng tối thiểu
              minHeight,
              border: `1px solid ${theme.palette.grey[400]}`,
              borderRadius: circles ? '50%' : '8px',
            }}
            variant={circles ? 'circular' : 'rounded'}
          />
        </Zoom>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 99,
            cursor: 'pointer',
            display: imageUrl && btnRemove ? 'block' : 'none',
          }}
          color="red"
          onClick={handleDelete}
        >
          <Tooltip title="Xóa">
            <Iconify icon="eva:trash-2-outline" />
          </Tooltip>
        </Box>
      </Grid>
      <label style={{ display: btnUpload ? 'block' : 'none' }}>
        <Tooltip title="Tải ảnh">
          <Button variant="text" component="span" size="small">
            <Iconify icon="eva:camera-outline" />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleUploadClick}
            />
          </Button>
        </Tooltip>
      </label>
    </Grid>
  );
}

UploadImages.propTypes = {
  imageUrl: PropTypes.string,
  setImageUrl: PropTypes.func,
  setFile: PropTypes.func,
  minHeight: PropTypes.number,
  width: PropTypes.string,
  maxHeight: PropTypes.number,
  maxWidth: PropTypes.number,
  setIsUpload: PropTypes.func,
  circles: PropTypes.bool,
  btnRemove: PropTypes.bool,
  btnUpload: PropTypes.bool,
};
