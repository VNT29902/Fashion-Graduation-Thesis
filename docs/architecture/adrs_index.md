# Architecture Decision Records (ADR)

**Tác giả (Owner):** DSkaly | **Ngày cập nhật:** 2026-02-20
**Reviewer:** Technical Lead | **Trạng thái:** Active | **Version:** v1.0

## 1. Mục Đích (Purpose)

Thư mục `/docs/architecture/adrs` lưu trữ các quyết định kiến trúc quan trọng nhất của dự án Fashion E-Commerce. ADR giúp team tương lai hiểu được Rationale (Lý do) đằng sau một thiết kế thay vì chỉ nhìn vào kết quả.

## 2. Danh Sách ADRs Đã Duyệt (Approved)

1. **[ADR-0001] Sử dụng Spring Modulith thay vì Microservices (Saga)**
   - _Lý do:_ Hệ thống cần tốc độ phát triển nhanh của Monolith nhưng vẫn duy trì tính module hóa nghiêm ngặt để phân tách team (Cart, Order, Payment). Spring Modulith kết hợp với Event-Driven (ApplicationEventPublisher) mang lại sự tối ưu tuyệt đối cho đồ án này.
2. **[ADR-0002] Thay thế Hibernate DDL bằng Flyway**
   - _Lý do:_ Ngăn chặn rủi ro mất dữ liệu trên Production do Hibernate tự động drop table dựa trên Entity. Flyway cung cấp Transactional DDL giúp versioning database schema.
3. **[ADR-0003] Sử dụng Vector Database tích hợp (pgvector)**
   - _Lý do:_ Tận dụng cơ sở dữ liệu PostgreSQL sẵn có thay vì tốn resource thiết lập Milvus/Pinecone cho tính năng AI Search (RAG).

## 3. Quy Trình Trình Bày ADR

Bất cứ Developer nào đề xuất thay đổi kiến trúc (Cơ sở dữ liệu, Frameowrk, Thư viện lõi) đều phải tạo PR file `.md` vào thư mục này theo form:

- Title
- Context (Ngữ cảnh)
- Decision (Quyết định)
- Consequences (Hậu quả / Rủi ro)
