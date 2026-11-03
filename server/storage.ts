import { getDb } from "./db";
import { orders, type InsertOrder, type Order } from "@shared/schema";
import { desc } from "drizzle-orm";

export const storage = {
  async createOrder(input: InsertOrder): Promise<Order> {
    const db = getDb();
    const [row] = await db
      .insert(orders)
      .values({ name: input.name, email: input.email, amountCents: 1095, status: "paid" })
      .returning();
    return row;
  },
  async listOrders(): Promise<Order[]> {
    const db = getDb();
    return db.select().from(orders).orderBy(desc(orders.createdAt));
  },
};
