import Category from "../../component/Category"
import ProductList from "../../component/ProductList"

import { useDispatch, useSelector } from "react-redux"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { userPackage } from "../../redux/actions"

const Home = () => {
    const user = {
        "user_id": "583c3ac3f38e84297c002546",
        "email": "test@test.com",
        "name": "test@test.com",
        "given_name": "Hello",
        "family_name": "Test",
        "nickname": "test",
        "last_ip": "94.121.163.63",
        "logins_count": 15,
        "created_at": "2016-11-28T14:10:11.338Z",
        "updated_at": "2016-12-02T01:17:29.310Z",
        "last_login": "2016-12-02T01:17:29.310Z",
        "email_verified": true
    }
    const dispatch = useDispatch()
    dispatch(userPackage(user))
    return(
        <div>
            <Category/>
            <ProductList/>
        </div>
    )
}

export default Home