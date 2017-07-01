import React from 'react'
import PropTypes from 'prop-types'
import { Timeline, Icon } from 'antd'

const List = ({ flowData }) => {
  const list = []
  flowData.forEach((item, index) => {
    if (index === 0) {
      list.push(<Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red" style={{ color: 'red' }}>{item.time} | {item.data}</Timeline.Item>)
    } else {
      list.push(<Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>{item.time} | {item.data}</Timeline.Item>)
    }
  })
  return (
    <div>
      <Timeline>
        {list}
      </Timeline>
    </div>
  )
}

List.propTypes = {
  isMotion: PropTypes.bool,
  location: PropTypes.object,
  activeTabKey: PropTypes.object,
  flowData: PropTypes.object,
}

export default List
