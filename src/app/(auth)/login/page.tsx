import LoginForm from "@/components/auth/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect: string }>;
}) => {
  const params = ((await searchParams) || {}) as { redirect: string };
  console.log(params.redirect);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Enter you information below to login</CardDescription>
      </CardHeader>
      <CardContent>
        {/* client component login form */}
        <LoginForm redirect={params.redirect} />
      </CardContent>
    </Card>
  );
};

export default LoginPage;
