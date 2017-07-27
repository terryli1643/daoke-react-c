import { request, config } from '../utils'
const { api } = config
const { contact, contacts } = api

// export async function query (params) {
//   return request({
//     url: contact,
//     method: 'get',
//     data: params,
//   })
// }

export async function queryAll (params) {
  return request({
    url: contacts,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: contact,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: contact,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: contact,
    method: 'patch',
    data: params,
  })
}
