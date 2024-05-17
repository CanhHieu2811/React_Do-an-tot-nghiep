import login from './login.json';
import common from './common.json';
import register from './register.json';

const vn = {
  ...common,
  ...login,
  ...register
};

export { vn };
