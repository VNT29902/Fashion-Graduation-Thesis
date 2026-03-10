# Đồ án Tốt nghiệp E-commerce Thời trang

## 1. Tổng quan Dự án

**Đề tài:** Hệ thống Thương mại điện tử Thời trang cao cấp (Monorepo)
**Mục tiêu:** Xây dựng một nền tảng mua sắm hiện đại, chuẩn doanh nghiệp (Enterprise Grade) tích hợp AI sâu rộng.

## 2. Công nghệ sử dụng (Tech Stack) - State of the Art

### Backend (Lõi) - Hiệu năng cao

- **Framework:** Spring Boot 3.3+ (Mới nhất)
- **Ngôn ngữ:** **Java 21 LTS** (Sử dụng **Virtual Threads** thay cho Thread truyền thống -> Xử lý hàng chục nghìn request/giây).
- **Kiến trúc:** **Spring Modulith** (Module hóa trong Monolith - Dễ bảo trì như Microservices).
- **Cơ sở dữ liệu:** PostgreSQL + **Extension `pgvector`** (Vector Database cho AI).
- **Bảo mật:** Spring Security 6 (Stateless JWT, OAuth2).

### Frontend (Giao diện) - Trải nghiệm người dùng (UX) tối thượng

- **Framework:** Next.js 16+ (App Router, Server Components).
- **Ngôn ngữ:** TypeScript.
- **UI Library:** **Shadcn/ui** (Thiết kế hiện đại, tinh tế) + Tailwind CSS.
- **Animation:** **Framer Motion** (Hiệu ứng chuyển động mượt mà, cao cấp).
- **Quản lý trạng thái:** React Query (TanStack Query) + Zustand.

### AI & Agents (Trợ lý thông minh)

- **Framework:** Spring AI.
- **Mô hình:** OpenAI GPT-3.5/4o hoặc Gemini Pro.
- **Tính năng:**
  - **RAG (Retrieval Augmented Generation):** Tư vấn thời trang dựa trên dữ liệu thật của shop.
  - **AI Stylist:** Gợi ý Mix & Match đồ theo ngữ cảnh (Đi tiệc, đi biển...).

## 3. Kiến trúc hệ thống

- **Monorepo:** Quản lý tập trung tại `D:\CodeFile\Fashion-Graduation-Thesis`.
  - `/backend`: API & AI Logic.
  - `/frontend`: Web App.
  - `/docs`: Tài liệu kỹ thuật.

## 4. Yêu cầu chức năng nâng cao (WoW Factors)

- **Thanh toán:** Tích hợp VNPay / Momo (Môi trường Sandbox).
- **Real-time:** WebSocket (Thông báo đơn hàng, Chat support).
- **Triển khai:** Docker & Docker Compose (Containerization).
