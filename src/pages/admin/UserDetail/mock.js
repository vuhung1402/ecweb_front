const data = {
    "_id": {
        "$oid": "6663cb79e12e5a5b69c7fb01"
    },
    "ho": "Dinh",
    "ten": "Quan",
    "gender": "Nam",
    "birthday": "16/10/2002",
    "email": "dinhquanfananime@gmail.com",
    "password": "$2a$10$UdaEnucNJ4Xz6j5c1VSyUOAItv7epicdv0kOpvF34iL1COjQvINFK",
    "isAdmin": false,
    "verified": true,
    "address": [
        {
            "name": "Đỗ Vũ Hưng",
            "street": "343/21 Phan Đình Phùng",
            "provinceID": "242",
            "provinceName": "Quảng Ngãi",
            "districtID": "1630",
            "districtName": "Thành phố Quảng Ngãi",
            "wardCode": "350101",
            "wardName": "Phường Chánh Lộ",
            "number": "0353592827",
            "isDefault": false,
            "_id": {
                "$oid": "66c9a02aa5881bad77735423"
            }
        },
        {
            "name": "Đỗ Vũ Hưng",
            "street": "Chung Cư An Bình",
            "provinceID": "205",
            "provinceName": "Bình Dương",
            "districtID": "1540",
            "districtName": "Thành phố Dĩ An",
            "wardCode": "440501",
            "wardName": "Phường An Bình",
            "number": "0353592827",
            "isDefault": true,
            "_id": {
                "$oid": "66c9a10f373c49b9e9871ec9"
            }
        }
    ],
    "__v": 22
}

// ql_order
// ql_user
// ql_product
// ql_transaction
// user

const role = [
    {
        label: 'Người dùng',
        value: 'user',
    },
    {
        label: 'Quản lý đơn hàng',
        value: 'ql_order',
    },
    {
        label: 'Quản lý người dùng',
        value: 'ql_user',
    },
    {
        label: 'Quản lý sản phẩm',
        value: 'ql_product',
    },
    {
        label: 'Quản lý giao dịch',
        value: 'ql_transaction',
    }

];