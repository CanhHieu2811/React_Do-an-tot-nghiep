import _ from 'lodash';
// import * as Yup from 'yup';
// import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { LoadingButton } from '@mui/lab';
import { Stack, Button } from '@mui/material';

import { setPopup, setEqualForm } from 'src/redux/common';

// import ErrorTextComponent from 'src/components/error-text';

export default function FormComponent(props) {
  const {
    // initialValues,
    // validationSchema,
    handleSubmitForm,
    formik,
    children,
    checkEqualForm = true,
    textBtn,
    initialValues
  } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // const equalForm = useSelector((state) => state.common.equalForm);

  const handleCheckEqualForm = useCallback(
    (values) => {
      console.log(1232, values, initialValues)
      if (checkEqualForm) {
        const equal = _.isEqual(initialValues, values);
        dispatch(setEqualForm(equal));
      } else dispatch(setEqualForm(true));
    },
    [checkEqualForm, dispatch, initialValues]
  );

  const handleClose = useCallback(() => {
    // if (!equalForm) {
    //   dispatch(
    //     setConfirmDialog({
    //       show: true,
    //       url: null,
    //       content: t('dialog.change_form'),
    //     })
    //   );
    // } else {
      dispatch(setPopup(false));
    // }
  }, [dispatch]);

  useEffect(() => {
    handleCheckEqualForm(formik.values);
  }, [handleCheckEqualForm, formik.values]);

  // const handleClick = () => {
  //   console.log(1232)
  // }
  // const onClick = useCallback(() => {
  //   handleSubmitForm()
  // }, [handleSubmitForm])
  const renderForm = useCallback(
    () => (
      <form onSubmit={e => e.preventDefault()}>
        {children}
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <LoadingButton
            size="small"
            type="submit"
            variant="contained"
            color="success"
            onClick={handleSubmitForm}
            // eslint-disable-next-line no-unneeded-ternary
            disabled={formik.errors && Object.keys(formik.errors).length ? true : false}
          >
            {textBtn}
          </LoadingButton>
          <Button onClick={handleClose} color="inherit" size="small">
            {t('button.close')}
          </Button>
        </Stack>
      </form>
    ),
    [children, formik.errors, handleClose, handleSubmitForm, t, textBtn]
  );
  return <>{renderForm()}</>;
}
FormComponent.propTypes = {
  formik: PropTypes.object,
  checkEqualForm: PropTypes.bool,
  textBtn: PropTypes.string,
  children: PropTypes.node,
  // valuesForm: PropTypes.object,
  handleSubmitForm: PropTypes.any,
  initialValues: PropTypes.object
};
