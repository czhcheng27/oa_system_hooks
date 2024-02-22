import Label from "./components/Comps/Label";
import labelAttr from "./components/Comps/Label/configOpt/AttrOpt";
import labelStyle from "./components/Comps/Label/configOpt/StyleOpt";
import StandardInput from "./components/Comps/StandardInput";
import StandardInputAttr from "./components/Comps/StandardInput/configOpt/AttrOpt";
import StandardInputStyle from "./components/Comps/StandardInput/configOpt/StyleOpt";

export const CompCategory = [
  {
    header: "Basic Components",
    type: "basic",
    list: [
      {
        type: "43",
        description: "Label",
        component: Label,
        attrComp: labelAttr,
        styleComp: labelStyle,
        // permissionComp: labelStyle,
      },
    ],
  },
  {
    header: "Form Components",
    type: "form_components",
    list: [
      {
        type: "4",
        description: "StandardInput",
        component: StandardInput,
        attrComp: StandardInputAttr,
        styleComp: StandardInputStyle,
      },
    ],
  },
  // {
  //   header: "Table Components",
  //   type: "table_components",
  //   list: [
  //     {
  //       type: "43",
  //       description: "Label",
  //       component: Label,
  //       attrComp: labelAttr,
  //       styleComp: labelStyle,
  //     },
  //   ],
  // },
  // {
  //   header: "Others",
  //   type: "others",
  //   list: [
  //     {
  //       type: "43",
  //       description: "Label",
  //       component: Label,
  //       attrComp: labelAttr,
  //       styleComp: labelStyle,
  //     },
  //   ],
  // },
];

const flatCompCategory = [];
CompCategory.map((el) => {
  flatCompCategory.push(...el.list);
});
export { flatCompCategory };
