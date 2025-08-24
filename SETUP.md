# Portfolio Setup Instructions

## 📥 Installation Guide

### Prerequisites
- Node.js (version 16 or higher)
- Yarn package manager

### Quick Setup

1. **Copy all files** from this folder to your React project directory

2. **Install dependencies:**
"" bash
yarn install
""

3. **Start the development server:**
"" bash
yarn start
""

4. **Open your browser** and visit: http://localhost:3000

## 🛠️ Customization Guide

### 1. Personal Information
Edit `src/components/mock.js` to update:
- Your name and contact details
- Project information
- Skills and experience levels
- Testimonials and achievements

### 2. Projects
Update the `projects` array in `mock.js` to include:
- Your real projects
- Correct URLs and GitHub links
- Project screenshots/images
- Technologies used
- Performance metrics

### 3. Services
Modify the `services` array to reflect:
- Your specific service offerings
- Pricing information (if desired)
- Service descriptions and features

### 4. Styling
The website uses Tailwind CSS. You can customize:
- Colors in `tailwind.config.js`
- Component styles in individual `.jsx` files
- Overall theme in `src/index.css`

### 5. Images
Replace placeholder images with real ones:
- Project screenshots
- Profile picture
- Service illustrations
- Background images

## 🎨 Color Scheme
The current design uses:
- **Primary**: Blue gradients (#3b82f6 to #10b981)
- **Secondary**: Green accents
- **Background**: Dark slate tones
- **Text**: White and light gray

## 📱 Responsive Design
The website is fully responsive and includes:
- Mobile navigation menu
- Flexible grid layouts
- Optimized typography scaling
- Touch-friendly interactions

## 🚀 Deployment Options

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy with one click

### Netlify
1. Drag and drop the `build` folder
2. Or connect GitHub repository

### Traditional Hosting
1. Run `yarn build`
2. Upload `build` folder contents to your server

## 🔧 Advanced Features

### Contact Form Backend
To make the contact form functional, you'll need to:
1. Set up a backend service (Node.js, PHP, etc.)
2. Create an API endpoint for form submissions
3. Update the form submission handler in `Contact.jsx`

### Analytics
Add Google Analytics or other tracking:
1. Install analytics package
2. Add tracking code to `public/index.html`
3. Implement event tracking on key interactions

### SEO Optimization
1. Update meta tags in `public/index.html`
2. Add structured data for better search visibility
3. Optimize images with proper alt tags
4. Implement sitemap.xml

## 📧 Support

If you need help with customization or have questions:
- Email: pranavkumar431@gmail.com
- Phone: +917004961989

## 🎯 Performance Tips

1. **Optimize Images**: Use WebP format and compress images
2. **Lazy Loading**: Implement lazy loading for project images
3. **Code Splitting**: Use React.lazy() for large components
4. **Bundle Analysis**: Run `yarn build` and analyze bundle size

---

**Enjoy your new portfolio website! 🎉**
