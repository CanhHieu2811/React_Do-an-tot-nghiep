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

import { TRIPALL } from 'src/api/master-data';
import {
  // setPopup,
  setFetchData,
  // setEqualForm,
  // setNotification,
  // setConfirmDialog,
} from 'src/redux/common';

import dayjs from 'dayjs';
import ThongTinThueXeTemplates from 'src/template/admin/thong-tin-thue-xe';
// import { values } from 'lodash';


export default function ThongTinThueXePages() {

  // PHẦN TÌM KIẾM VÀ HIỂN THỊ DỮ LIỆU Ở BẢNG

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
      component: (_, index) => ( index + 1 ),
    },
    {
      id: 'bikeCode',
      header: 'Mã xe',
      width: 100,
    },
    {
      id: 'statTime',
      header: 'Bắt đầu thuê',
      width: 100,
      align: 'right',
      component: (row) => <>{row.statTime ? dayjs(row.statTime).format('DD/MM/YYYY HH:mm') : ''}</>,
    },
    {
      id: 'startStation',
      header: 'Trạm bắt đầu',
      width: 100,
    },
    {
      id: 'minutesTraveled',
      header: 'Thời gian thuê',
      align: 'center',
      width: 100,
    },
    {
      id: 'tripPrice',
      header: 'Giá tiền',
      align: 'center',
      width: 100,
    },
  ];

  // gọi api lấy danh sách dữ liệu của bảng theo điều kiện biến conditions
  const fetchData = useCallback((conditions) => {
    // ĐÂY LÀ CÁCH GỌI 1 API GET
    authGetData({
      // buildQueryString => dùng để convert dạng ?xxx=1&bbb=2, parseParams => loại bỏ các biến undefined
      url: `${VITE_REACT_APP_API_MASTER_DATA + TRIPALL}?${buildQueryString(parseParams(conditions))}`,
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

  return (
      <ThongTinThueXeTemplates
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
        />
  );
}

