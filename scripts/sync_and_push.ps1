param(
  [string]$Branch = "main",
  [string]$Message = "Sync portfolio -> deploy and push",
  [switch]$CleanDeploy
)

function ExitWithError($msg){
  Write-Host "ERROR: $msg" -ForegroundColor Red
  exit 1
}

$repoRoot = Get-Location
$portfolio = Join-Path $repoRoot "portfolio"
$deploy = Join-Path $repoRoot "deploy"

if(-not (Test-Path $portfolio)) { ExitWithError "portfolio/ folder not found at $portfolio" }
if(-not (Test-Path $deploy)) { New-Item -ItemType Directory -Path $deploy | Out-Null }

# Optional cleanup of deploy folder (remove files not in portfolio)
if ($CleanDeploy) {
  Write-Host "Cleaning deploy folder..."
  Get-ChildItem -Path $deploy -Recurse -Force | Where-Object { $_.FullName -notlike "*$($repoRoot.Path)\.git*" } | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host "Copying portfolio to deploy..."
Get-ChildItem -Path $portfolio -Recurse -Force | ForEach-Object {
  $rel = $_.FullName.Substring($portfolio.Length + 1)
  $dest = Join-Path $deploy $rel
  $destDir = Split-Path -Parent $dest
  if(-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }
  Copy-Item -Path $_.FullName -Destination $dest -Force
}

Write-Host "Files copied." -ForegroundColor Green

# Commit and push
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -ErrorAction SilentlyContinue
# Ensure git available in PATH for this session (common Git for Windows locations)
if(-not (Get-Command git -ErrorAction SilentlyContinue)) {
  $possible = @('C:\Program Files\Git\cmd\git.exe','C:\Program Files\Git\bin\git.exe')
  foreach($p in $possible) {
    if(Test-Path $p) { $dir = Split-Path -Parent $p; $env:Path += ";$dir"; break }
  }
}
& "$repoRoot\scripts\push_deploy.ps1" -Branch $Branch -Message $Message
