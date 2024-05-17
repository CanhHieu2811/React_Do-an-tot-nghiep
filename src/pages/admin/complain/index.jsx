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

// import { USERALL } from 'src/api/master-data';
import Templates from 'src/template/admin/complain';
import FormDetail from 'src/template/admin/complain/form';
import { COMPLAINALL, COMPLAINDET, COMPLAINDEL } from 'src/api/master-data';
import { setPopup, setFetchData, setEqualForm, setNotification, setConfirmDialog } from 'src/redux/common';

import Iconify from 'src/components/iconify';

const initValues = {
  fullName: '',
  userName: '',
  email: '',
  phoneNumber: '',
  address: '',
  isSupper: '',
  password: '',
  passwordConfirm: '',
};
export default function ComplainPages() {
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
    fullName: Yup.string().required(t('validator.required')),
    userName: Yup.string().required(t('validator.required')),
    dateOfBirth: Yup.date().required(t('validator.required')),
    email: Yup.string().email(t('validator.email.format')).required(t('validator.required')),
    phoneNumber: Yup.string().matches(phoneRegExp, t('validator.phone')).required(t('validator.required')),

    // thay đổi yup để chia form giữa create và update
    password: Yup.string().when('isCreate', {
      is: true,
      then: Yup.string().min(8, t('validator.min_8')).required(t('validator.required')),
      otherwise: Yup.string(),
    }),
    passwordConfirm: Yup.string().when(['isCreate', 'password'], {
      is: (create, password) => create && !!password, 
      then: Yup.string().required(t('validator.required')).oneOf([Yup.ref('password'), null], t('validator.match_password')),
      otherwise: Yup.string(),
    }),
    
    address: Yup.string().max(255, t('validator.max_255')).required(t('validator.required'))
    
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
      size: 100,
      enableSorting: false,
      accessorFn: (_, rowIndex) => rowIndex + 1, // Hàm truy xuất sẽ trả về số thứ tự cho mỗi hàng
    },
    {
      accessorKey: 'senderUsername',
      header: t('field.name'),
      size: 400,
      enableSorting: false,
    },
    {
      accessorKey: 'content',
      header: t('field.content'),
      size: 400,
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
            icon="icon-park-outline:doc-detail"
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
          userId: row.id,
          fullName: row.fullName,
          userName: row.userName,
          dateOfBirth: row.dateOfBirth,
          phoneNumber: row.phoneNumber,
          email: row.email,
          address: row.address,
          isSupperAdmin: true
          
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
        url: VITE_REACT_APP_API_MASTERDATA + COMPLAINDEL,
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
      url: VITE_REACT_APP_API_MASTERDATA + COMPLAINALL,
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
    const payload = {
        fullName: formik.values.fullName,
        userName: formik.values.userName,
        dateOfBirth: formik.values.dateOfBirth,
        email: formik.values.email,
        phoneNumber: formik.values.phoneNumber,
        address: formik.values.address,
        timezone: 'Hanoi',
        isSupperAdmin: true
    };

    if (isCreate) {
        method = METHOD_POST;
        payload.password = formik.values.password;
        payload.passwordConfirm = formik.values.passwordConfirm;
    } else {
        method = METHOD_PUT;
        payload.userId = rowId;
    }
    authPostPutData({
        url: VITE_REACT_APP_API_MASTERDATA + COMPLAINDET,
        method,
        payload,
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
}, [dispatch, fetchData, formik, isCreate, rowId]);

  // const onSubmitForm = useCallback(() => {
  //   let method = METHOD_POST;
  //   if (isCreate) method = METHOD_POST;
  //   else method = METHOD_PUT;
  //   authPostPutData({
  //     url: VITE_REACT_APP_API_MASTERDATA + USERCRT,
  //     method,
  //     payload: {
  //       userId: rowId,
  //       fullName: formik.values.fullName,
  //       userName: formik.values.userName,
  //       dateOfBirth: formik.values.dateOfBirth,
  //       email: formik.values.email,
  //       phoneNumber: formik.values.phoneNumber,
  //       address: formik.values.address,
  //       password: formik.values.password,
  //       passwordConfirm: formik.values.passwordConfirm,
  //       timezone: 'Hanoi',
  //       isSupperAdmin: true
  //     },
  //     onSuccess: (res) => {
  //       if (res && res.statusCode === STATUS_200) {
  //         dispatch(
  //           setNotification({
  //             show: true,
  //             message: res.message,
  //             status: 'success',
  //           })
  //         );
  //         dispatch(setPopup(false))
  //         dispatch(setEqualForm(true))
  //         formik.setValues({...initValues})
  //         fetchData()
  //       }
  //     },
  //   }); console.log(formik.values)
  // }, [dispatch, fetchData, formik, isCreate, rowId]);
  // render form create/update
  const renderModal = useCallback(
    () => (
      <FormDetail
        formik={formik}
        onSubmitForm={onSubmitForm}
        textBtn={t('button.complain')}
        initialValues={initialValues}
      />
    ),
    [formik, initialValues, onSubmitForm, t]
  );

  return (
    <Templates
      rows={rows}
      columns={columns}
      title={t('nav.complain')}
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
