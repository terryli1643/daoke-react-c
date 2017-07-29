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
      modalType,
      recipientContacts,
      senderContacts,
      currentItem,
      form: { getFieldDecorator, setFieldsValue, validateFields, getFieldsValue },
      dispatch,
    } = this.props

    const showCommentsModal = () => {
      dispatch({
        type: 'order/showModal',
        payload: {
          modalType: 'commentsModal',
        },
      })
    }

    const showRecipientModal = () => {
      dispatch({
        type: 'order/showModal',
        payload: {
          modalType: 'recipientModal',
        },
      })
    }
    const showSenderModal = () => {
      dispatch({
        type: 'order/showModal',
        payload: {
          modalType: 'senderModal',
        },
      })
    }

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
            ...currentItem,
            remark: data.remark,
            orderType: data.orderType,
            payType: data.payType,
            commodity: [{
              goodsName: data.goodsName,
              goodsquantity: data.goodsquantity,
              goodsPrice: data.goodsPrice,
              goodsWeight: data.goodsWeight,
            }],
            // receiver: currentItem.receiver,
            // sender: currentItem.sender,
          },
        }

        dispatch({
          type: 'order/setCurrentItem',
          payload,
        })

        dispatch({
          type: 'order/create',
          payload,
        })
      })
    }

    const recipientModalProps = {
      visible: modalVisible,
      recipientContacts,
      onOk (value, createNew) {
        dispatch({
          type: 'order/setCurrentItem',
          payload: {
            currentItem: {
              ...currentItem,
              receiver: value,
            },
          },
        })

        if (createNew) {
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
          type: 'order/hideModal',
        })

        setFieldsValue({
          recipientName: value.name,
        })
      },

      onCancel () {
        dispatch({
          type: 'order/hideModal',
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
      visible: modalVisible,
      senderContacts,
      onOk (value, createNew) {
        dispatch({
          type: 'order/setCurrentItem',
          payload: {
            currentItem: {
              ...currentItem,
              sender: value,
            },
          },
        })

        if (createNew) {
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
          type: 'order/hideModal',
        })

        setFieldsValue({
          senderName: value.name,
        })
      },

      onCancel () {
        dispatch({
          type: 'order/hideModal',
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
          type: 'order/hideModal',
        })
      },
      onCancel () {
        dispatch({
          type: 'order/hideModal',
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
                initialValue: '标准快递',
              })(
                <Select>
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
              })(<InputNumber min={1} />)
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
              })(<InputNumber min={0.5} step={0.5} />)
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
                initialValue: 0,
              })(<InputNumber min={0} />)
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
                initialValue: '现付',
              })(
                <Select>
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
        {modalVisible && modalType === 'commentsModal' && <CommentsModal {...commentsModalProps} />}
        {modalVisible && modalType === 'senderModal' && <SenderModal {...senderModalProps} />}
        {modalVisible && modalType === 'recipientModal' && <RecipientModal {...recipientModalProps} />}
      </div>
    )
  }
}

OrderForm.propTypes = {
  currentItem: PropTypes.object,
  form: PropTypes.object,
  dispatch: PropTypes.func,
  contact: PropTypes.object,
  modalVisible: PropTypes.object,
  modalType: PropTypes.string,
  recipientContacts: PropTypes.object,
  senderContacts: PropTypes.object,
}
export default Form.create({})(OrderForm)

