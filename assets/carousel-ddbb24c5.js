const o=document.querySelector("#btn-dropdown"),l=document.querySelector("#dropdown"),c=()=>{const t=o.getAttribute("aria-expanded")==="true"||!1;if(o.setAttribute("aria-expanded",!t),t){l.setAttribute("data-show","false");return}l.setAttribute("data-show","true")};o.addEventListener("click",c);const d=document.querySelector(".carousel-prev"),i=document.querySelector(".carousel-next"),n=document.querySelectorAll(".media");var r=0;n.forEach((t,e)=>{t.style.left="-100%",t.style.transition="translate 0.5s ease-in-out"});function s(t){console.clear(),t.target.getAttribute("aria-label")==="Previous"?(n.forEach((e,a)=>{e.style.left="-100%",e.style.transform="translateX(0%)"}),r=(r-1)%n.length,r=Math.abs(r)):t.target.getAttribute("aria-label")==="Next"&&(n.forEach((e,a)=>{e.style.left="-100%",e.style.transform="translateX(100%)"}),r=(r+1)%n.length),n[r].style.left=0,n.forEach((e,a)=>{console.log(e)})}d.addEventListener("click",s);i.addEventListener("click",s);
