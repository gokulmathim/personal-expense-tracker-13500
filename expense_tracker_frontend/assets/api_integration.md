# Expense Tracker Frontend API Integration

## Backend API Endpoints (suggested)
- **Base URL**: `/api` (update this dynamically for deployment/proxy)
- **Expenses**
  - `GET   /api/expenses` – list expenses
  - `POST  /api/expenses` – add expense
  - `PUT   /api/expenses/:id` – update expense
  - `DELETE /api/expenses/:id` – delete expense
- **Categories**
  - `GET   /api/categories` – list categories
  - `POST  /api/categories` – add category
  - `DELETE /api/categories/:name` – remove category
- **User/Auth**
  - `POST   /api/login` – login, returns {user, token}
  - `POST   /api/register` – register user, returns {user, token}
  - `POST   /api/logout` – logout
  - `GET    /api/me` – get user profile
  - `PATCH  /api/me` – update profile

## API Usage Notes
* All relevant composables (`useExpenses.ts`, `useAuth.ts`, etc.) contain placeholders for actual fetch() calls.
* Replace all `API_BASE` variable usages with your deployed backend base URL (use runtime config/env for production).

## Auth
* When user logs in/registers, store the user and token using the Pinia store. This will persist auth for the session.
* Add the `Authorization: Bearer TOKEN` header to requests requiring authentication.

---
**All API integration points for backend are marked within composables and ready for real backend wiring.**
