import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const Flow = ({ location, dispatch, record }) => {
  const { flowData, isMotion } = record

  const filterProps = {
    isMotion,
    filter: {
      ...location.query,
    },
    onSearch (value) {
      dispatch({
        type: 'record/recordFlow',
        payload: {
          ...value,
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'record/switchIsMotion' })
    },
  }

  const listProps = {
    flowData,
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      {flowData.length > 0 && <List {...listProps} />}
    </div>
  )
}

Flow.propTypes = {
  record: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  activeTabKey: PropTypes.object,
}

export default connect(({ record, loading }) => ({ record, loading }))(Flow)
