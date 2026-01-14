import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"
export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
export const Blogs = () => {
  const { loading, blogs } = useBlogs();
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
  return (
    <div>
        <Appbar/>
        <div className="flex justify-center">
            <div>
                {blogs.map(blog=><BlogCard authorName={blog.author.name||"Anonymous"} title={blog.title} content={blog.content} publishedDate={formatDate(blog.createdAt||"Publication date forthcoming")}
                id={blog.id} authorId={blog.author.id}/>)}
            </div>
        </div>
    </div>
  )
}