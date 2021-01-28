const nav = document.querySelector('#nav');
const navDesktop = document.querySelector("#navDesktop");
const menu = document.querySelector('#menu');
const menuToggle = document.querySelector('.nav__toggle');
const iniciarSesion = document.querySelector("#iniciar-sesion");
const hazteMiembro = document.querySelector("#hazte-miembro");
const buttonsToSendBack = document.querySelectorAll(".sendToBack")
const footer = document.querySelector("#footer")
const lines = document.querySelectorAll("#line")
const titleLogo = document.querySelector(".logo")
const titleLogoDesktop = document.querySelector(".logoDesktop")
const videoHomePage = document.querySelector("source")
const menuItem = document.querySelectorAll("#menu-item")
let isMenuOpen = false;


// TOGGLE MENU ACTIVE STATE
if(menuToggle){
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
}


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
var desktopNav = document.querySelector("#navDesktop");//Menu
window.onscroll = function () { 
    "use strict";
    if(!isMenuOpen || lines.lenght == 0 ){
      
      if (document.body.scrollTop >= 100 || document.documentElement.scrollTop >= 100) {
        
        //Cambio color Nav
          myNav.classList.add("nav-colored");
          myNav.classList.remove("nav-transparent");

          desktopNav.classList.add("nav-colored");//Menu
          desktopNav.classList.remove("nav-transparent");//Menu
  
        //Cambio color hamburguesa
        lines.forEach(line => line.classList.add("menuicon__barBlack"))
        lines.forEach(line => line.classList.remove("menuicon__barWhite"))
  
        //Cambio color TitleLogo
        titleLogo.classList.remove("white-color")
        titleLogo.classList.add("black-color")
        titleLogoDesktop.classList.remove("white-color")//Menu
        titleLogoDesktop.classList.add("black-color")//Menu

        //Cambio color Menu Items Desktop
        menuItem.forEach(item => item.classList.remove("white-color"))
        menuItem.forEach(item => item.classList.add("black-color"))

      } 
      else {
         //Cambio color Nav
          myNav.classList.add("nav-transparent");
          myNav.classList.remove("nav-colored");

          desktopNav.classList.add("nav-transparent");//Menu
          desktopNav.classList.remove("nav-colored");//Menu

  
          //Cambio color hamburguesa
        lines.forEach(line => line.classList.add("menuicon__barWhite"))
        lines.forEach(line => line.classList.remove("menuicon__barBlack"))
        
         //Cambio color TitleLogo
        titleLogo.classList.remove("black-color")
        titleLogo.classList.add("white-color")
        titleLogoDesktop.classList.remove("black-color")//Menu
        titleLogoDesktop.classList.add("white-color")//Menu

        //Cambio color Menu Items Desktop
        menuItem.forEach(item => item.classList.remove("black-color"))
        menuItem.forEach(item => item.classList.add("white-color"))
        
  
      }
    }
    
};


// PROFILE & Ranking Tabs

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

function openTabRanking(evt, name) {
  // Declare all variables
  let i, tabcontent;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  const tenis = document.getElementById("Tenis").style.display="none"
  const paddle = document.getElementById("Paddle").style.display="none"

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(name).style.display = "block";
  evt.currentTarget.className += " active";
}
if(document.getElementById('defaultOpenRanking')){
  document.getElementById('defaultOpenRanking').click()
}

function videoUrl() {
  // Declare all variables
  let i, video;

  // Get all video elements and hide them
  video = document.querySelectorAll("video");
  for (i = 0; i < video.length; i++) {
    video[i].style.display = "none";
  }

  if (!window.matchMedia("(max-width: 700px)").matches) { //When is Desktop

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.querySelector("#videoDesktop").style.display = "block";
  evt.currentTarget.className += " active";

  } else { //When is Mobile

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.querySelector("#videoMobile").style.display = "block";
  evt.currentTarget.className += " active";
  }
}
window.onload = videoUrl





