const nav = document.querySelector('#nav');
const menu = document.querySelector('#menu');
const menuToggle = document.querySelector('.nav__toggle');
const iniciarSesion = document.querySelector("#iniciar-sesion");
const hazteMiembro = document.querySelector("#hazte-miembro");
const buttonsToSendBack = document.querySelectorAll(".sendToBack")
const footer = document.querySelector("#footer")
let isMenuOpen = false;


// TOGGLE MENU ACTIVE STATE
menuToggle.addEventListener('click', e => {
e.preventDefault();
isMenuOpen = !isMenuOpen;

menuToggle.setAttribute('aria-expanded', String(isMenuOpen));
menu.hidden = !isMenuOpen;
nav.classList.toggle('nav--open');
//Cuando abre el menú envio los btn detrás
buttonsToSendBack.forEach(btn => btn.classList.toggle("sendToBack-1"))
//Envio también el footer
footer.classList.toggle("sendToBack-1")
});

if(iniciarSesion){
  iniciarSesion.addEventListener('click', e => {
    e.preventDefault();
    nav.classList.toggle('nav--open');
    });
  
    hazteMiembro.addEventListener('click', e => {
      e.preventDefault();
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

//Toggle Color Menu --------------------------

var myNav = document.getElementById('nav');
window.onscroll = function () { 
    "use strict";
    if (document.body.scrollTop >= 200 || document.documentElement.scrollTop >= 200 ) {
        myNav.classList.add("nav-colored");
        myNav.classList.remove("nav-transparent");
    } 
    else {
        myNav.classList.add("nav-transparent");
        myNav.classList.remove("nav-colored");
    }
};
