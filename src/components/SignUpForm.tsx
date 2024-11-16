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

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
                  />{" "}
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
                <div className="col-span-5">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    {...formik.getFieldProps("password")}
                    className={`${
                      formik.touched.password && formik.errors.password
                        ? "border-red-500"
                        : ""
                    }`}
                  />
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
                <div className="col-span-5">
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    {...formik.getFieldProps("confirmPassword")}
                    className={`${
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? "border-red-500"
                        : ""
                    }`}
                  />
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
