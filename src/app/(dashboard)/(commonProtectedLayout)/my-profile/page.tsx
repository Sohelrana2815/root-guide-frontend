export const dynamic = "force-dynamic";
import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Suspense } from "react";

const MyProfilePage = async () => {
  const userInfo = await getUserInfo();
  return (
    <>
      <Suspense fallback={<div>Loading bookings...</div>}>
        <MyProfile userInfo={userInfo} />
      </Suspense>
    </>
  );
};

export default MyProfilePage;
