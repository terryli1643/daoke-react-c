const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

let orderFlowData = Mock.mock({
  'data|10': [
    {
      time: '@datetime',
      data: '@county(true)',
    },
  ],
  page: {
    total: 1,
    current: 1,
  },
})

let orderListDate = Mock.mock({
  'data|80-100': [
    {
      'id|+1': 1,
      senderName: '@cname',
      senderMobile: /^1[34578]\d{9}$/,
      receiverName: '@cname',
      receiverMobile: /^1[34578]\d{9}$/,
      receiverAddress: '@county(true)',
      'trackingNumber|1000000000-9999999999': 1,
      'type|1': [ '普通件', '刷单件' ],
      'orderNumber|1000000000-9999999999': 1,
      content: '@csentence',
      time: '@datetime'
    },
  ],
  page: {
    total: 100,
    current: 1,
  },
})

module.exports = {

  [`GET ${apiPrefix}/order/query`] (req, res) {
    const page = req.query
    const pageSize = page.pageSize || 10
    const currentPage = page.page || 1

    let data
    let newPage

    let newData = orderListDate.data.concat()
    if (page.keyword || page.timeRange) {
      const d = newData.filter((item) => {
        let result1 = item['senderName'].indexOf(decodeURI(page.keyword));
        let result2 = item['senderMobile'].toString().indexOf(decodeURI(page.keyword));
        let result3 = item['receiverName'].indexOf(decodeURI(page.keyword));
        let result4 = item['receiverMobile'].toString().indexOf(decodeURI(page.keyword));
        let result5 = item['trackingNumber'].toString().indexOf(decodeURI(page.keyword));
        let result6 = item['orderNumber'].toString().indexOf(decodeURI(page.keyword));
        return result1 > -1 || result2 > -1 || result3 > -1 || result4 > -1 || result5 > -1 || result6 > -1;
      })

      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize)

      newPage = {
        current: currentPage * 1,
        total: d.length,
      }
    } else {
      data = orderListDate.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      orderListDate.page.current = currentPage * 1
      newPage = orderListDate.page
    }
    res.json({
      success: true,
      data,
      page: {
        ...newPage,
        pageSize: Number(pageSize),
      },
    })
  },

  [`POST ${apiPrefix}/order`] (req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.avatar = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.nickName.substr(0, 1))

    newData.id = orderListDate.data.length + 1
    orderListDate.data.unshift(newData)

    orderListDate.page.total = orderListDate.data.length
    orderListDate.page.current = 1

    res.json({ success: true, data: orderListDate.data, page: orderListDate.page })
  },

  [`DELETE ${apiPrefix}/order`] (req, res) {
    const deleteItem = req.body

    orderListDate.data = orderListDate.data.filter((item) => {
      if (item.id === deleteItem.id) {
        return false
      }
      return true
    })

    orderListDate.page.total = orderListDate.data.length

    res.json({ success: true, data: orderListDate.data, page: orderListDate.page })
  },

  [`PUT ${apiPrefix}/order`] (req, res) {
    const editItem = req.body

    editItem.createTime = Mock.mock('@now')
    editItem.avatar = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', editItem.nickName.substr(0, 1))

    orderListDate.data = orderListDate.data.map((item) => {
      if (item.id === editItem.id) {
        return editItem
      }
      return item
    })

    res.json({ success: true, data: orderListDate.data, page: orderListDate.page })
  },

  [`GET ${apiPrefix}/order-flow`] (req, res) {
    const { number } = req.params
    console.log(number)
    res.json({ success: true, data: orderFlowData.data, page: orderFlowData.page })
  },
}
