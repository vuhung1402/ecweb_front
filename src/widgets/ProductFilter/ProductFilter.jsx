import React from 'react';
import { Select } from 'antd';

import { userProductsFilter } from '@constants/index';

import './ComponentStyle.css'

const ProductFilter = ({handleSelect}) => {

    return(
        <Select
            size='large'
            onSelect={handleSelect}
            showSearch
            className='w-full sm:w-[400px]'
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