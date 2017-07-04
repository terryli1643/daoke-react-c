import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styles from './List.less'
import classnames from 'classnames'

const List = ({ isMotion, location, ...tableProps }) => {
  const columnsEvent = () => {
    return [
      {
        title: '收件人姓名',
        dataIndex: 'receiverName',
        key: 'receiverName',
      }, {
        title: '收件人电话',
        dataIndex: 'receiverMobile',
        key: 'receiverMobile',
      }, {
        title: '快递单号',
        dataIndex: 'trackingNumber',
        key: 'trackingNumber',
      },
    ]
  }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        columns={columnsEvent()}
        simple
        rowKey={record => record.id}
        expandedRowRender={record => <p>{record.orderNumber}<br />{record.type}<br />{record.receiverAddress}<br />{record.content}<br />{record.time}</p>}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
  activeTabKey: PropTypes.object,
}

export default List
