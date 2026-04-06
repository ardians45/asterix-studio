# Asterix Studio Portfolio

![Asterix Studio Banner](/public/main-preview.png)

A high-performance, cinematic portfolio website built for **Asterix Studio**, showcasing advanced web interactions, 3D graphics, and modern UI/UX design. This project demonstrates the intersection of technical engineering and creative design.

## 🚀 Overview

This portfolio is designed to be **immersive, fast, and visually striking**. It moves beyond traditional static websites by incorporating WebGL, meaningful animations, and a cinematic user experience.

**Live Demo:** [Visit Asterix Studio](https://asterix-studio.vercel.app) *(Replace with actual URL)*

## ✨ Key Features

- **Cinematic Hero Section**: Full-screen immersive visuals with oversized typography and blend-mode overlays.
- **3D Circular Gallery**: An infinite scroll, WebGL-powered image gallery built with `ogl` and custom shaders.
- **Interactive Projects**:
    - **Cursor-Following Previews**: Project list items trigger floating, physics-based image previews that follow the mouse.
    - **Dynamic Case Studies**: Detailed project pages with metric breakdowns and technical deep dives.
- **Tech-Forward Design**: Glassmorphism, brutalist typography, and smooth page transitions using `framer-motion`.
- **Performance Optimized**: Built on Next.js 15 with server-side rendering and optimized asset delivery.

## 🛠️ Tech Stack

### Core
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

### Creative & 3D
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **WebGL**: [OGL](https://github.com/oframe/ogl) (Lightweight WebGL library)
- **3D Rendering**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) & [Three.js](https://threejs.org/)
- **Shaders**: Custom GLSL fragments for gallery effects (grayscale to color transition).

### Tools
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Linting**: ESLint + Prettier

## 📦 Installation

Clone the repository and install dependencies to run the project locally.

```bash
# Clone the repository
git clone https://github.com/your-username/asterix-studio.git

# Navigate to project directory
cd asterix-studio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the project.

## 📂 Project Structure

```
asterix-studio/
├── app/                  # Next.js App Router root
│   ├── projects/         # Individual project case study pages
│   ├── layout.tsx        # Root layout and metadata
│   └── page.tsx          # Main landing page
├── components/           # Reusable UI components
│   ├── CircularGallery/  # 3D WebGL Gallery implementation
│   ├── Hero.tsx          # Cinematic landing hero
│   ├── Projects.tsx      # Interactive project list
│   └── ...
├── public/               # Static assets (images, icons)
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Based in Indonesia.
**Asterix Studio** — *Building functional & scalable web systems.*
