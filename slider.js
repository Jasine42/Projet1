
document.querySelector('[data-action="destroy"]').addEventListener('click', function(){
  document.querySelector('body').classList.add('cross');
  document.addEventListener('click', function(el){
    el.target.outerHTML = "";
  });
  setInterval(spawnJCVD, 1000);

});
// Select the div via its id and store the selected element
// inside gameContainer var.
let gameContainer = document.querySelector('#game-container');
let turnCounter = 0;

let buttonReset = document.querySelector('#batata');
let childDivs = document.querySelectorAll('#game-container>div');
function incrementTurnCounter(selector) {
  turnCounter ++;
  selector.innerHTML = turnCounter;
}
function Restart(div) {
  let green = "green-color";
  let red = "red-color";
  if(div.classList.contains(red)){
    div.classList.remove(red);
    div.classList.add(green);
  }
};
function invertColor(div){
let green ="green-color"
 let red ="red-color"
 if (div.classList.contains(green)) {
   div.classList.remove(green);
   div.classList.add(red);
 } else {
   div.classList.remove(red);
   div.classList.add(green);
   };
 };
  function checkVictory(divs) {
   let victorystate = true;
   for(let i = 0; i < divs.length; i++) {
     if(divs[i].classList.contains('green-color')) {
       victorystate = false;
       break;
     }
   }

   if(victorystate == true){
     setTimeout(function(checkVictory){
       alert('vous avez gagné');

     }, 2000);
   }

 //si toute les div sont rouge ,on a gagné
 //si aucune div son vert,on a gagné

 //doit permetre d inverser la couleur de la div désignée.

};


// When someone clicks on anything inside the game container, it triggers
// the anonymous function
gameContainer.addEventListener('click', function(el) {


 // We get the target of the click event, which is the specific div and not
 // the container div
 let clickedElement = el.target;

 for(let i = 0; i < childDivs.length; i++)
 {

   // childDivs[i] allow us to display every value of the childDivs array
   // because we select it via the array key [i]
   if (childDivs[i] == clickedElement) {


     if(i > 0 && i < (childDivs.length - 1)) {
       invertColor(childDivs [i + 1]);
       invertColor(childDivs [i - 1]);
       // On va inverser la couleur de la div de gauche et de la div de droite
   } else if(i == 0) {
     invertColor(childDivs[i + 1]);
       // On va inverser la couleur de la div de droite
     } else if(i == (childDivs.length - 1)) {
       invertColor(childDivs[i - 1]);
       // On va inverser la couleur de la div de gauche
     }
   }

 }



});


incrementTurnCounter(document.querySelector('[data-use="turnCounter"]'));
checkVictory(childDivs);

 batata.addEventListener('click', function(){
    for(let i = 0; i < childDivs.length; i++){
        Restart(childDivs[i]);

    }
  });
