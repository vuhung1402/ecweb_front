import { HomeOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Modal, Select, Checkbox } from "antd";
import React from "react";
import './styles.scss';

const ModalAddAddress = (props) => {
    const { isOpen, name, number, provinces, provinceID, districts, districtID, wards, wardCode, street, isDefault } = props;
    const { handleInsertAddress, onChangeInfor, onSelectProvince, onSelectDistrict, onSelectWard, handleAddAddress } = props;

    return (
        <div className="modal-container">
            <Modal
                title="Địa chỉ"
                open={isOpen}
                onCancel={handleInsertAddress}
                onOk={handleAddAddress}
                className="modal"
            >
                <Input
                    value={name}
                    onChange={(e) => onChangeInfor(e.target.value, 'name')}
                    placeholder="Họ và tên"
                    prefix={<UserOutlined className="icon" />}
                    className="input"
                />

                <Input
                    value={number}
                    onChange={(e) => onChangeInfor(e.target.value, 'phone')}
                    placeholder="Số điện thoại"
                    prefix={<PhoneOutlined className="icon" />}
                    className="input"
                />

                <div className="flex items-center gap-2">
                    <Select
                        showSearch
                        optionFilterProp="label"
                        value={provinceID}
                        onSelect={onSelectProvince}
                        placeholder='Tỉnh, Thành Phố'
                        options={provinces?.map((item) => ({
                            label: item?.ProvinceName,
                            value: item?.ProvinceID,
                        }))}
                        suffixIcon={<HomeOutlined />}
                        className="select"
                    />
                    <Select
                        showSearch
                        optionFilterProp="label"
                        value={districtID}
                        onSelect={onSelectDistrict}
                        placeholder='Quận, Huyện'
                        options={districts?.map((item) => ({
                            label: item?.DistrictName,
                            value: item?.DistrictID,
                        }))}
                        suffixIcon={<HomeOutlined />}
                        className="select"
                    />
                    <Select
                        showSearch
                        optionFilterProp="label"
                        value={wardCode}
                        onSelect={onSelectWard}
                        placeholder='Phường, Xã'
                        options={wards?.map((item) => ({
                            label: item?.WardName,
                            value: item?.WardCode,
                        }))}
                        suffixIcon={<HomeOutlined />}
                        className="select"
                    />
                </div>

                <Input
                    value={street}
                    onChange={(e) => onChangeInfor(e.target.value, 'street')}
                    placeholder="tên đường, số nhà"
                    prefix={<HomeOutlined className="icon" />}
                    className="input"
                />

                <div className="checkbox-container flex items-center">
                    <Checkbox
                        checked={isDefault}
                        onChange={(e) => onChangeInfor(e.target.checked, 'isDefault')}
                        id="default-checkbox"
                        className="checkbox"
                    />
                    <label htmlFor="default-checkbox" className="checkbox-label">Đặt làm địa chỉ mặc định</label>
                </div>
            </Modal>
        </div>
    )
}

export default ModalAddAddress