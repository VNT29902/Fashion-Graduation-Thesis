-- V2__add_pgvector_extension.sql

-- Kích hoạt extension vector của PostgreSQL
CREATE EXTENSION IF NOT EXISTS vector;

-- Thêm cột embedding_vector với độ dài 1536 (phù hợp với OpenAI text-embedding-3-small hoặc text-embedding-ada-002)
ALTER TABLE products ADD COLUMN embedding_vector vector(1536);

-- Tạo Index HNSW để tăng tốc độ truy vấn tìm kiếm hàng xóm gần nhất (Nearest Neighbor)
-- Sử dụng vector_l2_ops để tính khoảng cách Euclid (Euclidean distance)
CREATE INDEX idx_products_embedding_hnsw 
ON products 
USING hnsw (embedding_vector vector_l2_ops);
