const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config


let recordFlowData = Mock.mock({
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

let recordListDate = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      name: '@name',
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      createTime: '@datetime',
      avatar () {
        return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.nickName.substr(0, 1))
      },
    },
  ],
})

module.exports = {

  [`GET ${apiPrefix}/record`] (req, res) {
    const page = req.query
    const pageSize = page.pageSize || 10
    const currentPage = page.page || 1

    let data
    let newPage

    let newData = recordListDate.data.concat()
    if (page.keyword || page.timeRange) {
      const d = newData.filter((item) => {
        let result1 = item[ 'senderName' ].indexOf(decodeURI(page.keyword));
        let result2 = item[ 'senderMobile' ].toString().indexOf(decodeURI(page.keyword));
        let result3 = item[ 'receiverName' ].indexOf(decodeURI(page.keyword));
        let result4 = item[ 'receiverMobile' ].toString().indexOf(decodeURI(page.keyword));
        let result5 = item[ 'trackingNumber' ].toString().indexOf(decodeURI(page.keyword));
        let result6 = item[ 'orderNumber' ].toString().indexOf(decodeURI(page.keyword));
        return result1 > -1 || result2 > -1 || result3 > -1 || result4 > -1 || result5 > -1 || result6 > -1;
      })

      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize)

      newPage = {
        current: currentPage * 1,
        total: d.length,
      }
    } else {
      data = recordListDate.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      recordListDate.page.current = currentPage * 1
      newPage = recordListDate.page
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

  [`POST ${apiPrefix}/record`] (req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.avatar = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.nickName.substr(0, 1))

    newData.id = recordListDate.data.length + 1
    recordListDate.data.unshift(newData)

    recordListDate.page.total = recordListDate.data.length
    recordListDate.page.current = 1

    res.json({ success: true, data: recordListDate.data, page: recordListDate.page })
  },

  [`DELETE ${apiPrefix}/record`] (req, res) {
    const deleteItem = req.body

    recordListDate.data = recordListDate.data.filter((item) => {
      if (item.id === deleteItem.id) {
        return false
      }
      return true
    })

    recordListDate.page.total = recordListDate.data.length

    res.json({ success: true, data: recordListDate.data, page: recordListDate.page })
  },

  [`PUT ${apiPrefix}/record`] (req, res) {
    const editItem = req.body

    editItem.createTime = Mock.mock('@now')
    editItem.avatar = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', editItem.nickName.substr(0, 1))

    recordListDate.data = recordListDate.data.map((item) => {
      if (item.id === editItem.id) {
        return editItem
      }
      return item
    })

    res.json({ success: true, data: recordListDate.data, page: recordListDate.page })
  },

  [`GET ${apiPrefix}/record-flow`] (req, res) {
    const { number } = req.params
    console.log(number)
    res.json({ success: true, data: recordFlowData.data, page: recordFlowData.page })
  },
}
