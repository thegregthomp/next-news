import React, { useContext } from 'react';
import { UserContext } from '@/lib/context';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Avatar from '@mui/material/Avatar';

type Props = {};

export default function Header({}: Props) {
  const { user } = useContext(UserContext);
  const logout = () => {
    signOut(auth);
  };

  return (
    <header>
      <div>News App</div>

      {user && <span>{user.firstName}</span>}
      {user && <Avatar>{user.firstName.split(' ').map(function(item){return item[0]}).join('')}</Avatar>}
      {user && <button onClick={logout}>Log Out</button>}
    </header>
  );
}
