# Tiêu chuẩn E2E Testing (End-to-End)

**Tác giả (Owner):** DSkaly | **Ngày cập nhật:** 2026-02-20
**Reviewer:** Principal Architect | **Trạng thái:** Active | **Version:** v1.0

## 1. Mục Đích (Purpose)

Xác thực luồng trải nghiệm khách hàng ở Frontend (Next.js) phản hồi đúng với cấu trúc API của Backend. Viết theo cơ chế hộp đen (Black-box testing) đóng vai trò như một User thực tế.

## 2. Phạm Vi Khảo Sát (Scope)

- **Bao gồm:** Luồng User Login, Thêm vào giỏ hàng, Checkout, Validation form.
- **Không bao gồm:** Các API ẩn không phục vụ giao diện hệ thống.

## 3. Kiến Trúc Chi Tiết

1. **Công cụ:** Sử dụng **Cypress** hoặc Playwright.
2. **Kịch bản lõi (Core Flows):**
   - _Flow Mua Sắm (Shopping Flow):_ Mở trang chủ -> Đăng nhập Google/Local -> Xem sản phẩm -> Chọn Size/Màu đồ -> Thêm giỏ hàng -> Thanh toán -> Nhận thông báo thành công.
3. **Môi trường Test:** Chạy E2E Script trên môi trường Docker Compose (Database Test DB riêng biệt) để không làm hỏng dữ liệu Dev cục bộ.

## 4. Các Ràng Buộc & Giới Hạn

- Test E2E rất tốn thời gian. Phải chạy song song (Paralell execution) trên CI/CD.

## 5. Changelog

- **v1.0:** Khởi tạo tài liệu quy chuẩn Kiểm thử E2E.
