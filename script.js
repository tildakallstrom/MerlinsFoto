'use strict';

// gör att menyikonen ändras till ett kryss
function hamburgermenu(m) {
  m.classList.toggle("change");
}

// variabler för navbar/hamburgarmeny
let navbar = document.querySelector(".navbar")
 let ham = document.querySelector(".ham")
 
 // funktion för att klicka i och klicka ur meny
 function toggleHamburger(){
   // öppna
   navbar.classList.toggle("showNav")
   // stäng
   ham.classList.toggle("showClose")
 }
 // eventlyssnare till click
 ham.addEventListener("click", toggleHamburger)


 // Sätter mobilmeny sticky vid scroll
 let mobilemenu = document.querySelector('.mobile')
let mobilemenuPosition = mobilemenu.getBoundingClientRect().top;
window.addEventListener('scroll', function() {
    if (window.pageYOffset >= mobilemenuPosition) {
        mobilemenu.style.position = 'fixed';
        mobilemenu.style.top = '-95px';
       
    } else {
        mobilemenu.style.position = 'absolute';
        mobilemenu.style.top = '';
    }
});










 