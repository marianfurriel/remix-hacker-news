import { useEffect, useState } from "react";
import classnames from "classnames";

import storage from "~/utils/storage";
import { toggleMode } from "~/utils/theme";
import { ThemeMode } from "~/utils/constants";

function Switch() {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const theme = storage.get('theme', ThemeMode.LIGHT);
    if (theme === ThemeMode.DARK) {
      setToggle(true);
    }
    toggleMode(theme);
  }, []);

  const handleToggle = () => {
    const theme = toggle ? ThemeMode.LIGHT : ThemeMode.DARK;
    setToggle(v => !v);
    toggleMode(theme);
  };

  const toggleClassName = classnames(
    "bg-white md:w-5 md:h-5 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out",
    {
      "transform translate-x-5": toggle,
    }
  );

  return (
    <>
      <div className="flex flex-col justify-center h-screen items-center ">
        <div
          className="md:w-12 md:h-6 w-12 h-6 flex items-center bg-gray-200 rounded-full p-1 cursor-pointer"
          onClick={handleToggle}
        >
          <div className={toggleClassName} />
        </div>
      </div>
    </>
  );
}

export default Switch;
