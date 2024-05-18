// import _ from 'lodash';
// import * as Yup from 'yup';
// import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingButton } from '@mui/lab';
import { Card, Stack, Button } from '@mui/material';

import { setPopup, setConfirmDialog } from 'src/redux/common';

// import ErrorTextComponent from 'src/components/error-text';

export default function FormComponent(props) {
  const {
    // initialValues,
    // validationSchema,
    handleSubmitForm,
    formik,
    children,
    // checkEqualForm = true,
    textBtn,
    // initialValues,
    customClose,
  } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const equalForm = useSelector((state) => state.common.equalForm);
  const loading = useSelector((state) => state.common.loading);
  const handleCheckEqualForm = useCallback(
    (values) => {
      // if (checkEqualForm) {
      //   const equal = _.isEqual(initialValues, values);
      //   dispatch(setEqualForm(equal));
      // } else dispatch(setEqualForm(true));
    },
    []
  );

  const handleClose = useCallback(() => {
    if (!equalForm) {
      dispatch(
        setConfirmDialog({
          show: true,
          url: null,
          content: t('dialog.change_form'),
        })
      );
    } else {
      dispatch(setPopup(false));
    }
  }, [dispatch, equalForm, t]);

  useEffect(() => {
    handleCheckEqualForm(formik.values);
  }, [handleCheckEqualForm, formik.values]);

  const renderForm = useCallback(
    () => (
      <form onSubmit={(e) => e.preventDefault()} style={{ position: 'relative' }}>
        <Card sx={{ padding: 2, borderRadius: 0 }}>
          <Stack>
            {children}
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{
                mb: 2,
                marginTop: '3rem',
                bottom: 0,
                textAlign: 'center',
                width: '100%',
              }}
            >
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmitForm}
                // eslint-disable-next-line no-unneeded-ternary
                disabled={formik.errors && Object.keys(formik.errors).length ? true : false}
                loading={loading}
                sx={{ width: '100px' }}
              >
                {textBtn}
              </LoadingButton>
              <Button
                onClick={customClose ?? handleClose}
                sx={{ background: '#DFE3E8', color: '#000000', width: '100px' }}
              >
                Đóng lại
              </Button>
            </Stack>
          </Stack>
        </Card>
      </form>
    ),
    [children, formik.errors, handleClose, handleSubmitForm, loading, textBtn, customClose]
  );
  return <>{renderForm()}</>;
}
FormComponent.propTypes = {
  formik: PropTypes.object,
  // checkEqualForm: PropTypes.bool,
  textBtn: PropTypes.string,
  children: PropTypes.node,
  // valuesForm: PropTypes.object,
  handleSubmitForm: PropTypes.any,
  // initialValues: PropTypes.object,
  customClose: PropTypes.func,
};
