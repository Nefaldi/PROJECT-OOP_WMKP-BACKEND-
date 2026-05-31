import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
export const menus = pgTable("menus", {
    id: text("id").primaryKey(), // using text because frontend uses strings like 'm1', 'd1'
    name: text("name").notNull(),
    category: text("category").notNull(),
    price: integer("price").notNull(),
    image: text("image").notNull(),
    desc: text("desc").notNull(),
    available: boolean("available").default(true).notNull(),
});
export const orders = pgTable("orders", {
    id: text("id").primaryKey(), // Using text because frontend generates 'ORD-xxx'
    meja: text("meja").notNull(), // Assuming meja can be string or number, keeping as text
    customerName: text("customer_name"),
    total: integer("total").notNull(),
    note: text("note"),
    status: text("status").notNull().default("menunggu"), // menunggu, diproses, selesai
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const orderItems = pgTable("order_items", {
    id: serial("id").primaryKey(),
    orderId: text("order_id").notNull().references(() => orders.id, { onDelete: 'cascade' }),
    menuId: text("menu_id").notNull(),
    name: text("name").notNull(),
    price: integer("price").notNull(),
    qty: integer("qty").notNull(),
});
//# sourceMappingURL=schema.js.map