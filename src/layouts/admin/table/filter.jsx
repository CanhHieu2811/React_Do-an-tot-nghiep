import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import {
  Stack,
  Tooltip,
  useTheme,
  Accordion,
  IconButton,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';

import Iconify from 'src/components/iconify';

export default function FilterDataTable(props) {
  const { children } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Stack mt={1}>
      <Accordion sx={{ border: 'unset' }}>
        <AccordionSummary
          style={{ backgroundColor: 'inherit' }}
          expandIcon={
            <Tooltip title={t('button.filter')}>
              <IconButton color="success">
                <Iconify icon="ic:round-filter-list" />
              </IconButton>
            </Tooltip>
          }
          aria-controls="panel-filter"
          id="panel-filter"
        />
        <AccordionDetails sx={{ border: `1px solid ${theme.palette.grey[400]}` }}>
          {children}
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}
FilterDataTable.propTypes = {
  children: PropTypes.node,
};
