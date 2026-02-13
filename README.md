🛒 E-Commerce Backend API

A scalable Node.js + Express backend powering a full E-Commerce platform — handling authentication, products, cart, payments, and address management with secure middleware protection.

---
 🚀 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB / Mongoose**
* **JWT Authentication**
* **REST API Architecture**

---

📂 Project Structure

```
├── Controllers/
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   ├── Payment.js
│   └── Address.js
│
├── Middlewares/
│   └── IsAuthenticated.js
│
├── Routes/
│   ├── UserRoutes.js
│   ├── ProductRoutes.js
│   ├── CartRoutes.js
│   ├── PaymentRoutes.js
│   └── AddressRoutes.js
│
├── Models/
├── Config/
├── Server.js
└── package.json
```

---

# 🔐 Authentication APIs

| Method | Route       | Description             | Access    |
| ------ | ----------- | ----------------------- | --------- |
| POST   | `/register` | Register user           | Public    |
| POST   | `/login`    | Login user              | Public    |
| GET    | `/all`      | Get all users           | Protected |
| GET    | `/profile`  | Get logged user profile | Protected |

---

# 🛍️ Product APIs

| Method | Route                  | Description        |
| ------ | ---------------------- | ------------------ |
| POST   | `/add`                 | Add product        |
| GET    | `/all`                 | Get all products   |
| GET    | `/product/:product_id` | Get single product |
| PUT    | `/update/:id`          | Update product     |
| DELETE | `/delete/:id`          | Delete product     |

---

# 🛒 Cart APIs

| Method | Route                 | Description       | Access    |
| ------ | --------------------- | ----------------- | --------- |
| POST   | `/add`                | Add to cart       | Protected |
| GET    | `/user/:userId`       | Get user cart     | Protected |
| DELETE | `/remove/:product_id` | Remove product    | Protected |
| DELETE | `/clear/:userId`      | Clear cart        | Protected |
| POST   | `/decreaseQty`        | Decrease quantity | Protected |
| POST   | `/increaseQty`        | Increase quantity | Protected |

---

# 💳 Payment / Orders APIs

| Method | Route             | Description             | Access    |
| ------ | ----------------- | ----------------------- | --------- |
| POST   | `/checkout`       | Create checkout session | Public    |
| POST   | `/verify-payment` | Verify & save payment   | Public    |
| GET    | `/userorder`      | Get user orders         | Protected |

---

# 📍 Address APIs

| Method | Route             | Description        | Access    |
| ------ | ----------------- | ------------------ | --------- |
| POST   | `/add-address`    | Add new address    | Protected |
| GET    | `/user-addresses` | Get user addresses | Protected |

---

# 🧠 Middleware

### `Authenticated`

Protects private routes using JWT.

Checks:

* Token validity
* Logged-in user identity
* Request authorization

---

# ⚙️ Installation

```bash
git clone https://github.com/yourusername/ecommerce-backend.git
cd ecommerce-backend
npm install
```

---

# ▶️ Run Server

```bash
npm run dev
```

or

```bash
node server.js
```

---

# 🌐 Environment Variables

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
PAYMENT_KEY=your_payment_gateway_key
```

---

# 📦 Core Features

* User Authentication (JWT)
* Product Management (CRUD)
* Cart System with Quantity Control
* Secure Checkout Flow
* Payment Verification
* Order History
* Address Management

---

# 🔮 Future Enhancements

* Admin Dashboard APIs
* Coupon Engine
* Inventory Automation
* AI Product Recommendations
* Real-time Order Tracking

---

# 👨‍💻 Author

**Deepraj Ojha**
Full Stack MERN Developer | AI Builder

---

# 📜 License

This project is licensed under the MIT License.

