import React from "react";
import { data } from "../UserInfor/mock";

const UserAddress = (props) => {
    const { userAddress } = props;

    // {
    //     "_id": {
    //       "$oid": "6663cb79e12e5a5b69c7fb01"
    //     },
    //     "ho": "Dinh",
    //     "ten": "Quan",
    //     "gender": "Nam",
    //     "birthday": "16/10/2002",
    //     "email": "dinhquanfananime@gmail.com",
    //     "password": "$2a$10$UdaEnucNJ4Xz6j5c1VSyUOAItv7epicdv0kOpvF34iL1COjQvINFK",
    //     "isAdmin": false,
    //     "verified": true,
    //     "address": [
    //       {
    //         "name": "Đỗ Vũ Hưng",
    //         "street": "343/21 Phan Đình Phùng",
    //         "provinceID": "242",
    //         "provinceName": "Quảng Ngãi",
    //         "districtID": "1630",
    //         "districtName": "Thành phố Quảng Ngãi",
    //         "wardCode": "350101",
    //         "wardName": "Phường Chánh Lộ",
    //         "number": "0353592827",
    //         "isDefault": false,
    //         "_id": {
    //           "$oid": "66c9a02aa5881bad77735423"
    //         }
    //       },
    //       {
    //         "name": "Đỗ Vũ Hưng",
    //         "street": "Chung Cư An Bình",
    //         "provinceID": "205",
    //         "provinceName": "Bình Dương",
    //         "districtID": "1540",
    //         "districtName": "Thành phố Dĩ An",
    //         "wardCode": "440501",
    //         "wardName": "Phường An Bình",
    //         "number": "0353592827",
    //         "isDefault": true,
    //         "_id": {
    //           "$oid": "66c9a10f373c49b9e9871ec9"
    //         }
    //       }
    //     ],
    //     "__v": 22
    //   }

    return (
        <div className=" w-full p-3 flex flex-col gap-2">
            <div className=" font-bold">
                <div>Danh sách địa chỉ</div>
                {
                    userAddress?.length === 0 && <div className="font-bold text-green-500">(Người dùng chưa cập nhật thông tin địa chỉ)</div>
                }
            </div>
            {
                userAddress?.map((item) => {
                    return (
                        <div className=" p-3 border rounded-lg flex flex-col gap-2">
                            <div className=" flex items-center gap-3">
                                <div className=" font-bold">Họ và tên:</div>
                                <div>{item.name}</div>
                            </div>
                            <div className=" flex items-center gap-3">
                                <div className=" font-bold">Địa chỉ:</div>
                                <div>{item.street}, {item.wardName}, {item.districtName}, {item.provinceName}</div>
                            </div>
                            <div className=" flex items-center gap-3">
                                <div className=" font-bold">Số điện thoại:</div>
                                <div>{item?.number}</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UserAddress