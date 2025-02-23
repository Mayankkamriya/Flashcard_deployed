# 📚 Flashcard App

## 📌 Overview

The **Flashcard App** is an interactive learning tool that helps users memorize and review information using the **Leitner System**. It enables users to create, manage, and review flashcards efficiently with spaced repetition.

## 🚀 Features

✅ **Create Flashcards** - Add new flashcards with questions and answers.

✅ **Spaced Repetition** - Uses the Leitner System for effective learning.

✅ **Progress Tracking** - View learning progress and review schedules.

✅ **Flashcard Review Mode** - Test knowledge with interactive flashcards.

✅ **Responsive Design** - Works on both desktop and mobile devices.

✅ **Data Storage** - Uses MongoDB (or Local Storage as a fallback) to save flashcards.

✅ **Deployed Version Available** - Access the application online anytime.

## 🛠 Tech Stack

- **Frontend:**: React, Tailwind CSS

- **Backend:**: Node.js, Express.js

- **Database:** MongoDB (or Local Storage as fallback)

- **State Management:** React Hooks

## 🔥 API Endpoints

- GET `/api/flashcards/next` - Fetches the next flashcard for review.

- POST `/api/flashcards/` - Creates a new flashcard.

- PUT `/api/flashcards/:id` - Updates a flashcard.

- POST `/api/flashcards/:id/review` - Processes the review of a flashcard.

- DELETE `/api/flashcards/:id` - Deletes a flashcard.


## 📂 Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/Mayankkamriya/ALFREDTASK.git
```

2. Install backend dependencies and start the server:

```bash
cd backend
npm install
node index.js
```

3. Install frontend dependencies and start the app:

```bash
npm install
npm run dev
```

4. Open the app at: [http://localhost:3000](http://localhost:3000)

## 🌍 Deployment

The project is deployed online. You can access it here:
🔗 **Live Demo:** [https://alfredtask-mayank.vercel.app](https://alfredtask-mayank.vercel.app)  

🤝 Contribution

Contributions are welcome! Feel free to fork this repository and submit a pull request with improvements.
