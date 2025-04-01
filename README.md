# Authenticated Notes Dashboard

A full-stack web application built for managing user authentication and personal notes. This project demonstrates secure user authentication, protected routes, and CRUD operations for notes with a responsive and interactive UI.

## Features
- **User Authentication**: Secure signup, login, and logout functionality using JWT (JSON Web Tokens) and password hashing with bcrypt.
- **Protected Dashboard**: Access restricted to logged-in users only, with session persistence via localStorage.
- **Notes Management**: Create, edit, delete, and view personal notes, linked to the authenticated user.
- **Responsive UI**: Designed with Tailwind CSS for a clean, responsive layout across devices.
- **Animations**: Smooth transitions and hover effects powered by Framer Motion.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Framer Motion, Axios, React Router
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt
- **Tools**: Git, npm

## Project Structure
authenticated-notes-dashboard/
├── backend/              # Backend code
│   ├── models/           # MongoDB schemas (User, Note)
│   ├── routes/           # API routes (auth, notes)
│   ├── index.js          # Server entry point
│   └── package.json      # Backend dependencies
├── frontend/             # Frontend code
│   ├── src/              # React source files
│   │   ├── components/   # React components (Login, Signup, Dashboard)
│   │   └── App.js        # Main app with routing
│   └── package.json      # Frontend dependencies
└── README.md             # Project documentation



## Setup Instructions
Follow these steps to run the project locally:

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or via MongoDB Atlas)
- Git

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/sagarsuthar2362/authenticated-notes-app
   cd authenticated-notes-app


2. **Backend setup**:
cd backend
npm install
npm start


3. **Frontend setup**:
cd ../frontend
npm install
npm run dev


