import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const Query = ({ location, dispatch, order, loading }) => {
  const { list, pagination, isMotion } = order
  const { pageSize } = pagination

  const listProps = {
    dataSource: list,
    loading: loading.effects['order/query'],
    pagination,
    location,
  }

  const filterProps = {
    isMotion,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
    </div>
  )
}

Query.propTypes = {
  order: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  activeTabKey: PropTypes.object,
}

export default connect(({ order, loading }) => ({ order, loading }))(Query)
