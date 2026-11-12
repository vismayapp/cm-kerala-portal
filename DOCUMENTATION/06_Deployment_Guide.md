# 06. Deployment Guide

## 1. Backend Deployment (Render)
1. Push your repository to GitHub (ensure `.env` and `node_modules` are ignored in `.gitignore`).
2. Log in to **Render** and click **New +** $\rightarrow$ **Web Service**.
3. Connect your GitHub repository and configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
4. Add Environment Variables in Render:
   - `PORT`: `5000`
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your secret signing key
   - `GROQ_API_KEY`: Your Groq API key
5. Deploy and copy your live backend URL (e.g., `https://cm-kerala-api.onrender.com`).

## 2. Frontend Deployment (Vercel)
1. Update `frontend/src/services/api.js` to use `import.meta.env.VITE_API_URL || 'http://localhost:5000/api'`.
2. Log in to **Vercel** and click **Add New Project**.
3. Import your GitHub repository and configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** `Vite`
4. Add Environment Variable:
   - `VITE_API_URL`: `https://cm-kerala-api.onrender.com/api`
5. Click **Deploy** and verify the live application URL.