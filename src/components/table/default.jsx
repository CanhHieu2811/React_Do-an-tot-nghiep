import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Select from '@mui/material/Select';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Tooltip, Pagination, Stack, Button } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import { PAGE_SIZE, PAGE_INDEX, ORDER_BY_DESC, ORDER_BY } from 'src/utils/constant';
import { parseParams } from 'src/utils/function';
import Iconify from '../iconify';

const selects = [5, 10, 20, 50, 100];
export default function BasicTableComponent({
  rows = [],
  columns,
  maxHeight = 800,
  columnArray = [],
  total,
  conditions,
  setConditions = () => {},
  isPagination = false,
  // setSorting,
  renderActionRow,
  stickyHeader = true,
  handleOpenModal,
  renderButton = false,
  renderButtonTop,
  backgroundColor,
  color,
  createTitle,
  isDisableCreate = false,
}) {
  // const classes = useStyles();
  const { t } = useTranslation();
  const location = useLocation();
  const theme = useTheme();
  const [page, setPage] = useState(conditions?.pageIndex ?? PAGE_INDEX);
  const [order, setOrder] = useState(null);
  const [orderBy, setOrderBy] = useState('');

  useEffect(() => {
    if (location.search) {
      const params = parseParams(location.search);
      if (params && params.orderByDesc) {
        setOrder('desc');
        setOrderBy(params.orderByDesc);
      } else if (params && params.orderBy) {
        setOrder('asc');
        setOrderBy(params.orderBy);
      } else {
        setOrder(null);
        setOrderBy('');
      }
    } else {
      setOrder(null);
      setOrderBy('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleRequestSort = useCallback(
    (property) => {
      let orderSort = order;
      if (property === orderBy || orderBy === '') {
        if (order === null) {
          orderSort = 'asc';
        } else if (order === 'asc') {
          orderSort = 'desc';
        } else {
          orderSort = null;
        }
      } else {
        orderSort = 'asc';
      }
      setOrder(orderSort);
      setOrderBy(property);

      let sortKey = ORDER_BY;
      let currentKey = ORDER_BY_DESC;
      if (orderSort === null) {
        sortKey = undefined;
        currentKey = undefined;
      }

      if (orderSort === 'desc') {
        sortKey = ORDER_BY_DESC;
        currentKey = ORDER_BY;
      }

      if (orderSort === 'asc') {
        sortKey = ORDER_BY;
        currentKey = ORDER_BY_DESC;
      }

      if (sortKey === undefined) {
        setConditions({
          ...conditions,
          [ORDER_BY_DESC]: undefined,
          [currentKey]: undefined,
        });
      } else {
        setConditions({
          ...conditions,
          [sortKey]: property,
          [currentKey]: undefined,
        });
      }
    },
    [conditions, order, orderBy, setConditions]
  );

  const handleChange = (event, value) => {
    setPage(value);
    setConditions((oldState) => ({
      ...oldState,
      pageIndex: value,
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    setConditions((oldState) => ({
      ...oldState,
      pageIndex: 1,
      pageSize: event.target.value,
    }));
  };

  return (
    <>
      {isPagination && (
        <Stack direction="row" alignItems="stretch" justifyContent="space-between">
          <Box sx={{ marginBottom: 1, display: 'flex', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ mr: 1 }}>
              {t('pagination.label')}
            </Typography>
            <Select value={conditions.pageSize} onChange={handleChangeRowsPerPage} size="small">
              {selects.map((item, i) => (
                <MenuItem key={i} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <Box sx={{ ml: 1 }}>
              <Typography variant="caption">Tổng: <strong>{total}</strong> bản ghi</Typography>
            </Box>
          </Box>

          <Box>
            {renderButton && !renderButtonTop && (
              <Button
                variant="contained"
                color="success"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={() => handleOpenModal({})}
                size="large"
                disabled={isDisableCreate}
              >
                <Typography variant="contained" sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {createTitle || t('button.create')}
                </Typography>
              </Button>
            )}
          </Box>
        </Stack>
      )}
      <TableContainer style={{ maxWidth: '100%', maxHeight }}>
        <Table
          stickyHeader={stickyHeader}
          aria-label="simple table"
          sx={{ tableLayout: 'fixed', border: `1px solid ${theme.palette.grey[300]}` }}
        >
          <TableHead sx={{ height: '48px' }}>
            <TableRow>
              {columns &&
                columns.map((el, i) => (
                  <TableCell
                    key={i}
                    width={el?.width || 'auto'}
                    align="center"
                    sx={{
                      backgroundColor: backgroundColor || theme.palette.grey[500],
                      color: color || theme.palette.grey[0],
                      padding: 0.95,
                      fontSize: 14,
                      // minHeight: 40,
                      position: stickyHeader ? 'sticky' : 'unset',
                      left:
                        // eslint-disable-next-line no-nested-ternary
                        i === 0
                          ? 0
                          : el?.type === 'actions'
                            ? undefined
                            : columns[i - 1]?.width || 'auto',
                      right: el?.type === 'actions' && el?.sticky ? 0 : undefined,
                      zIndex: columns[i]?.sticky ? 9 : 1,
                      borderRight: '1px solid',
                      borderRightColor: 'white',
                    }}
                  >
                    <div>
                      {el.sortable ? (
                        <Box
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleRequestSort(el.id, order)}
                          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                          {el.header}
                          {orderBy === el.id ? (
                            <>
                              {order === 'desc' ? (
                                <Iconify
                                  icon="eva:arrow-downward-outline"
                                  width={18}
                                  sx={{ marginLeft: 1 }}
                                />
                              ) : (
                                <Iconify
                                  sx={{ marginLeft: 1 }}
                                  width={18}
                                  icon="eva:arrow-upward-outline"
                                  style={{ opacity: order === null ? 0.4 : 1 }}
                                />
                              )}
                            </>
                          ) : (
                            // eslint-disable-next-line react/jsx-no-useless-fragment
                            <>
                              <Iconify
                                sx={{ marginLeft: 1 }}
                                width={18}
                                icon="eva:arrow-upward-outline"
                                style={{ opacity: 0.4 }}
                              />
                            </>
                          )}
                        </Box>
                      ) : (
                        el.header
                      )}
                    </div>
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {renderActionRow}
            {rows &&
              rows.length > 0 &&
              rows.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((el, i) => (
                    <TableCell
                      key={`i-${i}`}
                      width={columns[i]?.width || 'auto'}
                      height={columns[i]?.height || 'auto'}
                      align={columns[i]?.align || 'left'}
                      sx={{
                        padding: 0.95,
                        fontSize: 14,
                        minHeight: 40,
                        position: columns[i]?.sticky ? 'sticky' : 'unset',

                        left:
                          // eslint-disable-next-line no-nested-ternary
                          i === 0 && columns[i]?.sticky
                            ? 0
                            : columns[i]?.type === 'actions'
                              ? undefined
                              : columns[i - 1]?.width,
                        right: columns[i]?.type === 'actions' && columns[i]?.sticky ? 0 : undefined,
                        zIndex: columns[i]?.sticky ? 8 : 1,
                        borderBottom: '1px solid rgb(221 221 221)',
                        backgroundColor:
                          // eslint-disable-next-line no-nested-ternary
                          columns[i]?.sticky && columns[i].id !== 'actions'
                            ? '#fff'
                            : columns[i]?.sticky && columns[i].id === 'actions'
                              ? 'rgb(238 241 248)'
                              : 'inherit',
                      }}
                    >
                      {columns[i]?.component ? (
                        columns[i]?.component(row, index)
                      ) : (
                        <Tooltip title={<>{row[el.id]}</>}>
                          <Typography
                            variant="body2"
                            sx={{
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            <>{row[el.id]}</>
                          </Typography>
                        </Tooltip>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {rows && rows.length === 0 ? (
              <TableRow>
                <TableCell sx={{ textAlign: 'left' }} colSpan={columns?.length}>
                  <Typography variant="body1" sx={{ display: 'flex' }}>
                    <Iconify icon="eva:folder-outline" />
                    <span style={{ marginLeft: 8 }}>Không có dữ liệu</span>
                  </Typography>
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
      {isPagination ? (
        <Pagination
          shape="rounded"
          showFirstButton
          showLastButton
          defaultPage={PAGE_INDEX}
          count={Math.ceil(total / (conditions.pageSize ?? PAGE_SIZE))}
          color="primary"
          page={Number(page)}
          onChange={handleChange}
          sx={{
            backgroundColor: theme.palette.grey[300],
            color: theme.palette.common.black,
            padding: 1,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        />
      ) : // <TablePagination
      //   rowsPerPageOptions={[]}
      //   component="div"
      //   count={total}
      //   rowsPerPage={Number(conditions.pageSize) ?? PAGE_SIZE}
      //   page={conditions.pageIndex - 1 ?? PAGE_INDEX - 1}
      //   onPageChange={handleChangePage}
      //   onRowsPerPageChange={handleChangeRowsPerPage}
      //   labelRowsPerPage=""
      // />
      null}
    </>
  );
}

BasicTableComponent.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  maxHeight: PropTypes.number,
  columnArray: PropTypes.array,
  setConditions: PropTypes.func,
  total: PropTypes.number,
  conditions: PropTypes.object,
  isPagination: PropTypes.bool,
  // setSorting: PropTypes.func,
  renderActionRow: PropTypes.any,
  stickyHeader: PropTypes.bool,
  handleOpenModal: PropTypes.func,
  renderButton: PropTypes.bool,
  renderButtonTop: PropTypes.bool,
  backgroundColor: PropTypes.any,
  color: PropTypes.any,
  createTitle: PropTypes.string,
  isDisableCreate: PropTypes.bool,
};
