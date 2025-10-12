// ===== scripts/certificados.js =====

// Utils
const $  = (q,ctx=document)=>ctx.querySelector(q);
const $$ = (q,ctx=document)=>Array.from(ctx.querySelectorAll(q));

// Normaliza tags a tokens minúsculos
function normalizeTags(tags){
  if (Array.isArray(tags)) {
    return tags.flatMap(t => String(t).split(/[,\s]+/))
               .map(t => t.trim().toLowerCase())
               .filter(Boolean);
  }
  if (typeof tags === 'string') {
    return tags.split(/[,\s]+/)
               .map(t => t.trim().toLowerCase())
               .filter(Boolean);
  }
  return [];
}

// Tarjeta (sin descarga; solo botón "Ver" → modal)
function renderCard(cert){
  const { file, title, issuer, date, id, tags = [], skills = [] } = cert;
  const tagTokens = normalizeTags(tags);
  const tagAttr = (tagTokens.length ? tagTokens : ['dev']).join(' ');

  const card = document.createElement('article');
  card.className = 'cert-card';
  card.dataset.tags = tagAttr;

  card.innerHTML = `
    <div class="issuer">
      <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4da.svg" alt="" width="18" height="18" />
      <span>${issuer || 'Certificado'}</span>
    </div>
    <div class="title">${title || file}</div>
    <div class="meta">
      ${date ? `Emitido: <strong>${date}</strong>` : ''} ${id ? ` · ID: <code>${id}</code>` : ''}
    </div>
    <div class="badges">
      ${skills.slice(0,3).map(s=>`<span class="badge">${s}</span>`).join('')}
    </div>
    <div class="card-actions">
      <button class="button-primary btn-ver" data-src="${file}" data-title="${(title||file).replace(/"/g,'&quot;')}">Ver</button>
    </div>
  `;
  return card;
}

// Cargar JSON
async function loadFromManifest(){
  const res = await fetch('docs/certificados.json', {cache:'no-store'});
  if(!res.ok) return null;
  return await res.json();
}

// Fallback por patrón
async function discoverByPattern(prefix='docs/cert-', max=99){
  const found = [];
  for(let i=1;i<=max;i++){
    const n = String(i).padStart(2,'0');
    const url = `${prefix}${n}.pdf`;
    try{
      const res = await fetch(url, {method:'GET'});
      if(res.ok){
        found.push({ file:url, title:`Certificado ${n}`, issuer:'Certificado', date:'', id:`ID-${n}`, tags:['dev'], skills:[] });
      }
    }catch(e){}
  }
  return found;
}

// ===== Estado y filtros combinados
const state = { tag: 'all', q: '' };

function applyFilters(){
  const cards = $$('.cert-card', $('#certGrid'));
  const q = state.q.toLowerCase().trim();
  cards.forEach(card => {
    const tags = (card.dataset.tags || '').split(/\s+/);
    const matchesTag = (state.tag === 'all') || tags.includes(state.tag);
    const text = card.innerText.toLowerCase();
    const matchesSearch = !q || text.includes(q);
    card.style.display = (matchesTag && matchesSearch) ? 'flex' : 'none';
  });
}

function setTag(tag){
  state.tag = tag;
  const chips = $$('.chip');
  chips.forEach(c => c.setAttribute('aria-pressed','false'));
  const active = chips.find(c => c.dataset.filter === tag) || chips[0];
  active?.setAttribute('aria-pressed','true');
  applyFilters();
}

// ===== Modal PDF con blob (no expone ruta; sin descarga)
let currentObjectURL = null;

async function openPdfInModal(src, t){
  const modal  = $('#pdfModal');
  const viewer = $('#pdfViewer');
  const title  = $('#pdfTitle');

  try{
    const res = await fetch(src, {cache:'no-store'});
    if(!res.ok) throw new Error('No se pudo cargar el PDF');
    const blob = await res.blob();

    if(currentObjectURL){ URL.revokeObjectURL(currentObjectURL); }
    currentObjectURL = URL.createObjectURL(blob);

    viewer.setAttribute('src', currentObjectURL);
    title.textContent = t || 'Ver certificado';
    modal.showModal();
  }catch(err){
    alert('No se pudo abrir el certificado.');
    console.error(err);
  }
}

function closeModal(){
  const modal  = $('#pdfModal');
  const viewer = $('#pdfViewer');
  viewer.setAttribute('src','');
  if(currentObjectURL){ URL.revokeObjectURL(currentObjectURL); currentObjectURL=null; }
  modal.close();
}

// ===== Init
(async () => {
  const grid = $('#certGrid');
  let certs = await loadFromManifest();
  if(!Array.isArray(certs) || certs.length === 0){
    certs = await discoverByPattern('docs/cert-', 99);
  }

  grid.innerHTML = '';
  certs.forEach(c => grid.appendChild(renderCard(c)));
  $('#cert-count').innerHTML = `Listado completo de mis certificaciones (<strong>${certs.length}</strong>).`;

  // Chips
  const chips = $$('.chip');
  chips.forEach(ch=>ch.addEventListener('click',()=>setTag(ch.dataset.filter)));

  // Búsqueda
  const sb = $('#searchBox');
  sb.addEventListener('input', e => { state.q = e.target.value || ''; applyFilters(); });

  // Preselección ?tag y ?q
  const sp = new URLSearchParams(location.search);
  const initialTag = (sp.get('tag') || 'all').toLowerCase();
  const initialQ = sp.get('q') || '';
  state.q = initialQ;
  if (initialQ) sb.value = initialQ;
  setTag(initialTag);

  // Click en “Ver” → Modal
  grid.addEventListener('click',(e)=>{
    const btn = e.target.closest('.btn-ver');
    if(!btn) return;
    openPdfInModal(btn.dataset.src, btn.dataset.title);
  });

  // Cerrar modal (botón, ESC, clic fuera)
  $('#pdfClose').addEventListener('click', closeModal);
  $('#pdfModal').addEventListener('cancel', closeModal);
  $('#pdfModal').addEventListener('click', (e)=>{
    const vp = $('#pdfModal').querySelector('.pdf-modal__viewport');
    const r = vp.getBoundingClientRect();
    const inside = e.clientX>=r.left && e.clientX<=r.right && e.clientY>=r.top && e.clientY<=r.bottom;
    if(!inside) closeModal();
  });

  // Limitar acciones dentro del modal (no bloquea al 100%)
  const modal = $('#pdfModal');
  modal.addEventListener('contextmenu', e => e.preventDefault());
  modal.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && ['s','p','S','P'].includes(e.key)) e.preventDefault();
  });
})();
