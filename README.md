# Career Path Analyzer — Full Stack Assignment (CodeAtRandom)

A full-stack web application that analyzes a user's career path by identifying skill gaps, generating a personalized career roadmap, and fetching the latest tech news from the HackerNews API.

This project fulfills **all requirements** of the CodeAtRandom Full Stack Developer Assignment.

---

## 🚀 Live Demo (Frontend + Backend)

### 🔗 Frontend (Vercel)
👉 https://career-path-analyser.vercel.app/

### 🔗 Backend (Render / Railway)
👉 https://career-path-analyser.onrender.com

---

## 📁 Folder Structure

### /frontend → React + Vite + TypeScript (user interface)
### /backend → Node.js + Express (APIs: skill-gap, roadmap, news)

---

# 🧰 Tech Stack Used

### **Frontend**
- React + Vite
- TypeScript
- TailwindCSS
- shadcn/ui components
- Axios
- React Router DOM

### **Backend**
- Node.js
- Express.js
- Axios
- CORS
- In-memory JSON data (no database required)

### **External API**
- HackerNews API  
  https://github.com/HackerNews/API

---

# 🖥️ How to Run the Project Locally

## 1️⃣ Clone the Repository

```sh
git clone https://github.com/repo-url.git
cd repo-folder
```

## 🟦 FRONTEND SETUP (React + Vite)

Install dependencies:
```sh
cd frontend
npm install
```

Run frontend:
```sh
npm run dev
```

Frontend runs on:
http://localhost:8080


## 🟩 BACKEND SETUP (Node + Express)

Install dependencies:
```sh
cd backend
npm install
```

Start backend:
```sh
npm start
```

Backend runs on:
http://localhost:5000

## 📌 API Documentation

### 1. Skill Gap API

POST /api/skill-gap

Request Body:
```json
{
  "targetRole": "Frontend Developer",
  "currentSkills": ["HTML", "CSS", "JavaScript"]
}
```

Response:
```json
{
  "matchedSkills": ["HTML"],
  "missingSkills": ["CSS", "JavaScript", "React", "Git"],
  "recommendations": ["Learn CSS — important for Frontend Developer"],
  "learningOrder": ["CSS", "JavaScript", "React", "Git"]
}
```

### 2. Career Roadmap API

POST /api/roadmap

Request Body:
```json
{
  "targetRole": "Backend Developer"
}
```

Response:
```json
{
  "phases": [
    {
      "phase": "Phase 1",
      "items": ["Java basics", "OOP", "Git"]
    },
    {
      "phase": "Phase 2",
      "items": ["Spring Boot", "SQL", "APIs"]
    },
    {
      "phase": "Phase 3",
      "items": ["Deployment", "Projects", "System design basics"]
    }
  ]
}
```

### 3. Tech News API

GET /api/news

Response:

An array of exactly 5 latest HackerNews stories:

```json
[
  {
    "title": "Something amazing",
    "url": "https://example.com",
    "score": 120,
    "time": 1700000000,
    "by": "authorName"
  }
]
```

## 📌 Assumptions

1. Only three career roles are supported (as required in assignment):

    Frontend Developer
    Backend Developer
    Data Analyst

2. Roadmaps are mock AI output, not generated using AI (per assignment requirement).

3. Skill matching and role matching are case-insensitive.

4. Backend uses in-memory JSON, no database required.

5. HackerNews API returns dynamic data; the backend filters to ensure 5 valid stories.

## 📝 Notes for Evaluators

1. The frontend and backend are decoupled and communicate over REST APIs.

2. Codebase includes clean folder structure, clear naming, and comments where necessary.

3. Error handling is implemented for invalid roles, missing fields, and connectivity failures.

4. Skill & role matching are fully case-insensitive for better UX.

5. The assignment layout is followed precisely:

    Skill Gap → Left
    Roadmap → Right
    Latest Tech News → Bottom

## 📦 Deployment Instructions

### Frontend (Vercel)

1. Go to https://vercel.com
2. Import frontend folder
3. Framework auto-detected → React/Vite
4. Deploy

### Backend (Render)

1. Go to https://render.com
2. Create → Web Service
3. Select backend folder
4. Set:
    Build Command: npm install
    Start Command: npm start
5. Deploy

Update frontend .env or API base URL if backend URL changes.

## 🎉 Final Thoughts

This project fulfills all assignment requirements:

1. Skill gap analysis
2. Career roadmap generation
3. Public API integration (HackerNews)
4. Clean UI (React + Vite + Tailwind)
5. Express backend with proper endpoints
6. Case-insensitive logic & error handling
7. Live hosted demo + clean README

Happy reviewing!
