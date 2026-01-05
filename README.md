# My Portfolio Website

A personal portfolio website built using HTML, CSS and JavaScript. Has information about me, my experience, projects, publications and my resume.

## 📁 File Structure

```
portfolio/
├── index.html              # About/Home page
├── experience.html         # Professional Experience page (NEW!)
├── projects.html          # Projects showcase
├── publications.html      # Books and research papers
├── css/
│   └── styles.css        # All styling
├── js/
│   ├── main.js           # Navigation functionality
│   ├── experience.js     # Loads experience from JSON (NEW!)
│   ├── projects.js       # Loads projects from JSON
│   └── publications.js   # Loads publications from JSON
├── data/
│   ├── experience.json   # Your work experience data (NEW!)
│   ├── projects.json     # Your projects data
│   └── publications.json # Your publications data
└── assets/
    ├── profile.jpg       # Your profile photo
    ├── resume.pdf        # Your resume
    ├── projects/         # Project images
    └── companies/        # Company logos (optional)
```

## ✨ Features

- **About Section**: Introduction and skills
- **Experience Section**: Professional work history in timeline format (NEW!)
- **Projects Section**: Showcase of personal and work projects
- **Publications Section**: Books and research papers
- **Responsive Design**: Works on all devices
- **Easy to Update**: Just edit JSON files to update content

## 🔧 How to Update Your Content

### Adding/Editing Experience

1. Open `data/experience.json`
2. Add or edit entries following the format:

```json
{
    "id": "experience-1",
    "title": "Your Job Title",
    "company": "Company Name",
    "location": "City, Country",
    "startDate": "Month Year",
    "endDate": "Month Year or Present",
    "description": [
        "Key achievement or responsibility #1",
        "Key achievement or responsibility #2",
        "Key achievement or responsibility #3"
    ],
    "companyUrl": "https://company.com",
    "logo": "assets/companies/logo.png"
}
```

3. Save the file and refresh your browser

### Adding/Editing Projects

1. Open `data/projects.json`
2. Follow the instructions in the file
3. Save and refresh

### Adding/Editing Publications

1. Open `data/publications.json`
2. Follow the instructions in the file
3. Save and refresh

### Updating Your Profile

Edit `index.html` to update:
- Hero section text
- About Me paragraph
- Skills
- Contact information

## 🎨 Customization

### Changing Colors

Open `css/styles.css` and modify the CSS variables:

```css
:root {
    --primary: #2563eb;        /* Your main color */
    --primary-dark: #1d4ed8;   /* Darker shade */
    /* ... other colors ... */
}
```

### Changing Fonts

1. Update the Google Fonts link in each HTML file
2. Update the font variables in `css/styles.css`

## 📱 Mobile Responsive

The website automatically adapts to different screen sizes. The navigation becomes a hamburger menu on mobile devices, and the layout adjusts for optimal viewing.

## 🚀 Deployment

To deploy this website:

1. Upload all files to your web hosting service
2. Make sure the file structure is maintained
3. Ensure all file paths are correct

For GitHub Pages:
1. Push to your repository
2. Go to Settings → Pages
3. Select your branch and root folder
4. Your site will be live at `https://yourusername.github.io/repository-name/`

## 📝 Notes

- Replace `assets/profile.jpg` with your own photo
- Replace `assets/resume.pdf` with your resume
- Add company logos to `assets/companies/` (optional)
- Add project images to `assets/projects/` (optional)

## 🆕 What's New

- **Experience Timeline**: A beautiful timeline view of your professional journey
- **Dynamic Content**: All experience loaded from JSON for easy updates
- **Hover Effects**: Smooth animations when hovering over experience entries
- **Mobile Optimized**: Timeline adapts perfectly to mobile screens

---

Made with ❤️ by Kshamaa Suresh
