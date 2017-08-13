import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import { connect } from 'dva'
import { DropOption } from '../../components'

const confirm = Modal.confirm

const AddressBook = ({ dispatch, location, contacts }) => {
  const type = location.query.type
  console.log(type)
  const onEditItem = (item) => {
    dispatch({
      type: 'contact/showModal',
      payload: {
        modalType: 'update',
        currentItem: item,
      },
    })
  }
  const onDeleteItem = (id) => {
    dispatch({
      type: 'contact/delete',
      payload: id,
    })
  }

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确定删除?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }
  const columns = [
    {
      title: type === '1' ? '收件人姓名' : '发件人姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: type === '1' ? '收件人电话' : '发件人电话',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '更新' }, { key: '2', name: '删除' }]} />
      },
    },
  ]
  return (
    <div className="content-inner">
      <h2>{type === '1' ? '收件人' : '发件人'}</h2>
      <Table
        bordered
        columns={columns}
        dataSource={contacts}
        simple
      />
    </div>
  )
}

AddressBook.propTypes = {
  contacts: PropTypes.object,
  type: PropTypes.object,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  getContacts: PropTypes.func,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ contact }) => ({ contact }))(AddressBook)
