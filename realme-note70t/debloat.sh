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
