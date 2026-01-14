import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Loader } from "../components/Loader";
export const Blog = () => {
  //ideally for blog should use atom/recoil
  const {id} = useParams();
  const {loading,blog,val}= useBlog({
      id : id || ""
    });
  if(loading || !blog){
    return <div>
      <Appbar/>
      <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
          <Loader/>
        </div>
      </div>
    </div>
  }
  return (
    <div>
      <FullBlog blog={blog} val={val}/>
    </div>
  )
}