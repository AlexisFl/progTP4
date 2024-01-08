
import { ReactNode } from "react";
import { SectionContainer } from "tp-kit/components";
import prisma from "../../utils/prisma";
import { OrderTable } from "../../components/order-table";

export default async function Layout({ children }: { children: ReactNode }) {
  const orders = await prisma.order.findMany();

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
