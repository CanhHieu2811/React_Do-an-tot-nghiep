import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { DataGrid } from '@mui/x-data-grid';
import { TablePagination } from '@mui/material';

import { PAGE_SIZE, PAGE_INDEX } from 'src/utils/constant';

export default function XDataGridComponent({
  rows,
  columns,
  total,
  conditions,
  setConditions = () => {},
  rowSelection = false,
  checkboxSelection = false,
  hidePagination = false
}) {
  const { t } = useTranslation();

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

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        // initialState={{
        //   pagination: {
        //     paginationModel: { page: 0, pageSize: 5 },
        //   },
        // }}
        // pageSizeOptions={[5, 10]}
        checkboxSelection={checkboxSelection}
        hideFooter
        hideFooterPagination
        hideFooterSelectedRowCount
        disableColumnMenu
        rowSelection={rowSelection}
      />
      {hidePagination ? null : (
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          component="div"
          count={total}
          rowsPerPage={Number(conditions.pageSize) ?? PAGE_SIZE}
          page={conditions.pageIndex - 1 ?? PAGE_INDEX - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={t('pagination.label')}
        />
      )}
    </>
  );
}
XDataGridComponent.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  setConditions: PropTypes.func,
  total: PropTypes.number,
  conditions: PropTypes.object,
  checkboxSelection: PropTypes.bool,
  rowSelection: PropTypes.bool,
  hidePagination: PropTypes.bool
};
