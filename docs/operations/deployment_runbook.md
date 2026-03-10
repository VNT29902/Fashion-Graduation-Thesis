# Quy Trình Triển Khai (Deployment Runbook)

**Tác giả (Owner):** DSkaly | **Ngày cập nhật:** 2026-02-20
**Reviewer:** Principal Architect | **Trạng thái:** Active | **Version:** v1.0

## 1. Mục Đích (Purpose)

Bảo đảm tính ổn định khi đưa hệ thống Fashion E-Commerce từ môi trường Staging lên Production (Zero-downtime Deployment).

## 2. Phạm Vi Khảo Sát (Scope)

- **Bao gồm:** Kịch bản Build, Kịch bản Migration Database (Flyway), Rollback Plan (Zero-downtime).

## 3. Kiến Trúc Chi Tiết & Các Bước Deploy

1. **Pre-flight Check:**
   - Chạy toàn bộ Test (Unit, Integration, E2E) qua CI/CD GitHub Actions. Bắt buộc 100% Passed.
2. **Database Migration:**
   - Khi container khởi động, Flyway tự động detect và chạy file migration mới nhất (`V2__...sql`).
   - Nếu lỗi Migration -> Flyway lập tức báo đỏ, App không start -> Tự động Fallback về bản cũ.
3. **Blue/Green Deployment:** Nginx (hoặc Traefik) Load Balancer sẽ trỏ sang các Container "Green" mới khi ứng dụng Spring Boot báo `/actuator/health` là UP.

## 4. Kế Hoạch Rollback (Rollback Plan)

- Đổi tag image Docker trong file `docker-compose.prod.yml` về bản cũ. Nginx tự động redirect traffic.

## 5. Changelog

- **v1.0:** Khởi tạo Deployment Runbook.
