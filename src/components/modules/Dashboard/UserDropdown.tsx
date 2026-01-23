"use client";

import LogoutButton from "@/components/shared/auth/LogoutButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/services/auth/logoutUser";
import { IUser } from "@/types/user.interface";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface UserDropdownProps {
  userInfo: IUser;
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
  const handleLogout = async () => {
    await logoutUser();
  };
  // const userName = (await getUserInfo()) as UserInfo;
  const maskedEmail = userInfo.email
    ? userInfo.email.split("@")[0].substring(0, 3) +
      "*****@" +
      userInfo.email.split("@")[1]
    : "";

  const initial = (
    userInfo.name?.trim()?.charAt(0) ||
    userInfo.email?.trim()?.charAt(0) ||
    "U"
  ).toUpperCase();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        {userInfo.photo ? (
          <Image
            src={userInfo.photo || ""}
            alt={userInfo.name || ""}
            width={30}
            height={30}
            className="rounded-full w-9 h-9 object-cover ring ring-primary cursor-pointer"
          />
        ) : (
          <Button variant="outline" size="icon" className="rounded-full ">
            <span className="text-sm font-semibold text-foreground leading-none">
              {initial}
            </span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{userInfo.name}</p>
            <p className="text-xs text-muted-foreground">{maskedEmail}</p>
            <p className="text-xs text-blue-400 uppercase">
              {userInfo.role?.toLowerCase() || "User"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={"/my-profile"} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span className="hover:text-blue-400">Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
