import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useCallback, useLayoutEffect } from 'react';

import { Box } from '@mui/material';

import { authGetData, authPostPutData } from 'src/utils/request';
import { parseParams, sortTableData, removeUndefinedAttribute } from 'src/utils/function';
import {
  INDEX,
  PAGE_SIZE,
  PAGE_INDEX,
  STATUS_200,
  METHOD_PUT,
  METHOD_POST,
  VITE_REACT_APP_API_MASTERDATA, 
} from 'src/utils/constant';

import Templates from 'src/template/admin/station';
import FormCreateUpdate from 'src/template/admin/station/form';
import {STATIONALL,STATIONCRT,STATIONDEL  } from 'src/api/master-data';
import { setPopup, setFetchData, setEqualForm, setNotification, setConfirmDialog } from 'src/redux/common';

import Iconify from 'src/components/iconify';


const initValues = {
  stationName:'',
  quantityAvaiable: '',
  numOfSeats: '',
  locationId: '',
  locationName: '',
  statusId: '',
  statusName: ''
};



export default function StationPages() {
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const fetch = useSelector((state) => state.common.fetchData);

  const [, setSearchParams] = useSearchParams();
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0)
  const [valueSearch, setValueSearch] = useState('');
  const [conditionsData, setConditions] = useState({
    pageIndex: PAGE_INDEX,
    index: INDEX,
    pageSize: PAGE_SIZE,
    searchTerm: '',
    ...parseParams(location.search),
  });

  

  const [rowId, setRowId] = useState(null);
  // init form
  const [initialValues, setInitialValues] = useState(initValues);
  // create data or update data state
  const [isCreate, setIsCreate] = useState(false);
  // validate form
  const validationSchema = Yup.object({
    stationName: Yup.string().required(t('validator.required')),
    quantityAvaiable: Yup.string()
    .required(t('validator.required'))
    .matches(/^\d+$/, t('validator.numeric')), // Chỉ chấp nhận các ký tự số
    numOfSeats: Yup.string()
    .required(t('validator.required'))
    .matches(/^\d+$/, t('validator.numeric')), // Chỉ chấp nhận các ký tự số
    locationId: Yup.string().required(t('validator.required')),
    locationName: Yup.string().required(t('validator.required')),
    statusId: Yup.string().required(t('validator.required')),
    statusName: Yup.string().required(t('validator.required')),
  });
  // use formik
  const formik = useFormik({
    initialValues,
    validationSchema,
  });

   // state sort data
   const [sorting, setSorting] = useState([]);
   // columns
  const columns = [
    {
      accessorKey: 'index',
      header: t('STT'), 
      size: 50,
      enableSorting: false,
      accessorFn: (_, rowIndex) => rowIndex + 1, // Hàm truy xuất sẽ trả về số thứ tự cho mỗi hàng
    },
    {
      accessorKey: 'stationName',
      header: t('field.stationName'),
      size: 250,
      enableSorting: false,
    },
    {
      accessorKey: 'quantityAvaiable',
      header: t('field.quantityAvaiable'),
      size: 150,
      enableSorting: false,
    },
    {
      accessorKey: 'numOfSeats',
      header: t('field.numOfSeats'),
      size: 150,
      enableSorting: false,
    },
    {
      accessorKey: 'locationName',
      header: t('field.locationName'),
      size: 240,
      enableSorting: false,
    },
    {
      accessorKey: 'statusName',
      header: t('field.statusName'),
      size: 200,
      enableSorting: false,
    },
   

    // {
    //   field: 'createdDate',
    //   headerName: t('field.createdDate'),
    //   // type: 'number',
    //   // flex: 1,
    //   width: 250,
    //   disableColumnMenu: true,
    //   // width: 90
    // },
    {
      accessorKey: 'actions',
      enableColumnPinning: false,
      size: 100,
      enableSorting: false,
      accessorFn: (row) => (
        <Box sx={{ textAlign: 'center' }}>
          <Iconify
            icon="eva:edit-fill"
            sx={{ mr: 2, height: 40, color: theme.palette.primary.main, cursor: 'pointer' }}
            onClick={() => handleOpenModal(row)}
          />
          <Iconify
            icon="eva:trash-2-outline"
            sx={{ mr: 2, height: 40, color: theme.palette.error.main, cursor: 'pointer' }}
            onClick={() => handleDelete(row.id)}
          />
        </Box>
      ),
    },
  ];

  

 
  // init table
  const table = {
    columns,
    data: rows,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    initialState: {
      columnPinning: { left: ['code'], right: ['actions'] },
    },
  };

  // fetch data after sort
  // useEffect(() => {
  //   sortTableData(sorting, setConditions)
  // }, [sorting]);

  // show modal form
  const handleOpenModal = useCallback(
    (row) => {
      let create = false;
      let data = {};
      // update
      if (Object.keys(row).length) {
        data = {
          stationId: row.id,
          stationName: row.stationName,
          quantityAvaiable: row.quantityAvaiable,
          numOfSeats: row.numOfSeats,
          locationId: row.locationId,
          locationName: row.locationName,
          statusId: row.statusId,
          statusName: row.statusName
        };
        create = false;
        setRowId(row.id);

        // create
      } else {
        data = {
          ...initValues,
        };
        create = true;
        setRowId(null);
      }
      setInitialValues({
        ...data,
      });
      formik.setValues({
        ...data,
      });
      setIsCreate(create);
      dispatch(setPopup(true));
    },
    [dispatch, formik]
  );

  // delete data
  const handleDelete = (id) => {
    dispatch(
      setConfirmDialog({
        show: true,
        url: VITE_REACT_APP_API_MASTERDATA + STATIONDEL,
        data: id,
        payload: {
        id: rowId,
        }
      })
    );
  };

  // fetch filter (url)
  useLayoutEffect(() => {
    setSearchParams(removeUndefinedAttribute(conditionsData));
  }, [setSearchParams, conditionsData]);
  // fetch data api
  const fetchData = useCallback((conditions) => {
    authGetData({
      url: VITE_REACT_APP_API_MASTERDATA + STATIONALL,
      onSuccess: (res) => {
        if (res && res.statusCode === STATUS_200) {
          setRows(res.data);
          setTotal(res.paging.totalCount)
        }
      },
    });
  }, []);
  // call fuc fetch data if conditionsData is change
  useEffect(() => {
    const obj = sortTableData(sorting)

    const conditions = {
      ...conditionsData,
      ...obj,
    }
    fetchData(conditions);
  }, [conditionsData, fetchData, sorting]);

  // fetch of store is true => call func fetch data
  useEffect(() => {
    if (fetch) {
      fetchData(conditionsData);
      dispatch(setFetchData(false));
    }
  }, [conditionsData, dispatch, fetch, fetchData]);

  // search data
  const handleSearch = useCallback(() => {
    setConditions((oldState) => ({
      ...oldState,
      searchTerm: valueSearch,
    }));
  }, [valueSearch]);
// thay đổi code để phân biệt payload
const onSubmitForm = useCallback(() => {
  let method = METHOD_POST;
  if (isCreate) method = METHOD_POST;
  else method = METHOD_PUT;
  authPostPutData({
    url: VITE_REACT_APP_API_MASTERDATA + STATIONCRT,
    method,
    payload: {
      stationId: rowId,
      stationName: formik.values.stationName,
      quantityAvaiable: formik.values.quantityAvaiable,
      numOfSeats: formik.values.numOfSeats,
      locationId: formik.values.locationId,
      locationName: formik.values.locationName,
      statusId: formik.values.statusId,
      statusName: formik.values.statusName,
    },
    onSuccess: (res) => {
      if (res && res.statusCode === STATUS_200) {
        dispatch(
          setNotification({
            show: true,
            message: res.message,
            status: 'success',
          })
        );
        dispatch(setPopup(false))
        dispatch(setEqualForm(true))
        formik.setValues({...initValues})
        fetchData()
      }
    },
  }); console.log(formik.values)
}, [dispatch, fetchData, formik, isCreate, rowId]);
  // render form create/update
  const renderModal = useCallback(
    () => (
      <FormCreateUpdate
        formik={formik}
        onSubmitForm={onSubmitForm}
        textBtn={isCreate ? t('button.create') : t('button.update')}
        initialValues={initialValues}
      />
    ),
    [formik, initialValues, isCreate, onSubmitForm, t,]
  );

  return (
    <Templates
      rows={rows}
      columns={columns}
      title={t('nav.station')}
      titleModal={isCreate ? t('dialog.create_data') : t('dialog.update_data')}
      checkboxSelection={false}
      // setRowSelectionModel={setRowSelectionModel}
      renderButton
      handleOpenModal={handleOpenModal}
      handleSearch={handleSearch}
      conditions={conditionsData}
      setConditions={setConditions}
      setValueSearch={setValueSearch}
      valueSearch={valueSearch}
      renderModal={renderModal}
      total={total}
      table={table}
    />
  );
}
