import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const Query = ({ location, dispatch, record, loading }) => {
  const { list, pagination, isMotion, activeTabKey } = record
  const { pageSize } = pagination

  const listProps = {
    dataSource: list,
    loading: loading.effects['record/query'],
    pagination,
    location,
    isMotion,
    activeTabKey,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
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
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ?
        dispatch(routerRedux.push({
          pathname: '/record',
          query: {
            field: fieldsValue.field,
            keyword: fieldsValue.keyword,
          },
        })) : dispatch(routerRedux.push({
          pathname: '/record',
        }))
    },
    switchIsMotion () {
      dispatch({ type: 'record/switchIsMotion' })
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
  record: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  activeTabKey: PropTypes.object,
}

export default connect(({ record, loading }) => ({ record, loading }))(Query)
