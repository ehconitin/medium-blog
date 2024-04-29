import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

interface BlogOptionsDropDownProps {
  id: string;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const BlogOptionsDropDown = ({
  id,

  setIsVisible,
}: BlogOptionsDropDownProps) => {
  const navigate = useNavigate();
  return (
    <div
      id="dropdownAvatar"
      className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 "
    >
      <ul
        className="py-2 text-sm text-gray-700"
        aria-labelledby="dropdownUserAvatarButton"
      >
        <li>
          <a
            onClick={() => {
              navigate(`/updateBlog/${id}`);
            }}
            className="block px-4 py-2 hover:bg-gray-100 "
          >
            Edit
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              axios
                .delete(`${BACKEND_URL}/api/v1/blog/delete/${id}`, {
                  headers: { Authorization: localStorage.getItem("token") },
                })
                .then(() => {
                  alert("Blog deleted");

                  navigate(0);
                });
            }}
            className="block px-4 py-2 hover:bg-gray-100 "
          >
            Delete
          </a>
        </li>
      </ul>
      <div className="py-2">
        <a
          onClick={() => {
            setIsVisible(false);
          }}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
        >
          Close
        </a>
      </div>
    </div>
  );
};

export default BlogOptionsDropDown;
