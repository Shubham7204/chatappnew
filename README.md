
# Real-Time Chat Application (MERN Stack)

https://github.com/user-attachments/assets/9f243467-3197-4223-bb5a-7aeb6a08a457


---

## **Project Overview**

This project is a **real-time chat application** developed as part of a Web Application Developer Intern Assignment. It demonstrates core skills in backend development, API design, real-time data handling, and full-stack application architecture using the **MERN Stack** (MongoDB, Express, React, and Node.js).

---

## **Objective**

The application enables users to:  
1. **Register and log in** securely using JWT-based authentication.  
2. Engage in **real-time messaging** with other authenticated users via WebSockets.  
3. Maintain **chat history** in MongoDB for later retrieval.  
4. View a list of **online users** and see online/offline statuses in real-time.  
5. Use a **minimalist UI** for seamless chat functionality.  

---

## **Features**

### **Core Features**
1. **User Authentication**  
   - Secure user registration and login.  
   - JWT-based session management.  
   - Password hashing and validation for sensitive data.

2. **Chat Functionality**  
   - Real-time messaging with Socket.io.  
   - Persistent chat history stored in MongoDB.  

3. **User Interface**  
   - Simple and user-friendly chat interface with React.  
   - Online/offline presence indicator.  
   - Chat window auto-scrolls to the latest messages.  
   - Timestamps for all messages.

### **Bonus Features**  
- Support for **media messages** (images) with Cloudinary integration.  

---

## **Technical Stack**

### **Frontend**  
- **React** with Tailwind CSS for the UI.  
- **Socket.io-client** for WebSocket communication.  
- **Hooks and Context API** for state and functionality management.

### **Backend**  
- **Node.js** with Express for the server.  
- **MongoDB** as the database.  
- **Socket.io** for real-time communication.  

---

## **Folder Structure**

```
📦 
├─ .gitignore
├─ client
│  ├─ .gitignore
│  ├─ README.md
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.js
│  ├─ public
│  │  ├─ _headers
│  │  └─ vite.svg
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.jsx
│  │  ├─ assets
│  │  │  └─ react.svg
│  │  ├─ components
│  │  │  ├─ Loading.jsx
│  │  │  ├─ Login.jsx
│  │  │  └─ Signup.jsx
│  │  ├─ context
│  │  │  ├─ AuthProvider.jsx
│  │  │  └─ SocketContext.jsx
│  │  ├─ home
│  │  │  ├─ Leftpart
│  │  │  │  ├─ Left.jsx
│  │  │  │  ├─ Search.jsx
│  │  │  │  ├─ User.jsx
│  │  │  │  └─ Users.jsx
│  │  │  ├─ Rightpart
│  │  │  │  ├─ Chatuser.jsx
│  │  │  │  ├─ Message.jsx
│  │  │  │  ├─ Messages.jsx
│  │  │  │  ├─ Right.jsx
│  │  │  │  └─ Typesend.jsx
│  │  │  └─ nav
│  │  │     └─ Logout.jsx
│  │  ├─ hooks
│  │  │  ├─ useGetAllUsers.jsx
│  │  │  ├─ useGetMessage.js
│  │  │  ├─ useGetSocketMessage.js
│  │  │  └─ useSendMessage.js
│  │  ├─ index.css
│  │  ├─ main.jsx
│  │  └─ statemanage
│  │     └─ useConversation.js
│  ├─ tailwind.config.js
│  └─ vite.config.js
└─ server
   ├─ .gitignore
   ├─ SocketIO
   │  └─ server.js
   ├─ controller
   │  ├─ message.controller.js
   │  └─ user.controller.js
   ├─ index.js
   ├─ jwt
   │  └─ generateToken.js
   ├─ middleware
   │  └─ secureRoute.js
   ├─ models
   │  ├─ conversation.model.js
   │  ├─ message.model.js
   │  └─ user.model.js
   ├─ package-lock.json
   ├─ package.json
   ├─ routes
   │  ├─ message.route.js
   │  └─ user.route.js
   └─ utils
      └─ cloudinary.js
```


# Chat Application - Setup Instructions

## **Prerequisites**
- **Node.js**: Version >= 16.x  
- **MongoDB**: Installed locally or access to MongoDB Atlas.

---

## Steps to Run the Project Locally

### 1. Clone the Repository
```bash
git clone <repository-link>
cd chatappnew
```

### 2. Setup Environment Variables
Server (.env)
```bash
PORT=5002
MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your Secret Key>
CLOUDINARY_NAME=<Your Cloudinary Name>
CLOUDINARY_API_KEY=<Your Cloudinary API Key>
CLOUDINARY_API_SECRET=<Your Cloudinary Secret>
```

### 3. Install Dependencies
Frontend
```bash
cd client
npm install
npm run dev
```

Backend
```bash
cd server
npm install
npm start
```

### 4. Access the Application
Open the application in your browser: http://localhost:3001

# Features Breakdown

## Hooks
1. `useGetAllUsers`: Fetches the list of all users from the server
2. `useGetMessage`: Retrieves the chat history between two users
3. `useGetSocketMessage`: Listens for new incoming messages via Socket.io
4. `useSendMessage`: Sends a message to another user through the server

## Context
1. `AuthProvider`: Manages authentication state and provides authentication-related actions
2. `SocketContext`: Provides WebSocket functionality across the application

## Server Components

### 1. Controllers
1. `user.controller.js`: Handles user registration, login, and profile management
2. `message.controller.js`: Manages message sending, receiving, and history

### 2. Models 
1. `user.model.js`: Schema for user data
2. `message.model.js`: Schema for storing chat messages
3. `conversation.model.js`: Schema for managing user conversations

### 3. SocketIO
1. `server.js`: Handles real-time chat and user presence notifications

### 4. Routes
1. `user.route.js`: User-related API endpoints
2. `message.route.js`: Messaging-related API endpoints

### 5. Utils
1. `cloudinary.js`: Configures Cloudinary for image uploads
