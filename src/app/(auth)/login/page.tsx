import LoginForm from "@/components/auth/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LoginPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Enter you information below to login</CardDescription>
      </CardHeader>
      <CardContent>
        {/* client component login form */}
        <LoginForm />
      </CardContent>
    </Card>
  );
};

export default LoginPage;
