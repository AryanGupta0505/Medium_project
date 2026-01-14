import {  useState, type ChangeEvent } from "react"
import { Appbar } from "../components/Appbar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
export const Create = () => {
  const navigate=useNavigate();
  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");
  return (
    <div>
        <Appbar/>
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
                <label className="block mb-2 text-xl font-semibold text-gray-900">Title</label>
                <input onChange={(e)=>{
                    setTitle(e.target.value)
                }
                } type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus: ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-6" placeholder="Title" required />
                <TextEditor onChange={(e)=>{
                    setContent(e.target.value)
                }}/>
                <div className="flex justify-center mt-10">
                    <button onClick={async () => {
                        const response = await axios.post(`${BACKEND_URL}/api/v1/blog/create`,{
                            title,
                            content
                        },{
                            headers:{
                                Authorization: `Bearer ${localStorage.getItem("token")}`
                            }
                        })
                        navigate(`/blog/${response.data.id}`)
                    }} type="button" className="flex items-center justify-center w-48 m-4 inline-flex items-center px-5 py-2.5 text-md font-bold 
                        text-white bg-green-700 rounded-lg focus:ring-4 focus: ring-green-200 cursor-pointer italic">
                        Publish Post
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
function TextEditor({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}){
    return (
        <div>
            <p className=" pt-3 pb-2 text-lg mb-2 font-medium text-gray-900">
                Content
            </p>
            <div className="w-full border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between px-3 py-4 w-full mb-4 border-slate-300">
                    <div className="bg-white rounded-b-lg w-full">
                        <label className="sr-only">Publish Post</label>
                        <textarea onChange={onChange} id="editor" rows={8} className="block w-full px-4 py-2 text-sm text-gray-800 bg-white
                        border-0 border-gray-300"
                        placeholder="Write an article ... " required />
                    </div>
                </div>
            </div>
        </div>
    )
}