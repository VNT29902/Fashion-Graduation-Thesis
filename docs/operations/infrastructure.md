# Cấu Hình Hạ Tầng (Infrastructure Setup)

**Tác giả (Owner):** DSkaly | **Ngày cập nhật:** 2026-02-20
**Reviewer:** Principal Architect | **Trạng thái:** Active | **Version:** v1.0

## 1. Mục Đích (Purpose)

Tài liệu định nghĩa cấp phát tài nguyên hệ thống và quản lý Image container của Fashion E-Commerce.

## 2. Phạm Vi Khảo Sát (Scope)

- Môi trường chạy Docker Compose chứa các node hệ thống: PostgreSQL (pgvector), Redis, Next.js, Spring Boot.

## 3. Cấu Trúc Docker Compose

1. **Database Node:** `postgres:15` kèm extension `pgvector`. Volume map ra disk cục bộ tránh rủi ro mất mát DB do container stop.
2. **Caching Node:** `redis:alpine` cho tác vụ cache Cart, Coupon data nhỏ.
3. **Application Node:** Sinh từ Dockerfile multi-stage để giảm nhẹ image size (từ JDK -> JRE chừng 150MB).

## 4. Giới Hạn Hạ Tầng

- PostgreSQL config Max Connections: Nên để 100-200, phù hợp ghép nối HikariCP Pool Size = 50.

## 5. Changelog

- **v1.0:** Config Docker Compose Base.
