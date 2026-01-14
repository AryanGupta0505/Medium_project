import { Link, useNavigate } from "react-router-dom";
interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
    authorId:string;
}
export const BlogCard = ({ authorName, title, content, publishedDate,id}: BlogCardProps) => {
  const navigate=useNavigate()
  return (
        <div onClick={()=>{
            navigate(`/blog/${id}`)
        }}className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                <Avatar name={authorName}/>
                <div className="flex justify-center flex-col font-extralight pl-2 text-sm">{authorName}</div>
                <div className="flex justify-center flex-col pl-2"><Circle /></div>
                <div className="flex justify-center flex-col font-thin pl-2 text-slate-400 text-sm">{publishedDate}</div>
            </div>
            <div className="text-xl font-semibold pt-2">{title}</div>
            <div className="text-md font-thin">{content.length >= 100 ? content.substring(0, 100) + "..." : content}</div>
            <div className="text-slate-500 w-full text-sm font-thin pt-2">{`${Math.ceil(content.length / 100)} minute(s) read`}</div>
        </div>
  )
}
export function Circle(){
    return <div className="h-1 w-1 rounded-full bg-gray-600">
    </div>
}
const sizeMap: Record<number, string> = {
  4: "w-4 h-4",
  6: "w-6 h-6",
  8: "w-8 h-8",
  10: "w-10 h-10",
  12: "w-12 h-12",
};
export function Avatar({name,size = 6,authorId,val=false}:{name:string,size?:number,authorId?:string,val?:boolean}){
    if (!authorId) {
    return (
      <div
        className={`relative inline-flex items-center justify-center 
        ${sizeMap[size]} bg-zinc-500 rounded-full`}
      >
        <span className="font-medium text-gray-600 dark:text-gray-300">{name.charAt(0).toUpperCase()}</span>
      </div>
    );
  }
    return val?(
        <Link to={`/profile`} onClickCapture={(e) => e.stopPropagation()}>
            <div className={`relative inline-flex items-center
                justify-center ${sizeMap[size]} overflow-hidden bg-gray-100 rounded-full
                dark:bg-gray-600`}>
                <span className="font-medium text-gray-600 dark:text-gray-300">
                    {name.charAt(0).toUpperCase()}
                </span>
            </div>
        </Link>
    ):(
        <Link to={`/userProfile/${authorId}`} onClickCapture={(e) => e.stopPropagation()}>
            <div className={`relative inline-flex items-center
                justify-center ${sizeMap[size]} overflow-hidden bg-gray-100 rounded-full
                dark:bg-gray-600`}>
                <span className="font-medium text-gray-600 dark:text-gray-300">
                    {name.charAt(0).toUpperCase()}
                </span>
            </div>
        </Link>
    )
}