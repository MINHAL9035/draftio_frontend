import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/LoginForm";

interface WithAuthProps {
  component: React.ComponentType;
}

const WithAuth: React.FC<WithAuthProps> = ({ component: Component }) => {
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [showLoginModal, setShowLoginModal] = useState(!userInfo);

  const handleModalClose = () => {
    setShowLoginModal(false);
    navigate("/");
  };

  if (userInfo) {
    return <Component />;
  }

  return (
    <>
      <Dialog
        open={showLoginModal}
        onOpenChange={(open) => {
          if (!open) {
            handleModalClose();
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {" "}
            <p className="text-sm text-gray-500">
              Please log in to access this page.
            </p>
            <div className="space-y-4">
              <LoginForm />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WithAuth;
