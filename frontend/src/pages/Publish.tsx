import axios from "axios";
import AppBar from "../components/AppBar";
import TextEditor from "../components/TextEditor";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <AppBar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Title"
          />
          <TextEditor
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button
            onClick={() => {
              if (title && content) {
                axios
                  .post(
                    `${BACKEND_URL}/api/v1/blog`,
                    {
                      title,
                      content,
                    },
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
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publish;
