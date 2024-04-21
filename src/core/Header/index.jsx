import { useRef, useState } from "react"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import './style.scss'
import SearchBox from "../../component/SearchBox/SearchBox"
import CartPopUp from "../../component/CartPopUp/CartPopUp"
import { clear } from "../../redux/actions"

const Header = () => {
  const user = useUserPackageHook()
  const [searchBox, setSearchBox] = useState(false)
  const [account, setAccount] = useState(false)
  const [cartPopUp, setCartPopUp] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAccount = () => {
    if (user?.data) {
      setAccount(!account)
      setSearchBox(false)
      setCartPopUp(false)
    } else {
      navigate('/login')
    }
  }

  const handleLogOut = () => {
    dispatch(clear())
    setAccount(!account)
    navigate('/')
  }

  const classNameOfMenu = "w-[140px] px-4 py-2 flex items-center justify-between cursor-pointer hover:text-[rgb(0,4,255)]";


  const category = [
    {
      key: '1',
      icon: null,
      children: [
        {
          key: '2',
          icon: null,
          children: null,
          label: 'Ao so mi',
          type: '',
        },
        {
          key: '3',
          icon: null,
          children: null,
          label: 'Ao thun',
          type: ''
        }
      ],
      label: 'Ao',
      type: ''
    },
    {
      key: '4',
      icon: null,
      children: [
        {
          key: '5',
          icon: null,
          children: null,
          label: 'Quan dui',
          type: '',
        },
        {
          key: '6',
          icon: null,
          children: null,
          label: 'Quan dai',
          type: ''
        }
      ],
      label: 'Quan',
      type: ''
    }
  ]


  return (
    <header>
      <div>LOGO</div>
      <nav class="menu">
        <ul>
          <li className="px-3 cursor-pointer"><div>TRANG CHỦ</div></li>
          <li className="px-3 cursor-pointer">
            <div>SẢN PHẨM ▾</div>
            <ul>
              <li>
                {
                  category?.map((item) => {
                    return (
                      <>
                        <div
                          className="w-[105px] px-4 py-2 flex items-center justify-between cursor-pointer hover:text-[rgb(0,4,255)]"
                        >
                          <div>{item?.label}</div>
                          <div>▾</div>
                        </div>
                        <ul className=" border">
                          {/* {
                            item?.children?.map((children) => {
                                console.log(children)
                                return(
                                    <li>
                                        <div className={`${classNameOfMenu}`}>{children?.label}</div>
                                    </li>
                                )
                            })
                          } */}
                          <li>
                            <div className={`${classNameOfMenu}`}>XEM TẤT CẢ ÁO</div>
                          </li>
                          <li>
                            <div className={`${classNameOfMenu}`}>ÁO THUN</div>
                          </li>
                          <li>
                            <div className={`${classNameOfMenu}`}>ÁO SƠ MI</div>
                          </li>
                          <li>
                            <div className={`${classNameOfMenu}`}>ÁO POLO</div>
                          </li>
                        </ul>
                      </>
                    )
                  })
                }

              </li>
            </ul>
          </li>
          <li className="px-3 cursor-pointer"><div>CỬA HÀNG</div></li>
          <li className="px-3 cursor-pointer">
            <div>CHÍNH SÁCH ▾</div>
            <ul>
              <li>
                <div className="w-[180px] px-4 py-2 flex items-center justify-between cursor-pointer hover:text-[rgb(0,4,255)]">CHÍNH SÁCH ĐỔI TRẢ</div>
              </li>
              <li>
                <div className="w-[180px] px-4 py-2 flex items-center justify-between cursor-pointer hover:text-[rgb(0,4,255)]">CHÍNH SÁCH BẢO MẬT</div>
              </li>
              <li>
                <div className="w-[180px] px-4 py-2 flex items-center justify-between cursor-pointer hover:text-[rgb(0,4,255)]">CHÍNH SÁCH GIAO HÀNG</div>
              </li>
              <li>
                <div className="w-[180px] px-4 py-2 flex items-center justify-between cursor-pointer hover:text-[rgb(0,4,255)]">PHƯƠNG THỨC THANH TOÁN</div>
              </li>
              <li>
                <div className="w-[180px] px-4 py-2 flex items-center justify-between cursor-pointer hover:text-[rgb(0,4,255)]">HƯỚNG DẪN MUA HÀNG</div>
              </li>
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
                <SearchBox />
              </div>
            )
          }
        </div>
        <div className=" cursor-pointer relative">
          <div onClick={() => handleAccount()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </div>
          {
            account &&
            (
              <div className=" absolute right-1 top-10 w-[220px] bg-white rounded border p-2 z-[999]">
                <div className=" uppercase text-center font-semibold p-2 border-b-[1px]">Thông tin tài khoản</div>
                <div onClick={() => {
                  navigate("/account")
                  setAccount(!account)
                }} className=" hover:text-blue-300 cursor-pointer">Tài khoản của tôi</div>
                <div onClick={handleLogOut} className="hover:text-blue-300 cursor-pointer">Đăng xuất</div>
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
              <div className=" absolute top-10 w-[450px] right-0 bg-white rounded border p-2 z-[999]">
                <CartPopUp />
              </div>
            )
          }
        </div>
      </div>
    </header>
  )
}

export default Header