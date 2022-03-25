import React, { useContext } from 'react';
import { UserContext } from '@/lib/context';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

type Props = {};

export default function Header({}: Props) {
  const { user } = useContext(UserContext);
  const logout = () => {
    signOut(auth);
  };

  console.log('USER', user);

  return (
    <header>
      <div>News App</div>
      {user && <span>{user.firstName}</span>}
      {user && <button onClick={logout}>Log Out</button>}
    </header>
  );
}
