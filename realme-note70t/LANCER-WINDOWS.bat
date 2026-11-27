@echo off
setlocal
cd /d "%~dp0"
title Nettoyage realme Note 70T (RMX5313)

echo ==========================================================
echo   Nettoyage realme Note 70T - reversible, sans root
echo ==========================================================
echo.

rem --- 1. Trouver ADB (sinon le telecharger depuis Google) ---
set "ADB=adb"
where adb >nul 2>&1
if not errorlevel 1 goto adb_ok

set "ADB=platform-tools\adb.exe"
if exist "platform-tools\adb.exe" goto adb_ok

echo Outils ADB absents : telechargement depuis le site officiel Google...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$ProgressPreference='SilentlyContinue'; Invoke-WebRequest -Uri 'https://dl.google.com/android/repository/platform-tools-latest-windows.zip' -OutFile 'platform-tools.zip'; Expand-Archive -Path 'platform-tools.zip' -DestinationPath '.' -Force; Remove-Item 'platform-tools.zip'"
if not exist "platform-tools\adb.exe" (
  echo.
  echo ERREUR : telechargement impossible. Verifiez la connexion Internet,
  echo ou telechargez "SDK Platform-Tools for Windows" sur developer.android.com
  echo et decompressez-le dans ce dossier.
  pause
  exit /b 1
)

:adb_ok
if not exist "debloat.sh" (
  echo ERREUR : debloat.sh introuvable. Decompressez TOUT le ZIP avant de lancer.
  pause
  exit /b 1
)

rem --- 2. Attendre le telephone ---
%ADB% start-server >nul 2>&1
echo Branchez le telephone en USB (debogage USB active).
echo Sur le telephone, acceptez "Autoriser le debogage USB".
echo.
:wait
%ADB% get-state 2>nul | find "device" >nul
if not errorlevel 1 goto connected
echo   En attente du telephone...
timeout /t 3 >nul
goto wait

:connected
set "MODEL=inconnu"
for /f "delims=" %%m in ('%ADB% shell getprop ro.product.model') do set "MODEL=%%m"
echo Telephone detecte : %MODEL%
echo %MODEL% | find /i "RMX5313" >nul
if not errorlevel 1 goto model_ok
echo.
echo ATTENTION : ce script est prevu pour le RMX5313 (realme Note 70T).
choice /c ON /n /m "Continuer quand meme ? (O/N) "
if errorlevel 2 exit /b 0

:model_ok
%ADB% push debloat.sh /data/local/tmp/debloat.sh >nul
if errorlevel 1 (
  echo ERREUR : envoi du script vers le telephone impossible.
  pause
  exit /b 1
)

rem --- 3. Menu ---
:menu
echo.
echo ----------------------------------------------------------
echo   1. Simulation (ne modifie rien) - A FAIRE EN PREMIER
echo   2. Appliquer le nettoyage
echo   3. Appliquer + liste optionnelle (Themes, recherche, Jeux, Cloud)
echo   4. Tout restaurer (annule le nettoyage)
echo   5. Quitter
echo ----------------------------------------------------------
choice /c 12345 /n /m "Votre choix : "
if errorlevel 5 goto end
if errorlevel 4 (set "MODE=restore" & goto run)
if errorlevel 3 (set "MODE=optional" & goto run)
if errorlevel 2 (set "MODE=apply" & goto run)
set "MODE=dry"

:run
echo.
%ADB% shell sh /data/local/tmp/debloat.sh %MODE%
echo.
if /i "%MODE%"=="apply" echo Termine. Redemarrez le telephone pour finir.
if /i "%MODE%"=="optional" echo Termine. Redemarrez le telephone pour finir.
pause
goto menu

:end
endlocal
exit /b 0
