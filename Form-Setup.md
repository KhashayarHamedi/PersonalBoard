# Get the “Become a member” form to send to leniwoodman@gmail.com

The form uses **Formspree**. Until you complete these steps, submissions will not be sent to any email.

---

## 1. Create a Formspree account and form

1. Go to **https://formspree.io** and sign up (free).
2. Click **“New form”**.
3. Give it a name (e.g. “My Personal Board – Members”).
4. In the form settings, set **“Email to receive submissions”** to:  
   **leniwoodman@gmail.com**  
   (This is where every submission will be sent. Formspree does not show this address on your website.)

---

## 2. Copy your form ID

After you create the form, Formspree shows a **form endpoint**, like:

`https://formspree.io/f/xpwnzkzw`

The **form ID** is the part after `/f/` — in this example it’s **xpwnzkzw**.  
Copy that ID (yours will be different).

---

## 3. Add the form ID to your project

1. In your project folder (the same folder as `package.json`), create a file named **`.env`** (with the dot at the start).
2. Open `.env` in a text editor and add this line (replace with your real form ID):

   ```
   VITE_FORMSPREE_FORM_ID=xpwnzkzw
   ```

3. Save the file.
4. **Restart the dev server**: stop it (Ctrl+C) and run `npm run dev` again.

---

## 4. Test the form

1. Open your site (e.g. http://localhost:5173).
2. Scroll to **“Become a member”** and fill in at least the email field.
3. Click **“Send my answers”**.
4. Check the inbox for **leniwoodman@gmail.com** (and spam/junk if needed). You should receive an email from Formspree with the submission.

---

## Deploying (Vercel / Netlify)

On your hosting dashboard (Vercel or Netlify), add an **environment variable**:

- **Name:** `VITE_FORMSPREE_FORM_ID`  
- **Value:** your form ID (the same one you put in `.env`)

Redeploy the site so the form works in production too.
