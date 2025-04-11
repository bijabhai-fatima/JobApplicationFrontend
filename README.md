# 💼 Job Application Tracker (Frontend)

This is the ReactJS frontend for a Job Application Tracker app. It allows users to add, view, update, and delete job applications while interacting with a Node.js + MongoDB backend API.

## 🚀 Features

- View all job applications in a clean list format
- Add new job applications via a form
- View detailed application info by ID
- Update application status
- Delete applications
- Fetch by status or applied date range (powered via backend API)

## 🛠️ Technologies Used

- **ReactJS** (with Hooks)
- **React Router DOM**
- **Axios** for HTTP requests 

---

## 📁 Project Structure

```bash
src/
├── components/
│   ├── JobCard/
│   │   ├── JobCard.jsx
│   │   └── JobCard.css
│   ├── LoaderSpinner/
│   │   ├── LoaderSpinner.jsx
│   │   └── LoaderSpinner.css
│   └── StatusTag/
│       ├── StatusTag.jsx
│       └── StatusTag.css
│
├── pages/
│   ├── Home/
│   │   ├── Home.jsx
│   │   └── Home.css
│   ├── NewApplication/
│   │   ├── NewApplication.jsx
│   │   └── NewApplication.css
│   └── ApplicationDetail/
│       ├── ApplicationDetail.jsx
│       └── ApplicationDetail.css
│
├── AppContext.js          # Global context for managing state and API logic
├── App.js                 # Main app component with route configuration
├── index.js               # React root entry point
├── App.css                # App-wide styles
└── index.css              # Global styles and resets
```
