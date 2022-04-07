import React, { useEffect, useState } from 'react';
import Link from 'next/link';
var md5 = require('md5');
import { useUserData } from '@/lib/hooks';

type Props = {
  email: string;
};

function Avatar({ email }: Props) {
  //const {gravararUrl} = useUserData();
  //Move this use state to custom hook
  const [gravatarUrl, setGravatarUrl] = useState<string | null>(null);
  useEffect(() => {
    //move this logic to custom hook
    const address = String(email).trim().toLowerCase();

    // Create an MD5 hash of the final string
    const hash = md5(address);

    // Grab the actual image URL
    setGravatarUrl(`https://www.gravatar.com/avatar/${hash}`);
    //end move to hook
  }, [email, setGravatarUrl]);
  return (
    <div className="ml-5">
      <Link href="/account">
        <button
          type="button"
          className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <span className="sr-only">Open user menu</span>
          <img className="h-12 w-12 rounded-full" src={gravatarUrl} alt="" />
        </button>
      </Link>
    </div>
  );
}

export default Avatar;
