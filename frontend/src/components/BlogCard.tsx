import { Link } from "react-router-dom";
import Avatar from "./Avatar";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b pb-4 p-4 border-slate-200 w-screen max-w-screen-md cursor-pointer">
        <div>
          <div className="flex">
            <div className="flex justify-center flex-col">
              <Avatar name={authorName} />
            </div>
            <div className="font-extrathin pl-2 text-sm flex justify-center flex-col">
              {authorName}
            </div>
            <div className="text-slate-400 text-xs flex justify-center flex-col pl-2">
              &#9679;
            </div>
            <div className="pl-2 font-thin text-slate-800 text-sm flex justify-center flex-col">
              {publishedDate}
            </div>
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin">{content.slice(0, 100) + " "}</div>
        <div className="text-slate-400 text-sm font-thin pt-4">{`${Math.ceil(
          content.length / 100
        )} minute(s) read`}</div>
      </div>
    </Link>
  );
};

export default BlogCard;
