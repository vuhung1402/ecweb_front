import React from 'react';
import Search from 'antd/es/input/Search';

const ProductSearch = ({ onSearch, name, onChange }) => {

    return (
        <Search
            value={name}
            size='large'
            allowClear
            placeholder="Tìm kiếm sản phẩm"
            onSearch={onSearch}
            onChange={(e) => onChange(e.target.value)}
            enterButton
            className='w-full'
        />
    )

};
export default ProductSearch;