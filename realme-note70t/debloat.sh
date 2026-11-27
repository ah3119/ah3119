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
