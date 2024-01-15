"use client";

import React, {FC, memo, useCallback, useState} from "react";
import {ProductCartLine, FormattedPrice, Button, NoticeMessageData, NoticeMessage} from "tp-kit/components";
import {
  removeLine,
  updateLine,
  computeCartTotal,
  useCart,
  clearCart,
} from "../hooks/use-cart";
import { createOrder } from "../actions/create-order";
import {getUser} from "../utils/supabase";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";

type Props = {};

const Cart: FC<Props> = memo(function () {
  const lines = useCart((cart) => cart.lines);
  const wrapperClasses = "bg-white rounded-lg p-6 shadow-xl space-y-12";
  const supabase = createClientComponentClient()
  const handleCreateOrder = useCallback(async () => {
    const user = await getUser(supabase);
    const result = await createOrder(useCart.getState(), user);
    if (result.success) {
        console.log("vidage du panier");
        clearCart();

    }
    else {
        setNotices( n => [...n, {type: "error", message: result.error}])
    }
  }, []);

    const [notices, setNotices] = useState<NoticeMessageData[]>([]);

    function removeNotice (index: number){
        setNotices(n => {
            delete(n[index]);
            return Object.values(n)
        });
    }

    if (lines.length === 0)
    return (
      <div className={wrapperClasses}>
        <p className="my-12 text-center text-gray-600 text-sm">
          Votre panier est vide
        </p>
      </div>
    );

  return (
    <div className={wrapperClasses}>
      <h2 className="text-sm uppercase font-bold tracking-wide">Mon panier</h2>
        <ul>
            {notices.map((notice, i) => <NoticeMessage
                key={i}
                {...notice}
                onDismiss={() => removeNotice(i)}
            />)}
        </ul>

      <div className="space-y-4">
        {lines.map(({ product, qty }) => (
          <ProductCartLine
            key={product.id}
            product={product}
            qty={qty}
            onDelete={() => removeLine(product.id)}
            onQtyChange={(qty) => updateLine({ product, qty })}
          />
        ))}
      </div>

      <table className="w-full">
        <tbody>
          <tr>
            <th className="text-left">Total</th>
            <td className="text-right font-bold">
              <FormattedPrice price={computeCartTotal(lines)} />
            </td>
          </tr>
        </tbody>
      </table>

      <Button fullWidth size="lg" onClick={handleCreateOrder}>
        Commander
      </Button>
    </div>
  );
});

Cart.displayName = "Cart";
export { Cart };
