ALTER TABLE "Project" 
  ALTER COLUMN "technologies" TYPE jsonb 
  USING to_jsonb("technologies");
