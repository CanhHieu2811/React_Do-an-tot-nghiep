/* eslint-disable arrow-body-style */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Select from '@mui/material/Select';
// import { visuallyHidden } from '@mui/utils';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { TablePagination } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
// import TableSortLabel from '@mui/material/TableSortLabel';

// import { sortTableData } from 'src/utils/function';
import { ORDER_BY, PAGE_SIZE, PAGE_INDEX, ORDER_BY_DESC } from 'src/utils/constant';

const selects = [5, 10, 20, 50, 100];
export default function CustomTableComponent({
  rows,
  columns,
  maxHeight = 500,
  columnArray = [],
  total,
  conditions,
  setConditions = () => {},
  isPagination = false,
  // setSorting,
  renderActionRow,
  headers,
  stickyHeader = true,
}) {
  // const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  // const [sorting, setSorting] = useState({});
  // eslint-disable-next-line no-unused-vars
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    let sortKey = ORDER_BY;
    let currentKey = ORDER_BY_DESC;
    if (order === 'desc') {
      sortKey = ORDER_BY_DESC;
      currentKey = ORDER_BY;
    } else {
      sortKey = ORDER_BY;
      currentKey = ORDER_BY_DESC;
    }
    setConditions({
      ...conditions,
      [sortKey]: property,
      [currentKey]: undefined,
    });
  };

  const handleChangePage = (event, newPage) => {
    setConditions((oldState) => ({
      ...oldState,
      pageIndex: newPage + 1,
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    setConditions((oldState) => ({
      ...oldState,
      pageIndex: 1,
      pageSize: event.target.value,
    }));
  };

  // console.log('---------------------------------', columns);

  return (
    <>
      {isPagination && (
        <Box>
          <Typography variant="caption" sx={{ marginRight: 1 }}>
            {t('pagination.label')}
          </Typography>
          <Select value={conditions.pageSize} onChange={handleChangeRowsPerPage} size="small">
            {selects.map((item, i) => (
              <MenuItem key={i} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
      <TableContainer style={{ maxWidth: '100%', maxHeight }}>
        <Table
          stickyHeader={stickyHeader}
          aria-label="simple table"
          sx={{ tableLayout: 'fixed', border: `1px solid ${theme.palette.grey[300]}` }}
        >
          <TableHead>
            {headers &&
              // eslint-disable-next-line arrow-body-style
              headers.map((headerItem, index) => {
                // console.log('----headerItem', headerItem);
                // console.log('----columns', columns);

                return (
                  <TableRow key={index}>
                    {headerItem &&
                      headerItem.map((el, i) => {
                        // let cssObject = null;
                        // if (el.sticky)
                        //   cssObject = {
                        //     backgroundColor: theme.palette.grey[500],
                        //     color: theme.palette.grey[0],
                        //     padding: 0.95,
                        //     fontSize: 14,
                        //     border: '1px solid #f1f3f4',
                        //     position: stickyHeader ? 'sticky' : 'unset',
                        //     left:
                        //       // eslint-disable-next-line no-nested-ternary
                        //       i === 0
                        //         ? 0
                        //         : el?.type === 'actions'
                        //           ? undefined
                        //           : headerItem[i - 1]?.width || 'auto',
                        //     // right: el?.type === 'actions' && el?.sticky ? 0 : undefined,
                        //     zIndex: headerItem[i]?.sticky ? 9 : 1,
                        //   };
                        // else
                        //   cssObject = {
                        //     backgroundColor: theme.palette.grey[500],
                        //     color: theme.palette.grey[0],
                        //     padding: 0.95,
                        //     fontSize: 14,
                        //     border: '1px solid #f1f3f4',
                        //     // minHeight: 40,
                        //     // position: 'sticky',

                        //     position: stickyHeader ? 'sticky' : 'unset',
                        //     left:
                        //       // eslint-disable-next-line no-nested-ternary
                        //       i === 0
                        //         ? 0
                        //         : el?.type === 'actions'
                        //           ? undefined
                        //           : headerItem[i - 1]?.width || 'auto',
                        //     // right: el?.type === 'actions' && el?.sticky ? 0 : undefined,
                        //     zIndex: headerItem[i]?.sticky ? 9 : 1,
                        //   };

                        return (
                          <TableCell
                            key={el.header + i}
                            width={el?.width || '100%'}
                            align="center"
                            sx={
                              // cssObject
                              {
                                // backgroundColor: theme.palette.grey[500],
                                backgroundColor: '#558b2f',
                                color: theme.palette.grey[0],
                                padding: 0.95,
                                fontSize: 14,
                                border: '1px solid #f1f3f4',
                                position: stickyHeader ? 'sticky' : 'unset',
                                // left:
                                //   // eslint-disable-next-line no-nested-ternary
                                //   i === 0
                                //     ? 0
                                //     : el?.type === 'actions'
                                //       ? undefined
                                //       : headerItem[i - 1]?.width || 'auto',
                                left:
                                  // eslint-disable-next-line no-nested-ternary
                                  i === 0
                                    ? 0
                                    : // eslint-disable-next-line no-nested-ternary
                                      el?.type === 'actions'
                                      ? undefined
                                      : i === 1
                                        ? headerItem[i - 1]?.width
                                        : // eslint-disable-next-line no-unsafe-optional-chaining
                                          headerItem[i - 2]?.width + headerItem[i - 1]?.width ||
                                          'auto',
                                // right: el?.type === 'actions' && el?.sticky ? 0 : undefined,
                                zIndex: headerItem[i]?.sticky ? 9 : 1,
                              }
                            }
                            rowSpan={el.rowSpan || 1}
                            colSpan={el.colSpan || 1}
                          >
                            <div>{el.header}</div>
                          </TableCell>
                        );
                      })}
                  </TableRow>
                );
              })}
          </TableHead>
          <TableBody>
            {renderActionRow}
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((el, i) => {
                  // console.log('--------------columns', row, index, el, i);
                  return (
                    <TableCell
                      key={`i-${i}`}
                      width={el?.width || '100%'}
                      align={el?.align || 'left'}
                      sx={{
                        padding: 0.95,
                        fontSize: 14,
                        minHeight: 40,
                        border: '1px solid #f1f3f4',
                        // backgroundColor: el?.weeklyDayOff ? '#919eab4a' : 'inherit',
                        // eslint-disable-next-line no-nested-ternary
                        backgroundColor: columns[i]?.sticky
                          ? '#fff'
                          : // eslint-disable-next-line no-nested-ternary
                            el?.holiday
                            ? theme.palette.holidayColor.blue
                            : el?.weeklyDayOff
                              ? theme.palette.holidayColor.pink
                              : 'inherit',
                        // sticky
                        position: columns[i]?.sticky ? 'sticky' : 'unset',

                        // left:
                        //   // eslint-disable-next-line no-nested-ternary
                        //   i === 0 && columns[i]?.sticky
                        //     ? 0
                        //     : columns[i]?.type === 'actions'
                        //       ? undefined
                        //       : columns[i - 1]?.width,
                        left:
                          // eslint-disable-next-line no-nested-ternary
                          i === 0
                            ? 0
                            : // eslint-disable-next-line no-nested-ternary
                              el?.type === 'actions'
                              ? undefined
                              : i === 1
                                ? columns[i - 1]?.width
                                : // eslint-disable-next-line no-unsafe-optional-chaining
                                  columns[i - 2]?.width + columns[i - 1]?.width || 'auto',
                        right: columns[i]?.type === 'actions' && columns[i]?.sticky ? 0 : undefined,
                        zIndex: columns[i]?.sticky ? 8 : 1,
                      }}
                    >
                      {el?.component ? el?.component(row) : row[el.id]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isPagination ? (
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={total}
          rowsPerPage={Number(conditions.pageSize) ?? PAGE_SIZE}
          page={conditions.pageIndex - 1 ?? PAGE_INDEX - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage=""
        />
      ) : null}
    </>
  );
}

CustomTableComponent.propTypes = {
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
  headers: PropTypes.array,
  stickyHeader: PropTypes.bool,
};
