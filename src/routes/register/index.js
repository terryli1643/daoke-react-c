import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input } from 'antd'
import { config } from '../../utils'
import styles from './index.less'

const FormItem = Form.Item

const Register = ({
  register,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldValue,
  },
}) => {
  const { registerLoading } = register
  const checkPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('password')) {
      callback('两次输入密码不一致!')
    } else {
      callback()
    }
  }
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'register/register', payload: values })
    })
  }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img alt={'logo'} src={config.logo} />
        <span>{config.name}</span>
      </div>

      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('login', {
            rules: [
              {
                initialValue: '13438881540',
                required: true,
                message: '请输入手机号',
              },
            ],
          })(<Input size="large" onPressEnter={handleOk} placeholder="手机" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码！',
              },
            ],
          })(<Input size="large" type="password" placeholder="密码" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: '请再次输入密码！',
              }, {
                validator: checkPassword,
              },
            ],
          })(<Input size="large" type="password" placeholder="再次输入密码" />)}
        </FormItem>
        <Row>
          <Button type="primary" size="large" onClick={handleOk} loading={registerLoading}>
            注册
          </Button>
        </Row>

      </form>
    </div>
  )
}

Register.propTypes = {
  form: PropTypes.object,
  register: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ register }) => ({ register }))(Form.create()(Register))
