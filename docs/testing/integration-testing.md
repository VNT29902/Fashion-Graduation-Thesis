# Tiêu chuẩn Integration Testing (Kiểm thử tích hợp)

**Tác giả (Owner):** DSkaly | **Ngày cập nhật:** 2026-02-20
**Reviewer:** Principal Architect | **Trạng thái:** Active | **Version:** v1.0

## 1. Mục Đích (Purpose)

Xác thực sự kết nối chính xác giữa các Module trong Spring Modulith, Database Repository và External Services (Redis, OpenAI, Payment Gateway) để đảm bảo hệ thống không bị "gãy" khi ghép nối các khối lệnh chạy độc lập.

## 2. Phạm Vi Khảo Sát (Scope)

- **Bao gồm:** Modulith Event Publishing/Listening, Spring ApplicationContext (`@SpringBootTest`), Querying Database (JPA/Hibernate), Controller Endpoint validation (`MockMvc`).
- **Không bao gồm:** Luồng click trên giao diện Web (UI Automation).

## 3. Kiến Trúc Chi Tiết / Cấu Hình (Configuration)

1. **MockMvc / SpringBootTest:** Các Controller API phải được test bằng `MockMvc` và load một ApplicationContext rút gọn hoặc toàn phần tùy mức độ.
2. **Flyway DB Init:** Backend Database trong Integration test luôn phải được init qua Flyway migrations (`V1__init_schema.sql`) để giống y hệt Production. Cấm sử dụng `hibernate.ddl-auto=create`.
3. **Mocking External APIs:** Dùng `@MockitoBean` (thay cho `@MockBean` bị deprecated) để giả lập OpenAI API (Spring AI) hoặc các 3rd Party Payment Gateway Endpoint ngầm. Không bắn request thật khi Unit/Integration Test!

## 4. Các Ràng Buộc & Giới Hạn

- Tốc độ chạy Integration Test luôn chậm hơn Unit Test do phải load Spring Context và Docker Database. Không thêm Integration tests thừa thãi.
- Dữ liệu rác sau mỗi test-case phải được rollback tự động qua annotaion `@Transactional`, tránh làm ảnh hưởng state của test tiếp theo.

## 5. Changelog

- **v1.0:** Khởi tạo tài liệu quy chuẩn Kiểm thử Tích hợp.
