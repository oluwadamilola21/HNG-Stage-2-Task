import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar.js";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen bg-[#F8F8FB] dark:bg-[#141625]">
      <SideBar />
      <main className="lg:ml-[80px] flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;