import React from 'react'
import PropTypes from 'prop-types'
import { Timeline } from 'antd'

const List = ({ flowData }) => {
  const list = []
  flowData.forEach((item) => {
    list.push(<Timeline.Item>{item.time} | {item.data}</Timeline.Item>)
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
