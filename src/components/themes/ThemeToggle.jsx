import { useEffect, useState } from "react";

import "./themes.css";

const ThemeToggle = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleState = () => {
    setIsEnabled(!isEnabled);
  };

  const updateTheme = (isDarkEnabled) => {
    // Get all available styles
    const styles = getComputedStyle(document.body);

    // Get the --black and --white variable values
    const black = styles.getPropertyValue("--black");
    const white = styles.getPropertyValue("--white");
    const shadowBlack = styles.getPropertyValue("--shadow-black");
    const shadowWhite = styles.getPropertyValue("--shadow-white");
    const backdropBlack = styles.getPropertyValue("--backdrop-black");
    const backdropWhite = styles.getPropertyValue("--backdrop-white");

    // Optional shorthand constant for accessing document.documentElement
    const docEl = document.documentElement;

    if (isDarkEnabled) {
      docEl.style.setProperty("--background", black);
      docEl.style.setProperty("--foreground", white);
      docEl.style.setProperty("--backdrop", backdropWhite);
      docEl.style.setProperty("--b-shadow", shadowWhite);
      document.querySelector("html").classList.add("darkmode");
    } else {
      docEl.style.setProperty("--background", white);
      docEl.style.setProperty("--foreground", black);
      docEl.style.setProperty("--backdrop", backdropBlack);
      docEl.style.setProperty("--b-shadow", shadowBlack);
      document.querySelector("html").classList.remove("darkmode");
    }
  };

  useEffect(() => {
    updateTheme(isEnabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnabled]);

  return (
    <label className="toggle-wrapper" htmlFor="toggle">
      <div className={`toggle ${isEnabled ? "enabled" : "disabled"}`}>
        <span className="hidden">
          {isEnabled ? "Enable Light Mode" : "Enable Dark Mode"}
        </span>
        <div className="icons">
          <i className="bi bi-sun-fill font-semibold"></i>
          <i className="bi bi-moon-fill font-semibold"></i>
        </div>
        <input
          id="toggle"
          name="toggle"
          type="checkbox"
          checked={isEnabled}
          onClick={toggleState}
        />
      </div>
    </label>
  );
};

export default ThemeToggle;
