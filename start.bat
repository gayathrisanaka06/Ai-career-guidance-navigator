@echo off
title AI Career Guidance Navigator Launch
echo ==========================================================
echo Starting AI Career Guidance Navigator
echo ==========================================================

set "PATH=C:\Users\Gayathri\.nodejs\node-v20.18.0-win-x64;%PATH%"

echo [1/2] Starting FastAPI Backend on http://localhost:8000 ...
start "Navigator Backend (FastAPI)" cmd /k "set PYTHONPATH=backend && .\backend\venv\Scripts\python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

echo [2/2] Starting Next.js Frontend on http://localhost:3000 ...
start "Navigator Frontend (Next.js)" cmd /k "cd frontend && npm run dev"

echo Done!
echo Frontend: http://localhost:3000
echo Backend Docs: http://localhost:8000/docs
