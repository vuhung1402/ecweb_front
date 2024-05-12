import React from 'react';
import { Select } from 'antd';
import './ComponentStyle.css'

const ProductFilter = ({handleSelect}) => {

  return(
      <Select
        onSelect={handleSelect}
        showSearch
        style={{
          width: 200,
        }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={[
          {
            value: 1,
            label: 'Giá: Tăng dần',
            name: "tang-dan"
          },
          {
            value: 2,
            label: 'Giá: Giảm dần',
            name:'giam-dan'
          },
          {
            value: 3,
            label: 'Tên: A - Z',
            name:'A-Z'
          },
          {
            value:4,
            label:'Tên: Z - A',
            name:'Z-A'
          },
          {
            value: 5,
            label:'Mới nhất',
            name:'moi-nhat'
          }
        ]}
      />
  )

};
export default ProductFilter;