-- Thêm HNSW index cho cột embedding_vector để tăng tốc độ tìm kiếm với độ đo Cosine (toán tử <=>)
CREATE INDEX IF NOT EXISTS products_embedding_idx ON products USING hnsw (embedding_vector vector_cosine_ops);
