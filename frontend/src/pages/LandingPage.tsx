import { Link, useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar";

import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

const LandingPage = () => {
  const [exists, setExists] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      axios
        .get(`${BACKEND_URL}/api/v1/user/me`, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then(() => {
          setExists(true);
        })
        .catch((e) => {
          console.log(e);
          setExists(false);
        });
    } catch (error) {
      console.log("error101");
    }
  }, []);
  if (exists) {
    navigate("/blogs");
  } else {
    return (
      <div>
        <AppBar type="landing" />
        <div className="flex justify-center flex-col  h-[822px] bg-gray-900">
          <div className="text-5xl font-extrabold flex justify-center text-white">
            Unleash Your Creativity
          </div>
          <div className="flex justify-center pt-8 text-white">
            Discover a platform that empowers your voice and connects you with a
            community of passionate writers
          </div>
          <div className="flex justify-center pt-8">
            <Link to={"/blogs"}>
              <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">
                Start Writing
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default LandingPage;