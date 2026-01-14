import { Link } from "react-router-dom"
export const Navbar=()=>{
    return(
        <div className="border-b flex justify-between px-6 py-4">
            <div className="flex items-center gap-12">
                <Link to={"/"} className="flex flex-col justify-center font-bold text-2xl cursor-pointer mr-4 pl-10">
                    Medium
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <Link to={"/signin"}>
                    <button type="button" className="hidden sm:flex items-center gap-2 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus: ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center cursor-pointer mr-10">
                        <span>Sign in</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-power" viewBox="0 0 16 16">
                            <path d="M7.5 1v7h1V1z"/>
                            <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"/>
                        </svg>
                    </button>
                </Link>
                <Link to={"/signup"}>
                    <button type="button" className="flex items-center gap-2 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus: ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center cursor-pointer mr-10">
                        <span>Get Started</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                        </svg>
                    </button>
                </Link>
            </div>
        </div>
    )
}