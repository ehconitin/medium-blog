import { useNavigate } from "react-router-dom";
import { User } from "../hooks";

const AvatarDropDown = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  return (
    <div
      id="dropdownAvatar"
      className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 "
    >
      <div className="px-4 py-3 text-sm text-gray-900 ">
        <div>{user.name}</div>
        <div className="font-medium truncate">{user.email}</div>
      </div>
      <ul
        className="py-2 text-sm text-gray-700"
        aria-labelledby="dropdownUserAvatarButton"
      >
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">
            My blogs
          </a>
        </li>
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">
            Update profile
          </a>
        </li>
      </ul>
      <div className="py-2">
        <a
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/signin");
          }}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
        >
          Sign out
        </a>
      </div>
    </div>
  );
};

export default AvatarDropDown;
