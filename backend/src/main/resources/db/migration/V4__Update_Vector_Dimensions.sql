-- Because we changed from OpenAI (1536 dims) to Google Gemini text-embedding-004 (768 dims), 
-- the existing pgvector column type constraint must be updated.
-- We drop and recreate the column since the old data has 1536 vectors and cannot cast down cleanly.

ALTER TABLE products DROP COLUMN IF EXISTS embedding_vector;
ALTER TABLE products ADD COLUMN embedding_vector vector(768);
