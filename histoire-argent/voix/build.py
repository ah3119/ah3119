import html
CONSIGNES = """
<h2>1 · Réglages Audacity (une seule fois)</h2>
<ol>
<li><b>Micro</b> : barre d'outils « Périphérique » → choisis ton micro (USB de préférence), canal <b>1 (Mono)</b>.</li>
<li><b>Fréquence du projet</b> : en bas à gauche (ou Édition → Préférences → Qualité) → <b>44 100 Hz</b>.</li>
<li><b>Niveau</b> : clique sur le vumètre d'enregistrement, parle normalement. Les pics doivent monter vers <b>−12 à −6 dB</b>, jamais dans le rouge. Ajuste le gain du micro, pas ta voix.</li>
<li><b>Pièce</b> : pièce calme, rideaux tirés, porte fermée, téléphone en silencieux, pas de ventilateur ni de frigo à côté. Un dressing ou une pièce avec des tissus sonne mieux qu'une pièce vide.</li>
<li><b>Distance</b> : bouche à 15–20 cm du micro, légèrement de côté pour éviter les « p » et les « b » qui claquent.</li>
</ol>
<h2>2 · Comment lire</h2>
<ul>
<li><b>Ton</b> : celui de la chaîne. Un enquêteur qui raconte une affaire à un ami : <b>rythmé, vivant, sûr de lui</b>, pas un présentateur de JT ni un livre audio.</li>
<li><b>Rythme</b> : un peu plus rapide que ta conversation normale, mais en articulant. Le symbole <b>⏸</b> marque une courte pause (une demi-seconde).</li>
<li><b>Varie l'émotion</b> comme indiqué entre crochets : [curieux], [tendu], [grave], [léger]. Le clone apprend ces nuances.</li>
<li><b>Erreur ?</b> Ne t'arrête pas : marque une pause de 2 secondes et relis la phrase entière. Tu couperas l'erreur ensuite.</li>
<li><b>Boisson</b> : un verre d'eau à température ambiante. Pas de lait ni de café juste avant.</li>
</ul>
<h2>3 · Après l'enregistrement</h2>
<ol>
<li>Coupe les erreurs, les toux et les blancs de plus de 2 secondes : sélectionne la zone, puis <b>Suppr</b>.</li>
<li><b>Effets</b> : rien de lourd. Si besoin, seulement <b>Effet → Volume et compression → Normaliser</b> à <b>−1 dB</b>. Pas d'écho, pas d'égaliseur, pas de « réduction de bruit » agressive : le clone copierait l'artefact.</li>
<li><b>Export</b> : Fichier → Exporter l'audio → <b>MP3, 192 kbit/s</b> (ou WAV). Nom : celui indiqué en haut du document.</li>
<li><b>ElevenLabs</b> : Voices → Add a new voice → <b>Instant Voice Clone</b> → dépose le fichier → nomme la voix comme indiqué → coche la confirmation de droits.</li>
<li>Envoie-moi le nom ou l'ID de la voix : je fais un test et je te dis si elle est exploitable.</li>
</ol>
<p class="note">⚠️ Pour un clone instantané, 1 à 3 minutes de bon audio suffisent généralement, et plus n'améliore pas forcément le résultat. Un clone « professionnel » demande beaucoup plus d'audio (souvent 30 minutes et plus) et l'offre Creator. Ce sont des repères à vérifier dans la documentation ElevenLabs du moment.</p>
"""
DOCS = {
 "FR": dict(file="FR-Enregistrement_Francais", title="Enregistrement · Français", voice="F&R – FR", out="FR-voix-francais.mp3", lang="fr", dir="ltr",
  intro="Texte à lire en français. Ce clone sera la voix principale de Fortunes & Ruines.",
  text="""[accueillant] Bienvenue dans Fortunes et Ruines. ⏸ Ici, on ouvre des dossiers. Des histoires vraies, avec des chiffres vrais, sur des gens qui ont tout gagné… ⏸ et parfois tout perdu.
[tendu] Paris, mille sept cent dix-neuf. ⏸ Une action coûte cinq cents livres. Un an plus tard, elle en vaut près de dix mille. Vingt fois plus ! Dans la rue, des domestiques deviennent riches en quelques semaines. ⏸ Puis tout s'effondre.
[curieux] Vous connaissez Charles Ponzi ? Il n'a pas inventé l'arnaque. ⏸ Il lui a seulement donné son nom. En mille neuf cent vingt, à Boston, il promet cinquante pour cent de gain en quarante-cinq jours. Les gens font la queue devant son bureau. ⏸ Quelques mois plus tard, c'est la prison.
[posé] Question simple : qu'est-ce que l'argent ? Un billet ? Une pièce ? Un chiffre sur un écran ? ⏸ En réalité, c'est une promesse. Et une promesse, ça ne tient que tant qu'on y croit.
[précis] Écoutez bien ce chiffre : trois cent soixante-cinq. ⏸ Maintenant celui-ci : un milliard neuf cents millions. ⏸ Et celui-là : zéro virgule cinq pour cent.
[surpris] Kodak avait inventé l'appareil photo numérique. En mille neuf cent soixante-quinze. ⏸ Et pourtant, c'est exactement ce qui l'a tué.
[admiratif] Il y a des fortunes qui se construisent sur des siècles. Les Médicis, à Florence. Jakob Fugger, à Augsbourg. Mansa Moussa, l'empereur du Mali, si riche qu'il aurait fait chuter le prix de l'or au Caire.
[grave] Et puis il y a les chutes. Rapides. Brutales. ⏸ Lehman Brothers : cent cinquante-huit ans d'histoire, effacés en un week-end.
[sérieux] Attention. Ce n'est pas un conseil financier. Ici, on ne vous vend rien. ⏸ On raconte. On vérifie. On montre les preuves.
[énergique] Alors, prêt ? Le dossier est ouvert. Et comme toujours, la question n'est pas de savoir comment ils ont gagné. ⏸ La question, c'est : comment ont-ils tout perdu ?
[chaleureux] Abonnez-vous. Le prochain dossier arrive samedi. ⏸ Fortunes et Ruines."""),
 "EN": dict(file="FR-Enregistrement_Anglais", title="Enregistrement · Anglais", voice="F&R – EN", out="FR-voix-anglais.mp3", lang="en", dir="ltr",
  intro="Texte à lire en anglais, pour le doublage de la chaîne (prévu au 4e mois). Prends ton accent naturel : n'imite pas un Américain, sois clair et rythmé.",
  text="""[welcoming] Welcome to Fortunes and Ruins. ⏸ This is where we open the files. True stories, real numbers, about people who won everything… ⏸ and sometimes lost it all.
[tense] Paris, seventeen nineteen. ⏸ One share costs five hundred livres. A year later, it's worth almost ten thousand. Twenty times more! On the street, servants get rich in a few weeks. ⏸ Then everything collapses.
[curious] Have you heard of Charles Ponzi? He didn't invent the scam. ⏸ He just gave it his name. In nineteen twenty, in Boston, he promised a fifty percent return in forty-five days. People lined up outside his office. ⏸ A few months later, he was in prison.
[calm] Simple question: what is money? A bill? A coin? A number on a screen? ⏸ In reality, it's a promise. And a promise only holds as long as people believe in it.
[precise] Listen to this number: three hundred and sixty-five. ⏸ Now this one: one billion nine hundred million. ⏸ And this one: zero point five percent.
[surprised] Kodak invented the digital camera. In nineteen seventy-five. ⏸ And yet, that is exactly what killed it.
[admiring] Some fortunes are built over centuries. The Medici, in Florence. Jakob Fugger, in Augsburg. Mansa Musa, emperor of Mali, so rich he is said to have crashed the price of gold in Cairo.
[grave] And then there are the falls. Fast. Brutal. ⏸ Lehman Brothers: one hundred and fifty-eight years of history, wiped out in a single weekend.
[serious] A warning. This is not financial advice. We're not selling you anything. ⏸ We tell the story. We check the facts. We show the evidence.
[energetic] So, ready? The file is open. And as always, the question isn't how they won. ⏸ The question is: how did they lose it all?
[warm] Subscribe. The next file drops on Saturday. ⏸ Fortunes and Ruins."""),
 "AR": dict(file="FR-Enregistrement_Arabe", title="Enregistrement · Arabe", voice="F&R – AR", out="FR-voix-arabe.mp3", lang="ar", dir="rtl",
  intro="Texte à lire en arabe standard (fus'ha), avec un ton parlé et vivant, pas solennel. Les nombres sont écrits en toutes lettres pour fixer leur prononciation. Fais-le relire par un arabophone si tu as un doute.",
  text="""[ترحيب · accueillant] مرحبًا بكم في «ثروات وانهيارات». ⏸ هنا نفتح الملفات. قصصٌ حقيقية، بأرقامٍ حقيقية، عن أناسٍ ربحوا كلَّ شيء… ⏸ وأحيانًا خسروا كلَّ شيء.
[توتر · tendu] باريس، عامَ ألفٍ وسبعمئةٍ وتسعةَ عشر. ⏸ سهمٌ واحد يساوي خمسمئةِ ليرة. وبعد عامٍ واحد، يقترب من عشرةِ آلاف. عشرون ضعفًا! في الشارع، يغتني الخدمُ في أسابيعَ قليلة. ⏸ ثم ينهار كلُّ شيء.
[فضول · curieux] هل تعرفون تشارلز بونزي؟ لم يخترعِ الاحتيال. ⏸ لقد أعطاه اسمَه فقط. في عامِ ألفٍ وتسعمئةٍ وعشرين، في بوسطن، وعد الناسَ بربحِ خمسين في المئة خلال خمسةٍ وأربعين يومًا. اصطفَّ الناسُ أمام مكتبه. ⏸ وبعد بضعةِ أشهر، كان في السجن.
[هدوء · posé] سؤالٌ بسيط: ما هو المال؟ ورقةٌ نقدية؟ قطعةٌ معدنية؟ رقمٌ على شاشة؟ ⏸ في الحقيقة، المالُ وعد. والوعدُ لا يصمد إلا ما دمنا نصدّقه.
[دقة · précis] استمعوا جيدًا إلى هذا الرقم: ثلاثُمئةٍ وخمسةٌ وستون. ⏸ والآن هذا: مليارٌ وتسعُمئةِ مليون. ⏸ وهذا أيضًا: صفرٌ فاصلةُ خمسةٍ في المئة.
[دهشة · surpris] كانت كوداك قد اخترعت الكاميرا الرقمية، عامَ ألفٍ وتسعمئةٍ وخمسةٍ وسبعين. ⏸ ومع ذلك، كان هذا الاختراعُ بالضبط هو ما قضى عليها.
[إعجاب · admiratif] هناك ثرواتٌ تُبنى عبر القرون. آلُ ميديتشي في فلورنسا. ياكوب فوغر في أوغسبورغ. ومنسا موسى، إمبراطورُ مالي، الذي يُقال إنه كان من الثراء بحيث أسقط سعرَ الذهب في القاهرة.
[جدية · grave] ثم هناك السقوط. سريعٌ. قاسٍ. ⏸ ليمان براذرز: مئةٌ وثمانيةٌ وخمسون عامًا من التاريخ، مُحيت في عطلةِ نهايةِ أسبوعٍ واحدة.
[تنبيه · sérieux] تنبيه: هذه ليست نصيحةً مالية. هنا لا نبيعكم شيئًا. ⏸ نحن نروي. نتحقق. ونعرض الأدلة.
[حماس · énergique] هل أنتم مستعدون؟ الملفُّ مفتوح. وكالعادة، السؤال ليس كيف ربحوا. ⏸ السؤال هو: كيف خسروا كلَّ شيء؟
[دفء · chaleureux] اشتركوا في القناة. الملفُّ القادم يصل يومَ السبت. ⏸ «ثروات وانهيارات».""")}
CSS = """@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter+Tight:wght@500;700;800&family=JetBrains+Mono:wght@800&family=Noto+Naskh+Arabic:wght@500;700&display=swap');
@page{size:A4;margin:16mm 16mm}
body{font-family:'Inter Tight',Arial,sans-serif;color:#111;font-size:12.5pt;line-height:1.5}
.head{background:#0B0B0C;color:#F2F0EA;padding:14px 18px;display:flex;gap:16px;align-items:center}
.badge{background:#FFD400;color:#0B0B0C;font-family:'Archivo Black';font-size:26px;padding:6px 10px;box-shadow:4px 4px 0 #E5322D}.badge i{font-style:normal;color:#E5322D}
.head h1{font-family:'Archivo Black';font-weight:400;font-size:22pt;margin:0;text-transform:uppercase}
.meta{font-family:'JetBrains Mono';font-weight:800;font-size:9.5pt;color:#FFD400;letter-spacing:1px}
.box{border:2px solid #0B0B0C;padding:10px 14px;margin:12px 0;background:#FFF9D6}
h2{font-family:'Archivo Black';font-weight:400;font-size:14pt;text-transform:uppercase;border-bottom:3px solid #FFD400;padding-bottom:3px;margin:18px 0 8px}
li{margin:4px 0}.note{font-size:10.5pt;color:#555}
.read{page-break-before:always}
.read p{font-size:17pt;line-height:1.75;margin:0 0 14px}
.read .tag{font-family:'JetBrains Mono';font-weight:800;font-size:10pt;color:#E5322D;display:block}
.rtl p{font-family:'Noto Naskh Arabic',serif;font-size:19pt;line-height:2.05}
.rtl .tag{font-family:'Noto Naskh Arabic',serif;font-size:12pt}
"""
import re
for k,d in DOCS.items():
    paras=[]
    for line in d['text'].split('\n'):
        m=re.match(r'\[(.*?)\]\s*(.*)',line)
        tag,txt=(m.group(1),m.group(2)) if m else ('',line)
        paras.append(f'<p><span class="tag">[{html.escape(tag)}]</span>{html.escape(txt)}</p>')
    words=len(re.sub(r'\[.*?\]|⏸','',d['text']).split())
    page=f"""<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>{CSS}</style></head><body>
<div class="head"><div class="badge">F<i>&amp;</i>R</div><div><h1>{d['title']}</h1><div class="meta">FORTUNES &amp; RUINES · CLONE DE VOIX · ~{words} MOTS · ≈ 2 MIN DE LECTURE</div></div></div>
<div class="box"><b>Nom du fichier à exporter :</b> {d['out']}<br><b>Nom de la voix dans ElevenLabs :</b> {html.escape(d['voice'])}<br>{html.escape(d['intro'])}</div>
{CONSIGNES}
<div class="read {'rtl' if d['dir']=='rtl' else ''}" dir="{d['dir']}" lang="{d['lang']}"><h2 dir="ltr" style="text-align:left">4 · Texte à lire</h2>{''.join(paras)}</div>
</body></html>"""
    open(d['file']+'.html','w').write(page)
    open(d['file']+'.txt','w').write(re.sub(r'\[.*?\]\s*','',d['text']).replace('⏸','…')+'\n')
    print(k,words,'mots')
