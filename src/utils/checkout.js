export const handleAddresOptions = (addresses) => {
    const options = addresses?.map((item) => {
        return {
            value: item?._id,
            label: `${item?.name}, ${item?.number}, ${item?.street}, ${item?.wardName}, ${item?.districtName}, ${item?.provinceName}`,
            wardCode: item?.wardCode,
            districtID: item?.districtID,
            addressInfor: item,
            phone: item?.number,
            name: item?.name,
            street: item?.street,
        }
    })

    return options
}