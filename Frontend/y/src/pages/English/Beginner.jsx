import React from "react";

export const Beginner = [
  {
    id: 101,
    title: "Daily English Lesson 1",
    steps: [
      {
        type: "video",
        title: "Listening",
        content: "https://www.youtube.com/embed/WR9_nsLyaEY?si=f5UtLT7ESHenYH9C",
        transcript: `Pete: Hi! Are you Anna?
Anna: Yes! Hi there! Are you Pete?
Pete: I am Pete.
Anna: Nice to meet you.`
      },
      { type: "vocabulary", title: "Vocabulary", content: ["go", "goes", "playing"] },
      {
        type: "quiz",
        title: "Quiz",
        content: [
          { question: "1. What is the man's name?", options: ["There", "Pete", "Irving"], answer: 2 },
          { question: "2. What is the woman's name?", options: ["Ana", "Anna"], answer: 2 },
          { question: "3. What is Anna's address?", options: ["1234 Main Street", "4100 Oak Avenue", "1400 Irving Street"], answer: 3 },
          { question: "4. Does Anna live in an apartment?", options: ["Yes, she does.", "Yes, she is."], answer: 1 }
        ]
      },
      { type: "discussion", title: "Discussion", content: "Write sentences using Present Simple." }
    ]
  },
    {
    id: 102,
    title: "Daily English Lesson 2",
    steps: [
      {
        type: "video",
        title: "Listening",
        content: "https://www.youtube.com/embed/0AqR01LZDro?si=-Uy_gevCIgygOir7",
        transcript: `Pete: Hi! Are you Anna?
Anna: Yes! Hi there! Are you Pete?
Pete: I am Pete.
Anna: Nice to meet you.`
      },
      { type: "vocabulary", title: "Vocabulary", content: ["go", "goes", "playing"] },
      {
        type: "quiz",
        title: "Quiz",
      content: [
        { question: "1. What is the woman's name?", options: ["Calvin", "Camille", "Hello"], answer: 2 },
        { question: "2. What is the man’s name?", options: ["Camille", "Chris", "Calvin"], answer: 3 },
        { question: "3. How does Calvin feel?", options: ["He is great.", "He is good.", "She is good."], answer: 2 },
        { question: "4. How does Camille feel?", options: ["She is sad.", "She is great.", "She is not good."], answer: 2 },
        { question: "5. What is the name of the man in the picture?", options: ["Calvin", "Sarah", "Tom"], answer: 3 },
        { question: "6. What is the name of the woman in the picture?", options: ["Sarah", "Camille", "Tom"], answer: 1 },
        { question: "7. What is this?", options: ["a notebook", "a calculator", "a phone"], answer: 3 },
        { question: "8. What is that?", options: ["That is a book.", "That is a phone.", "That is a backpack."], answer: 1 },
        { question: "9. Is Camille sad?", options: ["Yes, she is.", "Yes, he is.", "No, she is not."], answer: 3 },
        { question: "10. Where is Calvin from?", options: ["He is from California.", "He is from Canada.", "He is from Spain."], answer: 3 },
        { question: "11. Where is Camille from?", options: ["She is from Canada.", "She is from The United States.", "She is from France."], answer: 2 },
        { question: "12. How old is Calvin?", options: ["He is 25.", "He is 20 years old.", "He is 33 years old."], answer: 2 },
        { question: "13. How old is Camille?", options: ["She is 30.", "She is 31.", "She is 33."], answer: 1 },
        { question: "14. Does Calvin want some water?", options: ["Yes, please.", "No, thank you."], answer: 1 }
      ]

      },
      { type: "discussion", title: "Discussion", content: "Write sentences using Present Simple." }
    ]
  },
  // More beginner lessons
];
