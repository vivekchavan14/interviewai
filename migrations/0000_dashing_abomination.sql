CREATE TABLE IF NOT EXISTS "Interview" (
	"id" serial PRIMARY KEY NOT NULL,
	"jsonResponse" text NOT NULL,
	"jobPosition" text NOT NULL,
	"jobDescription" text NOT NULL,
	"Experience" text NOT NULL,
	"createdBy" varchar NOT NULL,
	"createdAt" varchar NOT NULL,
	"interviewId" varchar NOT NULL,
	"location" text,
	"salary" varchar
);
