"use client";

import React, { useContext, useEffect, useState } from "react";
import Header from "./_components/Header";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "@/context/UserDetailContext";
import { TripContextType, TripDetailContext } from "@/context/TripDetailContext";
import { TripInfo } from "./create-new-trip/_components/ChatBox";

function Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  const createUserMutation = useMutation(api.user.CreateNewUser);
  const [userDetail, setUserDetail] = useState<any>();
  const { user } = useUser();
  const [tripDetailInfo,setTripDetailInfo]= useState<TripInfo | null>(null);

  useEffect(() => {
    if (user) {
      createNewUser();
    }
  }, [user]);

  const createNewUser = async () => {
    if (!user) return;

    // save new user if not exist
    const result = await createUserMutation({
      email: user.primaryEmailAddress?.emailAddress ?? "",
      imageUrl: user.imageUrl,
      name: user.fullName ?? "",
    });

    setUserDetail(result);
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <TripDetailContext.Provider value={{tripDetailInfo,setTripDetailInfo}}>
      <div>
        <Header />
        {children}
      </div>
      </TripDetailContext.Provider>
    </UserDetailContext.Provider>
  );
}

export default Provider;
export const useUserDetail=()=>{
  return useContext(UserDetailContext)
}

export const useTripDetail = (): TripContextType => {
  return useContext(TripDetailContext);
};