# AchiPics — AI Architecture Image Platform

AchiPics is an AI-powered platform for architectural visualization and image creation. It brings together tools for generating and editing images, renovating spaces, creating floor plans, and exploring architectural design workflows.

## Key Features

- AI image generation and image editing
- Architecture and interior renovation tools
- Floor plan tools
- View synchronization
- User authentication and profile pages
- Image history management
- Pricing and payment pages
- Contact and terms pages
- Additional architecture-focused tools

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Google GenAI SDK

## Requirements

- Node.js
- npm

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/idnkendy/AchiPics.git
   cd AchiPics
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the environment variables required by the application. Refer to `.env.example` and provide your own API key where needed. Never commit API keys or other secrets.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Build the application:

   ```bash
   npm run build
   ```

## Project Structure

- `src/components/layout/` — shared application layout and navigation
- `src/components/pages/` — application pages
- `src/components/tools/` — image generation, editing, and architecture tools
- `src/` — application source code

## Development

Before submitting changes, run:

```bash
npm run build
git diff --check
```

## Security

Keep API keys and local environment files private. Commit `.env.example` only when it contains placeholders and no secrets.
