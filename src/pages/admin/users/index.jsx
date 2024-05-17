import axios from 'axios';
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
  PAGE_SIZE,
  PAGE_INDEX,
  STATUS_200,
  METHOD_PUT,
  METHOD_POST,
  phoneRegExp,
  VITE_REACT_APP_API_MASTERDATA,
} from 'src/utils/constant';

import Templates from 'src/template/admin/users';
import FormCreateUpdate from 'src/template/admin/users/form';
import { USERALL, USERCRT, USERDEL } from 'src/api/master-data';
import { setPopup, setFetchData, setEqualForm, setNotification, setConfirmDialog } from 'src/redux/common';

import Iconify from 'src/components/iconify';

const initValues = {
  fullName: '',
  userName: '',
  email: '',
  phoneNumber: '',
  address: '',
  isSuperAdmin: '',
  password: '',
  passwordConfirm: '',
};

export default function UserPages() {
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const fetch = useSelector((state) => state.common.fetchData);
  const [searchResults, setSearchResults] = useState([]);


  const [, setSearchParams] = useSearchParams();
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [valueSearch, setValueSearch] = useState('');
  const [conditionsData, setConditions] = useState({
    pageIndex: PAGE_INDEX,
    pageSize: PAGE_SIZE,
    searchTerm: '',
    ...parseParams(location.search),
  });
  const [rowId, setRowId] = useState(null);
  const [initialValues, setInitialValues] = useState(initValues);
  const [isCreate, setIsCreate] = useState(false);
  
  const validationSchema = Yup.object({
    fullName: Yup.string().required(t('validator.required')),
    userName: Yup.string().required(t('validator.required')),
    dateOfBirth: Yup.date().required(t('validator.required')),
    email: Yup.string().email(t('validator.email.format')).required(t('validator.required')),
    phoneNumber: Yup.string().matches(phoneRegExp, t('validator.phone')).required(t('validator.required')),
    password: Yup.string().min(8, t('validator.min_8')).required(t('validator.required')),
    passwordConfirm: Yup.string().required(t('validator.required')).oneOf([Yup.ref('password'), null], t('validator.match_password')),
    address: Yup.string().max(255, t('validator.max_255')).required(t('validator.required'))
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
  });

  const [sorting, setSorting] = useState([]);

  const columns = [
    {
      accessorKey: 'index',
      header: t('STT'), 
      size: 50,
      enableSorting: false,
      accessorFn: (_, rowIndex) => rowIndex + 1,
    },
    {
      accessorKey: 'fullName',
      header: t('field.name'),
      size: 250,
      enableSorting: false,
    },
    {
      accessorKey: 'dateOfBirth',
      header: t('field.dateOfBirth'),
      size: 200,
      enableSorting: false,
    },
    {
      accessorKey: 'email',
      header: t('field.email'),
      size: 200 ,
      enableSorting: false,
    },
    {
      accessorKey: 'address',
      header: t('field.address'),
      size: 200,
      enableSorting: false,
    },
    {
      accessorKey: 'phoneNumber',
      header: t('field.phoneNumber'),
      size: 150,
      muiTableHeadCellProps: {
        align: 'right',
      },
      muiTableBodyCellProps: {
        align: 'right',
      },
      enableSorting: false,
    },
    {
      accessorKey: 'actions',
      enableColumnPinning: false,
      size: 100,
      enableSorting: false,
      accessorFn: (row) => (
        <Box sx={{ textAlign: 'right' }}>
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

  const handleOpenModal = useCallback(
    (row) => {
      let create = false;
      let data = {};
      if (Object.keys(row).length) {
        data = {
          userId: row.id,
          fullName: row.fullName,
          userName: row.userName,
          dateOfBirth: row.dateOfBirth,
          phoneNumber: row.phoneNumber,
          email: row.email,
          address: row.address,
          isSuperAdmin: row.isSuperAdmin
        };
        create = false;
        setRowId(row.id);
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

  const handleDelete = (id) => {
    dispatch(
      setConfirmDialog({
        show: true,
        url: VITE_REACT_APP_API_MASTERDATA + USERDEL,
        data: id,
        payload: {
          id: rowId,
        }
      })
    );
  };

  useLayoutEffect(() => {
    setSearchParams(removeUndefinedAttribute(conditionsData));
  }, [setSearchParams, conditionsData]);

  const fetchData = useCallback((conditions) => {
    authGetData({
      url: VITE_REACT_APP_API_MASTERDATA + USERALL,
      onSuccess: (res) => {
        if (res && res.statusCode === STATUS_200) {
          setRows(res.data);
          setTotal(res.paging.totalCount)
        }
      },
    });
  }, []);

  useEffect(() => {
    const obj = sortTableData(sorting)
    const conditions = {
      ...conditionsData,
      ...obj,
    }
    fetchData(conditions);
  }, [conditionsData, fetchData, sorting]);

  useEffect(() => {
    if (fetch) {
      fetchData(conditionsData);
      dispatch(setFetchData(false));
    }
  }, [conditionsData, dispatch, fetch, fetchData]);

  const [showSearchResults, setShowSearchResults] = useState(false);

  const [isSearch, setIsSearch] = useState(false);

  const handleSearch = useCallback(() => {
    const url = `${VITE_REACT_APP_API_MASTERDATA}${USERALL}?searchTerm=${valueSearch}`;
    const requestOptions = {
      method: 'GET',
      url,
    }
    axios(requestOptions)
    .then(response => {
      setSearchResults(response.data); // Lưu trữ kết quả tìm kiếm trong state
      setIsSearch(true);
    })
    .catch(error => {
      console.log('error', error);
    });
}, [valueSearch]);

  const handleClear = useCallback(() => {
    setValueSearch('');
    setSearchResults([]);
    setShowSearchResults(false);
    fetchData(conditionsData);
    dispatch(setFetchData(true));
  }, [dispatch, setValueSearch, fetchData, conditionsData]);

  const onChangeValue = (event) => {
    setValueSearch(event.target.value);
  };
  const handleCloseSearchResults = () => {
    // Đóng popup hoặc modal hiển thị kết quả tìm kiếm
    setShowSearchResults(false);
  };

  const onSubmitForm = useCallback(() => {
    let method = METHOD_POST;
    if (isCreate) method = METHOD_POST;
    else method = METHOD_PUT;
    authPostPutData({
      url: VITE_REACT_APP_API_MASTERDATA + USERCRT,
      method,
      payload: {
        userId: rowId,
        fullName: formik.values.fullName,
        userName: formik.values.userName,
        dateOfBirth: formik.values.dateOfBirth,
        email: formik.values.email,
        phoneNumber: formik.values.phoneNumber,
        address: formik.values.address,
        password: formik.values.password,
        passwordConfirm: formik.values.passwordConfirm,
        timezone: 'Hanoi',
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
    });
    console.log(formik.values)
  }, [dispatch, fetchData, formik, isCreate, rowId]);

  const renderModal = useCallback(
    () => (
      <FormCreateUpdate
        formik={formik}
        onSubmitForm={onSubmitForm}
        textBtn={isCreate ? t('button.create') : t('button.update')}
        initialValues={initialValues}
      />
    ),
    [formik, initialValues, isCreate, onSubmitForm, t]
  );

  return (
    <Templates
      rows={rows}
      columns={columns}
      title={t('nav.user')}
      titleModal={isCreate ? t('dialog.create_data') : t('dialog.update_data')}
      checkboxSelection={false}
      handleOpenModal={handleOpenModal}
      handleSearch={handleSearch}
      conditions={conditionsData}
      setConditions={setConditions}
      setValueSearch={setValueSearch}
      searchResults={searchResults}
      valueSearch={valueSearch}
      renderModal={renderModal}
      total={total}
      table={table}
      showSearchResults={showSearchResults}
      handleCloseSearchResults={handleCloseSearchResults}
      handleClear={handleClear}
      onChangeValue={onChangeValue}
      isSearch ={isSearch}
      renderButton
    />
  );
}