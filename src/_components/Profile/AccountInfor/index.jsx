import React from "react";

const AccountInfor = (props) => {
    const { infor } = props

    return (
        <>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Thông tin tài khoản</h2>
            <div className="space-y-2">
                {infor?.name && <p className="font-medium">{infor?.name}</p>}
                {infor?.address && <p className="text-sm text-gray-600">{infor?.address}</p>}
                {infor?.email && <p className="text-sm text-gray-600">{infor?.email}</p>}
                <div className="mt-4">
                    <a href="/address" className="text-sm font-medium text-blue-500 hover:text-blue-600">
                        Xem địa chỉ
                    </a>
                </div>
            </div>
        </>
    )
}

export default AccountInfor