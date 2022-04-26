import {
  getToken,
  setToken,
  removeToken
} from 'utils/auth';
const user = {
  state: {
    name: '',
    state: '',
    roles: [],
  },

  mutations: {
    SET_TOKEN: (state, token1) => {
      state.token1 = token1;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    LOGIN_SUCCESS: () => {
      // console.log('login success')
    },
    LOGOUT_USER: state => {
      state.user = '';
    },
  },

  actions: {
  }
};

export default user;

