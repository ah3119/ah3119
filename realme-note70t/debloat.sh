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
#   adb shell sh /data/local/tmp/debloat.sh gadgets    -> SUPPRIME les applis gadgets (definitif)
#   adb shell sh /data/local/tmp/debloat.sh jeux       -> SUPPRIME les jeux, Temu, Amazon (definitif)
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
com.taboola.scoop
com.taboola.mip
com.amazon.appmanager
"

# --- Liste optionnelle : utile mais avec effets de bord possibles ------------
# themestore / customization : changer de theme peut ne plus marcher
# quicksearchbox : la recherche en glissant vers le bas sur l'accueil disparait
# gamespace      : espace jeux (perte du mode performance en jeu)
# heytap.cloud   : sauvegarde cloud realme (la sauvegarde Google reste active)
# as.music       : lecteur de musique realme
# oplus.commercial : "contenus commerciaux" realme, role exact non documente
# oplus.stdid    : identifiant publicitaire realme (OAID)
OPTIONAL="
com.heytap.themestore
com.heytap.quicksearchbox
com.oppo.quicksearchbox
com.coloros.gamespaceui
com.oplus.gamespace
com.heytap.cloud
com.realme.as.music
com.oplus.commercial
com.oplus.stdid
"

# --- Applis gadgets installees, typiques des pubs plein ecran ----------------
# Suppression DEFINITIVE (reinstallation possible depuis le Play Store).
GADGETS="
com.flashlight.nova.launcher.zoom.version.light.dark
com.emoticon.diyer.qpjgn.free.game.launcher
com.perfect.asmr.tidy.free.aspgg.game.launcher
com.track.phone.locate.device.clap.hand
com.smart.tool.instant.scan
com.facechanger.agingapp.futureself
com.timewarp.scanface.selfiephotoeditor.videopopulartiktok
com.scary.prankcall.horror.fake.video
video.clip.call.fake.chat.message.prank
com.finger.spinner.glow.magic
com.lip.pose.filter.challenge
com.trending.tik.tap.game.challenge
"

# --- Jeux + Temu + Amazon (demande explicite du proprietaire, 27/11/2026) ----
# Suppression DEFINITIVE (reinstallation possible depuis le Play Store).
# Non touches volontairement : banque, CAF, Doctolib, WhatsApp, CapCut,
# ChatGPT, Gemini, Duolingo, Booking, Heetch, Bolt, Wecasa, Carrefour,
# Facebook, Messenger, TikTok, Netflix, Zepeto, com.playtk.skit_cine,
# com.crypto.exchange, Canta, Shizuku, applis Google.
JEUX="
com.einnovation.temu
com.amazon.appmanager
casual.tung.sahur.mukbang.asmr
com.ag.fashion.catwalk.show
com.beat.cat.dancing.hop.tiles.music.game
com.block.juggle
com.bravestars.savethedog.drawgame
com.bunbunstudio.magicblocktiles
com.crazylabs.acrylic.nails
com.dino.moto.race.master
com.dino.race.master
com.domin.tgrow
com.drawhome.drawgame.drawpuzzle.rushtohome
com.emoji.fun.puzzle
com.fc.p.gp.skincare.makeup.makeover.asmr.game
com.fcg.badmom.goodmom.rungames
com.fcg.bakery.stack.maker.game
com.fp.helpmeplease.trickystories
com.fullmetalgamedev.aquablockspuzzleseas
com.fullmetalgamedev.coffeerun3d
com.fullmetalgamedev.fruitshooting
com.fullmetalgamedev.ultimatecruises
com.fullmetalgamedev.zombieDefence
com.Garawell.BridgeRace
com.Hadiz.Pillowchase
com.hg.FishEaterPro
com.hide.ball
com.htt.alpha.shooter.fps
com.jess.makeup
com.katanlabs.bridgebuildguys
com.katanlabs.bubblepop
com.katanlabs.matchballgame
com.KatanLabs.tilematchpuzzlemaster
com.katanlabs.wordconnectwondersofview
com.katanlabs.worm.ioeatemall
com.kayac.breakragdoll
com.king.candycrushsaga
com.manekigames.fashionqueen
com.match.hollywood
com.matchingham.flashback.tricky.riddles
com.MegaJoy.LoveStory68
com.newnormalgames.phonecasediy
com.oakever.tiletrip
com.playflock.family.hospital.operate.makeover.doctor.match.heart
com.playflock.family.town.makeover.home.mansion.story.garden.decoration.puzzle.match
com.playrix.fishdomdd.gplay
com.playstrom.dop4
com.Polystation.BuildABabe
com.ps.build.a.dream.queen.race.game
com.seenax.HideAndSeek
com.sgs.sniper.agent.agenthunt.shootergame.snipergame.gun.game
com.sh.tricky.relax.ticktock.mini.challenges.puzzle.games
com.smartfunapps.crazyhospital
com.smashing.draw2
com.syubestgames.teachersimulator
com.taymay.haircut
com.tp.pmu3d
com.tripledot.solitaire
com.vitastudio.mahjong
com.weegoon.thiefpuzzle
com.wn.hairtattoo
diy.makeup.master.artist.stylist
dop.draw.one.part.puzzle.story
net.wooga.junes_journey_hidden_object_mystery_game
surf.beats.magic.song.game
"

# Etat reel d'un paquet : absent | retire | off | actif
state() {
  pm list packages -u "$1" 2>/dev/null | grep -qx "package:$1" || { echo absent; return; }
  pm list packages "$1" 2>/dev/null | grep -qx "package:$1" || { echo retire; return; }
  pm list packages -d "$1" 2>/dev/null | grep -qx "package:$1" && { echo off; return; }
  echo actif
}

# --- Suppression definitive d'une liste d'applis installees ------------------
# $1 = list | remove ; $2 = liste de paquets
remove_list() {
  n=0; f=0
  for p in $2; do
    pm list packages "$p" 2>/dev/null | grep -qx "package:$p" || continue
    if [ "$1" = list ]; then
      echo "  - $p"; n=$((n+1)); continue
    fi
    pm uninstall "$p" >/dev/null 2>&1
    # appli preinstallee : retrait pour l'utilisateur en secours
    if pm list packages "$p" 2>/dev/null | grep -qx "package:$p"; then
      pm uninstall -k --user 0 "$p" >/dev/null 2>&1
    fi
    if pm list packages "$p" 2>/dev/null | grep -qx "package:$p"; then
      echo "[echec]        $p"; f=$((f+1))
    else
      echo "[OK supprime]  $p"; n=$((n+1))
    fi
  done
  if [ "$1" = list ]; then echo "  ($n applis presentes)"
  else echo "== Supprimees : $n | Echecs : $f =="; fi
}

case "$MODE" in
  listgadgets) remove_list list "$GADGETS"; exit 0 ;;
  gadgets)     remove_list remove "$GADGETS"; exit 0 ;;
  listjeux)    remove_list list "$JEUX"; exit 0 ;;
  jeux)        remove_list remove "$JEUX"; exit 0 ;;
esac

case "$MODE" in
  dry|apply)       LIST="$CORE" ;;
  optional)        LIST="$CORE $OPTIONAL" ;;
  restore)         LIST="$CORE $OPTIONAL" ;;
  *) echo "Mode inconnu : $MODE (dry | apply | optional | restore | listgadgets | gadgets | listjeux | jeux)"; exit 1 ;;
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
