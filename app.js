import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
window.addEventListener('error',e=>{const m=document.getElementById('authmsg');if(m)m.textContent='Erro: '+(e.message||'falha desconhecida')});
window.addEventListener('unhandledrejection',e=>{const m=document.getElementById('authmsg');if(m)m.textContent='Erro: '+(e.reason?.message||String(e.reason))});
const CFG=window.JP_GYM_CONFIG||{};
const sb=createClient(CFG.SUPABASE_URL,CFG.SUPABASE_PUBLISHABLE_KEY);
const $=id=>document.getElementById(id);let user=null,lang=localStorage.getItem('jpgym_lang')||'pt',foodImage=null,machineImage=null,bodyImageFile=null,lastFoodAI={},lastMachineAI={},editingFoodId=null;
const I={pt:{tagline:'Treina. Evolui. Supera-te.',password:'Palavra-passe',login:'Entrar',signup:'Criar conta',google:'Continuar com Google',logout:'Sair',dashboard:'Painel de controlo',welcome:'O teu acompanhamento de treino, nutrição e evolução.',currentWeight:'Peso atual',targetWeight:'Objetivo',weekWorkouts:'Treinos 7 dias',machines:'Máquinas',quick:'Acessos rápidos',profile:'Perfil',profileDesc:'Dados pessoais, objetivos e notas de saúde.',name:'Nome',age:'Idade',height:'Altura cm',goals:'Objetivos',notes:'Notas',save:'Guardar',weight:'Peso / Evolução',weightDesc:'Regista o peso e acompanha a tendência.',datetime:'Data/hora',weightKg:'Peso kg',history:'Histórico',food:'Alimentação',foodDesc:'Regista refeições e usa IA para estimar calorias e proteína.',meal:'Refeição',description:'Descrição',photo:'Fotografia',cameraFood:'Tirar fotografia da refeição (câmara)',analyzeAI:'✨ Analisar com IA',protein:'Proteína g',carbs:'Hidratos g',fat:'Gordura g',saveMeal:'Guardar refeição',mealSupplements:'Suplementos tomados nesta refeição',training:'Treinos',trainingDesc:'Regista exercícios, carga, séries e repetições.',exercise:'Exercício',muscle:'Grupo muscular',sets:'Séries',reps:'Repetições',saveExercise:'Guardar exercício',duration:'Duração (min)',machinesAI:'Máquinas & IA',machinesDesc:'Fotografa máquinas, identifica-as e gera treino personalizado.',machineName:'Nome da máquina',identifyAI:'✨ Identificar com IA',saveMachine:'Guardar máquina',generateWorkout:'🤖 Gerar treino de hoje',registeredMachines:'Máquinas registadas',supplements:'Suplementos',suppDesc:'Catálogo sem duplicados, fotos e composição completa.',logIntake:'Registar toma',supplement:'Suplemento',amount:'Quantidade',unit:'Unidade',progress:'Medidas & Fotos',progressDesc:'Guarda medidas corporais e fotos de evolução.',measurements:'Medidas',progressPhotos:'Fotos de progresso',angle:'Ângulo',goalsDesc:'Metas pessoais guardadas no perfil.',reports:'Relatórios PDF',reportsDesc:'Relatório de evolução para ti ou para o médico.',from:'De',to:'Até',language:'Idioma',reportType:'Tipo',generatePdf:'Gerar PDF',coachDesc:'Pergunta sobre treino, alimentação, recuperação e progresso usando os teus registos.',coachPlaceholder:'O que treino hoje?',askCoach:'Perguntar ao JP Coach',settings:'Configurações',settingsDesc:'Idioma, sessão e estado das integrações.',mealBreakfast:'Pequeno-almoço',mealSnack:'Lanche',mealLunch:'Almoço',mealDinner:'Jantar',mealSupper:'Ceia',angleFront:'Frente',angleSide:'Lado',angleBack:'Costas',reportMedical:'Médico',reportEvolution:'Evolução',measChestPh:'Peito cm',measWaistPh:'Cintura cm',measArmPh:'Braço direito cm',measShouldersPh:'Ombros cm',measChest:'Peito',measWaist:'Cintura',measArm:'Braço',measShoulders:'Ombros',machineFallback:'Máquina',mealFallback:'Refeição',you:'Tu',open:'Abrir',analyzing:'A analisar…',identifying:'A identificar…',preparing:'A preparar…',aiNotReady:'IA ainda não está ligada: ',aiCoachNotReady:'IA ainda não está ligada. ',integrationSupabase:'Supabase',integrationAI:'IA',integrationAIStatus:'endpoints configurados',integrationHosting:'Alojamento',integrationHostingStatus:'Preparado para publicação',configured:'configurado',notConfigured:'não configurado',bodyPhotoPending:'As fotos corporais ficam prontas assim que configurarmos o Storage do Supabase.',choosePhotoFirst:'Escolhe uma foto primeiro.',loggingIn:'A entrar…',accountCreated:'Conta criada. Confirma o email.',edit:'Editar',remove:'Eliminar',saveChanges:'Guardar alterações',cancelEdit:'Cancelar edição',confirmDelete:'Eliminar este registo? Esta ação não pode ser desfeita.',deleted:'Eliminado',measReminderHeading:'⏰ Medidas semanais',measReminderNever:'Ainda não registaste cintura, ombros e braço. Regista agora para começares a acompanhar a tua evolução.',measReminderDue:'Já passaram {n} dias desde a última medição de cintura, ombros e braço. Vamos registar?',measReminderCta:'Registar medidas'},fr:{tagline:'Entraîne-toi. Évolue. Dépasse-toi.',password:'Mot de passe',login:'Connexion',signup:'Créer un compte',google:'Continuer avec Google',logout:'Déconnexion',dashboard:'Tableau de bord',welcome:'Ton suivi de l’entraînement, de la nutrition et de l’évolution.',currentWeight:'Poids actuel',targetWeight:'Objectif',weekWorkouts:'Séances 7 jours',machines:'Machines',quick:'Accès rapides',profile:'Profil',profileDesc:'Données personnelles, objectifs et notes de santé.',name:'Nom',age:'Âge',height:'Taille cm',goals:'Objectifs',notes:'Notes',save:'Enregistrer',weight:'Poids / Évolution',weightDesc:'Enregistre ton poids et suis la tendance.',datetime:'Date/heure',weightKg:'Poids kg',history:'Historique',food:'Alimentation',foodDesc:'Enregistre les repas et utilise l’IA pour estimer calories et protéines.',meal:'Repas',description:'Description',photo:'Photo',cameraFood:'Prendre une photo du repas (caméra)',analyzeAI:'✨ Analyser avec l’IA',protein:'Protéines g',carbs:'Glucides g',fat:'Lipides g',saveMeal:'Enregistrer le repas',mealSupplements:'Compléments pris avec ce repas',training:'Entraînements',trainingDesc:'Enregistre exercices, charge, séries et répétitions.',exercise:'Exercice',muscle:'Groupe musculaire',sets:'Séries',reps:'Répétitions',saveExercise:'Enregistrer l’exercice',duration:'Durée (min)',machinesAI:'Machines & IA',machinesDesc:'Photographie les machines, identifie-les et génère un entraînement personnalisé.',machineName:'Nom de la machine',identifyAI:'✨ Identifier avec l’IA',saveMachine:'Enregistrer la machine',generateWorkout:'🤖 Générer la séance du jour',registeredMachines:'Machines enregistrées',supplements:'Compléments',suppDesc:'Catalogue sans doublons, photos et composition complète.',logIntake:'Enregistrer une prise',supplement:'Complément',amount:'Quantité',unit:'Unité',progress:'Mensurations & Photos',progressDesc:'Enregistre les mensurations et les photos de progression.',measurements:'Mensurations',progressPhotos:'Photos de progression',angle:'Angle',goalsDesc:'Objectifs personnels enregistrés dans le profil.',reports:'Rapports PDF',reportsDesc:'Rapport de progression pour toi ou le médecin.',from:'Du',to:'Au',language:'Langue',reportType:'Type',generatePdf:'Générer le PDF',coachDesc:'Pose des questions sur l’entraînement, l’alimentation, la récupération et la progression avec tes données.',coachPlaceholder:'Que dois-je entraîner aujourd’hui ?',askCoach:'Demander au JP Coach',settings:'Paramètres',settingsDesc:'Langue, session et état des intégrations.',mealBreakfast:'Petit-déjeuner',mealSnack:'Collation',mealLunch:'Déjeuner',mealDinner:'Dîner',mealSupper:'Souper',angleFront:'Face',angleSide:'Profil',angleBack:'Dos',reportMedical:'Médical',reportEvolution:'Évolution',measChestPh:'Poitrine cm',measWaistPh:'Taille cm',measArmPh:'Bras droit cm',measShouldersPh:'Épaules cm',measChest:'Poitrine',measWaist:'Taille',measArm:'Bras',measShoulders:'Épaules',machineFallback:'Machine',mealFallback:'Repas',you:'Toi',open:'Ouvrir',analyzing:'Analyse en cours…',identifying:'Identification…',preparing:'Préparation…',aiNotReady:'IA indisponible pour le moment : ',aiCoachNotReady:'IA indisponible pour le moment. ',integrationSupabase:'Supabase',integrationAI:'IA',integrationAIStatus:'points de terminaison configurés',integrationHosting:'Hébergement',integrationHostingStatus:'Prêt pour la publication',configured:'configuré',notConfigured:'non configuré',bodyPhotoPending:'Les photos corporelles seront prêtes dès que le stockage Supabase sera configuré.',choosePhotoFirst:'Choisis d\'abord une photo.',loggingIn:'Connexion…',accountCreated:'Compte créé. Vérifie ton e-mail.',edit:'Modifier',remove:'Supprimer',saveChanges:'Enregistrer les modifications',cancelEdit:'Annuler la modification',confirmDelete:'Supprimer cet enregistrement ? Cette action est irréversible.',deleted:'Supprimé',measReminderHeading:'⏰ Mensurations hebdomadaires',measReminderNever:'Tu n\'as pas encore enregistré ta taille, tes épaules et ton bras. Enregistre-les maintenant pour commencer à suivre ta progression.',measReminderDue:'Cela fait {n} jours depuis ta dernière mesure de taille, épaules et bras. On les enregistre ?',measReminderCta:'Enregistrer les mensurations'}};
const nav=[['home','⌂','dashboard'],['profile','👤','profile'],['weight','⚖','weight'],['food','🍽','food'],['training','🏋','training'],['machines','📷','machinesAI'],['supplements','🧪','supplements'],['progress','📈','progress'],['goals','🎯','goals'],['reports','📄','reports'],['coach','🤖','JP Coach IA'],['settings','⚙','settings']];
function tr(k){return I[lang]?.[k]||I.pt[k]||k}function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}function nowLocal(){const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,16)}function locale(){return lang==='fr'?'fr-FR':'pt-PT'}function toast(msg,ok=true){const e=$('toast');e.textContent=msg;e.className='toast '+(ok?'ok':'bad');setTimeout(()=>e.classList.add('hidden'),3200)}function setLang(l){lang=l;localStorage.setItem('jpgym_lang',l);document.documentElement.lang=l;document.querySelectorAll('[data-lang]').forEach(b=>b.classList.toggle('on',b.dataset.lang===l));document.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=tr(e.dataset.i18n));document.querySelectorAll('[data-i18n-placeholder]').forEach(e=>e.placeholder=tr(e.dataset.i18nPlaceholder));if(editingFoodId&&$('saveFood'))$('saveFood').textContent=tr('saveChanges');renderNav();const active=document.querySelector('.sec.on')?.id;if(active==='supplements')loadSupplements();if(active==='settings')loadSettings();if(active==='home')checkMeasReminder()}document.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>setLang(b.dataset.lang));
function renderNav(){const html=nav.map(([id,ic,key])=>`<button data-sec="${id}" class="${document.querySelector('.sec.on')?.id===id?'on':''}"><span>${ic}</span><span>${key.startsWith('JP')?key:tr(key)}</span></button>`).join('');$('sideNav').innerHTML=html;$('mobileNav').innerHTML=nav.filter(x=>['home','food','training','supplements','coach'].includes(x[0])).map(([id,ic,key])=>`<button data-sec="${id}"><div>${ic}</div>${key.startsWith('JP')?'Coach':tr(key)}</button>`).join('');document.querySelectorAll('[data-sec]').forEach(b=>b.onclick=()=>openSec(b.dataset.sec))}
function openSec(id){document.querySelectorAll('.sec').forEach(s=>s.classList.toggle('on',s.id===id));document.querySelectorAll('[data-sec]').forEach(b=>b.classList.toggle('on',b.dataset.sec===id));const item=nav.find(x=>x[0]===id);$('pageTitle').textContent=item?(item[2].startsWith('JP')?item[2]:tr(item[2])):'JP GYM';$('sidebar').classList.remove('open');if(id==='home')loadDashboard();if(id==='profile')loadProfile();if(id==='weight')loadWeights();if(id==='food')loadFood();if(id==='training')loadExercises();if(id==='machines')loadMachines();if(id==='supplements')loadSupplements();if(id==='progress'){loadMeasures();loadBodyPhotos()}if(id==='goals')loadGoals();if(id==='settings')loadSettings();scrollTo(0,0)}$('menuBtn').onclick=()=>$('sidebar').classList.toggle('open');
let appliedUserId=null;async function authInit(){const{data:{session}}=await sb.auth.getSession();await applySession(session);sb.auth.onAuthStateChange((_e,s)=>applySession(s))}async function applySession(s){const next=s?.user||null;const same=!!next&&appliedUserId===next.id;user=next;$('auth').classList.toggle('hidden',!!user);$('app').classList.toggle('hidden',!user);if(!user){appliedUserId=null;return}if(same)return;appliedUserId=user.id;$('userEmail').textContent=user.email||'';renderNav();await loadDashboard();populateSupplementSelect()}$('login').onclick=async()=>{try{$('authmsg').textContent=tr('loggingIn');const{error}=await sb.auth.signInWithPassword({email:$('email').value,password:$('pw').value});$('authmsg').textContent=error?.message||''}catch(e){$('authmsg').textContent='Erro: '+(e?.message||String(e))}};$('signup').onclick=async()=>{const{error}=await sb.auth.signUp({email:$('email').value,password:$('pw').value,options:{emailRedirectTo:location.origin}});$('authmsg').textContent=error?error.message:tr('accountCreated')};$('logout').onclick=()=>sb.auth.signOut();
async function loadDashboard(){if(!user)return;const since=new Date(Date.now()-7*864e5).toISOString();const [w,p,e,m]=await Promise.all([sb.from('weight_logs').select('weight_kg,measured_at').eq('user_id',user.id).order('measured_at',{ascending:false}).limit(1),sb.from('profiles').select('target_weight_kg').eq('user_id',user.id).maybeSingle(),sb.from('exercise_logs').select('id').eq('user_id',user.id).gte('logged_at',since),sb.from('gym_machines').select('id').eq('user_id',user.id).eq('active',true)]);$('dashWeight').textContent=w.data?.[0]?.weight_kg?`${w.data[0].weight_kg} kg`:'—';$('dashTarget').textContent=p.data?.target_weight_kg?`${p.data.target_weight_kg} kg`:'—';$('dashWorkouts').textContent=e.data?.length||0;$('dashMachines').textContent=m.data?.length||0;$('quickGrid').innerHTML=[['food','🍽',tr('food')],['training','🏋',tr('training')],['machines','📷',tr('machinesAI')],['supplements','🧪',tr('supplements')],['weight','⚖',tr('weight')],['progress','📈',tr('progress')],['reports','📄',tr('reports')],['coach','🤖','JP Coach IA']].map(x=>`<div class="card span3 quick" data-q="${x[0]}"><h3>${x[1]} ${x[2]}</h3><p>${tr('open')}</p></div>`).join('');document.querySelectorAll('[data-q]').forEach(e=>e.onclick=()=>openSec(e.dataset.q));checkMeasReminder()}
async function checkMeasReminder(){if(!user)return;const{data}=await sb.from('measurements').select('measured_at').eq('user_id',user.id).order('measured_at',{ascending:false}).limit(1);const box=$('measReminder');if(!box)return;const last=data?.[0]?.measured_at;let days=null;if(last)days=Math.floor((Date.now()-new Date(last).getTime())/864e5);if(!last||days>=7){box.classList.remove('hidden');$('measReminderTitle').textContent=tr('measReminderHeading');$('measReminderText').textContent=last?tr('measReminderDue').replace('{n}',days):tr('measReminderNever');$('measReminderCta').textContent=tr('measReminderCta')}else{box.classList.add('hidden')}}
$('measReminderCta').onclick=()=>openSec('progress');
async function loadProfile(){const{data}=await sb.from('profiles').select('*').eq('user_id',user.id).maybeSingle();$('pName').value=data?.display_name||'';$('pAge').value=data?.age||'';$('pHeight').value=data?.height_cm||'';$('pTarget').value=data?.target_weight_kg||'';$('pGoals').value=(data?.goals||[]).join(', ');$('pNotes').value=data?.health_notes?.notes||'';$('goalsText').value=(data?.goals||[]).join('\n')}$('saveProfile').onclick=async()=>{const payload={user_id:user.id,display_name:$('pName').value||null,age:+$('pAge').value||null,height_cm:+$('pHeight').value||null,target_weight_kg:+$('pTarget').value||null,goals:$('pGoals').value.split(',').map(x=>x.trim()).filter(Boolean),health_notes:{notes:$('pNotes').value},updated_at:new Date().toISOString()};const{error}=await sb.from('profiles').upsert(payload);toast(error?error.message:tr('save'),!error);if(!error)loadDashboard()};
let editingWeightId=null;
function resetWeightForm(){
  editingWeightId=null;
  $('wDate').value=nowLocal();
  $('wKg').value='';
  $('wNote').value='';
  $('saveWeight').textContent=tr('save');
  const c=$('cancelEditWeight');if(c)c.remove();
}
function startEditWeight(x){
  editingWeightId=x.id;
  const d=new Date(x.measured_at);d.setMinutes(d.getMinutes()-d.getTimezoneOffset());
  $('wDate').value=d.toISOString().slice(0,16);
  $('wKg').value=x.weight_kg??'';
  $('wNote').value=x.note??'';
  $('saveWeight').textContent=tr('saveChanges');
  if(!$('cancelEditWeight')){
    const b=document.createElement('button');
    b.id='cancelEditWeight';b.type='button';b.className='btn secondary';b.textContent=tr('cancelEdit');
    b.style.marginTop='10px';b.style.width='100%';
    b.onclick=()=>resetWeightForm();
    $('saveWeight').insertAdjacentElement('afterend',b);
  }
  $('wKg').scrollIntoView({behavior:'smooth',block:'center'});
  $('wKg').focus();
}
$('wDate').value=nowLocal();
$('saveWeight').onclick=async()=>{
  const kg=+$('wKg').value;
  if(!kg||kg<20||kg>300){toast(lang==='fr'?'Poids invalide.':'Peso inválido.',false);return}
  const payload={measured_at:new Date($('wDate').value||Date.now()).toISOString(),weight_kg:kg,note:$('wNote').value||null};
  let error;
  if(editingWeightId){
    ({error}=await sb.from('weight_logs').update(payload).eq('id',editingWeightId).eq('user_id',user.id));
  }else{
    ({error}=await sb.from('weight_logs').insert({user_id:user.id,...payload}));
  }
  toast(error?error.message:(editingWeightId?tr('saveChanges'):tr('save')),!error);
  if(!error){resetWeightForm();loadWeights();loadDashboard()}
};
async function loadWeights(){
  const{data}=await sb.from('weight_logs').select('*').eq('user_id',user.id).order('measured_at',{ascending:false}).limit(30);
  window.__weightRows=data||[];
  $('weightList').innerHTML=(data||[]).map(x=>`<div class=item><b>${x.weight_kg} kg</b><br><small>${new Date(x.measured_at).toLocaleString(locale())}${x.note?' · '+esc(x.note):''}</small><div class="item-actions"><button class="btn tiny secondary" data-edit-weight="${x.id}">${tr('edit')}</button></div></div>`).join('')||`<div class=muted>—</div>`;
  document.querySelectorAll('[data-edit-weight]').forEach(b=>b.onclick=()=>{const row=(window.__weightRows||[]).find(r=>r.id===b.dataset.editWeight);if(row)startEditWeight(row)});
}
async function fileToData(file){
  // Reduz a fotografia antes de a converter para Base64 para evitar picos de RAM em Android.
  if(!file||!String(file.type||'').startsWith('image/'))return null;
  const MAX=1280, QUALITY=.78;
  let bmp=null,url='';
  try{
    if('createImageBitmap' in window)bmp=await createImageBitmap(file);
    else{
      url=URL.createObjectURL(file);
      bmp=await new Promise((res,rej)=>{const im=new Image();im.onload=()=>res(im);im.onerror=rej;im.src=url});
    }
    const sw=bmp.width||bmp.naturalWidth,sh=bmp.height||bmp.naturalHeight;
    const scale=Math.min(1,MAX/Math.max(sw,sh)),w=Math.max(1,Math.round(sw*scale)),h=Math.max(1,Math.round(sh*scale));
    const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
    const ctx=canvas.getContext('2d',{alpha:false});ctx.drawImage(bmp,0,0,w,h);
    const data=canvas.toDataURL('image/jpeg',QUALITY);
    canvas.width=1;canvas.height=1;
    if(bmp&&typeof bmp.close==='function')bmp.close();
    if(url)URL.revokeObjectURL(url);
    return data;
  }catch(e){
    if(bmp&&typeof bmp.close==='function')bmp.close();
    if(url)URL.revokeObjectURL(url);
    throw e;
  }
}
$('fDate').value=nowLocal();
$('fImg').onchange=async e=>{
  const f=e.target.files?.[0];
  if(!f)return;
  foodImage=await fileToData(f);
  $('fPreview').src=foodImage;
  $('fPreview').classList.remove('hidden');
};
async function aiCall(url,body){
  const sess=(await sb.auth.getSession()).data.session;
  const r=await fetch(url,{method:'POST',headers:{'content-type':'application/json',...(sess?.access_token?{Authorization:`Bearer ${sess.access_token}`}:{})},body:JSON.stringify(body)});
  let j={};try{j=await r.json()}catch{}
  if(!r.ok)throw Error(j.error||`HTTP ${r.status}`);
  return j
}
$('analyzeFood').onclick=async()=>{
  const out=$('foodAI');
  out.classList.remove('hidden');
  out.textContent=tr('analyzing');
  try{
    lastFoodAI=await aiCall(CFG.AI.analyzeFood,{description:$('fDesc').value,imageData:foodImage,language:lang});
    $('fKcal').value=lastFoodAI.calories??'';
    $('fProtein').value=lastFoodAI.protein_g??'';
    $('fCarbs').value=lastFoodAI.carbs_g??'';
    $('fFat').value=lastFoodAI.fat_g??'';
    if(!$('fDesc').value.trim()&&lastFoodAI.description)$('fDesc').value=lastFoodAI.description;
    const bits=[];
    if(lastFoodAI.summary)bits.push(lastFoodAI.summary);
    if(lastFoodAI.portion_estimate_g)bits.push((lang==='fr'?'Portion estimée: ':'Porção estimada: ')+lastFoodAI.portion_estimate_g+' g');
    if(lastFoodAI.confidence)bits.push((lang==='fr'?'Confiance: ':'Confiança: ')+lastFoodAI.confidence);
    if(Array.isArray(lastFoodAI.items)&&lastFoodAI.items.length){
      bits.push(lastFoodAI.items.map(i=>`• ${i.name||''}${i.estimated_g?` ~${i.estimated_g} g`:''}${i.calories!=null?` · ${i.calories} kcal`:''}`).join('\n'));
    }
    out.textContent=bits.filter(Boolean).join('\n')||JSON.stringify(lastFoodAI,null,2);
    foodImage=null; if($('fImg'))$('fImg').value='';
  }catch(e){out.textContent=tr('aiNotReady')+e.message}
};
function resetFoodForm(){
  editingFoodId=null;
  ['fDesc','fKcal','fProtein','fCarbs','fFat'].forEach(x=>$(x).value='');
  $('fDate').value=nowLocal();
  if($('fImg'))$('fImg').value='';
  foodImage=null;
  lastFoodAI={};
  $('fPreview').classList.add('hidden');
  $('foodAI').classList.add('hidden');
  $('saveFood').textContent=tr('saveMeal');
  $('cancelEditFood').classList.add('hidden')
}
$('saveFood').onclick=async()=>{
  const aiEst={...lastFoodAI};
  if(aiEst.supplements)delete aiEst.supplements;
  const payload={
    user_id:user.id,
    logged_at:new Date($('fDate').value||Date.now()).toISOString(),
    meal_type:$('fType').value,
    description:$('fDesc').value||lastFoodAI.description||tr('mealFallback'),
    calories:+$('fKcal').value||null,
    protein_g:+$('fProtein').value||null,
    carbs_g:+$('fCarbs').value||null,
    fat_g:+$('fFat').value||null,
    ai_estimate:aiEst
  };
  let error;
  if(editingFoodId){
    ({error}=await sb.from('food_logs').update(payload).eq('id',editingFoodId).eq('user_id',user.id))
  }else{
    ({error}=await sb.from('food_logs').insert(payload))
  }
  toast(error?error.message:tr('save'),!error);
  if(!error){resetFoodForm();loadFood()}
};
$('cancelEditFood').onclick=()=>resetFoodForm();
function editFood(x){
  editingFoodId=x.id;
  const d=new Date(x.logged_at);
  d.setMinutes(d.getMinutes()-d.getTimezoneOffset());
  $('fDate').value=d.toISOString().slice(0,16);
  $('fType').value=x.meal_type||'breakfast';
  $('fDesc').value=x.description||'';
  $('fKcal').value=x.calories??'';
  $('fProtein').value=x.protein_g??'';
  $('fCarbs').value=x.carbs_g??'';
  $('fFat').value=x.fat_g??'';
  lastFoodAI=x.ai_estimate||{};
  foodImage=null;
  if($('fImg'))$('fImg').value='';
  $('fPreview').classList.add('hidden');
  $('foodAI').classList.add('hidden');
  $('saveFood').textContent=tr('saveChanges');
  $('cancelEditFood').classList.remove('hidden');
  $('fDesc').scrollIntoView({behavior:'smooth',block:'center'})
}
async function deleteFood(id){if(!confirm(tr('confirmDelete')))return;const{error}=await sb.from('food_logs').delete().eq('id',id).eq('user_id',user.id);toast(error?error.message:tr('deleted'),!error);if(!error){if(editingFoodId===id)resetFoodForm();loadFood()}}
async function loadFood(){
  const{data}=await sb.from('food_logs').select('*').eq('user_id',user.id).order('logged_at',{ascending:false}).limit(50);
  window.__foodRows=data||[];
  $('foodList').innerHTML=(data||[]).map(x=>`<div class=item><b>${esc(x.description)}</b><br><small>${new Date(x.logged_at).toLocaleString(locale())} · ${x.calories??'?'} kcal · P ${x.protein_g??'?'} g · HC ${x.carbs_g??'?'} g · G ${x.fat_g??'?'} g</small><div class="item-actions"><button class="btn tiny secondary" data-edit-food="${x.id}">${tr('edit')}</button><button class="btn tiny danger" data-del-food="${x.id}">${tr('remove')}</button></div></div>`).join('')||'<div class=muted>—</div>';
  document.querySelectorAll('[data-edit-food]').forEach(b=>b.onclick=()=>{const row=(window.__foodRows||[]).find(r=>r.id===b.dataset.editFood);if(row)editFood(row)});
  document.querySelectorAll('[data-del-food]').forEach(b=>b.onclick=()=>deleteFood(b.dataset.delFood))
}
let trainingSetCount=0;
function addTrainingSet(weight='',reps=''){
  trainingSetCount++;
  const row=document.createElement('div');row.className='item training-set-row';
  row.innerHTML=`<b>Série ${trainingSetCount}</b><div class="row2" style="margin-top:7px"><div><label>Peso (kg)</label><input class="ts-weight" type="number" step=".1" value="${esc(weight)}" inputmode="decimal"></div><div><label>Repetições</label><input class="ts-reps" type="number" min="1" step="1" value="${esc(reps)}" inputmode="numeric"></div></div><button type="button" class="btn tiny secondary ts-remove" style="margin-top:7px">Remover</button>`;
  row.querySelector('.ts-remove').onclick=()=>{row.remove();renumberTrainingSets()};
  $('tSetRows').appendChild(row)
}
function renumberTrainingSets(){trainingSetCount=0;document.querySelectorAll('#tSetRows .training-set-row').forEach(r=>{trainingSetCount++;r.querySelector('b').textContent='Série '+trainingSetCount})}
function resetTrainingForm(){trainingSetCount=0;$('tSetRows').innerHTML='';addTrainingSet();$('tExercise').value='';$('tMuscle').value='';$('tDifficulty').value='';$('tMachine').value='';$('tDate').value=nowLocal()}
$('tDate').value=nowLocal();$('addSet').onclick=()=>addTrainingSet();addTrainingSet();
$('tPhotoMachineBtn').onclick=()=>{$('tMachineImg').value='';$('tMachineImg').click()};
$('tMachineImg').onchange=async e=>{
  const f=e.target.files?.[0];if(!f)return;
  const out=$('tMachinePhotoStatus');out.classList.remove('hidden');out.textContent='A identificar a máquina…';
  try{
    const imageData=await fileToData(f);
    const ai=await aiCall(CFG.AI.analyzeMachine,{imageData,notes:'Return the gym machine name in English only. Use the standard English equipment name. Also identify the muscle group.',language:'en'});
    const name=englishMachineName(String(ai.name||'').trim());
    if(!name)throw Error('Não foi possível identificar o nome da máquina.');
    const muscle=String(ai.muscle_group||'').trim()||null;
    const{data:existing}=await sb.from('gym_machines').select('id,name,muscle_group').eq('user_id',user.id).eq('active',true);
    let machine=(existing||[]).find(x=>norm(x.name)===norm(name));
    if(!machine){
      const{data,error}=await sb.from('gym_machines').insert({user_id:user.id,name,muscle_group:muscle,notes:null,ai_identification:{name,muscle_group:muscle},active:true}).select('id,name,muscle_group').single();
      if(error)throw error;machine=data
    }
    await fillTrainingMachines();$('tMachine').value=machine.id;$('tExercise').value=machine.name;$('tMuscle').value=machine.muscle_group||'';
    out.textContent='✓ '+machine.name+' adicionada. A fotografia não foi guardada.';
    e.target.value='';setTimeout(()=>{out.classList.add('hidden');out.textContent=''},4500)
  }catch(err){out.textContent='Erro: '+(err?.message||String(err));e.target.value=''}
};
$('tMachine').onchange=()=>{const o=$('tMachine').selectedOptions[0];if(!o||!o.value)return;$('tExercise').value=o.dataset.name||o.textContent;$('tMuscle').value=o.dataset.muscle||''};
async function fillTrainingMachines(){
  const{data}=await sb.from('gym_machines').select('id,name,muscle_group').eq('user_id',user.id).eq('active',true).order('name');
  const cur=$('tMachine').value;
  $('tMachine').innerHTML='<option value="">— Escolher —</option>'+(data||[]).map(x=>`<option value="${esc(x.id)}" data-name="${esc(x.name)}" data-muscle="${esc(x.muscle_group||'')}">${esc(x.name)}</option>`).join('');
  if(cur)$('tMachine').value=cur
}
$('saveExercise').onclick=async()=>{
  const name=$('tExercise').value.trim()||$('tMachine').selectedOptions[0]?.dataset.name||'';
  if(!name){toast('Escolhe ou escreve um exercício.',false);return}
  const rows=[...document.querySelectorAll('#tSetRows .training-set-row')].map((r,i)=>({n:i+1,weight:parseFloat(r.querySelector('.ts-weight').value),reps:parseInt(r.querySelector('.ts-reps').value)})).filter(x=>Number.isFinite(x.reps)&&x.reps>0);
  if(!rows.length){toast('Adiciona pelo menos uma série com repetições.',false);return}
  const difficulty=$('tDifficulty').value;
  const muscle=[$('tMuscle').value.trim(),difficulty?'Dificuldade: '+difficulty:''].filter(Boolean).join(' · ')||null;
  const baseTime=new Date($('tDate').value||Date.now()).getTime();
  const payload=rows.map(x=>({user_id:user.id,logged_at:new Date(baseTime+x.n*1000).toISOString(),exercise_name:name+' · S'+x.n,muscle_group:muscle,weight_kg:Number.isFinite(x.weight)?x.weight:null,sets:1,reps:[x.reps],duration_min:null}));
  const{error}=await sb.from('exercise_logs').insert(payload);
  toast(error?error.message:'Treino guardado.',!error);
  if(!error){resetTrainingForm();loadExercises();loadDashboard()}
};
async function seedTodayWorkout(){
  const key='jpgym_seed_2026_09_26_'+user.id;if(localStorage.getItem(key))return;
  const start='2026-09-26T00:00:00+02:00',end='2026-09-27T00:00:00+02:00';
  const{data:existing}=await sb.from('exercise_logs').select('exercise_name').eq('user_id',user.id).gte('logged_at',start).lt('logged_at',end);
  if((existing||[]).some(x=>String(x.exercise_name||'').includes('Converging Chest Press'))){localStorage.setItem(key,'1');return}
  const base=new Date('2026-09-26T15:05:00+02:00').getTime();
  const items=[
    ['Remo · S1','Cardio',null,[],1],['Remo · S2','Cardio',null,[],1],
    ['Converging Chest Press · S1','Peito',18,[12],null],['Converging Chest Press · S2','Peito',18,[12],null],['Converging Chest Press · S3','Peito',25,[12],null],
    ['Pec Fly · S1','Peito',39,[12],null],['Pec Fly · S2','Peito',45,[12],null],['Pec Fly · S3','Peito',52,[12],null],
    ['Rear Delt · S1','Ombros posteriores',25,[20],null],['Rear Delt · S2','Ombros posteriores',39,[12],null],['Rear Delt · S3','Ombros posteriores',45,[12],null],
    ['Diverging Lat Pulldown · S1','Costas',27,[20],null],['Diverging Lat Pulldown · S2','Costas',32,[12],null],['Diverging Lat Pulldown · S3','Costas',36,[12],null],
    ['Tríceps na polia com corda · S1','Tríceps',9,[12],null],['Tríceps na polia com corda · S2','Tríceps',11.3,[12],null],['Tríceps na polia com corda · S3','Tríceps',13.5,[12],null],
    ['Bíceps na polia · S1','Bíceps',9,[20],null],['Bíceps na polia · S2','Bíceps',11.3,[12],null],['Bíceps na polia · S3','Bíceps',13.5,[12],null],
    ['Smith Machine · S1','Peito',10,[12],null],['Smith Machine · S2','Peito',20,[10],null],
    ['Bíceps com barra · S1','Bíceps',15,[20],null],['Bíceps com barra · S2','Bíceps',25,[12],null],['Bíceps com barra · S3','Bíceps',25,[8],null]
  ];
  const payload=items.map((x,i)=>({user_id:user.id,logged_at:new Date(base+i*60000).toISOString(),exercise_name:x[0],muscle_group:x[1],weight_kg:x[2],sets:1,reps:x[3],duration_min:x[4]}));
  payload[0].exercise_name='Remo · S1 · 195 m';payload[1].exercise_name='Remo · S2 · 215 m';
  const{error}=await sb.from('exercise_logs').insert(payload);if(!error)localStorage.setItem(key,'1')
}
async function loadExercises(){
  await seedTodayWorkout();
  const{data}=await sb.from('exercise_logs').select('*').eq('user_id',user.id).order('logged_at',{ascending:false}).limit(100);
  $('exerciseList').innerHTML=(data||[]).map(x=>`<div class=item><b>${esc(x.exercise_name)}</b><br><small>${new Date(x.logged_at).toLocaleString(locale())}${x.muscle_group?' · '+esc(x.muscle_group):''}${x.weight_kg!=null?' · '+x.weight_kg+' kg':''}${(x.reps||[]).length?' · '+(x.reps||[]).join(',')+' reps':''}${x.duration_min?' · '+x.duration_min+' min':''}</small></div>`).join('')||'<div class=muted>—</div>';
  fillTrainingMachines()
}
$('mImg').onchange=async e=>{const f=e.target.files?.[0];if(f){machineImage=await fileToData(f);$('mPreview').src=machineImage;$('mPreview').classList.remove('hidden');if($('machineAI')){$('machineAI').classList.remove('hidden');$('machineAI').textContent='Fotografia pronta. Toca em “Identificar com IA” para adicionar a máquina; a imagem não será guardada.'}}};$('analyzeMachine').onclick=async()=>{const out=$('machineAI');out.classList.remove('hidden');out.textContent=tr('identifying');try{lastMachineAI=await aiCall(CFG.AI.analyzeMachine,{imageData:machineImage,notes:$('mNote').value,language:lang});$('mName').value=lastMachineAI.name||$('mName').value;$('mMuscle').value=lastMachineAI.muscle_group||$('mMuscle').value;out.textContent=lastMachineAI.summary||JSON.stringify(lastMachineAI,null,2);machineImage=null;if($('mImg'))$('mImg').value=''}catch(e){out.textContent=tr('aiNotReady')+e.message}};$('saveMachine').onclick=async()=>{const{error}=await sb.from('gym_machines').insert({user_id:user.id,name:englishMachineName($('mName').value||lastMachineAI.name||tr('machineFallback')),muscle_group:$('mMuscle').value||lastMachineAI.muscle_group||null,notes:$('mNote').value||null,ai_identification:lastMachineAI,active:true});toast(error?error.message:tr('save'),!error);if(!error){$('mName').value='';$('mMuscle').value='';$('mNote').value='';machineImage=null;lastMachineAI={};$('mImg').value='';$('mPreview').src='';$('mPreview').classList.add('hidden');$('machineAI').classList.add('hidden');loadMachines();fillTrainingMachines();loadDashboard()}};const legacyMachineEnglish={'Polia Ajustável':'Adjustable Cable Machine','Máquina de Adução de Anca':'Hip Adduction Machine','Máquina de Abdominais':'Abdominal Crunch Machine','Máquina de Peitoral e Deltóide Posterior':'Pec Fly / Rear Delt Machine','Lat Pulldown Divergente':'Diverging Lat Pulldown'};
const legacyMuscleEnglish={'Corpo todo':'Full Body','Adutores':'Adductors','Abdominais':'Abdominals','Costas':'Back','Peitoral e Costas':'Chest / Rear Delts','Costas (Dorsais)':'Back (Lats)'};
async function migrateMachineNamesToEnglish(){const q=await sb.from('gym_machines').select('id,name,muscle_group').eq('user_id',user.id).eq('active',true);if(q.error)return;for(const x of q.data||[]){const name=legacyMachineEnglish[x.name]||englishMachineName(x.name);const muscle=legacyMuscleEnglish[x.muscle_group]||x.muscle_group;if(name!==x.name||muscle!==x.muscle_group)await sb.from('gym_machines').update({name,muscle_group:muscle}).eq('id',x.id).eq('user_id',user.id)}}
async function loadMachines(){await migrateMachineNamesToEnglish();const{data}=await sb.from('gym_machines').select('*').eq('user_id',user.id).eq('active',true).order('created_at',{ascending:false});$('machineList').innerHTML=(data||[]).map(x=>`<div class=item><b>${esc(x.name||tr('machineFallback'))}</b><br><small>${esc(x.muscle_group||'')} ${x.notes?'· '+esc(x.notes):''}</small></div>`).join('')||'<div class=muted>—</div>';fillTrainingMachines()}$('generateWorkout').onclick=async()=>{const out=$('workoutAI');out.classList.remove('hidden');out.textContent=tr('preparing');try{const context=await buildContext();const machines=(await sb.from('gym_machines').select('name,muscle_group,notes').eq('user_id',user.id).eq('active',true)).data||[];const j=await aiCall(CFG.AI.generateWorkout,{context,machines,language:lang});out.textContent=j.workout||j.answer||JSON.stringify(j,null,2)}catch(e){out.textContent=tr('aiNotReady')+e.message}}
const staticSupp=[
{key:'weight-gainer-massive-addict',name:'Weight Gainer Massive – Chocolate Hazelnut',img:'https://sport-nutrition.be/web/image/product.template/6738/image_1920?unique=b95ece7'},
{key:'mutant-mass',name:'Mutant Mass – Muscle Mass Gainer',img:'https://mutantnation.com/cdn/shop/files/31502US_MUTANT_MASS_Triple_Chocolate_Flavor_5_LB_2.27_KG_v2.00_NS-L3.png?v=1745428582'},
{key:'hiro-lab-turkesterone',name:'Turkesterone 600 mg – 90 Vcaps',img:'https://bigforcestore.com/cdn/shop/files/TUKESTERONE-HIROLAB.png?v=1737478617&width=1946'},
{key:'mass-gainer-prime',name:'Prime Mass Gainer + Creatine',img:'./assets/supp_mass.jpg?v=20260903'},
{key:'mass-gainer-2268',name:'Mass Gainer 2268 g',img:'./assets/supp_mass_2268.jpg?v=20260903'},
{key:'isogainz-4000',name:'ISOGAINZ 4000 g – Lemon Pie',img:'./assets/supp_isogainz.png?v=20260903'},
{key:'creatine-creapure',name:'Creatine Creapure® 300 g',img:'./assets/supp_creatine.jpg?v=20260903'},
{key:'big-shot',name:'Big Shot Pre-Workout – Flash Cola',img:'./assets/supp_bigshot.jpg?v=20260903'},
{key:'collagen-magnesium',name:'Collagen + Magnesium – Forest Fruit',img:'./assets/supp_collagen.jpg?v=20260903'},
{key:'zmb6-lifepro',name:'ZMB6 Advanced Formula',img:'./assets/supp_zmb6.png?v=20260903'},
];
function norm(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim()}const machineEnglishMap=[
 ['converging chest press','Converging Chest Press'],['chest press','Chest Press'],['pec fly','Pec Fly'],['rear delt','Rear Delt'],['diverging lat pulldown','Diverging Lat Pulldown'],['lat pulldown','Lat Pulldown'],['smith machine','Smith Machine'],['triceps pushdown','Triceps Pushdown'],['biceps cable curl','Cable Biceps Curl'],['cable curl','Cable Biceps Curl'],['biceps com barra','Barbell Biceps Curl'],['remo','Rowing Machine']
];
function englishMachineName(v){const n=norm(v);for(const [k,en] of machineEnglishMap){if(n.includes(norm(k)))return en}return String(v||'').trim()}

function imageForSupplement(s){
  const exact=staticSupp.find(x=>x.key===s.image_key);
  if(exact)return exact.img;
  const byName=staticSupp.find(x=>norm(s.name)===norm(x.name));
  return byName?.img||'./assets/logo.png'
}
function populateSupplementSelect(){
  if(!$('sName'))return;
  // Apenas nomes no arranque: não renderiza fotografias/composição enquanto o utilizador está no Painel.
  sb.from('supplement_catalog').select('name').eq('user_id',user.id).eq('active',true).order('created_at').then(({data})=>{
    const names=[],seen=new Set();
    for(const x of(data||[])){const n=norm(x.name);if(n&&!seen.has(n)){seen.add(n);names.push(x.name)}}
    const finalNames=names.length?names:staticSupp.map(x=>x.name);
    $('sName').innerHTML=finalNames.map(n=>`<option>${esc(n)}</option>`).join('');
  });
}
async function loadSupplements(){
  if(!user)return;
  const{data}=await sb.from('supplement_catalog').select('*').eq('user_id',user.id).eq('active',true).order('created_at');
  const unique=[],seen=new Set();
  for(const s of(data||[])){const n=norm(s.name);if(seen.has(n))continue;seen.add(n);unique.push(s)}
  const catalog=unique.length?unique:staticSupp.map(s=>({name:s.name,image_key:s.key,brand:'',composition:{},serving:'—',notes:''}));
  $('suppGrid').innerHTML=catalog.map(s=>{
    const img=imageForSupplement(s);
    const composition=(lang==='fr'&&s.composition_fr&&Object.keys(s.composition_fr).length)?s.composition_fr:(s.composition||{});
    const serving=(lang==='fr'&&s.serving_fr)?s.serving_fr:(s.serving||'—');
    const notes=(lang==='fr'&&s.notes_fr)?s.notes_fr:(s.notes||'');
    const ptLabels={salt:'sal',iron:'ferro',fiber:'fibra',fibre:'fibra',sodium:'sódio',trans:'gorduras trans',calcium:'cálcio',energy:'energia',fat:'gordura',sugars:'açúcares',carbs:'hidratos de carbono',carbohydrates:'hidratos de carbono',potassium:'potássio',protein:'proteína',saturates:'gorduras saturadas',saturated_fat:'gorduras saturadas',allergens:'alergénios',cholesterol:'colesterol',ingredients:'ingredientes',flavour:'sabor'};
    const ptValue=(k,v)=>{
      if(lang!=='pt'||typeof v!=='string')return v;
      if(k==='allergens'||k==='alergenios')return v.replace(/Contains milk \(whey\) and soy \(lecithin\)\.?/gi,'Contém leite (soro de leite) e soja (lecitina).');
      if(k==='ingredients'||k==='ingredientes')return v
        .replace(/Carbo blend:/gi,'Mistura de hidratos de carbono:')
        .replace(/waxy maize starch/gi,'amido de milho ceroso').replace(/maltodextrin/gi,'maltodextrina')
        .replace(/fermented pea starch/gi,'amido de ervilha fermentado').replace(/rice/gi,'arroz')
        .replace(/sweet potato/gi,'batata-doce').replace(/Mutant Mass Pro-Matrix:/gi,'Mutant Mass Pro-Matrix:')
        .replace(/whey protein concentrate/gi,'concentrado de proteína de soro de leite')
        .replace(/hydrolyzed whey protein/gi,'proteína de soro de leite hidrolisada')
        .replace(/whey protein isolate/gi,'isolado de proteína de soro de leite')
        .replace(/milk protein concentrate/gi,'concentrado de proteína do leite')
        .replace(/micellar casein/gi,'caseína micelar').replace(/milk protein isolate/gi,'isolado de proteína do leite')
        .replace(/Lipid foods blend:/gi,'Mistura de lípidos:')
        .replace(/fractionated coconut oil\/MCT/gi,'óleo de coco fracionado/MCT')
        .replace(/avocado/gi,'abacate').replace(/flax seed/gi,'sementes de linhaça')
        .replace(/pumpkin seed/gi,'sementes de abóbora').replace(/Thickener/gi,'Espessante')
        .replace(/natural\/artificial flavours/gi,'aromas naturais/artificiais')
        .replace(/colour/gi,'corante').replace(/soy lecithin/gi,'lecitina de soja')
        .replace(/enzymes/gi,'enzimas');
      return v;
    };
    const comp=Object.entries(composition).map(([k,v])=>{const nk=norm(k).replaceAll(' ','_');const label=lang==='pt'?(ptLabels[nk]||k.replaceAll('_',' ')):k.replaceAll('_',' ');return `<div class=kv><span>${esc(label)}</span><span>${esc(ptValue(nk,v))}</span></div>`}).join('');
    return `<article class=supp-card><div class="supp-img-wrap ${s.image_key==='mutant-mass'?'mutant-zoom':''}"><img src="${img}" alt="${esc(s.name)}"></div><div><span class=tag>${esc(s.brand||'')}</span><h3>${esc(s.name)}</h3><div class=kv><span>Dose</span><span>${esc(serving)}</span></div>${comp}<p class=muted style="font-size:11px">${esc(notes)}</p></div></article>`
  }).join('');
  $('sName').innerHTML=catalog.map(s=>`<option>${esc(s.name)}</option>`).join('');
  loadSuppLogs()
}
$('sDate').value=nowLocal();
$('saveSuppLog').onclick=async()=>{
  const{error}=await sb.from('supplement_logs').insert({
    user_id:user.id,
    logged_at:new Date($('sDate').value||Date.now()).toISOString(),
    supplement:$('sName').value,
    amount:+$('sAmount').value||null,
    unit:$('sUnit').value||null,
    notes:$('sNote').value||null
  });
  toast(error?error.message:tr('save'),!error);
  if(!error){$('sAmount').value='';$('sUnit').value='';$('sNote').value='';$('sDate').value=nowLocal();loadSuppLogs()}
};
async function loadSuppLogs(){
  const{data}=await sb.from('supplement_logs').select('*').eq('user_id',user.id).order('logged_at',{ascending:false}).limit(60);
  $('suppLogList').innerHTML=(data||[]).map(x=>`<div class=item><b>${esc(x.supplement)}</b><br><small>${new Date(x.logged_at).toLocaleString(locale())} · ${x.amount??''} ${esc(x.unit||'')}${x.notes?' · '+esc(x.notes):''}</small></div>`).join('')||'<div class=muted>—</div>'
}
let editingMeasureId=null;function resetMeasureForm(){editingMeasureId=null;['measChest','measWaist','measArm','measShoulders'].forEach(x=>$(x).value='');$('measDate').value=nowLocal();$('saveMeasure').textContent=tr('save');$('cancelEditMeasure').classList.add('hidden')}$('measDate').value=nowLocal();$('saveMeasure').onclick=async()=>{const payload={user_id:user.id,measured_at:new Date($('measDate').value||Date.now()).toISOString(),chest_cm:+$('measChest').value||null,waist_cm:+$('measWaist').value||null,arm_right_cm:+$('measArm').value||null,shoulders_cm:+$('measShoulders').value||null};let error;if(editingMeasureId){({error}=await sb.from('measurements').update(payload).eq('id',editingMeasureId).eq('user_id',user.id))}else{({error}=await sb.from('measurements').insert(payload))}toast(error?error.message:tr('save'),!error);if(!error){resetMeasureForm();loadMeasures();checkMeasReminder()}};$('cancelEditMeasure').onclick=()=>resetMeasureForm();function editMeasure(x){editingMeasureId=x.id;const d=new Date(x.measured_at);d.setMinutes(d.getMinutes()-d.getTimezoneOffset());$('measDate').value=d.toISOString().slice(0,16);$('measChest').value=x.chest_cm??'';$('measWaist').value=x.waist_cm??'';$('measArm').value=x.arm_right_cm??'';$('measShoulders').value=x.shoulders_cm??'';$('saveMeasure').textContent=tr('saveChanges');$('cancelEditMeasure').classList.remove('hidden');$('measChest').scrollIntoView({behavior:'smooth',block:'center'})}async function deleteMeasure(id){if(!confirm(tr('confirmDelete')))return;const{error}=await sb.from('measurements').delete().eq('id',id).eq('user_id',user.id);toast(error?error.message:tr('deleted'),!error);if(!error){if(editingMeasureId===id)resetMeasureForm();loadMeasures()}}async function loadMeasures(){const{data}=await sb.from('measurements').select('*').eq('user_id',user.id).order('measured_at',{ascending:false}).limit(20);window.__measureRows=data||[];$('measureList').innerHTML=(data||[]).map(x=>`<div class=item><b>${new Date(x.measured_at).toLocaleDateString(locale())}</b><br><small>${tr('measChest')} ${x.chest_cm??'—'} · ${tr('measWaist')} ${x.waist_cm??'—'} · ${tr('measArm')} ${x.arm_right_cm??'—'} · ${tr('measShoulders')} ${x.shoulders_cm??'—'}</small><div class="item-actions"><button class="btn tiny secondary" data-edit-meas="${x.id}">${tr('edit')}</button><button class="btn tiny danger" data-del-meas="${x.id}">${tr('remove')}</button></div></div>`).join('')||'<div class=muted>—</div>';document.querySelectorAll('[data-edit-meas]').forEach(b=>b.onclick=()=>{const row=(window.__measureRows||[]).find(r=>r.id===b.dataset.editMeas);if(row)editMeasure(row)});document.querySelectorAll('[data-del-meas]').forEach(b=>b.onclick=()=>deleteMeasure(b.dataset.delMeas))}let editingPhotoId=null;function resetPhotoForm(){editingPhotoId=null;bodyImageFile=null;$('bodyImg').value='';$('bodyAngle').value='front';$('saveBodyPhoto').textContent=tr('save');$('cancelEditPhoto').classList.add('hidden')}$('bodyImg').onchange=e=>{bodyImageFile=e.target.files?.[0]||null};$('cancelEditPhoto').onclick=()=>resetPhotoForm();$('saveBodyPhoto').onclick=async()=>{if(editingPhotoId){const row=(window.__photoRows||[]).find(r=>r.id===editingPhotoId);let storage_path=row?.storage_path;if(bodyImageFile){const ext=(bodyImageFile.name.split('.').pop()||'jpg').toLowerCase();const path=`${user.id}/body/${Date.now()}.${ext}`;const{error:upErr}=await sb.storage.from('jp-gym-private').upload(path,bodyImageFile,{contentType:bodyImageFile.type||'image/jpeg'});if(upErr){toast(upErr.message,false);return}const oldPath=storage_path;storage_path=path;if(oldPath)sb.storage.from('jp-gym-private').remove([oldPath])}const{error}=await sb.from('body_photos').update({storage_path,angle:$('bodyAngle').value}).eq('id',editingPhotoId).eq('user_id',user.id);toast(error?error.message:tr('save'),!error);if(!error){resetPhotoForm();loadBodyPhotos()}return}if(!bodyImageFile){toast(tr('choosePhotoFirst'),false);return}const ext=(bodyImageFile.name.split('.').pop()||'jpg').toLowerCase();const path=`${user.id}/body/${Date.now()}.${ext}`;const{error:upErr}=await sb.storage.from('jp-gym-private').upload(path,bodyImageFile,{contentType:bodyImageFile.type||'image/jpeg'});if(upErr){toast(upErr.message,false);return}const{error}=await sb.from('body_photos').insert({user_id:user.id,taken_at:new Date().toISOString(),storage_path:path,angle:$('bodyAngle').value});toast(error?error.message:tr('save'),!error);if(!error){resetPhotoForm();loadBodyPhotos()}};const angleKey={front:'angleFront',side:'angleSide',back:'angleBack'};function editPhoto(x){editingPhotoId=x.id;bodyImageFile=null;$('bodyImg').value='';$('bodyAngle').value=x.angle||'front';$('saveBodyPhoto').textContent=tr('saveChanges');$('cancelEditPhoto').classList.remove('hidden');$('bodyAngle').scrollIntoView({behavior:'smooth',block:'center'})}async function deletePhoto(id){if(!confirm(tr('confirmDelete')))return;const row=(window.__photoRows||[]).find(r=>r.id===id);const{error}=await sb.from('body_photos').delete().eq('id',id).eq('user_id',user.id);if(!error&&row?.storage_path)sb.storage.from('jp-gym-private').remove([row.storage_path]);toast(error?error.message:tr('deleted'),!error);if(!error){if(editingPhotoId===id)resetPhotoForm();loadBodyPhotos()}}async function loadBodyPhotos(){const{data}=await sb.from('body_photos').select('*').eq('user_id',user.id).order('taken_at',{ascending:false}).limit(20);const rows=data||[];window.__photoRows=rows;const signed=await Promise.all(rows.map(x=>x.storage_path?sb.storage.from('jp-gym-private').createSignedUrl(x.storage_path,3600):Promise.resolve({data:null})));$('photoList').innerHTML=rows.map((x,i)=>{const url=signed[i]?.data?.signedUrl;return `<div class=item>${url?`<img src="${url}" class="photo-preview" style="max-height:160px">`:''}<b>${new Date(x.taken_at).toLocaleDateString(locale())}</b><br><small>${esc(tr(angleKey[x.angle])||x.angle||'')}</small><div class="item-actions"><button class="btn tiny secondary" data-edit-photo="${x.id}">${tr('edit')}</button><button class="btn tiny danger" data-del-photo="${x.id}">${tr('remove')}</button></div></div>`}).join('')||'<div class=muted>—</div>';document.querySelectorAll('[data-edit-photo]').forEach(b=>b.onclick=()=>{const row=(window.__photoRows||[]).find(r=>r.id===b.dataset.editPhoto);if(row)editPhoto(row)});document.querySelectorAll('[data-del-photo]').forEach(b=>b.onclick=()=>deletePhoto(b.dataset.delPhoto))}
async function loadGoals(){const{data}=await sb.from('profiles').select('goals').eq('user_id',user.id).maybeSingle();$('goalsText').value=(data?.goals||[]).join('\n')}$('saveGoals').onclick=async()=>{const goals=$('goalsText').value.split('\n').map(x=>x.trim()).filter(Boolean);const{error}=await sb.from('profiles').update({goals,updated_at:new Date().toISOString()}).eq('user_id',user.id);toast(error?error.message:tr('save'),!error)};
async function buildContext(){
  const [p,w,f,e,m,s]=await Promise.all([
    sb.from('profiles').select('*').eq('user_id',user.id).maybeSingle(),
    sb.from('weight_logs').select('*').eq('user_id',user.id).order('measured_at',{ascending:false}).limit(30),
    sb.from('food_logs').select('*').eq('user_id',user.id).order('logged_at',{ascending:false}).limit(30),
    sb.from('exercise_logs').select('*').eq('user_id',user.id).order('logged_at',{ascending:false}).limit(40),
    sb.from('gym_machines').select('*').eq('user_id',user.id).eq('active',true),
    sb.from('supplement_logs').select('*').eq('user_id',user.id).order('logged_at',{ascending:false}).limit(30)
  ]);
  return{profile:p.data,weights:w.data||[],food:f.data||[],exercises:e.data||[],machines:m.data||[],supplements:s.data||[]}
}
const coachHistory=[];
function cleanCoachAnswer(v){
  return String(v||'').replace(/^JP Coach:\s*/i,'').replace(/\*\*/g,'').replace(/^#{1,6}\s*/gm,'').trim();
}
$('askCoach').onclick=async()=>{
  const q=$('coachQ').value.trim();if(!q)return;
  const box=$('chat');
  const userMsg=document.createElement('div');userMsg.className='item coach-msg coach-user';userMsg.innerHTML=`<b>${tr('you')}:</b> <span>${esc(q)}</span>`;box.appendChild(userMsg);
  $('coachQ').value='';
  coachHistory.push({role:'user',text:q});if(coachHistory.length>20)coachHistory.splice(0,coachHistory.length-20);
  const reply=document.createElement('div');reply.className='item coach-msg coach-reply';reply.innerHTML='<b>JP Coach:</b> <span class="coach-answer">A pensar…</span>';box.appendChild(reply);
  box.scrollTop=box.scrollHeight;
  $('askCoach').disabled=true;
  try{
    const j=await aiCall(CFG.AI.coach,{message:q,context:await buildContext(),language:lang,history:coachHistory.slice(0,-1)});
    const answer=cleanCoachAnswer(j.answer||j.response||JSON.stringify(j));
    reply.querySelector('.coach-answer').textContent=answer;
    coachHistory.push({role:'assistant',text:answer});if(coachHistory.length>20)coachHistory.splice(0,coachHistory.length-20);
  }catch(e){reply.querySelector('.coach-answer').textContent=tr('aiCoachNotReady')+e.message}
  finally{$('askCoach').disabled=false;box.scrollTop=box.scrollHeight}
}
$('makePdf').onclick=async()=>{
  const from=$('rFrom').value||'2000-01-01';
  const to=$('rTo').value||new Date().toISOString().slice(0,10);
  const type=$('rType').value;
  const L=$('rLang').value,bi=L==='both';
  const T=(fr,pt)=>bi?(fr+' / '+pt):(L==='fr'?fr:pt);
  const localePdf=L==='fr'?'fr-FR':'pt-PT';
  const startIso=new Date(from+'T00:00:00').toISOString();
  const endIso=new Date(to+'T23:59:59.999').toISOString();

  const [p,w,f,e,s,m]=await Promise.all([
    sb.from('profiles').select('*').eq('user_id',user.id).maybeSingle(),
    sb.from('weight_logs').select('*').eq('user_id',user.id).gte('measured_at',startIso).lte('measured_at',endIso).order('measured_at',{ascending:true}),
    sb.from('food_logs').select('*').eq('user_id',user.id).gte('logged_at',startIso).lte('logged_at',endIso).order('logged_at',{ascending:true}),
    sb.from('exercise_logs').select('*').eq('user_id',user.id).gte('logged_at',startIso).lte('logged_at',endIso).order('logged_at',{ascending:true}),
    sb.from('supplement_logs').select('*').eq('user_id',user.id).gte('logged_at',startIso).lte('logged_at',endIso).order('logged_at',{ascending:true}),
    sb.from('measurements').select('*').eq('user_id',user.id).gte('measured_at',startIso).lte('measured_at',endIso).order('measured_at',{ascending:true})
  ]);
  for(const q of [p,w,f,e,s,m]){if(q.error){toast(q.error.message,false);return}}
  const profile=p.data||{};
  const weights=w.data||[];
  const allFoods=f.data||[];
  const exercises=e.data||[];
  const supplements=s.data||[];
  const measures=m.data||[];
  const foods=type==='medical'?allFoods.filter(x=>['breakfast','snack'].includes(x.meal_type)):allFoods;

  const rawTexts=[];
  (profile.goals||[]).forEach(g=>g&&rawTexts.push(g));
  weights.forEach(x=>x.note&&rawTexts.push(x.note));
  foods.forEach(x=>x.description&&rawTexts.push(x.description));
  if(type!=='medical')exercises.forEach(x=>{x.exercise_name&&rawTexts.push(x.exercise_name);x.muscle_group&&rawTexts.push(x.muscle_group)});
  supplements.forEach(x=>x.notes&&rawTexts.push(x.notes));
  let trMap={};
  if(!bi&&rawTexts.length&&CFG.AI.translate){
    try{
      const uniq=[...new Set(rawTexts)];
      const sess=(await sb.auth.getSession()).data.session;
      const r=await fetch(CFG.AI.translate,{method:'POST',headers:{'content-type':'application/json',...(sess?.access_token?{Authorization:`Bearer ${sess.access_token}`}:{})},body:JSON.stringify({texts:uniq,targetLang:L})});
      const j=await r.json();
      (j.translations||[]).forEach((v,i)=>{if(v)trMap[uniq[i]]=v})
    }catch{}
  }
  const TT=v=>(v&&trMap[v])||v||'';
  const dt=v=>new Date(v).toLocaleString(localePdf,{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'});
  const mealName=v=>{
    const map={breakfast:{pt:'Pequeno-almoço',fr:'Petit-déjeuner'},snack:{pt:'Lanche',fr:'Collation'},lunch:{pt:'Almoço',fr:'Déjeuner'},dinner:{pt:'Jantar',fr:'Dîner'},supper:{pt:'Ceia',fr:'Souper'}};
    if(bi)return `${map[v]?.pt||v} / ${map[v]?.fr||v}`;
    return map[v]?.[L==='fr'?'fr':'pt']||v||''
  };

  const {jsPDF}=window.jspdf;
  const doc=new jsPDF();
  const GOLD=[214,182,84],GOLD2=[241,215,122],WHITE=[244,245,247],MUTED=[167,173,182],BG=[9,10,12],PANEL=[21,25,31];
  const pageW=210,pageH=297,margin=15;
  let logoData=null;
  try{const r=await fetch('./assets/logo.png?v=20260903');const b=await r.blob();logoData=await new Promise(res=>{const fr=new FileReader();fr.onload=()=>res(fr.result);fr.readAsDataURL(b)})}catch{}
  let y=0;
  function bgPage(){doc.setFillColor(...BG);doc.rect(0,0,pageW,pageH,'F')}
  function header(){
    bgPage();doc.setFillColor(...PANEL);doc.rect(0,0,pageW,30,'F');doc.setDrawColor(...GOLD);doc.setLineWidth(.6);doc.line(0,30,pageW,30);
    if(logoData){try{doc.addImage(logoData,'PNG',margin,6,20,18)}catch{}}
    doc.setTextColor(...GOLD2);doc.setFont('helvetica','bold');doc.setFontSize(17);doc.text('JP GYM',margin+25,15);
    doc.setFontSize(9);doc.setTextColor(...MUTED);doc.setFont('helvetica','normal');
    doc.text(type==='medical'?T('Rapport pour le médecin','Relatório para o médico'):T("Rapport d'évolution",'Relatório de evolução'),margin+25,22);
    doc.setTextColor(...GOLD);doc.setFontSize(9);doc.setFont('helvetica','bold');doc.text(`${from}  →  ${to}`,pageW-margin,15,{align:'right'});
    doc.setFont('helvetica','normal');doc.setFontSize(8);doc.setTextColor(...MUTED);doc.text(T('Généré','Gerado')+': '+dt(new Date().toISOString()),pageW-margin,22,{align:'right'});
    y=40
  }
  function ensureSpace(h){if(y+h>pageH-16){doc.addPage();header()}}
  function sectionTitle(t){ensureSpace(13);doc.setTextColor(...GOLD2);doc.setFont('helvetica','bold');doc.setFontSize(12.5);doc.text(t,margin,y);y+=2;doc.setDrawColor(...GOLD);doc.setLineWidth(.3);doc.line(margin,y+2,pageW-margin,y+2);y+=9}
  function line(txt,opts={}){const{bold=false,size=9.2,color=WHITE,indent=0}=opts;doc.setFont('helvetica',bold?'bold':'normal');doc.setFontSize(size);doc.setTextColor(...color);const arr=doc.splitTextToSize(String(txt),pageW-margin*2-indent);ensureSpace(arr.length*(size*.42)+2);doc.text(arr,margin+indent,y);y+=arr.length*(size*.42)+2}
  header();

  sectionTitle(T('Profil','Perfil'));
  line(T('Nom','Nome')+': '+(profile.display_name||user.email),{bold:true});
  if(profile.age)line(T('Âge','Idade')+': '+profile.age);
  if(profile.height_cm)line(T('Taille','Altura')+': '+profile.height_cm+' cm');
  if(profile.target_weight_kg)line(T('Objectif de poids','Objetivo de peso')+': '+profile.target_weight_kg+' kg');

  sectionTitle(T('Pesées','Pesagens'));
  if(!weights.length)line(T('Aucune donnée','Sem dados'),{color:MUTED});
  else{
    const first=Number(weights[0].weight_kg),last=Number(weights[weights.length-1].weight_kg),delta=last-first;
    line(T('Variation sur la période','Variação no período')+`: ${first.toFixed(2)} kg → ${last.toFixed(2)} kg (${delta>=0?'+':''}${delta.toFixed(2)} kg)`,{bold:true,color:GOLD});
    weights.forEach(x=>line(`• ${dt(x.measured_at)} · ${x.weight_kg} kg${x.note?' · '+TT(x.note):''}`,{indent:3}))
  }

  sectionTitle(type==='medical'?T('Petit-déjeuner et collations','Pequeno-almoço e lanches'):T('Alimentation','Alimentação'));
  if(!foods.length)line(T('Aucune donnée','Sem dados'),{color:MUTED});
  else foods.forEach(x=>{
    line(`• ${dt(x.logged_at)} · ${mealName(x.meal_type)} · ${TT(x.description)}`,{indent:3});
    line(`${x.calories??'?'} kcal · P ${x.protein_g??'?'} g · ${T('Gluc.','HC')} ${x.carbs_g??'?'} g · ${T('Lip.','Gord.')} ${x.fat_g??'?'} g`,{indent:7,size:8,color:MUTED})
  });

  sectionTitle(T('Prises de suppléments','Tomas de suplementos'));
  if(!supplements.length)line(T('Aucune donnée','Sem dados'),{color:MUTED});
  else supplements.forEach(x=>line(`• ${dt(x.logged_at)} · ${x.supplement||''} · ${x.amount??''} ${x.unit||''}${x.notes?' · '+TT(x.notes):''}`,{indent:3}));

  if(type!=='medical'){
    sectionTitle(T('Entraînement','Treino'));
    if(!exercises.length)line(T('Aucune donnée','Sem dados'),{color:MUTED});
    else exercises.forEach(x=>line(`• ${dt(x.logged_at)} · ${TT(x.exercise_name)}${x.muscle_group?' · '+TT(x.muscle_group):''} · ${x.weight_kg??'—'} kg · ${x.sets??'—'} x ${(x.reps||[]).join('/')}${x.duration_min?' · '+x.duration_min+' min':''}`,{indent:3}));

    sectionTitle(T('Mensurations','Medidas corporais'));
    if(!measures.length)line(T('Aucune donnée','Sem dados'),{color:MUTED});
    else measures.forEach(x=>line(`• ${dt(x.measured_at)} · ${T('Poitrine','Peito')} ${x.chest_cm??'—'} cm · ${T('Taille','Cintura')} ${x.waist_cm??'—'} cm · ${T('Bras','Braço')} ${x.arm_right_cm??'—'} cm · ${T('Épaules','Ombros')} ${x.shoulders_cm??'—'} cm`,{indent:3}))
  }

  y+=4;
  line(type==='medical'
    ?T("Document de suivi personnel: uniquement pesées, petit-déjeuner/collations et prises de suppléments. Ne remplace pas une évaluation médicale.","Documento de acompanhamento pessoal: apenas pesagens, pequeno-almoço/lanches e tomas de suplementos. Não substitui avaliação médica.")
    :T("Document généré à partir de tous les enregistrements du période sélectionné. Les valeurs nutritionnelles IA sont des estimations.","Documento gerado a partir de todos os registos do período selecionado. Os valores nutricionais da IA são estimativas."),
    {size:7.5,color:MUTED});

  doc.save(`JP_GYM_${type}_${from}_${to}.pdf`);
  try{await sb.from('generated_reports').insert({user_id:user.id,date_from:from,date_to:to,sections:type==='medical'?['weight','food_breakfast_snack','supplements']:['weight','food','training','supplements','measurements'],title:'JP GYM',metadata:{language:L,type,all_records:true,timestamps:true}})}catch{}
};

function loadSettings(){const ai=CFG.AI||{};$('integrationStatus').innerHTML=`<div class=item><b>${tr('integrationSupabase')}</b><br><small>${CFG.SUPABASE_URL?'✓ '+tr('configured'):'✗ '+tr('notConfigured')}</small></div><div class=item><b>${tr('integrationAI')}</b><br><small>${Object.keys(ai).length?`${Object.keys(ai).length} ${tr('integrationAIStatus')}`:'—'}</small></div><div class=item><b>${tr('integrationHosting')}</b><br><small>${tr('integrationHostingStatus')}</small></div>`}
['wDate','fDate','tDate','mDate','sDate','measDate'].forEach(id=>{if($(id))$(id).value=nowLocal()});setLang(lang);authInit();