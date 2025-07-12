
# Node.js Backend with Firebase

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Firebase Admin SDK Key

- Download your `firebaseServiceKey.json` from your Firebase Console.
- Place it in the root folder.

### 3. Start Server

```bash
npm start
```

### 4. API Endpoints

| Method | Endpoint       | Description         |
|--------|----------------|---------------------|
| POST   | /signup        | Register new user   |
| POST   | /login         | Login existing user |
| GET    | /users/:id     | Get user by ID      |
| PUT    | /users/:id     | Update user         |
| DELETE | /users/:id     | Delete user         |
