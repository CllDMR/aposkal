import type { ReactNode } from "react";
interface IncomeListProps {
  header: ReactNode;
  children: ReactNode;
  pagination: ReactNode;
}

const Layout = ({ header, children, pagination }: IncomeListProps) => {
  return (
    <div className="-mt-28 flex h-screen flex-col items-stretch  justify-between  ">
      <div className="z-10 mt-28">{header}</div>
      <div className="flex-1 overflow-y-auto">
        <div className="mt-3 overflow-y-scroll">{children}</div>
      </div>
      <div className="lg:-mb-4">{pagination}</div>
    </div>
  );
};

export default Layout;
