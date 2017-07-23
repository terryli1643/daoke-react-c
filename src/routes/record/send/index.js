import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import CommentsModal from '../../../components/order/CommentsModal'
import SenderModal from '../../../components/order/SenderModal'
import RecipientModal from '../../../components/order/RecipientModal'
import {
  Select,
  Checkbox,
  Input,
  Button,
  Form,
} from 'antd'
const Option = Select.Option
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const Send = ({ record, contact, dispatch, form: { validateFields, getFieldsValue, getFieldDecorator, setFieldsValue } }) => {
  const { modalVisible, senderModalVisible, recipientModalVisible } = record
  const { list } = contact
  const commentsModalProps = {
    visible: modalVisible,
    onOk (value) {
      dispatch({
        type: 'record/hideModal',
      })
      setFieldsValue({ remark: value })
    },
    onCancel () {
      dispatch({
        type: 'record/hideModal',
      })
    },
  }
  const senderContacts = list

  const recipientContacts = list

  const handleSubmit = (e) => {
    e.preventDefault()
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      data.address = data.address.join(' ')
      dispatch({
        type: 'record/create',
        payload: data,
      })
    })
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  const senderModalProps = {
    visible: senderModalVisible,
    senderContacts,
    handleChange,
    onOk (value) {
      dispatch({
        type: 'record/setSender',
        payload: value,
      })

      dispatch({
        type: 'record/hideSenderModal',
      })
      setFieldsValue('senderName', value.name)
    },

    onCancel () {
      dispatch({
        type: 'record/hideSenderModal',
      })
    },

    getContacts () {
      dispatch({
        type: 'contact/queryAll',
      })
    },
  }

  const recipientModalProps = {
    visible: recipientModalVisible,
    recipientContacts,

    handleChange,
    onOk (value) {
      console.log(value)
      const address = value.address.split(' ')
      const province = address[0]
      const city = address[1]
      const district = address[2]
      const payload = {
        ...value,
        province,
        city,
        district,
        type: 0,
      }
      dispatch({
        type: 'record/setRecipient',
        payload,
      })

      dispatch({
        type: 'record/hideRecipientModal',
      })
      setFieldsValue('recipientName', value.name)
    },

    onCancel () {
      dispatch({
        type: 'record/hideRecipientModal',
      })
    },

    getContacts () {
      dispatch({
        type: 'contact/queryAll',
      })
    },
  }

  const showCommentsModal = () => {
    dispatch({
      type: 'record/showModal',
    })
  }

  const showRecipientModal = () => {
    dispatch({
      type: 'record/showRecipientModal',
    })
  }
  const showSenderModal = () => {
    dispatch({
      type: 'record/showSenderModal',
    })
  }

  return (
    <div className="content-inner">
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <FormItem hasFeedback label="收件人" {...formItemLayout}>
          {
            getFieldDecorator('recipientName', {
              rules: [
                {
                  required: true,
                  message: '请输入收件人姓名',
                  whitespace: true,
                },
              ],
            })(
              <Input onClick={showRecipientModal} />
            )
          }
        </FormItem>
        <FormItem hasFeedback label="发件人" {...formItemLayout}>
          {
            getFieldDecorator('senderName', {
              rules: [
                {
                  required: true,
                  message: '请输入发件人信息',
                  whitespace: true,
                },
              ],
            })(
              <Input href="#" onClick={showSenderModal} />
            )
          }
        </FormItem>
        <FormItem hasFeedback label="快递类型" {...formItemLayout}>
          {
            getFieldDecorator('expressType', {
              rules: [
                {
                  required: true,
                  message: '请输入快递类型',
                  whitespace: true,
                },
              ],
            })(
              <Select defaultValue="normal" allowClear>
                <Option value="normal">普通件</Option>
                <Option value="payOnelivery">到付件</Option>
                <Option value="Test">失效测试件</Option>
                <Option value="insured">保价件</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem hasFeedback label="物品类型" {...formItemLayout}>
          {
            getFieldDecorator('goodsType', {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '请输入物品类型',
                },
              ],
            })(
              <Select defaultValue="file" allowClear>
                <Option value="file">文件</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem hasFeedback label="物品价值" {...formItemLayout}>
          {
            getFieldDecorator('goodsPrice', {
              rules: [
                {
                  required: false,
                  whitespace: true,
                },
              ],
            })(<Input />)
          }
        </FormItem>
        <FormItem hasFeedback label="报价费用" {...formItemLayout}>
          {
            getFieldDecorator('insurePrice', {
              rules: [
                {
                  required: false,
                  whitespace: true,
                },
              ],
            })(<Input />)
          }
        </FormItem>
        <FormItem hasFeedback label="发件站点" {...formItemLayout}>
          {
            getFieldDecorator('station', {
              rules: [
                {
                  required: true,
                  message: '请输入发件站点',
                  whitespace: true,
                },
              ],
            })(<Input />)
          }
        </FormItem>
        <FormItem hasFeedback label="订单备注" {...formItemLayout}>
          {
            getFieldDecorator('remark', {
              rules: [
                {
                  required: false,
                  whitespace: true,
                },
              ],
            })(<Input onClick={showCommentsModal} />)
          }
        </FormItem>
        <FormItem hasFeedback style={{ fontSize: 'small' }}>
          {
            getFieldDecorator('agreement', {
              rules: [
                {
                  validator: (rule, value, callback) => {
                    if (value !== true) {
                      callback('请同意协议并勾选')
                    } else {
                      callback()
                    }
                  },
                },
              ],
            })(
              <Checkbox defaultChecked>我已阅读并同意<a>《服务协议》</a><a>《禁限贵物品告知》</a></Checkbox>
            )
          }
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" size="large" style={{ width: '99%', marginTop: 10 }}>提交</Button>
        </FormItem>
      </Form>
      <CommentsModal {...commentsModalProps} />
      <SenderModal {...senderModalProps} />
      <RecipientModal {...recipientModalProps} />
    </div>
  )
}

Send.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  record: PropTypes.object,
  contact: PropTypes.object,
  item: PropTypes.object,
}
export default connect(({ record, contact }) => ({ record, contact }))(Form.create()(Send))
