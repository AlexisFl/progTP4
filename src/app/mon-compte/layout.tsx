import { ReactNode } from "react";
import { SectionContainer } from "tp-kit/components";
import prisma from "../../utils/prisma";
import { OrderTable } from "../../components/order-table";

export default async function Layout({ children }: { children: ReactNode }) {
  const orders = await prisma.order.findMany();

  return (
    <>
      {/* Orders list */}
      <SectionContainer wrapperClassName="py-24 min-h-[80vh]">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <OrderTable orders={orders} />
        </div>
      </SectionContainer>

      {/* Children */}
      {children}
    </>
  );
}
