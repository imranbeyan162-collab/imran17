@echo off
set "PATH=C:\Users\rjik\.gemini\antigravity\scratch\tools\git\cmd;%PATH%"
cd /d "C:\Users\rjik\.gemini\antigravity\scratch\imran-portfolio"
git config --global user.name "imranbeyan162-collab"
git config --global user.email "imranbeyan@gmail.com"
git init
git branch -M main
git add .
git commit -m "Initial commit: Imran Beyan personal portfolio website"
git status
git log -1 --oneline
