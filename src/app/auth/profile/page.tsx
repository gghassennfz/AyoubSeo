import UserProfile from '../../components/auth/UserProfile';

export const metadata = {
  title: 'Profile - SEO Analyzer',
  description: 'Manage your SEO Analyzer profile',
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <h1 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Your Profile
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Manage your account settings and view your profile
        </p>
      </div>
      
      <UserProfile />
    </div>
  );
}
