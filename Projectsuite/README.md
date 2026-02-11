# ProjectSuite

A modern, full-stack portfolio management platform built with React and Supabase. Showcase projects dynamically with a beautiful UI and manage content through a powerful admin panel.

## 🚀 Features

- **Dynamic Project Gallery** with category filtering and search
- **Admin Dashboard** with full CRUD operations
- **Edit Mode** for quick project updates
- **Dual Image Support** - URL or file upload
- **Auto-generated Categories** from database
- **SEO Optimized** with meta tags
- **Responsive Design** for all devices
- **Modern UI** with glassmorphism and animations

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS 4, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **SEO**: React Helmet Async

## 📦 Installation

```bash
# Clone repository
git clone <your-repo-url>
cd ProjectSuite

# Install dependencies
npm install

# Set up environment variables
# Create .env file with:
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_key

# Run development server
npm run dev

# Build for production
npm run build
```

## 🗄️ Database Setup

Create a `projects` table in Supabase:

```sql
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  techstack TEXT[] NOT NULL,
  image TEXT,
  demolink TEXT,
  codelink TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔐 Admin Access

1. Navigate to `/admin`
2. Login with Supabase credentials
3. Manage projects through the dashboard

## 📝 Usage

### Adding Projects
1. Login to admin panel
2. Fill project details form
3. Add image URL or upload file
4. Submit to publish

### Editing Projects
1. Click purple "Edit" button on any project
2. Modify fields
3. Click "Update Project"

### Categories
- Categories auto-generate from projects
- Add custom categories via "Other" option
- Filters update automatically

## 🎨 Design Features

- Glassmorphism effects
- Smooth animations with Framer Motion
- Gradient accents
- Responsive grid layouts
- Modern color palette

## 📱 Pages

- **Home**: Landing page
- **Projects**: Gallery with filters
- **Project Detail**: Individual project view
- **Admin Login**: Secure authentication
- **Admin Dashboard**: Content management
- **About/Services/Contact**: Additional pages

## 🔒 Security

- Supabase authentication
- Protected admin routes
- Row Level Security (RLS)
- Secure file uploads

## 📄 License

MIT License - feel free to use for personal or commercial projects

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Built with ❤️ using React and Supabase
