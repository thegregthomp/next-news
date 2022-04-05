import type { AppProps } from 'next/app';
import '@/styles/global.css';
import { UserContext } from '@/lib/context';
import { useUserData } from '@/lib/hooks';
import Layout from '@/layout/Navbar';

export default function MyApp({ Component, pageProps }: AppProps) {
  const { userData } = useUserData();
  return (
    <UserContext.Provider value={{ user: userData }}>
      <Layout />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

