# Eventok

Eventok is a modern event management web app built with Next.js, designed to simplify event organization, ticketing, and scheduling.

## 🚀 Tech Stack

- **Next.js** – Powerful React framework for server-side rendering and static generation
- **Clerk** – Authentication & user management
- **React Hook Form + Zod** – Form validation and handling
- **shadcn/ui** – Beautiful and customizable UI components
- **Stripe** – Secure payment processing
- **Supabase + Supabase Storage** – Database and file storage
- **Prisma** – Type-safe database ORM
- **Schedule-X** – Advanced scheduling component
- **React Query** – Data fetching with infinite loading & caching
- **Axios** – API requests
- **Framer Motion** – Stunning animations
- **qrcode.react** – QR code generation for event tickets

## 🎯 Features

- 🔐 **Secure Authentication** with Clerk
- 📆 **Event Scheduling** powered by Schedule-X
- 🎟️ **Ticketing System** with QR code generation
- 💳 **Stripe Integration** for seamless payments
- 📊 **Real-time Data Handling** with React Query & Supabase
- 📸 **Media Upload** using Supabase Storage
- 🚀 **Optimized Performance** with Next.js & Prisma
- 🎨 **Beautiful UI** with shadcn/ui & Framer Motion animations

Eventok is a modern event management web app built with Next.js, designed to simplify event organization, ticketing, and scheduling.

## 🚀 Tech Stack

- **Next.js** – Powerful React framework for server-side rendering and static generation
- **Clerk** – Authentication & user management
- **React Hook Form + Zod** – Form validation and handling
- **shadcn/ui** – Beautiful and customizable UI components
- **Stripe** – Secure payment processing
- **Supabase + Supabase Storage** – Database and file storage
- **Prisma** – Type-safe database ORM
- **Schedule-X** – Advanced scheduling component
- **React Query** – Data fetching with infinite loading & caching
- **Axios** – API requests
- **Framer Motion** – Stunning animations
- **qrcode.react** – QR code generation for event tickets

## 🎯 Features

- 🔐 **Secure Authentication** with Clerk
- 📆 **Event Scheduling** powered by Schedule-X
- 🎟️ **Ticketing System** with QR code generation
- 💳 **Stripe Integration** for seamless payments
- 📊 **Real-time Data Handling** with React Query & Supabase
- 📸 **Media Upload** using Supabase Storage
- 🚀 **Optimized Performance** with Next.js & Prisma
- 🎨 **Beautiful UI** with shadcn/ui & Framer Motion animations

## 🏗️ Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/Orazhn/eventok.git
   cd eventok
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Set up environment variables in `.env`:

   ```sh
   # Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # Database Connection
   DATABASE_URL=your_database_url
   DIRECT_URL=your_direct_database_url

   # Database Storage
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url

   # Webhooks
   DOMAIN_URL=your_webapp_url # Update when deploying
   SIGNING_SECRET=your_signing_secret
   <<<<<<< HEAD

   # Payment System
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   NEXT_PUBLIC_SERVER_URL=your_server_url # Update when deploying

   # Caching
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
   ```

4. Run the development server:
   ```sh
   npm run dev
   ```

# Payment System

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_SERVER_URL=your_server_url # Update when deploying

# Caching

UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

````
4. Run the development server:
```sh
npm run dev
````
