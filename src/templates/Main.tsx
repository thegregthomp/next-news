import { ReactNode } from 'react';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="">
    {props.meta}
    <Header />
    <main className="container mt-16 mb-10 mx-auto max-w-7xl px-4 sm:mt-24">
      {props.children}
    </main>
    <Footer />
  </div>
);

export { Main };
