import React from 'react'
import PropTypes from 'prop-types'
import { Timeline, Icon } from 'antd'

const List = ({ list }) => {
  const action = []

  list.forEach((item, index) => {
    if (index === 0) {
      action.push(<Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red" style={{ color: 'red' }}>{item.acceptTimeStr} | {item.acceptStation}</Timeline.Item>)
    } else {
      action.push(<Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>{item.acceptTimeStr} | {item.acceptStation}</Timeline.Item>)
    }
  })
  return (
    <div>
      <Timeline>
        {action}
      </Timeline>
    </div>
  )
}

List.propTypes = {
  location: PropTypes.object,
  list: PropTypes.object,
}

export default List
