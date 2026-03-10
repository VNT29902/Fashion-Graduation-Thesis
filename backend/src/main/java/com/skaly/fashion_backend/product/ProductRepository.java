package com.skaly.fashion_backend.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {

    @Query(value = "SELECT * FROM products p WHERE p.embedding_vector IS NOT NULL ORDER BY p.embedding_vector <=> cast(:vector as vector) LIMIT :limit", nativeQuery = true)
    List<Product> findTopKByEmbeddingVectorClosestTo(@Param("vector") float[] vector, @Param("limit") int limit);
}
