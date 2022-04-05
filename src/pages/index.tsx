import Image from 'next/image';

import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import getBaseUrl from '@/utils/baseUrl';
import type { NextApiRequest, NextApiResponse } from 'next';

import { firestore, fromMillis, postToJSON } from '@/lib/firebase';

import styles from '@/pages/index.module.css';
import firebase from 'firebase/compat/app';

// Max post to query per page
const LIMIT = 10;

export async function getServerSideProps({ req }: { req: NextApiRequest }) {}

// const getUserData = async (userId: string): Promise<any> => {
//   const snapshot = await firestore.collection('users').doc(userId).get();
//   const user = snapshot.data();
//   const subscriptions = (
//     await firestore
//       .collection('sources')
//       .where(
//         firebase.firestore.FieldPath.documentId(),
//         'in',
//         user?.subscriptions
//       )
//       .get()
//   ).docs.map((doc) => {
//     return doc.data();
//   });
//   return { ...user, subscriptions };
// };

export default function Home(props) {
  console.log(props);
  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <div className="text-center bg-red">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">Data to enrich your</span>&nbsp;
          <span className="block text-indigo-600 xl:inline">
            online business
          </span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
          aliqua.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <a
              href="#"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              {' '}
              Get started{' '}
            </a>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <a
              href="#"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
            >
              {' '}
              Live demo{' '}
            </a>
          </div>
        </div>
      </div>
    </Main>
  );
}
