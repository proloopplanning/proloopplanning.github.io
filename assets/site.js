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
