# 🚀 Bike Servicing Management API

A backend RESTful API for managing customers, bikes, and bike service records in a servicing center.

---

## LIVE LINK `https://assignment-8-orpin.vercel.app`



## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**

---

## 📦 Features

- CRUD operations for Customers, Bikes, and Services
- Assign and complete servicing jobs
- Fetch overdue/pending services
- UUID-based primary keys
- Structured error handling

---

## 🧱 Database Schema

### Customer Table

| Field      | Type     | Description           |
| ---------- | -------- | --------------------- |
| customerId | UUID     | Primary key           |
| name       | String   | Customer name         |
| email      | String   | Unique email          |
| phone      | String   | Contact number        |
| createdAt  | DateTime | Timestamp on creation |

### Bike Table

| Field      | Type   | Description        |
| ---------- | ------ | ------------------ |
| bikeId     | UUID   | Primary key        |
| brand      | String | Bike brand         |
| model      | String | Model name         |
| year       | Int    | Manufacturing year |
| customerId | UUID   | FK to Customer     |

### ServiceRecord Table

| Field          | Type     | Description                        |
| -------------- | -------- | ---------------------------------- |
| serviceId      | UUID     | Primary key                        |
| bikeId         | UUID     | FK to Bike                         |
| serviceDate    | DateTime | Service start date                 |
| completionDate | DateTime | Nullable - Service completion date |
| description    | String   | Description of service             |
| status         | String   | "pending", "in-progress", "done"   |

---

## 🌐 API Endpoints

### 📁 Customers

- `POST /api/customers` - Create customer
- `GET /api/customers` - List all customers
- `GET /api/customers/:id` - Get customer by ID
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### 🛵 Bikes

- `POST /api/bikes` - Add a new bike
- `GET /api/bikes` - List all bikes
- `GET /api/bikes/:id` - Get bike by ID

### 🧰 Services

- `POST /api/services` - Create service record
- `GET /api/services` - List all services
- `GET /api/services/:id` - Get service by ID
- `PUT /api/services/:id/complete` - Mark service as complete
- `GET /api/services/status` - Fetch overdue or pending services

---

## ❗ Error Handling Format

```json
{
  "success": false,
  "status": 404,
  "message": "Resource not found",
  "stack": "Shown only in development"
}
```
