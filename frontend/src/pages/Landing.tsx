import { Navbar } from "../components/Navbar";
import { Image } from "../components/Image";
import { useNavigate } from "react-router-dom";
export const Landing = () => {
  const navigate=useNavigate()
  return (
    <div>
        <Navbar/>
        <div className="relative min-h-screen overflow-hidden">
            <Image />
            <div className="relative z-10">
                <div className="min-h-screen  border-b border-black">
                    <div className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="font-serif text-6xl lg:text-7xl leading-tight text-gray-900">
                                Human <br />
                                stories & ideas
                            </h1>
                            <p className="mt-6 text-lg text-gray-700 max-w-md">
                                A place to read, write, and deepen your understanding
                            </p>
                            <button onClick={()=>{
                                navigate("/signup")
                            }}className="mt-20 px-6 py-3 bg-black text-white rounded-full text-md font-medium hover:bg-gray-800 transition flex items-center gap-2 cursor-pointer">
                                <span>Start Reading</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                    <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};