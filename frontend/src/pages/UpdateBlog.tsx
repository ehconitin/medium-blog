import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import { useNavigate, useParams } from "react-router-dom";
import TextEditor from "../components/TextEditor";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useBlog, useUserLoggedIn } from "../hooks";

const UpdateBlog = () => {
  const { id } = useParams();
  const { blog } = useBlog({ id: id || "" });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { exists } = useUserLoggedIn();
  const navigate = useNavigate();
  useEffect(() => {
    if (!exists) {
      navigate("/");
    }
  }, [exists, navigate]);

  return (
    <div>
      <AppBar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full p-8 lg:p-0">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="title"
            defaultValue={blog?.title}
          />
          <TextEditor
            onChange={(e) => {
              setContent(e.target.value);
            }}
            defaultValue={blog?.content}
          />
          <button
            onClick={() => {
              if (title && content) {
                axios
                  .put(
                    `${BACKEND_URL}/api/v1/blog/${id}`,
                    { id, title, content },
                    {
                      headers: {
                        Authorization: localStorage.getItem("token"),
                      },
                    }
                  )
                  .then((response) => {
                    navigate(`/blog/${response.data.response.id}`);
                  });
              } else {
                alert("Title or content can not be empty");
              }
            }}
            type="submit"
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 "
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
