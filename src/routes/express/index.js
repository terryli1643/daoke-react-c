import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const Express = ({ location, dispatch, express, loading }) => {
  const { list } = express
  const filterProps = {
    filter: {
      ...location.query,
    },
    onSearch (value) {
      dispatch({
        type: 'express/tracing',
        payload: {
          value,
        },
      })
    },
  }

  const listProps = {
    loading: loading.effects['express/tracing'],
    list,
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      {<List {...listProps} />}
    </div>
  )
}

Express.propTypes = {
  express: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ express, loading }) => ({ express, loading }))(Express)
