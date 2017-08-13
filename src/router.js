import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './routes/app'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          cb(null, { component: require('./routes/homePage') })
        }, 'homePage')
      },
      childRoutes: [
        {
          path: 'home',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/homePage'))
            }, 'homePage')
          },
        }, {
          path: 'order/send',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/order'))
              registerModel(app, require('./models/contact'))
              cb(null, require('./routes/order/send'))
            }, 'order-send')
          },
        }, {
          path: 'order/query',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/order'))
              cb(null, require('./routes/order/query'))
            }, 'order-query')
          },
        }, {
          path: 'express/tracing',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/express'))
              cb(null, require('./routes/express'))
            }, 'expressTracing')
          },
        }, {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/login'))
              cb(null, require('./routes/login/'))
            }, 'login')
          },
        }, {
          path: 'register',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/register'))
              registerModel(app, require('./models/login'))
              cb(null, require('./routes/register/'))
            }, 'register')
          },
        }, {
          path: 'account',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/contact'))
              registerModel(app, require('./models/app'))
              cb(null, require('./routes/account/'))
            }, 'account')
          },
        }, {
          path: 'account/info',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/contact'))
              registerModel(app, require('./models/app'))
              cb(null, require('./routes/account/'))
            }, 'info')
          },
        }, {
          path: 'account/addressbook',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/contact'))
              cb(null, require('./routes/account/addressbook'))
            }, 'addressbook')
          },
        }, {
          path: 'contactus',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/contactus'))
            }, 'contactus')
          },
        }, {
          path: 'news',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/news'))
            }, 'news')
          },
        }, {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error/'))
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
