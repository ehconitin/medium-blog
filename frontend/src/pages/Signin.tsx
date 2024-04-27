import { useNavigate } from "react-router-dom";
import Quote from "../components/Quote";
import SigninAuth from "../components/SigninAuth";
import { useGetUser } from "../hooks";

const Signin = () => {
  const { user } = useGetUser();
  const navigate = useNavigate();
  if (user) {
    navigate("/blogs");
  }
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <SigninAuth />
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  );
};

export default Signin;
