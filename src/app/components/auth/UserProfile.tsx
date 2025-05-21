"use client";

import { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function UserProfile() {
  const { user, signOut, loading, checkSession } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg max-w-md w-full mx-auto"
    >
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 mb-4">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            {user.email ? user.email.charAt(0).toUpperCase() : '?'}
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{user.email}</h2>
        
        <div className="mt-6 w-full">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Information</h3>
            <div className="mt-2 space-y-2">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Email: </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{user.email}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Last Sign In: </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Account Created: </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.created_at ? new Date(user.created_at).toLocaleString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 w-full">
          <button
            onClick={() => signOut()}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign Out
          </button>
        </div>
      </div>
    </motion.div>
  );
}
