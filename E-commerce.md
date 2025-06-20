🛒 1. Product & Catalog
Table	Purpose
products	Stores base product info (title, description, brand, etc.)
categories	Category hierarchy (Electronics > Phones > Android)
product_categories	Many-to-many link between products and categories
product_variants	Each combination of attributes (color, size, etc.) with stock/SKU/price
variant_attributes	Attributes like color, size, RAM for each variant
brands	Brand/Manufacturer info
attributes	Define allowed attributes per category (e.g., phones have RAM, shoes have size)
attribute_values	Possible values for each attribute (e.g., Red, Blue, 8GB, 128GB)

👤 2. User & Seller
Table	Purpose
users	Customers, admins, delivery staff, etc.
user_profiles	Additional info: address, avatar, preferences
sellers	Seller accounts (can be linked to users)
seller_products	Tracks which seller sells which products and under what pricing/stock

💳 3. Orders & Payments
Table	Purpose
orders	Main order info (user, status, total, etc.)
order_items	Line items per variant in an order
payments	Payment method and status
shipping_addresses	Shipping address for the order
invoices	Generated for download
refunds	Refunds issued on orders/items

🚚 4. Shipping & Logistics
Table	Purpose
shipping_methods	Available shipping methods (standard, express, etc.)
order_shipments	Tracks shipping status, tracking number
delivery_partners	Courier services used (DHL, FedEx, etc.)
warehouse_stocks	Track stock by warehouse/location (optional at scale)

🌟 5. Marketing & Reviews
Table	Purpose
reviews	Product reviews with rating/comment/user
questions	Q&A section from users
wishlists	Products saved by users
carts	User shopping cart
coupons	Discounts and codes
product_offers	Flash deals, sale prices, campaigns

📊 6. Inventory & Stock
Table	Purpose
stocks	Stock quantity per product variant (by seller or warehouse)
stock_movements	Log of stock changes (add/remove/transfer)
stock_alerts	Threshold warnings for low stock

⚙️ 7. Platform & Settings
Table	Purpose
site_settings	Global platform settings
notifications	In-app notifications for users
logs	Logs for actions, errors, payments, etc.
permissions	User role/permission management

💬 8. Support & Communication
Table	Purpose
support_tickets	Customer support issues
messages	Message threads between users and support
email_logs	Sent email records (reset links, order confirmations, etc.)

✅ Optional (but helpful at scale)
Table	Purpose
product_images	Multiple images per product/variant
product_tags	Search tags for better discovery
audit_logs	Track admin/seller changes
analytics	Page views, product engagement
recommendations	AI-based or rule-based product suggestions

🧠 Summary of Critical Relationships:
products → many product_variants

product_variants → many variant_attributes

products → many categories (via product_categories)

products → many images

orders → many order_items (each pointing to a variant)

users → many orders, reviews, wishlists

sellers → many seller_products

payments → one order



Here's a complete and scalable database schema suitable for an Amazon-like e-commerce system. It supports:

✅ Unlimited categories with subcategories

✅ Product attributes (color, size, RAM, etc.)

✅ Product variants (each with its own SKU, price, stock, etc.)

✅ Multiple images per product

✅ Orders, order items, payments

✅ Inventory and warehouse tracking

✅ Reviews and wishlists

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    parent_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE attributes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) CHECK (type IN ('text', 'number', 'color', 'select')),
    unit VARCHAR(50) DEFAULT NULL
);

CREATE TABLE attribute_values (
    id SERIAL PRIMARY KEY,
    attribute_id INTEGER REFERENCES attributes(id) ON DELETE CASCADE,
    value VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    brand VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_categories (
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, category_id)
);

CREATE TABLE product_attributes (
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    attribute_id INTEGER REFERENCES attributes(id) ON DELETE CASCADE,
    is_variant BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (product_id, attribute_id)
);

CREATE TABLE product_variants (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    sku VARCHAR(100) UNIQUE NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image TEXT,
    weight DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE variant_attribute_values (
    variant_id INTEGER REFERENCES product_variants(id) ON DELETE CASCADE,
    attribute_id INTEGER REFERENCES attributes(id),
    value VARCHAR(255),
    PRIMARY KEY (variant_id, attribute_id)
);

CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_main BOOLEAN DEFAULT FALSE
);


-- =============================
-- 🛒 ORDERS & PAYMENTS
-- =============================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shipping_addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    address_line TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    address_id INTEGER REFERENCES shipping_addresses(id),
    status VARCHAR(50) DEFAULT 'pending',
    total DECIMAL(10,2),
    placed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    variant_id INTEGER REFERENCES product_variants(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    method VARCHAR(50),
    status VARCHAR(50),
    transaction_id VARCHAR(100),
    paid_at TIMESTAMP
);


-- =============================
-- 📦 INVENTORY MANAGEMENT
-- =============================
CREATE TABLE warehouses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    location VARCHAR(255)
);

CREATE TABLE stock_levels (
    id SERIAL PRIMARY KEY,
    variant_id INTEGER REFERENCES product_variants(id) ON DELETE CASCADE,
    warehouse_id INTEGER REFERENCES warehouses(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL
);

CREATE TABLE stock_movements (
    id SERIAL PRIMARY KEY,
    variant_id INTEGER REFERENCES product_variants(id),
    warehouse_id INTEGER REFERENCES warehouses(id),
    quantity_change INTEGER,
    reason VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =============================
-- ⭐️ USER REVIEWS & WISHLISTS
-- =============================
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wishlists (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, product_id)
);

✅ 1. Category-Driven Product Types
When a vendor selects a category or subcategory (e.g. Electronics > Mobile Phones or Clothing > Men's Shirts), the system determines:

What attributes are required (e.g., Color, Size, RAM, Storage, Material)

What variants are allowed (e.g., different sizes or colors)

What validations apply

👉 This is powered by dynamic schemas stored in the database.

✅ 2. Backend Design: Dynamic Attribute Modeling
Main Tables:
categories — Defines hierarchical structure (e.g., Electronics > Mobile)

attributes — Defines possible attributes (e.g., Color, Size, RAM)

category_attributes — Maps which attributes are needed for which category

attribute_values — Allowed values per attribute (e.g., Size = S, M, L)

On the vendor form:
Vendor selects category

Frontend fetches required attributes from backend (GET /category/:id/attributes)

Dynamic form is built based on these

✅ 3. Dynamic Product Upload UI
The frontend form is not separate per product type, but it's dynamically built based on selected category.

For example:

Category: Clothing > T-Shirts
Attribute	Type
Color	Select
Size	Select
Material	Text

Category: Electronics > Mobile Phones
Attribute	Type
RAM	Select
Storage	Select
OS	Text

This avoids the need for dozens of separate page designs.

✅ 4. Variants Handled Dynamically
After entering the attributes, the vendor can define combinations (variants):

Example for T-shirt:

Color: Red, Blue

Size: M, L

System auto-generates 4 variants:

Red - M

Red - L

Blue - M

Blue - L

Each variant can have:

Price

SKU

Stock

Barcode



✅ How Amazon (and similar platforms) handle this:
They allow optional attributes and variants — so a vendor can:

List a single version of a product (e.g. "S25 Ultra, Black, 12/256")

Or offer variant options (e.g. multiple colors, multiple RAM/storage combos)

✅ How to support that in your system:
1. Define attributes as optional or required per category
In your category_attributes table (or equivalent), include a flag:

sql
Copy
Edit
category_id | attribute_id | required | is_variant
------------|--------------|----------|------------
Mobile      | Color        | false    | true
Mobile      | RAM          | true     | true
Mobile      | OS           | true     | false
required: Controls whether the vendor must enter it

is_variant: Controls whether this attribute generates product variations (SKUs)

So:

✅ Vendor must select RAM and OS

✅ Vendor may optionally define multiple colors

2. Frontend behavior
After selecting a category, load all attributes.

For each attribute:

If required → show as a required field

If marked is_variant → allow vendor to define multiple values (e.g., multiple colors)

If vendor enters only one value (e.g. just Black) → system creates one SKU

If multiple variant attributes are filled (e.g. 2 colors × 2 RAMs) → system creates 4 SKUs

✅ Real-world vendor options
Vendor	Variants Defined	SKU Count
Vendor A	Black only, 12/256	1
Vendor B	Black, Blue + 12/256, 16/512	4
Vendor C	No variant (just "S25 Ultra")	1

Your system should support all of them with the same flexible schema.

Summary
Feature	Behavior
Optional attributes	✅ Supported by marking required = false
Optional variants	✅ Controlled by vendor input
Dynamic SKU generation	✅ Based on attribute combinations

If you want, I can help you sketch the schema or write a dynamic form structure to support this.

🧩 Scope of the "Main Features"
1. Core Features (must-have)
Feature	Est. Time (days)
✅ User authentication & roles (admin, vendor, customer)	2–3
✅ Product categories & subcategories	2
✅ Product creation with dynamic attributes	4–6
✅ Product variants (e.g. color, RAM, etc.)	3–5
✅ Product listing with filters & search	4
✅ Product detail page (with variant selection)	2–3
✅ Cart & wishlist	3–4
✅ Checkout with address & order summary	3
✅ Order placement & history	2–3
✅ Admin panel (category/attribute/product management)	5–7
✅ Vendor product upload & management	4–6
✅ Stock, pricing, discount per variant	3
✅ File/image upload (e.g. product gallery)	2

Subtotal: ~40–55 working days

2. Optional/Side Features (skip or postpone)
Feature	Skip?
🚫 Reviews & ratings	Optional
🚫 Coupons / campaigns	Optional
🚫 Analytics / reports	Optional
🚫 Recommendations / AI search	Optional
🚫 Real-time stock sync with suppliers	Optional
🚫 Third-party integrations (shipping, SMS, etc.)	Optional

⏱ Time Estimate (based on workload)
Team / Person	Estimate
Solo developer (full-time)	8–12 weeks
Solo developer (part-time)	3–5 months
Small team (2–3 devs)	4–6 weeks
Expert w/ reusable templates	3–4 weeks

🛠️ Stack Advantage
Tech	Benefit
Next.js	SEO-ready, SSR for product pages
NestJS	Great for scalable APIs, built-in auth, guards, services
PostgreSQL	Relational + supports JSONB for dynamic attributes
Prisma or TypeORM	Easy schema handling for relational DB

🧠 Suggestions
Use dynamic fields for attributes/variants (stored as JSONB)

Use SKU table to store each variant stock/price

Build an admin dashboard first (this gives full control to seed, manage, and test)

For UI, use shadcn/ui or tailwind for faster layout development

If you'd like, I can help you split this into weekly development milestones or give you a template/boilerplate repo plan to jumpstart the project.