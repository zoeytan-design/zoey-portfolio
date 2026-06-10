# Zoey Tan — Dynamic Portfolio Website

A dynamic one-page personal portfolio website created for the AI and Cultural Creativity final project.

## Features

- Dark cinematic visual style
- Intro loading animation
- Hero text reveal with mask animation
- Mouse-follow ambient glow effect
- Scroll-triggered section reveals
- Project image clip-path reveal with slow zoom
- Parallax hero on scroll
- Skill cards stagger animation
- Contact section fade-in
- GitHub Pages compatible
- Fully responsive (desktop / tablet / mobile)
- Reduced-motion support

## File Structure

```
zoey-portfolio/
  index.html
  style.css
  script.js
  README.md
  assets/
    images/
      hero-placeholder.jpg   ← replace with your hero image
      project-01.jpg         ← replace with project 1 image
      project-02.jpg         ← replace with project 2 image
      project-03.jpg         ← replace with project 3 image
```

> If the image files are missing, the website will automatically display styled CSS gradient placeholders.

## How to View Locally

Open `index.html` directly in any modern browser. No server or build tools needed.

## How to Deploy to GitHub Pages

1. Create a new public GitHub repository (e.g. `zoey-portfolio`).
2. Upload all website files, keeping the folder structure intact.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder.
6. Click **Save**.
7. Wait ~1 minute, then open the generated GitHub Pages URL.

Your site will be live at:
```
https://<your-github-username>.github.io/<repository-name>/
```

## Adding Your Images

Place your images inside `assets/images/` using these filenames:

| File | Usage |
|------|-------|
| `hero-placeholder.jpg` | Hero section background |
| `project-01.jpg` | Immersive Narrative Experience |
| `project-02.jpg` | Visual Identity System |
| `project-03.jpg` | 3D Object & Digital Form |

Recommended: landscape images, at least 1600 × 900 px.

## Technologies Used

- HTML5 / CSS3 / Vanilla JavaScript
- [GSAP 3](https://greensock.com/gsap/) + ScrollTrigger (via CDN)
- [Google Fonts](https://fonts.google.com/) — Manrope, Cormorant Garamond

## Contact

Email: cytan0419@gmail.com  
GitHub: https://github.com/zoeytan-design  
LinkedIn: https://www.linkedin.com/in/zoey-t-5549b215a/
