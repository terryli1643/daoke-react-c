import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'

const Detail = ({ recordDetail }) => {
  const { data } = recordDetail
  const content = []
  for (let key in data) {
    if ({}.hasOwnProperty.call(data, key)) {
      content.push(<div key={key} className={styles.item}>
        <div>{key}</div>
        <div>{String(data[key])}</div>
      </div>)
    }
  }
  return (<div className="content-inner">
    <div className={styles.content}>
      {content}
    </div>
  </div>)
}

Detail.propTypes = {
  recordDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ recordDetail, loading }) => ({ recordDetail, loading: loading.models.recordDetail }))(Detail)
