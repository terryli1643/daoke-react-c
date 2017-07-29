import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Icon, Carousel, Alert } from 'antd'

const HomePage = () => {
  return (
    <div className="content-inner">
      <h2>欢迎使用稻壳物流，您身边的快递小助手！</h2>
      <Carousel autoplay dots="false">
        <div><Alert message="xxx快递站点 小丁丁中奖，奖品充气娃娃一个" type="warning" /></div>
        <div><Alert message="xxx快递站点 小丁丁中奖，奖品充气娃娃一个" type="warning" /></div>
        <div><Alert message="xxx快递站点 小丁丁中奖，奖品充气娃娃一个" type="warning" /></div>
        <div><Alert message="xxx快递站点 小丁丁中奖，奖品充气娃娃一个" type="warning" /></div>
      </Carousel>
      <div style={{ margin: '20px 0' }}>
        <Row gutter={48}>
          <Col span={8}>
            <div style={{ margin: '20px 0' }}>
              <a href="/order/send">
                <Icon type="export" style={{ fontSize: 50, width: '90px', height: '90px' }}>
                  <div style={{ fontSize: 13, margin: '20px 0' }}>我要发货</div>
                </Icon>
              </a>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ margin: '20px 0' }}>
              <a href="/express/tracing">
                <Icon type="search" style={{ fontSize: 50, width: '90px', height: '90px' }}>
                  <div style={{ fontSize: 13, margin: '20px 0' }}>单号查询</div>
                </Icon>
              </a>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ margin: '20px 0' }}>
              <a href="/order/query">
                <Icon type="solution" style={{ fontSize: 50, width: '90px', height: '90px' }}>
                  <div style={{ fontSize: 13, margin: '20px 0' }}>发件记录</div>
                </Icon>
              </a>
            </div>
          </Col>
        </Row>
        <Row gutter={48}>
          <Col span={8}>
            <div style={{ margin: '20px 0' }}>
              <a href="/account">
                <Icon type="user" style={{ fontSize: 50, width: '90px', height: '90px' }}>
                  <div style={{ fontSize: 13, margin: '20px 0' }}>会员中心</div>
                </Icon>
              </a>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ margin: '20px 0' }}>
              <a href="/contact">
                <Icon type="phone" style={{ fontSize: 50, width: '90px', height: '90px' }}>
                  <div style={{ fontSize: 13, margin: '20px 0' }}>联系我们</div>
                </Icon>
              </a>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ margin: '20px 0' }}>
              <a href="/news">
                <Icon type="message" style={{ fontSize: 50, width: '90px', height: '90px' }}>
                  <div style={{ fontSize: 13, margin: '20px 0' }}>最新消息</div>
                </Icon>
              </a>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

HomePage.propTypes = {
  dispatch: PropTypes.func,
  dashboard: PropTypes.object,
}
export default HomePage
