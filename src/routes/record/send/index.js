import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import CommentsModal from './CommentsModal'
import SenderModal from './SenderModal'
import {
  Select,
  Checkbox,
  Input,
  Button,
  Form,
  Row,
  Col,
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
// const FUAOptions = [{
//   name: '罗汤汁',
//   phone: '12345678',
//   address: 'test1 fdsafdsaf jfkdsa',
//   company: 'test company',
// }, {
//   name: '思达',
//   phone: '3218679878',
//   address: 'test1 fdsafdsaf jfkdsa',
//   company: 'test company',
// }]

const Send = ({ record, contact, dispatch, form: { getFieldDecorator, setFieldsValue } }) => {
  const { modalVisible, senderModalVisible } = record
  const { senderFrequentContacts } = contact
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

  const senderModalProps = {
    visible: senderModalVisible,
    onOk (value) {
      dispatch({
        type: 'record/hideSenderModal',
        payload: value,
      })
      setFieldsValue({ remark: value })
    },
    onCancel () {
      dispatch({
        type: 'record/hideSenderModal',
      })
    },
  }

  const showCommentsModal = () => {
    dispatch({
      type: 'record/showModal',
    })
  }

  const showSenderModal = () => {
    dispatch({
      type: 'record/showSenderModal',
    })
  }

  return (
    <div className="content-inner">
      <Form layout="horizontal">
        <FormItem hasFeedback label="收件人" {...formItemLayout}>
          {
            getFieldDecorator('recipient', {
              rules: [
                {
                  required: true,
                  message: '请输入收件人姓名',
                  whitespace: true,
                },
              ],
            })(
              <Row>
                <Col>
                  <Select
                    size="large"
                    placeholder="常用发件人"
                  >
                    {senderFrequentContacts.map((item) => {
                      return (
                        <Option value={item.name}>
                          {`${item.name} - ${item.phone}`}
                        </Option>)
                    })}
                  </Select>
                </Col>
                <Col>
                  <a href="#" onClick={showSenderModal}>添加地址</a>
                </Col>
              </Row>
            )
          }
        </FormItem>
        <FormItem hasFeedback label="发件人" {...formItemLayout}>
          {
            getFieldDecorator('sender', {
              rules: [
                {
                  required: true,
                  message: '请输入发件人信息',
                  whitespace: true,
                },
              ],
            })(<Input />)
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
                  required: true,
                },
              ],
            })(
              <Checkbox>我已阅读并同意<a>《服务协议》</a><a>《禁限贵物品告知》</a></Checkbox>
            )
          }
        </FormItem>
      </Form>
      <Button type="primary" size="large" style={{ width: '99%', marginTop: 10 }}>提交</Button>
      <CommentsModal {...commentsModalProps} />
      <SenderModal {...senderModalProps} />
    </div>
  )
}

Send.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  record: PropTypes.object,
  contact: PropTypes.object,
}
export default connect(({ record, contact }) => ({ record, contact }))(Form.create()(Send))
