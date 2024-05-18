import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

export default function ErrorTextComponent(props) {
  const {
    errors,
    touched,
    field,
    children,
    direction = 'column',
    index,
    fieldChildren,
    fieldArray,
  } = props;
  const { t } = useTranslation();
  return (
    <Box sx={{ display: 'flex', flexDirection: direction, width: '100%' }}>
      {children}
      {!index || !fieldChildren
        ? errors[field] &&
          touched[field] && (
            <Typography
              variant="caption"
              color="error"
              sx={{ textAlign: 'left', margin: '0 !important' }}
            >
              {t(`field.${field}`)} {errors[field]}
            </Typography>
          )
        : errors?.[fieldArray]?.[index]?.[fieldChildren] &&
          touched[field] && (
            <Typography
              variant="caption"
              color="error"
              sx={{ textAlign: 'left', margin: '0 !important' }}
            >
              {t(`field.${fieldChildren}`)} {errors[fieldArray][index][fieldChildren]}
            </Typography>
          )}
    </Box>
  );
}
ErrorTextComponent.propTypes = {
  errors: PropTypes.object,
  touched: PropTypes.object,
  field: PropTypes.string,
  children: PropTypes.node,
  direction: PropTypes.string,
  fieldChildren: PropTypes.string,
  index: PropTypes.string,
  fieldArray: PropTypes.string,
};
