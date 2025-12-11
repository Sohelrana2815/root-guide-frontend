import { getUserInfo } from '@/services/auth/getUserInfo';
import { redirect } from 'next/navigation';

export default async function MyProfileRedirect() {
  const userInfo = await getUserInfo();

  if (!userInfo) {
    redirect('/login');
  }

  switch (userInfo.role) {
    case 'ADMIN':
      redirect('/admin/profile');
    case 'GUIDE':
      redirect('/guide/profile');
    case 'TOURIST':
      redirect('/tourist/profile');
    default:
      redirect('/');
  }
}
