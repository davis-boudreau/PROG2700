Here is a simplified Mermaid **sequence diagram** from the perspective of a **new developer joining the team**, focusing only on the key onboarding and workflow steps:

```mermaid
sequenceDiagram
    autonumber

    participant Dev as New Developer
    participant ADO as Azure DevOps
    participant VS as VS Code
    participant Git as Local Git Repo
    participant Team as Team / Reviewers

    Dev->>ADO: Get access to project and repository
    Dev->>ADO: Copy repository clone URL
    Dev->>VS: Open VS Code
    Dev->>Git: Clone repository locally\n git clone <repo-url>
    Dev->>Git: Open repo folder\n cd repo && code .

    Dev->>Git: Fetch latest changes\n git fetch origin
    Dev->>Git: Switch to main\n git checkout main
    Dev->>Git: Pull latest main\n git pull origin main

    Dev->>Git: Create new feature branch\n git checkout -b feature/your-task
    Dev->>VS: Make code changes
    Dev->>Git: Check work\n git status
    Dev->>Git: Stage and commit changes\n git add .\n git commit -m "Your message"
    Dev->>Git: Push feature branch\n git push origin feature/your-task

    Dev->>ADO: Create Pull Request
    ADO->>Team: Request review and run checks
    Team-->>ADO: Approve or request changes

    alt Changes requested
        Dev->>VS: Update code
        Dev->>Git: Commit and push fixes
        Dev->>ADO: PR updates automatically
    else Approved
        ADO->>ADO: Merge PR into main
    end

    Dev->>Git: Switch back to main\n git checkout main
    Dev->>Git: Pull updated main\n git pull origin main
    Dev->>Git: Start next branch\n git checkout -b feature/next-task
```

This version keeps the story very clean:

* get access
* clone repo
* sync main
* create branch
* develop
* push
* open PR
* respond to review
* merge
* sync again

Here is an even more beginner-friendly version if you want it framed as **Day 1 developer onboarding workflow**:

```mermaid
sequenceDiagram
    autonumber

    participant Dev as New Developer
    participant ADO as Azure DevOps
    participant Git as Git / Local Repo
    participant Reviewer as Reviewer

    Dev->>ADO: Join project and access repo
    Dev->>ADO: Copy clone URL
    Dev->>Git: Clone repo
    Dev->>Git: Pull latest main
    Dev->>Git: Create feature branch
    Dev->>Git: Develop, commit, and push work
    Dev->>ADO: Open Pull Request
    ADO->>Reviewer: Request review and checks

    alt Feedback required
        Reviewer-->>Dev: Request changes
        Dev->>Git: Update branch and push again
        Dev->>ADO: PR refreshes
    else Approved
        Reviewer-->>ADO: Approve PR
        ADO->>ADO: Merge into main
    end

    Dev->>Git: Pull updated main
    Dev->>Git: Create next branch
```

For teaching, I would recommend the **first version** because it is still simple but includes the concrete development actions students actually perform.
