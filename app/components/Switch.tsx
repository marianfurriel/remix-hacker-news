import { useEffect, useState } from "react";
import cn from "classnames";

import storage from "~/utils/storage";
import { toggleMode } from "~/utils/theme";
import { ThemeMode } from "~/utils/constants";

function Switch() {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const theme = storage.get("theme", ThemeMode.LIGHT);
    if (theme === ThemeMode.DARK) {
      setToggle(true);
    }
    toggleMode(theme);
  }, []);

  const handleToggle = () => {
    const theme = toggle ? ThemeMode.LIGHT : ThemeMode.DARK;
    setToggle((v) => !v);
    toggleMode(theme);
  };

  const iconClassName = cn("absolute select-none", {
    "transition duration-300": toggle,
  });
  const toggleClassName = cn(
    "bg-white md:w-5 md:h-5 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out",
    {
      "transform translate-x-5": toggle,
    }
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="md:w-12 md:h-6 w-12 h-6 flex items-center bg-gray-200 dark:bg-light-dark transition duration-300 rounded-full p-1 cursor-pointer relative"
        onClick={handleToggle}
      >
        <span className={iconClassName}>🌜</span>
        <span className={iconClassName} style={{ marginLeft: "50%" }}>
          🌞
        </span>
        <div className={toggleClassName}></div>
      </div>
    </div>
  );
}

export default Switch;
