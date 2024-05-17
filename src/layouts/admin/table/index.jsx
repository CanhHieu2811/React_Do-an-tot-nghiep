import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingButton } from '@mui/lab';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Box,
  Stack,
  Button,
  Accordion,
  Typography,
  OutlinedInput,
  InputAdornment,
  AccordionDetails,
  AccordionSummary
} from '@mui/material';

import { setFetchData } from 'src/redux/common';

import Iconify from 'src/components/iconify';
import TableComponent from 'src/components/table';
import AlertDialog from 'src/components/dialog-confirm';

import LayoutPopup from '../popup';
import FilterDataTable from './filter';

export default function TableLayoutAdmin({
  rows = [],
  total,
  columns = [],
  minHeight = 420,
  title,
  titleModal,
  renderButton,
  accordionTitle,
  setRowSelectionModel = () => {},
  checkboxSelection = true,
  renderFilter,
  conditions,
  setConditions,
  handleSearch,
  renderModal,
  setValueSearch,
  valueSearch,
  searchResults,
  handleOpenModal,
  handleCloseSearchResults,
  showSearchResults,
  table,
  isSearch
}) {

  const { t } = useTranslation();
  // show popup in store
  const showPopup = useSelector((state) => state.common.isPopup);
  const dispatch = useDispatch();
  // set value change
  const onChangeValue = (event) => {
    setValueSearch(event.target.value);
  };

  // clear value
  const handleClear = useCallback(() => {
    setValueSearch('');
    searchResults([]);
    dispatch(setFetchData(true));
  }, [dispatch, setValueSearch, searchResults]);
  return (
    <>
      {showPopup ? (
        <LayoutPopup title={titleModal}>{renderModal()}</LayoutPopup>
      ) : (
        <Box>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h4">{title}</Typography>
            {renderButton && (
              <Button
                variant="contained"
                color="success"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={() => handleOpenModal({})}
                size="small"
              >
                {t('button.create')}
              </Button>
            )}
          </Stack>

          <FilterDataTable>
            <Box sx={{ textAlign: 'right' }}>
              <OutlinedInput
                value={valueSearch}
                onChange={onChangeValue}
                placeholder={t('placeholder.search')}
                sx={{ marginRight: 2 }}
                size="small"
                color="success"
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
                size="small"
                variant="text"
                color="success"
                onClick={handleClear}
                sx={{ marginRight: 1 }}
              >
                {t('button.clear')}
              </LoadingButton>
              <LoadingButton
                size="small"
                type="submit"
                variant="contained"
                color="success"
                onClick={handleSearch}
                disabled={valueSearch === ''}
              >
                {t('button.search')}
              </LoadingButton>
            </Box>
          </FilterDataTable>

          <Accordion defaultExpanded sx={{ marginTop: '0 !important' }}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel-table"
              id="panel-table"
              style={{ backgroundColor: "#058c42" }}
            >
              <Typography variant="subtitle2">
                {accordionTitle || t('accordion.title_table')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableComponent
                rows={rows}
                total={total}
                columns={columns}
                minHeight={minHeight}
                setRowSelectionModel={setRowSelectionModel}
                checkboxSelection={checkboxSelection}
                setConditions={setConditions}
                conditions={conditions}
                table={table}
              />
            </AccordionDetails>
          </Accordion>

          {/* <Modal
            open={showSearchResults}
            onClose={handleCloseSearchResults}
          >
            <Box>
              <Typography variant="h6">Kết quả tìm kiếm</Typography>
              <TableComponent
                rows={localSearchResults}
                total={localSearchResults.length}
                columns={columns}
                minHeight={minHeight}
                setRowSelectionModel={setRowSelectionModel}
                checkboxSelection={checkboxSelection}
                setConditions={setConditions}
                conditions={conditions}
                table={table}
              />
            </Box>
          </Modal> */}
        </Box>
      )}
      <AlertDialog />
    </>
  );
}

TableLayoutAdmin.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  minHeight: PropTypes.number,
  title: PropTypes.string,
  titleModal: PropTypes.string,
  renderButton: PropTypes.bool,
  accordionTitle: PropTypes.string,
  setRowSelectionModel: PropTypes.func,
  checkboxSelection: PropTypes.bool,
  renderFilter: PropTypes.node,
  showSearchResults: PropTypes.bool,
  handleCloseSearchResults: PropTypes.func,
  handleOpenModal: PropTypes.func,
  setConditions: PropTypes.func,
  conditions: PropTypes.object,
  handleSearch: PropTypes.func,
  renderModal: PropTypes.any,
  setValueSearch: PropTypes.func,
  searchResults: PropTypes.array,
  valueSearch: PropTypes.string,
  total: PropTypes.number,
  table: PropTypes.object,
  isSearch: PropTypes.bool
};