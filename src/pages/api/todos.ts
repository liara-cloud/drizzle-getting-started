import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { todoTable, TodoType } from '@/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST':
      const { text } = req.body;
      await db.insert(todoTable).values({ text });
      res.status(201).end();
      break;

    case 'GET':
      const todos: TodoType[] = await db.select().from(todoTable);
      res.status(200).json(todos);
      break;

    case 'PUT':
      const { id, text: newText, done } = req.body;
      await db.update(todoTable).set({ text: newText, done: done ? true : false }).where(eq(todoTable.id, id));
      res.status(200).end();
      break;

    case 'DELETE':
      const { id: deleteId } = req.body;
      await db.delete(todoTable).where(eq(todoTable.id, deleteId));
      res.status(200).end();
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
