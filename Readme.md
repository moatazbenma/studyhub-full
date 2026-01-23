# 🧠 StudyHub – Interactive English Learning Platform

> A modern, full-stack web application designed to help users **learn, practice, and master English** through interactive study tools, flashcards, grammar correction, and personalized learning experiences.



---

## ✨ Key Features

### 📘 **English Study Materials**
- Comprehensive grammar lessons organized by proficiency level (A1–C2)
- Vocabulary lists and reading exercises
- Admin dashboard for content management

### 🧾 **Interactive Flashcards**
- Beautiful flip animations with Framer Motion
- Spaced repetition system for effective learning
- Create and organize custom study decks
- Track learning progress

### ✅ **Smart To-Do List**
- Track daily learning goals and study tasks
- Add, edit, and complete tasks with visual indicators
- Progress overview dashboard

### 💬 **English Practice Chat**
- Real-time conversation partner for English practice
- Encouragement and practice suggestions
- Designed for natural English dialogue

### 🔍 **Grammar Correction Tool**
- Real-time grammar, spelling, and punctuation checking
- Powered by **LanguageTool API**
- Detailed explanations and alternative suggestions

### 📅 **Class Booking System**
- Schedule live English lessons with tutors
- Manage availability and confirm bookings
- Simple calendar interface

### 👤 **User Profiles & Dashboard**
- Profile customization with avatar upload
- Personal learning dashboard
- Track study statistics and progress
- Account settings management

### 🎨 **Modern UI/UX**
- Built with **Tailwind CSS** and **Framer Motion**
- Smooth animations and transitions
- Responsive design (desktop, tablet, mobile)
- Beautiful gradient themes and color schemes

---

## 🛠️ Tech Stack

### Frontend
- **React** 19.1 – Modern UI framework
- **Vite** – Lightning-fast build tool
- **Tailwind CSS** – Utility-first styling
- **Framer Motion** – Smooth animations
- **Lucide React** – Beautiful icons
- **Axios** – HTTP client
- **React Router** – Client-side routing

### Backend
- **Django** 6.0 – Python web framework
- **Django REST Framework** – RESTful APIs
- **PostgreSQL** – Production database
- **SQLite** – Development database
- **JWT Authentication** – Secure API access
- **Django CORS Headers** – Cross-origin support
- **Gunicorn** – Production server

### External Services
- **LanguageTool API** – Grammar correction
- **Google Cloud Storage** – File management (optional)

---

## 📁 Project Structure

```
studyhub-full/
├── Frontend/y/                 # React frontend application
│   ├── src/
│   │   ├── api/               # API integration & HTTP client
│   │   ├── components/        # Reusable UI components
│   │   ├── images/            # Image assets
│   │   ├── landing/           # Landing page components
│   │   ├── lib/               # Utilities & helpers
│   │   ├── pages/             # Page components
│   │   │   ├── Auth/          # Login & Register
│   │   │   ├── Dashboard/     # User dashboard
│   │   │   ├── English/       # English practice
│   │   │   ├── Flashcards/    # Flashcard system
│   │   │   ├── Todos/         # To-do list
│   │   │   └── Profilestudyhub/ # User profile
│   │   └── App.jsx            # Main app component
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── Backend/                    # Django backend application
│   ├── config/                # Django settings & URLs
│   ├── accounts/              # User authentication
│   ├── flashcards/            # Flashcard system
│   ├── todos/                 # To-do management
│   ├── dashboard/             # Dashboard & analytics
│   ├── english/               # English practice & grammar
│   ├── bookings/              # Class booking system
│   ├── requirements.txt       # Backend dependencies
│   ├── manage.py              # Django CLI
│   ├── Procfile               # Deployment config
│   └── .env                   # Environment variables
│
└── DEPLOYMENT_CHECKLIST.md    # Deployment guide
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ (for frontend)
- **Python** 3.10+ (for backend)
- **Git**

### 1️⃣ Clone Repository

```bash
git clone https://github.com/moatazbenma/studyhub-full.git
cd studyhub-full
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend
cd Backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (admin account)
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

**Backend running at:** `http://127.0.0.1:8000/`

### 3️⃣ Frontend Setup

Open a **new terminal** window:

```bash
# Navigate to frontend
cd Frontend/y

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend running at:** `http://localhost:5173/`

---

## 🔐 Environment Variables

### Backend `.env` File

Create `.env` in the `Backend/` directory:

```env
# Django Settings
DEBUG=False
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///db.sqlite3

# CORS & Hosts
ALLOWED_HOSTS=localhost,127.0.0.1

# External APIs
GOOGLE_API_KEY=your-google-api-key
```

For production, update:
- `DEBUG=False`
- `DATABASE_URL=postgresql://user:password@hostname:5432/studyhub`
- `ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com`

---

## 📚 API Documentation

### Authentication
- `POST /api/accounts/register/` – Register new user
- `POST /api/accounts/login/` – User login
- `GET /api/accounts/profile/` – Get user profile
- `PUT /api/accounts/profile/` – Update profile

### English Practice
- `POST /api/english/practice-english/` – Practice conversation
- `POST /api/english/correct-writing/` – Grammar check

### Flashcards
- `GET /api/flashcards/` – Get all decks
- `POST /api/flashcards/` – Create deck
- `GET /api/flashcards/{id}/` – Get deck details

### Todos
- `GET /api/todos/` – Get all tasks
- `POST /api/todos/` – Create task
- `PUT /api/todos/{id}/` – Update task
- `DELETE /api/todos/{id}/` – Delete task

---


---

## 🧪 Testing

### Backend Tests
```bash
cd Backend
python manage.py test
```

### Check Deployment Ready
```bash
python manage.py check --deploy
```

---

## 🔧 Available Commands

### Frontend
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

### Backend
```bash
python manage.py runserver           # Start dev server
python manage.py migrate             # Apply migrations
python manage.py createsuperuser     # Create admin user
python manage.py collectstatic       # Collect static files
python manage.py test                # Run tests
```

---

## 🤝 Contributing

Contributions are welcome! 

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see [LICENSE](./LICENSE) file for details.

---

## 🎯 Roadmap

- [ ] Voice/Audio recording for speaking practice
- [ ] Advanced progress tracking & analytics
- [ ] Gamification (badges, achievements)
- [ ] Video lesson integration
- [ ] Mobile app (React Native)
- [ ] AI-powered personalized learning paths
- [ ] Community forum for peer learning

---

## 💬 Support

Have questions? 
- Open an [Issue](https://github.com/moatazbenma/studyhub-full/issues)
- Check [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for detailed guides
- Review existing documentation

---

## 👨‍💻 Author

**Developed by:** El Mouataz Benmanssour

- 🔗 **GitHub:** [@moatazbenma](https://github.com/moatazbenma)
- 💼 **Role:** Full Stack Software Engineer
- 🎓 **Education:** Informatics Engineering Student
- 🚀 **Passion:** Programming & Learning Technology

---

## 📊 Project Statistics

- **Frontend:** React 19 + Vite
- **Backend:** Django 6.0 + DRF
- **Database:** PostgreSQL (production ready)
- **Total Size:** ~50 MB (optimized)
- **Deployment:** < 5 minutes
- **Free Tier:** ✅ Available

---

<div align="center">

**Made with ❤️ for English learners worldwide**

[⬆ back to top](#studyhub--interactive-english-learning-platform)

</div>
