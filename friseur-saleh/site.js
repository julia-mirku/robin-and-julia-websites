document.documentElement.classList.add('js');
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
/* burger */
$('.burger')?.addEventListener('click',()=>document.body.classList.toggle('mopen'));
$$('.mnav a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('mopen')));
$$('.dd>button').forEach(b=>b.addEventListener('click',()=>b.parentElement.classList.toggle('open')));
document.addEventListener('click',e=>{if(!e.target.closest('.dd'))$$('.dd').forEach(d=>d.classList.remove('open'))});
/* hours */
const H={1:null,2:[9,18],3:[9,18],4:[9,18],5:[9,18],6:[8,14],0:null};
const DN=['So','Mo','Di','Mi','Do','Fr','Sa'],DL=['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
const now=new Date(new Date().toLocaleString('en-US',{timeZone:'Europe/Berlin'}));const td=now.getDay(),hr=now.getHours()+now.getMinutes()/60;
const f=h=>String(h).padStart(2,'0')+':00';
$$('.js-today').forEach(el=>{const st=$('.st',el),hs=$('.hs',el),dot=$('.dot',el),h=H[td];
 if(h&&hr>=h[0]&&hr<h[1]){st.textContent='Jetzt geöffnet';hs.textContent='heute bis '+f(h[1])+' Uhr'}
 else{dot.classList.add('zu');let n=td,k=0;do{n=(n+1)%7;k++}while(!H[n]);
  if(h&&hr<h[0]){st.textContent='Heute ab '+f(h[0])+' Uhr';hs.textContent='bis '+f(h[1])+' Uhr'}
  else{st.textContent='Gerade geschlossen';hs.textContent='öffnet '+(k===1?'morgen':DL[n])+' '+f(H[n][0])+' Uhr'}}});
$$('.week').forEach(w=>{const di=w.nextElementSibling;
 [1,2,3,4,5,6,0].forEach(d=>{const b=document.createElement('button');b.type='button';b.innerHTML=DN[d]+'<small>'+(H[d]?H[d][0]+'–'+H[d][1]:'zu')+'</small>';if(!H[d])b.classList.add('zu');b.dataset.d=d;w.appendChild(b)});
 const pick=d=>{$$('button',w).forEach(b=>b.classList.toggle('on',+b.dataset.d===d));di.innerHTML=(d===td?'<b>Heute</b> · ':'')+DL[d]+': '+(H[d]?'<b>'+f(H[d][0])+' – '+f(H[d][1])+' Uhr</b>':'geschlossen')};
 w.addEventListener('click',e=>{const b=e.target.closest('button');if(b)pick(+b.dataset.d)});pick(td)});
/* rails */
$$('.rail-wrap').forEach(w=>{const r=$('.rail',w),l=$('.arr.l',w),rt=$('.arr.r',w),dots=$('.dots',w);
 const step=()=>r.children[0].getBoundingClientRect().width+parseFloat(getComputedStyle(r).columnGap||18);
 if(dots)dots.innerHTML=[...r.children].map(()=>'<i></i>').join('');
 const upd=()=>{if(l){l.disabled=r.scrollLeft<4;rt.disabled=r.scrollLeft>r.scrollWidth-r.clientWidth-4}
  if(dots){const i=Math.round(r.scrollLeft/step());[...dots.children].forEach((d,k)=>d.classList.toggle('on',k===i))}};
 l&&(l.onclick=()=>r.scrollBy({left:-step(),behavior:'smooth'}));rt&&(rt.onclick=()=>r.scrollBy({left:step(),behavior:'smooth'}));
 r.addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd()});
/* team tap */
$$('.mem').forEach(m=>m.addEventListener('click',()=>{if(!matchMedia('(hover:hover)').matches)m.classList.toggle('open')}));
/* accordions */
$$('.qa>button,.pcat>button').forEach(b=>b.addEventListener('click',()=>{const p=b.parentElement;const o=!p.classList.contains('open');p.classList.toggle('open',o);b.setAttribute('aria-expanded',o)}));
/* price tabs */
$$('.ptabs').forEach(t=>t.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const g=b.dataset.g;t.classList.toggle('her',g==='herren');
 $$('button',t).forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-selected',x===b)});$$('[data-panel]').forEach(p=>p.hidden=p.dataset.panel!==g)}));
/* form */
$$('.form').forEach(fm=>fm.addEventListener('submit',e=>{e.preventDefault();fm.classList.add('sent')}));
/* counter */
$$('[data-count]').forEach(el=>{const to=+el.dataset.count;let s=null;const io=new IntersectionObserver(es=>{if(!es[0].isIntersecting)return;io.disconnect();
 const t=ts=>{s=s||ts;const k=Math.min(1,(ts-s)/1400);el.textContent=Math.round(to*(1-Math.pow(1-k,3))).toLocaleString('de-DE')+'+';if(k<1)requestAnimationFrame(t)};requestAnimationFrame(t)});io.observe(el)});
/* lightbox */
const lb=$('.lb'),li=lb&&$('img',lb);
document.addEventListener('click',e=>{const fg=e.target.closest('[data-lb]');if(!fg||!lb)return;const im=$('img',fg);li.src=im.src;li.alt=im.alt;li.classList.remove('z');lb.classList.add('open');document.body.style.overflow='hidden'});
li&&li.addEventListener('click',e=>{e.stopPropagation();li.classList.toggle('z')});
lb&&lb.addEventListener('click',()=>{lb.classList.remove('open');document.body.style.overflow=''});
addEventListener('keydown',e=>{if(e.key==='Escape'&&lb){lb.classList.remove('open');document.body.style.overflow=''}});
/* reveal */
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{rootMargin:'0px 0px -8% 0px'});
$$('.rv,.himg,.pimg').forEach(el=>io.observe(el));