"use client";

import { createContext, useContext } from "react";

type UserDetailType = {
  userDetail: any;
  setUserDetail: React.Dispatch<React.SetStateAction<any>>;
};

export const UserDetailContext = createContext<UserDetailType | undefined>(
  undefined
);

export const useUserDetail = () => {
  const context = useContext(UserDetailContext);

  if (!context) {
    throw new Error(
      "useUserDetail must be used within a UserDetailContext.Provider"
    );
  }

  return context;
};
