import ChangePasswordForm from "@/components/modules/Dashboard/ChangePasswordForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { KeyRound } from "lucide-react"; // Passwords related icon
export const dynamic = "force-dynamic";
const ChangePasswordPage = () => {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center p-4 shadow-2xl shadow-primary/10 rounded-4xl">
      <Card className="w-full max-w-md shadow-lg border border-foreground">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto bg-amber-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <KeyRound className="text-amber-600 w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            Change Password
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Secure your account by updating your current password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePasswordPage;
