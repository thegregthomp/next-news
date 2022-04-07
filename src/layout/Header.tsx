import React, { useContext } from 'react';
import { UserContext } from '@/lib/context';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Avatar from '@/components/Avatar';

import Link from 'next/link';
import toast from 'react-hot-toast';

type Props = {};

export default function Header({}: Props) {
  const { user } = useContext(UserContext);
  const logout = () => {
    signOut(auth);
  };

  return (
    <header>
      <div className="relative bg-gray-50">
        <div className="relative bg-white shadow">
          <div className="px-4 sm:px-6">
            <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <Link href="/">
                  <a>
                    <span className="sr-only ">Workflow</span>
                    <h1>
                      NEWS &nbsp;<span>{user?.firstName}</span>
                    </h1>
                  </a>
                </Link>
              </div>

              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                {user ? (
                  <>
                    <button
                      className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-600 bg-gray-200 hover:bg-gray-400"
                      onClick={logout}
                    >
                      Log Out
                    </button>
                    <Avatar email={user?.email}></Avatar>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login">
                      <button
                        type="button"
                        className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                      >
                        Sign in
                      </button>
                    </Link>
                    <Link href="/auth/signup">
                      <button
                        type="button"
                        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Sign up
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>News App</div>
    </header>
  );
}
