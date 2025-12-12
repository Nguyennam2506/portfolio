# Push-deploy script for the repo
# Usage: Open PowerShell in repo root and run:
#    .\scripts\push_deploy.ps1 -Branch main -Message "Your commit message"
param(
  [string]$Branch = "main",
  [string]$Message = "Cleanup: remove duplicates & add docs-ready site",
  [string]$Remote = "origin"
)

function ExitWithError($msg){
  Write-Host "ERROR: $msg" -ForegroundColor Red
  exit 1
}

# Check git installed
if(-not (Get-Command git -ErrorAction SilentlyContinue)){
  ExitWithError "git not found. Please install Git: https://git-scm.com/downloads"
}

# Ensure repo root
$root = Get-Location
Write-Host "Running git commands in: $root"

# Check if inside a git repo
git rev-parse --is-inside-work-tree > $null 2> $null
if ($LASTEXITCODE -ne 0) {
  Write-Host "No git repo initialized. Initializing repo..."
  git init
  if ($LASTEXITCODE -ne 0) { ExitWithError "Failed to init git repo" }
}

# Stage changes
git add -A
if ($LASTEXITCODE -ne 0) { ExitWithError "git add failed" }

# Commit
# Ensure user identity is set for commit
$null = git config user.name 2>$null
if ($LASTEXITCODE -ne 0) { git config user.name "Vibe Coding Bot" }
$null = git config user.email 2>$null
if ($LASTEXITCODE -ne 0) { git config user.email "noreply@example.com" }

$commitResult = git commit -m "$Message" 2>&1
if($LASTEXITCODE -ne 0){
  if($commitResult -like '*nothing to commit*'){
    Write-Host "No changes to commit. Skipping commit step." -ForegroundColor Yellow
  } else {
    Write-Host $commitResult
    ExitWithError "git commit failed"
  }
}

# Check remote
$remoteCheck = git remote get-url $Remote 2>$null
if($LASTEXITCODE -ne 0){
  Write-Host "Remote '$Remote' is not configured." -ForegroundColor Yellow
  Write-Host "Please configure the remote and run again, e.g."
  Write-Host "  git remote add origin https://github.com/youruser/yourrepo.git"
  exit 0
}

# Push
Write-Host "Pushing to $Remote/$Branch..."
git push $Remote $Branch
if ($LASTEXITCODE -ne 0) { ExitWithError "git push failed" }

Write-Host "Done: changes pushed to $Remote/$Branch" -ForegroundColor Green
