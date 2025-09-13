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

## 🧪 QA Testing & Previews

- The **staging environment** runs off the `develop` branch.
- Every **feature branch** automatically deploys to a **Vercel Preview URL**, which serves as the QA environment for testing new features before merging into `develop`.

### Mocking and Testing
All created mocked data are stored in the local storage (denki_desk_mock_db_seeded) when api mocking is enabled (VITE_APP_ENABLE_API_MOCKING=true).
To reset and request a fresh the mock db just delete the denki_desk_app_mock_db_seeded flag on the local storage and refresh.

### Test Users

For QA, you can log in using seeded test accounts:

| Email                   | Password | Name        |
| ----------------------- | -------- | ----------- |
| ava.johnson@example.com | password | Ava Johnson |
| liam.wilson@example.com | password | Liam Wilson |

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
- [Authentication](/docs/authentication.md)
- Workflows
- QA Testing
- Glossary

## 🤝 Contributing

Please read docs/workflows.md before opening a PR.
We follow a standard branching and review process to keep the codebase consistent.
