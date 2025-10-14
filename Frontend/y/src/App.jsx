import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import DeckList from "./pages/Flashcards/DeckList";
import CardReview from "./pages/Flashcards/CardReview";
import TodoList from "./pages/Todos/TodoList";
import DashboardPage from './pages/Dashboard/DashboardPage';
import EnglishLessons from './pages/English/EnglishLessons';
import Profile from "./pages/Profilestudyhub/Profile";
import LandingPage  from "./landing/LandingPage";

function App() {


  return (
        <Router>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/dashboard" element={<DashboardPage/>}/>
            <Route path="/flashcards" element={<DeckList/>}/>
            <Route path="/flashcards/:deckId" element={<CardReview/>}/>
            <Route path="/todos" element={<TodoList/>}/>
            <Route path="/english" element={<EnglishLessons/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/" element={<LandingPage/>}/>

          </Routes>
        </Router>

  )
}

export default App
