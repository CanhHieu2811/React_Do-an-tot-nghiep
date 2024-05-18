// import { useState } from 'react';
import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';

import { Grid, Button, Tooltip, Box, Stack, Typography } from '@mui/material';
import 'react-medium-image-zoom/dist/styles.css';
// import Zoom from 'react-medium-image-zoom';
import { useEffect, useState } from 'react';



import ImageIcon from '@mui/icons-material/Image';
import Iconify from '../iconify';

export default function UploadFiles({
  onChange,
  // value,
  fileDefault,
  // setFile,
  // minHeight = 150,
  // width = '100%',
  // maxHeight = 150,
  // maxWidth = 150,
  // setIsUpload,
  // circles = false,
  btnRemove = false,
  // btnUpload = true,
  isDisplay = true,
  accept,
  setError,
  getBase64File,
  isSave,
  setIsSave,
  setIsUpload,
  disabled = false
}) {
  const [defaultFile, setDefaultFile] = useState(fileDefault);
  // const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [noti, setNoti] = useState('');
  const handleUploadClick = (event) => {
    let upload = true;
    if (accept) {
      const arrayFileAccept = accept.split(',');
      const fileType = event.target.files[0]?.name.split(".")
      const filter = arrayFileAccept.filter((el) => el === `.${fileType[fileType.length - 1]}`);
      if (filter.length) {
        upload = true;
        setNoti('');
      } else {
        upload = false;
        setNoti('Tệp tải lên không đúng định dạng');
      }
    }
    
    if (upload) {
      if (event.target.files[0]?.size > 10000000) {
        setNoti('Tệp tải lên vượt quá 10MB');
        if (setError) setError(true);
      } else {
        setFile(event.target.files[0]);
        getBase64(event.target.files[0], (result) => {
          if (getBase64File) getBase64File(`${event.target.files[0].name};${result}`);
        });
        setDefaultFile(null);
        setNoti('');
      }

      if (onChange) {
        onChange(event.target.files[0]);
      }

      if (setIsUpload) {
        setIsUpload(true);
      }
    }
  };

  const getBase64 = (fileData, cb) => {
    if (fileData) {
      const reader = new FileReader();
      reader.readAsDataURL(fileData);
      reader.onload = () => {
        cb(reader.result);
      };
      console.log(reader);
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    } else cb(null);
  };

  const handleDelete = () => {
    setFile(null);

    if (onChange) {
      onChange(null);
    }
    setDefaultFile(null);

    getBase64(null, (result) => {
      if (getBase64File) getBase64File(null);
    });

    if (setIsUpload) {
      setIsUpload(true);
    }
    // if (setFile) {
    //   setFile(null);
    // }

    // setIsUpload(true);
  };

  useEffect(() => {
    if (setIsSave && isSave) {
      setFile(null);
      setIsSave(false);
    }
  }, [isSave, setIsSave]);
  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" height="100%">
      <Grid item sx={{ position: 'relative' }}>
        {isDisplay && defaultFile && (
          <Typography variant="body2">
            <a href={defaultFile} alt="" target="_blank" rel="noreferrer">
              Xem file
            </a>
          </Typography>
        )}
        {file && (
          <Stack>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              {
                // eslint-disable-next-line no-nested-ternary
                file.name.includes('.pdf') ? (
                  <img src='/assets/icons/pdf.png' width={20} height={20} alt='' />
                  // <PictureAsPdfIcon sx={{ width: 28 }} color="primary" />
                ) : // eslint-disable-next-line no-nested-ternary
                file.name.includes('.docx') || file.name.includes('.doc') ? (
                  <img src='/assets/icons/docx-file.png' width={20} height={20} alt='' />
                  // <TextSnippetIcon sx={{ width: 28 }} color="primary" />
                ) : file.name.includes('.xls') || file.name.includes('.xlt') ? (
                  <img src='/assets/icons/excel.png' width={20} height={20} alt='' />
                  // <BackupTableIcon sx={{ width: 28 }} color="primary" />
                ) : (
                  <ImageIcon sx={{ width: 28 }} color="primary" />
                )
              }
              <a href={URL.createObjectURL(file)} alt="" target="_blank" rel="noreferrer">
                {file.name}
              </a>
            </Typography>
          </Stack>
        )}

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: '-50px',
            zIndex: 99,
            cursor: 'pointer',
            display: file && btnRemove ? 'block' : 'none',
          }}
          color="red"
          onClick={handleDelete}
        >
          <Tooltip title="Xóa">
            <Iconify icon="eva:close-outline" />
          </Tooltip>
        </Box>
      </Grid>
      {
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label>
          <Tooltip title="Tải file">
            <Button variant="text" component="span" size="small">
              <Iconify icon="eva:file-text-outline" width={28} />
              <input
                accept={accept}
                style={{
                  display: 'none',
                }}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleUploadClick}
                disabled={disabled}
              />
            </Button>
          </Tooltip>
        </label>
      }

      {accept && (
        <Typography variant="body2" fontSize={12}>
          Định dạng cho phép: {accept}
          <br /> Dung lượng tối đa 10MB
        </Typography>
      )}
      {noti && (
        <Typography variant="subtitle2" fontSize={12} color="error">
          {noti}
        </Typography>
      )}
    </Grid>
  );
}
UploadFiles.propTypes = {
  btnRemove: PropTypes.bool,
  accept: PropTypes.string,
  onChange: PropTypes.func,
  fileDefault: PropTypes.any,
  isDisplay: PropTypes.bool,
  setError: PropTypes.func,
  getBase64File: PropTypes.func,
  isSave: PropTypes.bool,
  setIsSave: PropTypes.func,
  setIsUpload: PropTypes.func,
  disabled: PropTypes.bool
};
