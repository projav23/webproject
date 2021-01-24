const nav = document.querySelector('#nav');
const menu = document.querySelector('#menu');
const menuToggle = document.querySelector('.nav__toggle');
const iniciarSesion = document.querySelector("#iniciar-sesion");
const hazteMiembro = document.querySelector("#hazte-miembro");
const buttonsToSendBack = document.querySelectorAll(".sendToBack")
const footer = document.querySelector("#footer")
const lines = document.querySelectorAll("#line")
const titleLogo = document.querySelector(".logo")
let isMenuOpen = false;


// TOGGLE MENU ACTIVE STATE
menuToggle.addEventListener('click', e => {
e.preventDefault();
isMenuOpen = !isMenuOpen;

menuToggle.setAttribute('aria-expanded', String(isMenuOpen));
menu.hidden = !isMenuOpen;
nav.classList.toggle('nav--open');

//Cambio color hamburguesa
lines.forEach(line => {
  if(line.classList.value != "menuicon__bar menuicon__barBlack"){line.classList.toggle("menuicon__barBlack")}
})
  


//Cuando abre el menú envio los btn detrás
buttonsToSendBack.forEach(btn => btn.classList.toggle("sendToBack-1"))

//Envio también el footer
footer.classList.toggle("sendToBack-1")
});

if(iniciarSesion){
  iniciarSesion.addEventListener('click', e => {
    //e.preventDefault();
    nav.classList.toggle('nav--open');
    });
  
    hazteMiembro.addEventListener('click', e => {
      //e.preventDefault();
      nav.classList.toggle('nav--open');
      });
}

// TRAP TAB INSIDE NAV WHEN OPEN
nav.addEventListener('keydown', e => {
  // abort if menu isn't open or modifier keys are pressed
if (!isMenuOpen || e.ctrlKey || e.metaKey || e.altKey) {
    return;
}

  // listen for tab press and move focus
  // if we're on either end of the navigation
const menuLinks = menu.querySelectorAll('.nav__link');
if (e.keyCode === 9) {
    if (e.shiftKey) {
        if (document.activeElement === menuLinks[0]) {
        menuToggle.focus();
        e.preventDefault();
        }
    } else if (document.activeElement === menuToggle) {
        menuLinks[0].focus();
        e.preventDefault();
    }
}
});

//Toggle Color Menu con Scroll --------------------------

var myNav = document.getElementById('nav');
window.onscroll = function () { 
    "use strict";
     if(!isMenuOpen){
      if (document.body.scrollTop >= 100 || document.documentElement.scrollTop >= 100) {

        //Cambio color Nav
          myNav.classList.add("nav-colored");
          myNav.classList.remove("nav-transparent");
  
        //Cambio color hamburguesa
        lines.forEach(line => line.classList.add("menuicon__barBlack"))
        lines.forEach(line => line.classList.remove("menuicon__barWhite"))
  
        //Cambio color TitleLogo
        titleLogo.classList.remove("white-color")
        titleLogo.classList.add("black-color")
      } 
      else {
         //Cambio color Nav
          myNav.classList.add("nav-transparent");
          myNav.classList.remove("nav-colored");
  
          //Cambio color hamburguesa
        lines.forEach(line => line.classList.add("menuicon__barWhite"))
        lines.forEach(line => line.classList.remove("menuicon__barBlack"))
        
         //Cambio color TitleLogo
        titleLogo.classList.remove("black-color")
        titleLogo.classList.add("white-color")
  
      }
    }
    
};


// PROFILE

function openTab(evt, name) {
  // Declare all variables
  let i, tabcontent;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  const perf = document.getElementById('Perfil').style.display = "none";
  const solici =document.getElementById('Solicitudes').style.display = "none";
  const stats = document.getElementById('Estadisticas').style.display = "none";
  const contact = document.getElementById('Contact').style.display = "none";

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(name).style.display = "block";
  evt.currentTarget.className += " active";
}



