# ⚽ Web-Project-Spring-2024: Sports Excellence Platform

A robust, full-stack web application designed for sports clubs to manage their digital presence, fan engagement, and commercial operations. Built with a focus on scalability, security, and user experience.

---

## 📖 Table of Contents
1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Deep Dive: System Architecture](#deep-dive-system-architecture)
4. [Data Models](#data-models)
5. [Administrative Suite](#administrative-suite)
6. [Technical Implementation](#technical-implementation)
7. [Installation & Setup](#installation--setup)
8. [Directory Structure](#directory-structure)

---

## 🌟 Project Overview
This platform serves as a central hub for sports fans and club administrators. It integrates three core pillars:
- **E-commerce**: A high-performance shop for merchandise.
- **Ticketing**: A streamlined system for match attendance.
- **Engagement**: A dynamic news and match center to keep fans connected.

The system is localized, secure (HTTPS), and mobile-responsive, ensuring a premium experience for a global audience.

---

## 🚀 Key Features

### 👤 User & Profile System
- **Secure Authentication**: Password hashing with `bcryptjs` and session-based state management.
- **Personalization**: Users can customize their profiles, including "Shirt Details" (name, number, and custom kit image).
- **History Tracking**: Complete logs of purchased products and secured tickets attached to user profiles.

### 🛒 Advanced e-Commerce
- **Categorization**: Products organized by `Men`, `Women`, and `Retro` collections.
- **Smart Filtering**: Sub-sections for Kits, Training, Hoodies, Trousers, and Headwear.
- **Inventory Control**: Real-time quantity tracking and "Sold Pieces" analytics.
- **Shopping Cart**: Session-persistent cart with dynamic quantity updates and total price calculation.

### 🎫 Professional Ticketing
- **Tiered Pricing**: Support for `VIP`, `Premium`, and `Standard` ticket levels.
- **Match Management**: Tracking of fixtures, stadium locations, and event timestamps.
- **Validation**: Frontend and backend checks for payment details and expiration dates.

### 📰 News & Match Center
- **Dynamic Articles**: Rich-text support for club news with image integration.
- **Match Stats**: Real-time view of Fixtures, All Matches, and Predictions.

---

## 🏗️ Deep Dive: System Architecture

### Authentication Flow
1. User submits credentials via the **LoginController**.
2. Passwords are verified against the MongoDB hash using `bcrypt`.
3. An active session is created, storing a non-sensitive user object for global access in EJS templates.
4. Admins are automatically routed to the Dashboard, while standard users head to the Landing Page.

### Purchase Workflow
- **Validation**: The `BuyPageController` performs intensive regex validation for credit cards, CVVs, and expiry dates.
- **Atomicity**: During checkout, the system verifies stock availability, decrements product quantity, updates "Sold Pieces" statistics, and appends the item to the user's purchase history in a single transaction-like flow.

---

## 📊 Data Models

### **User Model**
| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Full name of the fan |
| `email` | String | Unique identifier (lowercase normalized) |
| `type` | Enum | `Admin` or `User` access levels |
| `shirtName` | String | Custom name for the digital kit |
| `purchases` | Array | References to `Product` and `Ticket` models |

### **Product Model**
| Field | Type | Description |
| :--- | :--- | :--- |
| `category` | Enum | Men, Women, Retro |
| `section` | Enum | Kits, Training, Hoodies, etc. |
| `price` | Number | Unit price |
| `quantity` | Number | Remaining stock |

---

## 🛠️ Administrative Suite
The **Admin Dashboard** provides high-level business intelligence:
- **Real-time Stats**: Total users, total revenue (calculated from sales), and most ordered products.
- **Inventory Management**: CRUD interfaces to add, edit, or remove store items.
- **User Oversight**: Capacity to manage user accounts and roles.
- **Event Coordination**: Tools to create and update match tickets and stadiums.

---

## ⚙️ Technical Implementation

- **i18n (Internationalization)**: JSON-based locales (English, French, Spanish) managed through cookie-stored language preferences.
- **File Handling**: `Multer` middleware handles all asset uploads (Profile pics, Product images, Articles) to the `public/uploads` directory.
- **Security**: 
    - HTTPS via `fs.readFileSync` for SSL keys.
    - Path normalization to prevent directory traversal.
    - dotenv for environment variable isolation.

---

## 📦 Installation & Setup

1. **Environment Variables**:
   Create a `.env` file:
   ```env
   MONGO_URI=your_mongodb_cluster_uri
   PORT=3000
   ```

2. **SSL Setup**:
   Place `key.pem` and `cert.pem` in `/ssl`.

3. **Execution**:
   ```bash
   npm install
   npm start # or 'node app.js'
   ```

---

## 📂 Directory Structure

- 📁 **controllers/**: Business logic and request handling.
- 📁 **models/**: Mongoose schemas and data validation.
- 📁 **routes/**: Endpoint mapping for all 40+ application routes.
- 📁 **views/**: EJS templates organized by common layouts and feature pages.
- 📁 **public/**: Client-side assets (CSS, client-side JS, video backgrounds).
- 📁 **locales/**: Internationalization dictionaries.
