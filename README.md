# Karan Sathe — Portfolio Website

A premium, framework-free portfolio built with **HTML5, CSS3 and vanilla JavaScript**.

## Structure
```
Portfolio/
├── index.html        Home
├── about.html         About Me
├── skills.html        Skills
├── projects.html       Projects
├── experience.html      Experience
├── resume.html        Resume
├── gallery.html        Gallery
├── github.html        GitHub
├── contact.html        Contact
├── css/
│   ├── style.css       Core styles & design tokens
│   ├── responsive.css    Breakpoints
│   └── animations.css    Motion & reduced-motion rules
├── js/
│   └── script.js       Nav, theme toggle, typing effect, canvas, reveals, lightbox
└── assets/
    ├── images/         profile.png, sketch.png, office.png
    └── resume/         Karan_Sathe_Resume.pdf  ← add your resume file here
```

## To run
Just open `index.html` in a browser — no build step, no dependencies to install
(Google Fonts and Font Awesome load from CDN).

## Add your resume
Drop your resume PDF into `assets/resume/` and name it
`Karan_Sathe_Resume.pdf` (or update the file paths in `resume.html` and
`index.html` if you use a different name).

## Customize
- Colors, fonts and spacing are all defined as CSS variables at the top of
  `css/style.css` — change them once, and the whole site updates.
- Dark mode is default; the toggle switch stores the choice in
  `localStorage` so it's remembered on return visits.
- Project, skill and experience content lives directly in each page's HTML —
  edit freely.
