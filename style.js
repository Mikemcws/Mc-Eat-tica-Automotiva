/* =========================
FILE: script.js
========================= */

const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
});

/* HEADER SCROLL EFFECT */

window.addEventListener("scroll", () => {

  const header = document.querySelector(".header");

  if(window.scrollY > 50){
    header.style.background = "#000";
  } else{
    header.style.background = "rgba(0,0,0,0.4)";
  }

});

/* SIMPLE REVEAL ANIMATION */

const revealElements = document.querySelectorAll(
  ".service-card, .gallery-item, .about-content, .about-image"
);

function revealOnScroll(){

  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach((element)=>{

    const elementTop = element.getBoundingClientRect().top;

    if(elementTop < triggerBottom){
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }

  });

}

revealElements.forEach((element)=>{
  element.style.opacity = "0";
  element.style.transform = "translateY(50px)";
  element.style.transition = "all 0.8s ease";
});

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();