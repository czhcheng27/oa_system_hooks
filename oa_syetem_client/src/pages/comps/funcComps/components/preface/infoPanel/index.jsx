import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "antd";
import { dataHasBeenUpdated } from "@/redux/actions";
import SwitchWrapper from "../../switchWrapper";
import { preface_infoPanel_warnMsg as warnMsg } from "../../../warnMsg";
import css from "./index.module.less";

let mount = true;

const InfoPanel = ({ infoPanel }) => {
  const dispatch = useDispatch();

  const outlineAllData = useSelector((s) => s.rdcTestOutlineAllData);

  const [drafterCompany, setDrafterCompany] = useState("");
  const [drafterPerson, setDrafterPerson] = useState("");

  useEffect(() => {
    mount = false;
    if (infoPanel) {
      const { drafterCompany, drafterPerson } = infoPanel;
      setDrafterCompany(drafterCompany);
      setDrafterPerson(drafterPerson);
      setTimeout(() => {
        mount = true;
      }, 800);
    }
  }, [infoPanel]);

  useEffect(() => {
    if (mount) {
      const data = { drafterCompany, drafterPerson, warnMsg };
      outlineAllData[1].data.infoPanel = data;
    }
  }, [drafterCompany, drafterPerson]);

  return (
    <SwitchWrapper
      label="Propose/focal/draft information"
      noNeedStaple={true}
      disableSwitch={true}
    >
      <div className={css.infoPabel_wrapper}>
        <div>
          This document is proposed and managed by XXX Innovation Technology
          Research Institute。
        </div>
        <div className={css.company_row}>
          <span>Drafting unit:</span>
          <Input
            value={drafterCompany}
            onChange={(e) => (
              setDrafterCompany(e.target.value),
              dispatch(dataHasBeenUpdated(true))
            )}
            placeholder="Please type in draft unit"
          />
        </div>
        <div className={css.person_row}>
          <span>Draft person:</span>
          <Input
            value={drafterPerson}
            onChange={(e) => (
              setDrafterPerson(e.target.value),
              dispatch(dataHasBeenUpdated(true))
            )}
            placeholder="Please type in draft person"
          />
        </div>
      </div>
    </SwitchWrapper>
  );
};

export default InfoPanel;
