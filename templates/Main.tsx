import { ReactNode } from "react";
import Header from "@/layout/Header"
import Footer from "@/layout/Footer"

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="container">
    {props.meta}
    <Header />
    <div className="py-5 text-xl content">{props.children}</div>
    <Footer />
  </div>
);

export { Main };
