(function(){
const tl=gsap.timeline({paused:true}), cfg={"groups": {"c01-front": [[0, [0, 1]], [7.44, [2]]], "c03-front": [[13.9, [0]], [15.38, [1, 2]], [15.75, [3]]], "c04-front": [[19.11, [0]], [20.86, [1, 2, 3, 4]], [26.6, [5, 6, 7, 8]], [26.97, [9]]], "c05-front": [[34.07, [0]], [34.42, [1]], [34.82, [2]]], "c06-front": [[37.55, [0, 1, 2, 3]], [37.85, [4, 5]], [38.19, [6, 7]], [39.45, [8, 9, 10, 11, 12]]], "c07-front": [[43.05, [0]], [44.43, [1, 2]], [47.62, [3]]], "c08-front": [[51.39, [0]], [52.34, [1]], [53.69, [2, 3, 4]]], "c09-front": [[56.72, [0]], [57.7, [1, 2]]], "c10-front": [[64, [0]], [66.8, [1, 2, 3, 4]], [67.83, [5]], [68.71, [6, 7, 8, 9]]], "c11-front": [[72.6, [0]], [74.46, [1]], [74.82, [2]], [76.09, [3, 4]]], "c12-front": [[80.58, [0]], [81.17, [1, 2]]], "c13-front": [[88.36, [0]], [89.08, [1, 2, 3]], [89.08, [4, 5, 6]], [89.08, [7, 8, 9]], [89.2, [10, 11, 12]], [89.2, [13, 14, 15]], [89.2, [16, 17, 18]], [89.32, [19, 20, 21]], [89.32, [22, 23, 24]], [89.32, [25, 26, 27]], [90.14, [28]]]}, "duration": 91.53333333333333, "suppress": [[11.91, 13.9], [37.55, 42.84]]};
const q=(selector)=>Array.from(document.querySelectorAll(selector));
function enter(el,t,instant=false){
 if(!el)return;
 const alpha=+(el.getAttribute('opacity')||1);
 gsap.set(el,{opacity:0});
 if(el.tagName.toLowerCase()==='path'&&el.getAttribute('fill')==='none'&&!el.hasAttribute('stroke-dasharray')){
  const length=el.getTotalLength();gsap.set(el,{strokeDasharray:length,strokeDashoffset:length});
  tl.set(el,{opacity:alpha},t);tl.to(el,{strokeDashoffset:0,duration:instant?0:.42,ease:'power2.out'},t);
 }else tl.fromTo(el,{opacity:0,y:instant?0:12},{opacity:alpha,y:0,duration:instant?0:.3,ease:'power3.out',immediateRender:false},t);
}
for(const clip of q('.clip')){
 const start=+clip.dataset.start,end=start+(+clip.dataset.duration),content=clip.querySelector('.content');
 if(clip.id==='c02-front'){
  tl.fromTo(content,{opacity:0},{opacity:1,duration:.15},11.91);
  tl.to(content,{y:-1920,duration:.39,ease:'power3.inOut'},13.51);continue;
 }
 const svg=clip.querySelector('svg');
 if(svg){
  const nodes=Array.from(svg.children);gsap.set(nodes,{opacity:0});
  for(const [t,indices] of cfg.groups[clip.id]||[])for(const i of indices)
   enter(nodes[i],t,t===0||nodes[i]?.getAttribute('height')==='1920');
 }
 const ghost=clip.querySelector('.ghost');
 if(ghost){
  const t=clip.id==='c09-behind'?56.72:start;enter(ghost,t,t===0);
  tl.to(ghost,{x:5,duration:Math.max(.3,end-t),ease:'sine.inOut'},t);
 }
 if(clip.id==='c06-front'){
  tl.fromTo(content,{y:1920},{y:0,duration:.4,ease:'power4.out'},37.55);
  tl.to(content,{y:-1920,duration:.3,ease:'power3.inOut'},42.54);
 }else if(clip.id!=='c13-front') tl.to(content,{opacity:0,duration:.16},end-.16);
}
// The interrupted seam returns in the same position, with its missing stitches completed.
for(const [id,t] of [['c05-behind',34.42],['c07-behind',43.05],['c11-behind',72.6]]){
 const group=document.querySelector('#'+id+' svg g');
 gsap.set(group,{opacity:0});tl.set(group,{opacity:1},t);
 const parts=Array.from(group.children);
 parts.forEach((part,j)=>{
  let when=t;
  if(id==='c11-behind'){
   if(j===22)when=74.46;else if(j===25)when=74.82;else if(j===28)when=76.09;
  }else if(part.tagName.toLowerCase()==='path')when=t+Math.min(.5,j*.018);
  enter(part,when,false);
 });
 if(id==='c07-behind'){
  const loose=parts[parts.length-1];
  tl.to(loose,{y:-7,duration:.35,ease:'power2.out'},44.43);
  tl.to(loose,{y:0,duration:.55,ease:'sine.out'},47.22);
 }
}
// Word captions keep their original wording; tile and diagnosis page own their own text.
const capRoot=document.querySelector('#captions');
for(const [i,chunk] of (window.CAPS||[]).entries()){
 const start=chunk[0][0],last=chunk[chunk.length-1];
 const end=Math.min(cfg.duration,last[1]+.12,(window.CAPS[i+1]?.[0][0]??cfg.duration)-.02);
 if(cfg.suppress.some(([a,b])=>start<b&&end>a))continue;
 const row=document.createElement('div');row.className='cap';row.style.opacity=0;capRoot.appendChild(row);
 for(const [t,e,raw] of chunk){
  const word=document.createElement('span');word.className='w'+(raw.endsWith('*')?' k':'');
  word.textContent=raw.replace(/\*$/,'');row.appendChild(word);
  tl.set(word,{opacity:1},Math.max(0,t-.02));
 }
 tl.set(row,{opacity:1},Math.max(0,start-.02));tl.set(row,{opacity:0},end);
 tl.set('#cap-burn',{opacity:1},Math.max(0,start-.02));tl.set('#cap-burn',{opacity:0},end);
}
for(let frame=0;frame<Math.ceil(cfg.duration*8);frame++)tl.set('#boil-t',{attr:{seed:1+frame%7}},frame/8);
tl.to({},{duration:cfg.duration},0);window.__timelines.main=tl;
})();