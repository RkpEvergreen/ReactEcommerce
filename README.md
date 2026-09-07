# React + Node + MySQL ecommerce app

This project runs locally with React/Vite, an Express API, and MySQL supplied by XAMPP.

## Run with XAMPP

1. Start Apache and MySQL in XAMPP.
2. Open `http://localhost/phpmyadmin`.
3. Import `backend/database/schema.sql`. It creates the `ecommerce_db` database and ecommerce tables.
4. Check `backend/.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ecommerce_db
DB_PORT=3306
CLIENT_ORIGIN=http://localhost:5173
```

If your XAMPP MySQL root account has a password, put it in `DB_PASSWORD`.

5. Start the API:

```powershell
cd backend
npm install
npm run dev
```

The API runs at `http://localhost:5000`. Test it at `http://localhost:5000/api/test-db`.

6. In a second terminal, start React:

```powershell
npm install
npm run dev
```

Open `http://localhost:5173/products`. The page loads active products from
`GET http://localhost:5000/api/products`.

## Add a test product

Run this in phpMyAdmin while using the `ecommerce_db` database:

```sql
INSERT INTO categories (name, slug) VALUES ('Demo', 'demo');

INSERT INTO products
  (category_id, name, slug, description, price, stock_quantity)
VALUES
  (1, 'Demo product', 'demo-product', 'A local development product', 499.00, 10);
```
