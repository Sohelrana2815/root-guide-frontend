import { getUserInfo } from "@/services/auth/getUserInfo";

const GuideProfile = async () => {
  const userInfo = await getUserInfo();
  if (!userInfo) {
    // getUserInfo should return null if not authenticated; leaving redirect to middleware
    return <div className="p-6">Not authenticated</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Guide Profile</h1>
      <p className="mb-2">Name: {userInfo.name}</p>
      <p className="mb-2">Email: {userInfo.email}</p>
      <p className="mb-2">Role: {userInfo.role}</p>
    </div>
  );
};

export default GuideProfile;
