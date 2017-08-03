module.exports = [
  {
    id: 1,
    icon: 'laptop',
    name: '首页',
    router: '/home',
  },
  {
    id: 11,
    bpid: 1,
    mpid: 1,
    name: '发快递',
    icon: 'api',
    router: '/order/send',
  },
  {
    id: 12,
    bpid: 1,
    mpid: 1,
    name: '查询快递',
    icon: 'api',
    router: '/order/query',
  },
  {
    id: 13,
    bpid: 1,
    mpid: 1,
    name: '单号查询',
    icon: 'api',
    router: '/express/tracing',
  },
  {
    id: 2,
    icon: 'laptop',
    name: '注册',
    router: '/register',
  },
  {
    id: 3,
    icon: 'user',
    name: '个人中心',
    router: '/account',
  },
  {
    id: 31,
    bpid: 3,
    mpid: 3,
    name: '基本信息',
    icon: 'api',
    router: '/account/myaccount',
  },
  {
    id: 32,
    bpid: 3,
    mpid: 3,
    name: '通讯录',
    icon: 'api',
    router: '/account/addressbook',
  },
]
