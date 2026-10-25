import React,{useEffect,useState} from 'react';
import Navbar from "./components/Navbar";
import Page0 from "./pages/Page0";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page4 from "./pages/Page4";
import Page5 from "./pages/Page5";
import Page6 from "./pages/Page6";
import Page7 from "./pages/Page7";
import Page8 from "./pages/Page8";
import Page9 from "./pages/Page9";
import Page10 from "./pages/Page10";
import Page11 from "./pages/Page11";
import Page12 from "./pages/Page12";

const routes={
  "/contacto": Page0,
  "/": Page1,
  "/nosotros": Page2,
  "/rf01-disponibilidad": Page3,
  "/rf02-registrar-reserva": Page4,
  "/rf03-estado-de-reserva": Page5,
  "/rf04-servicios-adicionales": Page6,
  "/rf05-cancelar-reserva": Page7,
  "/rf06-gestionar-reservas": Page8,
  "/rf07-check-in": Page9,
  "/rf08-gestionar-limpieza": Page10,
  "/rf09-check-out-y-cobro": Page11,
  "/rf10-reportes": Page12,
};
export default function App(){
 const [path,setPath]=useState(window.location.pathname);
 useEffect(()=>{
  function pop(){setPath(window.location.pathname)}
  window.addEventListener('popstate',pop);
  function navigate(e){
   const link=e.target.closest('a[href]');
   if(!link || e.defaultPrevented || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || link.target==='_blank')return;
   const url=new URL(link.href,window.location.href);
   if(url.origin!==window.location.origin || !Object.prototype.hasOwnProperty.call(routes,url.pathname))return;
   e.preventDefault();
   if(url.pathname!==window.location.pathname){window.history.pushState({},'',url.pathname);setPath(url.pathname);window.scrollTo(0,0)}
  }
  document.addEventListener('click',navigate);
  return()=>{window.removeEventListener('popstate',pop);document.removeEventListener('click',navigate)};
 },[]);
 const Page=routes[path] || routes['/'];
 return (
  <>
    <Navbar />
    <Page key={path} />
  </>
);
}
