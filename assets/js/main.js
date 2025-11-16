const state = { data: null };
const el = (id) => document.getElementById(id);
function applyYear() { el('year').textContent = new Date().getFullYear(); }
function loadData() {
  fetch('resume.json')
    .then(r => r.json())
    .then(d => { state.data = d; renderAll(); })
    .catch(err => { console.error(err); document.getElementById('aboutText').textContent = 'Failed to load resume.json'; });
}
function renderAll() {
  const d = state.data; if(!d) return;
  // Header
  el('name').textContent = d.basics.name || 'Your Name';
  el('tagline').textContent = d.basics.label || 'Professional Title';
  // About
  el('aboutText').textContent = d.basics.summary || '';
  const locWrap = document.getElementById('locations');
  locWrap.innerHTML = '';
  if (d.locations) d.locations.forEach(l => { const li=document.createElement('li'); li.textContent = l; locWrap.appendChild(li); });
  // Experience
  const expWrap = document.getElementById('experienceList');
  expWrap.innerHTML = '';
  (d.work||[]).forEach(w => {
    const div = document.createElement('div'); div.className='timeline-item';
    div.innerHTML = `<div class="role-period">${w.start} – ${w.end || 'Present'}</div>` +
      `<h3>${w.position} @ ${w.company}</h3>` +
      (w.location?`<p class="muted">${w.location}</p>`:'') +
      (w.highlights? `<ul>${w.highlights.map(h=>`<li>${h}</li>`).join('')}</ul>`: '');
    expWrap.appendChild(div);
  });
  // Projects
  const projWrap = document.getElementById('projectsList'); projWrap.innerHTML = '';
  (d.projects||[]).forEach(p => {
    const card = document.createElement('article'); card.className='project-card';
    card.innerHTML = `<h3>${p.name}</h3>` + (p.description?`<p>${p.description}</p>`:'') +
      (p.url?`<p><a href='${p.url}' target='_blank' rel='noopener'>View Project</a></p>`:'') +
      (p.tags?`<div class='badges'>${p.tags.map(t=>`<span class='badge'>${t}</span>`).join('')}</div>`:'');
    projWrap.appendChild(card);
  });
  // Skills
  const skillsWrap = document.getElementById('skillsGroups'); skillsWrap.innerHTML='';
  (d.skills||[]).forEach(g => {
    const sg = document.createElement('div'); sg.className='skill-group';
    sg.innerHTML = `<h3>${g.group}</h3><div class='skill-tags'>${g.items.map(i=>`<span>${i}</span>`).join('')}</div>`;
    skillsWrap.appendChild(sg);
  });
  // Education
  const eduWrap = document.getElementById('educationList'); eduWrap.innerHTML='';
  (d.education||[]).forEach(e => {
    const li=document.createElement('li');
    li.innerHTML = `<strong>${e.institution}</strong><br>${e.area} - ${e.studyType} (${e.start} – ${e.end})`;
    eduWrap.appendChild(li);
  });
  // Contact
  const contactWrap = document.getElementById('contactList'); contactWrap.innerHTML='';
  (d.basics.profiles||[]).forEach(p => {
    const li=document.createElement('li');
    li.innerHTML = `<a href='${p.url}' target='_blank' rel='noopener'>${p.network}: ${p.username}</a>`;
    contactWrap.appendChild(li);
  });
  if (d.basics.email) {
    const li=document.createElement('li'); li.innerHTML = `<a href='mailto:${d.basics.email}'>Email: ${d.basics.email}</a>`; contactWrap.appendChild(li);
  }
  if (d.basics.website) {
    const li=document.createElement('li'); li.innerHTML = `<a href='${d.basics.website}' target='_blank' rel='noopener'>Website: ${d.basics.website}</a>`; contactWrap.appendChild(li);
  }
}
function setupThemeToggle() {
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.dataset.theme = saved;
  btn.addEventListener('click', () => {
    const cur = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = cur;
    localStorage.setItem('theme', cur);
  });
}
applyYear(); setupThemeToggle(); loadData();
