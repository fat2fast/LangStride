# Local Development Guide

> **Languages**: English | [Tiếng Việt](../../vi/development/local-setup.md)

- **Status**: Active Guide
- **Last Updated**: 2026-10-01
- **Scope**: Local installation, execution modes, development scripts, and troubleshooting
- **Authority**: Development & Operations Guide

This guide provides step-by-step instructions for running, testing, and developing **LangStride Community Edition** on your local machine.

---

## 1. System Requirements & Prerequisites

| Requirement | Supported Version | Notes |
|---|---|---|
| **Operating System** | macOS, Linux (Ubuntu/Debian/Fedora), Windows (WSL2 recommended) | Tested on Linux & WSL2 |
| **Node.js** | `>= 22.0.0` (tested with v22.x & v26.x) | See [.nvmrc](../../../.nvmrc) |
| **pnpm** | `>= 9.0.0` (tested with `12.6.0`) | Recommended package manager |
| **Docker** | Docker Desktop or Docker Engine | **Optional**: Only required for Database Mode |
| **Git** | `>= 2.30.0` | For cloning and version control |

> [!TIP]
> If you use Node Version Manager (`nvm`) or Fast Node Manager (`fnm`), run `nvm use` or `fnm use` in the project root to automatically select the supported Node version.

---

## 2. Choosing Your Local Execution Mode

LangStride is architected to be completely functional **without external cloud dependencies or third-party AI APIs** ([ADR-0006](../adr/ADR-0006-deterministic-validation-before-ai.md), [ADR-0007](../adr/ADR-0007-community-edition-must-not-depend-on-saas.md)). You can run it locally in one of two modes:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   Option A: Zero-Docker / File Mode                    │
│   (Fastest, lightweight, zero Docker needed, reads Git markdown/JSON)  │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  Option B: Full Database Read-Model                    │
│      (Local containerized PostgreSQL / Supabase, read-model sync)      │
└────────────────────────────────────────────────────────────────────────┘
```

### Option A: Zero-Docker / File-Backed Mode (Recommended for Quickstart & Content Authors)
- **Who it is for**: Learners, educational content authors, documentation contributors, or machines without Docker.
- **How it works**: The Next.js web application reads directly from version-controlled Markdown lessons (`content/programming/php/lessons/*.md`) and JSON files (`roadmaps/php.json`, `content/knowledge/concepts.json`).
- **Advantage**: Zero container overhead; changes to Markdown or JSON files appear immediately upon refreshing your browser.

### Option B: Full Database Read-Model Mode (Recommended for Full-Stack Developers)
- **Who it is for**: Developers working on database schemas, migrations, or content synchronization (`@langstride/content`).
- **How it works**: Uses containerized local Supabase (PostgreSQL, Studio UI). Content from Markdown/JSON is synchronized into PostgreSQL tables via `pnpm content:sync`.
- **Advantage**: Replicates the production read-model architecture locally.

---

## 3. Quickstart: Option A (Zero-Docker / File Mode)

Get LangStride running locally without starting any Docker containers:

```bash
# 1. Clone repository
git clone https://github.com/fat2fast/LangStride.git
cd langstride

# 2. Install workspace dependencies
pnpm install

# 3. Create local environment file with File Mode configured
cp .env.example .env.local

# 4. Set USE_DB_READ_MODEL to false
# Edit .env.local in your editor and set:
#   USE_DB_READ_MODEL=false
#
# Or use one of the following command-line shortcuts:
# Linux:
sed -i 's/USE_DB_READ_MODEL=true/USE_DB_READ_MODEL=false/' .env.local
# macOS:
sed -i '' 's/USE_DB_READ_MODEL=true/USE_DB_READ_MODEL=false/' .env.local
# Windows (PowerShell):
(Get-Content .env.local) -replace 'USE_DB_READ_MODEL=true', 'USE_DB_READ_MODEL=false' | Set-Content .env.local

# 5. Start the web application
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Navigate to [http://localhost:3000/php](http://localhost:3000/php) to explore the PHP roadmap and lessons.

---

## 4. Setup: Option B (Full Database Read-Model Mode)

To run the complete stack including local PostgreSQL and Supabase Studio:

### Step 1: Ensure Docker is Running
Verify that Docker daemon is active on your system:
```bash
docker info
```

### Step 2: Configure Environment Variables
```bash
cp .env.example .env.local
```
The default `.env.example` is preconfigured for local Supabase with `USE_DB_READ_MODEL=true`.

### Step 3: Launch Local Supabase Containers
```bash
pnpm local:setup
```
This command starts the local Supabase container cluster and runs all pending database migrations (`supabase/migrations/*.sql`).

### Step 4: Validate and Sync Content
Before starting the web app, validate that all Markdown lessons and JSON files follow schemas, then sync them into PostgreSQL:
```bash
pnpm content:validate
pnpm content:sync
```

### Step 5: Start the Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000).

---

## 5. Local Services & Port Reference

When running in **Full Database Mode**, the following local services are exposed:

| Service | Local URL / Endpoint | Description |
|---|---|---|
| **Next.js Web App** | `http://localhost:3000` | Main application UI & learning interface |
| **Supabase Studio** | `http://127.0.0.1:54323` | Web UI to view & inspect PostgreSQL tables and schemas |
| **PostgreSQL Database** | `postgresql://postgres:postgres@127.0.0.1:54322/postgres` | Direct PostgreSQL connection string |
| **Kong API Gateway** | `http://127.0.0.1:54321` | Local API Gateway for REST / Auth endpoints |
| **Mailpit (Inbucket)** | `http://127.0.0.1:54324` | Local mock email inbox for testing auth emails |

> [!NOTE]
> All credentials used locally (passwords, JWT keys) are non-production safe defaults defined in `.env.example` and `supabase/config.toml`. No cloud API keys or external secrets are required.

---

## 6. Daily Development Workflow & Commands

| Command | Purpose |
|---|---|
| `pnpm dev` | Starts the Next.js development server with hot reloading |
| `pnpm content:validate` | Validates all Markdown frontmatter, roadmap structures, and concepts |
| `pnpm content:sync` | Reads Git content files and updates local PostgreSQL read-model tables |
| `pnpm test` | Runs the workspace Vitest test suite |
| `pnpm lint` | Runs Next.js ESLint checks |
| `pnpm build` | Creates an optimized production build of `@langstride/web` |
| `pnpm local:setup` | Starts containerized Supabase (`supabase start`) and runs migrations |
| `pnpm dlx supabase status` | Displays the status and active URLs of local Supabase containers |
| `pnpm dlx supabase stop` | Stops local Supabase containers to free memory and CPU |
| `pnpm dlx supabase db reset` | Resets local database, reapplying all migrations from scratch |

---

## 7. Content Authoring & Live Preview Workflow

Content authors can preview their changes in real-time:

1. **Locate the content file**:
   - Generic knowledge concepts: [content/knowledge/concepts.json](../../../content/knowledge/concepts.json)
   - PHP roadmap definition: [roadmaps/php.json](../../../roadmaps/php.json)
   - PHP lessons: [content/programming/php/lessons/](../../../content/programming/php/lessons/)

2. **Make your edits**:
   Follow the [Content Contribution Guide](../contribution/content-guide.md) for required frontmatter and mandatory sections:
   - `Why It Matters`
   - `Mental Model`
   - `Code Example`
   - `Common Mistakes`

3. **Preview changes**:
   - In **File Mode (`USE_DB_READ_MODEL=false`)**: Save the file and simply refresh your browser at `http://localhost:3000/php/concepts/<your-slug>`.
   - In **Database Mode (`USE_DB_READ_MODEL=true`)**: Run `pnpm content:sync` in your terminal, then refresh the page.

4. **Verify before committing**:
   ```bash
   pnpm content:validate
   pnpm test
   pnpm lint
   ```

---

## 8. Common Troubleshooting & FAQ

### Q1: `Error: connect ECONNREFUSED 127.0.0.1:54322`
- **Cause**: The application is configured to read from PostgreSQL (`USE_DB_READ_MODEL=true`), but the database container is not running.
- **Solution**:
  - Either start the database: `pnpm local:setup`
  - Or switch to File Mode in `.env.local`: `USE_DB_READ_MODEL=false`

### Q2: `docker: command not found` or Docker daemon connection error
- **Cause**: Docker Desktop / Docker Engine is not installed or running.
- **Solution**: You do not need Docker to use LangStride! Switch to Option A by setting `USE_DB_READ_MODEL=false` in `.env.local` and run `pnpm dev`.

### Q3: Port 3000 is already in use
- **Cause**: Another local process (or a previous development server) is occupying port 3000.
- **Solution**:
  - Find and terminate the process occupying port 3000:
    ```bash
    # Linux / macOS:
    lsof -ti :3000 | xargs kill -9

    # Windows (PowerShell):
    Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force

    # Cross-platform utility (if installed):
    npx kill-port 3000
    ```
  - If you intentionally want to run on a different port, pass `PORT`:
    ```bash
    PORT=3001 pnpm dev
    ```
    *(Note: If running on port 3001, update browser links accordingly to `http://localhost:3001/php`)*.

### Q4: Node.js version warnings or syntax errors
- **Cause**: Your installed Node.js version is older than `v22.0.0`.
- **Solution**: Update Node.js or use a version manager:
  ```bash
  nvm install 22
  nvm use 22
  ```

### Q5: Database out of sync or stale data
- **Cause**: Migrations or content have changed since your last container launch.
- **Solution**:
  ```bash
  pnpm dlx supabase db reset
  pnpm content:sync
  ```

### Q6: How to stop local background containers when done working?
- Run:
  ```bash
  pnpm dlx supabase stop
  ```
