// import { DataGridPro } from '@mui/x-data-grid-pro';
// import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

// import { DataGrid } from '@mui/x-data-grid';
import { TablePagination } from '@mui/material';

import { PAGE_SIZE, PAGE_INDEX } from 'src/utils/constant';

// import BasicTable from './custom';

// import BasicTable from './custom';

export default function TableComponent({ total, conditions, setConditions = () => {}, table }) {
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

  const initTable = useMaterialReactTable({
    enableBottomToolbar: false,
    enableStickyHeader: true,
    enableColumnActions: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableColumnOrdering: false,
    enableFilters: false,
    enableToolbarInternalActions: false,
    layoutMode: 'grid-no-grow',
    ...table,
    muiTableHeadCellProps: {
      sx: {
        padding: '7.67px 10px!important'
      }
    },
    muiTableBodyCellProps: {
      sx: {
        padding: '0 10px'
      }
    },
    enableTopToolbar: false,
  });
  // const table = useMaterialReactTable({
  //   columns,
  //   data: rows,
  //   // enableColumnPinning: true,
  //   enableBottomToolbar: false,
  //   enableStickyHeader: true,
  //   enableColumnActions: false,
  //   enableDensityToggle: false,
  //   enableHiding: false,
  //   enableColumnOrdering: false,
  //   enableFilters: false,
  //   enableToolbarInternalActions: false,
  //   // enableRowActions: true,
  //   layoutMode: 'grid-no-grow', // constant column widths
  //   // renderRowActionMenuItems: () => [<MenuItem key="action">Action</MenuItem>],
  //   initialState: {
  //     columnPinning: { left: fixedLeft, right: fixedRight },
  //   },
  // });
  return (
    <>
      <MaterialReactTable table={initTable} />

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
    </>
  );
}

TableComponent.propTypes = {
  setConditions: PropTypes.func,
  total: PropTypes.number,
  conditions: PropTypes.object,
  table: PropTypes.object,
};
