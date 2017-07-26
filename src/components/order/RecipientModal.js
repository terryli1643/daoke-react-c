import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Modal, Cascader, Checkbox } from 'antd'
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
class RecipientModal extends React.Component {

  componentDidMount () {
    const { getContacts } = this.props
    getContacts()
  }

  render () {
    const {
      item = {},
      onOk,
      form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
      },
      recipientContacts,
      handleChange,
      ...modalProps
    } = this.props

    const handleOk = () => {
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
          key: item.key,
        }
        data.address = data.address.join(' ')
        const payload = {
          recipient: {
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
        <h2>收件人信息</h2>
        <Form layout="horizontal">
          <FormItem label="姓名" hasFeedback {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请填写发件人姓名',
                },
              ],
            })(<Select
              size="large"
              mode="tags"
              placeholder="常用发件人"
              onChange={handleChange}
            >
              {recipientContacts.map((contact) => {
                return (
                  <Option value={contact.name}>
                    {`${contact.name} - ${contact.phone}`}
                  </Option>)
              })}
            </Select>)}
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
            })(<Input />)}
          </FormItem>
          <FormItem label="地址" hasFeedback {...formItemLayout}>
            {getFieldDecorator('address', {
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
            />)}
          </FormItem>
          <FormItem label="详细地址" hasFeedback {...formItemLayout}>
            {getFieldDecorator('addressDetail', {
              rules: [
                {
                  required: true,
                  message: '请填写详细地址',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="公司名称" hasFeedback {...formItemLayout}>
            {getFieldDecorator('company', {})(<Input />)}
          </FormItem>
          <FormItem label="常用地址" hasFeedback {...formItemLayout}>
            {getFieldDecorator('frequentlyAddress', {})(<Checkbox />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

RecipientModal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  recipientContacts: PropTypes.object,
  handleChange: PropTypes.func,
  getContacts: PropTypes.func,
}

export default Form.create()(RecipientModal)
