import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Checkbox, Button, InputNumber } from 'antd'
import CommentsModal from './CommentsModal'
import SenderModal from './SenderModal'
import RecipientModal from './RecipientModal'
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

class OrderForm extends React.Component {

  // componentWillMount = () => {
  //   const { currentItem } = this.props
  //   this.setFields(currentItem)
  // }
  //
  // setFields = (recipient, currentItem) => {
  //   const { form: { setFieldsValue } } = this.props
  //   // setFieldsValue('recipientName', recipient.name)
  //   setFieldsValue({})
  // }

  getAddress = (addressList) => {
    return {
      city: addressList[1],
      district: addressList[2],
      province: addressList[0],
    }
  }

  render () {
    const {
      modalVisible,
      recipientModalVisible,
      senderModalVisible,
      recipientContacts,
      senderContacts,
      showCommentsModal,
      showSenderModal,
      showRecipientModal,
      form: { getFieldDecorator, setFieldsValue, validateFields, getFieldsValue },
      dispatch,
    } = this.props

    const handleSubmit = (e) => {
      e.preventDefault()
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
        }

        const payload = {
          currentItem: {
            remark: data.remark,
            orderType: data.orderType,
            payType: data.payType,
            commodity: [{
              goodsName: data.goodsName,
              goodsquantity: data.goodsquantity,
              goodsPrice: data.goodsPrice,
              goodsWeight: data.goodsWeight,
            }],
          },
        }

        dispatch({
          type: 'record/setCurrentItem',
          payload,
        })

        dispatch({
          type: 'record/create',
        })
      })
    }

    const recipientModalProps = {
      visible: recipientModalVisible,
      recipientContacts,
      onOk (value) {
        dispatch({
          type: 'record/setCurrentItem',
          payload: {
            currentItem: {
              receiver: value,
            },
          },
        })

        if (value.recipient.frequentlyAddress) {
          const addressList = value.recipient.region
          const recipient = value.recipient
          dispatch({
            type: 'contact/create',
            payload: {
              address: recipient.address,
              province: addressList[0],
              city: addressList[1],
              district: addressList[2],
              company: recipient.company,
              name: recipient.name,
              phone: recipient.phone,
              type: 0,
            },
          })
        }

        dispatch({
          type: 'record/hideRecipientModal',
        })

        setFieldsValue({
          recipientName: value.recipient.name,
        })
      },

      onCancel () {
        dispatch({
          type: 'record/hideRecipientModal',
        })
      },

      getContacts (payload) {
        dispatch({
          type: 'contact/queryAll',
          payload,
        })
      },
    }

    const senderModalProps = {
      visible: senderModalVisible,
      senderContacts,
      onOk (value) {
        dispatch({
          type: 'record/setCurrentItem',
          payload: {
            currentItem: {
              sender: value,
            },
          },
        })

        if (value.sender.frequentlyAddress) {
          const addressList = value.sender.region
          const sender = value.sender
          dispatch({
            type: 'contact/create',
            payload: {
              address: sender.address,
              province: addressList[0],
              city: addressList[1],
              district: addressList[2],
              company: sender.company,
              name: sender.name,
              phone: sender.phone,
              type: 1,
            },
          })
        }

        dispatch({
          type: 'record/hideSenderModal',
        })

        setFieldsValue({
          senderName: value.sender.name,
        })
      },

      onCancel () {
        dispatch({
          type: 'record/hideSenderModal',
        })
      },

      getContacts (payload) {
        dispatch({
          type: 'contact/queryAll',
          payload,
        })
      },
    }

    const commentsModalProps = {
      visible: modalVisible,
      onOk (value) {
        setFieldsValue({
          remark: value,
        })
        dispatch({
          type: 'record/hideModal',
        })
      },
      onCancel () {
        dispatch({
          type: 'record/hideModal',
        })
      },
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
              getFieldDecorator('orderType', {
                rules: [
                  {
                    required: true,
                    message: '请输入快递类型',
                    whitespace: true,
                  },
                ],
              })(
                <Select defaultValue="标准快递" allowClear>
                  <Option value="标准快递">标准快递</Option>
                  <Option value="到付件">到付件</Option>
                  <Option value="代收货款">代收货款</Option>
                  <Option value="保价快递">保价快递</Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem hasFeedback label="货物名称" {...formItemLayout}>
            {
              getFieldDecorator('goodsName', {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请输入货物名称',
                  },
                ],
              })(<Input />)
            }
          </FormItem>
          <FormItem hasFeedback label="货物数量" {...formItemLayout}>
            {
              getFieldDecorator('goodsquantity', {
                rules: [
                  {
                    required: true,
                    message: '请输入货物数量',
                    type: 'number',
                  },
                ],
                initialValue: 1,
              })(<InputNumber />)
            }
          </FormItem>
          <FormItem hasFeedback label="物品价值" {...formItemLayout}>
            {
              getFieldDecorator('goodsPrice', {
                rules: [
                  {
                    required: false,
                    type: 'number',
                  },
                ],
                initialValue: 1,
              })(<InputNumber min={1} />)
            }元
          </FormItem>
          <FormItem hasFeedback label="预估重量" {...formItemLayout}>
            {
              getFieldDecorator('goodsWeight', {
                rules: [
                  {
                    required: false,
                    type: 'number',
                  },
                ],
                initialValue: 1,
              })(<InputNumber />)
            }公斤
          </FormItem>
          <FormItem hasFeedback label="报价费用" {...formItemLayout}>
            {
              getFieldDecorator('insurePrice', {
                rules: [
                  {
                    required: false,
                    type: 'number',
                  },
                ],
                initialValue: 1,
              })(<InputNumber min={1} />)
            }元
          </FormItem>
          <FormItem hasFeedback label="支付类型" {...formItemLayout}>
            {
              getFieldDecorator('payType', {
                rules: [
                  {
                    required: true,
                    message: '请输入支付类型',
                    whitespace: true,
                  },
                ],
              })(
                <Select defaultValue="现付" allowClear>
                  <Option value="未付钱">现付</Option>
                  <Option value="到付">到付</Option>
                  <Option value="月结">月结</Option>
                  <Option value="未付钱">未付钱</Option>
                </Select>
              )
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
                    type: 'boolean',
                  },
                ],
                initialValue: true,
                valuePropName: 'checked',
              })(
                <Checkbox>我已阅读并同意<a>《服务协议》</a><a>《禁限贵物品告知》</a></Checkbox>
              )
            }
          </FormItem>
          <FormItem>
            <Button type="primary" size="large" onClick={handleSubmit} style={{ width: '99%', marginTop: 10 }}>提交</Button>
          </FormItem>
        </Form>
        <CommentsModal {...commentsModalProps} />
        <SenderModal {...senderModalProps} />
        <RecipientModal {...recipientModalProps} />
      </div>
    )
  }
}

OrderForm.propTypes = {
  recipient: PropTypes.object,
  currentItem: PropTypes.object,
  showCommentsModal: PropTypes.func,
  showSenderModal: PropTypes.func,
  showRecipientModal: PropTypes.func,
  handleSubmit: PropTypes.func,
  form: PropTypes.object,
  dispatch: PropTypes.func,
  record: PropTypes.object,
  contact: PropTypes.object,
  item: PropTypes.object,
  commentsModalProps: PropTypes.object,
  recipientModalVisible: PropTypes.object,
  senderModalVisible: PropTypes.object,
  modalVisible: PropTypes.object,
  recipientContacts: PropTypes.object,
  senderContacts: PropTypes.object,
}
export default Form.create({})(OrderForm)

