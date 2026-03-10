# Chu Trình Đánh Giá Tài Liệu (Review Process)

**Tác giả (Owner):** DSkaly | **Ngày cập nhật:** 2026-02-20
**Reviewer:** Principal Architect | **Trạng thái:** Active | **Version:** v1.0

## 1. Mục Đích (Purpose)

Gắn kết vòng đời thay đổi tài liệu (Documentation) vào sát với quy tắc thay đổi mã nguồn (Code PRs), chống lệch pha giữa Doc và Code.

## 2. Phạm Vi Khảo Sát (Scope)

- **Quy tắc:** Mọi tính năng (Feature) mới nếu có thay đổi DB hoặc Logic lõi đều MẶC ĐỊNH PHẢI kèm theo cập nhật file `.md` trong cùng 1 Pull Request.

## 3. Quá Trình Nhận Diện PR

1. Khi Developer gửi Pull Request (PR) về nhánh `develop`.
2. Reviewer check: "Có thay đổi Cấu trúc Database không?" -> Nếu CÓ -> Kiểm tra `02_database_schema.md` xem đã tạo cột mới chưa?
3. Reviewer check: "Có thêm mới Controller API không?" -> Nếu CÓ -> Postman/Swagger Collection đã được sync chưa?
4. Nếu chưa thỏa mãn 2 điều trên -> Bấm `Request Changes` và reject PR.

## 4. Các Ràng Buộc & Giới Hạn (Constraints & Limitations)

- Khắt khe trong quá trình review PR, đánh giá tài liệu (Docs) quan trọng như unit-test.

## 5. Changelog

- **v1.0:** Khởi tạo quy trình review tài liệu.
