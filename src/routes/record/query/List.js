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
        dataIndex: 'receiptName',
        key: 'receiptName',
      }, {
        title: '收件人电话',
        dataIndex: 'receiptMobile',
        key: 'receiptMobile',
      }, {
        title: '快递单号',
        dataIndex: 'logisticsCode',
        key: 'logisticsCode',
        render: (text, record) => {
          return (
            <div>{record.reused ? `${text.substring(0, text.length - 4)}****` : text} <br />{record.statusStr}</div>
          )
        },
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
        expandedRowRender={
          record => <div style={{ float: 'left' }}>
            货物：{record.goodsType}<br />
            地址：{record.receiptProvince} {record.receiptCity} {record.receiptDistrict} {record.receiptAddress}<br />
            下单时间：{record.submitTimeStr}<br />
            订单号：{record.orderCode}</div>
        }
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
