'use strict';

async function fetchJSON(url){
  const res = await fetch(url,{cache:'no-store'});
  if(!res.ok) throw new Error('Fetch failed: '+url);
  return res.json();
}

function el(tag, cls, text){
  const e = document.createElement(tag);
  if(cls) e.className = cls;
  if(text) e.textContent = text;
  return e;
}

function renderOverview(root, data){
  root.innerHTML='';
  const items = [
    {label:'โปรเจกต์', value:data.project?.name||'-'},
    {label:'สถานะรวม', value:data.project?.status||'-'},
    {label:'ช่วงเวลา', value:(data.project?.start||'?')+' → '+(data.project?.end||'?')},
    {label:'ความคืบหน้า', value:(data.project?.progress??0)+'%'}
  ];
  items.forEach(i=>{
    const kpi = el('div','kpi');
    kpi.appendChild(el('div','label',i.label));
    kpi.appendChild(el('div','value',i.value));
    root.appendChild(kpi);
  });
}

function renderMilestones(root, list){
  root.innerHTML='';
  (list||[]).forEach(m=>{
    const item = el('div','m-item');
    item.appendChild(el('div','title', m.title||'-'));
    const meta = el('div','meta', `${m.start||'?'} → ${m.end||'?'} • ${m.status||'pending'}`);
    item.appendChild(meta);
    root.appendChild(item);
  });
}

function renderTasks(root, tasks){
  root.innerHTML='';
  (tasks||[]).forEach(t=>{
    const item = el('div','task');
    item.appendChild(el('div','title', t.title||'-'));
    if(t.owner){ item.appendChild(el('span','badge', t.owner)); }
    const st = el('span','state '+(t.status||'pending'), t.status||'pending');
    item.appendChild(st);
    root.appendChild(item);
  });
}

function renderChangelog(root, logs){
  root.innerHTML='';
  (logs||[]).slice(0,10).forEach(l=>{
    const item = el('div','c-item');
    item.appendChild(el('div','title', l.title||'-'));
    item.appendChild(el('div','meta', l.date||''));
    root.appendChild(item);
  });
}

(async function init(){
  try{
    const data = await fetchJSON('data/status.json');
    renderOverview(document.getElementById('overview'), data);
    renderMilestones(document.getElementById('milestones'), data.milestones);
    renderTasks(document.getElementById('task-list'), data.tasks);
    renderChangelog(document.getElementById('changelog-list'), data.changelog);
    document.getElementById('last-updated').textContent = data.updatedAt || new Date().toISOString();
  }catch(err){
    console.error(err);
    document.getElementById('overview').textContent = 'ไม่สามารถโหลดข้อมูลได้';
  }
})();
