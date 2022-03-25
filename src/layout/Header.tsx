import React, { useContext } from 'react';
import { UserContext } from '@/lib/context';

type Props = {};

export default function Header({}: Props) {
  const { user } = useContext(UserContext);
  return (
    <header>
      <div>News App</div>
      {user && <span>{user.firstName}</span>}
    </header>
  );
}
