var X=(i,t,n)=>{if(!t.has(i))throw TypeError("Cannot "+n)};var r=(i,t,n)=>(X(i,t,"read from private field"),n?n.call(i):t.get(i)),a=(i,t,n)=>{if(t.has(i))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(i):t.set(i,n)},l=(i,t,n,e)=>(X(i,t,"write to private field"),e?e.call(i,n):t.set(i,n),n);import"./all.min-0a4d2807.js";import"./carousel-ddbb24c5.js";var h,d,s,f,c,w,g,m,L,y,D,v,b,E,p;class q{constructor(t,n,e){a(this,h,0);a(this,d,0);a(this,s,null);a(this,f,100);a(this,c,[]);a(this,w,()=>{});a(this,g,()=>{});a(this,m,()=>{});a(this,L,500);a(this,y,!0);a(this,D,!1);a(this,v,t=>{t.preventDefault(),t.type==="touchstart"?l(this,h,t.touches[0].clientX):(l(this,h,t.clientX),t.target.style.cursor="grabbing"),l(this,s,t.target)});a(this,b,t=>{if(!r(this,s)||t.target!==r(this,s)||r(this,c).includes(r(this,s)))return;t.type==="touchmove"?l(this,d,t.touches[0].clientX):l(this,d,t.clientX);const n=r(this,d)-r(this,h);if(Math.abs(n)>r(this,f)){r(this,s).style.transform=`translateX(${n*100}px)  rotate(${n*10}deg)`,r(this,s).style.transition="transform 1.3s ease-in-out",r(this,c).push(r(this,s)),r(this,s).addEventListener("transitionend",r(this,p)),r(this,s).style.cursor="grab",n>0?r(this,w).call(this,r(this,s)):r(this,g).call(this,r(this,s)),r(this,m).call(this,r(this,s));return}const e=t.target;e.style.transform=`translateX(${n}px) rotate(${n/5}deg)`,e.style.transition="none"});a(this,E,t=>{r(this,s)&&(r(this,c).includes(r(this,s))||(r(this,s).style.cursor="grab",r(this,s).style.transform="none",r(this,s).style.transition="transform 0.5s ease",l(this,s,null)))});a(this,p,t=>{if(t.propertyName!=="transform")return;t.target.remove()});if(console.log(e),!t)throw new Error("cardContainer is required");if(!n)throw new Error("No cards found");if(!(n instanceof NodeList))throw new Error("Cards must be a NodeList");if(n.length===0)throw new Error("Cards array is empty");n=Array.from(n),t.style.position="relative";let C=1;if(n.forEach(o=>{o.style.position="absolute",o.style.top="0",o.style.left="0",o.style.height="100%",o.style.width="100%",o.style.zIndex=C*1e3,o.style.cursor="grab",C++;const I=o.children;for(let u=0;u<I.length;u++)I[u].style.pointerEvents="none";let A=Math.random()*1e16;if(A=A.toString(36).replace(".",""),o.setAttribute("data-cf-id",A),r(this,y)){const u=Math.floor(Math.random()*20)-10;o.style.transform=`rotate(${u}deg)`}o.addEventListener("mousedown",r(this,v)),o.addEventListener("mousemove",r(this,b)),o.addEventListener("mouseup",r(this,E)),o.addEventListener("touchstart",r(this,v)),o.addEventListener("touchmove",r(this,b)),o.addEventListener("touchend",r(this,E))}),e&&typeof e=="object"){if(e.cardThreshold&&typeof e.cardThreshold!="number")throw new Error("cardThreshold must be a number");if(e.cardThreshold&&l(this,f,e.cardThreshold),e.onSwipeRight&&typeof e.onSwipeRight!="function")throw new Error("onSwipeRight must be a function");if(e.onSwipeRight&&l(this,w,e.onSwipeRight),e.onSwipe&&typeof e.onSwipe!="function")throw new Error("onSwipe must be a function");if(e.onSwipe&&l(this,m,e.onSwipe),e.onSwipeLeft&&typeof e.onSwipeLeft!="function")throw new Error("onSwipeLeft must be a function");if(e.onSwipeLeft&&l(this,g,e.onSwipeLeft),e.transitionDuration&&typeof e.transitionDuration!="number")throw new Error("transitionDuration must be a number");if(e.transitionDuration<0||e.transitionDuration>1e4)throw new Error("transitionDuration must be greater than 0 and less than 10000");if(e.transitionDuration&&l(this,L,e.transitionDuration),e.notAligned&&typeof e.notAligned!="boolean")throw new Error("notAligned must be a boolean");e.notAligned===!1&&l(this,y,!1)}}}h=new WeakMap,d=new WeakMap,s=new WeakMap,f=new WeakMap,c=new WeakMap,w=new WeakMap,g=new WeakMap,m=new WeakMap,L=new WeakMap,y=new WeakMap,D=new WeakMap,v=new WeakMap,b=new WeakMap,E=new WeakMap,p=new WeakMap;const B=document.querySelector("#trivia-card-container"),M=document.querySelectorAll(".trivia-card"),$=document.querySelector("#message");let S="",R=(i,t)=>{i.toLowerCase()===t.toLowerCase()?(document.getElementById("trivia-card-container").classList.add("green-glow"),S="Correct 😀"):(document.getElementById("trivia-card-container").classList.add("red-glow"),S="Incorrect 😔"),$.innerHTML=S,console.log(S)};const T=()=>{document.getElementById("trivia-card-container").classList.remove("green-glow"),document.getElementById("trivia-card-container").classList.remove("red-glow")};new q(B,M,{notAligned:!1,onSwipeLeft:i=>{T();const t=i.getAttribute("data-correct-answer"),n=i.querySelector('[data-card="left"]').getAttribute("data-answer");R(n,t)},onSwipeRight:i=>{T();const t=i.getAttribute("data-correct-answer");document.getElementById("trivia-card-container").classList.remove("green-glow"),document.getElementById("trivia-card-container").classList.remove("red-glow");const n=i.querySelector('[data-card="right"]').getAttribute("data-answer");R(n,t)}});