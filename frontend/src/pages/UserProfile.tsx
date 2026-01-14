import type { UserProfileType } from "../hooks/index";
import { useUserBlogs, useUserProfile } from "../hooks/index";
import { Appbar } from "../components/Appbar";
import { Avatar, BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useParams } from "react-router-dom";
import { formatDate } from "./Blogs";
import { ProfileLoader } from "../components/ProfileLoader";
export const UserProfile = () => {
    const {id}=useParams();
    const userId=id
    const{loading,userBlogs}=useUserBlogs({userId:userId||''})
    const {userProfile,userProfileLoading}=useUserProfile({userId:userId||''})
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
                     {userBlogs.length === 0 ? (
                        <div className="flex items-center justify-center py-20 text-gray-500 text-lg">
                          {userProfile.name} don’t have any posts yet.
                        </div>
                      ) :(
                        userBlogs.map((blog)=>(
                          <BlogCard authorName={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} id={blog.id} publishedDate={formatDate(blog.createdAt)}
                          authorId={blog.author.id}/>
                        ))
                      )}
                </div>
                <div className="hidden lg:block col-span-3  mt-5 mr-5">
                  {userProfileLoading?(
                    <ProfileLoader/>
                  ):(
                    <UserProfileCard profile={userProfile} userId={userId||''}/>
                  )}
                </div>
            </div>
        </div>
    )
}
function UserProfileCard({ profile ,userId}: { profile: UserProfileType ,userId:string }) {
  return (
    <div className="max-w-sm p-6 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow bg-zinc-200">
      <div className="mb-3 text-2xl font-semibold tracking-tight text-gray-900 flex items-center space-x-3">
         <Avatar name={profile.name} size={10} authorId={userId} />
          <p>{profile.name}</p>
      </div>

      <p className="mb-2 text-lg text-gray-700">
        <span className="font-semibold text-gray-900">Email:</span>{" "}
        {profile.email}
      </p>
    </div>
  );
}
