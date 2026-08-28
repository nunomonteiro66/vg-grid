ALTER TABLE "Games"
ADD COLUMN "search_vector" tsvector
GENERATED ALWAYS AS (
  to_tsvector('english', coalesce("name", ''))
) STORED;

CREATE INDEX "Games_search_vector_idx"
ON "Games"
USING GIN ("search_vector");