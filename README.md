# Elastic Search AI Platform - Interactive Presentation

An interactive web presentation showcasing the Elastic Search AI Platform, built with React, Tailwind CSS, and Framer Motion.

## Features

- **17+ Interactive Scenes** - Comprehensive, animated storytelling experience
- **Scene Settings Panel** - Customize which scenes to include, reorder via drag-and-drop, and set time allocations
- **Keyboard Navigation** - Use arrow keys, space, or number keys to navigate
- **Smooth Transitions** - Spring-based page transitions with Framer Motion
- **Dark/Light Theme** - Toggle between visual modes
- **Persistent Settings** - Scene configuration saved to localStorage
- **Interactive Visualizations** - Animated diagrams, data flows, and comparison modes

## Scenes

| Scene | Description | Default Duration |
|-------|-------------|------------------|
| Introduction | Hero scene with platform tagline | - |
| Agenda | Overview of presentation topics | - |
| Team Introductions | Contact cards for your Elastic team | 2 min |
| About Elastic | Company overview and capabilities | 5 min |
| Desired Outcomes | Business value and success metrics | 10 min |
| Problem Patterns | Common challenges we solve | 10 min |
| The Data Challenge | 175ZB data explosion visualization | 3 min |
| The Platform | Elastic platform pillars and solutions | 5 min |
| Unified Strategy | Data flow and consolidation strategy | 5 min |
| Cross-Cluster Search | Distributed search at global scale | 3 min |
| Licensing | Simplified licensing model | 3 min |
| Elastic Common Schema | Schema-on-write advantages | 5 min |
| Access Control | RBAC & ABAC security features | 3 min |
| Consolidation | Tool sprawl reduction visualization | 3 min |
| Data Tiering | ILM and searchable snapshots comparison | 3 min |
| Services & Support | Consulting, migration, and support services | 5 min |
| Next Steps | Action items and contact information | 2 min |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Deployment

After building, the `dist` folder contains static files ready for deployment:

```bash
# Build the app
npm run build

# Preview locally (http://localhost:4173)
npm run preview
```

**Deploy to any static hosting:**
- **Netlify/Vercel**: Connect your repo for automatic deployments
- **GitHub Pages**: Copy `dist` contents to your gh-pages branch
- **AWS S3/CloudFront**: Upload `dist` to an S3 bucket
- **Any web server**: Serve the `dist` folder as static files

```bash
# Quick local server alternatives
npx serve dist
python3 -m http.server 8080 -d dist
```

## Navigation

- **Arrow Keys**: `←` Previous, `→` Next
- **Space / Enter**: Next scene
- **Backspace**: Previous scene
- **Number Keys**: Jump directly to scenes 1-9 (0 for scene 10)
- **Nav Menu**: Click scene names in the top navigation bar
- **Arrow Buttons**: Click the chevron buttons on the sides

## Scene Settings

Click the **gear icon** (⚙️) in the bottom-right corner to open Scene Settings:

- **Toggle Scenes**: Click the eye icon to show/hide scenes
- **Reorder**: Drag scenes using the grip handle to change presentation order
- **Set Duration**: Click the time badge to set/edit duration for each scene
- **Total Time**: Header shows total presentation length
- **Reset**: Return to default configuration

All settings persist to localStorage automatically.

## Tech Stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [FontAwesome](https://fontawesome.com/) - Icons

## Customization

- **Colors**: Edit `tailwind.config.js` to modify the Elastic brand colors
- **Content**: Edit scene components in `src/scenes/` to update content
- **Scene Order**: Modify the `scenes` array in `src/App.jsx`
- **Animations**: Modify Framer Motion variants for custom transitions
- **Theme**: Use `ThemeContext` to toggle dark/light modes

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Navigation.jsx
│   ├── ProgressBar.jsx
│   └── SceneSettings.jsx
├── context/          # React context providers
│   └── ThemeContext.jsx
├── scenes/           # Individual presentation scenes
│   ├── HeroScene.jsx
│   ├── AgendaScene.jsx
│   ├── DataTieringScene.jsx
│   ├── ServicesScene.jsx
│   └── ...
└── App.jsx           # Main app with scene configuration
```

---

Built with ❤️ for Elastic
