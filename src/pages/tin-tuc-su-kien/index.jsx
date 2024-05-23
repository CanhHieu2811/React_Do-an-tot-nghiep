import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { authGetData } from 'src/utils/request';
import { parseParams } from 'src/utils/function';
import { PAGE_SIZE, PAGE_INDEX, STATUS_200, VITE_REACT_APP_API_MASTER_DATA } from 'src/utils/constant';
import { EVENTALL, EVENTDET } from 'src/api/master-data';
import { setFetchData } from 'src/redux/common';
import TinTucSuKienTrangChuTemplates from 'src/template/tin-tuc-su-kien';

export default function TinTucSuKienPages() {
  const location = useLocation();
  const dispatch = useDispatch();
  const fetch = useSelector((state) => state.common.fetchData);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null); // State để lưu chi tiết tin tức

  const [conditionsData, setConditions] = useState({
    pageIndex: PAGE_INDEX,
    pageSize: PAGE_SIZE,
    searchTerm: '',
    ...parseParams(location.search),
  });

  const [valueSearch, setValueSearch] = useState('');

  const fetchData = useCallback((conditions) => {
    authGetData({
      url: VITE_REACT_APP_API_MASTER_DATA + EVENTALL,
      onSuccess: (res) => {
        if (res && res.statusCode === STATUS_200) {
          setRows(res.data);
          setTotal(res.paging.totalCount);
        }
      },
    });
  }, []);

  useEffect(() => {
    fetchData(conditionsData);
  }, [conditionsData, fetchData]);

  useEffect(() => {
    if (fetch) {
      fetchData(conditionsData);
      dispatch(setFetchData(false));
    }
  }, [conditionsData, dispatch, fetch, fetchData]);

  const handleSearch = useCallback(() => {
    setConditions((oldState) => ({
      ...oldState,
      searchTerm: valueSearch,
      pageIndex: PAGE_INDEX,
      pageSize: PAGE_SIZE,
    }));
  }, [valueSearch]);

  const handleClear = useCallback(() => {
    setValueSearch('');
    setConditions({
      pageIndex: PAGE_INDEX,
      pageSize: PAGE_SIZE,
    });
  }, [setConditions]);

  const fetchEventDetail = useCallback((eventId) => {
    authGetData({
      url: `${VITE_REACT_APP_API_MASTER_DATA + EVENTDET}?Id=${eventId}`,
      method: 'GET',
      onSuccess: (res) => {
        if (res && res.statusCode === STATUS_200) {
          setSelectedEvent(res.data);
        }
      },
    });
  }, []);

  return (
    <TinTucSuKienTrangChuTemplates
      rows={rows}
      handleSearch={handleSearch}
      conditions={conditionsData}
      setConditions={setConditions}
      setValueSearch={setValueSearch}
      valueSearch={valueSearch}
      total={total}
      handleClear={handleClear}
      renderButton
      btnClearTextSearch
      fetchEventDetail={fetchEventDetail} // Truyền hàm này vào template
      selectedEvent={selectedEvent} // Truyền state này vào template
    />
  );
}
