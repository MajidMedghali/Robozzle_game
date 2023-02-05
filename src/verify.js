// if board is good return 1 else return 0;
function verifyPuzzle(C) {
    if(C["puzzle"].id <= 0 || C["puzzle"].robotCol < 0 || C["puzzle"].robotCol >= 16 || C["puzzle"].robotRow < 0 || C["puzzle"].robotRow >= 12 || C["puzzle"].robotDir > 4 || C["puzzle"].robotDir < 0  ) {/// verify id and robot placement
        C["error"] = "verify that the id of the puzzle is positve and the robot placement";
        return 0;
    }
    if(C["puzzle"].board[C["puzzle"].robotRow][C["puzzle"].robotCol] === ' ' || C["puzzle"].subs[0] <= 0 || C["puzzle"].stars < 1){// verify programme and number of stars
        C["error"] = "verify the number of stars (must be more than 0) and th robot is on the puzzle"; 
        return 0;
    }
    if( C["puzzle"].subs.length !== 5) {//verify board lenghts and number of functions
        C["error"] = "verify board lenght and number of functions";
        return 0;
    }
    for(let i = 0 ;i < 12;i++) {
        if(C["puzzle"].board[i].length !== 16 || C["puzzle"].board.length !== 12) {
            C["error"] = "verify the dimentions of th board must be 12-16";
            return 0;
        }
    }
    return 1;
    
}

// table of colors and Movements that are allowed in the instructions 
let Color = ['RED', 'GREEN', 'BLUE', 'NO_COLOR' ];
let Movements = ['LEFT','RIGHT', 'MOVE', 'CALL_1', 'CALL_2', 'CALL_3', 'CALL_4', 'CALL_5', 'TURNRED', 'TURNBLUE', 'TURNGREEN'];

//return the instruction's color 
function instructionColor(ins) {
    return ins[1];
}
//return the instruction's Movement
function instructionMovement(ins) {
    return ins[0];
}

//if the instruction is good return true else return false
function verifyInstruction(C, ins) {
    if(!Array.isArray(ins)){
        C["error"] = 'Invalid instructions in function should be an array';
        return 0;
    }
    if(ins.length !== 2){
        C["error"] = 'excess elements in instructions';
        return 0;
    }
    if (Color.indexOf(instructionColor(ins)) === -1) {
        C["error"] = 'The instruction color is UNDEFINE';
        return 0;
    }

    if(Movements.indexOf(instructionMovement(ins)) === -1) {
        C["error"] = 'The instruction move is UNDEFINE';
        return 0;
    }
    return true;
}


//if the program is good return true else return false
function verifyProgram(C) {
    if(!Array.isArray(C["prog"])){
        C["error"] = 'Invalid program should be an array';
        console.log(C["error"]);
        return 0;
    }
    let n = C["puzzle"].subs.indexOf(0);
    if (C["prog"].length > n){
        C["error"] = 'excess functions in program';
        return 0;
    }

    //if the program's function is good return true else false
    function verifyProgramFunc(C, i) {
        if(!Array.isArray(C["prog"][i])){
            C["error"] = 'Invalid function in program should be an array';
            return 0;
        }
        let m = C["prog"][i].length;
        if( m > C["puzzle"].subs[i]){
            C["error"] = 'excess instructions in functions';
            return 0;
        }
        let s=true;
        //on verifie si les instructions du programme sont valides
        C["prog"][i].forEach((x)=>{
            if(!verifyInstruction(C,x))
            {s=false;}});
        return s;
    }
    
    
//    let a = C["prog"].length;
    //on verifie si les fonctions du programme sont valides
    let s=true;
    C["prog"].forEach((x,i)=>{if(!verifyProgramFunc(C, i)){ s=false ; console.log(C["error"]);}});
    return s;
}

export {verifyProgram, verifyPuzzle,verifyInstruction};

