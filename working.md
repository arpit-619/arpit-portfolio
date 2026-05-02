# Project Work Log

This document tracks recent changes, fixes, and ongoing updates to the Resume Website project.

## Recent Updates

### 1. CSS Optimization & Bug Fixes (`style.css`)
- **Resolved Duplicate Classes:** Found and removed conflicting declarations for the `.brand-logo` class. Consolidated the styles to ensure proper responsive sizing and styling.
- **Fixed Gradient Text Shadows:** Addressed an issue where `text-shadow` was being applied to text with `-webkit-text-fill-color: transparent`. This typically causes the shadow to bleed through the transparent text in WebKit browsers. 
- **Solution Implemented:** Switched to using Tailwind's `bg-clip-text` combined with CSS `filter: drop-shadow()` for the `.brand-logo`, which correctly applies the shadow behind the background gradient without breaking the rendering.

### 2. Mobile Menu Navigation Overlay Fix (`index.html` & `style.css`)
- **Resolved Stacking & Blur Issues:** Initially, the mobile backdrop blur overlay only covered the height of the top navigation bar because it was constrained within the `.nav-container` stacking context (which had a `backdrop-filter`).
- **Solution Implemented:** 
  - Moved the `#nav-overlay` outside of the `.nav-container` element in `index.html` and updated its `z-index` so that its `fixed inset-0` applies full screen.
  - Added `relative z-40` to `.nav-content` in `style.css` so that the logo, hamburger menu, and theme toggle stay fully highlighted and interactive **above** the blurred background when the menu drawer opens.
  - Clicking the blurred background correctly triggers the existing event listener to shut the dropdown seamlessly.

### 3. HTML Clean Up & Code Modularization
- **Extracted Inline Scripts:** Moved the inline theme initialization script from the `<head>` of `index.html` into its own `script.js` file to keep the HTML cleaner. It is still loaded synchronously to avoid FOUC (Flash of Unstyled Content) on initial load.
- **Formatted HTML:** Ran `prettier` on `index.html` to automatically align indentation, format long tags, and clean up excessive spacing, resulting in a perfectly styled and easy-to-read DOM structure.
### 4. Deployment Preparations & Build Fixes
- **Vite Build Issue Fixed**: The `script.js` file used for synchronous theme initialization (to prevent FOUC) was triggering a build warning and failing to bundle because it wasn't a module. Moved `script.js` to the `public/` directory so Vite copies it perfectly without modification to `dist/`.
- **Project Card Updates**: Successfully added a 7th project card for the "HR Resume Screening & Offers" automation. Updated grid logic (`xl:grid-cols-4`) to accommodate 4 cards per row on large desktop screens.
- **Asset Review**: Set up the custom `image.png` favicon in the `assets/` directory and verified that it correctly bundles for production.

## Current State
- The Tailwind configuration, custom animations, glassmorphism UI, and Web3Forms integration are all stable and intact.
- The site successfully builds for production (`npm run build`) with zero warnings.
- The project is fully modular, responsive, and ready for live deployment.

## Next Steps
- Deploy the `dist/` output to a static host (Vercel, Netlify, or GitHub Pages).
- Implement the Interactive Terminal feature in the Hero section.

## Project Structure & File Descriptions
- `index.html`: The core HTML markup file that structures the entire single-page portfolio, including the navigation, hero, project grid, and contact sections.
- `style.css`: Contains custom CSS, Tailwind `@apply` directives for glassmorphism UI utilities, advanced animations, and global color variables.
- `main.js`: Houses all the interactive business logic, such as mobile menu toggling, smooth scrolling, dynamic scroll-based animations (Intersection Observer), the typewriter effect, and Web3Forms contact form submission logic.
- `public/script.js`: A specialized, synchronous script that determines the user's preferred theme (light/dark mode) *before* the page fully renders. Placing it in the `public/` directory ensures Vite copies it directly to production to prevent the "Flash of Unstyled Content" (FOUC).
- `tailwind.config.js`: Configuration file for the Tailwind CSS framework, defining the custom color palettes, Google fonts, and responsive behaviors.
- `postcss.config.js`: Configuration for PostCSS, required by Vite to compile the Tailwind utilities correctly.
- `package.json` & `package-lock.json`: Node.js dependency management files containing the Vite build scripts (`dev`, `build`, `preview`) and tracking project libraries.
- `working.md`: The development log (this file) tracking completed features, bug fixes, file structures, and future roadmaps.
- `/assets`: Directory storing static image assets (like `image.png` used for the site favicon) and other media files.
