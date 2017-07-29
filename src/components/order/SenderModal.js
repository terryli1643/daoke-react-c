import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Form, Input, Select, Modal, Cascader, Checkbox } from 'antd'
import city from '../../utils/city'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
class SenderModal extends React.Component {

  state = {
    disable: false,
  }

  componentDidMount () {
    const { getContacts } = this.props
    getContacts({ type: 1 })
  }

  render () {
    const {
      item = {},
      onOk,
      form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        setFieldsValue,
        resetFields,
      },
      senderContacts,
      ...modalProps
    } = this.props

    const handleChange = (index) => {
      if (index === -1) {
        resetFields()
        this.setState({ disable: false })
      } else {
        setFieldsValue({ ...senderContacts[index], frequentlyAddress: true })
        this.setState({ disable: true })
      }
    }

    const handleOk = () => {
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
          key: item.key,
        }
        // data.address = data.address.join(' ')
        const payload = {
          sender: {
            ...data,
          },
        }
        onOk(payload)
      })
    }

    const modalOpts = {
      ...modalProps,
      onOk: handleOk,
    }

    return (
      <Modal {...modalOpts}>
        <h2>发件人信息</h2>
        <Form layout="horizontal">
          <div className="ant-row ant-form-item">
            <Row>
              <Col span={6} className="ant-form-item-label"><label>常用发件人</label></Col>
              <Col span={14} className="ant-form-item-control">
                <Select
                  size="large"
                  placeholder="选择常用发件人"
                  onChange={handleChange}
                >
                  <Option value={-1}>
                    添加联系人
                  </Option>
                  {senderContacts.map((contact, index) => {
                    return (
                      <Option value={index}>
                        {contact.name}
                      </Option>)
                  })}
                </Select>
              </Col>
            </Row>
          </div>
          <FormItem label="姓名" hasFeedback {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请填写发件人姓名',
                },
              ],
            })(<Input disabled={this.state.disable} />)}
          </FormItem>
          <FormItem label="电话" hasFeedback {...formItemLayout}>
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: '请填写联系电话',
                }, {
                  pattern: /^1[34578]\d{9}$/,
                  message: '请填写正确的联系电话',
                },
              ],
            })(<Input disabled={this.state.disable} />)}
          </FormItem>

          <FormItem label="地址" hasFeedback {...formItemLayout}>
            {getFieldDecorator('region', {
              rules: [
                {
                  required: true,
                  message: '请选择地址',
                },
              ],
            })(<Cascader
              size="large"
              style={{ width: '100%' }}
              options={city}
              placeholder="选择"
              disabled={this.state.disable}
            />)}
          </FormItem>
          <FormItem label="详细地址" hasFeedback {...formItemLayout}>
            {getFieldDecorator('address', {
              rules: [
                {
                  required: true,
                  message: '请填写详细地址',
                },
              ],
            })(<Input disabled={this.state.disable} />)}
          </FormItem>
          <FormItem label="公司名称" hasFeedback {...formItemLayout}>
            {getFieldDecorator('company', {})(<Input disabled={this.state.disable} />)}
          </FormItem>
          <FormItem label="常用地址" hasFeedback {...formItemLayout}>
            {getFieldDecorator('frequentlyAddress', { valuePropName: 'checked' })(<Checkbox disabled={this.state.disable} />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

SenderModal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  senderContacts: PropTypes.object,
  getContacts: PropTypes.func,
}

export default Form.create()(SenderModal)
