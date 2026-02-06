# Implementation Plan

## Phase 1: Foundation & Setup
- [ ] **Scaffold Project**: create vite app (React + JavaScript).
- [ ] **Install Dependencies**: `gsap`, `lenis`, `framer-motion`, `tailwindcss`, `postcss`, `autoprefixer`.
- [ ] **Configure Tailwind**: Setup `tailwind.config.js` with custom fonts and colors matching the "cinematic" aesthetic.
- [ ] **Global Styles**: Reset CSS, hide default scrollbar, setup base font rendering (antialiased).
- [ ] **Asset Preparation**: Acquire/Generate the background video sequence (placeholder frames if needed initially).

## Phase 2: Core Mechanics (The "Engine")
- [ ] **Lenis Integration**: Implement the global smooth scroll provider.
- [ ] **GSAP + Lenis Sync**: Ensure ScrollTrigger updates perfectly with Lenis.
- [ ] **CanvasFrameSequence Component**: 
  - Create a component that accepts a folder of images.
  - Implement image preloading logic with a progress state.
  - set up the GSAP ScrollTrigger to drive the frame index.
  - Render to `<canvas>` on every tick.

## Phase 3: Section Development
- [ ] **Hero Section**:
  - Fullscreen sticky container.
  - Text overlay "I design and engineer..." with split-text reveal.
- [ ] **Tech Stack Section**:
  - Implement 3D floating effect for tech logos (can use simple CSS 3D transforms driven by mouse move or scroll).
- [ ] **Experience Section**:
  - Build the customized vertical timeline.
  - Hook drawing SVG lines to scroll position.
- [ ] **Projects Section**:
  - Create the Project Card component.
  - Implement hover-to-play video preview logic.
  - Create the transition layout for detailed views.
- [ ] **About & Contact**:
  - Clean typography-focused layouts.
  - Magnetic button implementation for "Send Message".

## Phase 4: Polish & "Juice"
- [ ] **Loader**: Create a cinematic loading screen (percentage counter + progress bar) that waits for initial assets.
- [ ] **Cursor**: Custom custom cursor (optional, but requested "Cursor follows, expands").
- [ ] **Performance Tuning**: Analyze frame rates, optimize image sizes, ensure responsive behavior on mobile (maybe disable frame sequence on mobile if too heavy).

## Phase 5: Final Review
- [ ] User Walkthrough.
- [ ] Code Cleanup.
