# Đặc Tả Giao Tiếp REST API (API Contracts)

**Tác giả (Owner):** DSkaly | **Ngày cập nhật:** 2026-02-20
**Reviewer:** Principal Architect | **Trạng thái:** Active | **Version:** v1.0

## 1. Mục Đích (Purpose)

Quy định phương thức và chuẩn định dạng giao tiếp qua HTTP REST giữa Next.js Client và Spring Boot Server.

## 2. Phạm Vi Khảo Sát (Scope)

- **Bao gồm:** Chuẩn hóa JSON Response, Error Handling format, Pagination.
- **Tài liệu Chi tiết:** Link Swagger UI nội bộ thay cho văn bản hardcode.

## 3. Kiến Trúc Chi Tiết (Standard Payload)

Mọi API đều trả về dạng bọc Wrapper (API Response Wrapper):

```json
{
  "status": 200,
  "message": "Cart merged successfully",
  "data": {
    "subTotal": 150000,
    "items": []
  },
  "timestamp": "2026-02-20T10:00:00Z"
}
```

- **Swagger UI:** Được sinh tự động tại `http://localhost:8080/swagger-ui.html` nhờ thư viện `springdoc-openapi`.

## 4. Ràng Buộc (Constraints)

- Cấm sử dụng HTTP Status 200 cho lỗi Logic. Phải dùng 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found).

## 5. Changelog

- **v1.0:** Define Global Response Wrapper.
