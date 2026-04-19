# Portfolio - Vibe Coded React Application

A modern, scalable React portfolio application built with **vibe coding** - clean, intuitive, and production-ready. Converted from a single HTML file into a maintainable React component architecture with smooth animations and interactive features.

## 🚀 Features

- **🎨 Vibe Coding Approach**: Clean, readable, and maintainable code structure
- **⚡ Modern React Architecture**: Functional components with hooks, optimized performance
- **📱 Responsive Design**: Mobile-first approach with tablet and desktop support
- **✨ Interactive Elements**: 
  - Custom animated cursor (desktop only)
  - Smooth scroll progress indicator
  - Animated skill bars and stats counters
  - Live demo modal with iframe support
  - Smooth scrolling navigation
  - Staggered reveal animations
- **🎯 Complete Sections**:
  - Hero with animated background and floating tech badges
  - About with animated statistics
  - Skills with progress bars and categories
  - Projects with interactive demo modal
  - Experience timeline with staggered animations
  - Contact form with validation
  - Footer with social links
- **🚀 Performance Optimized**: Intersection observers for lazy animations
- **♿ Accessibility**: Semantic HTML5 and ARIA labels throughout

## 🛠️ Tech Stack

- **React 18** - Modern functional components with hooks
- **Vite** - Lightning-fast development and optimized builds
- **CSS3** - Custom animations, transitions, and modern layout
- **Zero UI Libraries** - Pure CSS for maximum performance and control

## 🎨 Vibe Coding Philosophy

This project follows **vibe coding** principles:

### **🧠 Clean Code**
- Functional components only
- Descriptive variable and function names
- Logical file organization
- Minimal, focused components

### **⚡ Performance First**
- Intersection Observer API for efficient animations
- React.memo for component optimization
- CSS transforms for hardware acceleration
- Lazy loading and code splitting ready

### **🎯 Developer Experience**
- Intuitive component structure
- Easy customization
- Clear separation of concerns
- Comprehensive documentation

### **🎨 Maintainability**
- Modular architecture
- Reusable components
- Consistent styling patterns
- Future-proof code structure

## 📁 Project Structure

```
portfolio-react/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── ScrollProgress.jsx
│   │   ├── Loader.jsx
│   │   ├── DemoModal.jsx
│   │   └── Footer.jsx
│   ├── sections/            # Page sections
│   │   ├── HeroSection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── SkillsSection.jsx
│   │   ├── ProjectsSection.jsx
│   │   ├── ExperienceSection.jsx
│   │   └── ContactSection.jsx
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   # If you have the files locally, navigate to the project directory
   cd portfolio-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically reload when you make changes

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎨 Customization

### Colors

The color scheme is defined in CSS variables in `src/index.css`:

```css
:root {
  --green:    #00ff88;
  --green2:   #00ffcc;
  --green-dim: #00ff8840;
  --black:    #050505;
  --bg:       #0a0a0a;
  --bg2:      #111111;
  --bg3:      #161616;
  --text:     #f0f0f0;
  --muted:    #888;
  --muted2:   #555;
}
```

### Fonts

The app uses Google Fonts:
- **Syne** - Display font for headings
- **Space Mono** - Monospace font for code and labels  
- **DM Sans** - Body font for paragraphs

### Content

Most content is easily customizable:

1. **Personal Info**: Update in `HeroSection.jsx` and `ContactSection.jsx`
2. **Projects**: Modify the `projectsData` array in `ProjectsSection.jsx`
3. **Skills**: Update the `skillsData` array in `SkillsSection.jsx`
4. **Experience**: Modify the `timelineData` array in `ExperienceSection.jsx`
5. **Social Links**: Update the `socialLinks` array in `ContactSection.jsx`

## 📱 Responsive Breakpoints

- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`  
- **Desktop**: `> 1024px`

## ⚡ Performance Features

- **Intersection Observer API**: For efficient scroll-triggered animations
- **React.memo**: Components optimized to prevent unnecessary re-renders
- **CSS Transforms**: Hardware-accelerated animations
- **Lazy Loading**: Sections animate in when scrolled into view
- **Event Cleanup**: Proper cleanup of event listeners and observers

## 🔧 Browser Support

- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements or bug fixes.

---

**Built with ❤️ using React and Vite**
