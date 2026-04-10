Task Manager App

A simple full stack Task Manager application that allows users to create, view, update, and delete tasks. The focus of this project is on clean structure, proper API integration, and reliable functionality.

Tech Stack

Frontend: React (Vite)
Backend: Node.js with Express
Database: MongoDB

Features

- Create a new task
- View all tasks
- Mark task as completed
- Edit task title
- Delete task
- Basic validation and error handling
- Loading state handling

API Endpoints

GET /tasks – Fetch all tasks  
POST /tasks – Create a new task  
PATCH /tasks/:id – Update task  
DELETE /tasks/:id – Delete task  

Project Structure

backend – Express server, routes, controllers  
frontend – React app with components and API integration  

How to Run Locally

Backend

cd backend  
npm install  
npm start  

Frontend

cd frontend  
npm install  
npm run dev  

Notes

- Focused on functionality and clean code structure
- Used MongoDB for data persistence
- Implemented edit feature as an additional improvement
- Kept UI simple and user-friendly
