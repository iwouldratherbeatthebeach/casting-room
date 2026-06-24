@echo off
setlocal
cd /d "%~dp0"

echo Building The Casting Room...
call npm run build:pages
if errorlevel 1 goto :error

echo.
echo Cloudflare may open your browser for sign-in.
call npx wrangler login
if errorlevel 1 goto :error

echo.
echo Deploying to Cloudflare...
call npx wrangler deploy
if errorlevel 1 goto :error

echo.
echo Deployment complete. Cloudflare printed the live URL above.
pause
exit /b 0

:error
echo.
echo Deployment failed. Review the message above.
pause
exit /b 1
