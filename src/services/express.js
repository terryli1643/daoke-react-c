import { request, config } from '../utils'
const { api } = config
const { expressTracing } = api

export async function tracing (params) {
  return request({
    url: `${expressTracing}/YD/${params.value}`,
    method: 'post',
  })
}
