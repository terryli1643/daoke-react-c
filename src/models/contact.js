import modelExtend from 'dva-model-extend'

import * as contactService from '../services/contact'
import { pageModel } from './common'

const { query, create, remove, update, queryAll } = contactService

export default modelExtend(pageModel, {
  namespace: 'contact',

  state: {
    list: [],
    currentItem: {},
  },

  effects: {

    *query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },

    *'delete' ({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.contact)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ contact }) => contact.currentItem.id)
      const newContact = { ...payload, id }
      const data = yield call(update, newContact)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *queryAll ({ payload }, { call, put }) {
      const data = yield call(queryAll)
      if (data.success) {
        yield put({ type: 'querySuccess' })
      } else {
        throw data
      }
    },
  },

  reducers: {
    querySuccess (state, { payload: contact }) {
      return {
        ...state,
        contact,
      }
    },
  },
})
