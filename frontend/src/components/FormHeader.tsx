import { Link } from "react-router-dom";

const FormHeader = ({ type }: { type: "signin" | "signup" }) => {
  return (
    <div className="px-10">
      <div className="text-3xl font-extrabold">Create an Account</div>
      <div className="text-slate-400 text-center">
        {type === "signin"
          ? "Don't have an account?"
          : "Already have an account?"}
        <Link
          className="pl-2 underline"
          to={type === "signin" ? "/signup" : "/signin"}
        >
          {type === "signin" ? "Signup" : "Signin"}
        </Link>
      </div>
    </div>
  );
};

export default FormHeader;
