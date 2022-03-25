import React from 'react';
import AuthCheck from '@/auth/AuthCheck';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

type Props = {};

function Account({}: Props) {
  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <AuthCheck>
        <div>Account</div>
      </AuthCheck>
    </Main>
  );
}

export default Account;
