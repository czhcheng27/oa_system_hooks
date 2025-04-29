import React, { useState } from "react";
import useLocalStorage from "src/components/UseLocalStorage";
import css from "./index.module.less";
import classNames from "classnames";

const SwitchTheme = () => {
  // const [theme, setTheme] = useState("light");
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const switchTheme = (res: string) => {
    const dom = document.querySelector(".moduleBox") as HTMLElement;
    dom.dataset.theme = res;
    setTheme(res);
  };

  return (
    <div className={`${css.box} ${css.theme}`} data-theme={theme}>
      <div className={`${css.moduleBox} moduleBox`}>
        <div>
          <div
            className={classNames({
              [css.btn]: true,
              [css.actBtn]: theme === "light",
            })}
            onClick={() => switchTheme("light")}
          >
            {"light"}
          </div>
          <div
            className={classNames({
              [css.btn]: true,
              [css.actBtn]: theme === "dark",
            })}
            onClick={() => switchTheme("dark")}
          >
            {"dark"}
          </div>
          <div
            className={classNames({
              [css.btn]: true,
              [css.actBtn]: theme === "orange",
            })}
            onClick={() => switchTheme("orange")}
          >
            {"orange"}
          </div>
        </div>
        <div className={css.noChange}>
          this text color won't change with theme
        </div>
        <div className={css.txt}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium
          quibusdam consectetur dolor optio consequatur nulla fuga aut incidunt
          quis, quos nisi exercitationem, vitae porro ducimus beatae fugit
          deserunt. Voluptas, culpa.
        </div>
      </div>
    </div>
  );
};

export default SwitchTheme;
