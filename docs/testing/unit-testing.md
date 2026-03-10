# Tiêu chuẩn Unit Testing

**Tác giả (Owner):** DSkaly | **Ngày cập nhật:** 2026-02-20
**Reviewer:** QC Lead | **Trạng thái:** Active | **Version:** v1.0

## 1. Mục Đích (Purpose)

Định nghĩa quy chuẩn viết Unit Test cho backend, nhằm bảo đảm độ bao phủ (Coverage) 70%+ trên các tầng Business Logic trọng yếu mà không làm chậm quá trình CI/CD.

## 2. Phạm Vi Khảo Sát (Scope)

- **Bao gồm:** Các Service Implementations, Unit Utils, Domain Object Validations.
- **Không bao gồm:** Controllers (chạy qua Integration Test), Repositories, Cấu hình Spring.

## 3. Kiến Trúc Chi Tiết

1. **Mocking Framework:** Sử dụng Mockito (`@ExtendWith(MockitoExtension.class)`) kết hợp JUnit 5.
2. **Assertion Library:** Sử dụng **AssertJ** (`assertThat`) thay vì `assertEquals` cổ điển để cú pháp Fluent dễ đọc hơn.
3. **Naming Convention:** Đặt tên hàm test bằng tiếng Anh thể hiện rõ kịch bản mở rộng: `when[Condition]_then[ExpectedResult]`.
   - VD: `whenApplyCouponExceedsTotal_thenThrowsValidationException()`

## 4. Các Ràng Buộc & Giới Hạn

- Tuyệt đối không Boot toàn bộ Spring ApplicationContext (`@SpringBootTest`) vào bài tập Unit Test, vì điều này làm chậm Server khởi động trong Pipeline cực kỳ đáng kể.
- Bắt buộc phải clear các trạng thái của Static Mock sau mỗi `@AfterEach` (nếu có sử dụng Static Mocking).

## 5. Changelog

- **v1.0:** Khởi tạo quy tắc Unit Testing.
