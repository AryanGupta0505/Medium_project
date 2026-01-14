import { useMemo } from "react"
import { Appbar } from "./Appbar"
import type { Blog } from "../hooks/index"
import { Avatar } from "./BlogCard"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { formatDate } from "../pages/Blogs"
const CATCH_PHRASES = [
  "Grabs attention from the very first line",
  "Turns curiosity into clicks",
  "Writes words you can’t scroll past",
  "Hooks readers in seconds",
  "Where every sentence earns your attention",
  "Makes you stop scrolling",
  "Crafts stories that pull you in",
  "Attention-worthy, every time",
];
function getRandomCatchPhrase() {
  return CATCH_PHRASES[Math.floor(Math.random() * CATCH_PHRASES.length)];
}
export const FullBlog = ({blog ,val }:{blog:Blog ,val:boolean}) => {
  const catchPhrase = useMemo(() => getRandomCatchPhrase(), []);
  return (
    <div>
        <Appbar/>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 pt-2 w-full max-w-screen-xl pt-12">
                <div className="col-span-12 lg:col-span-8 ">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on {formatDate(blog.createdAt)}
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="hidden lg:block lg:col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="flex flex-col justify-center pr-4">
                            <Avatar name={blog.author.name||"Anonymous"} size={8} authorId={blog.author.id} val={val}/>
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name||"Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                {catchPhrase}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {val&&(<ActionButtons blog={blog}/>)}
        </div>
    </div>
  )
}
function ActionButtons({blog}:{blog:Blog}){
    const navigate=useNavigate();
    const blogId=blog.id;
    return(
        <div className="fixed bottom-6 z-50 left-1/2 -translate-x-1/2 lg:left-auto lg:right-6 lg:translate-x-0 flex gap-4">
            <button type="button" onClick={() =>{
                navigate(`/update/${blog.id}`)}
            } className="flex items-center justify-center w-48 m-4 inline-flex items-center px-5 py-2.5 text-md font-bold 
                text-white bg-teal-500 rounded-lg focus:ring-4 focus: ring-green-200 cursor-pointer italic">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                </svg>
                <p className="pl-2">Edit Post</p>
            </button>
            <button type="button" onClick={async ()=>{
                await axios.delete(`${BACKEND_URL}/api/v1/blog/delete`,{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    data:{
                        id:blogId
                    }
                })
                navigate('/blogs');
            }} className="flex items-center justify-center w-48 m-4 inline-flex items-center px-5 py-2.5 text-md font-bold 
                text-red-700 bg-zinc-100 rounded-lg focus:ring-4 focus: ring-green-200 cursor-pointer italic">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
                <p className="pl-2">Delete Post</p>
            </button>
        </div>
    )
}