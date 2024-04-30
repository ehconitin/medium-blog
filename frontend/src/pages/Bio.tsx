import axios from "axios";
import AppBar from "../components/AppBar";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetUser } from "../hooks";

const Bio = () => {
  const navigate = useNavigate();
  const [bio, setBio] = useState("");
  const { user } = useGetUser();
  return (
    <div>
      <AppBar />
      <div className="h-screen flex flex-col justify-center  ">
        <div className="flex justify-center mb-[400px] lg:mb-44 p-8 lg:p-0">
          <div className="max-w-screen-lg w-full">
            <input
              onChange={(e) => {
                setBio(e.target.value);
              }}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              defaultValue={user?.bio}
            />

            <button
              onClick={() => {
                axios
                  .put(
                    `${BACKEND_URL}/api/v1/user/bio`,
                    { bio },
                    {
                      headers: {
                        Authorization: localStorage.getItem("token"),
                      },
                    }
                  )
                  .then((response) => {
                    setBio(response.data.response);
                    alert("Bio changed");
                    navigate(0);
                  });
              }}
              type="submit"
              className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 "
            >
              Change Bio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
