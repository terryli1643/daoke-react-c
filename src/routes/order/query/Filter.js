import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from '../../../components'
import { Form, Input, Button, Row, Col, DatePicker } from 'antd'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
const { RangePicker } = DatePicker
const dateFormat = 'YYYY-MM-DD'

const ColProps = {
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
}

const Filter = ({
  onFilterChange,
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const handleFields = (fields) => {
    const { dates } = fields
    if (dates && dates.length > 0) {
      fields.startDate = dates[0].format(dateFormat)
      fields.endDate = dates[1].format(dateFormat)
    }
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange({
      startDate: fields.startDate,
      endDate: fields.endDate,
      keyword: fields.keyword,
    })
  }

  // const handleChange = (key, values) => {
  //   let fields = getFieldsValue()
  //   fields[key] = values
  //   fields = handleFields(fields)
  //   onFilterChange(fields)
  // }

  return (
    <Row gutter={24}>
      <Col {...ColProps}>
        <FilterItem label="日期">
          {getFieldDecorator('dates')(
            <RangePicker
              style={{ width: '100%' }}
              size="large"
              defaultValue={[moment(), moment()]}
              format={dateFormat}
              ranges={{ 今天: [moment(), moment()] }}
            />
          )}
        </FilterItem>
      </Col>
      <Col {...ColProps}>
        <FilterItem label="条件">
          {getFieldDecorator('keyword')(
            <Input size="large" placeholder="可根据姓名、电话、单号查询" />
          )}
        </FilterItem>
      </Col>
      <Col {...TwoColProps}>
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
