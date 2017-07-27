import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import OrderForm from '../../../components/order/Form'

const Send = ({ record, contact, dispatch }) => {
  const { currentItem, recipient, modalVisible, senderModalVisible, recipientModalVisible } = record
  const { list } = contact

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

  const formProps = {
    senderModalVisible,
    recipientModalVisible,
    commentsModalProps,
    showCommentsModal,
    showRecipientModal,
    showSenderModal,
    recipient,
    currentItem,
    dispatch,
    modalVisible,
    recipientContacts: list,
    senderContacts: list,
  }

  return (
    <OrderForm {...formProps} />
  )
}

Send.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  record: PropTypes.object,
  contact: PropTypes.object,
  item: PropTypes.object,
}
export default connect(({ record, contact }) => ({ record, contact }))(Send)
