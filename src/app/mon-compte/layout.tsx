
import {ReactNode} from "react";
import { SectionContainer } from "tp-kit/components";
import prisma from "../../utils/prisma";
import { OrderTable } from "../../components/order-table";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {getUser} from "../../utils/supabase";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function Layout({ children }: { children: ReactNode }) {
    const supabase = createServerComponentClient({cookies});
    const {data} = await supabase.auth.getUser();

    console.log ("data user " +data.user?.id);
    if (!data.user?.id) {
        console.log("pas de user");
        return redirect('/connexion');
    }

    const orders = await prisma.order.findMany({
        where: { userId : data.user?.id }
    });


    return (
      <div className="flex">
          {/* Children on the left (1/3) */}
          <div className="w-1/3 p-4 h-full bg-beige"> {/* Ajout de la classe bg-beige */}
              {children}
          </div>

          {/* Orders list on the right (2/3) */}
          <SectionContainer className="w-2/3 p-4">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                  <OrderTable orders={orders} />
              </div>
          </SectionContainer>
      </div>
  );
}
