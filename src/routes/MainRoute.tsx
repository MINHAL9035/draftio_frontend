import LoadingSpinner from "@/components/LodingSpinner";
import WithAuth from "@/hoc/WithAuth";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const Home = lazy(() => import("../pages/Home"));
const Blogs = lazy(() => import("@/pages/Blogs"));
const PostBlogs = lazy(() => import("@/pages/PostBlogs"));
const BlogDetails = lazy(() => import("@/pages/BlogDetails"));
const EditBlog = lazy(() => import("@/pages/EditBlog"));

const MainRoute = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>  
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
      </Suspense>
    </>
  );
};

export default MainRoute;
