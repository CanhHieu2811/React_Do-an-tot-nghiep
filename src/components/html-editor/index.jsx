import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactQuill from 'react-quill';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-quill/dist/quill.snow.css';
import './custom-styles.css';

export default function EditorHTML(props) {
  const { onChange, initialValue, placeholder = '', formik, name } = props;

  const handleValue = (val) => {
    if (onChange) {
      onChange(val);
    }

    if (formik) {
      formik.setFieldValue(name, val);
    }
  };

  const formats = [
    // 'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    // 'color',
    // 'background',
  ];

  return (
    <ReactQuill
      theme="snow"
      name={name}
      placeholder={placeholder}
      value={initialValue}
      onChange={handleValue}
      modules={{
        toolbar: [
          // [],
          // [{ size: ['small', false, 'large', 'huge'] }, { font: [] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          [{ align: [] }],
        ],
      }}
      formats={formats}
      style={{ minHeight: '350px', height: '350px' }}
    />
  );
}

EditorHTML.propTypes = {
  initialValue: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  formik: PropTypes.object,
  name: PropTypes.string,
};
