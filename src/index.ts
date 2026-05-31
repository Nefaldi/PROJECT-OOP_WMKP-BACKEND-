import express from 'express';
import cors from 'cors';
import { db } from './db/index.js';
import { menus, orders, orderItems } from './db/schema.js';
import { eq, desc } from 'drizzle-orm';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ==========================================
// MENU API
// ==========================================
app.get('/api/menus', async (req, res) => {
  try {
    const allMenus = await db.select().from(menus);
    res.json(allMenus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch menus' });
  }
});

app.post('/api/menus', async (req, res) => {
  try {
    const { id, name, category, price, image, desc, available } = req.body;
    const newMenu = await db.insert(menus).values({
      id, name, category, price, image, desc, available
    }).returning();
    res.json(newMenu[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add menu' });
  }
});

app.put('/api/menus/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, image, desc, available } = req.body;
    const updated = await db.update(menus)
      .set({ name, category, price, image, desc, available })
      .where(eq(menus.id, id))
      .returning();
    res.json(updated[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update menu' });
  }
});

app.delete('/api/menus/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(menus).where(eq(menus.id, id));
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete menu' });
  }
});

// ==========================================
// ORDERS API
// ==========================================
app.get('/api/orders', async (req, res) => {
  try {
    const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));
    
    // We need to fetch order items as well
    const allItems = await db.select().from(orderItems);
    
    // Group items by order
    const ordersWithItems = allOrders.map((order: any) => ({
      ...order,
      items: allItems.filter((item: any) => item.orderId === order.id)
    }));
    
    res.json(ordersWithItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { id, meja, customerName, total, note, items } = req.body;
    
    // Start transaction
    await db.transaction(async (tx: any) => {
      // Create order
      await tx.insert(orders).values({
        id,
        meja,
        customerName,
        total,
        note,
        status: 'menunggu'
      });
      
      // Create items
      if (items && items.length > 0) {
        await tx.insert(orderItems).values(
          items.map((item: any) => ({
            orderId: id,
            menuId: item.id,
            name: item.name,
            price: item.price,
            qty: item.qty
          }))
        );
      }
    });
    
    res.json({ success: true, id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const updated = await db.update(orders)
      .set({ status, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
      
    res.json(updated[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
