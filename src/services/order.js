import { request, config } from '../utils'
const { api } = config
const { order, orders, flow } = api

export async function query (params) {
  return request({
    url: orders,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: order,
    method: 'post',
    data: params,
  })
}

export async function orderFlow (params) {
  console.log(params)
  return request({
    url: flow,
    method: 'get',
    data: params,
  })
}
