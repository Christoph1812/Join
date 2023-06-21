@REM to upload into repositories, before that, the current version is updated with pull - just write "./up.bat -commit text- into the Terminal


git pull
git add .
git commit -m "%*"
git push
