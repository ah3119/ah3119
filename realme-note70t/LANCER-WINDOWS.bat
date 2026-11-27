@echo off
setlocal
cd /d "%~dp0"
title Nettoyage realme Note 70T (RMX5313)

echo ==========================================================
echo   Nettoyage realme Note 70T - reversible, sans root
echo   (fichier autonome : aucun autre fichier necessaire)
echo ==========================================================
echo.

rem --- 1. Extraire le script telephone integre a la fin de ce fichier ---
set "SELF=%~f0"
powershell -NoProfile -ExecutionPolicy Bypass -Command "$l=Get-Content -LiteralPath $env:SELF; $i=[array]::IndexOf($l,'__DEBLOAT_SH_CI_DESSOUS__'); if($i -lt 0){exit 1}; $s=($l[($i+1)..($l.Count-1)] -join [char]10)+[char]10; [IO.File]::WriteAllText((Join-Path $PWD 'debloat.sh'),$s)"
if errorlevel 1 goto extract_fail
if not exist "debloat.sh" goto extract_fail

rem --- 2. Trouver ADB (sinon le telecharger depuis Google) ---
set "ADB=adb"
where adb >nul 2>&1
if not errorlevel 1 goto adb_ok

set "ADB=platform-tools\adb.exe"
if exist "platform-tools\adb.exe" goto adb_ok

echo Outils ADB absents : telechargement depuis le site officiel Google...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$ProgressPreference='SilentlyContinue'; Invoke-WebRequest -Uri 'https://dl.google.com/android/repository/platform-tools-latest-windows.zip' -OutFile 'platform-tools.zip'; Expand-Archive -Path 'platform-tools.zip' -DestinationPath '.' -Force; Remove-Item 'platform-tools.zip'"
if exist "platform-tools\adb.exe" goto adb_ok
echo.
echo ERREUR : telechargement d'ADB impossible. Verifiez la connexion Internet,
echo ou telechargez "SDK Platform-Tools for Windows" sur developer.android.com
echo et decompressez-le a cote de ce fichier.
pause
exit /b 1

:adb_ok
rem --- 3. Attendre le telephone ---
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

rem --- 4. Menu ---
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

:extract_fail
echo ERREUR : impossible de preparer le script. Copiez ce fichier dans un
echo dossier ou vous avez le droit d'ecrire (Bureau, Documents) et relancez.
pause
exit /b 1

:end
endlocal
exit /b 0
__DEBLOAT_SH_CI_DESSOUS__
#!/system/bin/sh
# ============================================================================
# Nettoyage realme Note 70T (RMX5313) - realme UI, sans root
# Methode : DESACTIVATION (pm disable-user). 100 % reversible avec "restore".
# Ne touche PAS aux mises a jour systeme, au Play Store, a l'appareil photo,
# au telephone, aux SMS, au clavier ni au launcher.
#
# Utilisation (PC + ADB, depuis le dossier du script) :
#   adb push debloat.sh /data/local/tmp/
#   adb shell sh /data/local/tmp/debloat.sh            -> SIMULATION (rien n'est modifie)
#   adb shell sh /data/local/tmp/debloat.sh apply      -> applique
#   adb shell sh /data/local/tmp/debloat.sh restore    -> reactive tout
#   adb shell sh /data/local/tmp/debloat.sh optional   -> applique aussi la liste optionnelle
# ============================================================================

MODE="${1:-dry}"

# --- Liste principale : pubs, tracking, magasins et applis doublons ----------
CORE="
com.opos.ads
com.nearme.statistics.rom
com.heytap.market
com.oppo.market
com.nearme.gamecenter
com.heytap.browser
com.heytap.music
com.heytap.pictorial
com.coloros.assistantscreen
com.glance.internet
com.glance.lockscreenRealme
com.glance.android
com.facebook.appmanager
com.facebook.services
com.facebook.system
com.netflix.partner.activation
"

# --- Liste optionnelle : utile mais avec effets de bord possibles ------------
# themestore    : peut empecher de changer de theme / certains fonds d'ecran
# quicksearchbox: la recherche en glissant vers le bas sur l'accueil disparait
# gamespaceui   : espace jeux (perte du mode performance en jeu)
# heytap.cloud  : sauvegarde cloud realme (la sauvegarde Google reste active)
OPTIONAL="
com.heytap.themestore
com.heytap.quicksearchbox
com.coloros.gamespaceui
com.heytap.cloud
"

INSTALLED="$(pm list packages 2>/dev/null)"
ENABLED_ONLY="$(pm list packages -e 2>/dev/null)"

is_installed() { echo "$INSTALLED" | grep -qx "package:$1"; }
is_enabled()   { echo "$ENABLED_ONLY" | grep -qx "package:$1"; }

case "$MODE" in
  dry|apply)       LIST="$CORE" ;;
  optional)        LIST="$CORE $OPTIONAL" ;;
  restore)         LIST="$CORE $OPTIONAL" ;;
  *) echo "Mode inconnu : $MODE (dry | apply | optional | restore)"; exit 1 ;;
esac

ok=0; skip=0; fail=0
echo "== Mode : $MODE =="

for p in $LIST; do
  if ! is_installed "$p"; then
    skip=$((skip+1)); continue
  fi
  case "$MODE" in
    dry)
      if is_enabled "$p"; then echo "[a desactiver] $p"; else echo "[deja off]    $p"; fi
      ok=$((ok+1)) ;;
    apply|optional)
      if ! is_enabled "$p"; then echo "[deja off]    $p"; ok=$((ok+1)); continue; fi
      if pm disable-user --user 0 "$p" >/dev/null 2>&1; then
        echo "[OK off]      $p"; ok=$((ok+1))
      else
        echo "[refuse]      $p (protege par le systeme, ignore)"; fail=$((fail+1))
      fi ;;
    restore)
      if pm enable "$p" >/dev/null 2>&1; then
        echo "[OK on]       $p"; ok=$((ok+1))
      else
        echo "[echec]       $p"; fail=$((fail+1))
      fi ;;
  esac
done

echo "== Traites : $ok | Absents (ignores) : $skip | Refuses/echecs : $fail =="
[ "$MODE" = "dry" ] && echo "Simulation seulement. Pour appliquer : option 2 du menu (ou argument 'apply')."
exit 0
