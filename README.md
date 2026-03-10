# Fashion E-Commerce (Monorepo)

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-95%25-green)
![License](https://img.shields.io/badge/license-MIT-blue)

Dự án Hệ thống Thương mại Điện tử Thời trang cao cấp (Fashion E-Commerce).
Được thiết kế dựa trên kiến trúc **Spring Modulith** theo chuẩn Enterprise-grade, phục vụ cho Đồ án Tốt nghiệp.

## Cấu trúc Dự án

- `backend/`: Mã nguồn Spring Boot 3 + Java 21 (RESTful API, Spring AI, PostgreSQL).
- `frontend/`: Mã nguồn Next.js 14 (App Router, Shadcn/ui, Tailwind).
- `docs/`: Hệ thống tài liệu kỹ thuật chuẩn doanh nghiệp.

## Bắt đầu cấu hình

Cài đặt rất đơn giản với Docker Compose.

1. Khởi động các dịch vụ phụ thuộc (PostgreSQL, Redis):
   ```bash
   cd backend
   docker-compose up -d
   ```
2. Đọc hướng dẫn chi tiết tại `docs/development/getting_started.md`.

## Hệ Thống Tài Liệu Kỹ Thuật (Enterprise Docs)

Toàn bộ tài liệu Architecture, Development, API, v.v được lưu trữ tập trung tại thư mục `docs/`. Tham khảo mục lục chi tiết dưới đây:

### 0. Quản trị Tài liệu (Governance)

- [Documentation Policy (Vòng đời MD)](docs/governance/docs_policy.md)

### 1. Kiến trúc Hệ thống (Architecture)

- [Kiến trúc Tổng quan (System Arch)](docs/architecture/01_system_architecture.md)
- [Cơ sở dữ liệu Schema (ERD)](docs/architecture/02_database_schema.md)
- [Nhật ký Quyết định (ADRs Index)](docs/architecture/adrs_index.md)

### 2. Đặc tả Nghiệp vụ (Domain-Driven Design)

- [Cart Bounded Context](docs/domains/cart-domain.md)

### 3. Tiêu chuẩn Lập trình (Development)

- [Hướng dẫn Khởi chạy (Getting Started)](docs/development/getting_started.md)
- [Quy tắc Lập trình (Coding Standards)](docs/development/coding_standards.md)

### 4. Chiến lược Kiểm thử (Testing Strategy)

- [Performance & Load Testing](docs/testing/performance-testing.md)
