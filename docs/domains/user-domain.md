# Domain Đặc Tả: Người Dùng (User Bounded Context)

**Tác giả (Owner):** DSkaly | **Ngày cập nhật:** 2026-02-20
**Reviewer:** Domain Expert | **Trạng thái:** Active | **Version:** v1.0

## 1. Mục Đích (Purpose)

Domain `User` quản lý Account, Authentication (Login/Register định danh), Authorization (Phân quyền Role-based) và User Profile.

## 2. Phạm Vi Khảo Sát (Scope)

- **Bao gồm:** User Entity, Spring Security Config, JWT Generation/Validation, OAuth2 Login (Google).
- **Không bao gồm:** Thông tin giỏ hàng của User.

## 3. Kiến Trúc Chi Tiết

1. **Stateless JWT:** Hệ thống không dùng Session. Sau khi Login thành công, server cấp Access Token (Sống ngắn) và Refresh Token (Sống dài).
2. **OAuth2 Flow:** Hỗ trợ đăng nhập Google. Tự động map Email Google sang User Entity trong DB. Cấp phát JWT tương tự Login truyền thống.

## 4. Các Ràng Buộc & Giới Hạn

- Mật khẩu phải hash bằng BCrypt trước khi lưu.
- JWT Secret Key không được phép hardcode trong code mà phải đọc từ Environment Variables (`.env`).

## 5. Changelog

- **v1.0:** Khởi tạo đặc tả Domain User.
