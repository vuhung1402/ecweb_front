import { Modal } from "antd";
import React from "react";

const ModalUserInfor = (props) => {
    const { isOpenModalUser } = props;
    const { handleOpenModalUserInfor } = props;

    const infor = {
        "_id": {
            "$oid": "6663a2bc208960e6b253f1e5"
        },
        "ho": "Dinh",
        "ten": "Quan",
        "gender": "Nam",
        "birthday": "16/10/2002",
        "email": "dinhquanfananime4@gmail.com",
        "password": "$2a$10$OZ5Yl6VZJsVxNcLjshfNo.WywXhP1X25NMrZ8r/F2hQWaNvNTkGDe",
        "isAdmin": true,
        "verified": true,
        "address": [
            {
                "name": "Đỗ Vũ Hưng",
                "street": "343/21 Phan Đình Phùng, TP Quảng Ngãi, Tỉnh Quảng Ngãi",
                "number": "0353592827",
                "isDefault": false,
                "_id": {
                    "$oid": "6680d87426dcd4c9d857d50f"
                }
            },
            {
                "name": "Đỗ Vũ Hưng",
                "street": "228 Đường số 6, TP Thủ Đức, TPHCM",
                "number": "0353592827",
                "isDefault": true,
                "_id": {
                    "$oid": "6680dd9126dcd4c9d857dba7"
                }
            }
        ],
        "__v": 8
    }

    return (
        <Modal
            title="Thông tin người dùng"
            open={isOpenModalUser}
            onCancel={handleOpenModalUserInfor}
            okButtonProps={{
                style: {
                    display: 'none'
                }
            }}
        >
            <div className=" flex">
                <div>Email: </div>
                <div>{infor.email}</div>
            </div>
            <div className=" flex">
                <div>Họ và tên: </div>
                <div>{infor.ho} {infor.ten}</div>
            </div>
            <div className=" flex">
                <div>Giới tính: </div>
                <div>{infor.gender}</div>
            </div>
            <div className=" flex">
                <div>Ngày sinh: </div>
                <div>{infor.birthday}</div>
            </div>
        </Modal>
    )
}

export default ModalUserInfor