import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SignUpForm from "./SignUpForm";

interface SignupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Signup: React.FC<SignupProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-200">
        <DialogHeader>
          <DialogTitle>Create an account</DialogTitle>
          <DialogDescription>
            Sign up to get started with our platform.
          </DialogDescription>
        </DialogHeader>
        <SignUpForm />
      </DialogContent>
    </Dialog>
  );
};
