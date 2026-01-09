"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import { getInitials } from "@/lib/formatters";
import { updateMyProfile } from "@/services/auth/auth.service";
import { IUser } from "@/types/user.interface";
import { LANGUAGES } from "@/constant/languages";
import { EXPERTISE_OPTIONS } from "@/constant/expertise";
import {
  Briefcase,
  Camera,
  DollarSign,
  Globe,
  Heart,
  Loader2,
  Save,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface MyProfileProps {
  userInfo: IUser;
}

const MyProfile = ({ userInfo }: MyProfileProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    userInfo?.languages || []
  );
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>(
    userInfo?.expertise || []
  );
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(
    userInfo?.preferences || []
  );

  const getProfilePhoto = () => {
    if (userInfo?.photo) {
      return userInfo?.photo;
    }

    return null;
  };

  const getProfileData = () => {
    if (userInfo) {
      return userInfo;
    }
    return null;
  };
  const profilePhoto = getProfilePhoto();
  const profileData = getProfileData();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    if (userInfo?._id) {
      formData.append("id", userInfo._id);
    }

    // Add array fields
    selectedLanguages.forEach((lang) => formData.append("languages", lang));
    selectedExpertise.forEach((exp) => formData.append("expertise", exp));
    selectedPreferences.forEach((pref) => formData.append("preferences", pref));

    startTransition(async () => {
      const result = await updateMyProfile(formData);

      if (result.success) {
        setSuccess(result.message);
        setPreviewImage(null);
        router.refresh();
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal information
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Profile Card */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Profile Summary</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            {/* Identity Section */}
            <div className="flex flex-col items-center space-y-4 w-full">
              <div className="relative">
                <Avatar className="h-32 w-32 border-2 border-primary/10">
                  {previewImage || profilePhoto ? (
                    <AvatarImage
                      src={previewImage || (profilePhoto as string)}
                      alt={userInfo.name}
                      className="object-cover"
                    />
                  ) : (
                    <AvatarFallback className="text-3xl bg-primary/5 text-primary">
                      {getInitials(userInfo.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <label
                  htmlFor="file"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer shadow-lg hover:scale-105 transition-transform"
                >
                  <Camera className="h-4 w-4" />
                  <Input
                    type="file"
                    id="file"
                    name="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={isPending}
                  />
                </label>
              </div>

              <div className="text-center">
                <h2 className="font-bold text-xl">{userInfo.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {userInfo.email}
                </p>
                <Badge variant="secondary" className="mt-2 capitalize">
                  <User className="w-3 h-3 mr-1" />{" "}
                  {userInfo.role.toLowerCase()}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Details Section */}
            <div className="w-full space-y-4">
              {/* Bio (Common) */}
              {userInfo.bio && (
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase text-muted-foreground">
                    About Me
                  </p>
                  <p className="text-sm italic text-foreground/80 leading-relaxed">
                    &quot;{userInfo.bio}&quot;
                  </p>
                </div>
              )}

              {/* Languages (Common) */}
              <div className="space-y-2">
                <div className="flex items-center text-xs font-semibold uppercase text-muted-foreground">
                  <Globe className="w-3 h-3 mr-1" /> Languages
                </div>
                <div className="flex flex-wrap gap-1">
                  {userInfo.languages && userInfo.languages.length > 0 ? (
                    userInfo.languages.map((lang) => (
                      <Badge
                        key={lang}
                        variant="outline"
                        className="text-[10px]"
                      >
                        {lang}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      None listed
                    </span>
                  )}
                </div>
              </div>

              {/* GUIDE Specifics */}
              {userInfo.role === "GUIDE" && (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center text-xs font-semibold uppercase text-muted-foreground">
                      <Briefcase className="w-3 h-3 mr-1" /> Expertise
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {userInfo.expertise?.map((exp) => (
                        <Badge
                          key={exp}
                          className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none text-[10px]"
                        >
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                    <span className="text-xs font-semibold text-muted-foreground">
                      DAILY RATE
                    </span>
                    <div className="flex items-center font-bold text-primary">
                      <DollarSign className="w-4 h-4" />
                      <span>{userInfo.dailyRate || "0.00"}</span>
                    </div>
                  </div>
                </>
              )}

              {/* TOURIST Specifics */}
              {userInfo.role === "TOURIST" && (
                <div className="space-y-2">
                  <div className="flex items-center text-xs font-semibold uppercase text-muted-foreground">
                    <Heart className="w-3 h-3 mr-1" /> Travel Preferences
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {userInfo.preferences?.length ? (
                      userInfo.preferences.map((pref) => (
                        <Badge
                          key={pref}
                          className="bg-pink-100 text-pink-700 hover:bg-pink-100 border-none text-[10px]"
                        >
                          {pref}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        No preferences set
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Profile Information Card */}
        <Card className="lg:col-span-2 mt-4">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500/10 text-green-600 px-4 py-3 rounded-md text-sm">
                {success}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              {/* Common Fields for All Roles */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={profileData?.name || userInfo.name}
                  required
                  disabled={isPending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={userInfo.email}
                  disabled
                  className="bg-muted"
                />
              </div>

              {/* contact number */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Contact Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  defaultValue={profileData?.phoneNumber || ""}
                  disabled={isPending}
                />
              </div>

              {/* address */}
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  required
                  defaultValue={profileData?.address || ""}
                  disabled={isPending}
                />
              </div>
            </div>

            {/* Bio Field - Common for All */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio (Minimum 10 characters)</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell us about yourself..."
                defaultValue={
                  profileData?.bio ||
                  "Passionate about exploring new horizons and connecting with people from all walks of life. Let's make every journey memorable!"
                }
                disabled={isPending}
                required
                rows={4}
              />
            </div>

            {/* Languages Field - Common for All */}
            <div className="space-y-2">
              <Label htmlFor="languages">Languages Spoken</Label>
              <MultiSelect
                values={selectedLanguages}
                onValuesChange={(values) =>
                  setSelectedLanguages(
                    Array.isArray(values) ? values : [values]
                  )
                }
              >
                <MultiSelectTrigger className="w-full">
                  <MultiSelectValue placeholder="Select languages..." />
                </MultiSelectTrigger>
                <MultiSelectContent>
                  <MultiSelectGroup>
                    {LANGUAGES.map((lang) => (
                      <MultiSelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </MultiSelectItem>
                    ))}
                  </MultiSelectGroup>
                </MultiSelectContent>
              </MultiSelect>
            </div>

            {/* GUIDE Specific Fields */}
            {userInfo.role === "GUIDE" && (
              <>
                {/* Expertise Field */}
                <div className="space-y-2">
                  <Label htmlFor="expertise">Areas of Expertise</Label>
                  <MultiSelect
                    values={selectedExpertise}
                    onValuesChange={(values) =>
                      setSelectedExpertise(
                        Array.isArray(values) ? values : [values]
                      )
                    }
                  >
                    <MultiSelectTrigger className="w-full">
                      <MultiSelectValue placeholder="Select areas of expertise..." />
                    </MultiSelectTrigger>
                    <MultiSelectContent>
                      <MultiSelectGroup>
                        {EXPERTISE_OPTIONS.map((opt) => (
                          <MultiSelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </MultiSelectItem>
                        ))}
                      </MultiSelectGroup>
                    </MultiSelectContent>
                  </MultiSelect>
                </div>

                {/* Daily Rate Field */}
                <div className="space-y-2">
                  <Label htmlFor="dailyRate">Daily Rate ($)</Label>
                  <Input
                    id="dailyRate"
                    name="dailyRate"
                    type="number"
                    placeholder="Enter your daily rate"
                    defaultValue={profileData?.dailyRate || 10}
                    disabled={isPending}
                    step="0.01"
                    min="0"
                  />
                </div>
              </>
            )}

            {/* TOURIST Specific Fields */}
            {userInfo.role === "TOURIST" && (
              <>
                {/* Travel Preferences Field */}
                <div className="space-y-2">
                  <Label htmlFor="preferences">Travel Preferences</Label>
                  <MultiSelect
                    values={selectedPreferences}
                    onValuesChange={(values) =>
                      setSelectedPreferences(
                        Array.isArray(values) ? values : [values]
                      )
                    }
                  >
                    <MultiSelectTrigger className="w-full">
                      <MultiSelectValue placeholder="Select your travel preferences..." />
                    </MultiSelectTrigger>
                    <MultiSelectContent>
                      <MultiSelectGroup>
                        {EXPERTISE_OPTIONS.map((opt) => (
                          <MultiSelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </MultiSelectItem>
                        ))}
                      </MultiSelectGroup>
                    </MultiSelectContent>
                  </MultiSelect>
                </div>
              </>
            )}

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default MyProfile;
