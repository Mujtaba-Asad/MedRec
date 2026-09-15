/* ============================================================
   MedRec — marketing site
   Vanilla JS hash router + section templates + interactions
   ============================================================ */

const ICONS = {
  scan: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16M8 12h8"/></svg>`,
  folder: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h4.379a1.5 1.5 0 0 1 1.06.44l1.122 1.12A1.5 1.5 0 0 0 12.12 8H19.5A1.5 1.5 0 0 1 21 9.5v8A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-10Z"/></svg>`,
  mic: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/></svg>`,
  pulse: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l2-7 4 14 2-7h6"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6.5H4c.5-1 2-2.5 2-6.5Z"/><path d="M9.5 18a2.5 2.5 0 0 0 5 0"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5"/><circle cx="17.5" cy="9" r="2.6"/><path d="M15.8 13.7c2.9.4 5.2 2.9 5.2 6"/></svg>`,
  bot: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="9" width="16" height="10" rx="3"/><path d="M12 9V5M9 4.5h6"/><circle cx="9" cy="14" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="14" r="1.1" fill="currentColor" stroke="none"/><path d="M9 17.2h6"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5 5 6v5.5c0 4.6 3 8 7 9 4-1 7-4.4 7-9V6l-7-2.5Z"/><path d="M9 12.2l2.1 2.1L15.3 10"/></svg>`,
  doc: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V5A1.5 1.5 0 0 1 7 3.5Z"/><path d="M14 3.5V8h4M9 12.5h6M9 15.5h6M9 9.5h2"/></svg>`,
  wifiOff: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18M8.5 16.5a5 5 0 0 1 7 0M5.3 12.8a10 10 0 0 1 3-2.1M19 12.8a9.9 9.9 0 0 0-2.9-2.4M2 8.8a15 15 0 0 1 4.2-2.8M12 20h.01"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6.5 9.5 17 4 11.5"/></svg>`,
  checkCircle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.6 2.6L16.2 9"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>`,
  chevronLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="10.5" width="14" height="9" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1.2 1.2 0 0 1 1.3-.27c1.1.4 2.3.62 3.5.62.7 0 1.2.55 1.2 1.2V20.5c0 .7-.5 1.2-1.2 1.2C10.9 21.7 2.3 13.1 2.3 2.7 2.3 2 2.85 1.5 3.5 1.5H6.7c.65 0 1.2.5 1.2 1.2 0 1.2.2 2.4.6 3.5.13.4.03.9-.27 1.3L6.6 10.8Z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 6.5 12 13l8-6.5"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21.5S5 15.3 5 10a7 7 0 0 1 14 0c0 5.3-7 11.5-7 11.5Z"/><circle cx="12" cy="10" r="2.4"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.8 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.8-3.8-9S9.5 5.6 12 3Z"/></svg>`,
  sparkle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5l1.7 4.7 4.8 1.8-4.8 1.8L12 16.5l-1.7-4.7-4.8-1.8 4.8-1.8L12 3.5Z"/><path d="M19 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z"/></svg>`,
  printer: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 8.5V4h10v4.5M6 18h12M6 8.5h12a2 2 0 0 1 2 2v5a1.5 1.5 0 0 1-1.5 1.5H19v3H5v-3H3.5A1.5 1.5 0 0 1 2 15.5v-5a2 2 0 0 1 2-2Z"/><circle cx="17" cy="12" r=".8" fill="currentColor" stroke="none"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.5s-7.5-4.6-9.7-9A5.2 5.2 0 0 1 12 6.2 5.2 5.2 0 0 1 21.7 11.5c-2.2 4.4-9.7 9-9.7 9Z"/></svg>`,
  ban: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M6 6l12 12"/></svg>`,
  video: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="12" height="12" rx="2"/><path d="M15 10.2 21 7v10l-6-3.2"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5 21 8l-9 4.5L3 8l9-4.5Z"/><path d="M3 12l9 4.5L21 12M3 16l9 4.5L21 16"/></svg>`,
  compass: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5 13.7 13.7 8.5 15.5l1.8-5.2 5.2-1.8Z"/></svg>`,
};

const SITE = {
  routes: ["home","features","how-it-works","pricing","about","contact"],
  current: "home",
};

/* ---------------- Templates ---------------- */

function tHome(){
  return `
  <section class="hero">
    <div class="wrap hero-inner">
      <div class="reveal in">
        <div class="eyebrow"><span class="dot"></span>Built for Pakistan</div>
        <h1>Every medical record your family owns &mdash; <span class="grad-text">in one place.</span></h1>
        <p class="lede">MedRec turns lab reports, prescriptions and diagnoses into an organized, private health record on your phone &mdash; using on-device OCR, no cloud required to read it, and nothing shared without your say-so.</p>
        <div class="hero-cta-row">
          <button class="btn btn-primary" data-nav="contact">Join the Waitlist ${ICONS.arrowRight}</button>
          <button class="btn btn-ghost" data-nav="how-it-works">See How It Works</button>
        </div>
        <div class="hero-badges">
          <div class="hero-badge">${ICONS.scan}On-device OCR</div>
          <div class="hero-badge">${ICONS.wifiOff}Works offline</div>
          <div class="hero-badge">${ICONS.lock}Private by design</div>
        </div>
      </div>
      <div class="hero-visual reveal in">
        <div class="phone-card">
          <div class="float-chip chip-1">${ICONS.checkCircle} Scanned in 4s</div>
          <div class="ph-head">
            <div class="who">
              <div class="avatar">AR</div>
              <div>
                <div class="ph-name">Ayesha's Records</div>
                <div class="ph-sub">4 family profiles</div>
              </div>
            </div>
            <div class="status-pill">Offline ready</div>
          </div>
          <div class="record-row">
            <div class="ricon">${ICONS.doc}</div>
            <div class="rtext"><div class="rtitle">CBC &amp; Lipid Profile</div><div class="rmeta">Chughtai Lab &middot; 2 days ago</div></div>
            <div class="rtag">Lab</div>
          </div>
          <div class="record-row">
            <div class="ricon">${ICONS.pulse}</div>
            <div class="rtext"><div class="rtitle">Blood Pressure &mdash; Abbu</div><div class="rmeta">Logged manually &middot; today</div></div>
            <div class="rtag">Vitals</div>
          </div>
          <div class="record-row" style="margin-bottom:0;">
            <div class="ricon">${ICONS.folder}</div>
            <div class="rtext"><div class="rtitle">Metformin 500mg</div><div class="rmeta">Dr. Kamal &middot; refill in 3 days</div></div>
            <div class="rtag">Rx</div>
          </div>
          <div class="float-chip chip-2">${ICONS.bell} Reminder set</div>
        </div>
      </div>
    </div>
  </section>

  <div class="trust-strip">
    <div class="wrap">
      <div class="trust-item">${ICONS.lock} Bank-grade encryption</div>
      <div class="trust-item">${ICONS.wifiOff} Offline-first storage</div>
      <div class="trust-item">${ICONS.users} Built for whole families</div>
      <div class="trust-item">${ICONS.ban} No AI diagnosis, ever</div>
    </div>
  </div>

  <section>
    <div class="wrap">
      <div class="section-head center reveal">
        <div class="eyebrow" style="margin-inline:auto;"><span class="dot"></span>The problem</div>
        <h2>Pakistan's medical records live in shopping bags, not systems.</h2>
        <p>Reports get lost between clinics. Tests get repeated because no one has the old results. And in an emergency, the doctor treating you has no history to go on.</p>
      </div>
      <div class="stat-grid">
        <div class="stat-card reveal">
          <div class="num" style="color:var(--teal);">${ICONS.folder}</div>
          <div class="lab">Lost reports</div>
          <p>Paper reports and printouts get misplaced, damaged, or left behind at the last clinic &mdash; taking years of history with them.</p>
        </div>
        <div class="stat-card reveal">
          <div class="num" style="color:var(--green);">${ICONS.doc}</div>
          <div class="lab">Repeated tests</div>
          <p>Without the last set of results on hand, patients pay for the same lab work again &mdash; and wait for answers they already had.</p>
        </div>
        <div class="stat-card reveal">
          <div class="num" style="color:var(--teal);">${ICONS.pulse}</div>
          <div class="lab">No emergency context</div>
          <p>In an ER visit, doctors often have zero history on allergies, medications or prior diagnoses for a patient they've never seen.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="tight" style="background:var(--bg-alt); border-block:1px solid var(--border);">
    <div class="wrap">
      <div class="section-head center reveal">
        <div class="eyebrow" style="margin-inline:auto;"><span class="dot"></span>The solution</div>
        <h2>One private vault for every report, prescription and diagnosis.</h2>
        <p>Scan it, speak it, or type it in &mdash; MedRec organizes your family's health history automatically, and keeps it with you even without signal.</p>
      </div>
      <div class="feature-grid">
        ${featureCard(ICONS.scan,"On-device OCR","Snap a photo of a lab report and MedRec reads it instantly &mdash; no manual typing, no upload wait, processed right on your phone.")}
        ${featureCard(ICONS.folder,"Organized automatically","Labs, prescriptions, diagnoses and immunizations sort themselves into a clean timeline you can search in seconds.")}
        ${featureCard(ICONS.users,"Family profiles","Manage records for parents, kids, and elderly relatives from one account &mdash; each with their own private timeline.")}
        ${featureCard(ICONS.bell,"Medication reminders","Never miss a dose or a refill. Set reminders once and MedRec keeps everyone on schedule.")}
        ${featureCard(ICONS.bot,"AI Record Assistant","Ask questions about what's already in your records. Retrieval only &mdash; MedRec never diagnoses or prescribes.")}
        ${featureCard(ICONS.shield,"Privacy-first storage","Your records live on your device by default, encrypted end to end. Nothing leaves without you choosing to share it.")}
      </div>
      <div class="center-text" style="margin-top:36px;">
        <button class="btn btn-ghost" data-nav="features">Explore all features ${ICONS.arrowRight}</button>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="section-head center reveal">
        <div class="eyebrow" style="margin-inline:auto;"><span class="dot"></span>Made for real life</div>
        <h2>Who MedRec is built for.</h2>
        <p>Whether it's your own history or the parent you're caring for, MedRec is designed around how Pakistani families actually manage health.</p>
      </div>
      <div class="testi-wrap">
        <button class="testi-arrow prev" id="scenPrev" aria-label="Previous">${ICONS.chevronLeft}</button>
        <div class="testi-track">
          <div class="testi-slides" id="scenSlides"></div>
        </div>
        <button class="testi-arrow next" id="scenNext" aria-label="Next">${ICONS.chevronRight}</button>
        <div class="testi-controls" id="scenDots"></div>
      </div>
    </div>
  </section>

  <section class="tight">
    <div class="wrap">
      <div class="cta-band reveal">
        <h2>Be first to use MedRec.</h2>
        <p>We're onboarding early families before public launch. Join the waitlist and help shape the app as we build it.</p>
        <div class="cta-actions">
          <button class="btn btn-primary" data-nav="contact">Join the Waitlist</button>
          <button class="btn btn-ghost" data-nav="pricing">See Pricing</button>
        </div>
      </div>
    </div>
  </section>
  `;
}

function featureCard(icon,title,text){
  return `<div class="feature-card reveal"><div class="ficon">${icon}</div><h3>${title}</h3><p>${text}</p></div>`;
}

const SCENARIOS = [
  {icon:ICONS.pulse, role:"For elderly parents", title:"Three prescriptions, one clear picture", text:"Log a parent's medications, BP readings and doctor visits in one timeline &mdash; so any child, any caregiver, can see the full picture instantly."},
  {icon:ICONS.doc, role:"For the emergency room", title:"History a new doctor can actually use", text:"Share a printable summary of allergies, current medication and past diagnoses the moment it matters &mdash; not after a call to three different clinics."},
  {icon:ICONS.users, role:"For growing families", title:"Every child's immunization record, together", text:"Keep vaccination schedules, growth checkups and prescriptions for every kid in the house, organized by profile and always up to date."},
  {icon:ICONS.folder, role:"For frequent travelers", title:"Records that travel with you", text:"Reports stay on your device and work offline &mdash; so a visit to a new city or a different clinic never means starting your history from scratch."},
];

function renderScenarios(){
  const slides = document.getElementById("scenSlides");
  const dots = document.getElementById("scenDots");
  if(!slides) return;
  slides.innerHTML = SCENARIOS.map(s => `
    <div class="testi-slide">
      <div class="testi-card">
        <div class="avatar" style="margin-inline:auto; margin-bottom:16px;">${s.icon}</div>
        <div class="badge-soft" style="margin-bottom:14px;">${s.role}</div>
        <div class="testi-quote">&ldquo;${s.title}&rdquo;</div>
        <p style="max-width:460px; margin-inline:auto; font-size:14px;">${s.text}</p>
      </div>
    </div>`).join("");
  dots.innerHTML = SCENARIOS.map((_,i)=>`<button class="testi-dot" data-i="${i}" aria-label="Show scenario ${i+1}"></button>`).join("");
  let idx = 0;
  const dotEls = [...dots.querySelectorAll(".testi-dot")];
  function go(i){
    idx = (i+SCENARIOS.length)%SCENARIOS.length;
    slides.style.transform = `translateX(-${idx*100}%)`;
    dotEls.forEach((d,j)=>d.setAttribute("aria-current", j===idx ? "true":"false"));
  }
  go(0);
  document.getElementById("scenPrev").onclick = ()=>go(idx-1);
  document.getElementById("scenNext").onclick = ()=>go(idx+1);
  dotEls.forEach(d=> d.onclick = ()=>go(+d.dataset.i));
  let timer = setInterval(()=>go(idx+1), 6000);
  const track = document.querySelector(".testi-track");
  if(track){
    track.addEventListener("mouseenter", ()=>clearInterval(timer));
    track.addEventListener("focusin", ()=>clearInterval(timer));
  }
}

/* ---------------- Features page ---------------- */
function tFeatures(){
  return `
  <section class="page-hero">
    <div class="wrap">
      <div class="eyebrow"><span class="dot"></span>Features</div>
      <h1>Everything your family's health history needs &mdash; nothing it doesn't.</h1>
      <p>MedRec is built around one idea: your records should be easy to capture, easy to find, and impossible for anyone but you to access.</p>
    </div>
  </section>

  <section class="tight">
    <div class="wrap">
      <div class="feature-grid">
        ${featureCard(ICONS.scan,"On-device OCR","Point your camera at a printed lab report and MedRec extracts the values on your phone &mdash; fast, and without sending the image anywhere to be read.")}
        ${featureCard(ICONS.mic,"Multiple ways to add records","Upload a photo or PDF, record a quick voice note, attach a short video, or just type it manually. Handwritten prescriptions are saved as-is.")}
        ${featureCard(ICONS.layers,"Record categories","Lab reports, prescriptions, diagnoses, immunizations and doctor visit notes each get their own organized, filterable category.")}
        ${featureCard(ICONS.bell,"Medication reminders","Set a schedule once and get reminded when it's time for a dose or a refill &mdash; for yourself or for whoever you're caring for.")}
        ${featureCard(ICONS.users,"Family profiles","Switch between profiles for parents, children, and elderly relatives, each with its own private, organized timeline.")}
        ${featureCard(ICONS.bot,"AI Record Assistant","Ask &ldquo;when was Abbu's last BP reading?&rdquo; and get an instant answer pulled from your own records. Retrieval only &mdash; it never diagnoses, treats, or prescribes.")}
        ${featureCard(ICONS.shield,"Privacy-first storage","Records are encrypted and stored on-device by default. You decide exactly what gets backed up or shared, and with whom.")}
        ${featureCard(ICONS.printer,"Shareable health summary","Generate a clean, printable summary of allergies, medications and history &mdash; ready for a new doctor or an emergency room visit.")}
        ${featureCard(ICONS.wifiOff,"Works fully offline","No signal, no problem. Every record you've saved stays available and searchable without an internet connection.")}
      </div>
    </div>
  </section>

  <section class="tight" style="background:var(--bg-alt); border-block:1px solid var(--border);">
    <div class="wrap split">
      <div class="reveal">
        <div class="eyebrow"><span class="dot"></span>Scope, on purpose</div>
        <h2>What MedRec deliberately doesn't do.</h2>
        <p>We built MedRec to be a record keeper you can trust, not a diagnosis engine. That boundary is intentional.</p>
        <ul class="price-list" style="margin-top:22px;">
          <li>${ICONS.ban} No AI diagnosis, triage, or treatment suggestions &mdash; ever.</li>
          <li>${ICONS.check} Diagnoses and medicines shown are what you or your doctor entered &mdash; never AI-generated.</li>
          <li>${ICONS.video} Doctor video consultations connect you with a real human doctor, not an AI health-advice feature.</li>
        </ul>
      </div>
      <div class="imgbox reveal">
        <img src="logo-icon.png" alt="MedRec mark">
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="cta-band reveal">
        <h2>See it for yourself.</h2>
        <p>Join the waitlist and we'll invite you to try MedRec before public launch.</p>
        <div class="cta-actions">
          <button class="btn btn-primary" data-nav="contact">Join the Waitlist</button>
          <button class="btn btn-ghost" data-nav="how-it-works">How It Works</button>
        </div>
      </div>
    </div>
  </section>
  `;
}

/* ---------------- How it works ---------------- */
function tHow(){
  const steps = [
    {icon:ICONS.scan, title:"Scan, speak, or type", text:"Photograph a report, upload a PDF, leave a voice note, or type the details in manually &mdash; whatever's fastest for that record."},
    {icon:ICONS.bot, title:"On-device OCR reads it", text:"Printed lab reports are read automatically on your phone. Handwritten prescriptions and images are saved and tagged as-is."},
    {icon:ICONS.check, title:"Review and confirm", text:"Quickly check the extracted values, fix anything that needs a correction, and confirm &mdash; it takes seconds."},
    {icon:ICONS.folder, title:"Access anytime, anywhere", text:"Your record is filed into the right category and timeline, searchable instantly, and available even fully offline."},
  ];
  return `
  <section class="page-hero">
    <div class="wrap">
      <div class="eyebrow"><span class="dot"></span>How it works</div>
      <h1>From a paper report to an organized record in under a minute.</h1>
      <p>No complicated setup. No manual data entry marathon. Just point, confirm, and you're done.</p>
    </div>
  </section>

  <section class="tight">
    <div class="wrap">
      <div class="steps">
        ${steps.map((s,i)=>`
          <div class="step-card reveal">
            <div class="step-num">${i+1}</div>
            <h3>${s.title}</h3>
            <p>${s.text}</p>
            ${i<steps.length-1 ? `<div class="step-arrow">${ICONS.arrowRight}</div>` : ""}
          </div>`).join("")}
      </div>
    </div>
  </section>

  <section class="tight" style="background:var(--bg-alt); border-block:1px solid var(--border);">
    <div class="wrap split">
      <div class="imgbox reveal" style="order:2;">
        <div class="phone-card" style="max-width:320px; margin:0;">
          <div class="ph-head">
            <div class="who">
              <div class="avatar">${ICONS.scan}</div>
              <div><div class="ph-name">Scanning report...</div><div class="ph-sub">CBC & Lipid Profile</div></div>
            </div>
          </div>
          <div class="record-row"><div class="ricon">${ICONS.check}</div><div class="rtext"><div class="rtitle">Hemoglobin</div><div class="rmeta">13.8 g/dL</div></div><div class="rtag">Normal</div></div>
          <div class="record-row"><div class="ricon">${ICONS.check}</div><div class="rtext"><div class="rtitle">Cholesterol</div><div class="rmeta">198 mg/dL</div></div><div class="rtag">Normal</div></div>
          <div class="record-row" style="margin-bottom:0;"><div class="ricon">${ICONS.check}</div><div class="rtext"><div class="rtitle">Fasting Glucose</div><div class="rmeta">96 mg/dL</div></div><div class="rtag">Normal</div></div>
        </div>
      </div>
      <div class="reveal" style="order:1;">
        <div class="eyebrow"><span class="dot"></span>Under the hood</div>
        <h2>OCR that respects your privacy.</h2>
        <p>Extraction happens on your device, not in some server queue. That means faster results, and your original report never has to leave your phone unless you choose to share it.</p>
        <ul class="price-list" style="margin-top:18px;">
          <li>${ICONS.check} Printed lab reports are read field-by-field automatically.</li>
          <li>${ICONS.check} Handwritten prescriptions and scans are stored as clear images, tagged and searchable by metadata.</li>
          <li>${ICONS.check} You review every extraction before it's saved &mdash; nothing is filed without your confirmation.</li>
        </ul>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="section-head center reveal">
        <div class="eyebrow" style="margin-inline:auto;"><span class="dot"></span>Common questions</div>
        <h2>Questions about the process</h2>
      </div>
      ${faqBlock(FAQ_HOW)}
    </div>
  </section>

  <section class="tight">
    <div class="wrap">
      <div class="cta-band reveal">
        <h2>Try it on your own reports.</h2>
        <p>Join the waitlist to get early access when MedRec opens up.</p>
        <div class="cta-actions">
          <button class="btn btn-primary" data-nav="contact">Join the Waitlist</button>
        </div>
      </div>
    </div>
  </section>
  `;
}

const FAQ_HOW = [
  {q:"Does the OCR work with reports in Urdu or English?", a:"MedRec is built to read reports as they're printed by Pakistani labs and clinics, including common bilingual formats. If a field can't be read confidently, you're asked to confirm or correct it before it's saved."},
  {q:"What happens to handwritten prescriptions?", a:"Handwritten prescriptions and diagnosis notes are saved as clear images or PDFs rather than OCR-extracted text, and tagged with the details you add manually so they stay searchable."},
  {q:"Do I need an internet connection to use MedRec?", a:"No. Scanning, OCR, and browsing your records all work fully offline. An internet connection is only needed for optional features like backups or doctor video consultations."},
  {q:"Can I fix a value the OCR got wrong?", a:"Yes. Every scanned record goes through a quick review step where you can edit any field before it's saved to your timeline."},
];

/* ---------------- Pricing ---------------- */
function tPricing(){
  return `
  <section class="page-hero">
    <div class="wrap">
      <div class="eyebrow"><span class="dot"></span>Pricing</div>
      <h1>Free to start. Simple to grow into.</h1>
      <p>Core record-keeping is free, always. Upgrade only when you want more &mdash; and pay doctors only when you actually book a consultation.</p>
    </div>
  </section>

  <section class="tight">
    <div class="wrap">
      <div class="pricing-grid">
        <div class="price-card reveal">
          <div class="price-plan">Free</div>
          <div class="price-amt">Rs. 0</div>
          <div class="price-per">forever, no card required</div>
          <p class="price-desc">Everything you need to stop losing reports and start keeping a real health history.</p>
          <ul class="price-list">
            <li>${ICONS.check} On-device OCR uploads</li>
            <li>${ICONS.check} Up to 2 family profiles</li>
            <li>${ICONS.check} Medication reminders</li>
            <li>${ICONS.check} Full offline access</li>
            <li>${ICONS.check} Record categories & search</li>
          </ul>
          <button class="btn btn-ghost btn-block" data-nav="contact">Get Started Free</button>
        </div>

        <div class="price-card featured reveal">
          <div class="price-badge">Most Popular</div>
          <div class="price-plan">Premium</div>
          <div class="price-amt">Rs. 349<sup>/mo</sup></div>
          <div class="price-per">billed monthly, cancel anytime</div>
          <p class="price-desc">For families managing multiple members, medications, and histories at once.</p>
          <ul class="price-list">
            <li>${ICONS.check} Everything in Free</li>
            <li>${ICONS.check} Unlimited family profiles</li>
            <li>${ICONS.check} AI Record Assistant</li>
            <li>${ICONS.check} Printable & shareable summaries</li>
            <li>${ICONS.check} Priority cloud backup</li>
            <li>${ICONS.check} Priority support</li>
          </ul>
          <button class="btn btn-primary btn-block" data-nav="contact">Join the Waitlist</button>
        </div>

        <div class="price-card reveal">
          <div class="price-plan">Doctor Visits</div>
          <div class="price-amt">Pay per visit</div>
          <div class="price-per">no subscription needed</div>
          <p class="price-desc">Book a video consultation with a real doctor directly from your timeline, only when you need one.</p>
          <ul class="price-list">
            <li>${ICONS.check} Human doctors, real consultations</li>
            <li>${ICONS.check} Doctor sees your shared history in context</li>
            <li>${ICONS.check} Pay only for the visits you book</li>
            <li>${ICONS.check} Prescription saved straight to your timeline</li>
          </ul>
          <button class="btn btn-ghost btn-block" data-nav="contact">Learn More</button>
        </div>
      </div>
      <p class="center-text" style="margin-top:28px; font-size:13px;">Prices shown are indicative and may change before public launch. Payments are processed securely.</p>
    </div>
  </section>

  <section class="tight" style="background:var(--bg-alt); border-block:1px solid var(--border);">
    <div class="wrap">
      <div class="section-head center reveal">
        <div class="eyebrow" style="margin-inline:auto;"><span class="dot"></span>Pricing FAQ</div>
        <h2>Good to know</h2>
      </div>
      ${faqBlock(FAQ_PRICING)}
    </div>
  </section>
  `;
}

const FAQ_PRICING = [
  {q:"Is my data ever held hostage behind a paywall?", a:"No. Records you've already saved on Free remain fully accessible whether or not you ever upgrade. Premium adds capacity and convenience, not access to your own history."},
  {q:"How does doctor consultation pricing work?", a:"Video consultations are pay-as-you-go &mdash; you're charged only when you book and complete a visit, with no subscription required to use this feature."},
  {q:"Can I switch between Free and Premium?", a:"Yes, anytime. Upgrading or downgrading takes effect immediately and never deletes your existing records."},
  {q:"Is there a family or elderly-care discount?", a:"We're finalizing pricing ahead of launch and are considering family bundle pricing. Join the waitlist to be notified if this becomes available."},
];

/* ---------------- About ---------------- */
function tAbout(){
  return `
  <section class="page-hero">
    <div class="wrap">
      <div class="eyebrow"><span class="dot"></span>About MedRec</div>
      <h1>Built in Pakistan, for the way Pakistani families actually manage health.</h1>
      <p>We started MedRec because a lost lab report shouldn't mean starting over &mdash; and because your elderly parent's medical history deserves to live somewhere safer than a plastic folder.</p>
    </div>
  </section>

  <section class="tight">
    <div class="wrap split">
      <div class="reveal">
        <div class="eyebrow"><span class="dot"></span>Our mission</div>
        <h2>Give every Pakistani family one place to trust with their health history.</h2>
        <p>Reports get lost. Tests get repeated. Emergency rooms treat strangers with no context. We believe the fix isn't another hospital system &mdash; it's putting the record back in the hands of the patient, in a form that's actually usable: private, offline-ready, and organized without effort.</p>
        <p>MedRec isn't trying to replace your doctor or diagnose anything. It's trying to make sure that whoever you see next &mdash; a specialist, an ER doctor, a relative helping out &mdash; has the full picture in seconds, not weeks.</p>
      </div>
      <div class="imgbox reveal">
        <img src="logo-lockup.png" alt="MedRec">
      </div>
    </div>
  </section>

  <section class="tight" style="background:var(--bg-alt); border-block:1px solid var(--border);">
    <div class="wrap">
      <div class="section-head center reveal">
        <div class="eyebrow" style="margin-inline:auto;"><span class="dot"></span>What we stand for</div>
        <h2>The principles behind every feature</h2>
      </div>
      <div class="value-grid">
        <div class="value-card reveal"><div class="ficon">${ICONS.shield}</div><div><h3>Privacy first</h3><p>Records live on-device by default and are encrypted end to end. Nothing is sold, and nothing is shared without your explicit choice.</p></div></div>
        <div class="value-card reveal"><div class="ficon">${ICONS.globe}</div><div><h3>Built for Pakistan</h3><p>Designed around local labs, local clinics, local prescriptions, and the reality of intermittent connectivity &mdash; not adapted from somewhere else.</p></div></div>
        <div class="value-card reveal"><div class="ficon">${ICONS.users}</div><div><h3>Family focused</h3><p>Health records rarely belong to just one person. MedRec is built around caring for parents, children and yourself, together.</p></div></div>
        <div class="value-card reveal"><div class="ficon">${ICONS.ban}</div><div><h3>No false promises</h3><p>MedRec organizes and retrieves what you've recorded. It never diagnoses, prescribes, or pretends to replace a real doctor.</p></div></div>
      </div>
    </div>
  </section>

  <section class="tight">
    <div class="wrap">
      <div class="section-head center reveal">
        <div class="eyebrow" style="margin-inline:auto;"><span class="dot"></span>From the founder</div>
      </div>
      <div class="founder-card reveal">
        <div class="founder-avatar">MA</div>
        <div>
          <h3>Muji Asad</h3>
          <div class="role">Founder, MedRec</div>
          <p>&ldquo;I built MedRec around a problem I kept seeing everywhere &mdash; reports lost between clinics, tests repeated for no reason, and doctors making decisions with no history to go on. Every family deserves better than a shopping bag full of paper.&rdquo;</p>
        </div>
      </div>
    </div>
  </section>

  <section class="tight">
    <div class="wrap">
      <div class="cta-band reveal">
        <h2>Help us build it right.</h2>
        <p>We're inviting early families to test MedRec before launch and shape what we build next.</p>
        <div class="cta-actions">
          <button class="btn btn-primary" data-nav="contact">Join the Waitlist</button>
          <button class="btn btn-ghost" data-nav="contact">Get in Touch</button>
        </div>
      </div>
    </div>
  </section>
  `;
}

/* ---------------- Contact ---------------- */
function tContact(){
  return `
  <section class="page-hero">
    <div class="wrap">
      <div class="eyebrow"><span class="dot"></span>Contact &amp; Waitlist</div>
      <h1>Let's talk, or just get on the list.</h1>
      <p>Questions, partnership ideas, or ready to try MedRec early &mdash; we'd like to hear from you.</p>
    </div>
  </section>

  <section class="tight">
    <div class="wrap contact-grid">
      <div class="reveal">
        <div class="contact-info-card">
          <div class="contact-row">
            <div class="ficon">${ICONS.mail}</div>
            <div><div class="ctitle">Email</div><div class="csub">hello@medrec.app</div></div>
          </div>
          <div class="contact-row">
            <div class="ficon">${ICONS.pin}</div>
            <div><div class="ctitle">Based in</div><div class="csub">Karachi, Pakistan</div></div>
          </div>
          <div class="contact-row">
            <div class="ficon">${ICONS.clock}</div>
            <div><div class="ctitle">Support hours</div><div class="csub">Mon&ndash;Sat, 10am&ndash;7pm PKT</div></div>
          </div>
          <div class="contact-row">
            <div class="ficon">${ICONS.compass}</div>
            <div><div class="ctitle">For doctors &amp; clinics</div><div class="csub">Interested in the doctor-side app? Mention it in your message.</div></div>
          </div>
        </div>
        <div class="value-card reveal" style="margin-top:20px;">
          <div class="ficon">${ICONS.sparkle}</div>
          <div><h3>Early access spots are limited</h3><p>We're onboarding a small group of families ahead of public launch to get this right before it scales.</p></div>
        </div>
      </div>

      <div class="reveal">
        <div class="form-card">
          <div class="form-success" id="formSuccess">
            ${ICONS.checkCircle}
            <div><strong>You're on the list.</strong><span>We'll reach out at the email you provided within 2 business days.</span></div>
          </div>
          <form id="contactForm" novalidate>
            <div class="form-row">
              <div class="field" data-field="name">
                <label for="f-name">Full name <span class="req">*</span></label>
                <input id="f-name" name="name" type="text" placeholder="Ayesha Khan" autocomplete="name">
                <div class="field-error">Please enter your name.</div>
              </div>
              <div class="field" data-field="phone">
                <label for="f-phone">Phone number</label>
                <input id="f-phone" name="phone" type="tel" placeholder="03xx xxxxxxx" autocomplete="tel">
                <div class="field-hint">Optional &mdash; for faster follow-up.</div>
              </div>
            </div>
            <div class="field" data-field="email">
              <label for="f-email">Email <span class="req">*</span></label>
              <input id="f-email" name="email" type="email" placeholder="you@example.com" autocomplete="email">
              <div class="field-error">Please enter a valid email address.</div>
            </div>
            <div class="field" data-field="interest">
              <label for="f-interest">I'm interested as a <span class="req">*</span></label>
              <select id="f-interest" name="interest">
                <option value="">Select one</option>
                <option value="individual">Individual user</option>
                <option value="family">Family / caregiver</option>
                <option value="doctor">Doctor or clinic</option>
                <option value="partner">Partnership / investor</option>
              </select>
              <div class="field-error">Please select an option.</div>
            </div>
            <div class="field" data-field="message">
              <label for="f-message">Message</label>
              <textarea id="f-message" name="message" placeholder="Tell us a bit about what you're looking for..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Join the Waitlist ${ICONS.arrowRight}</button>
          </form>
        </div>
      </div>
    </div>
  </section>
  `;
}

/* ---------------- FAQ helper ---------------- */
function faqBlock(items){
  return `<div class="faq-list">
    ${items.map((f,i)=>`
      <div class="faq-item reveal" data-idx="${i}">
        <button class="faq-q">${f.q}${ICONS.plus}</button>
        <div class="faq-a"><div class="faq-a-in">${f.a}</div></div>
      </div>`).join("")}
  </div>`;
}

function bindFaq(){
  document.querySelectorAll(".faq-item").forEach(item=>{
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    q.addEventListener("click", ()=>{
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(o=>{
        if(o!==item){ o.classList.remove("open"); o.querySelector(".faq-a").style.maxHeight = null; }
      });
      if(isOpen){
        item.classList.remove("open");
        a.style.maxHeight = null;
      } else {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });
}

/* ---------------- Contact form ---------------- */
function bindContactForm(){
  const form = document.getElementById("contactForm");
  if(!form) return;
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setInvalid(name, invalid){
    const f = form.querySelector(`[data-field="${name}"]`);
    if(f) f.classList.toggle("invalid", invalid);
  }

  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name")||"").trim();
    const email = (data.get("email")||"").trim();
    const interest = (data.get("interest")||"").trim();

    let valid = true;
    if(name.length < 2){ setInvalid("name", true); valid=false; } else setInvalid("name", false);
    if(!emailRe.test(email)){ setInvalid("email", true); valid=false; } else setInvalid("email", false);
    if(!interest){ setInvalid("interest", true); valid=false; } else setInvalid("interest", false);

    if(!valid){
      const firstInvalid = form.querySelector(".invalid input, .invalid select");
      if(firstInvalid) firstInvalid.focus();
      return;
    }

    const success = document.getElementById("formSuccess");
    success.classList.add("show");
    form.reset();
    success.scrollIntoView({behavior:"smooth", block:"center"});
  });
}

/* ---------------- Router ---------------- */
const PAGES = {
  "home": tHome,
  "features": tFeatures,
  "how-it-works": tHow,
  "pricing": tPricing,
  "about": tAbout,
  "contact": tContact,
};

function navTo(route, push=true){
  if(!PAGES[route]) route = "home";
  SITE.current = route;
  if(push) history.pushState({route}, "", `#/${route}`);

  const app = document.getElementById("app");
  app.innerHTML = PAGES[route]();

  document.querySelectorAll("[data-nav]").forEach(el=>{
    if(el.classList.contains("nav-link")){
      el.setAttribute("aria-current", el.dataset.nav === route ? "page" : "false");
    }
  });

  closeMobileMenu();
  window.scrollTo({top:0, behavior:"instant" in window ? "instant" : "auto"});

  if(route === "home") renderScenarios();
  bindFaq();
  bindContactForm();
  initReveals();
}

function closeMobileMenu(){
  const menu = document.getElementById("mobileMenu");
  const toggle = document.getElementById("menuToggle");
  if(menu){ menu.classList.remove("open"); }
  if(toggle){ toggle.setAttribute("aria-expanded","false"); }
}

/* ---------------- Scroll reveal ---------------- */
function initReveals(){
  const els = document.querySelectorAll(".reveal:not(.in)");
  if(!("IntersectionObserver" in window) || els.length === 0){
    els.forEach(el=>el.classList.add("in"));
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce){ els.forEach(el=>el.classList.add("in")); return; }

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.12, rootMargin:"0px 0px -40px 0px"});
  els.forEach(el=>io.observe(el));
}

/* ---------------- Global nav wiring ---------------- */
document.addEventListener("click", (e)=>{
  const el = e.target.closest("[data-nav]");
  if(el){
    e.preventDefault();
    navTo(el.dataset.nav);
  }
});

document.getElementById("menuToggle").addEventListener("click", ()=>{
  const menu = document.getElementById("mobileMenu");
  const open = menu.classList.toggle("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", String(open));
});

window.addEventListener("popstate", ()=>{
  const route = (location.hash || "#/home").replace("#/","");
  navTo(route, false);
});

/* ---------------- Init ---------------- */
(function init(){
  const initial = (location.hash || "#/home").replace("#/","");
  navTo(initial, false);
  history.replaceState({route: SITE.current}, "", `#/${SITE.current}`);
})();
