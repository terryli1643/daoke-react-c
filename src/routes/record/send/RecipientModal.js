import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Cascader, Checkbox } from 'antd'
import city from '../../../utils/city'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const recipientModal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
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
      onOk(data)
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
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: '请填写发件人姓名',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="电话" hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: item.phone,
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
            initialValue: item.address && item.address.split(' '),
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
            initialValue: item.addressDetail,
            rules: [
              {
                required: true,
                message: '请填写详细地址',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="公司名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('company', {
            initialValue: item.company,
          })(<Input />)}
        </FormItem>
        <FormItem label="常用地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('fua', {
            initialValue: item.fua,
          })(<Checkbox />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

recipientModal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(recipientModal)