import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Blogs from "@/pages/Blogs";
import WithAuth from "@/hoc/WithAuth";
import PostBlogs from "@/pages/PostBlogs";
import BlogDetails from "@/pages/BlogDetails";
import EditBlog from "@/pages/EditBlog";

const MainRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<WithAuth component={Blogs} />} />
        <Route path="/create" element={<WithAuth component={PostBlogs} />} />
        <Route
          path="/blogDetails/:blogId"
          element={<WithAuth component={BlogDetails} />}
        />
        <Route
          path="/edit/:blogId"
          element={<WithAuth component={EditBlog} />}
        />
      </Routes>
    </>
  );
};

export default MainRoute;
