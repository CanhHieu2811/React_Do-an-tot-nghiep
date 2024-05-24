import React, { useState, useEffect } from 'react';
import TrangChuTemplates from 'src/template/trang-chu';
import { authGetData } from 'src/utils/request';
import { VITE_REACT_APP_API_MASTER_DATA, STATUS_200 } from 'src/utils/constant';
import { BANNERDET } from 'src/api/master-data';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { setNotification } from 'src/redux/common';

const initialValues = {
  id: 1, // Đảm bảo id ban đầu không null
  type: 'Web', // Đảm bảo type ban đầu không null
};

export default function TrangChuPages() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
  });

  const [bannerData, setBannerData] = useState({ tilte: '', image: '', type: '' });

  useEffect(() => {
    if (formik.values.id && formik.values.type) {
      authGetData({
        url: `${VITE_REACT_APP_API_MASTER_DATA}${BANNERDET}?id=${formik.values.id}&type=${formik.values.type}`,
        payload: { id: formik.values.id, type: formik.values.type },
        onSuccess: (res) => {
          console.log('API Response:', res); // Log phản hồi từ API
          if (res && res.statusCode === STATUS_200) {
            if (res.data) {
              setBannerData({
                id: res.data.id,
                tilte: res.data.tilte,
                image: res.data.image,
                type: res.data.type,
              });
              console.log('Banner Data Set:', {
                tilte: res.data.tilte,
                image: res.data.image,
                type: res.data.type,
              });
            } else {
              console.error('Data is null');
            }
            dispatch(
              setNotification({
                isShow: true,
                message: res?.message,
                status: 'success',
              })
            );
          } else {
            console.error('Invalid response:', res);
          }
        },
      });
    }
  }, [formik.values.id, formik.values.type, dispatch]);

  console.log('Banner Data:', bannerData);

  return <TrangChuTemplates bannerData={bannerData} />;
}
