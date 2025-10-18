# 🧠 StudyHub – AI-Powered English Learning Platform

**StudyHub** is a full-stack web application built to help users **learn and practice English** effectively.
It combines interactive study tools, smart AI conversation, and grammar correction to create a personalized English-learning experience.

---

## 🚀 Features

### 📘 1. English Study Materials

* Curated grammar lessons, vocabulary lists, and reading exercises
* Categorized by level (A1–C2) and skill (reading, writing, listening, speaking)
* Admin dashboard to upload and manage resources

### 🧾 2. Flashcards

* Interactive vocabulary flashcards with flip animations
* Supports progress tracking and spaced repetition

### ✅ 3. To-Do List

* Simple daily planner to track learning goals
* Add, edit, and mark study tasks as completed

### 💬 4. AI Chat – Smart Conversation Assistant

* Integrated **Google Studio AI** for interactive English conversations
* Chatbot acts as a friendly tutor that practices English dialogue
* Can provide suggestions, vocabulary tips, and feedback

### 🧠 5. Grammar Correction

* Uses **LanguageTool API** for real-time grammar, spelling, and punctuation corrections
* Returns detailed explanations and better alternatives

### 🧑‍🏫 6. Book a Class

* Allows users to schedule live English lessons with tutors
* Teachers can manage availability and confirm bookings

### 📱 7. Responsive Design

* Built with **Tailwind CSS** for a smooth experience across desktop and mobile
* Fixed **navbar** and **footer** for consistent navigation

---

## 🛠️ Tech Stack

| Layer                    | Technology                  |
| ------------------------ | --------------------------- |
| **Frontend**             | React (Vite) + Tailwind CSS |
| **Backend**              | Django REST Framework       |
| **Database**             | PostgreSQL / Neon         |
| **AI Integration**       | Google Studio AI            |
| **Grammar Correction**   | LanguageTool API            |
| **Authentication**       | JWT / Django Auth           |
| **Deployment (Planned)** | Render  |

---

## 🧩 Project Structure

```
studyhub/
├── frontend/y/        # React app (Flashcards, To-Do, AI Chat UI)
│    ├── src/
│        ├── api/           # API functions to communicate with backend
│        ├── assets/        # Fonts, styles, and reusable static files
│        ├── components/    # Reusable UI components
│        ├── images/        # Static images and icons
│        ├── landing/       # Landing page layout and sections
│        |── lib/           # Helper utilities and configuration
│        ├── pages/         # Main page components (Flashcards, To-Do, AI Chat, etc.)
│        ├── App.jsx        # Main React app component
│        ├── App.css        # Global styles
│        └── main.jsx       # Entry point for React
│  
│
├── backend/           # Django API (User, Classes, Grammar, Chat)
Backend/
│    ├── config/              # Django settings and URLs
│    ├── accounts/            # Authentication and user management
│    ├── english/             # Study materials and grammar lessons
│    ├── flashcards/          # Flashcard and vocabulary logic
│    ├── todos/               # Task and study goal tracking
│    ├── bookings/            # Class booking system
│    ├── dashboard/           # Admin and analytics interface
│    ├── media/               # Uploaded files (ignored by Git)
│    ├── service_account.json # Google API credentials
│    ├── manage.py            # Django management script
│    ├── requirements.txt     # Dependencies
│    └── Procfile             # Deployment configuration
│    
└── README.md
    ```





---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Project

```bash
git clone https://github.com/moatazbenma/studyhub-full.git
cd studyhub-full

```

### 2️⃣ Backend Setup

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend runs at: **[http://127.0.0.1:8000/](http://127.0.0.1:8000/)**

### 3️⃣ Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: **[http://localhost:5173/](http://localhost:5173/)**

---

## 🔑 Environment Variables

### Backend `.env`

```
SECRET_KEY=your_django_secret
DEBUG=True
LANGUAGETOOL_API_URL=https://api.languagetool.org/v2/check
GOOGLE_STUDIO_API_KEY=your_google_ai_key
```


---

## 🧠 Future Enhancements

* 🎤 Voice input for speaking practice
* 📊 User progress tracking dashboard
* 🏆 Reward/XP system for motivation
* 📅 Integration with Google Calendar or Zoom for booked classes
* 📱 Mobile version using React Native

---

## 💡 Vision

> StudyHub aims to be your **AI-powered English learning companion**, combining study materials, conversation practice, and smart correction to make mastering English fun and effective.

---

## 🧑‍💻 Author

**Developed by:** El Mouataz Benmanssour

**Role:** Full Stack Software Engineer | Passionate About Programming & Generative AI | Informatics Engineering Student

**Status:** 🚧 In Development

---
