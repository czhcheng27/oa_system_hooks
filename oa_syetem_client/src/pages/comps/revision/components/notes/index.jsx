import React, { useState, useEffect } from "react";
import CompWrapper from "../compWrapper";
import css from "./index.module.less";

const Notes = ({ props, onDelete }) => {
  return <CompWrapper prop={{ props, onDelete }}>Notes</CompWrapper>;
};

export default Notes;
