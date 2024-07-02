import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { config } from 'dotenv';

config({ path: '.env' });

const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });


await client.connect();
export const db = drizzle(client);
