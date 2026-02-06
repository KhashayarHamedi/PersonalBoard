# Step-by-step: See your website & deploy it

Follow these steps in order.

---

## Part 1: See the website on your computer

### Step 1: Open a terminal in this folder

- In Cursor: **Terminal → New Terminal** (or press `` Ctrl+` ``).
- Or in File Explorer: open this folder, type `cmd` in the address bar, press Enter.

### Step 2: Install dependencies

Run:

```bash
npm install
```

Wait until it finishes (you may see a few warnings; that’s OK).

### Step 3: Start the dev server

Run:

```bash
npm run dev
```

You should see something like:

```
  VITE v5.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
```

### Step 4: Open the site in your browser

- Open your browser and go to: **http://localhost:5173**
- You should see your “Build Your Dream Team” website.
- To stop the server: press **Ctrl+C** in the terminal.

---

## Part 2: Create a Git repository (optional but recommended)

This lets you save your code and connect it to GitHub for deployment.

### Step 1: Initialize Git

In the same folder, in the terminal, run:

```bash
git init
```

### Step 2: Stage and commit your files

```bash
git add .
git commit -m "Initial commit: Dream Team website"
```

### Step 3: Create a repo on GitHub and push

1. Go to [github.com](https://github.com) and sign in.
2. Click **“+”** → **“New repository”**.
3. Name it (e.g. `dream-team-website`), leave it **Public**, don’t add a README.
4. Copy the “Create repository” page URL (e.g. `https://github.com/YourUsername/dream-team-website.git`).
5. In your terminal, run (replace the URL with yours):

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

When asked, sign in to GitHub (browser or token). After this, your code is on GitHub.

---

## Part 3: Deploy the website online

You have two easy options. Pick one.

---

### Option A: Deploy with Vercel (recommended)

1. Go to [vercel.com](https://vercel.com) and sign in (use “Continue with GitHub” if you pushed to GitHub).
2. Click **“Add New…”** → **“Project”**.
3. **Import** your GitHub repository (e.g. `dream-team-website`).
4. Leave settings as default:
   - **Framework Preset:** Vite  
   - **Build Command:** `npm run build`  
   - **Output Directory:** `dist`
5. Click **“Deploy”**.
6. Wait 1–2 minutes. You’ll get a URL like `https://dream-team-website-xxx.vercel.app`. That’s your live site.

**If you didn’t use GitHub:**  
- In the project folder run: `npx vercel`  
- Follow the prompts and log in. Vercel will build and give you a URL.

---

### Option B: Deploy with Netlify

1. Go to [netlify.com](https://netlify.com) and sign in (e.g. with GitHub).
2. Click **“Add new site”** → **“Import an existing project”**.
3. Choose **GitHub** and select your repository.
4. Set:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **“Deploy site”**.
6. After the build, you’ll get a URL like `https://random-name-xxx.netlify.app`. That’s your live site.

**If you didn’t use GitHub:**  
- Drag and drop the **`dist`** folder onto [app.netlify.com/drop](https://app.netlify.com/drop).  
- To get `dist`, run `npm run build` in your project folder first; then upload the created `dist` folder.

---

## Membership sign-up form (emails to you)

The “Become a member” section sends submissions by email. To receive them:

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form and set the **notification email** to the address where you want to receive sign-ups (e.g. your personal email).
3. Copy your **form ID** (in the form action URL it’s the part after `/f/`, e.g. `xpwnzkzw`).
4. In the project folder, create a file named `.env` (copy from `.env.example`).
5. Set: `VITE_FORMSPREE_FORM_ID=your_form_id_here` (replace with your real form ID).
6. Restart the dev server (`npm run dev`). On deploy (Vercel/Netlify), add the same variable in the project’s environment settings.

Submissions will include the person’s email, their message, and all their answers (books, songs, hobbies, experience, etc.). Your notification email is never shown on the website.

---

## Quick reference

| Goal              | Command / action                          |
|-------------------|-------------------------------------------|
| Install packages  | `npm install`                             |
| Run locally      | `npm run dev` → open http://localhost:5173 |
| Build for deploy | `npm run build` (creates `dist` folder)   |
| Preview build    | `npm run preview`                         |
| First Git commit | `git init` → `git add .` → `git commit -m "Initial commit"` |
| Deploy           | Vercel or Netlify (see above)             |

If any step fails, copy the exact error message and ask for help with that step.
