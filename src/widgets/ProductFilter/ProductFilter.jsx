import React from 'react';
import { Select } from 'antd';

import { userProductsFilter } from '@constants/index';

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
            options={userProductsFilter}
        />
    )

};
export default ProductFilter;