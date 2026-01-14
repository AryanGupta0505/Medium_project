# 📝 Medium Project — Full-Stack Blogging Platform

A modern, full-stack blogging website inspired by **Medium**, built using **React**, **Cloudflare Workers**, **TypeScript**, and **PostgreSQL**.  
The project focuses on scalability, type safety, and clean architecture with shared validation and types across frontend and backend.

---

## 🚀 Features

- 🔐 **Authentication & Authorization**
  - Secure user authentication using JWT
- ✍️ **Blog Management**
  - Create, read, update, and delete blog posts
- 👤 **User Profiles**
  - View author details and their published blogs
- 🧠 **Type Safety Across Stack**
  - Shared validation and type inference using Zod
- ⚡ **Serverless Backend**
  - Fast and scalable APIs powered by Cloudflare Workers
- 🗄️ **Database Integration**
  - PostgreSQL with Prisma ORM and connection pooling
- 📱 **Responsive UI**
  - Clean and modern interface built with React

---

## 🛠️ Tech Stack

### Frontend
- **React** — Component-based UI development
- **TypeScript** — Strong typing and better maintainability
- **Zod** — Schema validation with type inference from backend

### Backend
- **Cloudflare Workers** — Serverless backend environment
- **Hono** — Lightweight and fast web framework for Workers
- **TypeScript** — End-to-end type safety
- **JWT (JSON Web Tokens)** — Authentication and authorization

### Database & ORM
- **PostgreSQL** — Relational database for data persistence
- **Prisma ORM** — Type-safe database access with connection pooling

---

## 📁 Project Structure

```text
Medium_project/
├── backend/        # Cloudflare Workers backend (APIs, auth, DB logic)
├── frontend/       # React frontend application
├── common/         # Shared Zod schemas and TypeScript types
├── .gitignore
└── README.md
