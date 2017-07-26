import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import OrderForm from '../../../components/order/Form'
import CommentsModal from '../../../components/order/CommentsModal'
import SenderModal from '../../../components/order/SenderModal'
import RecipientModal from '../../../components/order/RecipientModal'

const Send = ({ record, contact, dispatch }) => {
  const { currentItem, recipient, modalVisible, senderModalVisible, recipientModalVisible } = record
  const { list } = contact
  const commentsModalProps = {
    visible: modalVisible,
    onOk (value) {
      dispatch({
        type: 'record/hideModal',
      })

      dispatch({
        type: 'record/setCurrentItem',
        payload: {
          currentItem: {
            remark: value,
          },
        },
      })
    },
    onCancel () {
      dispatch({
        type: 'record/hideModal',
      })
    },
  }
  const senderContacts = list

  const recipientContacts = list

  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  const senderModalProps = {
    visible: senderModalVisible,
    senderContacts,
    handleChange,
    onOk (value) {
      const address = value.address.split(' ')
      const province = address[0]
      const city = address[1]
      const district = address[2]
      const sender = {
        ...value,
        province,
        city,
        district,
        type: 0,
      }
      dispatch({
        type: 'record/setSender',
        payload: { sender },
      })

      dispatch({
        type: 'record/hideSenderModal',
      })
      // setFieldsValue('senderName', value.name)
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
      // console.log(value)
      // const address = value.address.split(' ')
      // const province = address[0]
      // const city = address[1]
      // const district = address[2]
      // const recipient = {
      //   ...value,
      //   province,
      //   city,
      //   district,
      //   type: 0,
      // }
      dispatch({
        type: 'record/setRecipient',
        payload: value,
      })

      dispatch({
        type: 'record/hideRecipientModal',
      })
      console.log(recipient.name)
      // setFieldsValue('recipientName', recipient.name)
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

  const formProps = {
    senderModalVisible,
    recipientModalVisible,
    showCommentsModal,
    showRecipientModal,
    showSenderModal,
    recipient,
    currentItem,
  }

  return (
    <div className="content-inner">
      <OrderForm {...formProps} />
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
export default connect(({ record, contact }) => ({ record, contact }))(Send)
