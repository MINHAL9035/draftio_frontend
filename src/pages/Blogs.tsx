import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { IBlogResponse } from "@/interfaces/blog.interface";
import { getAllBlogs } from "@/service/api/addBlog";
import { message, Modal } from "antd";
import { format, formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Edit2, MoreVertical, Trash2 } from "lucide-react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteBlog } from "@/service/api/deleteBlog";
const { confirm } = Modal;

const Blogs = () => {
  const [blogs, setBlogs] = useState<IBlogResponse[]>([]);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogs();
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

  console.log("blogs", blogs);

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + "...";
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return "Date not available";
    const createdDate = new Date(date);
    const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true });
    const isRecent = createdDate.getMonth() === new Date().getMonth();
    return isRecent ? timeAgo : format(createdDate, "MMM d, yyyy");
  };

  const handleReadMore = (blogId: string) => {
    navigate(`/blogDetails/${blogId}`);
  };

  const handleEdit = (blogId: string) => {
    navigate(`/edit/${blogId}`);
  };

  const showDeleteConfirm = (blogId: string) => {
    confirm({
      title: "Are you sure you want to delete this blog post?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, keep it",
      async onOk() {
        try {
          const response = await deleteBlog(blogId);
          if (response.status === 200) {
            message.success("Blog post deleted successfully");
            fetchBlogs();
          }
        } catch (error) {
          console.log("Failed to delete blog post", error);
        }
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen  mt-10">
        <main className="max-w-6xl mx-auto px-4 py-12">
          <div className="space-y-6">
            {blogs.map((blog) => (
              <article
                key={blog._id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={blog.authorId?.image}
                          alt={blog.authorId?.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <span className="text-gray-900 font-medium">
                            {blog.authorId?.name}
                          </span>
                          <p className="text-sm text-gray-500">
                            {formatDate(blog.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900">
                      {blog.title}
                    </h2>

                    <div
                      className="text-gray-600"
                      dangerouslySetInnerHTML={{
                        __html: truncateText(blog.content, 200),
                      }}
                    />
                    <button
                      onClick={() => handleReadMore(blog._id)}
                      className="text-blue-600 hover:text-blue-700 font-medium ml-2 inline-flex items-center"
                    >
                      Read more
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>

                  <div className="md:w-1/3">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-56 object-cover rounded-lg"
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="hover:bg-gray-100 p-2 rounded-full">
                      <MoreVertical className="h-5 w-5 text-gray-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleEdit(blog._id)}>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => showDeleteConfirm(blog._id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Blogs;
