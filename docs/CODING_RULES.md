# Quy tắc Lập trình (Coding Rules) - Fashion Graduation Thesis

Tài liệu này quy định các chuẩn mực kỹ thuật bắt buộc cho dự án.

## 1. Backend (Spring Boot 3 + Java 21)
*   **Structure:** Sử dụng kiến trúc **Spring Modulith**.
    *   Mỗi domain (Product, Order, User) là một package riêng biệt.
    *   Tuyệt đối không gọi chéo Repository giữa các module. Phải dùng Service hoặc Event.
*   **DTO:** Bắt buộc sử dụng **Java `record`** cho các object truyền tải dữ liệu (Immutable).
*   **Response:** Mọi API phải trả về format thống nhất:
    ```json
    {
      "status": 200,
      "message": "Success",
      "data": { ... }
    }
    ```
*   **Exception:** Xử lý lỗi tập trung tại `@ControllerAdvice`, không try-catch bừa bãi trong Controller.

## 2. Frontend (Next.js 14 + Shadcn/ui)
*   **Component:** Ưu tiên **Server Components** (mặc định). Chỉ dùng `"use client"` khi cần tương tác (onClick, useState).
*   **Data Fetching:**
    *   Server Side: Dùng `fetch` trực tiếp (hoặc DB call).
    *   Client Side: Bắt buộc dùng **TanStack Query (React Query)**. Không dùng `useEffect` để fetch data.
*   **Styling:**
    *   Sử dụng **Tailwind CSS**.
    *   Không viết CSS thuần (`.css` files) trừ khi global style.
    *   Class sắp xếp theo thứ tự: Layout -> Box Model -> Typography -> Visual -> Misc.

## 3. Database (PostgreSQL)
*   **Naming:** snake_case cho tên bảng và cột (ví dụ: `product_variants`, `created_at`).
*   **AI:** Cột chứa vector embedding phải đặt tên là `embedding_vector` (kiểu dữ liệu `vector(1536)`).

## 4. Git & Commit
*   Tiếng Việt, format: `[Loại] Nội dung`.
    *   Ví dụ: `[Feat] Thêm chức năng giỏ hàng`, `[Fix] Sửa lỗi đăng nhập`.
