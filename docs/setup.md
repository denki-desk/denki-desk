# 🚀 Project Setup

Welcome to the project! This guide will help you set up the repo, understand the structure, and start contributing quickly.

## 📦 Requirements

- Node.js: `>=20`
- Package Manager: `npm`

## 📂 Repository Structure (Nx Monorepo)

This project is an Nx monorepo. It allows us to manage multiple apps and libraries in one workspace.

   ```psql
   /web-admin         → Admin dashboard (Vite React)
   /libs
     /ui              → Shared Shadcn UI components
     /utils           → Shared utility functions
   /web-admin-e2e     → End-to-end tests (Cypress)
   ```

## 🛠 Installation & Setup

1. Clone the repo
   ```bash
   git clone git@github.com:denki-desk/denki-desk.git
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Environment variables
- Copy `.env.example` to .env 
   ```ini
   VITE_API_URL=http://localhost:3000
   ```
  
## ▶️ Running the App

Web Admin
   ```bash
   npm run nx serve web-admin
   ```

Runs at http://localhost:4200.
