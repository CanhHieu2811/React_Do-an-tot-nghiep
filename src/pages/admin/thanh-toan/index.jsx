import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
// import dayjs from 'dayjs';


import { authGetData } from 'src/utils/request';
import { buildQueryString, parseParams } from 'src/utils/function';
import {
  PAGE_SIZE,
  PAGE_INDEX,
  STATUS_200,
  // METHOD_PUT,
  // METHOD_POST,
  // phoneRegExp,
  VITE_REACT_APP_API_MASTER_DATA,
} from 'src/utils/constant';

import { TRANSACTIONALL} from 'src/api/master-data';
import {
  // setPopup,
  setFetchData,
  setPopup,
  // setEqualForm,
  // setNotification,
  // setConfirmDialog,
} from 'src/redux/common';

import ThanhToanTemplates from 'src/template/admin/thanh-toan';
import { useTranslation } from 'react-i18next';
import DialogDelete from 'src/components/confirm-delete';
import dayjs from 'dayjs';

const initialValues = {
  key: '',
  values: '',
};

export default function NguoiDungPages() {
  // khai báo state đóng/mở dialog confirm xóa bảng
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  // set row id đang click
  // const [rowId, setRowId] = useState(null);
  // khai báo state đóng/mở dialog confirm xóa bảng

  // PHẦN TÌM KIẾM VÀ HIỂN THỊ DỮ LIỆU Ở BẢNG

  // biến để dịch
  const { t } = useTranslation();

  // lấy ra giá trị trong base theme

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
    // {
    //   // biến id để mapping với biến trong data trả về
    //   id: 'index',
    //   // hiển thị text của header bảng
    //   header: 'STT',
    //   // set độ dài của cột
    //   width: 50,
    //   // làm cột này cứng lại khi scroll ngang
    //   sticky: true,
    //   // căn giữa 'center', phải là 'right' còn nếu căn trái thì khỏi vì default là trái
    //   align: 'center',

    //   // biến này dùng để bật/tắt sort
    //   // sortable: true,
    // },
    {
      id: 'index',
      header: 'STT',
      width: 50,
      align: 'center',
      component: (_, index) => ( index + 1 )
    },
    {
      id: 'traderName',
      header: 'Tên người giao dịch',
      width: 100,
    },
    {
      id: 'transactionType',
      header: 'Loại giao dịch',
      width: 200,
    },
    {
      id: 'point',
      header: 'Số điểm',
      width: 100,
    },
    {
      id: 'createdDate',
      header: 'Ngày tạo',
      width: 100,
      align: 'right',
      component: (row) => <>{row.createdDate ? dayjs(row.createdDate).format('DD/MM/YYYY HH:mm') : ''}</>,
    },
  ];

  // gọi api lấy danh sách dữ liệu của bảng theo điều kiện biến conditions
  const fetchData = useCallback((conditions) => {
    // ĐÂY LÀ CÁCH GỌI 1 API GET
    authGetData({
      // buildQueryString => dùng để convert dạng ?xxx=1&bbb=2, parseParams => loại bỏ các biến undefined
      url: `${VITE_REACT_APP_API_MASTER_DATA + TRANSACTIONALL}?${buildQueryString(parseParams(conditions))}`,
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

  // const handleClickXoa = () => {
  //   // ĐÂY LÀ CÁCH GỌI 1 API XÓA METHOD DELETE
  //   startDelete({
  //     // truyền URL
  //     url: VITE_REACT_APP_API_MASTER_DATA + USERDEL,
  //     // payload nhận vào là id
  //     payload: { id: rowId },
  //     onSuccess: (res) => {
  //       // api trả về statusCode 200 là thành công
  //       if (res && res.statusCode === 200) {
  //         // show thông báo mà BE trả về ở biến message
  //         dispatch(
  //           setNotification({
  //             isShow: true,
  //             message: res?.message,
  //             status: 'success',
  //           })
  //         );

  //         // set fetch = true trong redux => gọi lại api fetchData dong 173
  //         dispatch(setFetchData(true));

  //         // close dialog
  //         setOpenDialogDelete(false)
  //       }
  //     },
  //   });
  // };
  // KẾT THÚC XÓA DỮ LIỆU BẢNG

  // TẠO/SỬA DỮ LIỆU

  // khai báo dữ liệu mặc định dòng 42

  // khai báo biến để nhận biết đang là tạo hay sửa form
  const [isCreate, setIsCreate] = useState(false);

  // validate form với các biến cần validate
  const validationSchema = Yup.object({
    key: Yup.string().required(),
    values: Yup.string().required()
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
        
      };
      create = false;
      // setRowId(row.id);
    } else {
      // ngược lại thì tạo gán data = dữ liệu mặc định
      data = {
        ...initialValues,
      };
      create = true;
      // setRowId(null);
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

//   const onSubmitForm = useCallback(() => {
//     let method = METHOD_POST;
//     const payload = {
//         key: rows.key,
//     };

//     if (isCreate) {
//         method = METHOD_POST;
//         payload.password = formik.values.password;
//         payload.passwordConfirm = formik.values.passwordConfirm;
//     } else {
//         method = METHOD_PUT;
//         payload.userId = rowId;
//     }
//     authPostPutData({
//         url: VITE_REACT_APP_API_MASTER_DATA + USERCRT,
//         method,
//         payload,
//         onSuccess: (res) => {
//             if (res && res.statusCode === STATUS_200) {
//                 dispatch(
//                     setNotification({
//                         show: true,
//                         message: res.message,
//                         status: 'success',
//                     })
//                 );
//                 dispatch(setPopup(false));
//           dispatch(setEqualForm(true));
//           formik.setValues({ ...initialValues });
//           fetchData();
//             }
//         },
//     });
// }, [dispatch, fetchData, formik, isCreate, rowId, rows]);

  // const onSubmitForm = useCallback(() => {
  //   let method = METHOD_POST;
  //   if (isCreate) method = METHOD_POST;
  //   else method = METHOD_PUT;
  //   authPostPutData({
  //     url: VITE_REACT_APP_API_MASTER_DATA + USERCRT,
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
  //         dispatch(setPopup(false));
  //         dispatch(setEqualForm(true));
  //         formik.setValues({ ...initialValues });
  //         fetchData(conditionsData);
  //       }
  //     },
  //   });
  // }, [conditionsData, dispatch, rowId, fetchData, formik, isCreate]);

  // const renderModal = useCallback(
  //   () => (
  //     <FormThaoTacDuLieu
  //       formik={formik}
  //       onSubmitForm={onSubmitForm}
  //       textBtn={isCreate ? 'Tạo' : 'Sửa'}
  //       initialValues={initialValues}
  //       isCreate={isCreate}
  //     />
  //   ),
  //   [formik, isCreate, onSubmitForm]
  // );

  // KẾT THÚC TẠO/SỬA DỮ LIỆU

  return (
    <>
      <ThanhToanTemplates
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
        btnClearTextSearch
        // kết thúc props hiển thị bảng

        // title popup
        titleModal={isCreate ? t('dialog.create_data') : t('dialog.update_data')}
        // render content trong popup
        // renderModal={renderModal}
        // truyền func cho nút tạo khi click
        handleOpenModal={handleOpenModal}
      />

      {/* dialog xóa */}
      <DialogDelete
        openDialog={openDialogDelete}
        handleClose={() => setOpenDialogDelete(false)}
        // handleAgree={handleClickXoa}
      >
        <p>Bạn chắc chắn muốn xóa dữ liệu này?</p>
      </DialogDelete>
      {/* end dialog xóa */}
    </>
  );
}