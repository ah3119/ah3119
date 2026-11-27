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
rem --- 3. Attendre le telephone (et dire precisement ce qui bloque) ---
%ADB% start-server >nul 2>&1
echo Branchez le telephone en USB (debogage USB active).
echo Sur le telephone, acceptez "Autoriser le debogage USB".
echo.
echo   Le telephone n'est pas reconnu en USB ? Appuyez sur W pour le connecter en Wi-Fi.
echo.
set /a TRIES=0
set "LAST="
:wait
set "STATE=aucun"
for /f "skip=1 tokens=2" %%s in ('%ADB% devices 2^>nul') do set "STATE=%%s"
if "%STATE%"=="device" goto connected
set /a TRIES+=1
if "%STATE%"=="%LAST%" goto wait_tip
set "LAST=%STATE%"
if "%STATE%"=="aucun" echo   Aucun telephone detecte : verifiez le cable, le mode "Transfert de fichiers" et le debogage USB.
if "%STATE%"=="unauthorized" echo   Telephone detecte mais NON AUTORISE : deverrouillez-le et acceptez "Autoriser le debogage USB".
if "%STATE%"=="offline" echo   Telephone hors ligne : debranchez puis rebranchez le cable.
if not "%STATE%"=="aucun" if not "%STATE%"=="unauthorized" if not "%STATE%"=="offline" echo   Etat du telephone : %STATE%
:wait_tip
if %TRIES%==20 (
  echo.
  echo   Toujours rien apres 1 minute. A verifier :
  echo    - Options pour les developpeurs : Debogage USB active
  echo    - Notification USB du telephone : choisir "Transfert de fichiers"
  echo    - Autre cable ^(celui d'origine^) sur un port USB direct du PC
  echo    - Le telephone apparait-il dans "Ce PC" ? Sinon : cable ou port en cause.
  echo    - OU appuyez sur W pour connecter le telephone en Wi-Fi, sans cable ni pilote.
  echo   La fenetre continue d'attendre.
  echo.
)
choice /c AW /t 3 /d A /n >nul
if errorlevel 2 goto wifi
goto wait

:wifi
echo.
echo ===================== CONNEXION WI-FI =====================
echo  Le PC et le telephone doivent etre sur le MEME reseau Wi-Fi.
echo  Sur le telephone : Options pour les developpeurs ^> Debogage sans fil
echo  ^> activez-le, puis touchez "Associer l'appareil avec un code d'association".
echo.
set "PAIR="
set "CODE="
set "CONN="
set /p "PAIR=Adresse IP et port affiches SOUS le code (ex. 192.168.1.20:37123) : "
if "%PAIR%"=="" goto wifi
set /p "CODE=Code d'association a 6 chiffres : "
%ADB% pair %PAIR% %CODE%
echo.
echo  Fermez la petite fenetre du code. Sur l'ecran "Debogage sans fil",
echo  lisez "Adresse IP et port" en haut (le port est DIFFERENT du precedent).
set /p "CONN=Adresse IP et port : "
if "%CONN%"=="" goto wifi
%ADB% connect %CONN%
echo.
echo  Si une fenetre s'affiche sur le telephone, acceptez-la.
set /a TRIES=0
set "LAST="
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
echo   6. Exporter la liste des applis (pour analyse)
echo ----------------------------------------------------------
choice /c 123456 /n /m "Votre choix : "
if errorlevel 6 goto export
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

:export
set "OUTF=liste-applis-note70t.txt"
echo.
echo Export en cours...
(
  echo === TELEPHONE ===
  %ADB% shell getprop ro.product.model
  %ADB% shell getprop ro.build.display.id
  %ADB% shell getprop ro.build.version.release
  echo.
  echo === APPLIS INSTALLEES PAR L'UTILISATEUR ===
  %ADB% shell pm list packages -3 | sort
  echo.
  echo === APPLIS DESACTIVEES ===
  %ADB% shell pm list packages -d | sort
  echo.
  echo === APPLIS SYSTEME ===
  %ADB% shell pm list packages -s | sort
) > "%OUTF%" 2>&1
echo Liste enregistree dans %CD%\%OUTF%
echo Elle s'ouvre dans le Bloc-notes : Ctrl+A puis Ctrl+C pour la copier.
start "" notepad "%OUTF%"
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
# Methode : retrait pour l'utilisateur (pm uninstall -k --user 0), avec
# desactivation en secours. Chaque action est VERIFIEE apres coup.
# 100 % reversible avec "restore" : rien n'est efface du systeme.
# Ne touche PAS aux mises a jour systeme, au Play Store, a l'appareil photo,
# au telephone, aux SMS, au clavier ni au launcher.
#
# Utilisation (PC + ADB) :
#   adb push debloat.sh /data/local/tmp/
#   adb shell sh /data/local/tmp/debloat.sh            -> SIMULATION (rien n'est modifie)
#   adb shell sh /data/local/tmp/debloat.sh apply      -> applique
#   adb shell sh /data/local/tmp/debloat.sh optional   -> applique aussi la liste optionnelle
#   adb shell sh /data/local/tmp/debloat.sh restore    -> remet tout comme avant
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

# Etat reel d'un paquet : absent | retire | off | actif
state() {
  pm list packages -u "$1" 2>/dev/null | grep -qx "package:$1" || { echo absent; return; }
  pm list packages "$1" 2>/dev/null | grep -qx "package:$1" || { echo retire; return; }
  pm list packages -d "$1" 2>/dev/null | grep -qx "package:$1" && { echo off; return; }
  echo actif
}

case "$MODE" in
  dry|apply)       LIST="$CORE" ;;
  optional)        LIST="$CORE $OPTIONAL" ;;
  restore)         LIST="$CORE $OPTIONAL" ;;
  *) echo "Mode inconnu : $MODE (dry | apply | optional | restore)"; exit 1 ;;
esac

ok=0; skip=0; fail=0
echo "== Mode : $MODE =="

for p in $LIST; do
  st="$(state "$p")"
  if [ "$st" = absent ]; then skip=$((skip+1)); continue; fi

  case "$MODE" in
    dry)
      case "$st" in
        actif)  echo "[a retirer]    $p" ;;
        off)    echo "[deja off]     $p" ;;
        retire) echo "[deja retire]  $p" ;;
      esac
      ok=$((ok+1)) ;;

    apply|optional)
      case "$st" in
        retire) echo "[deja retire]  $p"; ok=$((ok+1)); continue ;;
        off)    echo "[deja off]     $p"; ok=$((ok+1)); continue ;;
      esac
      pm uninstall -k --user 0 "$p" >/dev/null 2>&1
      if [ "$(state "$p")" = retire ]; then
        echo "[OK retire]    $p"; ok=$((ok+1)); continue
      fi
      pm disable-user --user 0 "$p" >/dev/null 2>&1
      if [ "$(state "$p")" = off ]; then
        echo "[OK off]       $p"; ok=$((ok+1))
      else
        echo "[bloque]       $p (protege par realme, ignore)"; fail=$((fail+1))
      fi ;;

    restore)
      if [ "$st" = retire ]; then
        cmd package install-existing --user 0 "$p" >/dev/null 2>&1 \
          || pm install-existing --user 0 "$p" >/dev/null 2>&1
      fi
      pm enable "$p" >/dev/null 2>&1
      if [ "$(state "$p")" = actif ]; then
        echo "[OK actif]     $p"; ok=$((ok+1))
      else
        echo "[echec]        $p"; fail=$((fail+1))
      fi ;;
  esac
done

echo "== Traites : $ok | Absents (ignores) : $skip | Bloques/echecs : $fail =="
[ "$MODE" = "dry" ] && echo "Simulation seulement. Pour appliquer : option 2 du menu (ou argument 'apply')."
exit 0
