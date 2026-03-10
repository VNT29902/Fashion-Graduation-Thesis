# Database Schema (ERD)

This document outlines the entity relationships for the Fashion E-commerce system.

## Entities Overview

*   **Users**: Stores user authentication and profile info. Supports OAuth (Google) and Local login.
*   **Products**: Base product information.
*   **Product Variants**: Specific SKU variations (Size/Color) with stock and price adjustments.
*   **Categories**: Hierarchical category tree.
*   **Orders**: Transactional records.
*   **Order Items**: Snapshot of items in an order (price fixed at purchase time).
*   **Cart**: Persistent shopping cart for users.

## Diagram (Mermaid Class Diagram)

```mermaid
classDiagram
    %% User Management
    class User {
        +UUID id PK
        +String email
        +String password_hash
        +Role role "USER | ADMIN"
        +Provider provider "GOOGLE | LOCAL"
        +DateTime created_at
        +DateTime updated_at
    }

    %% Product Catalog
    class Category {
        +UUID id PK
        +String name
        +String slug
        +UUID parent_id FK
        +List~Category~ children
    }

    class Product {
        +UUID id PK
        +String name
        +String description
        +Decimal base_price
        +UUID category_id FK
        +DateTime created_at
        +DateTime updated_at
    }

    class ProductVariant {
        +UUID id PK
        +UUID product_id FK
        +String size "S, M, L"
        +String color "Red, Blue"
        +Integer stock_quantity
        +Decimal price_adjustment
        +String sku_code
    }

    %% Shopping Cart
    class Cart {
        +UUID id PK
        +UUID user_id FK
        +DateTime created_at
        +DateTime updated_at
    }

    class CartItem {
        +UUID id PK
        +UUID cart_id FK
        +UUID product_variant_id FK
        +Integer quantity
        +DateTime added_at
    }

    %% Order Processing
    class Order {
        +UUID id PK
        +UUID user_id FK
        +Decimal total_amount
        +String status "PENDING, PAID, SHIPPED, COMPLETED, CANCELLED"
        +DateTime created_at
        +DateTime updated_at
    }

    class OrderItem {
        +UUID id PK
        +UUID order_id FK
        +UUID product_variant_id FK
        +Integer quantity
        +Decimal snapshot_price
    }

    %% Relationships
    User "1" --> "*" Order : places
    User "1" --> "1" Cart : owns
    
    Category "1" --> "*" Category : parent_of
    Category "1" --> "*" Product : classifies
    
    Product "1" --> "*" ProductVariant : has_variants
    
    Cart "1" --> "*" CartItem : contains
    ProductVariant "1" --> "*" CartItem : added_to
    
    Order "1" --> "*" OrderItem : contains
    ProductVariant "1" --> "*" OrderItem : ordered_as
```
