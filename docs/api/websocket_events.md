# Đặc Tả Sự Kiện WebSocket (Real-time Events)

**Tác giả (Owner):** DSkaly | **Ngày cập nhật:** 2026-02-20
**Reviewer:** Principal Architect | **Trạng thái:** Active | **Version:** v1.0

## 1. Mục Đích (Purpose)

Tài liệu này xác định các kênh (topic) và chuẩn payload được gửi đi qua WebSocket (STOMP Protocol) phục vụ cho các tính năng thời gian thực như Notification hoặc giỏ hàng đồng bộ chéo thiết bị.

## 2. Phạm Vi Khảo Sát (Scope)

- **Bao gồm:** Kết nối STOMP, Subscription pattern, Security Handshake.
- **Không bao gồm:** Các luồng API truyền thống REST request/response.

## 3. Kiến Trúc Chi Tiết

1. **Endpoint:** `/ws-fashion`
2. **Channel Notifications:**
   - Đăng ký nhận thông báo cá nhân tại: `/user/queue/notifications`.
   - Payload Format:
     ```json
     {
       "type": "ORDER_STATUS_CHANGED",
       "message": "Đơn hàng #123 của bạn đang được giao",
       "data": { "orderId": 123, "status": "SHIPPING" },
       "timestamp": "2026-02-20T10:05:00Z"
     }
     ```

## 4. Các Ràng Buộc & Giới Hạn

- User phải truyền JWT Token trong tham số `Authorization` headers khi khởi tạo handshake. WebSecurity sẽ tự động check token trước khi Upgrade Protocol.

## 5. Changelog

- **v1.0:** Khởi tạo tài liệu WebSocket.
