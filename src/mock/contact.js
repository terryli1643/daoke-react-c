const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

let contactData = Mock.mock({
  'data|10': [
    {
      id: '@id',
      name: '@name',
      phone: /^1[34578]\d{9}$/,
      address: '@county(true)',
      company: '@name',
    },
  ],
  page: {
    total: 1,
    current: 1,
  },
})

module.exports = {
  [`GET ${apiPrefix}/senderFrequentContacts`] (req, res) {
    const { number } = req.params
    res.json({ success: true, data: contactData.data, page: contactData.page })
  },
}
