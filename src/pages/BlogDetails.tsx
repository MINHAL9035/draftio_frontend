import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, Clock, User } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { IBlogResponse } from "@/interfaces/blog.interface";
import { getBlogById } from "@/service/api/addBlog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LodingSpinner";

const BlogDetails = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<IBlogResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlogById(blogId);
        if (response.status === 200 && response.data) {
          setBlog(response.data as IBlogResponse);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">Blog not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-20">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {blog.title}
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <span className="text-gray-700 font-medium">
                {blog.authorId?.name}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{formatDate(blog.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">5 min read</span>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden mb-8">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>
        <div className="bg-white rounded-lg  p-6 md:p-8">
          <div
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className="prose prose-lg max-w-none mx-auto
              prose-headings:text-gray-900 prose-headings:font-bold prose-headings:mb-4
              prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-ul:list-disc prose-ul:pl-4 prose-ul:mb-4
              prose-ol:list-decimal prose-ol:pl-4 prose-ol:mb-4
              prose-li:mb-2
              prose-img:rounded-lg prose-img:my-6
              prose-blockquote:border-l-4 prose-blockquote:border-gray-300 
              prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-6
              prose-a:text-blue-600 prose-a:hover:text-blue-800
              prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
              prose-code:text-sm prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
              [&>*]:whitespace-normal [&>*]:break-words [&>p]:whitespace-pre-wrap"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetails;
