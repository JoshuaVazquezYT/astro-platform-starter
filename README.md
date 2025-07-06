# AI Video Generator - Astro Starter

A modern AI video generator application based on Astro.js, React, and Tailwind CSS, featuring 100 English voices and 100 video styles with SFW/NSFW modes.

## Astro Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Features

- 🎭 100 English voices (50 SFW + 50 NSFW)
- 🎨 100 video styles (50 SFW + 50 NSFW)
- 🔒 Age verification for NSFW content
- 🚀 Real-time generation progress
- 📱 Responsive design
- 🎯 Advanced filtering system

## Developing Locally

| Prerequisites                                                                |
| :--------------------------------------------------------------------------- |
| [Node.js](https://nodejs.org/) v18.14+.                                      |
| (optional) [nvm](https://github.com/nvm-sh/nvm) for Node version management. |

1. Clone this repository, then run `npm install` in its root directory.

2. Start the development server:

```bash
npm run dev
```

3. Open your browser to [localhost:4321](http://localhost:4321) to see the application.

## Deployment

This application can be deployed to any static hosting platform. See `DEPLOYMENT_ALTERNATIVES.md` for detailed instructions on deploying to various platforms including:

- Vercel (Recommended)
- AWS Amplify
- Firebase Hosting
- GitHub Pages
- Railway
- Render
- Self-hosted options
