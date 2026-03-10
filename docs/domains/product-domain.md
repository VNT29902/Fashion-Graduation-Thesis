# Domain Đặc Tả: Sản Phẩm (Product Bounded Context)

**Tác giả (Owner):** DSkaly | **Ngày cập nhật:** 2026-02-20
**Reviewer:** Domain Expert | **Trạng thái:** Active | **Version:** v1.0

## 1. Mục Đích (Purpose)

Domain `Product` quản lý toàn bộ danh mục hàng hóa, biến thể sản phẩm (SKU, Size, Color), tồn kho và tích hợp AI Vector Search (pgvector) để gợi ý sản phẩm.

## 2. Phạm Vi Khảo Sát (Scope)

- **Bao gồm:** Quản lý Product, ProductVariant, Category, Inventory management (nhập xuất kho), Semantic Search.
- **Không bao gồm:** Giỏ hàng, Đơn hàng, Mua sắm.

## 3. Kiến Trúc Chi Tiết / Logic Nghiệp Vụ (Code/Business Logic)

1. **Quản lý SKU:** Mỗi `ProductVariant` tương ứng với một phân loại hàng (đỏ/M) và có số lượng `stock_quantity` riêng biệt.
2. **AI Search (RAG):** Khi sản phẩm mới được thêm vào, thông tin (tên, mô tả, chất liệu) được chuyển đổi thành Embedding Vector thông qua LLM API và lưu xuống cột `embedding_vector` của `Product` trong PostgreSQL (qua extension pgvector).
3. **Cập nhật Inventory:** Chỉ Domain Product được quyền thay đổi `stock_quantity`. Các domain khác (như Order) phải gửi Event `OrderPlacedEvent` để Product Domain trừ kho.

## 4. Các Ràng Buộc & Giới Hạn (Constraints & Limitations)

- Embedding sinh ra tốn phí API (OpenAI/Gemini), nên chỉ gọi gen embedding khi Insert hoặc Update mô tả sản phẩm.

## 5. Changelog

- **v1.0:** Khởi tạo đặc tả Domain Product.
