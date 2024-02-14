let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let body = document.querySelector("body");

let turnO = true;
let winnerFound = false;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText = "O";
        }
        else{
            box.innerText = "X";
        }
        turnO = !(turnO);
        box.disabled = true;

        checkWinner();
    })
})


const disableBoxes = () => {
    for (let box of boxes){
        box.disabled = true;       
    }
}

const enableBoxes = () => {
    for (let box of boxes){
        console.log("enabling");
        box.disabled = false;
        box.innerText = "";
    }
    // for (let index in boxes){
    //     console.log("enabling");
    //     boxes[index].disabled = false; 
    //     boxes[index].innerText = ""; 
    // }
}
const resetGame = () =>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    body.style.backgroundImage = "none";
}

const showWinner = (winner) =>{
    msg.innerText = "Winner is "+winner;
    msgContainer.classList.remove("hide"); 
    body.style.backgroundImage = "url(./assets/congo2.gif)";
    disableBoxes();

    let allFull = true;
    for (let box of boxes){
        if(!box.disabled){
            allFull = false;
        }  
    }
    if(allFull && !winnerFound){
        msg.innerText = "It's a tie.";
    }
    else{
        msg.innerText = "Winner is "+winner;
        body.style.backgroundImage = "url(./assets/congo2.gif)";
    }
    msgContainer.classList.remove("hide");     
    disableBoxes();
}


const checkWinner = ()=>{
    for(pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner is", pos1Val);
                winnerFound = true;
                showWinner(pos1Val);                
            }
            else{
                let allFull = true;
                for (let box of boxes){
                    if(!box.disabled){
                        allFull = false;
                    }  
                }
                if(allFull && !winnerFound){
                    msg.innerText = "It's a tie.";
                    msgContainer.classList.remove("hide");    
                }
            }
        }
    }

    // let allFull = true;
    // for (let box of boxes){
    //     if(!box.disabled){
    //         allFull = false;
    //     }  
    // }
    // if(allFull && !winnerFound){
    //     msg.innerText = "It's a tie.";
    //     msgContainer.classList.remove("hide");     
    // }
    
}

// newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);


