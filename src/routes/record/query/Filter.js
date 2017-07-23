import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from '../../../components'
import { Form, Input, Button, Row, Col, DatePicker } from 'antd'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
  onFilterChange,
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const handleFields = (fields) => {
    const { createTime } = fields
    if (createTime) {
      fields.createTime = [createTime.format('YYYY-MM-DD'), createTime.format('YYYY-MM-DD')]
    }
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }}>
        <FilterItem label="时间">
          {getFieldDecorator('startDate')(
            <DatePicker format="YYYY-MM-DD" onChange={handleChange.bind('', 'startDate')} />
          )}
        </FilterItem>
      </Col>
      <Col {...ColProps} xl={{ span: 2 }} md={{ span: 4 }} sm={{ span: 6 }}>
        <FilterItem label="条件">
          {getFieldDecorator('startDate')(
            <Input onChange={handleChange.bind('', 'startDate')} />
          )}
        </FilterItem>
      </Col>
      <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>查询</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
