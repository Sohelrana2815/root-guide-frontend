import { UserRole } from "@/lib/auth-utils";

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  PENDING_APPROVAL = "PENDING_APPROVAL",
}
export interface IUser {
  _id?: string;

  // 1. Core Identity & Authentication
  name: string;
  email: string;
  password?: string;
  isVerified: boolean;
  passwordChangedAt?: Date;
  phoneNumber?: string;
  role: UserRole;
  userStatus?: UserStatus;
  isDeleted?: boolean;

  photo?: string;
  bio?: string;
  languages?: string[];
  address?: string;

  expertise?: string[];
  dailyRate?: number;
  averageRating?: number;

  preferences?: string[];

  createdAt?: Date;
  updatedAt?: Date;
}
