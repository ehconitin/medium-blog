import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { useEffect, useState } from "react";
import BlogOptionsDropDown from "./BlogOptionsDropDown";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
  editButton: boolean;
}

const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
  editButton,
}: BlogCardProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className="border-b pb-4 p-4 border-slate-200 w-screen max-w-screen-md ">
      <div className="flex justify-between">
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
        {editButton === true ? (
          <div
            className="h-6 w-6 cursor-pointer"
            onClick={() => {
              setIsVisible(!isVisible);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.39 12c0 .55.2 1.02.59 1.41.39.4.86.59 1.4.59.56 0 1.03-.2 1.42-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.6-1.41A1.93 1.93 0 0 0 6.4 10c-.55 0-1.02.2-1.41.59-.4.39-.6.86-.6 1.41zM10 12c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59.54 0 1.02-.2 1.4-.59.4-.39.6-.86.6-1.41 0-.55-.2-1.02-.6-1.41a1.93 1.93 0 0 0-1.4-.59c-.55 0-1.04.2-1.42.59-.4.39-.58.86-.58 1.41zm5.6 0c0 .55.2 1.02.57 1.41.4.4.88.59 1.43.59.57 0 1.04-.2 1.43-.59.39-.39.57-.86.57-1.41 0-.55-.2-1.02-.57-1.41A1.93 1.93 0 0 0 17.6 10c-.55 0-1.04.2-1.43.59-.38.39-.57.86-.57 1.41z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        ) : null}
        {isVisible === true ? (
          <div className="absolute mt-6 left-[1200px]">
            <BlogOptionsDropDown
              id={id}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
            />
          </div>
        ) : null}
      </div>
      <Link to={`/blog/${id}`} className="cursor-pointer">
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin">{content.slice(0, 100) + " "}</div>
      </Link>
      <div className="text-slate-400 text-sm font-thin pt-4">{`${Math.ceil(
        content.length / 100
      )} minute(s) read`}</div>
    </div>
  );
};

export default BlogCard;
