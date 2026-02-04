# Fix Git push 403 (Permission denied)

You're logged in as **dineshnikum19** but pushing to **finnovahub-dev/excel-import-report**, so GitHub returns 403.

## Option 1: Push to your own repo (dineshnikum19)

1. On GitHub, create a new repo under your account (e.g. `excel-import-report`).
2. Update the remote and push:

   ```bash
   git remote set-url origin https://github.com/dineshnikum19/excel-import-report.git
   git push -u origin main
   ```

## Option 2: Push to finnovahub-dev (you must have access)

1. Log in to GitHub as **finnovahub-dev** (or an account that has write access to that org).
2. In browser: GitHub.com → Sign out → Sign in as finnovahub-dev.
3. In terminal, re-authenticate so Git uses that account:
   - **Git Credential Manager:** Next `git push` will open a browser; sign in as finnovahub-dev.
   - **Or** remove cached credentials so you're asked again:
     ```bash
     # Windows (Credential Manager)
     cmdkey /delete:git:https://github.com
     ```
4. Then run:

   ```bash
   git push -u origin main
   ```

## Option 3: Get access to finnovahub-dev repo

Ask a **finnovahub-dev** owner to add **dineshnikum19** as a collaborator (Settings → Collaborators). After you accept the invite, `git push -u origin main` will work.
