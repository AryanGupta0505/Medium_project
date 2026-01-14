import { Link } from "react-router-dom"
// import { Avatar } from "./BlogCard"
import { useProfile } from "../hooks"
import { Back } from "./Back"
export const Appbar=()=>{
    const {profile}=useProfile();
    return(
        <div className="border-b flex justify-between px-6 py-4">
            <div className="flex items-center gap-12">
                <Back/>
                <Link to={"/blogs"} className="flex flex-col justify-center font-bold text-xl cursor-pointer mr-4">
                    Medium
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <Link to={"/create"}>
                    <button type="button" className="flex items-center gap-2 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus: ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-patch-plus" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5"/>
                            <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z"/>
                        </svg>
                        <span className="hidden sm:inline">Create Blog</span>
                    </button>
                </Link>
                <Link to={"/profile"}>
                    <div className="relative inline-flex items-center
                        justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full
                        dark:bg-gray-600">
                        <span className="font-medium text-gray-600 dark:text-gray-300">
                            {profile.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}