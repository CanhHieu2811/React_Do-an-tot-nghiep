import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { LoadingButton } from '@mui/lab';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Box,
  // Stack,
  // Button,
  // Accordion,
  // Typography,
  OutlinedInput,
  InputAdornment,
  // AccordionDetails,
  // AccordionSummary,
} from '@mui/material';

import { setFetchData } from 'src/redux/common';

import Iconify from 'src/components/iconify';
// import TableComponent from 'src/components/table';
// import AlertDialog from 'src/components/dialog-confirm';

import TabsComponent from 'src/components/tabs';

// import LayoutPopup from '../popup';
import FilterDataTable from './filter';

export default function TabsLayoutAdmin({
  tabs,
  valueTab,
  handleChangeTab,
  title,
  renderButton,
  accordionTitle,
  renderFilter,
  handleSearch,
  setValueSearch,
  valueSearch,
  handleButton,
  textBtn,
  renderTable,
}) {
  const { t } = useTranslation();
  // show popup in store
  // const showPopup = useSelector((state) => state.common.isPopup);
  const dispatch = useDispatch();
  // set value change
  const onChangeValue = useCallback(
    (e) => {
      setValueSearch(e.target.value);
    },
    [setValueSearch]
  );
  // clear value
  const handleClear = useCallback(() => {
    setValueSearch('');
    dispatch(setFetchData(true));
  }, [dispatch, setValueSearch]);
  return (
    <Box>
      {/* <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">{title}</Typography>
        {renderButton && (
          <Button
            variant="contained"
            color="warning"
            size="small"
            // startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleButton}
          >
            {textBtn || t('button.create')}
          </Button>
        )}
      </Stack> */}

      <FilterDataTable>
        {renderFilter || (
          <Box sx={{ textAlign: 'right' }}>
            <OutlinedInput
              value={valueSearch}
              onChange={onChangeValue}
              placeholder={t('placeholder.search')}
              sx={{ marginRight: 2 }}
              size="small"
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
            />
            <LoadingButton
              //   fullWidth
              size="small"
              variant="text"
              color="inherit"
              onClick={handleClear}
              sx={{ marginRight: 1 }}
            >
              {t('button.clear')}
            </LoadingButton>
            <LoadingButton
              //   fullWidth
              size="small"
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSearch}
              disabled={valueSearch === ''}
            >
              {t('button.search')}
            </LoadingButton>
          </Box>
        )}
      </FilterDataTable>
      <TabsComponent tabs={tabs} handleChangeTab={handleChangeTab} value={valueTab}>
            {renderTable? renderTable() : null}
          </TabsComponent>
      {/* <Accordion defaultExpanded sx={{ marginTop: '0 !important' }}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel-table"
          id="panel-table"
        >
          <Typography variant="subtitle2">
            {accordionTitle || t('accordion.title_table')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TabsComponent tabs={tabs} handleChangeTab={handleChangeTab} value={valueTab}>
            {renderTable()}
          </TabsComponent>
        </AccordionDetails>
      </Accordion> */}
    </Box>
  );
}

TabsLayoutAdmin.propTypes = {
  tabs: PropTypes.array,
  valueTab: PropTypes.string,
  handleChangeTab: PropTypes.func,
  title: PropTypes.string,
  // titleModal: PropTypes.string,
  renderButton: PropTypes.bool,
  accordionTitle: PropTypes.string,
  // setRowSelectionModel: PropTypes.func,
  // checkboxSelection: PropTypes.bool,
  renderFilter: PropTypes.node,
  handleButton: PropTypes.func,
  // setConditions: PropTypes.func,
  // conditions: PropTypes.object,
  handleSearch: PropTypes.func,
  // renderModal: PropTypes.any,
  setValueSearch: PropTypes.func,
  valueSearch: PropTypes.string,
  textBtn: PropTypes.string,
  renderTable: PropTypes.any,
  // total: PropTypes.number,
  // fixedRight: PropTypes.array,
  // fixedLeft: PropTypes.array,
  // table: PropTypes.object,
  // renderContent: PropTypes.node
};
