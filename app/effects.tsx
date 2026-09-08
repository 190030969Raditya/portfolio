'use client';
import { useEffect, useRef, useState } from 'react';

export function TypedRole() {
 const [text,setText]=useState('Software Engineer');
 useEffect(()=>{
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const words=['Software Engineer','Java Full Stack Developer','Cloud & AI Enthusiast'];
  let index=0,count=words[0].length,back=true,timer:ReturnType<typeof setTimeout>;
  const tick=()=>{const word=words[index];count+=back?-1:1;setText(word.slice(0,count));let delay=back?30:65;if(count===0){index=(index+1)%words.length;back=false;delay=300;}else if(count===word.length){back=true;delay=1800;}timer=setTimeout(tick,delay);};
  timer=setTimeout(tick,1800);return()=>clearTimeout(timer);
 },[]);
 return <p className="hero-role"><span className="sr-only">Software Engineer, Java Full Stack Developer, Cloud and AI Enthusiast</span><span aria-hidden="true">{text}<span className="typing-cursor">|</span></span></p>;
}

export default function Effects(){
 const canvas=useRef<HTMLCanvasElement>(null);
 const cursor=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  if(reduced.matches)return;
  const fine=matchMedia('(pointer: fine)').matches;
  const c=canvas.current,ctx=c?.getContext('2d');if(!c||!ctx)return;
  let width=innerWidth,height=innerHeight,frame=0,mouse={x:-1000,y:-1000};
  const ring={x:-1000,y:-1000};
  const dots=Array.from({length:fine?65:30},()=>({x:Math.random()*width,y:Math.random()*height,vx:(Math.random()-.5)*.45,vy:(Math.random()-.5)*.45}));
  const trail=Array.from({length:12},()=>({x:-1000,y:-1000}));
  const resize=()=>{width=innerWidth;height=innerHeight;const dpr=Math.min(devicePixelRatio,2);c.width=width*dpr;c.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);};resize();
  const move=(e:PointerEvent)=>{if(e.pointerType==='touch')return;mouse={x:e.clientX,y:e.clientY};if(cursor.current)cursor.current.style.opacity='1';};
  const leave=()=>{mouse={x:-1000,y:-1000};if(cursor.current)cursor.current.style.opacity='0';};
  const draw=()=>{
   ctx.clearRect(0,0,width,height);
   for(let i=0;i<dots.length;i++){
    const p=dots[i];p.x=(p.x+p.vx+width)%width;p.y=(p.y+p.vy+height)%height;
    ctx.fillStyle='#00d9ff66';ctx.beginPath();ctx.arc(p.x,p.y,1.6,0,Math.PI*2);ctx.fill();
    for(let j=i+1;j<dots.length;j++){const q=dots[j],dist=Math.hypot(p.x-q.x,p.y-q.y);if(dist<135){ctx.strokeStyle=`rgba(0,217,255,${.15*(1-dist/135)})`;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}}
    const distance=Math.hypot(p.x-mouse.x,p.y-mouse.y);if(fine&&distance<170){ctx.strokeStyle=`rgba(0,217,255,${.45*(1-distance/170)})`;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(mouse.x,mouse.y);ctx.stroke();}
   }
   if(fine&&mouse.x>=0){ring.x+=(mouse.x-ring.x)*.18;ring.y+=(mouse.y-ring.y)*.18;if(cursor.current)cursor.current.style.transform=`translate3d(${ring.x}px,${ring.y}px,0)`;let prev=mouse;trail.forEach((p,i)=>{p.x+=(prev.x-p.x)*.35;p.y+=(prev.y-p.y)*.35;ctx.fillStyle=`rgba(0,217,255,${.5*(1-i/trail.length)})`;ctx.beginPath();ctx.arc(p.x,p.y,3*(1-i/trail.length),0,Math.PI*2);ctx.fill();prev=p;});}
   frame=requestAnimationFrame(draw);
  };
  const visibility=()=>{cancelAnimationFrame(frame);if(!document.hidden)draw();};draw();
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');observer.unobserve(e.target);}}),{threshold:.08});
  const reveals=document.querySelectorAll<HTMLElement>('.project,.experience-row,.education article,.skills-grid>div,.section-heading,.about-grid>div,.research');
  reveals.forEach((el,i)=>{if(el.getBoundingClientRect().top>innerHeight){el.classList.add('reveal-ready');el.style.setProperty('--reveal-delay',`${i%3*90}ms`);observer.observe(el);}});
  const cleanups:Array<()=>void>=[];
  if(fine)document.querySelectorAll<HTMLElement>('.project').forEach(card=>{const tilt=(e:PointerEvent)=>{const r=card.getBoundingClientRect();card.style.setProperty('--tilt-x',`${(.5-(e.clientY-r.top)/r.height)*10}deg`);card.style.setProperty('--tilt-y',`${((e.clientX-r.left)/r.width-.5)*10}deg`);};const reset=()=>{card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg');};card.addEventListener('pointermove',tilt);card.addEventListener('pointerleave',reset);cleanups.push(()=>{card.removeEventListener('pointermove',tilt);card.removeEventListener('pointerleave',reset);reset();});});
  const scroll=()=>{document.querySelector('.header')?.classList.toggle('scrolled',scrollY>50);document.querySelector('.floating-top')?.classList.toggle('visible',scrollY>300);};scroll();
  window.addEventListener('resize',resize);window.addEventListener('pointermove',move);document.addEventListener('pointerleave',leave);window.addEventListener('scroll',scroll,{passive:true});document.addEventListener('visibilitychange',visibility);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();reveals.forEach(el=>el.classList.remove('reveal-ready','revealed'));cleanups.forEach(fn=>fn());window.removeEventListener('resize',resize);window.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',leave);window.removeEventListener('scroll',scroll);document.removeEventListener('visibilitychange',visibility);};
 },[]);
 return <><canvas ref={canvas} className="fx-canvas" aria-hidden="true"/><div ref={cursor} className="fx-cursor" aria-hidden="true"/><a className="floating-top" href="#home" aria-label="Back to top">↑</a></>;
}
