const BlogSkeleton = () => {
  return (
    <div role="status" className=" animate-pulse pt-2">
      <div className="border-b pb-4 p-4 border-slate-200 w-screen max-w-screen-md cursor-pointer">
        <div>
          <div className="flex justify-center flex-col">
            <div className="flex">
              <div className="h-4  bg-gray-200 rounded-full  w-20 mb-4"></div>

              <div className="text-slate-400 text-xs  pl-2">&#9679;</div>
              <div className="h-2 bg-gray-200 rounded-full w-20 my-0.5 ml-2"></div>
            </div>
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">
          {" "}
          <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        </div>
        <div className="text-md font-thin">
          {" "}
          <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        </div>
        <div className="text-slate-400 text-sm font-thin ">
          {" "}
          <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
          <div className="pt-6">
            <div className="h-2  bg-gray-200 rounded-full w-10  mb-2.5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSkeleton;
