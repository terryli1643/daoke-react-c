import { request, config } from '../utils'
const { api } = config
const { userRegister } = api

export async function register (data) {
  return request({
    url: userRegister,
    method: 'post',
    data,
  })
}

// export async function login (params) {
//   return request({
//     url: userLogin,
//     method: 'post',
//     data: params,
//   })
// }
