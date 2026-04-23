import User from "../assets/images/user.png";
import Logo from "../assets/images/logo.png";
import { useTheme } from "../hooks/useTheme";
import { SunMedium, Moon } from "lucide-react";
import Path from "../assets/images/Path.png";

const SideBar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className=" fixed top-0 left-0 z-50 flex w-full items-center justify-between bg-[#373B53] lg:h-screen lg:w-[80px] lg:flex-col lg:justify-between lg:rounded-r-[20px]">
      <div className="shrink-0">
        <img
          src={Logo}
          alt="Logo"
          className="h-[72px] w-[72px] lg:h-auto lg:w-auto"
        />
      </div>
      <div
        className="
          flex h-[72px] items-center lg:h-auto lg:w-full lg:flex-col lg:gap-8 lg:pb-6">
        <div
          className="
            flex h-full items-center gap-6 px-6
            lg:flex-col lg:px-0
          "
        >
          <button
            type="button"
            onClick={toggleTheme}
            className="opacity-80 transition hover:opacity-100"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <SunMedium className="h-5 w-5 text-[#858BB2] hover:text-white lg:h-4 lg:w-4" />
            ) : (
              <img src={Path} className="h-5 w-5 text-[#858BB2] hover:text-white lg:h-4 lg:w-4" />
            )}
          </button>
        </div>


        <hr
          className="
            h-full border-l border-[#494E6E]
            lg:h-auto lg:w-full lg:border-l-0 lg:border-t
          "
        />

        <div className="px-6 lg:px-0 lg:pt-6">
          <img
            src={User}
            alt="user"
            className="h-8 w-8 rounded-full lg:h-10 lg:w-10"
          />
        </div>
      </div>
    </aside>
  );
};

export default SideBar;