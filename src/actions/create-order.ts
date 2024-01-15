"use server";

import { computeCartTotal, computeLineSubtotal } from "../hooks/use-cart";
import { CartData} from "../types";
import prisma from "../utils/prisma";
import { getUser } from "../utils/supabase";
import {User} from "@supabase/auth-helpers-nextjs";

export async function createOrder(cart: CartData, user: User | null): Promise<{ error: string | null, success: boolean }> {
  
    if (!user) {
      return { error: "Utilisateur non connecté. Veuillez vous connecter pour passer une commande.", success: false };
    }

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total: computeCartTotal(cart.lines),
        lines: {
          create: cart.lines.map(line => ({
            productId: line.product.id,
            qty: line.qty,
            subtotal: computeLineSubtotal(line)
          }))
        }
      }
    });

    return { error: null, success: true };
}
