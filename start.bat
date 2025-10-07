@echo off
setlocal

REM Guarda la ruta donde está este .bat
set ROOT=%~dp0

echo Iniciando backend...
start cmd /k "cd /d %ROOT%backend-django && call ..\env\Scripts\activate.bat && python manage.py runserver"

echo Iniciando frontend...
start cmd /k "cd /d %ROOT%frontend-react && npm start"

endlocal





