@echo off
setlocal enabledelayedexpansion

echo ========================================================
echo        PUSH IMRAN BEYAN PORTFOLIO TO GITHUB
echo ========================================================
echo.

set "PATH=C:\Users\rjik\.gemini\antigravity\scratch\tools\git\cmd;%PATH%"
cd /d "C:\Users\rjik\.gemini\antigravity\scratch\imran-portfolio"

echo 1. Checking repository status...
git status
echo.

set /p REPO_NAME="Enter your GitHub repository name (default: imran17): "
if "!REPO_NAME!"=="" set REPO_NAME=imran17

set REPO_URL=https://github.com/imranbeyan162-collab/!REPO_NAME!.git

echo.
echo Target remote: !REPO_URL!
echo.

git remote remove origin >nul 2>&1
git remote add origin !REPO_URL!
git branch -M main

echo Pushing code to GitHub...
echo (A GitHub login window may pop up in your browser to authorize if not logged in)
echo.

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo  SUCCESS! Pushed to https://github.com/imranbeyan162-collab/!REPO_NAME!
    echo ========================================================
    echo.
    echo Next step to publish as imran17.vercel.app:
    echo 1. Open https://vercel.com/new
    echo 2. Import your '!REPO_NAME!' repository
    echo 3. Name your project: imran17
    echo 4. Click Deploy!
    echo.
) else (
    echo.
    echo [NOTE] Push failed. Make sure you created the repo on https://github.com/new first!
    echo.
)

pause
