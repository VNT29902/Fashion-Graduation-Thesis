# Lộ trình Phát triển & Phân chia Task (Work Packages) v2.0 (Enhanced)

Tài liệu này chia nhỏ dự án thành các gói công việc (Work Package) để bạn có thể giao cho từng Agent chuyên biệt.

## Giai đoạn 1: Nền tảng & Giao diện (Frontend Base)
**Người thực hiện:** 🎨 **Frontend Expert**

*   **Task 1.1: Thiết lập Theme & Layout**
    *   **Mô tả:** Cài đặt Shadcn/ui, chọn font chữ (Inter/Outfit), định nghĩa bảng màu (Primary, Secondary) trong `globals.css`. Tạo Header, Footer responsive.
    *   **Prompt giao việc:** "Đóng vai Frontend Expert, hãy cài đặt Shadcn/ui, thiết lập font chữ Outfit và tạo Layout chính (Header, Footer) cho trang web thời trang."

*   **Task 1.2: Xây dựng UI Trang chủ (Landing Page)**
    *   **Mô tả:** Tạo Hero Section (Banner lớn), Featured Products (Carousel slider), New Arrivals.
    *   **Prompt giao việc:** "Đóng vai Frontend Expert, hãy code trang chủ thật đẹp, có Banner lớn chạy Slide và danh sách sản phẩm nổi bật sử dụng Grid system."

*   **Task 1.3: Admin Dashboard (NEW)**
    *   **Mô tả:** Trang quản trị để thêm sửa xóa sản phẩm. Dùng layout riêng (Sidebar + DataTable).
    *   **Prompt giao việc:** "Đóng vai Frontend Expert, hãy dựng layout cho trang Admin (/admin) có Sidebar bên trái và khu vực nội dung chính. Sử dụng Shadcn Table để hiển thị danh sách."

## Giai đoạn 2: Kiến trúc & Cơ sở dữ liệu (Backend Core)
**Người thực hiện:** 🏗️ **Architect** & ⚙️ **Backend Specialist**

*   **Task 2.1: Thiết kế Database (ERD)**
    *   **Mô tả:** Thiết kế bảng `users`, `products`, `product_variants` (Màu/Size), `categories`, `orders`.
    *   **Prompt giao việc:** "Đóng vai Architect, hãy vẽ sơ đồ ERD cho hệ thống bán quần áo. Lưu ý phần biến thể sản phẩm (SKU) cần thiết kế kỹ để quản lý tồn kho theo từng Size/Màu."

*   **Task 2.2: Dựng Module Product (Spring Modulith)**
    *   **Mô tả:** Tạo Package `product`. Viết Entity, Repository, Service để thêm/sửa/xóa sản phẩm và biến thể.
    *   **Prompt giao việc:** "Đóng vai Backend Dev, hãy implement module Product bằng Spring Modulith. Viết API CRUD có hỗ trợ phân trang và lọc theo danh mục."

## Giai đoạn 3: Bảo mật & Người dùng (Authentication)
**Người thực hiện:** ⚙️ **Backend Specialist** & 🎨 **Frontend Expert**

*   **Task 3.1: Backend Security**
    *   **Mô tả:** Cấu hình Spring Security 6, JWT Filter, API Login/Register.
    *   **Prompt giao việc:** "Đóng vai Backend Dev, hãy cài đặt Authentication dùng JWT. Lưu ý password phải được hash bằng BCrypt."

*   **Task 3.2: Frontend Auth Pages**
    *   **Mô tả:** Vẽ trang Đăng nhập / Đăng ký form đẹp, validate dữ liệu bằng Zod.
    *   **Prompt giao việc:** "Đóng vai Frontend Dev, tạo form đăng nhập/đăng ký sử dụng React Hook Form và Zod để validate. Giao diện sang trọng."

## Giai đoạn 4: Tính năng mua sắm & AI (Shopping Flow)
**Người thực hiện:** 🤖 **AI Engineer** & ⚙️ **Backend Specialist**

*   **Task 4.1: Giỏ hàng & Thanh toán**
    *   **Mô tả:** API Add to Cart (Lưu Redis hoặc DB), API Checkout giả lập.
    *   **Prompt giao việc:** "Đóng vai Backend Dev, viết API giỏ hàng và xử lý đặt hàng (Place Order)."

*   **Task 4.2: Tích hợp AI Search**
    *   **Mô tả:** Dùng `pgvector` để tìm kiếm sản phẩm theo mô tả: "Váy đỏ đi tiệc".
    *   **Prompt giao việc:** "Đóng vai AI Engineer, hãy tích hợp Spring AI để làm tính năng tìm kiếm ngữ nghĩa (Vector Search) cho sản phẩm."

## Giai đoạn 5: DevOps & Triển khai (Enterprise Grade) (NEW)
**Người thực hiện:** 🏗️ **Architect** (DevOps Mode)

*   **Task 5.1: Docker Optimization**
    *   **Mô tả:** Viết Dockerfile tối ưu (Multi-stage build) cho cả Backend và Frontend.
    *   **Prompt giao việc:** "Đóng vai DevOps, hãy viết Dockerfile multi-stage build cho Spring Boot và Next.js để image nhẹ nhất có thể."

*   **Task 5.2: CI/CD Pipeline (GitHub Actions)**
    *   **Mô tả:** Tự động chạy Unit Test khi push code.
    *   **Prompt giao việc:** "Đóng vai DevOps, hãy tạo file workflow GitHub Actions để chạy test tự động mỗi khi có commit mới."

## Giai đoạn 6: Chuẩn bị Bảo vệ (Thesis Defense) (NEW)
**Người thực hiện:** 🏗️ **Architect**

*   **Task 6.1: Tài liệu & Biểu đồ**
    *   **Mô tả:** Vẽ lại các biểu đồ Usecase, Sequence, Architecture bằng Mermaid/PlantUML đẹp mắt để đưa vào slide.
    *   **Prompt giao việc:** "Đóng vai Architect, hãy vẽ biểu đồ tuần tự (Sequence Diagram) cho luồng 'Khách hàng nhờ AI tư vấn và thêm vào giỏ hàng'."
