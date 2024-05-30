import React from 'react';
import { Select } from 'antd';
const DropDownCategory = (props) => {
    const { data, type, idCategory, idSubCategory } = props;
    const { handleSelectCategory } = props

    const onSelect = (value, option) => {
        handleSelectCategory(option.value, type)
    }

    return (
        < Select
            onSelect={onSelect}
            value={type === 'sub_category_id' ? idSubCategory : idCategory}
            style={{
                width: 200,
            }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={data?.map((item) => ({
                label: item?.name,
                value: item[type],
            }))}
        />
    )
}
export default DropDownCategory;