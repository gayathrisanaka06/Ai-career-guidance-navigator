# AI Career Guidance Navigator - Full Stack Launch Script
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Starting AI Career Guidance Navigator (Full Stack Agent) " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan

$env:Path = "C:\Users\Gayathri\.nodejs\node-v20.18.0-win-x64;$env:Path"

# 1. Start FastAPI Backend
Write-Host "[1/2] Launching Multi-Agent FastAPI Backend on http://localhost:8000..." -ForegroundColor Yellow
$backendJob = Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", "`$env:PYTHONPATH='backend'; .\backend\venv\Scripts\python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload" -PassThru

# 2. Start Next.js Frontend
Write-Host "[2/2] Launching Next.js 14 Frontend on http://localhost:3000..." -ForegroundColor Yellow
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", "`$env:Path='C:\Users\Gayathri\.nodejs\node-v20.18.0-win-x64;' + `$env:Path; cd frontend; npm run dev"

Write-Host ""
Write-Host "Application is active!" -ForegroundColor Green
Write-Host "👉 Frontend Web App: http://localhost:3000" -ForegroundColor Cyan
Write-Host "👉 Backend API Docs: http://localhost:8000/docs" -ForegroundColor Cyan
