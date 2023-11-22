"use client";

import { Order } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FC, memo, useCallback } from "react";
import { OrderTableLayout } from "tp-kit/components";

type Props = {
  orders: Order[];
};

const OrderTable: FC<Props> = memo(function ({ orders }) {
  const router = useRouter();

  const handleRowClic = useCallback(
    (order: Order) => {
      router.push(`/mon-compte/commandes/${order.id}`);
    },
    [router],
  );

  return <OrderTableLayout orders={orders} onRowClick={handleRowClic} />;
});

OrderTable.displayName = "OrderTable";
export { OrderTable };
