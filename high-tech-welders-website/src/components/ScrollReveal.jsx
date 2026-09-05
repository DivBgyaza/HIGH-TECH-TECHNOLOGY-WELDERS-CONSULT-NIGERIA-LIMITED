import {useLayoutEffect,useRef} from 'react';

const callbacks=new Map();
let observer;

function getObserver(){
 if(!observer){
  observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
    const updateState=callbacks.get(entry.target);
    if(!updateState)return;
    if(entry.isIntersecting&&entry.intersectionRatio>=.1)updateState('visible');
    else if(!entry.isIntersecting)updateState('pending');
   });
  },{threshold:[0,.1],rootMargin:'0px 0px -5% 0px'});
 }
 return observer;
}

export default function ScrollReveal({direction='up',delay=0,distance,className='',children}){
 const elementRef=useRef(null);

 useLayoutEffect(()=>{
  const element=elementRef.current;
  if(!element||typeof IntersectionObserver==='undefined'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;

  try{
   const sharedObserver=getObserver();
   callbacks.set(element,state=>{element.dataset.revealState=state});
   element.dataset.revealState='pending';
   sharedObserver.observe(element);
  }catch{
   callbacks.delete(element);
   delete element.dataset.revealState;
  }

  return()=>{
   callbacks.delete(element);
   observer?.unobserve(element);
  };
 },[]);

 const style={'--reveal-delay':`${Math.max(0,delay)}ms`};
 if(distance!==undefined)style['--reveal-distance']=`${Math.max(0,distance)}px`;

 return <div ref={elementRef} className={`scroll-reveal reveal-${direction}${className?` ${className}`:''}`} style={style}>{children}</div>;
}
