# Jerry Concept Hub - Website

A modern, responsive website for Jerry Concept Hub - a technology training center offering comprehensive computer skills courses, internet café services, and digital solutions.

## 🌟 Features

### Landing Page (index.html)
- **Responsive Design** - Works on all devices (desktop, tablet, mobile)
- **Interactive Navigation** - Smooth scrolling and mobile hamburger menu
- **Hero Section** - Compelling call-to-action with floating course cards
- **Services Showcase** - Internet café, printing, and document processing services
- **Course Preview** - Popular courses with pricing and descriptions
- **Testimonials** - Customer success stories
- **Scroll Animations** - Elements animate into view as users scroll

### Enrollment Page (enrollment.html)
- **Multi-Step Form** - 4-step enrollment process with progress tracking
- **Course Pre-Selection** - Direct navigation from course cards on homepage
- **Form Validation** - Real-time input validation with error messages
- **Schedule Selection** - Visual time slot picker with icons
- **Order Summary** - Complete review before submission
- **Success Page** - Professional completion flow with next steps

### JavaScript Functionality (script.js)
- **Page Detection** - Automatically initializes appropriate features for each page
- **Form Management** - Handles all form interactions and validation
- **Data Persistence** - Maintains form data throughout the enrollment process
- **Error Handling** - Comprehensive validation with user-friendly messages
- **Mobile Optimization** - Touch-friendly interactions and responsive behavior

## 🏗️ Project Structure

```
jerry-concept-hub/
├── index.html              # Main landing page
├── enrollment.html          # Course enrollment form
├── script.js               # JavaScript functionality for both pages
├── style.css               # Main stylesheet (you need to create)
├── form-specific.css       # Enrollment form styles (you need to create)
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime Text, etc.)
- Basic knowledge of HTML, CSS, and JavaScript

### Installation

1. **Download/Clone the project**
   ```bash
   git clone [your-repository-url]
   cd jerry-concept-hub
   ```

2. **Create the CSS files**
   - Create `style.css` for main styles
   - Create `form-specific.css` for form-specific styles
   - See [CSS Requirements](#css-requirements) below

3. **Open the website**
   - Open `index.html` in your web browser
   - Or use a local development server

### CSS Requirements

You'll need to create two CSS files:

#### style.css (Main Stylesheet)
Should include styles for:
- Navigation bar and mobile menu
- Hero section and floating cards
- Services and courses sections
- Testimonials and footer
- Responsive breakpoints
- Button styles and hover effects

#### form-specific.css (Form Styles)
Should include styles for:
- Multi-step form layout
- Progress bar and step indicators
- Form inputs and validation states
- Course and schedule selection cards
- Summary sections and success page
- Loading states and animations

## 📱 Responsive Design

The website is designed to work on:
- **Desktop** (1200px and above)
- **Tablet** (768px - 1199px)
- **Mobile** (below 768px)

Key responsive features:
- Mobile hamburger menu
- Touch-friendly form controls
- Optimized typography scaling
- Flexible grid layouts

## 🎯 Course Offerings

The website showcases these courses:
- **Basic Computer Skills** (₦15,000 - 4 weeks)
- **Microsoft Office Suite** (₦25,000 - 6 weeks)
- **Graphic Design** (₦35,000 - 8 weeks)
- **Web Development** (₦45,000 - 12 weeks)
- **Digital Marketing** (₦30,000 - 6 weeks)
- **Data Analysis** (₦40,000 - 10 weeks)

## ⚙️ Technical Features

### Form Functionality
- **Step Navigation** - Users can move between form steps
- **Data Validation** - Real-time validation with error messages
- **Progress Tracking** - Visual progress bar shows completion status
- **Course Pre-selection** - URL parameters allow direct course selection
- **Auto-formatting** - Phone number formatting and date validation

### JavaScript Architecture
```javascript
// Main functions available globally
nextStep()          // Navigate to next form step
prevStep()          // Navigate to previous form step
submitForm()        // Submit the enrollment form
showError()         // Display validation errors
hideError()         // Hide validation errors
```

### Data Structure
```javascript
// Form data is stored in global formData object
formData = {
    personalInfo: {
        name: string,
        email: string,
        phone: string,
        experience: string
    },
    courseSelection: {
        course: string
    },
    schedule: {
        timeSlot: string,
        startDate: string,
        notes: string
    },
    currentStep: number
}
```

## 🔧 Customization

### Adding New Courses
1. Update the `courseData` object in `script.js`
2. Add new course card in `enrollment.html`
3. Update course preview on `index.html`

### Modifying Styles
- Edit `style.css` for general styling
- Edit `form-specific.css` for form-specific styling
- Use CSS custom properties for consistent theming

### Adding New Features
- JavaScript functions are modular and easy to extend
- Event listeners are properly namespaced
- Form validation can be easily customized

## 🌐 Browser Support

- **Chrome** 60+
- **Firefox** 55+
- **Safari** 11+
- **Edge** 16+

Features used:
- ES6+ JavaScript
- CSS Grid and Flexbox
- Intersection Observer API
- Modern form validation

## 📊 Performance

Optimization features:
- **Efficient Scroll Handling** - Uses requestAnimationFrame
- **Lazy Loading** - Elements animate only when visible
- **Minimal Dependencies** - No external libraries required
- **Optimized Images** - Uses emoji icons for lightweight graphics

## 🔒 Form Security

Current implementation:
- Client-side validation only
- Form data logged to console (for development)
- Ready for server-side integration

For production:
- Implement server-side validation
- Add CSRF protection
- Sanitize all inputs
- Use HTTPS for form submission

## 🚀 Deployment

### Local Development
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

### Production Deployment
- Upload files to web hosting service
- Ensure proper file permissions
- Configure server to serve static files
- Set up SSL certificate for HTTPS

## 📝 To-Do List

### Immediate
- [ ] Create `style.css` file
- [ ] Create `form-specific.css` file
- [ ] Test on multiple devices
- [ ] Add favicon

### Future Enhancements
- [ ] Add server-side form processing
- [ ] Implement email notifications
- [ ] Add online payment integration
- [ ] Create admin dashboard
- [ ] Add course scheduling system
- [ ] Implement user accounts
- [ ] Add live chat support

## 🐛 Troubleshooting

### Common Issues

**Enrollment page not working:**
- Check browser console for JavaScript errors
- Ensure `script.js` is properly linked
- Verify `form-page` class is on body element

**Form not submitting:**
- Check all required fields are filled
- Ensure terms checkbox is checked
- Verify JavaScript functions are in global scope

**Styles not loading:**
- Check CSS file paths are correct
- Ensure CSS files exist
- Verify proper HTML link tags

**Mobile menu not working:**
- Check hamburger menu JavaScript
- Verify CSS classes are properly applied
- Test on actual mobile device

## 📞 Support

For technical support or questions about the website:
- Check browser console for error messages
- Review this README file
- Test in different browsers
- Verify all files are properly linked

## 🏆 Credits

**Jerry Concept Hub Website**
- Developed with modern web technologies
- Responsive design for optimal user experience
- Professional enrollment system
- SEO-friendly structure

**Technologies Used:**
- HTML5 for semantic markup
- CSS3 for modern styling
- Vanilla JavaScript for functionality
- Mobile-first responsive design

## 📄 License

This project is created for Jerry Concept Hub. All rights reserved.

---

**Version:** 1.0.0  
**Last Updated:** August 2025  
**Status:** Ready for Production (pending CSS files)