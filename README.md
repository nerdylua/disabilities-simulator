# DisabilityLens

DisabilityLens is a Next.js application that helps teams experience common accessibility barriers first-hand. It recreates visual, motor, and cognitive disabilities so designers, engineers, and product stakeholders can test their interfaces with empathy.

## Features

- **Interactive simulations**  
  - Visual barriers: color vision loss, low vision, brightness/contrast shifts, tunnel vision overlays.  
  - Motor challenges: tremor-driven cursor, precision tasks, delayed interactions.  
  - Cognitive load: dyslexia effects, memory sequences, ambient distractions.
- **Accessibility playbooks** – Practical WCAG guidance, tools, and resources in one spot.
- **Dark/light theming** with theme-aware UI polish.
- **Responsive, motion-rich UI** built with Tailwind CSS v4, shadcn-inspired components, and Framer Motion.

## Getting Started

```bash
npm install
npm run dev
# open http://localhost:3000
```

### Useful scripts

| Script            | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the local development server       |
| `npm run build`   | Create a production build                |
| `npm run start`   | Serve the production build locally       |
| `npm run lint`    | Run linting against the project files    |

## Tech Stack

- Next.js 15 (App Router)
- React with functional components & hooks
- Tailwind CSS v4 + CSS custom effects
- Framer Motion for animations
- TypeScript

## Project Structure

```
app/                # Next.js routes, layout, theming
components/pages/   # Page-level UI + simulations
components/ui/      # Reusable UI primitives
lib/config/         # Header/footer/navigation configuration
public/             # Static assets
```

## Contributing & Feedback

This project is still evolving. If you’d like to report an issue, improve a simulation, or contribute a new accessibility scenario, feel free to open a discussion or PR.