import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { IBlog } from "@/interfaces/blog.interface";
import { getBlogById } from "@/service/api/addBlog";
import { format, formatDistanceToNow } from "date-fns";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { blogId } = useParams();

  const [blog, setBlog] = useState<IBlog | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlogById(blogId);
        if (response.status === 200 && response.data) {
          setBlog(response.data as IBlog);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  const formatDate = (date: string | undefined) => {
    if (!date) return "Date not available";
    const createdDate = new Date(date);
    const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true });
    const isRecent = createdDate.getMonth() === new Date().getMonth();
    return isRecent ? timeAgo : format(createdDate, "MMM d, yyyy");
  };

  if (!blog) {
    return (
      <>
        <div className="max-w-4xl mx-auto px-4 py-8">Loading...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-16 px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {blog?.title}
          </h1>
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm text-gray-500">Author</p>
                <p className="font-medium text-gray-900">
                  {blog?.authorId?.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{formatDate(blog?.createdAt)}</span>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="relative w-full h-96 rounded-xl overflow-hidden mb-8">
          <img
            src="/HomePage.jpg"
            alt="kadka"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
            className="leading-relaxed"
          />
        </article>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetails;
