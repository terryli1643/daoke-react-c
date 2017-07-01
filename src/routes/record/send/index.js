import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import CommentsModal from './Modal'
import {
  Select,
  Checkbox,
  Input,
  Button,
  Form,
} from 'antd'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const Send = ({ record, dispatch, form: { getFieldDecorator, setFieldsValue } }) => {
  const { modalVisible } = record
  const modalProps = {
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
  const showModal = () => {
    dispatch({
      type: 'record/showModal',
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
            })(<Input />)
          }
        </FormItem>
        <FormItem hasFeedback label="发件人" {...formItemLayout}>
          {
            getFieldDecorator('sender', {
              rules: [
                {
                  required: true,
                  message: '请输入发件人姓名',
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
            })(<Input onClick={showModal} />)
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
      <CommentsModal {...modalProps} />
    </div>
  )
}

Send.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  record: PropTypes.object,
}
export default connect(({ record }) => ({ record }))(Form.create()(Send))
