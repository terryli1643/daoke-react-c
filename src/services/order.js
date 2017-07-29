import { request, config } from '../utils'
const { api } = config
const { record, flow } = api

export async function query (params) {
  return request({
    url: record,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: record,
    method: 'post',
    data: params,
  })
}

export async function recordFlow (params) {
  console.log(params)
  return request({
    url: flow,
    method: 'get',
    data: params,
  })
}
