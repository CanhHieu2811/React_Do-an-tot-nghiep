import PropTypes from 'prop-types';

import TableLayoutAdmin from 'src/layouts/admin/table';

export default function ComplainTemplates(props) {
  const {
    rows,
    total,
    columns,
    title,
    titleModal,
    checkboxSelection,
    setRowSelectionModel,
    renderButton,
    handleOpenModal,
    accordionTitle,
    handleSearch,
    renderFilter,
    filterValue,
    setFilterValue,
    renderModal,
    setValueSearch,
    valueSearch,
    setConditions,
    conditions,
    table
  } = props;

  return (
    <TableLayoutAdmin
      title={title}
      titleModal={titleModal}
      rows={rows}
      total={total}
      columns={columns}
      checkboxSelection={checkboxSelection}
      setRowSelectionModel={setRowSelectionModel}
      renderButton={renderButton}
      handleOpenModal={handleOpenModal}
      accordionTitle={accordionTitle}
      handleSearch={handleSearch}
      renderFilter={renderFilter}
      filterValue={filterValue}
      setFilterValue={setFilterValue}
      renderModal={renderModal}
      setValueSearch={setValueSearch}
      valueSearch={valueSearch}
      setConditions={setConditions}
      conditions={conditions}
      table={table}
    />
    
  );
}

ComplainTemplates.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  title: PropTypes.string,
  titleModal: PropTypes.string,
  renderButton: PropTypes.bool,
  accordionTitle: PropTypes.string,
  setRowSelectionModel: PropTypes.func,
  checkboxSelection: PropTypes.bool,
  handleSearch: PropTypes.func,
  filterValue: PropTypes.object,
  setFilterValue: PropTypes.func,
  renderFilter: PropTypes.node,
  renderModal: PropTypes.any,
  setValueSearch: PropTypes.func,
  valueSearch: PropTypes.string,
  handleOpenModal: PropTypes.func,
  total: PropTypes.number,
  conditions: PropTypes.object,
  setConditions: PropTypes.func,
  table: PropTypes.object,
};
