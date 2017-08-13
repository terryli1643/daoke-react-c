import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'

const Account = ({ app }) => {
  const { user } = app

  return (
    <div className="content-inner">
      <Row>
        <Col span={4}>登录名</Col>
        <Col>{user.username}</Col>
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
