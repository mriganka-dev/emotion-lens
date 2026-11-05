# Emotion Lens Frontend

A fast, accessible single-page web application for detecting faces and analyzing facial expressions in photos using deep learning.

## Overview

Emotion Lens allows users to submit photos through drag-and-drop, file browsing, device camera capture, or clipboard paste. The frontend performs pre-flight client-side validation and responsive image resizing, sends the image to the FastAPI backend, and renders an interactive analysis interface:
- Interactive bounding boxes drawn directly over detected faces.
- Synchronized face selection tabs for photos with multiple people.
- Dominant emotion badges with custom icons and descriptive text.
- Calibrated confidence ring indicator.
- Staggered horizontal score bars for all seven recognized emotions: Happy, Sad, Angry, Surprised, Fearful, Disgusted, and Neutral.
- Curated sample photos for instant testing without requiring file uploads.

## Requirements and Environment

- Node.js: v20.0.0 or higher (developed and verified on Node.js v24.16.0).
- npm: v10.0.0 or higher.
- Windows Notes: All commands are compatible with PowerShell and Windows Command Prompt. Path resolution uses forward-slash aliases (`@/*`) configured in Vite and TypeScript.

## Setup and Installation

1. Navigate to the frontend directory:
   ```powershell
   cd frontend
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Configure environment variables:
   Copy the example environment configuration to `.env`:
   ```powershell
   Copy-Item .env.example .env
   ```
   Set `VITE_API_URL` to point to the running backend service (default: `http://localhost:8000`):
   ```env
   VITE_API_URL=http://localhost:8000
   ```

## Available Scripts

- `npm run dev`: Launches the local Vite development server at `http://localhost:5173`.
- `npm run build`: Type-checks with `tsc -b` and compiles an optimized production bundle into `dist/`.
- `npm run preview`: Starts a local server to preview the production build from `dist/`.
- `npm run lint`: Runs ESLint with TypeScript and React Hook rules across all source files.
- `npm test`: Runs all unit and integration test suites via Vitest.
- `npm run format`: Formats all code files with Prettier according to `.prettierrc`.

## Folder Structure

```
frontend/
├── public/                  Static public assets served directly at the root path
│   ├── favicon.svg          Custom vector brand favicon
│   ├── _redirects           SPA route fallback configuration for Netlify
│   └── samples/             Curated sample portrait photographs for quick testing
├── src/                     Main application source directory
│   ├── components/          Reusable UI and feature components
│   │   ├── analyzer/        Analysis components (bounding boxes, confidence ring, score bars, dropzone)
│   │   ├── brand/           Application branding and logo components
│   │   ├── layout/          Site header, footer, shell layout, theme toggle, and error boundary
│   │   └── ui/              Shadcn design primitives (button, skeleton, tabs, sonner)
│   ├── hooks/               Custom React hooks for image analysis, previews, theme, and connectivity
│   ├── lib/                 Utility libraries, API client, emotion definitions, and sample metadata
│   ├── pages/               Top-level route components (HomePage, AboutPage, NotFoundPage)
│   ├── test/                Vitest configuration, matchers setup, and test mocks
│   ├── types/               TypeScript type definitions matching the backend data contracts
│   ├── App.tsx              Root route hierarchy and lazy page loading
│   ├── index.css            Tailwind CSS theme tokens and emotion color variables
│   └── main.tsx             React application entrypoint with providers and lazy motion config
├── vercel.json              SPA rewrite configuration for Vercel deployment
└── vite.config.ts           Vite bundler configuration with Tailwind, alias, and manual chunking
```

## Backend Communication and API Contract

The frontend communicates with the backend via two REST endpoints:

1. `GET /health`
   - Invoked silently on application launch via `useWarmBackend` to eliminate cold starts on managed cloud tiers (e.g., Render, Railway).
   - Validates service health and responsiveness without blocking user interaction.

2. `POST /analyze`
   - Receives an image uploaded as `multipart/form-data` with the form key `file`.
   - Returns a structured JSON response containing:
     - `image_size`: Dimensions `[width, height]` in pixels.
     - `faces`: Array of detected faces, each with a bounding box `[x, y, width, height]` and a normalized probability map of 7 emotions.
   - Error Handling:
     - 400 Bad Request: Returns backend validation message or flags unreadable files.
     - 413 Payload Too Large: Flags images exceeding the maximum 8 MB upload threshold.
     - 415 Unsupported Media Type: Informs the user that only JPEG, PNG, or WebP images are allowed.
     - 500 Internal Server Error: Displays an actionable message explaining server processing issues.
     - Network Offline / Server Unreachable: Displays clear connection troubleshooting guidance with a "Try again" retry action.

## Design, Motion and Accessibility

- Color Tokens: Built on a clean neutral zinc palette with dedicated CSS custom properties for each emotion (`--emotion-happy`, `--emotion-sad`, `--emotion-angry`, `--emotion-surprised`, `--emotion-fearful`, `--emotion-disgusted`, `--emotion-neutral`).
- Typography: Self-hosted Inter font via `@fontsource-variable/inter` for zero external network requests and consistent rendering across operating systems.
- Motion Rules: Built with `motion/react` utilizing `LazyMotion` for minimal initial bundle overhead. Animations are strictly limited to `transform` and `opacity`. Staggered `scaleX` transitions animate score bars. Full support for `prefers-reduced-motion` eliminates animations when requested by system settings.
- Accessibility:
  - Minimum 44 px touch targets on all interactive buttons.
  - Visible focus rings with high-contrast offsets for full keyboard navigation.
  - Color is never the single indicator of emotion: every emotion is accompanied by a Lucide icon and text label.
  - Screen reader support via a polite live region (`aria-live="polite"`) announcing detected faces and confidence levels.
  - Automatic focus shift to results heading upon completing an analysis.

## Deployment Notes

1. Configure `VITE_API_URL` on your hosting platform to match your public backend URL (e.g., `https://api.yourdomain.com`).
2. Add your frontend deployment domain to `ALLOWED_ORIGINS` in the backend `.env` file to prevent CORS rejections.
3. Single Page Application (SPA) Rewrites:
   - Vercel: Pre-configured via `vercel.json` rewrites all route requests to `/index.html`.
   - Netlify / Cloudflare Pages: Pre-configured via `public/_redirects` (`/* /index.html 200`), which builds directly into `dist/_redirects`.

## Adding Sample Photos

To include new sample photos in the test gallery:
1. Place an optimized JPEG, PNG, or WebP file in `frontend/public/samples/`.
2. Open `frontend/src/lib/samples.ts` and append an entry to `SAMPLE_PHOTOS`:
   ```ts
   {
     id: "sample-name",
     title: "Descriptive Title",
     src: "/samples/sample-name.jpg",
     fileName: "sample-name.jpg",
     mimeType: "image/jpeg",
   }
   ```
3. The sample will automatically appear in the sample photo carousel below the upload zone.

## Known Limits

- Lighting and Angle: The accuracy of emotion predictions depends heavily on even lighting and front-facing poses. Extreme angles, backlighting, or partial shadows may decrease confidence.
- Detection Coverage: Small, heavily turned, or obstructed faces (such as faces with glasses, masks, or hands covering the mouth) may not be detected by the Haar cascade or face detector.
- Model Classification: The underlying neural network reflects probabilistic classification trained on benchmark facial expression datasets. Predictions are informational approximations and may not capture complex or ambiguous emotional states.
