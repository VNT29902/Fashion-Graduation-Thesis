# Chiến Lược Test Hệ Thống (Testing Strategy)

**Tác giả (Owner):** DSkaly | **Ngày cập nhật:** 2026-02-20
**Reviewer:** Principal Architect | **Trạng thái:** Active | **Version:** v1.0

## 1. Mục Đích (Purpose)

Tài liệu quy định chiến lược, độ phủ và cơ chế kiểm thử đa tầng (Multi-tier Testing) cho hệ thống Fashion E-Commerce nhằm đảm bảo chất lượng Production-ready và hiệu năng cao (1000+ Concurrent Users).

## 2. Kim Tự Tháp Kiểm Thử (Testing Pyramid)

### 2.1. Tầng Đáy: Unit Testing (70% Coverage Core Logic)

- **Công cụ:** JUnit 5, Mockito, AssertJ.
- **Phạm vi:** Các Service layer (business rules), Utils, và Helper classes.
- **Quy tắc:**
  - KHÔNG nạp (load) Spring Context (`@SpringBootTest`). Test chạy trong vòng milliseconds.
  - Phải test các edge-cases: Tính giá trị coupon vượt mức sản phẩm, số lượng tồn kho âm, null inputs.

### 2.2. Tầng Giữa: Integration Testing (Spring Modulith)

- **Công cụ:** Spring Boot Test, Testcontainers (PostgreSQL, Redis), MockMvc.
- **Phạm vi:** Kiến trúc Module (Bounded Context), DB Transactions, và Controller-Service-Repository flow.
- **Quy tắc:**
  - Khởi tạo Data thực qua Flyway thay vì Hibernate auto-ddl.
  - Test giao tiếp giữa các module: Phải có test cho việc `CartMergedEvent` được `ApplicationEventPublisher` bắn đi.

### 2.3. Tầng Bề Mặt: E2E & Performance Testing

- **E2E (End-to-End):** Cypress (tương tác trực tiếp trên giao diện Next.js, giả lập luồng Mua hàng toàn vẹn).
- **Performance:** Đặt tại file `CartMergeBenchmarkTest` (Sử dụng ExecutorService).
  - Tối thiểu hệ thống phải xử lý qua mốc tải **133 TPS** (Transaction Per Second) đối với 1 luồng gộp giỏ hàng (Cart Merge) trong điều kiện mô phỏng 1000 Login ảo đồng thời.

## 3. Kiến Trúc Performance & Concurrency

Hệ thống E-Commerce cấu hình riêng ThreadPool (HikariCP Size = 50) trong quá trình benchmark để đo mức tải database khi:

- Nhiều Client đồng thời truy xuất vào kho (Inventory) để giành mua chung 1 mặt hàng (ProductVariant).
- Testing Strategy buộc chạy đối chứng giữa `READ COMMITTED` (Nhanh nhưng có thể dính Ghost/Lost Update nếu không có Optimistic Locking) và `REPEATABLE READ` (Snapshot chuẩn nhưng dính Serialization Failure nếu ranh giới transaction chéo).

## 4. CI/CD Pipeline

- Pull Request lên nhánh `main` buộc đi qua Github Actions: `mvn test`. Nếu bất kỳ Unit Test/Integration Test nào Fail -> Chặn (Block) việc merge code.
