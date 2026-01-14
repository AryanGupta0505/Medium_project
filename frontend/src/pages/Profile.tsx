import type { ProfileType } from "../hooks/index";
import { useProfile, useProfileBlogs } from "../hooks/index";
import { Appbar } from "../components/Appbar";
import { Avatar, BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { formatDate } from "./Blogs";
import { ProfileLoader } from "../components/ProfileLoader";
export const Profile = () => {
    //@ts-ignore
    const {profile,profileLoading}=useProfile();
    //@ts-ignore
    const {loading,profileBlogs,refetch}=useProfileBlogs();
    if (loading) {
        return <div>
          <Appbar />
          <div className="flex justify-center w-full">
            <div>
              <BlogSkeleton/>
              <BlogSkeleton/>
              <BlogSkeleton/>
              <BlogSkeleton/>
              <BlogSkeleton/>
            </div>
          </div>
        </div>
    }
    return(
        <div>
            <Appbar/>
            <div className="grid grid-cols-10 min-h-screen">
                <div className="max-w-screen-lg mt-5 ml-5 col-span-10 lg:col-span-7">
                     {profileBlogs.length === 0 ? (
                        <div className="flex items-center justify-center py-20 text-gray-500 text-lg">
                          You don’t have any posts yet.
                        </div>
                      ) :(
                        profileBlogs.map((blog)=>(
                          <BlogCard authorName={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} id={blog.id} publishedDate={formatDate(blog.createdAt)}
                          authorId={blog.author.id}/>
                        ))
                      )}
                    <ActionButtons refetch={refetch}/>
                </div>
                <div className="hidden lg:block col-span-3  mt-5 mr-5">
                  {profileLoading?(
                    <ProfileLoader/>
                  ):(
                  <ProfileCard profile={profile}/>
                  )}
                </div>
            </div>
        </div>
    )
}
function ProfileCard({ profile }: { profile: ProfileType }) {
  return (
    <div className="max-w-sm p-6 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow bg-zinc-200">
      <div className="mb-3 text-2xl font-semibold tracking-tight text-gray-900 flex items-center space-x-3">
         <Avatar name={profile.name} size={10} />
          <p>{profile.name}</p>
      </div>

      <p className="mb-2 text-lg text-gray-700">
        <span className="font-semibold text-gray-900">Email:</span>{" "}
        {profile.email}
      </p>

      <p className="text-md text-gray-700">
        <span className="font-medium text-gray-900">Password:</span>{" "}
        {profile.password}
      </p>
    </div>
  );
}
function ActionButtons({refetch}:{refetch:() => Promise<void>|void}){
    const navigate=useNavigate();
    return(
        <div className="mt-8 mb-6
        flex flex-col items-center gap-4
        sm:flex-row sm:justify-center
        lg:fixed lg:bottom-6 lg:right-6 lg:z-50
        lg:flex-col lg:items-end">
            <button type="button" onClick={() =>{
              localStorage.removeItem("token")
              navigate('/signin')}
            } className="flex items-center justify-center w-48 m-4 inline-flex items-center px-5 py-2.5 text-md font-bold 
                text-red-700 bg-zinc-100 rounded-lg focus:ring-4 focus: ring-green-200 cursor-pointer italic">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                  <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                </svg>
                <p className="pl-2">Log Out</p>
            </button>
            <button type="button" onClick={async ()=>{
                await axios.delete(`${BACKEND_URL}/api/v1/blog/deleteAll`,{
                    headers:{
                      Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                refetch()
            }} className="flex items-center justify-center w-48 m-4 inline-flex items-center px-5 py-2.5 text-md font-bold 
                text-red-700 bg-zinc-100 rounded-lg focus:ring-4 focus: ring-green-200 cursor-pointer italic">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
                <p className="pl-2">Delete all posts</p>
            </button>
            <button type="button" onClick={async ()=>{
                await axios.delete(`${BACKEND_URL}/api/v1/user/delete`,{
                    headers:{
                      Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                navigate('/signup')
            }} className="flex items-center justify-center w-48 m-4 inline-flex items-center px-5 py-2.5 text-md font-bold 
                text-red-700 bg-zinc-100 rounded-lg focus:ring-4 focus: ring-green-200 cursor-pointer italic">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
                <p className="pl-2">Delete Account</p>
            </button>
        </div>
    )
}
