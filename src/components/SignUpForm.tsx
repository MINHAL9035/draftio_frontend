import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SignupValidationSchema } from "@/validations/SignupValidation";
import { Form, Formik, FormikProps } from "formik";
import { Button } from "@/components/ui/button";
import { SignUpFormValues } from "@/interfaces/signUp.interface";
import handleError from "@/helpers/errorHandler";
import { message } from "antd";
import { Signup } from "@/service/api/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/slice/userSlice";
import { Eye, EyeOff } from "lucide-react";

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues: SignUpFormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: SignUpFormValues) => {
    try {
      const response = await Signup(values);
      if (response.status === 201) {
        message.success("signUp Successfully");
        dispatch(setUserInfo(response.data));
        navigate("/blogs");
      } else {
        message.error(
          response.error || "Something went wrong, please try again"
        );
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupValidationSchema}
      onSubmit={handleSubmit}
    >
      {(formik: FormikProps<SignUpFormValues>) => (
        <Form>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-span-5">
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    {...formik.getFieldProps("name")}
                    className={`${
                      formik.touched.name && formik.errors.name
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <div className="min-h-[20px] mt-1">
                    {formik.touched.name && formik.errors.name && (
                      <div className="text-sm text-red-500">
                        {formik.errors.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <div className="col-span-5">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...formik.getFieldProps("email")}
                    className={`${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <div className="min-h-[20px] mt-1">
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-sm text-red-500">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <div className="col-span-5 relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    {...formik.getFieldProps("password")}
                    className={`${
                      formik.touched.password && formik.errors.password
                        ? "border-red-500"
                        : ""
                    } pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  <div className="min-h-[20px] mt-1">
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-sm text-red-500">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <div className="col-span-5 relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    {...formik.getFieldProps("confirmPassword")}
                    className={`${
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? "border-red-500"
                        : ""
                    } pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                  <div className="min-h-[20px] mt-1">
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <div className="text-sm text-red-500">
                          {formik.errors.confirmPassword}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Create Account
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
