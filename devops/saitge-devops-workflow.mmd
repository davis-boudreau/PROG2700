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
    Dev->>Git: Clone repository locally: git clone <repo-url>
    Dev->>Git: Open repo folder: cd repo && code .

    Dev->>Git: Fetch latest changes: git fetch origin
    Dev->>Git: Switch to main: git checkout main
    Dev->>Git: Pull latest main: git pull origin main

    Dev->>Git: Create new feature branch: git checkout -b workitem_type/AB-taskID-short-description
    Dev->>VS: Make code changes
    Dev->>Git: Check work: git status
    Dev->>Git: Stage and commit changes: git add .\n git commit -m "AB-workorderID-Short Action Description"
    Dev->>Git: Push feature branch: git push origin workitem_type/AB-taskID-short-description

    Dev->>ADO: Create Pull Request
    ADO->>Team: Request review and run checks
    Team-->>ADO: Approve or request changes

    alt Main branch changed before PR is approved
        Dev->>Git: Fetch latest changes: git fetch origin
        Dev->>Git: Switch to feature branch: git checkout workitem_type/AB-taskID-short-description
        Dev->>Git: Rebase onto latest main: git rebase origin/main
        alt Rebase conflict occurs
            Dev->>VS: Resolve conflicts in VS Code
            Dev->>Git: Mark resolved files: git add .
            Dev->>Git: Continue rebase: git rebase --continue
        else Rebase successful
            Git-->>Dev: Feature branch now sits on updated main
        end
        Dev->>Git: Force-push rebased branch: git push --force-with-lease origin workitem_type/AB-taskID-short-description
        Dev->>ADO: PR updates automatically with rebased commits
        ADO->>Team: Re-run checks if required
    end

    alt Changes requested
        Dev->>VS: Update code
        Dev->>Git: Stage and commit fixes: git add .\n git commit -m "AB-workorderID-Short Action Description"

        alt Main changed again while fixes are in progress
            Dev->>Git: Fetch latest main: git fetch origin
            Dev->>Git: Rebase fixes onto latest main: git rebase origin/main
            alt Rebase conflict occurs
                Dev->>VS: Resolve conflicts in VS Code
                Dev->>Git: Mark resolved files: git add .
                Dev->>Git: Continue rebase: git rebase --continue
            else Rebase successful
                Git-->>Dev: Branch updated cleanly
            end
            Dev->>Git: Force-push updated branch: git push --force-with-lease origin workitem_type/AB-taskID-short-description
        else Main has not changed
            Dev->>Git: Push fixes normally: git push origin workitem_type/AB-taskID-short-description
        end

        Dev->>ADO: PR updates automatically
    else Approved
        ADO->>ADO: Merge PR into main
    end

    Dev->>Git: Switch back to main: git checkout main
    Dev->>Git: Pull updated main: git pull origin main
    Dev->>Git: Start next branch: git checkout -b workitem_type/AB-taskID-short-description