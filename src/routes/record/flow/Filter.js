import React from 'react'
import PropTypes from 'prop-types'
import { Input, Row, Col } from 'antd'

const Search = Input.Search

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const Filter = ({ onSearch }) => {
  const handleSubmit = (value) => {
    onSearch(value)
  }

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        <Search placeholder="快递单号" size="large" onSearch={handleSubmit} />
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  filter: PropTypes.object,
  onSearch: PropTypes.func,
}

export default Filter
