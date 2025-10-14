import React from "react";

export const Intermediate = [
  {
    id:202,
    title: "Daily English Lesson 1 - Intermediate",
    steps: [
      {
        type: "video",
        title: "Listening",
        content: "https://www.youtube.com/embed/example_inter1",
        transcript: `Mark: Are you coming to the meeting?
Lisa: Yes, I will be there at 10 am.
Mark: Great! See you then.`
      },
      { type: "vocabulary", title: "Vocabulary", content: ["decide", "decides", "deciding"] },
      {
        type: "quiz",
        title: "Quiz",
        content: [
          { question: "1. Who will attend the meeting?", options: ["Mark", "Lisa", "Both"], answer: 3 },
          { question: "2. What time is the meeting?", options: ["9 am", "10 am", "11 am"], answer: 2 }
        ]
      },
      { type: "discussion", title: "Discussion", content: "Write sentences using Future Simple." }
    ]
  }
];
