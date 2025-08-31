# DenkiDesk

Welcome to **DenkiDesk**!  
This repository is an [Nx](https://nx.dev/) monorepo containing our **web-admin** app and shared libraries.

## 🚀 Getting Started

1. Make sure you have **Node.js v20+** and **npm** installed.
2. Clone the repository.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the web admin app:
   ```bash
   nx serve web-admin
   ```

For detailed setup steps, see [docs/setup.md](/docs/setup.md).

## 🧪 QA & Previews

- The **staging environment** runs off the `develop` branch.
- Every **feature branch** automatically deploys to a **Vercel Preview URL**, which serves as the QA environment for testing new features before merging into `develop`.

## 📂 Monorepo Structure

   ```psql
   /web-admin         → Admin dashboard (Vite React)
   /libs
     /ui              → Shared Shadcn UI components
     /utils           → Shared utility functions
   /web-admin-e2e     → End-to-end tests (Cypress)
   ```

More details in docs/architecture.md.

## 📘 Documentation

- Setup Guide
- MVP Scope
- Architecture
- Database Schema
- Workflows
- QA Testing
- Glossary

## 🤝 Contributing

Please read docs/workflows.md before opening a PR.
We follow a standard branching and review process to keep the codebase consistent.
