import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getInitials } from "@/lib/formatters";
import { IUser } from "@/types/user.interface";
import {
  Mail,
  Star,
  Phone,
  MapPin,
  Languages,
  Briefcase,
  Wallet,
  Calendar,
  ShieldCheck,
} from "lucide-react";

interface UserViewDetailDialogProps {
  open: boolean;
  onClose: () => void;
  user: IUser | null;
}

const UserViewDetailDialog = ({
  open,
  onClose,
  user,
}: UserViewDetailDialogProps) => {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            User Profile{" "}
            <Badge variant="outline" className="capitalize">
              {user.role.toLowerCase()}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {/* Header Section */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-28 w-28 border-4 border-white dark:border-slate-800 shadow-xl">
              <AvatarImage src={user?.photo} alt={user?.name} />
              <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                {getInitials(user?.name || "")}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left space-y-2">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <Badge
                  variant={
                    user.userStatus === "ACTIVE" ? "default" : "destructive"
                  }
                >
                  {user.userStatus}
                </Badge>
                {user.isVerified && (
                  <Badge className="bg-blue-500 hover:bg-blue-600">
                    <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                  </Badge>
                )}
                {user.averageRating && (
                  <Badge
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                  >
                    <Star className="w-3 h-3 mr-1 fill-current" />{" "}
                    {user.averageRating.toFixed(1)}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground max-w-md italic">
                {user.bio || "No bio available."}
              </p>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Contact & Basic Info */}
            <div className="space-y-6">
              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>{user.phoneNumber || "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{user.address || "No address listed"}</span>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Account Details
                </h3>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>
                    Joined{" "}
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </section>
            </div>

            {/* Right Column: Tour/Professional Specifics */}
            <div className="space-y-6">
              {(user.expertise || user.dailyRate) && (
                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                    {user.role} Details
                  </h3>
                  <div className="space-y-4">
                    {user.dailyRate && (
                      <div className="flex items-center gap-3">
                        <Wallet className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-lg">
                          ${user.dailyRate}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          / per day
                        </span>
                      </div>
                    )}
                    {user.expertise && user.expertise.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Briefcase className="w-4 h-4" />{" "}
                          <span>Expertise</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {user.expertise.map((exp) => (
                            <Badge
                              key={exp}
                              variant="outline"
                              className="text-[10px]"
                            >
                              {exp}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Languages & Preferences
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Languages className="w-4 h-4" /> <span>Speaks</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {user.languages?.length ? (
                        user.languages.map((lang) => (
                          <Badge key={lang} variant="secondary">
                            {lang}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm">English</span>
                      )}
                    </div>
                  </div>

                  {user.preferences && user.preferences.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-medium">Travel Preferences:</p>
                      <div className="flex flex-wrap gap-1">
                        {user.preferences.map((pref) => (
                          <Badge
                            key={pref}
                            className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-none shadow-none"
                          >
                            {pref}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserViewDetailDialog;
