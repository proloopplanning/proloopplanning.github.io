const rows = {
 qwen: [
 ["Plan-Only","57.71 ± 2.46","67.77 ± 1.42","82.02 ± 1.29","81.94 ± 1.96","84.26 ± 1.73","52.42 ± 3.09","64.17 ± 1.98"],
 ["Reason-Only","83.58 ± 1.06","91.21 ± 0.44","93.18 ± 0.38","94.44 ± 5.20","95.37 ± 4.72","81.21 ± 1.87","90.30 ± 0.95"],
 ["Reason-Hierarchical","69.90 ± 1.41","79.71 ± 1.41","94.53 ± 0.06","90.28 ± 1.96","91.20 ± 0.65","65.45 ± 1.96","77.20 ± 1.75"],
 ["Reason-Replan","75.62 ± 2.54","83.46 ± 1.56","91.88 ± 1.08","100.00 ± 0.00","100.00 ± 0.00","70.30 ± 3.09","79.85 ± 1.90"],
 ["Ours","96.52 ± 0.70","97.39 ± 0.18","98.23 ± 0.05","95.83 ± 0.00","98.61 ± 0.00","96.67 ± 0.86","97.12 ± 0.21"]],
 gpt: [
 ["Plan-Only","84.33 ± 3.39","90.90 ± 2.08","94.54 ± 0.25","93.06 ± 5.20","93.98 ± 4.29","82.42 ± 3.09","90.23 ± 1.70"],
 ["Reason-Only","87.06 ± 1.76","92.29 ± 0.58","96.87 ± 0.26","93.06 ± 1.96","93.06 ± 1.96","85.76 ± 2.39","92.12 ± 0.95"],
 ["Reason-Hierarchical","89.30 ± 1.53","92.54 ± 1.19","97.61 ± 0.33","90.28 ± 1.96","91.67 ± 0.00","89.09 ± 1.48","92.73 ± 1.45"],
 ["Reason-Replan","92.54 ± 1.06","95.52 ± 0.61","97.34 ± 0.58","100.00 ± 0.00","100.00 ± 0.00","90.91 ± 1.29","94.55 ± 0.74"],
 ["Ours","97.51 ± 0.35","97.64 ± 0.18","99.01 ± 0.28","100.00 ± 0.00","100.00 ± 0.00","96.97 ± 0.43","97.12 ± 0.21"]]
};
function render(model){document.querySelector('#performance').innerHTML=rows[model].map((r,i)=>`<tr class="${i===4?'ours':''}"><th scope="row">${r[0]}</th>${r.slice(1).map(v=>`<td>${v}</td>`).join('')}</tr>`).join('');document.querySelectorAll('[data-model]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.model===model)));}
render('qwen');
document.querySelectorAll('[data-model]').forEach(b=>b.addEventListener('click',()=>render(b.dataset.model)));
const menu=document.querySelector('.menu'),links=document.querySelector('#nav-links');
menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false');}));

const viewer=document.querySelector('#figure-viewer'),stage=document.querySelector('#figure-stage'),picture=document.querySelector('#viewer-image');
const level=document.querySelector('#zoom-level'),pointers=new Map();
let scale=1,baseWidth=1,ratio=1,x=0,y=0,opener=null,openVersion=0;
function paint(){
 const w=baseWidth*scale,h=w/ratio;
 x=w<=stage.clientWidth?(stage.clientWidth-w)/2:Math.min(0,Math.max(stage.clientWidth-w,x));
 y=h<=stage.clientHeight?(stage.clientHeight-h)/2:Math.min(0,Math.max(stage.clientHeight-h,y));
 // Resize the SVG itself, rather than magnifying a composited bitmap layer.
 picture.style.width=`${w}px`;picture.style.left=`${x}px`;picture.style.top=`${y}px`;
 level.value=`${Math.round(scale*100)}%`;
}
function fit(){baseWidth=Math.min(stage.clientWidth-24,(stage.clientHeight-24)*ratio);scale=1;x=0;y=0;paint();}
function zoom(next,cx=stage.clientWidth/2,cy=stage.clientHeight/2){
 next=Math.max(1,Math.min(8,next));const factor=next/scale;
 x=cx-(cx-x)*factor;y=cy-(cy-y)*factor;scale=next;paint();
}
document.querySelectorAll('a.zoom').forEach(link=>{
 link.setAttribute('aria-label','Open interactive figure viewer');
 link.addEventListener('click',async e=>{
  if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
  e.preventDefault();opener=link;const version=++openVersion;
  const source=link.querySelector('img');picture.style.visibility='hidden';picture.src=source.src;picture.alt=source.alt;
  document.querySelector('#figure-pdf').href=link.href;
  viewer.showModal();document.body.classList.add('viewer-open');
  try{await picture.decode();}catch{viewer.close();window.open(link.href,'_blank','noopener');return;}
  if(!viewer.open||version!==openVersion)return;
  ratio=picture.naturalWidth/picture.naturalHeight;fit();picture.style.visibility='visible';stage.focus();
 });
});
document.querySelector('[data-zoom="in"]').onclick=()=>zoom(scale*1.5);
document.querySelector('[data-zoom="out"]').onclick=()=>zoom(scale/1.5);
document.querySelector('#zoom-reset').onclick=fit;
document.querySelector('#viewer-close').onclick=()=>viewer.close();
viewer.addEventListener('close',()=>{openVersion++;document.body.classList.remove('viewer-open');pointers.clear();stage.classList.remove('dragging');opener?.focus();});
stage.addEventListener('wheel',e=>{e.preventDefault();const box=stage.getBoundingClientRect();zoom(scale*Math.exp(-e.deltaY*.002),e.clientX-box.left,e.clientY-box.top);},{passive:false});
stage.addEventListener('pointerdown',e=>{if(e.button!==0)return;stage.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});stage.classList.add('dragging');});
stage.addEventListener('pointermove',e=>{
 if(!pointers.has(e.pointerId))return;
 const before=[...pointers.values()],old=pointers.get(e.pointerId);
 pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
 if(pointers.size===2){
  const after=[...pointers.values()],dist=a=>Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y),box=stage.getBoundingClientRect();
  const cx=(before[0].x+before[1].x)/2,cy=(before[0].y+before[1].y)/2;
  if(dist(before)>0)zoom(scale*dist(after)/dist(before),cx-box.left,cy-box.top);
  x+=(after[0].x+after[1].x)/2-cx;y+=(after[0].y+after[1].y)/2-cy;
 }else{x+=e.clientX-old.x;y+=e.clientY-old.y;}
 paint();
});
function release(e){pointers.delete(e.pointerId);if(!pointers.size)stage.classList.remove('dragging');}
stage.addEventListener('pointerup',release);stage.addEventListener('pointercancel',release);stage.addEventListener('lostpointercapture',release);
stage.addEventListener('keydown',e=>{
 if(['+','=','-','0','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))e.preventDefault();
 if(e.key==='+'||e.key==='=')zoom(scale*1.5);if(e.key==='-')zoom(scale/1.5);if(e.key==='0')fit();
 if(e.key==='ArrowLeft')x+=60;if(e.key==='ArrowRight')x-=60;if(e.key==='ArrowUp')y+=60;if(e.key==='ArrowDown')y-=60;paint();
});
window.addEventListener('resize',()=>{if(viewer.open)fit();});
