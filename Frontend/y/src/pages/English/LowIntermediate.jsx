import React from "react";

export const LowIntermediate = [
  {
    id:303,
    title: "Daily English Lesson 1 - Low Intermediate",
    steps: [
      {
        type: "video",
        title: "Listening Practice",
        content: "https://www.youtube.com/embed/example_lowint1",
        transcript: `John: Hello! How are you today?
Sarah: I'm fine, thank you! And you?
John: I'm good too.`
      },
      { type: "vocabulary", title: "Vocabulary", content: ["study", "studies", "studying"] },
      {
        type: "quiz",
        title: "Quiz",
        content: [
          { question: "1. Who greets first?", options: ["Sarah", "John"], answer: 2 },
          { question: "2. How is Sarah feeling?", options: ["Good", "Fine"], answer: 2 }
        ]
      },
      { type: "discussion", title: "Discussion", content: "Write sentences using Present Continuous." }
    ]
  }
];
