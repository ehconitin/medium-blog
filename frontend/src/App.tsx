import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import Publish from "./pages/Publish";
import MyBlogs from "./pages/MyBlogs";
import Bio from "./pages/Bio";
import UpdateBlog from "./pages/UpdateBlog";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/updateBlog/:id" element={<UpdateBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
