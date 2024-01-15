import { useRef, useState } from "react"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { useNavigate } from "react-router-dom"
import './style.scss'
import SearchBox from "../../component/SearchBox/SearchBox"
import CartPopUp from "../../component/CartPopUp/CartPopUp"

const Header = () => {
  const [searchBox, setSearchBox] = useState(false)
  const [account, setAccount] = useState(false)
  const [cartPopUp, setCartPopUp] = useState(false)

    return(
        <header>
          <div>LOGO</div>
          <nav class="menu">
            <ul>
                <li><a href="/">TRANG CHỦ</a></li>
                <li>
                    <a href="#">SẢN PHẨM ▾</a>
                    <ul>
                        <li>
                            <a href="#"> ÁO ▾</a>
                            <ul className=" border">
                                <li><a href="#">XEM TẤT CẢ ÁO</a></li>
                                <li><a href="#">ÁO THUN</a></li>
                                <li><a href="#">ÁO SƠ MI</a></li>
                                <li><a href="#">ÁO POLO</a></li>
                            </ul>
                        </li>
                        <li><a href="#">CỬA HÀNG</a></li>
                        <li>
                            <a href="#">CHÍNH SÁCH ▾</a>
                            <ul>
                                <li><a href="#">CHÍNH SÁCH ĐỔI TRẢ</a></li>
                                <li><a href="#">CHÍNH SÁCH BẢO MẬT</a></li>
                                <li><a href="#">CHÍNH SÁCH BẢO MẬT</a></li>
                                <li><a href="#">CHÍNH SÁCH BẢO MẬT</a></li>
                                <li><a href="#">CHÍNH SÁCH BẢO MẬT</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li><a href="#">CỬA HÀNG</a></li>
                <li>
                  <a href="#">CHÍNH SÁCH ▾</a>
                  <ul>
                    <li><a>CHÍNH SÁCH ĐỔI TRẢ</a></li>
                    <li><a>CHÍNH SÁCH BẢO MẬT</a></li>
                    <li><a>CHÍNH SÁCH GIAO HÀNG</a></li>
                    <li><a>PHƯƠNG THỨC THANH TOÁN</a></li>
                    <li><a>HƯỚNG DẪN MUA HÀNG</a></li>
                  </ul>
                </li>
            </ul>
          </nav>
          <div className=" flex justify-between w-[132px]">
            <div className=" relative cursor-pointer">
              <div onClick={() => {
                setSearchBox(!searchBox) 
                setAccount(false)
                setCartPopUp(false)
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              {
                searchBox && 
                (
                  <div className=" absolute bg-white rounded-md shadow-slate-600 border top-10 right-1 w-[370px]">
                    <SearchBox/>
                  </div>
                )
              }
            </div>
            <div className=" cursor-pointer relative">
              <div onClick={() => {
                setAccount(!account)
                setSearchBox(false)
                setCartPopUp(false)
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              {
                account && 
                (
                  <div className=" absolute right-1 top-10 w-[220px] bg-white rounded border p-2">
                    <div className=" uppercase text-center font-semibold p-2 border-b-[1px]">Thông tin tài khoản</div>
                    <div className=" hover:text-blue-300 cursor-pointer">Tài khoản của tôi</div>
                    <div className="hover:text-blue-300 cursor-pointer">Đăng xuất</div>
                  </div>
                )
              }
            </div>
            <div className=" relative cursor-pointer" >
              <div onClick={() => {
                setAccount(false)
                setSearchBox(false)
                setCartPopUp(!cartPopUp)
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              {
                cartPopUp &&
                (
                  <div className=" absolute top-10 w-[450px] right-0 bg-white rounded border p-2">
                    <CartPopUp/>
                  </div>
                )
              }
            </div>
          </div>
        </header>
    )
}

export default Header