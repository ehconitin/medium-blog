import { useState } from "react";
import FormHeader from "./FormHeader";
import LabelledInput from "./LabelledInput";
import { SigninInput } from "@ehco/blog-common";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SigninAuth = () => {
  const [postInputs, setPostInputs] = useState<SigninInput>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        postInputs
      );
      const jwt = "Bearer " + response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      console.log("error posting axios request");
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <FormHeader type="signin" />

          <div className="pt-4">
            <LabelledInput
              label="Email"
              placeholder="joemama@email.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="123456"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <button
              type="button"
              className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
              onClick={sendRequest}
            >
              Signin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninAuth;
