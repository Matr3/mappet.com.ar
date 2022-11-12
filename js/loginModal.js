/* THINGS TO THINK ABOUT*/
/* 
1. Grab the button element and set it to a variable to that I can do things with it
2. Add an event listener to the button element and set it to "click". This tells javascript, "Hey, when I CLICK this button"... 
3. Write a function for the event listener so that when the button is clicked, it performs an action that you want. So the next thing you tell the event listener is, "Hey, when I click this button, do the thing inside the function"
*/

// 1.
const btnOpenEl = document.querySelector(".btn-modal-open");
const btnCloseEl = document.querySelector(".btn-modal-close");
const modal = document.getElementById("overlay");

//2.                                The function!
btnOpenEl.addEventListener("click", openModal);
//                                   Another One!
btnCloseEl.addEventListener("click", closeModal)

//3.
/* For the modal i'm going to be setting two different event listeners on two different buttons. The functions provided will open the modal and close the modal*/
function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}