CREATE TABLE IF NOT EXISTS "todo_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"done" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL
);
