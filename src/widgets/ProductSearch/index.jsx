import React from 'react';
import { Select } from 'antd';
import Search from 'antd/es/input/Search';

const ProductSearch = ({ onSearch, name, onChange }) => {

    return (
        <Search
            value={name}
            allowClear
            placeholder="input search text"
            onSearch={onSearch}
            onChange={(e) => onChange(e.target.value)}
            enterButton
        />
    )

};
export default ProductSearch;