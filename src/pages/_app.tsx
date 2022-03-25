import type { AppProps } from 'next/app';
import '@/styles/global.css';
import { UserContext } from '@/lib/context';
import { useUserData } from '@/lib/hooks';

export default function MyApp({ Component, pageProps }: AppProps) {
  const { userData } = useUserData();
  return (
    <UserContext.Provider value={{ user: userData }}>
      <Component {...pageProps} />;
    </UserContext.Provider>
  );
}
