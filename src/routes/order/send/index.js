import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import OrderForm from '../../../components/order/Form'

const Send = ({ order, contact, dispatch }) => {
  const { currentItem, modalType, modalVisible } = order
  const { recipientContacts, senderContacts } = contact

  const commentsModalProps = {
    visible: modalVisible,
    onOk (value) {
      dispatch({
        type: 'record/setCurrentItem',
        payload: {
          currentItem: {
            remark: value,
          },
        },
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

  const formProps = {
    commentsModalProps,
    currentItem,
    dispatch,
    modalVisible,
    modalType,
    recipientContacts,
    senderContacts,
  }

  return (
    <OrderForm {...formProps} />
  )
}

Send.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  order: PropTypes.object,
  contact: PropTypes.object,
}
export default connect(({ order, contact }) => ({ order, contact }))(Send)
