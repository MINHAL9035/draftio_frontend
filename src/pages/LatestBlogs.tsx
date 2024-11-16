import { IBlogResponse } from "@/interfaces/blog.interface";
import { getLatestBlogs } from "@/service/api/addBlog";
import { message } from "antd";
import { format, formatDistanceToNow } from "date-fns";
import { Clock, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LatestBlogs = () => {
  const [blogs, setBlogs] = useState<IBlogResponse[]>([]);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await getLatestBlogs();
      if (response.status === 200 && response.data) {
        setBlogs(response.data as IBlogResponse[]);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      message.error("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleClick = (blogId: string) => {
    navigate(`/blogDetails/${blogId}`);
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return "Date not available";
    const createdDate = new Date(date);
    const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true });
    const isRecent = createdDate.getMonth() === new Date().getMonth();
    return isRecent ? timeAgo : format(createdDate, "MMM d, yyyy");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-8 text-gray-900">
        Latest Blog Posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => handleClick(blog._id)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                >
                  <ArrowUpRight className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-600">
                  {blog.authorId?.name}
                </h3>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatDate(blog?.createdAt)}
                </div>
              </div>

              <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                {blog.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlogs;
