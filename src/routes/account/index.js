import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import { routerRedux } from 'dva/router'

const Account = ({ dispatch, app }) => {
  const { user } = app

  const goAddressbook = (type) => {
    dispatch(
      routerRedux.push({
        pathname: '/account/addressbook',
        query: {
          type,
        },
      })
    )
  }
  return (
    <div className="content-inner">
      <Row>
        <Col span={4}>登录名</Col>
        <Col>{user.username}</Col>
      </Row>
      <Row>
        <Col span={8}><a href="#" onClick={() => goAddressbook(1)}>收件人管理</a></Col>
      </Row>
      <Row>
        <Col span={8}><a href="#" onClick={() => goAddressbook(2)}>发件人管理</a></Col>
      </Row>
    </div>
  )
}

Account.propTypes = {
  app: PropTypes.object,
  contact: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, contact }) => ({ app, contact }))(Account)
