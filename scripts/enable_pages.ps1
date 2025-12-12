param(
  [Parameter(Mandatory=$true)]
  [string]$Owner,
  [Parameter(Mandatory=$true)]
  [string]$Repo,
  [string]$Branch = "gh-pages",
  [string]$Path = "/",
  [string]$Token = $env:GITHUB_TOKEN
)

function ExitWithError($msg){
  Write-Host "ERROR: $msg" -ForegroundColor Red
  exit 1
}

if(-not $Token){
  ExitWithError "A GitHub token is required. Set it via GITHUB_TOKEN env var or pass -Token explicitly."
}

$uri = "https://api.github.com/repos/$Owner/$Repo/pages"
$body = @{ source = @{ branch = $Branch; path = $Path } }

try {
  Write-Host "Enabling GitHub Pages for $Owner/$Repo with branch '$Branch' and path '$Path'..."
  $headers = @{
    Authorization = "token $Token"
    Accept = "application/vnd.github+json"
    'User-Agent' = "vibe_coding-agent"
  }
  $resp = Invoke-RestMethod -Uri $uri -Method Put -Headers $headers -Body ($body | ConvertTo-Json -Depth 6)
  Write-Host "Success: Site configured. HTML URL: $($resp.html_url)" -ForegroundColor Green
} catch {
  Write-Host "API error: $_" -ForegroundColor Red
  ExitWithError "Failed to configure GitHub Pages. Ensure token has repo permission." 
}
