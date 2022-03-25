import React from 'react';
import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { useUserData } from '@/lib/hooks';
import Loader from '@/components/Loader';

type Props = {
  children: JSX.Element;
  fallback?: JSX.Element;
};
// Component's children only shown to logged-in users
export default function AuthCheck({ children, fallback }: Props) {
  const { loading } = useUserData();
  const { user } = useContext(UserContext);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {user ? (
            <>{children}</>
          ) : (
            <>
              {fallback ? (
                <>{fallback}</>
              ) : (
                <Link href="/enter">You must be signed in</Link>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
