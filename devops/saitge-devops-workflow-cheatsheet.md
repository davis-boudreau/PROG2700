## Recommended Git command set for the workflow

### Initial setup

```bash
git clone https://dev.azure.com/org/project/_git/repo
cd repo
code .
```

### Get current changes

```bash
git fetch origin
git status
```

### Switch to branch

```bash
git checkout feature/event-search
```

### Create local tracking branch if needed

```bash
git checkout -b feature/event-search --track origin/feature/event-search
```

### Stage and commit

```bash
git add .
git commit -m "Implement event search improvements"
```

### Push branch

```bash
git push origin feature/event-search
```

### Rebase onto latest main

```bash
git checkout main
git fetch
git pull
git checkout feature/event-search
git rebase origin/main
```

### Resolve rebase conflicts

```bash
git status
git add .
git rebase --continue
```

### Push after rebase

```bash
git push --force-with-lease origin feature/event-search
```

### Update local main after merge

```bash
git checkout main
git pull origin main
```

### Start next branch

```bash
git checkout -b feature/next-task
```

## Best-practice note for branch naming pattern

For professional team use, I recommend this branch naming pattern:

```bash
feature/short-description
bugfix/short-description
hotfix/short-description
chore/short-description
```

Example:

```bash
feature/event-discovery-refactor
bugfix/pagination-filter-reset
```

---

# Recommended Best Practice

## Create the Branch Locally (VS Code / Git)

Typical professional workflow:

1. Update `main`
2. Create the branch locally
3. Start work
4. Push the branch
5. Azure DevOps automatically recognizes the branch

Example:

```bash
git checkout main
git pull origin main
git checkout -b feature/event-search
git push -u origin feature/event-search
```

After the push:

* Azure DevOps will **automatically create the remote branch**
* The branch becomes visible under **Repos → Branches**
* You can then create a **Pull Request**

---

# Why Local Branch Creation is Preferred

### 1️⃣ Keeps `main` up to date first

Developers must update their local `main` before branching.

```bash
git checkout main
git pull origin main
```

This reduces merge conflicts later.

---

### 2️⃣ Ensures clean Git history

When branches are created from updated `main`, rebases become simpler.

---

### 3️⃣ Faster developer workflow

Developers stay inside **VS Code + Git** instead of switching to the browser.

Typical dev loop:

```
VS Code
 ├─ create branch
 ├─ develop
 ├─ commit
 ├─ push
 └─ PR in Azure DevOps
```

---
