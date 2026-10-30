/* DawaCare + correctifs portfolio — Yathreb Dellai
   Fichier : dawacare.js (à la racine du projet)
*/
(function () {
  'use strict';

  var LINKS = { demo: '', code: '' };
  var SHOTS = ['dashboard', 'medications', 'pillbox', 'assistant'];
  
  // CORRECTION : Les images sont à la racine, pas dans assets/dawacare/
  var IMG_BASE = ''; 

  var D = {
    fr:{kicker:'Projet phare',slogan:'Plateforme de suivi des médicaments pour personnes âgées et leurs proches',desc:'Application web qui aide une personne âgée à suivre son traitement au quotidien, rassure sa famille en temps réel et réduit les risques d\u2019oubli ou de double prise, grâce à des rappels sonores et vocaux, un assistant IA et un pilulier connecté simulé.',m1:'Type',m1v:'Projet personnel / académique',m2:'Domaine',m2v:'e-santé · IoT · IA',m3:'Profils',m3v:'Senior · Famille · Admin',f1t:'Tableau de bord et rappels :',f1:'prochaine prise, observance de la semaine, rappels sonores et lecture vocale des consignes.',f2t:'Médicaments et calendrier :',f2:'fiches de traitement, stocks restants, validation médicale, planning et historique des prises.',f3t:'Espace famille :',f3:'suivi bienveillant, alertes de retard et messages d\u2019encouragement vocaux.',f4t:'Pilulier connecté (simulé) :',f4:'28 compartiments, télémétrie ESP32 via API REST et blocage de double dose sous 30 minutes.',f5t:'Assistant IA :',f5:'chatbot Gemini avec garde-fous : aucun diagnostic, aucune modification d\u2019ordonnance.',f6t:'Accessibilité :',f6:'taille du texte réglable, contraste élevé et synthèse vocale en français.',ask:'Demander une démo',demo:'Voir la démo',code:'Code source',s1:'Tableau de bord',s2:'Médicaments',s3:'Pilulier',s4:'Assistant IA',note:'Données de démonstration fictives. Le pilulier est simulé côté serveur.'},
    en:{kicker:'Featured project',slogan:'Medication tracking platform for seniors and their families',desc:'A web app that helps older adults follow their treatment every day, reassures their family in real time and reduces missed or double doses, using sound and voice reminders, an AI assistant and a simulated connected pillbox.',m1:'Type',m1v:'Personal / academic project',m2:'Field',m2v:'e-health · IoT · AI',m3:'Roles',m3v:'Senior · Family · Admin',f1t:'Dashboard and reminders:',f1:'next dose, weekly adherence, sound reminders and spoken instructions.',f2t:'Medications and calendar:',f2:'treatment sheets, remaining stock, medical validation, schedule and intake history.',f3t:'Family space:',f3:'gentle monitoring, late-dose alerts and voice encouragement messages.',f4t:'Connected pillbox (simulated):',f4:'28 compartments, ESP32 telemetry via REST API and a 30-minute double-dose lock.',f5t:'AI assistant:',f5:'Gemini chatbot with safeguards: no diagnosis, no prescription changes.',f6t:'Accessibility:',f6:'adjustable text size, high contrast and French speech synthesis.',ask:'Request a demo',demo:'View demo',code:'Source code',s1:'Dashboard',s2:'Medications',s3:'Pillbox',s4:'AI assistant',note:'Fictional demo data. The pillbox is simulated on the server.'},
    ar:{kicker:'مشروع مميز',slogan:'منصة لمتابعة الأدوية لكبار السن وعائلاتهم',desc:'تطبيق ويب يساعد كبار السن على متابعة علاجهم يوميا ويطمئن عائلاتهم في الوقت الفعلي ويقلل خطر النسيان أو تكرار الجرعة، عبر تذكيرات صوتية ومساعد ذكي وعلبة أدوية متصلة (محاكاة).',m1:'النوع',m1v:'مشروع شخصي / أكاديمي',m2:'المجال',m2v:'الصحة الرقمية · إنترنت الأشياء · الذكاء الاصطناعي',m3:'الأدوار',m3v:'مسن · عائلة · مسؤول',f1t:'لوحة القيادة والتذكيرات:',f1:'الجرعة القادمة، الالتزام الأسبوعي، تذكيرات صوتية وقراءة التعليمات.',f2t:'الأدوية والتقويم:',f2:'بطاقات العلاج، المخزون المتبقي، المصادقة الطبية، الجدول وسجل الجرعات.',f3t:'فضاء العائلة:',f3:'متابعة لطيفة، تنبيهات التأخير ورسائل تشجيع صوتية.',f4t:'علبة أدوية متصلة (محاكاة):',f4:'28 حجرة، قياسات ESP32 عبر واجهة REST ومنع الجرعة المزدوجة خلال 30 دقيقة.',f5t:'المساعد الذكي:',f5:'روبوت Gemini بضوابط صارمة: لا تشخيص ولا تعديل للوصفات.',f6t:'سهولة الاستخدام:',f6:'حجم خط قابل للتعديل، تباين عال ونطق صوتي بالفرنسية.',ask:'طلب عرض توضيحي',demo:'عرض المشروع',code:'الشيفرة المصدرية',s1:'لوحة القيادة',s2:'الأدوية',s3:'العلبة',s4:'المساعد الذكي',note:'بيانات تجريبية وهمية. العلبة محاكاة على الخادم.'}
  };

  var CSS = '.dc{margin-top:64px}.dc-card{padding:0;display:grid;grid-template-columns:1.05fr .95fr}.dc-card:hover{transform:none}.dc-body{padding:40px 36px}.dc-kicker{display:inline-flex;font-size:.74rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--primary-strong);margin-bottom:14px}html[data-theme="dark"] .dc-kicker{color:#d8b4fe}.dc-title{font-size:clamp(1.5rem,3vw,2.1rem);font-weight:800;letter-spacing:-.02em;line-height:1.15;margin-bottom:8px}.dc-title span{background:var(--grad);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}.dc-slogan{font-size:.92rem;font-weight:600;color:var(--muted);margin-bottom:16px}.dc-desc{color:var(--muted);font-size:.96rem;margin-bottom:22px}.dc-meta{display:flex;flex-wrap:wrap;gap:22px;margin-bottom:22px;padding:16px 0;border-block:1px solid var(--border)}.dc-meta b{display:block;font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:2px}.dc-meta span{font-size:.9rem;font-weight:700}.dc-feats{list-style:none;display:grid;gap:12px;margin-bottom:24px}.dc-feats li{display:flex;gap:12px;font-size:.9rem;color:var(--muted)}.dc-feats li::before{content:"";flex:none;width:8px;height:8px;margin-top:8px;border-radius:50%;background:var(--grad)}.dc-feats strong{color:var(--text);font-weight:700}.dc-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:26px}.dc-actions .btn{padding:12px 22px;font-size:.86rem}.dc-visual{padding:28px;background:var(--grad-soft);border-inline-start:1px solid var(--border);display:flex;flex-direction:column;justify-content:center;gap:16px}.dc-frame{border-radius:14px;overflow:hidden;border:1px solid var(--border);background:var(--card-solid);box-shadow:var(--shadow)}.dc-bar{display:flex;gap:6px;padding:9px 12px;border-bottom:1px solid var(--border)}.dc-bar i{width:9px;height:9px;border-radius:50%;background:var(--border)}.dc-frame img{width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top;cursor:zoom-in;transition:opacity .25s ease}.dc-ph{display:none;aspect-ratio:16/10;place-items:center;background:var(--grad);color:#fff;font-weight:800;font-size:1.6rem}.dc-tabs{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}.dc-tab{padding:7px 14px;border-radius:99px;font-size:.76rem;font-weight:700;border:1px solid var(--border);background:var(--glass);color:var(--muted);transition:all .25s ease}.dc-tab:hover{color:var(--text)}.dc-tab.on{background:var(--grad);color:#fff;border-color:transparent}.dc-note{font-size:.78rem;color:var(--muted);text-align:center}@media(max-width:1040px){.dc-card{grid-template-columns:1fr}.dc-visual{border-inline-start:0;border-top:1px solid var(--border)}}@media(max-width:640px){.dc-body{padding:28px 22px}.dc-visual{padding:18px}.dc-actions .btn{width:100%}}';

  function t(k) { return '<span data-dc="' + k + '"></span>'; }

  function buildHTML() {
    var feats = '';
    for (var i = 1; i <= 6; i++) feats += '<li><span><strong data-dc="f' + i + 't"></strong> ' + t('f' + i) + '</span></li>';
    var tabs = SHOTS.map(function (s, i) {
      return '<button type="button" class="dc-tab' + (i ? '' : ' on') + '" data-img="' + s + '" data-dc="s' + (i + 1) + '"></button>';
    }).join('');
    var pills = ['React 19','TypeScript','Vite','Tailwind CSS','Node.js · Express','Gemini API','Web Speech API'].map(function (p) { return '<span class="tag-pill">' + p + '</span>'; }).join('');
    return '<article class="card dc-card"><div class="dc-body">' +
      '<span class="dc-kicker" data-dc="kicker"></span>' +
      '<h3 class="dc-title">Dawa<span>Care</span></h3>' +
      '<p class="dc-slogan" data-dc="slogan"></p><p class="dc-desc" data-dc="desc"></p>' +
      '<div class="dc-meta">' + [1,2,3].map(function(n){return '<div><b data-dc="m'+n+'"></b><span data-dc="m'+n+'v"></span></div>';}).join('') + '</div>' +
      '<ul class="dc-feats">' + feats + '</ul><div class="tags">' + pills + '</div>' +
      '<div class="dc-actions" id="dcActions"><a href="#contact" class="btn btn-primary" id="dcDemoAsk" data-dc="ask"></a></div>' +
      '</div><div class="dc-visual"><div class="dc-frame"><div class="dc-bar"><i></i><i></i><i></i></div>' +
      '<img id="dcImg" src="dashboard.webp" alt="DawaCare" loading="lazy">' +
      '<div class="dc-ph" id="dcPh">DawaCare</div></div>' +
      '<div class="dc-tabs">' + tabs + '</div><p class="dc-note" data-dc="note"></p></div></article>';
  }

  function findHost() {
    var sels = ['#projects .container', '#projects .grid', '#projects', 'main .container', 'main', 'body'];
    for (var i = 0; i < sels.length; i++) { var el = document.querySelector(sels[i]); if (el) return el; }
    return null;
  }

  function mount() {
    if (document.getElementById('dawacare')) return;
    var host = findHost();
    if (!host) return;

    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    var box = document.createElement('div'); box.className = 'dc'; box.id = 'dawacare'; box.innerHTML = buildHTML();
    host.appendChild(box);

    var root = document.documentElement;
    var img = document.getElementById('dcImg'), ph = document.getElementById('dcPh');

    function tr() {
      var d = D[root.lang] || D.fr;
      box.querySelectorAll('[data-dc]').forEach(function (el) {
        var v = d[el.getAttribute('data-dc')]; if (v !== undefined) el.textContent = v;
      });
      var on = box.querySelector('.dc-tab.on'); if (on) img.alt = 'DawaCare — ' + on.textContent;
    }

    var act = document.getElementById('dcActions'), ask = document.getElementById('dcDemoAsk');
    [['demo','btn btn-primary'],['code','btn btn-ghost']].forEach(function (p) {
      if (!LINKS[p[0]]) return;
      var a = document.createElement('a'); a.href = LINKS[p[0]]; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.className = p[1]; a.setAttribute('data-dc', p[0]);
      act.insertBefore(a, ask);
    });
    if (LINKS.demo) ask.className = 'btn btn-ghost';

    img.addEventListener('error', function () { img.style.display = 'none'; ph.style.display = 'grid'; });
    img.addEventListener('load', function () { img.style.display = ''; ph.style.display = 'none'; });

    box.querySelectorAll('.dc-tab').forEach(function (b) {
      b.addEventListener('click', function () {
        box.querySelectorAll('.dc-tab').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        img.style.opacity = 0;
        setTimeout(function () {
          img.src = IMG_BASE + b.getAttribute('data-img') + '.webp';
          img.alt = 'DawaCare — ' + b.textContent;
          img.style.opacity = 1;
        }, 160);
      });
    });

    img.addEventListener('click', function () {
      var lb = document.getElementById('lightbox'); if (!lb) return;
      var li = lb.querySelector('.lb-img'), le = lb.querySelector('.lb-emoji'), lc = lb.querySelector('.lb-caption');
      li.src = img.src; li.alt = img.alt; li.classList.add('show');
      le.style.display = 'none'; lc.textContent = img.alt;
      lb.classList.add('open');
    });

    var btns = document.querySelectorAll('.lang-btn');
    function setLang(l) {
      root.lang = l; root.dir = l === 'ar' ? 'rtl' : 'ltr';
      btns.forEach(function (b) { b.classList.toggle('active', b.dataset.lang === l); });
      try { localStorage.setItem('yd-lang', l); } catch (e) {}
      tr();
    }
    btns.forEach(function (b) { b.addEventListener('click', function () { setLang(b.dataset.lang); }); });
    var saved = null; try { saved = localStorage.getItem('yd-lang'); } catch (e) {}
    if (saved && D[saved]) setLang(saved); else tr();
  }

  function fixCV() {
    // CORRECTION : pointe vers le fichier CV_YATHREB_DELLAI.pdf à la racine
    var cv = document.querySelector('a[download]'); if (!cv) return;
    cv.addEventListener('click', function (e) {
      e.preventDefault();
      fetch(cv.getAttribute('href'), { cache: 'no-store' })
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.blob(); })
        .then(function (blob) {
          var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'CV_Yathreb_Dellai.pdf';
          document.body.appendChild(a); a.click(); a.remove();
          setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
        })
        .catch(function () {});
    });
  }

  function navFx() {
    var h = document.getElementById('header');
    var secs = [].slice.call(document.querySelectorAll('main section[id]'));
    if (!secs.length) return;
    function on() {
      if (h) h.classList.toggle('scrolled', window.scrollY > 10);
      var y = window.scrollY + 140, cur = secs[0].id;
      secs.forEach(function (s) { if (s.offsetTop <= y) cur = s.id; });
      document.querySelectorAll('#nav a').forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + cur); });
    }
    window.addEventListener('scroll', on, { passive: true }); on();
  }

  function init() { try { mount(); } catch (e) {} try { fixCV(); } catch (e) {} try { navFx(); } catch (e) {} }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
