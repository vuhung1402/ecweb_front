import React from "react";

const UserAddress = (props) => {
    const { userAddress } = props;

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
                        <div key={item?._id} className=" p-3 border rounded-lg flex flex-col gap-2">
                            <div className=" flex items-center gap-3">
                                <div className=" font-bold">Họ và tên:</div>
                                <div>{item?.name}</div>
                            </div>
                            <div className=" flex items-center gap-3">
                                <div className=" font-bold">Địa chỉ:</div>
                                <div>{item?.street}, {item?.wardName}, {item?.districtName}, {item?.provinceName}</div>
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