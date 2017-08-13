import modelExtend from 'dva-model-extend'

import * as contactService from '../services/contact'
import { pageModel } from './common'

const { create, remove, update, queryAll } = contactService

export default modelExtend(pageModel, {
  namespace: 'contact',

  state: {
    recipientContacts: [{
      name: 'lizhen',
      phone: '18113039957',
      region: ['四川省', '成都市', '武侯区'],
      address: '华阳麓山大道',
      company: 'ffdsafdsa',
    }],
    senderContacts: [{
      name: 'lizhen2',
      phone: '18113039927',
      region: ['四川省', '成都市', '武侯区'],
      address: '华阳麓山大道22',
      company: 'ffdsafdsa2',
    }],
    currentItem: {},
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/account/addressbook') {
          dispatch({
            type: 'queryAll',
            payload: location.query,
          })
        }
      })
    },

  },
  effects: {

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
        yield put({ type: 'queryAll' })
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
      const data = yield call(queryAll, payload)
      if (data.success) {
        yield put({ type: 'querySuccess', payload: { ...data, contactType: payload.type } })
      } else {
        throw data
      }
    },
  },

  reducers: {
    querySuccess (state, { payload: { contact, contactType } }) {
      if (contactType === 0 && contact) {
        return {
          ...state,
          recipientContacts: contact,
        }
      }
      if (contact) {
        return {
          ...state,
          senderContacts: contact,
        }
      }

      return {
        ...state,
      }
    },
  },
})
