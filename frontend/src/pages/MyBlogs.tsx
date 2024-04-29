import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";
import { useGetMyBlogs } from "../hooks";

const MyBlogs = () => {
  const { loading, blogs } = useGetMyBlogs();
  function convertDateTime(timestamp: string) {
    const date = new Date(timestamp);
    const options = {
      month: "short" as const,
      day: "2-digit" as const,
      year: "numeric" as const,
    };
    const localDateString = date.toLocaleString(undefined, options);

    return localDateString;
  }
  if (loading) {
    return (
      <div>
        <AppBar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className=" ">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={convertDateTime(blog.publishedDate)}
              editButton={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
