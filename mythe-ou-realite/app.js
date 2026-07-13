/* =====================================================================
   Mythe ou Réalité ? — Échos du Passé
   Quiz d'idées reçues historiques. 100% statique, 0 dépendance.
   Chaque "reveal" est vérifié (sources dans le plan + footer).
   a:true  = l'affirmation est une RÉALITÉ historique
   a:false = l'affirmation est un MYTHE / idée reçue
   ===================================================================== */

const BANK = [
  { t:"Les Vikings portaient des casques à cornes au combat.", a:false,
    r:"Aucun casque viking à cornes n'a jamais été retrouvé. L'image vient des costumes de l'opéra de Wagner, dessinés par Carl Emil Doepler en 1876 — plus de 800 ans après l'ère viking.",
    s:"Futura-Sciences · Wikipédia « Casque à cornes »" },

  { t:"Napoléon Bonaparte était particulièrement petit pour son époque.", a:false,
    r:"Il mesurait environ 1,69 m, soit la moyenne (voire un peu au-dessus) de son temps. Le mythe vient d'une confusion pieds français/anglais et des caricatures de propagande britannique.",
    s:"RTBF · ICI Explora · Wikipédia" },

  { t:"La Grande Muraille de Chine est visible à l'œil nu depuis l'espace.", a:false,
    r:"La NASA et les astronautes l'ont démenti : elle est trop étroite (~7 m) pour être distinguée à l'œil nu depuis l'orbite. En 2003, le 1er taïkonaute Yang Liwei n'a pas pu la voir.",
    s:"NASA · Ciel & Espace (Thomas Pesquet)" },

  { t:"« Qu'ils mangent de la brioche ! » a vraiment été dit par Marie-Antoinette.", a:false,
    r:"La phrase apparaît dans les Confessions de Rousseau (écrites en 1765), alors que Marie-Antoinette avait 9 ans et vivait encore en Autriche. On la lui a attribuée des décennies après sa mort.",
    s:"Britannica · Wikipédia · La Culture Générale" },

  { t:"Les pyramides de Gizeh ont été bâties par des esclaves.", a:false,
    r:"Les fouilles ont révélé des villages d'ouvriers payés et nourris (pain, bière, bœuf) et leurs tombes près du chantier. C'étaient des travailleurs qualifiés, pas des esclaves.",
    s:"Digital Giza (Harvard) · fouilles Heit el-Ghurab" },

  { t:"Au Moyen Âge, les gens croyaient que la Terre était plate.", a:false,
    r:"Les lettrés savaient la Terre ronde depuis l'Antiquité. Le « dogme médiéval de la Terre plate » a été inventé par l'écrivain Washington Irving dans une biographie romancée de Colomb (1828).",
    s:"Wikipédia « Mythe de la Terre plate »" },

  { t:"Chez les Romains, le « vomitorium » était une salle où l'on se faisait vomir entre les plats.", a:false,
    r:"Un vomitorium était un passage d'évacuation des gradins d'un amphithéâtre — il « recrachait » la foule. La salle pour vomir est une légende popularisée par un roman d'Aldous Huxley (1923).",
    s:"Wikipédia « Vomitoire » · History Cooperative" },

  { t:"Cléopâtre était d'origine grecque (macédonienne), et non égyptienne de souche.", a:true,
    r:"Vrai. Elle appartenait à la dynastie ptolémaïque, fondée par un général d'Alexandre le Grand. Elle fut d'ailleurs la première de sa lignée à apprendre la langue égyptienne.",
    s:"Wikipédia « Cléopâtre VII » · World History Encyclopedia" },

  { t:"La Tour Eiffel devait être démontée seulement 20 ans après sa construction.", a:true,
    r:"Vrai. La concession de Gustave Eiffel expirait au 1er janvier 1910. Elle a été sauvée par son utilité comme antenne radio militaire géante, ce qui prolongea sa concession.",
    s:"Site officiel toureiffel.paris" },

  { t:"Les « sorcières » de Salem (1692) ont été brûlées vives sur le bûcher.", a:false,
    r:"Faux. Salem était une colonie anglaise : la peine était la pendaison. 19 personnes furent pendues et Giles Corey écrasé sous des pierres. Aucune ne fut brûlée. Le bûcher, c'était l'Europe.",
    s:"Wikipédia « Procès des sorcières de Salem »" },

  { t:"Le calendrier maya prédisait la fin du monde le 21 décembre 2012.", a:false,
    r:"Faux. Cette date marquait juste la fin d'un cycle de 13 baktuns, suivi d'un 14e. Aucune prophétie apocalyptique maya : l'idée vient de romans de SF des années 1970.",
    s:"World History Encyclopedia · NASA" },

  { t:"Einstein était un cancre, nul en mathématiques à l'école.", a:false,
    r:"Faux. Il maîtrisait le calcul différentiel et intégral à 15 ans. Le mythe vient d'un bulletin où il avait « 1 » — qui était la MEILLEURE note dans le système allemand de l'époque.",
    s:"Futura-Sciences · L'Économiste Maghrébin" },

  { t:"La Joconde a été volée au musée du Louvre en 1911.", a:true,
    r:"Vrai. Elle fut dérobée par Vincenzo Peruggia, un ancien employé, et cachée deux ans avant d'être récupérée en 1913. C'est ce vol qui l'a rendue mondialement célèbre.",
    s:"Wikipédia « Vol de La Joconde » · France Info" },

  { t:"Le corps de Walt Disney a été cryogénisé (congelé) à sa mort.", a:false,
    r:"Faux. Walt Disney a été incinéré en décembre 1966 et repose à Forest Lawn, en Californie. La rumeur de congélation est une légende urbaine apparue dès 1967.",
    s:"Snopes · Wikipédia « Cryonic Walt Disney urban legend »" },

  { t:"Une armure de chevalier était si lourde qu'il fallait une grue pour le hisser sur son cheval.", a:false,
    r:"Faux. Une armure de combat pesait 16 à 21 kg, répartis sur tout le corps : on pouvait courir, monter à cheval, se relever. Le mythe de la grue vient du film Henry V (1944).",
    s:"Passion Médiévistes · travaux de Daniel Jaquet" },

  { t:"L'armée d'Hannibal a vraiment traversé les Alpes avec des éléphants de guerre.", a:true,
    r:"Vrai. En 218 av. J.-C., Hannibal franchit les Alpes avec 37 éléphants (selon Polybe). Presque tous moururent ensuite du froid en Italie. L'itinéraire exact reste débattu.",
    s:"Wikipédia « Passage des Alpes par Hannibal » · France Info" },

  { t:"Les Romains utilisaient de l'urine pour blanchir leurs dents.", a:true,
    r:"Vrai. L'ammoniac de l'urine fermentée blanchit l'émail. L'urine d'Hispanie, réputée la meilleure, était même importée et vendue. La pratique a duré jusqu'au XVIIIe siècle.",
    s:"Ulyces · Daily Geek Show (d'après les sources antiques)" },

  { t:"Lors de la momification, les Égyptiens retiraient le cerveau par le nez.", a:true,
    r:"Vrai. Une tige était introduite par la narine pour briser l'os et extraire le cerveau (l'excérébration, décrite par Hérodote). Le cerveau était jugé inutile, contrairement au cœur.",
    s:"Wikipédia « Excérébration » · Universalis" },

  { t:"Einstein s'est vu proposer la présidence de l'État d'Israël, qu'il a refusée.", a:true,
    r:"Vrai. En 1952, après la mort du président Weizmann, le poste lui fut offert. Il déclina poliment, se disant sans aptitude pour les fonctions officielles et le contact humain.",
    s:"History.com · Britannica · Jewish Virtual Library" },

  { t:"L'empereur Néron jouait de la lyre pendant que Rome brûlait.", a:false,
    r:"Faux. Lors du grand incendie de 64, Néron était à Antium (~60 km de Rome). Tacite présente l'anecdote comme une simple rumeur ; Néron organisa même les secours aux sinistrés.",
    s:"Tacite (Annales) · Ancient Origins · Wikipédia" },

  { t:"Les combats de gladiateurs se terminaient presque toujours par la mort d'un combattant.", a:false,
    r:"Faux. La mort n'était pas systématique : un gladiateur était un investissement coûteux. Beaucoup survivaient à de nombreux combats ; certains gagnaient même leur liberté.",
    s:"Revue Histoire · Curieux! · La Cliothèque" },

  { t:"Cléopâtre a vécu plus proche dans le temps de l'invention de l'iPhone que de la construction de la Grande Pyramide.", a:true,
    r:"Vrai, et c'est vertigineux. La Grande Pyramide date d'environ 2560 av. J.-C., Cléopâtre vécut vers 30 av. J.-C., et l'iPhone est sorti en 2007. ~2500 ans la séparent des pyramides, ~2040 ans de l'iPhone.",
    s:"Le Saviez-Vous ? · One Tip A Day (calcul des dates)" },

  { t:"Les pirates faisaient régulièrement marcher leurs prisonniers sur une planche.", a:false,
    r:"Faux. Pendant l'âge d'or de la piraterie, on n'en trouve quasiment aucune trace. Le supplice de la planche a été popularisé par la littérature du XIXe siècle (Stevenson, etc.).",
    s:"Wikipédia « Walking the plank » · History.com · Mental Floss" }
];

const QUIZ_LEN = 10;
const CHANNEL_URL = "https://www.youtube.com/channel/UCtI77IJDeqX1GXrZNkGJtaQ?sub_confirmation=1";
const SITE_URL = "https://curiosaboutique.fr/mythe-ou-realite/";

let deck = [];     // questions de la partie
let idx = 0;       // index question courante
let score = 0;
let answered = false;

/* ---------- utilitaires ---------- */
const $ = (s) => document.querySelector(s);
function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}
function show(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('screen--active'));
  $(id).classList.add('screen--active');
  window.scrollTo({top:0,behavior:'smooth'});
}

/* ---------- déroulé du quiz ---------- */
function startQuiz(){
  deck = shuffle(BANK).slice(0, QUIZ_LEN);
  idx = 0; score = 0;
  show('#screen-quiz');
  renderQuestion();
}

function renderQuestion(){
  answered = false;
  const q = deck[idx];
  $('#q-counter').textContent = `Question ${idx+1} / ${QUIZ_LEN}`;
  $('#q-score').textContent = `${score} pt`;
  $('#progress-bar').style.width = `${(idx/QUIZ_LEN)*100}%`;
  $('#q-statement').textContent = q.t;
  $('#reveal').hidden = true;

  const btns = document.querySelectorAll('.btn--answer');
  btns.forEach(b=>{
    b.className = 'btn btn--answer';
    b.disabled = false;
  });
}

function answer(choice){           // choice = true (Réalité) / false (Mythe)
  if(answered) return;
  answered = true;
  const q = deck[idx];
  const correct = (choice === q.a);
  if(correct) score++;

  const btns = document.querySelectorAll('.btn--answer');
  btns.forEach(b=>{
    b.disabled = true;
    const bChoice = (b.dataset.choice === 'true');
    if(bChoice === q.a) b.classList.add('is-correct');
    else if(bChoice === choice) b.classList.add('is-wrong');
    else b.classList.add('is-dim');
  });

  // reveal
  const verdict = $('#reveal-verdict');
  if(correct){
    verdict.textContent = "✓ Bien vu !";
    verdict.className = "reveal-verdict ok";
  }else{
    verdict.textContent = q.a ? "✕ Raté — c'était une RÉALITÉ" : "✕ Raté — c'était un MYTHE";
    verdict.className = "reveal-verdict no";
  }
  $('#reveal-text').textContent = q.r;
  $('#reveal-src').textContent = "Source : " + q.s;
  $('#q-score').textContent = `${score} pt`;
  $('#progress-bar').style.width = `${((idx+1)/QUIZ_LEN)*100}%`;
  $('#reveal').hidden = false;
}

function next(){
  idx++;
  if(idx >= QUIZ_LEN) showResult();
  else renderQuestion();
}

/* ---------- résultat + rang ---------- */
function rankFor(s){
  if(s===10) return {r:"Maître du Temps", m:"Sans-faute. Les idées reçues n'ont aucune prise sur toi. Tu es un véritable gardien de l'Histoire."};
  if(s>=8)  return {r:"Détective de l'Histoire", m:"Redoutable. Tu flaires le mythe à des kilomètres. Bravo, c'est un excellent score."};
  if(s>=6)  return {r:"Esprit Curieux", m:"Solide ! Tu sais déjà démêler pas mal de légendes. Encore quelques pièges à éviter."};
  if(s>=4)  return {r:"Apprenti Chroniqueur", m:"Pas mal, mais l'Histoire t'a encore tendu quelques pièges. La revanche t'attend."};
  return {r:"Victime des Idées Reçues", m:"Aïe ! Les mythes t'ont bien eu cette fois. Bonne nouvelle : maintenant tu connais la vérité. Rejoue !"};
}

function showResult(){
  $('#progress-bar').style.width = `100%`;
  const {r,m} = rankFor(score);
  $('#res-score').textContent = score;
  $('#res-rank').textContent = r;
  $('#res-msg').textContent = m;
  drawShareImage(score, r);
  show('#screen-result');
}

/* ---------- image partageable (canvas 1080x1080) ---------- */
function drawShareImage(s, rank){
  const c = $('#share-canvas');
  const x = c.getContext('2d');
  const W=1080, H=1080;

  // fond sépia
  const g = x.createLinearGradient(0,0,0,H);
  g.addColorStop(0,'#2c2013'); g.addColorStop(1,'#16100a');
  x.fillStyle=g; x.fillRect(0,0,W,H);

  // cadre doré
  x.strokeStyle='#d9a441'; x.lineWidth=6;
  x.strokeRect(40,40,W-80,H-80);

  x.textAlign='center';

  // marque
  x.fillStyle='#d9a441';
  x.font='600 30px Georgia, serif';
  x.fillText('É C H O S   D U   P A S S É', W/2, 150);

  // titre
  x.fillStyle='#e9c477';
  x.font='bold 92px Georgia, serif';
  x.fillText('Mythe ou Réalité ?', W/2, 285);

  // anneau de score
  const cx=W/2, cy=560, rad=170;
  x.beginPath(); x.arc(cx,cy,rad,0,Math.PI*2);
  x.fillStyle='#241a0e'; x.fill();
  x.lineWidth=10; x.strokeStyle='#d9a441'; x.stroke();
  x.fillStyle='#e9c477';
  x.font='bold 150px Georgia, serif';
  x.fillText(s, cx, cy+30);
  x.fillStyle='#cdbb98';
  x.font='40px Georgia, serif';
  x.fillText('/ 10', cx, cy+95);

  // rang
  x.fillStyle='#e9c477';
  x.font='bold 64px Georgia, serif';
  x.fillText(rank, W/2, 830);

  // accroche
  x.fillStyle='#cdbb98';
  x.font='34px Georgia, serif';
  x.fillText('Sauras-tu faire mieux ?', W/2, 905);
  x.fillStyle='#d9a441';
  x.font='30px Georgia, serif';
  x.fillText('curiosaboutique.fr/mythe-ou-realite', W/2, 975);
}

function shareText(s, rank){
  return `J'ai obtenu ${s}/10 au quiz « Mythe ou Réalité ? » d'Échos du Passé — rang : ${rank}. Sauras-tu démêler le vrai du faux de l'Histoire ? ${SITE_URL}`;
}

async function doShare(){
  const {r} = rankFor(score);
  const txt = shareText(score, r);
  const c = $('#share-canvas');

  // tente le partage natif avec image
  if(navigator.canShare){
    try{
      const blob = await new Promise(res=>c.toBlob(res,'image/png'));
      const file = new File([blob],'mythe-ou-realite.png',{type:'image/png'});
      if(navigator.canShare({files:[file]})){
        await navigator.share({title:'Mythe ou Réalité ?', text:txt, url:SITE_URL, files:[file]});
        return;
      }
      await navigator.share({title:'Mythe ou Réalité ?', text:txt, url:SITE_URL});
      return;
    }catch(e){ /* annulé ou non supporté → fallback */ }
  }
  // fallback : copie du texte
  try{
    await navigator.clipboard.writeText(txt);
    const b=$('#btn-share'); const old=b.textContent;
    b.textContent='Texte copié ! 📋'; setTimeout(()=>b.textContent=old,1800);
  }catch(e){
    prompt('Copie ton score :', txt);
  }
}

function downloadImage(){
  const c = $('#share-canvas');
  const a = document.createElement('a');
  a.download = `mythe-ou-realite-${score}-sur-10.png`;
  a.href = c.toDataURL('image/png');
  a.click();
}

/* ---------- capture e-mail (Web3Forms, AJAX) ---------- */
async function handleMail(e){
  e.preventDefault();
  const form = $('#mail-form');
  const input = $('#mail-input');
  const v = input.value.trim();
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) {
    input.focus(); return;
  }
  const btn = form.querySelector('button[type="submit"]');
  const oldLabel = btn ? btn.textContent : '';
  if(btn){ btn.disabled = true; btn.textContent = 'Envoi…'; }
  try{
    const res = await fetch(form.action, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });
    if(res.ok){
      form.hidden = true;
      $('#mail-feedback').hidden = false;
    }else{
      throw new Error('submit failed');
    }
  }catch(err){
    if(btn){ btn.disabled = false; btn.textContent = oldLabel; }
    const fb = $('#mail-feedback');
    fb.textContent = "Oups, un souci réseau. Réessaie dans un instant.";
    fb.style.color = 'var(--red)';
    fb.hidden = false;
  }
}

/* ---------- liaisons ---------- */
$('#btn-start').addEventListener('click', startQuiz);
$('#btn-next').addEventListener('click', next);
$('#btn-replay').addEventListener('click', startQuiz);
$('#btn-share').addEventListener('click', doShare);
$('#btn-download').addEventListener('click', downloadImage);
$('#mail-form').addEventListener('submit', handleMail);
$('#cta-youtube').href = CHANNEL_URL;
document.querySelectorAll('.btn--answer').forEach(b=>{
  b.addEventListener('click', ()=>answer(b.dataset.choice==='true'));
});
