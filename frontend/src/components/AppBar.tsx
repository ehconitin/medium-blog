import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import AvatarDropDown from "./AvatarDropDown";
import { useGetUser } from "../hooks";

const AppBar = ({ type = "normal" }: { type?: "landing" | "normal" }) => {
  const { user } = useGetUser();
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  return (
    <div className="static border-b flex justify-between px-4 py-4 lg:px-10">
      <Link to={"/blogs"} className="flex justify-center flex-col">
        Medium
      </Link>

      {type === "landing" ? (
        <div className="flex justify-center ">
          <Link to={"/signin"} className="flex justify-center flex-col">
            <button
              type="button"
              className="app-bar-button mr-0 lg:mr-4 text-slate-900  hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 "
            >
              Sign in
            </button>
          </Link>
          <Link to={"/signup"}>
            <button
              type="button"
              className="app-bar-button mr-0 lg:mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2"
            >
              Get Started
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to={"/publish"}>
            <button
              type="button"
              className="app-bar-button mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 "
            >
              New
            </button>
          </Link>
          <button
            onClick={() => {
              setShowDropDown(!showDropDown);
            }}
            type="button"
          >
            {user ? (
              <Avatar name={user.name} size="big" />
            ) : (
              <Avatar name="!" size="big" />
            )}
            {showDropDown && user && (
              <div className="absolute top-16 right-4">
                <AvatarDropDown user={user} />
              </div>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default AppBar;
