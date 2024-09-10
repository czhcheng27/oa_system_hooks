import { Editor, Element, Frame } from "@craftjs/core";
import ContainerUserComponent from "../selectors/basic/Container";
import * as BasicUserComponents from "../selectors/basic";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import SettingsPanel from "./SettingsPanel";
import styles from "./canvas.module.less";

export const Canvas = () => {
  return (
    <div className={styles.container}>
      <Editor resolver={BasicUserComponents}>
        <div className={styles.header}>
          <Topbar />
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <Sidebar />
          </div>
          <div className={styles.center}>
            <Frame>
              <Element is={ContainerUserComponent} canvas></Element>
            </Frame>
          </div>
          <div className={styles.right}>
            <SettingsPanel />
          </div>
        </div>
        <div className={styles.footer}>Footer</div>
      </Editor>
    </div>
  );
};

export default Canvas;
