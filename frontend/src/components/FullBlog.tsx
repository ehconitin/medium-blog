import { Blog } from "../hooks";
import AppBar from "./AppBar";
import Avatar from "./Avatar";

const FullBlog = ({ blog }: { blog: Blog }) => {
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
  return (
    <div>
      <AppBar />
      <div className="flex justify-center ">
        <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
          <div className="col-span-12 lg:col-span-8 pr-5">
            <div className="text-3xl lg:text-5xl font-extrabold">
              {blog.title}
            </div>

            <div className="pt-2 flex justify-start  lg:hidden">
              <div className="flex justify-center flex-col ">
                {" "}
                <Avatar
                  name={blog.author.name || "Anonymous"}
                  size="small"
                />{" "}
              </div>
              <div className="pl-2 text-lg lg:text-xl font-bold flex justify-center flex-col">
                {blog.author.name || "Anonymous"}
              </div>
              <div className="pl-2 text-slate-500  flex justify-center flex-col">
                {" "}
                {convertDateTime(blog.publishedDate)}
              </div>
            </div>

            <div className="pt-4">{blog.content}</div>
          </div>

          <div className="invisible lg:visible col-span-4 pl-5 ">
            <div className="text-slate-600 text-lg">Author</div>

            <div className="flex">
              <div className="pr-2 flex justify-center flex-col">
                <Avatar name={blog.author.name || "Anonymous"} size="big" />{" "}
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">{blog.author.bio}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
