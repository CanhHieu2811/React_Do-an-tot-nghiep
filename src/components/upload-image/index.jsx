// import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Grid, Button } from '@mui/material';

export default function UploadImages({imageUrl, setImageUrl, setFile, minHeight = 150, width = "100%" }) {
  const { t } = useTranslation();
  // const [imageUrl, setImageUrl] = useState('/assets/images/avatars/avatar_1.jpg')
  const handleUploadClick = (event) => {
    setImageUrl(URL.createObjectURL(event.target.files[0]));

    if (setFile) {
      setFile(event.target.files[0]);
    }
    console.log(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <img
          style={{
            height: '100%',
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
            width,
            minHeight
          }}
          src={imageUrl}
          alt=""
        />
      </Grid>
      <label htmlFor="contained-button-file">
        <Button variant="text" component="span" size="small">
          {t('choose_image')}
          <input
            accept="image/*"
            style={{
              display: 'none',
            }}
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleUploadClick}
          />
        </Button>
      </label>
    </Grid>
  );
}
UploadImages.propTypes = {
  imageUrl: PropTypes.string,
  setImageUrl: PropTypes.func,
  setFile: PropTypes.func,
  minHeight: PropTypes.number,
  width: PropTypes.string
};
