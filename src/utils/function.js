import { ORDER_BY, ORDER_BY_DESC } from './constant';

export const parseParams = (querystring) => {
  const params = new URLSearchParams(querystring);
  const obj = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const key of params.keys()) {
    if (params.getAll(key).length > 1) {
      if (params.get(key) !== 'undefined') obj[key] = params.getAll(key);
    } else if (params.get(key) !== 'undefined') obj[key] = params.get(key);
  }

  return obj;
};

export const removeUndefinedAttribute = (obj) => {
  const params = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      params[key] = obj[key];
    }
    return {};
  });
  return params;
};

export function buildQueryString(object) {
  if (typeof object !== 'object') return '';
  const args = [];
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in object) {
    destructure(key, object[key]);
  }
  return args.join('&');

  function destructure(key, value) {
    if (key && (value || value === false || value === 0)) {
      if (Array.isArray(value)) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < value.length; i++) {
          destructure(`${key}[${i}]`, value[i]);
        }
      } else if (toString(value) === '[object Object]') {
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const i in value) {
          destructure(`${key}[${i}]`, value[i]);
        }
      } else
        args.push(
          encodeURIComponent(key) +
            (value != null && value !== '' && value !== undefined
              ? `=${encodeURIComponent(value)}`
              : '')
        );
    }
  }
}

export function sortTableData(sorting) {
  let sortKey = ORDER_BY;
  let currentKey = ORDER_BY_DESC;
  if (Object.keys(sorting).length > 0) {
    if (sorting.order === 'desc') {
      sortKey = ORDER_BY_DESC;
      currentKey = ORDER_BY;
    } else {
      sortKey = ORDER_BY;
      currentKey = ORDER_BY_DESC;
    }
  }
  const obj = {
    sortKey,
    currentKey,
  };
  return obj;
  // setConditions((oldState) => ({
  //   ...oldState,
  //   [sortKey]: sorting.length && sorting[0].id ? sorting[0].id : undefined,
  //   [currentKey]: undefined,
  // }));
}

export const stringToSlug = (str) => {
  const from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ';
  const to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
  // eslint-disable-next-line no-plusplus
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], 'gi'), to[i]);
  }

  str = str
    .toLowerCase()
    .trim()
    .replace(/[,.*+?^${}()|[\]\\]/g, '')
    .split(' ').map((el, i) => i ===0 ? el.charAt(0).toLowerCase() + el.slice(1) : el.charAt(0).toUpperCase() + el.slice(1)).join("")
  return str;
};
