"use client";
import {getUser, signOut} from "../../utils/supabase";
import { SectionContainer, Button } from "tp-kit/components";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {OrderTable} from "../../components/order-table";
import prisma from "../../utils/prisma";
import { ReactNode } from "react";
import {createClientComponentClient, User} from "@supabase/auth-helpers-nextjs";

export default function Page() {
  const supabase = createClientComponentClient()
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<User | null>(null);

  useEffect(() => {
    const getData = async () => {
      const user = await getUser(supabase);
      console.log("user");
      console.log(user?.user_metadata.name);
      if (user) {
        setUserDetails(user);
      } else {
        router.push('/connexion');
      }
    };

    getData();
  }, []);
  const handleLogout = async () => {
    await signOut(supabase);
    router.refresh();
  };

  return (
      <SectionContainer>
        <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2>{"MON COMPTE"}</h2>
        {userDetails ? (
            <>
              <br></br>
              <p>Bonjour, {userDetails.user_metadata.name} !</p>
              <br></br>
              <p><span className="font-bold">Nom :</span> {userDetails.user_metadata.name}</p>
              <p><span className="font-bold">Email :</span> {userDetails.email}</p>
              <br></br>
            </>
        ) : (
            <p>{"Chargement des détails de l'utilisateur..."}</p>
        )}
        <Button onClick={handleLogout}>Se déconnecter</Button>
        </div>
      </SectionContainer>
  );
}
