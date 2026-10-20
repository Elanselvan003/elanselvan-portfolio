# Elanselvan S — Professional Front-End Developer Portfolio

[![Angular 21](https://img.shields.io/badge/Angular-21-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

A high-performance, modern, and accessible personal portfolio website built with **Angular 21**, standalone component architecture, reactive signals, and Tailwind CSS.

---

## 🌟 Features

- **Angular 21 Standalone Architecture**: Engineered using modern Angular standalone components, signals, and control flow syntax (`@if`, `@for`).
- **Dynamic Dark / Light Mode**: Instant, flicker-free theme switching with system preference detection and `localStorage` persistence.
- **Fast & Responsive**: Mobile-first responsive layout optimized for all screen sizes from mobile phones to ultra-wide displays.
- **Performance Optimized**: Sub-second initial paint, zero external blocking font/icon scripts, and inline critical CSS.
- **Interactive Showcase**: Showcases enterprise projects (ConnectSecure, BizFlow SaaS), skills matrix, career timeline, and key engineering achievements.
- **Direct Contact Channel**: Integrated contact form with instant validation and direct delivery to `elanselvan1997@gmail.com`.
- **SEO & Social Sharing Ready**: Includes structured meta tags, OpenGraph cards, Twitter cards, `robots.txt`, and XML sitemap.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Angular 21** | Frontend framework (Standalone components, Signals, Typed forms) |
| **TypeScript** | Strongly typed application logic |
| **Tailwind CSS** | Utility-first styling with custom design tokens |
| **RxJS** | Reactive event streams and scroll spy observation |
| **FormSubmit API** | Serverless email forwarding for the contact section |
| **Netlify / Vercel** | Edge global CDN hosting and automated CI/CD deployment |

---

## 🚀 Quick Start

### Prerequisites
- Node.js `v20+` or `v22+`
- npm `v10+`

### 1. Clone the repository
```bash
git clone https://github.com/Elanselvan003/elanselvan-portfolio.git
cd elanselvan-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start local development server
```bash
npm run dev
# or
npm start
```
Navigate to `http://localhost:4200/` in your browser.

### 4. Build for production
```bash
npm run build
```
The optimized production bundle is generated in `dist/Elanselvan__portfolio/browser/`.

---

## 🌐 Hosting & Custom Domain Setup

This project is pre-configured for automated deployment to **Netlify**, **Vercel**, and **Cloudflare Pages**.

### Deploying to Netlify (Recommended)
1. Go to [Netlify](https://app.netlify.com/) and click **"Add new site" > "Import an existing project"**.
2. Connect your GitHub account and select **`Elanselvan003/elanselvan-portfolio`**.
3. Build settings will be detected automatically from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist/Elanselvan__portfolio/browser`
4. Click **Deploy Site**.

### Connecting a Custom `.com` Domain (e.g., `elanselvan.com`)
1. In your Netlify dashboard, navigate to **Site configuration > Domain management**.
2. Click **Add custom domain** and enter your domain name (e.g. `elanselvan.com`).
3. Update your domain registrar's DNS settings (GoDaddy, Namecheap, Cloudflare, etc.):
   - **Apex domain (`@` / `elanselvan.com`):** Add an `A` record pointing to `75.2.60.5`
   - **Subdomain (`www`):** Add a `CNAME` record pointing to your Netlify site URL (e.g., `elanselvan.netlify.app`)
4. Netlify will automatically provision a free Let's Encrypt SSL/TLS certificate within a few minutes.

---

## 👤 Author

**Elanselvan S**
- **Email**: [elanselvan1997@gmail.com](mailto:elanselvan1997@gmail.com)
- **LinkedIn**: [linkedin.com/in/elanselvan-s-6b869313a](https://www.linkedin.com/in/elanselvan-s-6b869313a/)
- **GitHub**: [@Elanselvan003](https://github.com/Elanselvan003)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
