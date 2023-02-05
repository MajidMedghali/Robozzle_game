import {display} from './display.js' ;
  
//change the puzzle to make the robot go forward 
function forward(puzzle) {
    switch(puzzle.robotDir) {
    case 0:puzzle.robotCol++;
        break;
    case 1:puzzle.robotRow--;
        break;
    case 2:puzzle.robotCol--;
        break;
    case 3:puzzle.robotRow++;
        break;
    }
    return puzzle;
}

//change the puzzle to make the robot turn right 
function right(puzzle) {
    puzzle.robotDir=(puzzle.robotDir+3)%4;
    return puzzle;
}

//change the puzzle to make the robot turn left
function left(puzzle) {
    puzzle.robotDir=(puzzle.robotDir+1)%4;
    return puzzle;
}


//change the puzzle to color the color of the tile
function turnToColor(puzzle,color) {
    let a = [...puzzle.board[puzzle.robotRow]];
    a[puzzle.robotCol] = color;
    puzzle.board[puzzle.robotRow] = a.join('');
}



//return 1 if the predicat in the instruction is valid return 0 else
function predicat(inst,puzzle) {
    switch(inst[1]) {
    case 'RED': return puzzle.board[puzzle.robotRow][puzzle.robotCol] === 'R' || puzzle.board[puzzle.robotRow][puzzle.robotCol] === 'r';
    case 'GREEN': return puzzle.board[puzzle.robotRow][puzzle.robotCol] === 'G' || puzzle.board[puzzle.robotRow][puzzle.robotCol] === 'g';
    case 'BLUE': return puzzle.board[puzzle.robotRow][puzzle.robotCol] ==='B' || puzzle.board[puzzle.robotRow][puzzle.robotCol] === 'b';
    case 'NO_COLOR': return 1;  
    }
    return 1;
}


//return 1 if pc is pointing on a CALL instruction return 0 else
function pc_is_call(pc, prog) {
    let a = prog[pc[0]][pc[1]][0];
    if (a === "CALL_1" || a === "CALL_2" || a === "CALL_3" || a === "CALL_4" || a === "CALL_5") {
        return 1;
    }
    return 0;
}


//return 1 if pc can no longer advance return 0 else
function pc_is_limit(pc, prog) {
    if(pc[1] >= prog[pc[0]].length-1) {
        return 1;
    }
    return 0;
}


//translate the instruction to action and change the puzzle
function action(inst,puzzle){
    switch(inst[0]) {
    case 'MOVE': forward(puzzle);
        break;
    case 'RIGHT': right(puzzle);
        break;
    case 'LEFT': left(puzzle);
        break;
    case 'TURNRED': turnToColor(puzzle,'r');
        break;
    case 'TURNBLUE': turnToColor(puzzle,'b');
        break;
    case 'TURNGREEN': turnToColor(puzzle,'g');
        break;
    default:
        break;
    }
}



//execute an instruction on a puzzle if a predicat is valid
function executeInstOnPuzzle(inst,puzzle){
    if(predicat(inst,puzzle)) {
        action(inst,puzzle);
    }
    return puzzle;
}


//return a new pc in casse the last instruction was a CALL
function newPC(pc, prog) {
    switch(prog[pc[0]][pc[1]][0]) {
    case 'CALL_1': return [0, 0];
    case 'CALL_2': return [1, 0];
    case 'CALL_3': return [2, 0];
    case 'CALL_4': return [3, 0];
    case 'CALL_5': return [4, 0];
    default:
        return [-1,-1];
    }
}



//indicate the end of the game and change the "error" field in the context
function gameOver(C) {
     if (C["puzzle"].board.length <= C["puzzle"].robotRow  || C["puzzle"].robotRow < 0 ||
         C["puzzle"].board[0].length <= C["puzzle"].robotCol || C["puzzle"].robotCol < 0 || (
             C["puzzle"].board.length > C["puzzle"].robotRow && C["puzzle"].board[0].length > C["puzzle"].robotCol && C["puzzle"].board[C["puzzle"].robotRow][C["puzzle"].robotCol] === ' ' )) {
        C["error"] = ' Robot out of Ground';
        return 1;
    }
    if (C["pc"][0] === -1 && C["puzzle"].stars !== 0) {
        C["error"] = ' NO INSTRUCTION LEFT TO EXECUTE  ';
        return 1;
    }
    if (C["num"] === 100) {
        C["error"] = 'you reach the max moves alowed';
        return 1;
    }
    if (C["puzzle"].stars === 0 ) {
        C["error"] = 'you get all the stars';
        return 1;
    }
    return 0;
}

//a new pc of the context 
function step(C) {
    //if the instruction is a call we need to push a new one then return it
    if(pc_is_call(C["pc"],C["prog"]) && predicat(C["prog"][C["pc"][0]][C["pc"][1]],C["puzzle"])) {
        C["pc"]=newPC(C["pc"],C["prog"]);
        C["stack"].push(C["pc"]);
        return C["pc"];
    }
    //if the pc can no longer advance remove it and return a new one 
    else if(pc_is_limit(C["pc"],C["prog"])) {
        C["stack"].pop();
        if(C["stack"].length === 0) return [-1,-1];

        else {
            if(!pc_is_limit(C["stack"][C["stack"].length -1],C["prog"])) {
                C["stack"][C["stack"].length -1][1]++;
                return C["stack"][C["stack"].length -1];
            }
            else
		return step(C);
        }
    }
    //increment the pc to point on the next instruction
    else {
        C["pc"][1]++;
        return C["pc"];
    }
    
    
}


//change the puzzle and remove the star
function removeStar(C) {
    if(( !gameOver(C) && (  C["puzzle"].board[C["puzzle"].robotRow][C["puzzle"].robotCol] === 'G' || C["puzzle"].board[C["puzzle"].robotRow][C["puzzle"].robotCol] === 'B' || C["puzzle"].board[C["puzzle"].robotRow][C["puzzle"].robotCol] === 'R'))) {
        let a = [...C["puzzle"].board[C["puzzle"].robotRow]];
        switch (C["puzzle"].board[C["puzzle"].robotRow][C["puzzle"].robotCol]) {
        case 'B': a[C["puzzle"].robotCol] = 'b';break;
        case 'G': a[C["puzzle"].robotCol] = 'g';break;
        case 'R': a[C["puzzle"].robotCol] = 'r';break;
        }
        C["puzzle"].board[C["puzzle"].robotRow] = a.join('');
        C["puzzle"].stars--;
    }
}

//execute a the instruction pointed by pc remove star if necessary then update the pc 
function executeProgOnPuzzle(C) {
    executeInstOnPuzzle(C["prog"][C["pc"][0]][C["pc"][1]],C["puzzle"]);
    removeStar(C);
    C["pc"] = step(C);
}


//execute program on the puzzle to move the robot and display it with different choices
function moveRobot(C,displayFunc) {
    executeProgOnPuzzle(C);
    displayFunc(C);
    return C;
}

//display the puzzle in mode terminal
function term(C) {
    display(C["puzzle"]);
    C["num"] ++;
    
    if (C["puzzle"].stars === 0) {
        console.log(' YOU WIN');
    }

    else if(gameOver(C)) {
        console.log(C["error"]);
        console.log(' YOU LOSE');
    }
}

function initialize(puzzle,prog) {
    let context = {"puzzle":puzzle,"prog":prog,"stack":[[0,0]],"pc":[0,0],"num":0, "error":'NONE'};
    context["stack"][0] = context["pc"];
    return context;
}
export {step, executeProgOnPuzzle, removeStar, gameOver, moveRobot, term, forward, right, left, predicat, pc_is_call, pc_is_limit, action, executeInstOnPuzzle, newPC, turnToColor, initialize};
