import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
// import dayjs from 'dayjs';

import { Box } from '@mui/material';

import { authGetData, authPostPutData, startDelete } from 'src/utils/request';
import { buildQueryString, parseParams } from 'src/utils/function';
import {
  PAGE_SIZE,
  PAGE_INDEX,
  STATUS_200,
  // METHOD_PUT,
  // METHOD_POST,
  // phoneRegExp,
  VITE_REACT_APP_API_MASTER_DATA,
  METHOD_POST,
  METHOD_PUT,
} from 'src/utils/constant';

import { STATIONALL, STATIONCRT, STATIONDEL } from 'src/api/master-data';
import {
  setEqualForm,
  // setPopup,
  setFetchData,
  setNotification,
  setPopup,
  // setEqualForm,
  // setNotification,
  // setConfirmDialog,
} from 'src/redux/common';

import Iconify from 'src/components/iconify';
import TramTemplates from 'src/template/admin/tram';
import { useTranslation } from 'react-i18next';
import DialogDelete from 'src/components/confirm-delete';
import FormThaoTacDuLieu from 'src/template/admin/tram/form';

const initialValues = {
  stationName: '',
  numOfSeats: '',
  locationName: '',
  longitude: '',
  latitude: '',
  statusId: null,
};

export default function TramPages() {
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  // set row id đang click
  const [rowId, setRowId] = useState(null);
  // khai báo state đóng/mở dialog confirm xóa bảng

  // PHẦN TÌM KIẾM VÀ HIỂN THỊ DỮ LIỆU Ở BẢNG

  // biến để dịch
  const { t } = useTranslation();

  // lấy ra giá trị trong base theme
  const theme = useTheme();

  // các biến dùng trong url
  const location = useLocation();

  // gọi tới hành động trong redux
  const dispatch = useDispatch();

  // biến dịch ngôn ngữ
  // const { t } = useTranslation();

  // fetch lại data khi xóa lấy từ trong redux
  const fetch = useSelector((state) => state.common.fetchData);

  // dữ liệu bảng
  const [rows, setRows] = useState([]);
  // tổng dữ liệu
  const [total, setTotal] = useState(0);

  // khai báo state điều kiện tìm kiếm dữ liệu
  const [conditionsData, setConditions] = useState({
    pageIndex: PAGE_INDEX,
    pageSize: PAGE_SIZE,
    searchTerm: '',
    ...parseParams(location.search),
  });

  // khai báo state để nhận dữ liệu tìm kiếm
  const [valueSearch, setValueSearch] = useState('');

  // khai báo cột của bảng
  const columns = [
    {
      // biến id để mapping với biến trong data trả về
      id: 'index',
      // hiển thị text của header bảng
      header: t('STT'),
      // set độ dài của cột
      width: 50,
      // làm cột này cứng lại khi scroll ngang
      sticky: true,
      // căn giữa 'center', phải là 'right' còn nếu căn trái thì khỏi vì default là trái
      align: 'center',

      // biến này dùng để bật/tắt sort
      // sortable: true,
    },
    {
      id: 'stationName',
      header: t('field.stationName'),
      width: 200,
    },
    {
      id: 'quantityAvaiable',
      header: t('field.quantityAvaiable'),
      width: 100,
    },
    {
      id: 'numOfSeats',
      header: t('field.numOfSeats'),
      width: 100,
    },
    {
      id: 'locationName',
      header: t('field.locationName'),
      width: 200,
    },
    {
      id: 'longitude',
      header: t('field.longitude'),
      width: 150,
    },
    {
      id: 'latitude',
      header: t('field.latitude'),
      width: 150,
    },
    {
      id: 'statusName',
      header: t('field.statusName'),
      width: 100,
    },
    {
      id: 'actions',
      type: 'actions',
      header: '',
      width: 100,
      align: 'center',
      sticky: true,
      // biến này là 1 function dùng để custom lại phần hiển thị body của bảng
      component: (row) => (
        <Box sx={{ textAlign: 'center' }}>
          <Iconify
            icon="eva:edit-fill"
            sx={{ mr: 2, height: 20, color: theme.palette.primary.main, cursor: 'pointer' }}
            // mở popup form sửa dữ liệu
            onClick={() => handleOpenModal(row)}
          />
          <Iconify
            icon="eva:trash-2-outline"
            sx={{ height: 20, color: theme.palette.error.main, cursor: 'pointer' }}
            // xóa dữ liệu với hàng đang chọn
            onClick={() => handleDelete(row.id)}
          />
        </Box>
      ),
    },
  ];

  const [statusList, setStatusList] = useState([]);
  // gọi api lấy danh sách status truyền vào dropdown
  useEffect(() => {
    fetchDataStatus();
  }, []);

  const fetchDataStatus = () => {
    authGetData({
      url: 'https://localhost:7103/master-data/api/status/list',
      onSuccess: (res) => {
        if (res && res.statusCode === STATUS_200) {
          setStatusList(res.data);
        }
      },
    });
  };

  // gọi api lấy danh sách dữ liệu của bảng theo điều kiện biến conditions
  const fetchData = useCallback((conditions) => {
    // ĐÂY LÀ CÁCH GỌI 1 API GET
    authGetData({
      // buildQueryString => dùng để convert dạng ?xxx=1&bbb=2, parseParams => loại bỏ các biến undefined
      url: `${VITE_REACT_APP_API_MASTER_DATA + STATIONALL}?${buildQueryString(parseParams(conditions))}`,
      onSuccess: (res) => {
        if (res && res.statusCode === STATUS_200) {
          setRows(res.data);
          setTotal(res.paging.totalCount);
        }
      },
    });
  }, []);
  // gọi API fetchData khi state conditionsData thay đổi, mới vào sẽ gọi 1 lần rồi sau đó khi nào biến conditionsData thay đổi thì effect này sẽ gọi lại
  useEffect(() => {
    fetchData(conditionsData);
  }, [conditionsData, fetchData]);

  // khi nào redux biến fetch = true thì gọi lại api fetchData, cái này gọi đc set sau khi xóa dữ liệu
  useEffect(() => {
    if (fetch) {
      fetchData(conditionsData);
      dispatch(setFetchData(false));
    }
  }, [conditionsData, dispatch, fetch, fetchData]);

  // click tìm kiếm dữ liệu thì hàm này sẽ set state conditionsData => state thay đổi => chạy effect gọi api dòng 147
  const handleSearch = useCallback(() => {
    setConditions((oldState) => ({
      ...oldState,
      searchTerm: valueSearch,
      pageIndex: PAGE_INDEX,
      pageSize: PAGE_SIZE,
    }));
  }, [valueSearch]);

  const handleClear = useCallback(() => {
    // set biến searchTerm = rỗng, clear lại dữ liệu ở ô input
    setValueSearch('');

    // set lại state conditionsData về giá trị như lúc mới vào trang => state thay đổi => chạy effect gọi api dòng 147
    setConditions({
      pageIndex: PAGE_INDEX,
      pageSize: PAGE_SIZE,
    });
  }, [setConditions]);

  // KẾT THÚC PHẦN TÌM KIẾM VÀ HIỂN THỊ DỮ LIỆU Ở BẢNG

  // XÓA DỮ LIỆU BẢNG
  const handleDelete = (id) => {
    // set id của row đang click
    setRowId(id);

    // mở dialog confirm xóa
    setOpenDialogDelete(true);
    // dispatch(
    //   setConfirmDialog({
    //     show: true,
    //     url: `${VITE_REACT_APP_API_MASTER_DATA + USERDEL}?id=${id}`,
    //   })
    // );
  };

  const handleClickXoa = () => {
    // ĐÂY LÀ CÁCH GỌI 1 API XÓA METHOD DELETE
    startDelete({
      // truyền URL
      url: VITE_REACT_APP_API_MASTER_DATA + STATIONDEL,
      // payload nhận vào là id
      payload: { id: rowId },
      onSuccess: (res) => {
        // api trả về statusCode 200 là thành công
        if (res && res.statusCode === 200) {
          // show thông báo mà BE trả về ở biến message
          dispatch(
            setNotification({
              isShow: true,
              message: res?.message,
              status: 'success',
            })
          );

          // set fetch = true trong redux => gọi lại api fetchData dong 173
          dispatch(setFetchData(true));

          // close dialog
          setOpenDialogDelete(false);
        }
      },
    });
  };
  // KẾT THÚC XÓA DỮ LIỆU BẢNG

  // TẠO/SỬA DỮ LIỆU

  // khai báo dữ liệu mặc định dòng 42

  // khai báo biến để nhận biết đang là tạo hay sửa form
  const [isCreate, setIsCreate] = useState(false);

  // validate form với các biến cần validate
  const validationSchema = Yup.object({
    stationName: Yup.string().required(t('validator.required')),
    numOfSeats: Yup.string()
      .required(t('validator.required'))
      .matches(/^\d+$/, t('validator.numeric')), // Chỉ chấp nhận các ký tự số
    locationName: Yup.string().required(t('validator.required')),
    longitude: Yup.string().required(t('validator.required')),
    latitude: Yup.string().required(t('validator.required')),
    statusId: Yup.string().required(t('validator.required')),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
  });

  const handleOpenModal = (row) => {
    // reset form khi mở popup
    formik.resetForm();

    // biến tạo/sửa
    let create = false;

    // biến dữ liệu để
    let data = {};

    // chỉnh sửa vì row truyền vào có dữ liệu
    if (Object.keys(row).length) {
      data = {
        stationId: row.id,
        stationName: row.stationName,
        numOfSeats: row.numOfSeats,
        locationName: row.locationName,
        longitude: row.longitude,
        latitude: row.latitude,
        statusId: statusList.find((el) => el.id === row.statusId),
      };
      create = false;
      setRowId(row.id);
    } else {
      // ngược lại thì tạo gán data = dữ liệu mặc định
      data = {
        ...initialValues,
      };
      create = true;
      setRowId(null);
    }

    // set data vào formik
    formik.setValues({
      ...data,
    });

    // set biến create
    setIsCreate(create);

    // mở popup
    dispatch(setPopup(true));
  };

  const onSubmitForm = useCallback(() => {
    let method = METHOD_POST;
    if (isCreate) method = METHOD_POST;
    else method = METHOD_PUT;
    authPostPutData({
      url: VITE_REACT_APP_API_MASTER_DATA + STATIONCRT,
      method,
      payload: {
        stationId: rowId,
        stationName: formik.values.stationName,
        numOfSeats: formik.values.numOfSeats,
        locationName: formik.values.locationName,
        longitude: formik.values.longitude,
        latitude: formik.values.latitude,
        statusId: formik.values.statusId.id,
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
          dispatch(setPopup(false));
          dispatch(setEqualForm(true));
          formik.setValues({ ...initialValues });
          fetchData(conditionsData);
        }
      },
    });
  }, [conditionsData, dispatch, rowId, fetchData, formik, isCreate]);

  const renderModal = useCallback(
    () => (
      <FormThaoTacDuLieu
        formik={formik}
        onSubmitForm={onSubmitForm}
        textBtn={isCreate ? 'Tạo' : 'Sửa'}
        initialValues={initialValues}
        statusList={statusList}
      />
    ),
    [formik, isCreate, onSubmitForm, statusList]
  );

  // KẾT THÚC TẠO/SỬA DỮ LIỆU
  return (
    <>
      <TramTemplates
        // phần props hiển thị bảng
        rows={rows}
        columns={columns}
        handleSearch={handleSearch}
        conditions={conditionsData}
        setConditions={setConditions}
        setValueSearch={setValueSearch}
        valueSearch={valueSearch}
        total={total}
        handleClear={handleClear}
        renderButton
        btnClearTextSearch
        // kết thúc props hiển thị bảng

        // title popup
        titleModal={isCreate ? t('dialog.create_data') : t('dialog.update_data')}
        // render content trong popup
        renderModal={renderModal}
        // truyền func cho nút tạo khi click
        handleOpenModal={handleOpenModal}
      />

      {/* dialog xóa */}
      <DialogDelete
        openDialog={openDialogDelete}
        handleClose={() => setOpenDialogDelete(false)}
        handleAgree={handleClickXoa}
      >
        <p>Bạn chắc chắn muốn xóa dữ liệu này?</p>
      </DialogDelete>
      {/* end dialog xóa */}
    </>
  );
}
