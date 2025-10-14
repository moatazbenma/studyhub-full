import React from "react";

export const HighIntermediate = [
  {
    id:404,
    title: "Daily English Lesson 1 - High Intermediate",
    steps: [
      {
        type: "video",
        title: "Advanced Listening",
        content: "https://www.youtube.com/embed/example_highint1",
        transcript: `Alice: Have you considered the implications of the project?
Bob: Yes, I have analyzed the potential risks and benefits.
Alice: Excellent! Let's discuss further.`
      },
      { type: "vocabulary", title: "Vocabulary", content: ["analyze", "analyzes", "analyzing"] },
      {
        type: "quiz",
        title: "Quiz",
        content: [
          { question: "1. Who analyzes the project?", options: ["Alice", "Bob"], answer: 2 },
          { question: "2. What do they discuss?", options: ["Implications", "Schedule"], answer: 1 }
        ]
      },
      { type: "discussion", title: "Discussion", content: "Write sentences using Conditional Sentences." }
    ]
  }
];
