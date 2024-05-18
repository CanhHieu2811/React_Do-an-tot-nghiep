import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

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
  AccordionSummary,
  Tooltip,
} from '@mui/material';

// import { setFetchData } from 'src/redux/common';

import { PAGE_SIZE, PAGE_INDEX } from 'src/utils/constant';

import Iconify from 'src/components/iconify';
// import TableComponent from 'src/components/table';

import BasicTableComponent from 'src/components/table/default';

import LayoutPopup from '../popup';
import FilterDataTable from './filter';

export default function TableLayoutAdmin({
  rows = [],
  total,
  columns = [],
  minHeight = 420,
  titleModal,
  renderButton,
  accordionTitle,
  setRowSelectionModel = () => {},
  checkboxSelection = true,
  renderFilter,
  isDisplayFilter = true,
  conditions,
  setConditions,
  handleSearch,
  renderModal,
  setValueSearch,
  valueSearch,
  handleOpenModal,
  // setSorting,
  isPagination,
  columnArray,
  renderActionRow,
  headers,
  renderButtonTop = false,
  renderTableNote,
  tableBorder = true,
  accordionTable = false,
  backgroundColorHeader = '#558b2f',
  backgroundColor = '#fff',
  createTitle,
  btnClearTextSearch = false,
  tooltipSearch = '',
  isDisableCreate,
}) {
  const { t } = useTranslation();
  const loading = useSelector((state) => state.common.loading);
  const pressEnterKey = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  // show popup in store
  const showPopup = useSelector((state) => state.common.isPopup);
  // const dispatch = useDispatch();
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
    // dispatch(setFetchData(true));
    setConditions({
      pageIndex: PAGE_INDEX,
      pageSize: PAGE_SIZE,
    });
  }, [setConditions, setValueSearch]);
  return (
    <>
      {showPopup ? (
        <LayoutPopup title={titleModal}>{renderModal()}</LayoutPopup>
      ) : (
        <Box>
          {isDisplayFilter && (
            <FilterDataTable>
              {renderFilter || (
                <Box sx={{ textAlign: 'right' }}>
                  <OutlinedInput
                    value={valueSearch}
                    onChange={onChangeValue}
                    placeholder="Tìm kiếm"
                    sx={{ marginRight: 2 }}
                    size="small"
                    onKeyDown={pressEnterKey}
                    startAdornment={
                      <InputAdornment position="start">
                        <Iconify
                          icon="eva:search-fill"
                          sx={{ color: 'text.disabled', width: 20, height: 20 }}
                        />
                      </InputAdornment>
                    }
                    endAdornment={
                      btnClearTextSearch && (
                        <InputAdornment position="end">
                          <Tooltip title="Xoá">
                            <Iconify
                              icon="eva:close-outline"
                              onClick={() => {
                                setValueSearch('');
                                handleClear();
                              }}
                              sx={{
                                cursor: 'pointer',
                                opacity: valueSearch !== '' ? 1 : 0,
                                pointerEvents: valueSearch !== '' ? 'auto' : 'none',
                              }}
                            />
                          </Tooltip>

                          <Tooltip title={tooltipSearch}>
                            <Iconify icon="eva:alert-circle-outline" />
                          </Tooltip>
                        </InputAdornment>
                      )
                    }
                  />
                  <LoadingButton
                    //   fullWidth
                    size="small"
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                    disabled={valueSearch === ''}
                    loading={loading}
                    startIcon={<Iconify icon="eva:search-fill" />}
                    sx={{ height: 40 }}
                  >
                    Tìm kiếm
                  </LoadingButton>
                  <LoadingButton onClick={handleClear}>
                    <Tooltip title="Bỏ tìm kiếm">
                      <Iconify
                        icon="eva:refresh-outline"
                        sx={{ mr: 2, width: 32, marginRight: 0, cursor: 'pointer' }}
                      />
                    </Tooltip>
                  </LoadingButton>
                </Box>
              )}
            </FilterDataTable>
          )}
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            {renderButton && (
              <Button
                variant="contained"
                color="success"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={() => handleOpenModal({})}
                size="large"
              >
                Tạo mới
              </Button>
            )}
          </Stack>
          {accordionTable ? (
            <Accordion
              defaultExpanded
              sx={{
                marginTop: `${tableBorder ? 0 : 10}px !important`,
                paddingTop: isDisplayFilter ? '0' : 3,
              }}
            >
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel-table"
                id="panel-table"
                style={{
                  marginTop: !isDisplayFilter && tableBorder ? '36px' : '0',
                  height: '48px',
                }}
              >
                <Typography variant="subtitle2" sx={{ fontSize: '16px' }}>
                  {accordionTitle || t('accordion.title_table')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <BasicTableComponent
                  columns={columns}
                  rows={rows}
                  isPagination={isPagination}
                  conditions={conditions}
                  setConditions={setConditions}
                  columnArray={columnArray}
                  total={total}
                  // setSorting={setSorting}
                  renderActionRow={renderActionRow}
                  handleOpenModal={handleOpenModal}
                  renderButton={renderButton}
                  renderButtonTop={renderButtonTop}
                />
              </AccordionDetails>
            </Accordion>
          ) : (
            <Box
              sx={{
                paddingTop: isDisplayFilter ? 1 : 5,
                paddingX: 1,
                backgroundColor,
              }}
            >
              <BasicTableComponent
                columns={columns}
                rows={rows}
                isPagination={isPagination}
                conditions={conditions}
                setConditions={setConditions}
                columnArray={columnArray}
                total={total}
                // setSorting={setSorting}
                renderActionRow={renderActionRow}
                handleOpenModal={handleOpenModal}
                renderButton={renderButton}
                renderButtonTop={renderButtonTop}
                backgroundColor={backgroundColorHeader}
                createTitle={createTitle}
                isDisableCreate={isDisableCreate}
              />
            </Box>
          )}
        </Box>
      )}
    </>
  );
}

TableLayoutAdmin.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  minHeight: PropTypes.number,
  titleModal: PropTypes.string,
  renderButton: PropTypes.bool,
  accordionTitle: PropTypes.string,
  setRowSelectionModel: PropTypes.func,
  checkboxSelection: PropTypes.bool,
  renderFilter: PropTypes.node,
  handleOpenModal: PropTypes.func,
  setConditions: PropTypes.func,
  conditions: PropTypes.object,
  handleSearch: PropTypes.func,
  renderModal: PropTypes.any,
  setValueSearch: PropTypes.func,
  valueSearch: PropTypes.string,
  total: PropTypes.number,
  isPagination: PropTypes.bool,
  columnArray: PropTypes.array,
  renderActionRow: PropTypes.any,
  headers: PropTypes.array,
  renderButtonTop: PropTypes.bool,
  isDisplayFilter: PropTypes.bool,
  renderTableNote: PropTypes.node,
  tableBorder: PropTypes.bool,
  accordionTable: PropTypes.bool,
  backgroundColorHeader: PropTypes.string,
  backgroundColor: PropTypes.string,
  createTitle: PropTypes.string,
  btnClearTextSearch: PropTypes.bool,
  tooltipSearch: PropTypes.string,
  isDisableCreate: PropTypes.bool,
};
