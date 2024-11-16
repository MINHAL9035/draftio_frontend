import { useFormik } from "formik";
import { message, Upload } from "antd";
import { CloseOutlined, InboxOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogValidationSchema } from "@/validations/blogValidation";
import { IBlog } from "@/interfaces/blog.interface";
import { useNavigate } from "react-router-dom";
import { addBlog } from "@/service/api/addBlog";

const { Dragger } = Upload;

const PostBlogs = () => {
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "blockquote", "code-block"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const handleSubmit = async (values: IBlog) => {
    try {
      console.log("Form Values:", values);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      if (values.image) {
        formData.append("image", values.image);
      }

      const response = await addBlog(formData);
      if (response.status === 201) {
        message.success("Blog posted successfully");
        navigate("/blogs");
      } else {
        message.error(response.error);
      }
    } catch (error) {
      console.error("Submission error:", error);
      message.error("Failed to save blog post");
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      image: null,
      content: "",
    },
    validationSchema: blogValidationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-20">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div className="h-6">
              {" "}
              {formik.touched.title && formik.errors.title && (
                <div className="mt-1 text-sm text-red-600">
                  {formik.errors.title}
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image
            </label>

            {formik.values.image ? (
              <div className="relative">
                <img
                  src={URL.createObjectURL(formik.values.image)}
                  alt="Preview"
                  className="max-h-48 mx-auto rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => formik.setFieldValue("image", null)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <CloseOutlined />
                </button>
              </div>
            ) : (
              <ImgCrop rotationSlider aspect={16 / 9}>
                <Dragger
                  name="image"
                  multiple={false}
                  maxCount={1}
                  accept="image/*"
                  showUploadList={false}
                  beforeUpload={(file) => {
                    formik.setFieldValue("image", file);
                    formik.setFieldTouched("image", true);
                    return false;
                  }}
                  className="bg-gray-50 rounded-lg"
                >
                  <p className="text-2xl">
                    <InboxOutlined />
                  </p>
                  <p className="text-sm text-gray-600">
                    Click or drag file to upload
                  </p>
                  <p className="text-xs text-gray-400">
                    Supports single image upload
                  </p>
                </Dragger>
              </ImgCrop>
            )}
            <div className="h-6">
              {" "}
              {formik.touched.image && formik.errors.image && (
                <div className="mt-1 text-sm text-red-600">
                  {formik.errors.image}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <ReactQuill
              theme="snow"
              className="h-64 mb-12"
              modules={modules}
              value={formik.values.content}
              onChange={(content) => {
                formik.setFieldValue("content", content);
                formik.setFieldTouched("content", true);
              }}
              onBlur={() => formik.setFieldTouched("content", true)}
            />
            <div className="h-6">
              {" "}
              {formik.touched.content && formik.errors.content && (
                <div className="mt-1 text-sm text-red-600">
                  {formik.errors.content}
                </div>
              )}
            </div>
          </div>

          <div className="pt-8">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {formik.isSubmitting ? "Creating..." : "Create Post"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default PostBlogs;
