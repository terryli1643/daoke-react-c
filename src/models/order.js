import modelExtend from 'dva-model-extend'

import * as recordService from '../services/order'
const { create, remove, query, recordFlow } = recordService
import { pageModel } from './common'

export default modelExtend(pageModel, {
  namespace: 'record',

  state: {
    list: [],
    flowData: [],
    currentItem: {},
    modalVisible: false,
    senderModalVisible: false,
    recipientModalVisible: false,
    modalType: 'create',
    isMotion: false,
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
    selectedRowKeys: [],
    activeTabKey: 1,
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

    *setRecipient ({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload })
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

    *'delete' ({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload })
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
    *create ({ payload }, { call, put }) {
      console.log('create')
      yield put({ type: 'hideModal' })

      const data = yield call(create, this.state.currentItem)
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

    *'recordFlow' ({ payload }, { call, put }) {
      const data = yield call(recordFlow, payload)
      if (data && data.success) {
        yield put({
          type: 'recordFlowSuccess',
          payload: {
            flowData: data.data,
          },
        })
      }
    },

    *switchIsMotion ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchIsMotion',
      })
    },
    *changeSelectedRowKeys ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSelectedRowKeysChanged',
        payload: {
          selectedRowKeys: payload,
        },
      })
    },
    *tabSwitch ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleTabSwitch',
        payload: {
          activeTabKey: payload,
        },
      })
    },
  },

  reducers: {
    recordFlowSuccess (state, action) {
      return { ...state, ...action.payload }
    },

    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    showSenderModal (state, action) {
      return { ...state, ...action.payload, senderModalVisible: true }
    },
    hideSenderModal (state) {
      return { ...state, senderModalVisible: false }
    },
    showRecipientModal (state, action) {
      return { ...state, ...action.payload, recipientModalVisible: true }
    },
    hideRecipientModal (state) {
      return { ...state, recipientModalVisible: false }
    },

    setCurrentItem (state, { payload }) {
      console.log(payload)
      const { currentItem } = payload
      return { ...state, currentItem }
    },
  },
})
