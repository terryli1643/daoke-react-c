import { register } from '../services/register'

export default {
  namespace: 'register',
  state: {
    registerLoading: false,
  },

  effects: {
    *register ({
      payload,
    }, { put, call }) {
      yield put({ type: 'showRegisterLoading' })
      payload = {
        ...payload,
        appId: 'C_SITE',
        siteIdentityCode: 'abc222',
      }
      const data = yield call(register, payload)
      yield put({ type: 'hideRegisterLoading' })

      if (data.success) {
        yield put({
          type: 'login/login',
          payload,
        })
      } else {
        throw data
      }
    },
  },
  reducers: {
    showRegisterLoading (state) {
      return {
        ...state,
        registerLoading: true,
      }
    },
    hideRegisterLoading (state) {
      return {
        ...state,
        registerLoading: false,
      }
    },
  },
}
