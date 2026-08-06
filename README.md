# Zain Ur Rehman — Portfolio

A modern, high-end, and visually stunning personal portfolio built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Setup Instructions

This project requires a few environment variables to function correctly, specifically for the database and the email contact form.

### 1. Environment Variables
Create a `.env.local` file in the root directory and copy the contents from `.env.example`. 

You will need to fill in:
- `MONGODB_URI`: Your MongoDB connection string (e.g., from MongoDB Atlas).
- `RESEND_API_KEY`: Your API key from [Resend](https://resend.com) for sending emails.
- `ADD_PROJECT_SECRET`: A secure backend secret used to validate adding new projects.

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Seeding
To populate the MongoDB database with initial projects and reviews, run the seed script:
```bash
npx tsx scripts/seed.ts
```
*Note: Ensure your `MONGODB_URI` is correctly configured in `.env.local` before running this script.*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔐 Hidden Admin Route (Add Projects)

To add new projects without touching the codebase, navigate to the hidden route:
`http://localhost:3000/add-project`

This page is not linked anywhere on the site and is hidden from search engines. 
**To submit a project, you must enter the frontend PIN `9509`.** This acts as a first-layer UX gate. The backend will then independently verify this request using the `ADD_PROJECT_SECRET` environment variable to ensure true security.
