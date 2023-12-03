import { useUserPackageHook } from "../redux/hooks/userHook"

const HeaderSeller = (props) => {
    const data = useUserPackageHook()

    const {isSeller} = props

    return(
        <header className="bg-white border-b-2">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8"
                aria-label="Global"
            >
                <div className="flex">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt=""
                        />
                    </a>
                </div>
                { isSeller ? (<div></div>) : (<div className=" text-xl font-semibold ml-7">Đăng ký để trở thành người bán hàng</div>)}
                <div className="flex items-center justify-between cursor-pointer">
                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                      <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    </div>
                     <div className=" ml-3">{data?.user?.email.slice(0, data?.user?.email.indexOf("@"))}</div>
                </div>
            </nav>
        </header>
    )
}

export default HeaderSeller