🎯 Quiz App with React & MySQL

This is a Quiz Application built using React (frontend), Node.js + Express (backend), and MySQL (database).
The app dynamically fetches quiz questions from a MySQL database and displays them in a user-friendly interface.

🚀 Features

📚 Fetches questions directly from MySQL database

🎨 Built with React and TailwindCSS (responsive UI)

✅ Multiple-choice questions with instant feedback

🗄️ Backend powered by Express + MySQL

🔒 Secure API endpoints for quiz data

💾 Stores user answers & results in database

🛠️ Tech Stack

Frontend: React, TailwindCSS, Axios

Backend: Python

Database: MySQL

Version Control: Git + GitHub

📂 Project Structure
quiz-app/
│── backend/            # Node.js + Express API
│   ├── server.js
│   ├── routes/
│   ├── models/
│   └── config/
│
│── frontend/           # React app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
│
│── README.md           # Project documentation
│── .gitignore          # Files ignored by Git

⚙️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/your-username/quiz-app.git
cd quiz-app

2️⃣ Setup Backend
cd backend
npm install


Create a .env file:

DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=quizdb
PORT=5000


Run backend:

node server.js

3️⃣ Setup Frontend
cd frontend
npm install
npm start

🖼️ Screenshots
Quiz Page

📊 Database Schema
CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_text VARCHAR(255) NOT NULL,
  option_a VARCHAR(100),
  option_b VARCHAR(100),
  option_c VARCHAR(100),
  option_d VARCHAR(100),
  correct_option CHAR(1)
);

🔮 Future Enhancements

🏆 Leaderboard for top scorers

🌐 Multi-language support

📱 Mobile-friendly PWA

🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.
