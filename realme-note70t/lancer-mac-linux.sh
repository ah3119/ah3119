#!/bin/sh
# Nettoyage realme Note 70T (RMX5313) - lanceur Mac / Linux
# Utilisation : ouvrir un terminal dans ce dossier, puis :  sh lancer-mac-linux.sh
cd "$(dirname "$0")" || exit 1

echo "=========================================================="
echo "  Nettoyage realme Note 70T - reversible, sans root"
echo "=========================================================="

# --- 1. Trouver ADB (sinon le telecharger depuis Google) ---
if command -v adb >/dev/null 2>&1; then
  ADB=adb
elif [ -x ./platform-tools/adb ]; then
  ADB=./platform-tools/adb
else
  case "$(uname -s)" in
    Darwin) OS=darwin ;;
    *)      OS=linux ;;
  esac
  echo "Outils ADB absents : telechargement depuis le site officiel Google..."
  curl -fL -o platform-tools.zip "https://dl.google.com/android/repository/platform-tools-latest-$OS.zip" \
    && unzip -oq platform-tools.zip && rm -f platform-tools.zip
  if [ ! -x ./platform-tools/adb ]; then
    echo "ERREUR : telechargement impossible (verifiez Internet, curl et unzip)."
    exit 1
  fi
  ADB=./platform-tools/adb
fi

[ -f debloat.sh ] || { echo "ERREUR : debloat.sh introuvable. Decompressez tout le ZIP."; exit 1; }

# --- 2. Attendre le telephone ---
"$ADB" start-server >/dev/null 2>&1
echo "Branchez le telephone en USB (debogage USB active)."
echo "Sur le telephone, acceptez \"Autoriser le debogage USB\"."
until "$ADB" get-state 2>/dev/null | grep -q '^device'; do
  echo "  En attente du telephone..."
  sleep 3
done

MODEL="$("$ADB" shell getprop ro.product.model 2>/dev/null | tr -d '\r')"
echo "Telephone detecte : ${MODEL:-inconnu}"
case "$MODEL" in
  *RMX5313*) ;;
  *) printf "ATTENTION : script prevu pour le RMX5313. Continuer ? (o/N) "
     read -r rep; case "$rep" in o|O) ;; *) exit 0 ;; esac ;;
esac

"$ADB" push debloat.sh /data/local/tmp/debloat.sh >/dev/null || { echo "ERREUR : envoi impossible."; exit 1; }

# --- 3. Menu ---
while :; do
  echo
  echo "----------------------------------------------------------"
  echo "  1. Simulation (ne modifie rien) - A FAIRE EN PREMIER"
  echo "  2. Appliquer le nettoyage"
  echo "  3. Appliquer + liste optionnelle (Themes, recherche, Jeux, Cloud)"
  echo "  4. Tout restaurer (annule le nettoyage)"
  echo "  5. Quitter"
  echo "----------------------------------------------------------"
  printf "Votre choix : "
  read -r c
  case "$c" in
    1) MODE=dry ;;
    2) MODE=apply ;;
    3) MODE=optional ;;
    4) MODE=restore ;;
    5) exit 0 ;;
    *) continue ;;
  esac
  echo
  "$ADB" shell sh /data/local/tmp/debloat.sh "$MODE"
  case "$MODE" in apply|optional) echo "Termine. Redemarrez le telephone pour finir." ;; esac
done
