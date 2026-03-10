# Backend Bootstrap Implementation Plan

## Goal
Khởi tạo cấu trúc Backend chuẩn và đảm bảo ứng dụng chạy được (Health Check).

## Proposed Changes

### 1. File Structure Correction [DONE]
- Move files from `backend/fashion-backend` to `backend/`.

### 2. Configuration (`backend/src/main/resources/application.yml`)
- **Action:** [NEW] Create `application.yml` (replace `application.properties`).
- **Content:**
    - Server Port: 8080
    - Spring Application Name: `fashion-backend`
    - Datasource: PostgreSQL (localhost:5432/fashion_db)
    - JPA: Hibernate DDL Auto (update), Show SQL (true)

### 3. Health Check API (`backend/src/main/java/com/fashionthesis/backend/controller/HealthController.java`)
- **Action:** [NEW] Create a simple REST Controller.
- **Endpoint:** `GET /api/v1/health`
- **Response:** `{"status": 200, "message": "Fashion Backend is running!", "version": "1.0.0"}`

### 4. Enable Modules
- Ensure `@EnableAsync` or other necessary annotations are present in Main Application class.

## Verification Plan

### Automated
- Run `mvn spring-boot:run`.
- Execute `curl http://localhost:8080/api/v1/health`.
- Expect JSON response with status 200.

### Manual
- User opens browser to `http://localhost:8080/api/v1/health`.
