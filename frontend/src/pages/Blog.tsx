import { useNavigate, useParams } from "react-router-dom";
import FullBlog from "../components/FullBlog";
import { useBlog, useUserLoggedIn } from "../hooks";
import Spinner from "../components/Spinner";
import AppBar from "../components/AppBar";
import { useEffect } from "react";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  const { exists } = useUserLoggedIn();
  const navigate = useNavigate();
  useEffect(() => {
    if (!exists) {
      navigate("/");
    }
  }, [exists, navigate]);
  if (loading || !blog) {
    return (
      <div>
        <AppBar />
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center pb-48">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};

export default Blog;
