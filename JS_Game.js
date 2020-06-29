const CHICAGO = {
  chinatown: "Chinatown",
  garfield: "Garfield Park Conservatory",
  pilsen: "Pilsen",
  river: "Chicago River",
  wicker: "Wicker Park",
  point: "Promontory Point",
  el: "The El",
  bahai: "The Bahai Temple",
  bean: "The Bean"
}


function generateBoard(options) {
  return shuffle(options.concat(options));
}

class Card {
  constructor(element) {
    this.element = element;
  }

  getId() {
    return this.element.getAttribute("id");
  }

  getOption() {
    return this.element.getAttribute("option");
  }
}

class GameState {
  constructor(options) {
    this.points =50;
    this.board = generateBoard(options);
    this.card1 = undefined;
    this.card2 = undefined;
    this.matched = []
  }
}

const STATE = new GameState(Object.keys(CHICAGO));
console.log(STATE);

function addClassNamestoCards(className, board) {
  const cards = document.getElementsByClassName(className);
  for (let idx = 0; idx < cards.length; idx++) {
    const card= cards[idx]
    cards[idx].classList.add(board[idx]);
    cards[idx].setAttribute("option", board[idx]);
    let backface = card.getElementsByClassName("back-face")[0]
    let header =  document.createElement("h3")
    header.innerHTML = CHICAGO[board[idx]]
    backface.append(header)
    

    cards[idx].setAttribute("id", `card-${idx}`);
  }
}

addClassNamestoCards("box", STATE.board);

const deck = document.querySelectorAll(".box");

const FLIP_CLASS = "flip";

function reflipCards() {
  const { card1, card2 } = STATE;

  if (card1 === undefined || card2 === undefined) {
    throw new Error("cards cannot be reflipped while unset");
  }

  
  STATE.card1 = undefined;
  STATE.card2 = undefined;

  function removeFlipFromCard2() {
    card1.element.classList.remove(FLIP_CLASS);
    card2.element.classList.remove(FLIP_CLASS)
}
setTimeout(removeFlipFromCard2,500)

}


function flipCard(event) {
    
  const newCard = new Card(this);
 

  if (STATE.card1 === undefined) {
    STATE.card1 = newCard;
    console.log(STATE.card1)
    console.log(STATE.card2)
  } else if (STATE.card1 !== undefined && STATE.card1.getId() === newCard.getId()) {
    return;
  } else if (STATE.card2 === undefined) {
    STATE.card2 = newCard;
    console.log(STATE.card1)
    console.log(STATE.card2)
  }

 
  const matchResult = getMatchResult(STATE.card1, STATE.card2);
  this.classList.toggle("flip")
  if (matchResult == MAtCH_RESULt.UNSEt) {
    //Nothing to do, continue clicking!
  } else if (matchResult == MAtCH_RESULt.MAtch) {
    alert("You got a match!");
    STATE.matched.push(STATE.card1.element)
    STATE.card1.element.classList.add("has-match");
    STATE.card2.element.classList.add("has-match");
    STATE.card1 = undefined;
    STATE.card2 = undefined;
  } else if (matchResult == MAtCH_RESULt.NO_MAtch) {
    reflipCards(newCard);
  } else {
    throw new Error("Unreachable state!");
  }

    checkIfAllFlipped()
    STATE.points-=1
  
}

deck.forEach((card) => card.addEventListener("click", flipCard));

const MAtCH_RESULt = {
  UNSEt: 1,
  MAtch: 2,
  NO_MAtch: 3,
};
function getMatchResult(card1, card2) {
  if (card1 === undefined || card2 === undefined) {
    return MAtCH_RESULt.UNSEt;
  }

  return card1.getOption() === card2.getOption()
    ? MAtCH_RESULt.MAtch
    : MAtCH_RESULt.NO_MAtch;
}

function checkIfAllFlipped(){
    if (STATE.matched.length==1){
        var span = document.getElementsByClassName("close")[0];
        score = document.createElement("h1")
        score.innerHTML = `You Won! Your Score is ${STATE.points}!`
        playagain = document.createElement("h1")
        playagain.innerHTML = `Click anywhere to play again!`
        span.append(score, playagain)
  
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
      
        
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
            location.reload()
          }
        }
      
    }
}


// When the user clicks on <span> (x), close the modal



