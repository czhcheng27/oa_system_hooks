import React, { useState } from "react";
import css from "./index.module.scss";

const SwitchTheme = () => {
  const [theme, setTheme] = useState("light");

  const switchTheme = () => {
    const res = theme === "light" ? "dark" : "light";
    const dom = document.querySelector(".moduleBox");
    dom.dataset.theme = res;
    setTheme(res);
  };

  return (
    <div className={`${css.box} ${css.theme}`} data-theme={theme}>
      <div className={`${css.moduleBox} moduleBox`}>
        <div className={css.btn} onClick={switchTheme}>
          {theme}
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
