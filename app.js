import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
window.addEventListener('error',e=>{const m=document.getElementById('authmsg');if(m)m.textContent='Erro: '+(e.message||'falha desconhecida')});
window.addEventListener('unhandledrejection',e=>{const m=document.getElementById('authmsg');if(m)m.textContent='Erro: '+(e.reason?.message||String(e.reason))});
const CFG=window.JP_GYM_CONFIG||{};
const sb=createClient(CFG.SUPABASE_URL,CFG.SUPABASE_PUBLISHABLE_KEY);
const $=id=>document.getElementById(id);let user=null,lang=localStorage.getItem('jpgym_lang')||'pt',foodImage=null,machineImage=null,bodyImageFile=null,lastFoodAI={},lastMachineAI={},editingFoodId=null;
const I={pt:{tagline:'Treina. Evolui. Supera-te.',password:'Palavra-passe',login:'Entrar',signup:'Criar conta',google:'Continuar com Google',logout:'Sair',dashboard:'Painel de controlo',welcome:'O teu acompanhamento de treino, nutrição e evolução.',currentWeight:'Peso atual',targetWeight:'Objetivo',weekWorkouts:'Treinos 7 dias',machines:'Máquinas',quick:'Acessos rápidos',profile:'Perfil',profileDesc:'Dados pessoais, objetivos e notas de saúde.',name:'Nome',age:'Idade',height:'Altura cm',goals:'Objetivos',notes:'Notas',save:'Guardar',weight:'Peso / Evolução',weightDesc:'Regista o peso e acompanha a tendência.',datetime:'Data/hora',weightKg:'Peso kg',history:'Histórico',food:'Alimentação',foodDesc:'Regista refeições e usa IA para estimar calorias e proteína.',meal:'Refeição',description:'Descrição',photo:'Fotografia',cameraFood:'Tirar fotografia da refeição (câmara)',analyzeAI:'✨ Analisar com IA',protein:'Proteína g',carbs:'Hidratos g',fat:'Gordura g',saveMeal:'Guardar refeição',mealSupplements:'Suplementos tomados nesta refeição',training:'Treinos',trainingDesc:'Regista exercícios, carga, séries e repetições.',exercise:'Exercício',muscle:'Grupo muscular',sets:'Séries',reps:'Repetições',saveExercise:'Guardar exercício',duration:'Duração (min)',machinesAI:'Máquinas & IA',machinesDesc:'Fotografa máquinas, identifica-as e gera treino personalizado.',machineName:'Nome da máquina',identifyAI:'✨ Identificar com IA',saveMachine:'Guardar máquina',generateWorkout:'🤖 Gerar treino de hoje',registeredMachines:'Máquinas registadas',supplements:'Suplementos',suppDesc:'Catálogo sem duplicados, fotos e composição completa.',logIntake:'Registar toma',supplement:'Suplemento',amount:'Quantidade',unit:'Unidade',progress:'Medidas & Fotos',progressDesc:'Guarda medidas corporais e fotos de evolução.',measurements:'Medidas',progressPhotos:'Fotos de progresso',angle:'Ângulo',goalsDesc:'Metas pessoais guardadas no perfil.',reports:'Relatórios PDF',reportsDesc:'Relatório de evolução para ti ou para o médico.',from:'De',to:'Até',language:'Idioma',reportType:'Tipo',generatePdf:'Gerar PDF',coachDesc:'Pergunta sobre treino, alimentação, recuperação e progresso usando os teus registos.',coachPlaceholder:'O que treino hoje?',askCoach:'Perguntar ao JP Coach',settings:'Configurações',settingsDesc:'Idioma, sessão e estado das integrações.',mealBreakfast:'Pequeno-almoço',mealSnack:'Lanche',mealLunch:'Almoço',mealDinner:'Jantar',mealSupper:'Ceia',angleFront:'Frente',angleSide:'Lado',angleBack:'Costas',reportMedical:'Médico',reportEvolution:'Evolução',measChestPh:'Peito cm',measWaistPh:'Cintura cm',measArmPh:'Braço direito cm',measShouldersPh:'Ombros cm',measChest:'Peito',measWaist:'Cintura',measArm:'Braço',measShoulders:'Ombros',machineFallback:'Máquina',mealFallback:'Refeição',you:'Tu',open:'Abrir',analyzing:'A analisar…',identifying:'A identificar…',preparing:'A preparar…',aiNotReady:'IA ainda não está ligada: ',aiCoachNotReady:'IA ainda não está ligada. ',integrationSupabase:'Supabase',integrationAI:'IA',integrationAIStatus:'endpoints configurados',integrationHosting:'Alojamento',integrationHostingStatus:'Preparado para publicação',configured:'configurado',notConfigured:'não configurado',bodyPhotoPending:'As fotos corporais ficam prontas assim que configurarmos o Storage do Supabase.',choosePhotoFirst:'Escolhe uma foto primeiro.',loggingIn:'A entrar…',accountCreated:'Conta criada. Confirma o email.',edit:'Editar',remove:'Eliminar',saveChanges:'Guardar alterações',cancelEdit:'Cancelar edição',confirmDelete:'Eliminar este registo? Esta ação não pode ser desfeita.',deleted:'Eliminado',measReminderHeading:'⏰ Medidas semanais',measReminderNever:'Ainda não registaste cintura, ombros e braço. Regista agora para começares a acompanhar a tua evolução.',measReminderDue:'Já passaram {n} dias desde a última medição de cintura, ombros e braço. Vamos registar?',measReminderCta:'Registar medidas'},fr:{tagline:'Entraîne-toi. Évolue. Dépasse-toi.',password:'Mot de passe',login:'Connexion',signup:'Créer un compte',google:'Continuer avec Google',logout:'Déconnexion',dashboard:'Tableau de bord',welcome:'Ton suivi de l’entraînement, de la nutrition et de l’évolution.',currentWeight:'Poids actuel',targetWeight:'Objectif',weekWorkouts:'Séances 7 jours',machines:'Machines',quick:'Accès rapides',profile:'Profil',profileDesc:'Données personnelles, objectifs et notes de santé.',name:'Nom',age:'Âge',height:'Taille cm',goals:'Objectifs',notes:'Notes',save:'Enregistrer',weight:'Poids / Évolution',weightDesc:'Enregistre ton poids et suis la tendance.',datetime:'Date/heure',weightKg:'Poids kg',history:'Historique',food:'Alimentation',foodDesc:'Enregistre les repas et utilise l’IA pour estimer calories et protéines.',meal:'Repas',description:'Description',photo:'Photo',cameraFood:'Prendre une photo du repas (caméra)',analyzeAI:'✨ Analyser avec l’IA',protein:'Protéines g',carbs:'Glucides g',fat:'Lipides g',saveMeal:'Enregistrer le repas',mealSupplements:'Compléments pris avec ce repas',training:'Entraînements',trainingDesc:'Enregistre exercices, charge, séries et répétitions.',exercise:'Exercice',muscle:'Groupe musculaire',sets:'Séries',reps:'Répétitions',saveExercise:'Enregistrer l’exercice',duration:'Durée (min)',machinesAI:'Machines & IA',machinesDesc:'Photographie les machines, identifie-les et génère un entraînement personnalisé.',machineName:'Nom de la machine',identifyAI:'✨ Identifier avec l’IA',saveMachine:'Enregistrer la machine',generateWorkout:'🤖 Générer la séance du jour',registeredMachines:'Machines enregistrées',supplements:'Compléments',suppDesc:'Catalogue sans doublons, photos et composition complète.',logIntake:'Enregistrer une prise',supplement:'Complément',amount:'Quantité',unit:'Unité',progress:'Mensurations & Photos',progressDesc:'Enregistre les mensurations et les photos de progression.',measurements:'Mensurations',progressPhotos:'Photos de progression',angle:'Angle',goalsDesc:'Objectifs personnels enregistrés dans le profil.',reports:'Rapports PDF',reportsDesc:'Rapport de progression pour toi ou le médecin.',from:'Du',to:'Au',language:'Langue',reportType:'Type',generatePdf:'Générer le PDF',coachDesc:'Pose des questions sur l’entraînement, l’alimentation, la récupération et la progression avec tes données.',coachPlaceholder:'Que dois-je entraîner aujourd’hui ?',askCoach:'Demander au JP Coach',settings:'Paramètres',settingsDesc:'Langue, session et état des intégrations.',mealBreakfast:'Petit-déjeuner',mealSnack:'Collation',mealLunch:'Déjeuner',mealDinner:'Dîner',mealSupper:'Souper',angleFront:'Face',angleSide:'Profil',angleBack:'Dos',reportMedical:'Médical',reportEvolution:'Évolution',measChestPh:'Poitrine cm',measWaistPh:'Taille cm',measArmPh:'Bras droit cm',measShouldersPh:'Épaules cm',measChest:'Poitrine',measWaist:'Taille',measArm:'Bras',measShoulders:'Épaules',machineFallback:'Machine',mealFallback:'Repas',you:'Toi',open:'Ouvrir',analyzing:'Analyse en cours…',identifying:'Identification…',preparing:'Préparation…',aiNotReady:'IA indisponible pour le moment : ',aiCoachNotReady:'IA indisponible pour le moment. ',integrationSupabase:'Supabase',integrationAI:'IA',integrationAIStatus:'points de terminaison configurés',integrationHosting:'Hébergement',integrationHostingStatus:'Prêt pour la publication',configured:'configuré',notConfigured:'non configuré',bodyPhotoPending:'Les photos corporelles seront prêtes dès que le stockage Supabase sera configuré.',choosePhotoFirst:'Choisis d\'abord une photo.',loggingIn:'Connexion…',accountCreated:'Compte créé. Vérifie ton e-mail.',edit:'Modifier',remove:'Supprimer',saveChanges:'Enregistrer les modifications',cancelEdit:'Annuler la modification',confirmDelete:'Supprimer cet enregistrement ? Cette action est irréversible.',deleted:'Supprimé',measReminderHeading:'⏰ Mensurations hebdomadaires',measReminderNever:'Tu n\'as pas encore enregistré ta taille, tes épaules et ton bras. Enregistre-les maintenant pour commencer à suivre ta progression.',measReminderDue:'Cela fait {n} jours depuis ta dernière mesure de taille, épaules et bras. On les enregistre ?',measReminderCta:'Enregistrer les mensurations'}};
const nav=[['home','⌂','dashboard'],['profile','👤','profile'],['weight','⚖','weight'],['food','🍽','food'],['training','🏋','training'],['machines','📷','machinesAI'],['supplements','🧪','supplements'],['progress','📈','progress'],['goals','🎯','goals'],['reports','📄','reports'],['coach','🤖','JP Coach IA'],['settings','⚙','settings']];
function tr(k){return I[lang]?.[k]||I.pt[k]||k}function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}function nowLocal(){const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,16)}function locale(){return lang==='fr'?'fr-FR':'pt-PT'}function toast(msg,ok=true){const e=$('toast');e.textContent=msg;e.className='toast '+(ok?'ok':'bad');setTimeout(()=>e.classList.add('hidden'),3200)}function setLang(l){lang=l;localStorage.setItem('jpgym_lang',l);document.documentElement.lang=l;document.querySelectorAll('[data-lang]').forEach(b=>b.classList.toggle('on',b.dataset.lang===l));document.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=tr(e.dataset.i18n));document.querySelectorAll('[data-i18n-placeholder]').forEach(e=>e.placeholder=tr(e.dataset.i18nPlaceholder));if(editingFoodId&&$('saveFood'))$('saveFood').textContent=tr('saveChanges');renderNav();loadSupplements();loadSettings();checkMeasReminder()}document.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>setLang(b.dataset.lang));
function renderNav(){const html=nav.map(([id,ic,key])=>`<button data-sec="${id}" class="${document.querySelector('.sec.on')?.id===id?'on':''}"><span>${ic}</span><span>${key.startsWith('JP')?key:tr(key)}</span></button>`).join('');$('sideNav').innerHTML=html;$('mobileNav').innerHTML=nav.filter(x=>['home','food','training','supplements','coach'].includes(x[0])).map(([id,ic,key])=>`<button data-sec="${id}"><div>${ic}</div>${key.startsWith('JP')?'Coach':tr(key)}</button>`).join('');document.querySelectorAll('[data-sec]').forEach(b=>b.onclick=()=>openSec(b.dataset.sec))}
function openSec(id){document.querySelectorAll('.sec').forEach(s=>s.classList.toggle('on',s.id===id));document.querySelectorAll('[data-sec]').forEach(b=>b.classList.toggle('on',b.dataset.sec===id));const item=nav.find(x=>x[0]===id);$('pageTitle').textContent=item?(item[2].startsWith('JP')?item[2]:tr(item[2])):'JP GYM';$('sidebar').classList.remove('open');if(id==='home')loadDashboard();if(id==='profile')loadProfile();if(id==='weight')loadWeights();if(id==='food')loadFood();if(id==='training')loadExercises();if(id==='machines')loadMachines();if(id==='supplements')loadSupplements();if(id==='progress'){loadMeasures();loadBodyPhotos()}if(id==='goals')loadGoals();if(id==='settings')loadSettings();scrollTo(0,0)}$('menuBtn').onclick=()=>$('sidebar').classList.toggle('open');
async function authInit(){const{data:{session}}=await sb.auth.getSession();applySession(session);sb.auth.onAuthStateChange((_e,s)=>applySession(s))}async function applySession(s){user=s?.user||null;$('auth').classList.toggle('hidden',!!user);$('app').classList.toggle('hidden',!user);if(user){$('userEmail').textContent=user.email||'';renderNav();await Promise.allSettled([loadDashboard(),loadSupplements()])}}$('login').onclick=async()=>{try{$('authmsg').textContent=tr('loggingIn');const{error}=await sb.auth.signInWithPassword({email:$('email').value,password:$('pw').value});$('authmsg').textContent=error?.message||''}catch(e){$('authmsg').textContent='Erro: '+(e?.message||String(e))}};$('signup').onclick=async()=>{const{error}=await sb.auth.signUp({email:$('email').value,password:$('pw').value,options:{emailRedirectTo:location.origin}});$('authmsg').textContent=error?error.message:tr('accountCreated')};$('logout').onclick=()=>sb.auth.signOut();
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
function fileToData(file){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file)})}
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
$('tDate').value=nowLocal();$('saveExercise').onclick=async()=>{const reps=$('tReps').value.split(',').map(x=>parseInt(x.trim())).filter(Number.isFinite);const{error}=await sb.from('exercise_logs').insert({user_id:user.id,logged_at:new Date($('tDate').value||Date.now()).toISOString(),exercise_name:$('tExercise').value,muscle_group:$('tMuscle').value||null,weight_kg:+$('tWeight').value||null,sets:+$('tSets').value||null,reps,duration_min:+$('tDuration').value||null});toast(error?error.message:tr('save'),!error);if(!error){$('tExercise').value='';$('tWeight').value='';$('tReps').value='';$('tDuration').value='';loadExercises();loadDashboard()}};async function loadExercises(){const{data}=await sb.from('exercise_logs').select('*').eq('user_id',user.id).order('logged_at',{ascending:false}).limit(30);$('exerciseList').innerHTML=(data||[]).map(x=>`<div class=item><b>${esc(x.exercise_name)}</b><br><small>${new Date(x.logged_at).toLocaleString(locale())} · ${x.weight_kg??'—'} kg · ${x.sets??'—'} x ${(x.reps||[]).join(',')}${x.duration_min?' · '+x.duration_min+' min':''}</small></div>`).join('')||'<div class=muted>—</div>'}
$('mImg').onchange=async e=>{const f=e.target.files?.[0];if(f){machineImage=await fileToData(f);$('mPreview').src=machineImage;$('mPreview').classList.remove('hidden')}};$('analyzeMachine').onclick=async()=>{const out=$('machineAI');out.classList.remove('hidden');out.textContent=tr('identifying');try{lastMachineAI=await aiCall(CFG.AI.analyzeMachine,{imageData:machineImage,notes:$('mNote').value,language:lang});$('mName').value=lastMachineAI.name||$('mName').value;$('mMuscle').value=lastMachineAI.muscle_group||$('mMuscle').value;out.textContent=lastMachineAI.summary||JSON.stringify(lastMachineAI,null,2)}catch(e){out.textContent=tr('aiNotReady')+e.message}};$('saveMachine').onclick=async()=>{const{error}=await sb.from('gym_machines').insert({user_id:user.id,name:$('mName').value||lastMachineAI.name||tr('machineFallback'),muscle_group:$('mMuscle').value||lastMachineAI.muscle_group||null,notes:$('mNote').value||null,ai_identification:lastMachineAI,active:true});toast(error?error.message:tr('save'),!error);if(!error){$('mName').value='';$('mMuscle').value='';$('mNote').value='';machineImage=null;$('mPreview').classList.add('hidden');$('machineAI').classList.add('hidden');loadMachines();loadDashboard()}};async function loadMachines(){const{data}=await sb.from('gym_machines').select('*').eq('user_id',user.id).eq('active',true).order('created_at',{ascending:false});$('machineList').innerHTML=(data||[]).map(x=>`<div class=item><b>${esc(x.name||tr('machineFallback'))}</b><br><small>${esc(x.muscle_group||'')} ${x.notes?'· '+esc(x.notes):''}</small></div>`).join('')||'<div class=muted>—</div>'}$('generateWorkout').onclick=async()=>{const out=$('workoutAI');out.classList.remove('hidden');out.textContent=tr('preparing');try{const context=await buildContext();const machines=(await sb.from('gym_machines').select('name,muscle_group,notes').eq('user_id',user.id).eq('active',true)).data||[];const j=await aiCall(CFG.AI.generateWorkout,{context,machines,language:lang});out.textContent=j.workout||j.answer||JSON.stringify(j,null,2)}catch(e){out.textContent=tr('aiNotReady')+e.message}}
const staticSupp=[
{key:'weight-gainer-massive-addict',name:'Weight Gainer Massive – Chocolate Hazelnut',img:'data:image/webp;base64,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'},
{key:'mutant-mass',name:'Mutant Mass – Muscle Mass Gainer',img:'data:image/webp;base64,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'},
{key:'hiro-lab-turkesterone',name:'Turkesterone 600 mg – 90 Vcaps',img:'data:image/webp;base64,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'},
{key:'mass-gainer-prime',name:'Prime Mass Gainer + Creatine',img:'./assets/supp_mass.jpg?v=20260903'},
{key:'mass-gainer-2268',name:'Mass Gainer 2268 g',img:'./assets/supp_mass_2268.jpg?v=20260903'},
{key:'isogainz-4000',name:'ISOGAINZ 4000 g – Lemon Pie',img:'./assets/supp_isogainz.png?v=20260903'},
{key:'creatine-creapure',name:'Creatine Creapure® 300 g',img:'./assets/supp_creatine.jpg?v=20260903'},
{key:'big-shot',name:'Big Shot Pre-Workout – Flash Cola',img:'./assets/supp_bigshot.jpg?v=20260903'},
{key:'collagen-magnesium',name:'Collagen + Magnesium – Forest Fruit',img:'./assets/supp_collagen.jpg?v=20260903'},
{key:'zmb6-lifepro',name:'ZMB6 Advanced Formula',img:'./assets/supp_zmb6.png?v=20260903'},
{key:'weight-gainer-massive-addict',name:'Weight Gainer Massive – Chocolate Hazelnut',img:'https://sport-nutrition.be/web/image/product.template/6738/image_1920?unique=b95ece7'},
{key:'mutant-mass',name:'Mutant Mass – Muscle Mass Gainer',img:'https://mutantnation.com/cdn/shop/files/31601US_MUTANT_MASS_Vanilla_Ice_Cream_Flavor_15_LB_6.8_KG_v2.00_NS-L3.png?v=1745428730&width=1080'},
{key:'hiro-lab-turkesterone',name:'Turkesterone 600 mg – 90 Vcaps',img:'https://bigforcestore.com/cdn/shop/files/TUKESTERONE-HIROLAB.png?v=1737478617&width=1946'}
];
function norm(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim()}
function imageForSupplement(s){
  const exact=staticSupp.find(x=>x.key===s.image_key);
  if(exact)return exact.img;
  const byName=staticSupp.find(x=>norm(s.name)===norm(x.name));
  return byName?.img||'./assets/logo.png'
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
    const comp=Object.entries(composition).map(([k,v])=>`<div class=kv><span>${esc(k.replaceAll('_',' '))}</span><span>${esc(v)}</span></div>`).join('');
    return `<article class=supp-card><img src="${img}" alt="${esc(s.name)}"><div><span class=tag>${esc(s.brand||'')}</span><h3>${esc(s.name)}</h3><div class=kv><span>Dose</span><span>${esc(serving)}</span></div>${comp}<p class=muted style="font-size:11px">${esc(notes)}</p></div></article>`
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
  const{data}=await sb.from('supplement_logs').select('*').eq('user_id',user.id).order('logged_at',{ascending:false});
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
$('askCoach').onclick=async()=>{
  const q=$('coachQ').value.trim();if(!q)return;
  const box=$('chat');box.innerHTML+=`<div class=item><b>${tr('you')}:</b> ${esc(q)}</div>`;$('coachQ').value='';
  const a=document.createElement('div');a.className='item';a.textContent='JP Coach: …';box.appendChild(a);
  try{const j=await aiCall(CFG.AI.coach,{message:q,context:await buildContext(),language:lang});a.textContent='JP Coach: '+(j.answer||j.response||JSON.stringify(j))}
  catch(e){a.textContent='JP Coach: '+tr('aiCoachNotReady')+e.message}
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