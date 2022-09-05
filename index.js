const boxes=document.querySelectorAll(".box");
const PLAYER_X="X";
const PLAYER_O="O";
let turn =PLAYER_X;

const boardState = Array(boxes.length);
boardState.fill(null);

//Elements 

const strike=document.getElementById("strike");
const gameOverArea=document.getElementById("game-over-area");
const gameOverText=document.getElementById("game-over-text");
const playAgain=document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);

//Sounds
const gameOverSound=new Audio("sounds/sound_game_over.wav");
const clickSound=new Audio("sounds/sound_tap.wav");

boxes.forEach((box)=>box.addEventListener("click",boxClick));

function setHoverText(){
    //remove all hover text
    boxes.forEach((box) =>{
        box.classList.remove("x-hover");
        box.classList.remove("o-hover");
    }); 

    const hoverClass=`${turn.toLowerCase()}-hover`;

    boxes.forEach((box)=>{
        if(box.innerText ==""){
            box.classList.add(hoverClass);
        }
    });
}
setHoverText;

function boxClick(event){
    if(gameOverArea.classList.contains("visible")){
        return;
    }

    const box = event.target;
    const boxNumber=box.dataset.index;
    if(box.innerText !=""){
        return;
    }

    if(turn === PLAYER_X){
        box.innerText=PLAYER_X;
        boardState[boxNumber-1]=PLAYER_X;
        turn=PLAYER_O;
    }
    else{
        box.innerText=PLAYER_O;
        boardState[boxNumber-1]=PLAYER_O;
        turn=PLAYER_X;
    }

    clickSound.play();
    setHoverText();
    checkWinner();
} 
function checkWinner(){
    //Check Winner
    for(const winningCombination of winningCombinations){
        //Object Destructing
        const {combo,strikeClass}=winningCombination;
        const boxValue1=boardState[combo[0]-1];
        const boxValue2=boardState[combo[1]-1];
        const boxValue3=boardState[combo[2]-1];

        if(
            boxValue1 != null && 
            boxValue1 === boxValue2 && 
            boxValue1===boxValue3
        )
            {
            strike.classList.add(strikeClass); 
            gameOverScreen(boxValue1); 
            return;           
        }
    }

    //Check for a draw
    const allBoxFilledIn=boardState.every((box)=>box!==null);
    if (allBoxFilledIn){
        gameOverScreen(null);
    }
}

function gameOverScreen(winnerText) {
    let text = "Draw!";
    if (winnerText != null) {
      text = `Winner is ${winnerText}!`;
    }
    gameOverArea.className = "visible";
    gameOverText.innerText = text;
    gameOverSound.play();
  }

function startNewGame(){
    strike.className="strike";
    gameOverArea.className="hidden";
    boardState.fill(null);
    boxes.forEach((box)=> (box.innerText=""));
    turn = PLAYER_X;
    setHoverText();
}


const winningCombinations= [
    //rows
    {combo:[1,2,3], strikeClass:"strike-row-1"},
    {combo:[4,5,6], strikeClass:"strike-row-2"},
    {combo:[7,8,9], strikeClass:"strike-row-3"},
    //columns
    {combo:[1,4,7], strikeClass:"strike-column-1"},
    {combo:[2,5,8], strikeClass:"strike-column-2"},
    {combo:[3,6,9], strikeClass:"strike-column-3"},
    //diagonals
    {combo:[1,5,9], strikeClass:"strike-diagonal-1"},
    {combo:[3,5,7], strikeClass:"strike-diagonal-2"}
];
