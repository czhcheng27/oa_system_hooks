import React, { useState, useMemo, createContext } from "react";

export const TitleContext = createContext({});
export const FamilyNameContext = createContext({});
export const FirstNameContext = createContext({});
// export const AllConText = { TitleContext, FamilyNameContext, FirstNameContext };
export const MyContext = ({ children }) => {
  const [title, setTitle] = useState(0);
  const [familyName, setFamilyName] = useState("Jordan");
  const [firstName, setFirstName] = useState("Mike");
  const titleVal = useMemo(() => [title, setTitle], [title]);
  const familyNmVal = useMemo(() => [familyName, setFamilyName], [familyName]);
  const firstNameVal = useMemo(() => [firstName, setFirstName], [firstName]);

  return (
    <TitleContext.Provider value={titleVal}>
      <FamilyNameContext.Provider value={familyNmVal}>
        <FirstNameContext.Provider value={firstNameVal}>
          {children}
        </FirstNameContext.Provider>
      </FamilyNameContext.Provider>
    </TitleContext.Provider>
  );
};
