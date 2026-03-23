"use strict";

// ── State ────────────────────────────────────────────────
let ALL_COLORS = [];
let ACTIVE_SOURCE = "css"; // default CSS
let currentHex = "#1E90FF";

// ── Color math ───────────────────────────────────────────
const hexToRgb = h => {
  const c = h.replace("#","");
  return { r:parseInt(c.slice(0,2),16), g:parseInt(c.slice(2,4),16), b:parseInt(c.slice(4,6),16) };
};
const clamp = v => Math.max(0, Math.min(255, Math.round(v)));
const rgbToHex = (r,g,b) => "#"+[r,g,b].map(v=>clamp(v).toString(16).padStart(2,"0")).join("").toUpperCase();
const rgbToHsl = (r,g,b) => {
  r/=255; g/=255; b/=255;
  const mx=Math.max(r,g,b), mn=Math.min(r,g,b);
  let h=0, s=0, l=(mx+mn)/2;
  if(mx!==mn){
    const d=mx-mn; s=l>.5?d/(2-mx-mn):d/(mx+mn);
    if(mx===r) h=((g-b)/d+(g<b?6:0))/6;
    else if(mx===g) h=((b-r)/d+2)/6;
    else h=((r-g)/d+4)/6;
  }
  return {h:Math.round(h*360),s:Math.round(s*100),l:Math.round(l*100)};
};
const hslToHex = (h,s,l) => {
  s/=100; l/=100; const a=s*Math.min(l,1-l);
  const f=n=>{const k=(n+h/30)%12; return l-a*Math.max(-1,Math.min(k-3,9-k,1));};
  return rgbToHex(f(0)*255,f(8)*255,f(4)*255);
};
const isLight = hex => { const{r,g,b}=hexToRgb(hex); return (r*299+g*587+b*114)/1000>145; };
const colorDist = (h1,h2) => {
  const a=hexToRgb(h1), b=hexToRgb(h2);
  return Math.sqrt((a.r-b.r)**2+(a.g-b.g)**2+(a.b-b.b)**2);
};

function findNearest(hex, pool) {
  let best=null, bd=Infinity;
  for(const c of pool){
    const d=colorDist(hex.toUpperCase(), c.hex.toUpperCase());
    if(d<bd){bd=d; best=c;}
  }
  return best ? {...best, distance:Math.round(bd), exact:bd<1} : null;
}

function getPool() {
  return ACTIVE_SOURCE==="all" ? ALL_COLORS : ALL_COLORS.filter(c=>c.source===ACTIVE_SOURCE);
}

function srcShortLabel(src) {
  if(src==="ral_classic") return "RAL";
  if(src==="ral_design")  return "RAL D";
  return src.toUpperCase();
}

function getPsych(h,s,l) {
  if(s<15 && l>85)  return ["☁️","White","Purity, clarity, simplicity"];
  if(s<15 && l<20)  return ["🖤","Black","Elegance, power, sophistication"];
  if(s<15)          return ["🩶","Grey","Neutrality, professionalism, balance"];
  if(h<15||h>=345)  return ["❤️","Red","Energy, passion, urgency"];
  if(h<45)          return ["🧡","Orange","Warmth, enthusiasm, creativity"];
  if(h<65)          return ["💛","Yellow","Optimism, joy, attention"];
  if(h<150)         return ["💚","Green","Nature, growth, trust"];
  if(h<195)         return ["🩵","Turquoise","Freshness, calm, modernity"];
  if(h<255)         return ["💙","Blue","Trust, stability, serenity"];
  if(h<285)         return ["💜","Purple","Luxury, creativity, wisdom"];
  if(h<330)         return ["🩷","Pink","Softness, romance, care"];
  return ["❤️","Red-Pink","Passion, vitality, warmth"];
}

// ── Apply hex to all UI ───────────────────────────────────
function applyHex(raw) {
  if(!/^#[0-9A-Fa-f]{6}$/.test(raw)) return;
  const hex = raw.toUpperCase();
  currentHex = hex;

  const {r,g,b} = hexToRgb(hex);
  const hsl = rgbToHsl(r,g,b);
  const light = isLight(hex);
  const mode = light ? "light" : "dark";
  const comp = rgbToHex(255-r,255-g,255-b);
  const tri1 = hslToHex((hsl.h+120)%360,hsl.s,hsl.l);
  const tri2 = hslToHex((hsl.h+240)%360,hsl.s,hsl.l);
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const rgbStr = `rgb(${r}, ${g}, ${b})`;
  const nearest = ALL_COLORS.length ? findNearest(hex, getPool()) : null;

  // Swatch
  const swatch = document.getElementById("colorSwatch");
  if(swatch) swatch.style.background = hex;

  // Name badge
  const badge = document.getElementById("nameBadge");
  if(badge) {
    badge.className = "name-badge "+mode;
    const nameEl = document.getElementById("colorName");
    const codeEl = document.getElementById("colorCode");
    if(nameEl) { nameEl.style.color = light?"#212529":"#fff"; nameEl.textContent = nearest ? nearest.name : hex; }
    if(codeEl) {
      codeEl.style.color = light?"rgba(0,0,0,0.4)":"rgba(255,255,255,0.55)";
      if(nearest) {
        const srcLbl = nearest.source==="ral_classic"?"RAL Classic":nearest.source==="ral_design"?"RAL Design":nearest.source.toUpperCase();
        const codePart = nearest.code ? ` · ${nearest.code}` : "";
        codeEl.textContent = nearest.exact ? `Exact · ${srcLbl}${codePart}` : `Closest · Δ ${nearest.distance} · ${srcLbl}${codePart}`;
      }
    }
  }

  // Src chip
  const chip = document.getElementById("srcChip");
  if(chip) { chip.className="src-chip "+mode; chip.textContent=nearest?srcShortLabel(nearest.source):"—"; }

  // Picker icon
  const pi = document.getElementById("pickerIcon");
  if(pi) pi.className = "picker-icon "+mode;

  // Inputs
  const hexIn = document.getElementById("hexInput");
  const nativePick = document.getElementById("nativePicker");
  if(hexIn) hexIn.value = hex;
  if(nativePick) nativePick.value = hex;
  ["r","g","b"].forEach((ch,i)=>{
    const v=[r,g,b][i];
    const inp=document.getElementById(ch+"In");
    const sld=document.getElementById(ch+"Slider");
    const val=document.getElementById(ch+"Val");
    if(inp) inp.value=v;
    if(sld) sld.value=v;
    if(val) val.textContent=v;
  });

  const hslBox = document.getElementById("hslDisplay");
  if(hslBox) hslBox.textContent = hslStr;

  // Chips
  const cHex=document.getElementById("chipHexVal");
  const cRgb=document.getElementById("chipRgbVal");
  const cHsl=document.getElementById("chipHslVal");
  if(cHex) cHex.textContent=hex;
  if(cRgb) cRgb.textContent=rgbStr;
  if(cHsl) cHsl.textContent=hslStr;

  // Palette swatches
  [["swMain",hex],["swComp",comp],["swTri1",tri1],["swTri2",tri2]].forEach(([id,h])=>{
    const box=document.getElementById(id);
    const hexEl=document.getElementById(id+"Hex");
    if(box){ box.style.background=h; box.textContent=""; box.dataset.hex=h; }
    if(hexEl) hexEl.textContent=h;
  });

  // Psychology
  const pw = document.getElementById("psychWrap");
  if(pw) {
    const [icon,name,desc] = getPsych(hsl.h,hsl.s,hsl.l);
    pw.innerHTML=`<div class="psych-pill"><div class="psych-dot" style="background:${hex}"></div><span>${icon} <strong>${name}</strong> — ${desc}</span></div>`;
  }

  // Canvas preview
  const cs=document.getElementById("canvasSwatch");
  const cn=document.getElementById("canvasName");
  const ch2=document.getElementById("canvasHex");
  if(cs) cs.style.background=hex;
  if(ch2) ch2.textContent=hex;
  if(cn&&nearest) cn.textContent=nearest.name;
}

// ── Input handlers ────────────────────────────────────────
function onHexInput(v){ if(/^#[0-9A-Fa-f]{6}$/.test(v)) applyHex(v); }

function onRgbInput(){
  const r=clamp(parseInt(document.getElementById("rIn").value)||0);
  const g=clamp(parseInt(document.getElementById("gIn").value)||0);
  const b=clamp(parseInt(document.getElementById("bIn").value)||0);
  applyHex(rgbToHex(r,g,b));
}

function onSlider(ch,val){
  document.getElementById(ch+"In").value=val;
  document.getElementById(ch+"Val").textContent=val;
  onRgbInput();
}

// ── Copy ──────────────────────────────────────────────────
function copyChip(id,label){
  const vals={
    hex:currentHex,
    rgb:document.getElementById("chipRgbVal").textContent,
    hsl:document.getElementById("chipHslVal").textContent
  };
  navigator.clipboard.writeText(vals[id]);
  const chip=document.getElementById("chip"+id.charAt(0).toUpperCase()+id.slice(1));
  const lbl=chip.querySelector(".chip-lbl");
  chip.classList.add("copied"); lbl.textContent="✓ Copied!";
  setTimeout(()=>{ chip.classList.remove("copied"); lbl.textContent=label; },1600);
}

function copySwatch(id){
  const box=document.getElementById(id);
  const hex=box.dataset.hex;
  navigator.clipboard.writeText(hex);
  box.textContent="✓";
  box.style.color=isLight(hex)?"#212529":"#fff";
  setTimeout(()=>{ box.textContent=""; },1300);
}

// ── Standard selector ─────────────────────────────────────
function setSource(source){
  ACTIVE_SOURCE=source;
  // Sync radio buttons
  document.querySelectorAll(".std-radio-item").forEach(r=>{ r.checked=(r.value===source); });
  applyHex(currentHex);
}

function onStdRadio(value){ setSource(value); }

// ── EyeDropper ────────────────────────────────────────────
const eyedropperSupported = "EyeDropper" in window;

function initEyedropper(){
  const msg=document.getElementById("noSupportMsg");
  if(msg && !eyedropperSupported) msg.style.display="block";
}

async function activateEyedropper(){
  if(!eyedropperSupported){ showMsg("⚠️ EyeDropper requires Chrome or Edge.","warn"); return; }
  const btn=document.getElementById("eyedropBtn");
  if(btn) btn.classList.add("active");
  const icon=document.getElementById("eyedropIcon");
  const text=document.getElementById("eyedropText");
  const sub=document.getElementById("eyedropSub");
  if(icon) icon.textContent="🔍";
  if(text) text.textContent="Click on any color on your screen…";
  if(sub)  sub.textContent="Press ESC to cancel";
  showMsg("Move your cursor to the desired color and click","info");
  try {
    const result=await new EyeDropper().open();
    applyHex(result.sRGBHex);
    showMsg("✓ Color picked!","ok");
    setTimeout(clearMsg,2500);
  } catch(e){
    if(e.name!=="AbortError") showMsg("Could not pick color. Try again.","warn");
    else clearMsg();
  } finally {
    if(btn) btn.classList.remove("active");
    if(icon) icon.textContent="🖱️";
    if(text) text.textContent="Pick Color from Screen";
    if(sub)  sub.textContent="EyeDropper API — click anywhere on your screen";
  }
}

function showMsg(t,c){ const e=document.getElementById("dropperMsg"); if(e){e.textContent=t; e.className=c;} }
function clearMsg(){ const e=document.getElementById("dropperMsg"); if(e){e.textContent=""; e.className="";} }

// ── Image pixel picker ────────────────────────────────────
function handleDragOver(e){ e.preventDefault(); document.getElementById("imgDrop").classList.add("over"); }
function handleDragLeave(){ document.getElementById("imgDrop").classList.remove("over"); }
function handleDrop(e){
  e.preventDefault(); document.getElementById("imgDrop").classList.remove("over");
  const f=e.dataTransfer.files[0];
  if(f&&f.type.startsWith("image/")) handleImgUpload(f);
}

function handleImgUpload(file){
  if(!file) return;
  const reader=new FileReader();
  reader.onload=e=>{
    const img=new Image();
    img.onload=()=>drawCanvas(img);
    img.src=e.target.result;
  };
  reader.readAsDataURL(file);
}

function drawCanvas(img){
  const canvas=document.getElementById("imgCanvas");
  const wrap=document.getElementById("canvasWrap");
  if(!canvas||!wrap) return;
  const maxW=wrap.parentElement.clientWidth-40;
  const scale=Math.min(1,maxW/img.width);
  canvas.width=Math.round(img.width*scale);
  canvas.height=Math.round(img.height*scale);
  const ctx=canvas.getContext("2d");
  ctx.drawImage(img,0,0,canvas.width,canvas.height);
  wrap.style.display="block";
  const drop=document.getElementById("imgDrop");
  if(drop) drop.style.display="none";

  canvas.onclick=e=>{
    const rect=canvas.getBoundingClientRect();
    const sx=canvas.width/rect.width, sy=canvas.height/rect.height;
    const x=Math.round((e.clientX-rect.left)*sx);
    const y=Math.round((e.clientY-rect.top)*sy);
    const px=ctx.getImageData(x,y,1,1).data;
    applyHex(rgbToHex(px[0],px[1],px[2]));
  };

  canvas.onmousemove=e=>{
    const rect=canvas.getBoundingClientRect();
    const sx=canvas.width/rect.width, sy=canvas.height/rect.height;
    const x=Math.round((e.clientX-rect.left)*sx);
    const y=Math.round((e.clientY-rect.top)*sy);
    const px=ctx.getImageData(x,y,1,1).data;
    const hex=rgbToHex(px[0],px[1],px[2]);
    const cs=document.getElementById("canvasSwatch");
    const ch=document.getElementById("canvasHex");
    const cn=document.getElementById("canvasName");
    if(cs) cs.style.background=hex;
    if(ch) ch.textContent=hex;
    const near=ALL_COLORS.length?findNearest(hex,getPool()):null;
    if(cn) cn.textContent=near?near.name:hex;
  };
}

function clearCanvas(){
  const wrap=document.getElementById("canvasWrap");
  const drop=document.getElementById("imgDrop");
  const file=document.getElementById("imgFile");
  if(wrap) wrap.style.display="none";
  if(drop) drop.style.display="";
  if(file) file.value="";
}

// ── Load colors from API ──────────────────────────────────
async function loadColors(){
  try {
    const [colorsRes, sourcesRes] = await Promise.all([
      fetch("/api/colors"),
      fetch("/api/colors/sources")
    ]);
    if(!colorsRes.ok) throw new Error("API error");
    ALL_COLORS = await colorsRes.json();
    const sources = await sourcesRes.json();
    const fmt = n => n.toLocaleString();
    const total = ALL_COLORS.length;

    // Update all count elements
    ["cnt-all","cnt-all-std"].forEach(id=>{
      const el=document.getElementById(id); if(el) el.textContent=fmt(total);
    });
    for(const s of sources){
      [s.source, s.source+"-std"].forEach(id=>{
        const el=document.getElementById("cnt-"+id); if(el) el.textContent=fmt(s.count);
      });
    }

    console.log(`Loaded ${ALL_COLORS.length} colors`);
    applyHex(currentHex);
  } catch(e){
    console.warn("API fallback:", e.message);
    ALL_COLORS=[
      {name:"DodgerBlue",hex:"#1E90FF",source:"css",family:"blue"},
      {name:"Red",hex:"#FF0000",source:"css",family:"red"},
      {name:"Green",hex:"#008000",source:"css",family:"green"},
      {name:"Black",hex:"#000000",source:"css",family:"gray"},
      {name:"White",hex:"#FFFFFF",source:"css",family:"white"},
    ];
    applyHex(currentHex);
  }
}
