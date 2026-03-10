# Domain Đặc Tả: Đơn Hàng (Order Bounded Context)

**Tác giả (Owner):** DSkaly | **Ngày cập nhật:** 2026-02-20
**Reviewer:** Domain Expert | **Trạng thái:** Active | **Version:** v1.0

## 1. Mục Đích (Purpose)

Domain `Order` chịu trách nhiệm toàn bộ vòng đời của một đơn đặt hàng, từ lúc Checkout, Thanh toán (Payment Integration), cho đến Vận chuyển và Hoàn thành.

## 2. Phạm Vi Khảo Sát (Scope)

- **Bao gồm:** Order entity, OrderItem snapshot, Trạng thái thanh toán (VNPay/Momo), Lịch sử trạng thái đơn.
- **Không bao gồm:** Tính toán khuyến mãi (thuộc Coupon Domain), Quản lý Giỏ hàng.

## 3. Kiến Trúc Chi Tiết / Logic Nghiệp Vụ

1. **Checkout Flow:** Nhận request tạo Order từ Frontend -> Clone Data từ `CartItem` sang `OrderItem` để chốt giá (`snapshotPrice`). Xóa Cart hiện tại.
2. **Thanh toán:** Nếu User chọn VNPay, tạo Payment Link -> Redirect -> Nhận IPN Callback -> Đổi trạng thái Order thành `PAID`.
3. **Event Firing:** Khi Order `PAID`, bắn `OrderPaidEvent` để Domain Product trừ kho vật lý và Domain Notification gửi Email cho khách.

## 4. Các Ràng Buộc & Giới Hạn (Constraints & Limitations)

- Đảm bảo tính Idempotent cho API xử lý Callback thanh toán của VNPay/Momo (chống gọi đúp gây cập nhật sai trạng thái).

## 5. Changelog

- **v1.0:** Khởi tạo đặc tả Domain Order.
