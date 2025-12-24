import RegisterForm from "@/components/auth/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RegisterPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crate an Account</CardTitle>
        <CardDescription>
          Enter you information below to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* client component register form */}
        <RegisterForm />
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
