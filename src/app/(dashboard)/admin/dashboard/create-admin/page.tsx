import CreateAdminForm from "@/components/modules/Admin/AdminManagement/CreateAdminForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ShieldCheck } from "lucide-react"; // Optional icon for admin feel

export const dynamic = "force-dynamic";

const CreateAdminPage = async () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-lg shadow-xl overflow-hidden">
        {/* Top accent bar for Admin Page */}
        <div className="h-1.5 bg-primary w-full" />

        <CardHeader className="space-y-2 text-center pt-8">
          <div className="mx-auto bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-2">
            <ShieldCheck className="text-primary w-6 h-6" />
          </div>
          <CardTitle className="text-3xl font-extrabold tracking-tight text-foreground">
            Create New Admin
          </CardTitle>
          <CardDescription className="text-muted-foreground max-w-xs mx-auto">
            Assign a new administrative user with specific access privileges.
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-8">
          <CreateAdminForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAdminPage;
