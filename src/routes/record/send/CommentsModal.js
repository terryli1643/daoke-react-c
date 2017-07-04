import React from 'react'
import PropTypes from 'prop-types'

import { Input, Modal, Row, Col, Button, Icon } from 'antd'

class CommentsModal extends React.Component {
  state = { comments: '' }

  handleOk = () => {
    this.props.onOk(this.refs.myInput.props.value)
  }
  handleCancel = () => {
    this.props.onCancel()
  }

  handleChange = (e, value) => {
    this.setState({
      comments: value,
    })
  }

  buttonProps = {
    type: 'dashed',
  }

  handleClear = () => {
    this.setState({ comments: '' })
  }

  handleInput = (e) => {
    this.setState({ comments: e.target.value })
  }

  inputPorps = {
    suffix: <Icon type="close-circle" onClick={this.handleClear} />,
    onChange: this.handleInput,
  }

  render () {
    return (
      <Modal visible={this.props.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
        <h2>留言</h2>
        <Row style={{ marginTop: '20px' }}>
          <Col>
            <Input {...this.inputPorps} value={this.state.comments} ref="myInput" />
          </Col>
        </Row>
        <Row gutter={16} style={{ margin: '16px 0' }}>
          <Col span={8}>
            <Button {...this.buttonProps} onClick={(checked) => this.handleChange(checked, '请带纸箱')}>请带纸箱</Button>
          </Col>
          <Col span={8}>
            <Button {...this.buttonProps} onClick={(checked) => this.handleChange(checked, '请带胶带')}>请带胶带</Button>
          </Col>
          <Col span={8}>
            <Button {...this.buttonProps} onClick={(checked) => this.handleChange(checked, '来前电话')}>来前电话</Button>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Button {...this.buttonProps} onClick={(checked) => this.handleChange(checked, '货物较大')}>货物较大</Button>
          </Col>
          <Col span={8}>
            <Button {...this.buttonProps} onClick={(checked) => this.handleChange(checked, '货物较大')}>物品较重</Button>
          </Col>
          <Col span={8}>
            <Button {...this.buttonProps} onClick={(checked) => this.handleChange(checked, '需要文件袋')}>需要文件袋</Button>
          </Col>
        </Row>
      </Modal>
    )
  }
}

CommentsModal.propTypes = {
  visible: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  modalProps: PropTypes.object,
}
export default CommentsModal
