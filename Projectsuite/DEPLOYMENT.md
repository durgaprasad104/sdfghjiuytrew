# Deployment Guide for ProjectSuite

This guide explains how to deploy your **ProjectSuite** application to Vercel for free.

## Prerequisites
1.  A [GitHub](https://github.com/) account.
2.  A [Vercel](https://vercel.com/) account (you can log in with GitHub).

## Step 1: Push Code to GitHub
1.  Initialize Git in your project folder (if not already done):
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  Create a new repository on GitHub.
3.  Link your local project to the GitHub repo:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git branch -M main
    git push -u origin main
    ```

## Step 2: Deploy to Vercel
1.  Go to the [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Select your GitHub repository (`ProjectSuite` or whatever you named it).
4.  Vercel will auto-detect **Vite** as the framework.
5.  Click **"Deploy"**.

## Step 3: Verify & DNS (Optional)
1.  Wait for the build to complete (usually < 1 minute).
2.  Your site will be live at `https://your-project-name.vercel.app`.
3.  To add a custom domain (e.g., `projectsuite.com`), go to **Settings** -> **Domains** in Vercel.

## Troubleshooting
*   **404 on Refresh**: If you get 404 errors when refreshing pages like `/projects`, ensure `vercel.json` exists in the root with the rewrite rules (I have already created this for you).
