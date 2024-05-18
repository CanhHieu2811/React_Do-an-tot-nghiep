import React, { useEffect, useState } from 'react';
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
  const { children, isCloseExpanded, setIsCloseExpanded, noBorder = true } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(true);
  const handleChange = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (isCloseExpanded) {
      setExpanded(false);

      setIsCloseExpanded(false);
    }
  }, [isCloseExpanded, setIsCloseExpanded]);

  return (
    <Stack>
      <Accordion sx={{ border: 'unset' }} expanded={expanded} onChange={handleChange}>
        <AccordionSummary
          style={{ backgroundColor: 'inherit' }}
          expandIcon={
            <Tooltip title={t('button.filter')}>
              <IconButton color="primary">
                <Iconify icon="ic:round-filter-list" />
              </IconButton>
            </Tooltip>
          }
          aria-controls="panel-filter"
          id="panel-filter"
        />
        <AccordionDetails
          sx={{
            border: noBorder ? 'unset' : `1px solid ${theme.palette.grey[400]}`,
          }}
          style={{ padding: '12px 16px 20px 16px' }}
        >
          {children}
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}
FilterDataTable.propTypes = {
  children: PropTypes.node,
  isCloseExpanded: PropTypes.bool,
  setIsCloseExpanded: PropTypes.func,
  noBorder: PropTypes.bool,
};
