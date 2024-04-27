import { useParams } from "react-router-dom";
import FullBlog from "../components/FullBlog";
import { useBlog } from "../hooks";
import Spinner from "../components/Spinner";
import AppBar from "../components/AppBar";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
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
