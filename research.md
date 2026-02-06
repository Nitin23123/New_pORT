# Technical Research & Architecture

## Core Technologies
- **Framework**: React 18+ (Vite)
- **Language**: JSX / JavaScript (per strict user request)
- **Styling**: Tailwind CSS (Utility-first, rapid UI dev)
- **Animation Orchestration**: GSAP (GreenSock Animation Platform)
  - `ScrollTrigger`: For all scroll-driven interactions.
  - `SplitText` (if available) or manual splitting: For text reveals.
- **Smooth Scrolling**: Lenis
  - Chosen for its lightweight nature and compatibility with GSAP ScrollTrigger.
- **Micro-Interactions**: Framer Motion
  - For component-level animations (hover, tap, enter/exit) where physics-based springs are desired.
- **Canvas/Video**: HTML5 Canvas + requestAnimationFrame
  - For the scroll-synced video effect, rendering frames to canvas is more performant than controlling `<video>` `currentTime` directly.

## Implementation Strategies

### 1. Scroll-Synced Video (The "Hero" Mechanic)
**Approach: Frame Sequence on Canvas**
- **Why**: Controlling a video element's `currentTime` via scroll is often jerky due to keyframe encoding interpolation.
- **Solution**: 
  - Extract video frames as a sequence of JPG/WebP images.
  - Preload images (vital for smoothness).
  - Use a generic object `{ frame: 0 }`.
  - GSAP `timeline` tweens the `frame` property based on scroll position.
  - On `update`, draw the corresponding image to a fixed-position `<canvas>`.
- **References**: Apple AirPods Pro page, GSAP "Airpods" demos.

### 2. Smooth Scrolling
**Library: Lenis**
- **Setup**: Wrap the application in a generic scroll container (or body).
- **Integration**: Must synchronize with GSAP ScrollTrigger.
  ```javascript
  const lenis = new Lenis()
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
  })
  ```

### 3. Exaggerated Interactions (The "Feel")
- **Magnetic Buttons**: Calculate mouse distance from button center and translate the button slightly towards the cursor using Framer Motion springs.
- **Text Reveals**: Split text into characters/words. Stagger their opacity and y-transform as they enter the viewport using `ScrollTrigger`.
- **Parallax**: Use `data-speed` attributes on elements and a global GSAP loop to apply `y` transforms based on scroll speed or position.

### 4. Component Structure
- `SceneContainer`: Handles the sticky canvas and global scroll logic.
- `Section`: A generic wrapper that passes scroll progress to its children.
- `Overlay`: The HTML content (text, buttons) that scrolls over the canvas.

## Performance Considerations
- **Asset Loading**: A loading screen is mandatory to wait for the frame sequence to buffer.
- **Image Optimization**: Frames must be highly compressed WebP.
- **Layer Management**: Use `will-change: transform` sparingly.
- **Debouncing**: Resize observers must be efficient.
