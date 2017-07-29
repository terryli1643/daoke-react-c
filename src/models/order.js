import modelExtend from 'dva-model-extend'
import * as orderService from '../services/order'
const { query, create } = orderService
import { pageModel } from './common'

export default modelExtend(pageModel, {
  namespace: 'order',

  state: {
    list: [],
    flowData: [],
    currentItem: {},
    modalVisible: false,
    modalType: '',
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/record/query') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {
    *query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.result.orders,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.result.totalPage,
            },
          },
        })
      }
    },
    *'create' ({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' })
      const currentItem = yield select(({ order }) => order.currentItem)
      console.log(currentItem)
      const data = yield call(create, currentItem)
      console.log(data)
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.page.total,
              current: data.page.current,
            },
          },
        })
      }
    },
  },

  reducers: {
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    setCurrentItem (state, { payload }) {
      const { currentItem } = payload
      return { ...state, currentItem }
    },
  },
})
