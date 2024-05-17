import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Stack, Typography } from '@mui/material';

export default function ErrorTextComponent(props) {
  const { errors, touched, field, children, direction = "column" } = props;
  const { t } = useTranslation();
  return (
    <Stack direction={direction} spacing={2}>
      {children}
      {errors[field] && touched[field] && (
        <Typography
          variant="caption"
          color="error"
          sx={{ textAlign: 'left', margin: '0 !important' }}
        >
          {t(`field.${field}`)} {errors[field]}
        </Typography>
      )}
    </Stack>
  );
}
ErrorTextComponent.propTypes = {
  errors: PropTypes.object,
  touched: PropTypes.object,
  field: PropTypes.string,
  children: PropTypes.node,
  direction: PropTypes.string
};
