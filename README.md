# ReelCraft — Video Editor Portfolio

A premium portfolio website for a video editor built with Next.js 16, featuring a dark cinematic design with glassmorphism, gradient accents, and smooth animations.

## Features

- **Homepage** — Animated hero, featured projects grid, category showcase, stats
- **Portfolio** — Filterable gallery with category tabs (All, Commercials, Music Videos, Short Films, Corporate, Social Media)
- **Project Detail** — Full MP4 video player, project metadata, tags, prev/next navigation
- **About** — Bio, skills grid, tools showcase
- **Contact** — Validated form with success/error states, submissions saved to JSON

## Getting Started

### Prerequisites

- **Node.js** 18+ ([download](https://nodejs.org))
- **Git** ([download](https://git-scm.com))

### Install & Run

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Adding Your Videos

Place your 16 MP4 video files in the `public/videos/` directory:

```
public/videos/video-1.mp4
public/videos/video-2.mp4
...
public/videos/video-16.mp4
```

Optionally add custom thumbnails in `public/thumbnails/`.

Edit `data/projects.json` to customize titles, descriptions, categories, and file paths.

## Project Structure

```
experiment/
├── data/
│   ├── projects.json        # Video project data (16 entries)
│   └── messages.json        # Contact form submissions
├── public/
│   ├── videos/              # Your MP4 video files go here
│   └── thumbnails/          # Optional custom thumbnails
├── src/
│   ├── app/
│   │   ├── layout.js        # Root layout (Navbar + Footer)
│   │   ├── globals.css      # Design system
│   │   ├── page.js          # Homepage
│   │   ├── portfolio/       # Filterable portfolio gallery
│   │   ├── project/[id]/    # Project detail pages
│   │   ├── about/           # About page
│   │   ├── contact/         # Contact page
│   │   └── api/             # Backend API routes
│   │       ├── projects/    # GET all / GET by ID
│   │       └── contact/     # POST contact form
│   └── components/          # Reusable UI components
└── package.json
```

## API Routes

| Method | Endpoint               | Description                      |
|--------|------------------------|----------------------------------|
| GET    | `/api/projects`        | All projects (optional `?category=`) |
| GET    | `/api/projects/[id]`   | Single project by ID             |
| POST   | `/api/contact`         | Submit contact form              |

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Vanilla CSS** (custom properties, glassmorphism, animations)
- **Google Fonts** (Inter + Outfit)

## Deployment

This project is ready to deploy on:

- **[Vercel](https://vercel.com)** — `npx vercel` (recommended)
- **[Netlify](https://netlify.com)** — connect your Git repository
- **Any Node.js host** — `npm run build && npm start`
