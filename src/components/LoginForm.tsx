import { useState } from "react";
import handleError from "@/helpers/errorHandler";
import { LoginFormValues } from "@/interfaces/signUp.interface";
import { setUserInfo } from "@/redux/slice/userSlice";
import { LoginValidationSchema } from "@/validations/SignupValidation";
import { message } from "antd";
import { Form, Formik, FormikProps } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Login } from "@/service/api/auth";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: LoginFormValues = {
    nameOrEmail: "",
    password: "",
  };

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const response = await Login(values);
      if (response.success && response.status === 201) {
        message.success("Logged in Successfully");
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
      validationSchema={LoginValidationSchema}
      onSubmit={handleSubmit}
    >
      {(formik: FormikProps<LoginFormValues>) => (
        <Form>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <div className="grid grid-cols-4 items-start gap-4">
                <div className="col-span-5">
                  <Input
                    id="nameOrEmail"
                    type="text"
                    placeholder="Enter your name or email"
                    {...formik.getFieldProps("nameOrEmail")}
                    className={`${
                      formik.touched.nameOrEmail && formik.errors.nameOrEmail
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <div className="min-h-[20px] mt-1">
                    {formik.touched.nameOrEmail &&
                      formik.errors.nameOrEmail && (
                        <div className="text-sm text-red-500">
                          {formik.errors.nameOrEmail}
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
                    placeholder="Enter your password"
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
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
