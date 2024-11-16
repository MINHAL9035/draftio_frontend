import * as Yup from "yup";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const SUPPORTED_IMAGE_FORMATS = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const blogValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),

  content: Yup.string()
    .required("Content is required")
    .min(50, "Content must be at least 50 characters"),

  image: Yup.mixed()
    .nullable()
    .test("file-required", "Cover image is required", (value) => {
      return Boolean(value);
    })
    .test("is-image", "Please upload a valid image file", (value) => {
      return (
        !value ||
        (value instanceof File && SUPPORTED_IMAGE_FORMATS.includes(value.type))
      );
    })
    .test("file-size", "File is too large. Max size is 5MB", (value) => {
      return !value || (value instanceof File && value.size <= MAX_FILE_SIZE);
    }),
});

export const blogEditValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),

  content: Yup.string()
    .required("Content is required")
    .min(50, "Content must be at least 50 characters"),
});
