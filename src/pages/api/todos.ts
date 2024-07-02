import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { todoTable } from '@/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { text } = req.body;
    await db.insert(todoTable).values({ text });
    res.status(201).end();
  } else {
    const todos = await db.select().from(todoTable);
    res.status(200).json(todos);
  }
}
