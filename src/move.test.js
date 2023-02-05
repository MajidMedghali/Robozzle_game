import {forward, moveRobot, term} from './game.js' ;
import {right} from './game.js' ;
import {left} from './game.js' ;
import {predicat} from './game.js' ;
import {pc_is_call} from './game.js' ;
import {pc_is_limit} from './game.js' ;
import {action} from './game.js' ;
import {executeInstOnPuzzle} from './game.js' ;
import {newPC} from './game.js' ;
import {puzzleTab} from './puzzles.js' ;
import {display} from './display.js' ;
import {turnToColor} from './game.js' ;
import {gameOver} from './game.js' ;
import {removeStar} from './game.js';
import {executeProgOnPuzzle} from './game.js';
import {step} from './game.js';
import {verifyInstruction,verifyProgram, verifyPuzzle} from './verify.js';
//import { display } from './display.js';

let solTab=[
{
    id:1,
    sol:[[['MOVE','NO_COLOR'],['RIGHT','RED'],['CALL_1','NO_COLOR']]],
},
{
    id:2,
     sol:[[['MOVE','NO_COLOR'],['RIGHT','RED'],['LEFT','GREEN'],['CALL_1','NO_COLOR']]],
},
{ id:3,
  sol:[[['MOVE','NO_COLOR'],['RIGHT','RED'],['CALL_1','NO_COLOR']]],
},
{
    id:4,
    sol:[[['MOVE','NO_COLOR'],['LEFT','RED'],['LEFT','RED'],['CALL_1','NO_COLOR']]],
},
    {
    id:330,
        sol:[    [  ['CALL_2','NO_COLOR'],['RIGHT','NO_COLOR'] , ['MOVE','NO_COLOR']     ],  [     ['MOVE','NO_COLOR'],['RIGHT','RED'],['CALL_2','BLUE'],['MOVE','NO_COLOR']      ]       ],
},
    {id:644,
        sol:[    [['MOVE','NO_COLOR'],['LEFT','GREEN'],['CALL_2','RED'],['CALL_1','NO_COLOR']]   ,[['RIGHT','RED'],['RIGHT','GREEN'],['MOVE','NO_COLOR'],['CALL_2','NO_COLOR']]    ]
    }
];

let puzzle_test={
    id:1,
    title:"puzzle1",
    stars:1,
    about:"",
    robotCol:3,
    robotRow:1,
    robotDir:0,
    subs:[3,0,0,0,0],
    
    board:['               ',
           '   bbbbbbbbr   ',
           '           b   ',
           '           b    ',
           '           B    ',
           '                ',
           '                ',
           '                ',
           '                ',
           '                ',
           '                ',
           '                ']
    
};




describe('tests des fonctions de game.js', () => {
   
    test('test de forward', () => {
        let puzzle=JSON.parse(JSON.stringify(puzzleTab[0]));
         puzzle = forward(puzzle);
        expect(puzzle.robotCol).toBe(4);
        puzzle.robotCol=11;
        puzzle.robotRow=2;
        puzzle.robotDir=1;
        expect(forward(puzzle).robotRow).toBe(1);
        
        puzzle.robotDir=2;
        expect(forward(puzzle).robotCol).toBe(10);
        puzzle.robotCol=11;
        puzzle.robotRow=3;
        puzzle.robotDir=3;
        expect(forward(puzzle).robotRow).toBe(4);
        puzzle.robotDir=4;
        expect(forward(puzzle).robotRow).toBe(4);
        

        
    });
    
   
    test('test de right', () => {
        let puzzle_copie= JSON.parse(JSON.stringify(puzzleTab[0]));
        let puzzle = right(puzzle_copie);
        expect(puzzle.robotDir).toBe(3);
    });

        test('test de Direction 1', () => {
                let puzzle_copie= JSON.parse(JSON.stringify(puzzleTab[0]));
                        let puzzle = left(puzzle_copie);
                        //console.log(puzzle2.robotDir);
                        expect(puzzle.robotDir).toBe(1);
                        });
                        
    test('test de left et Direction 2', () => {
        let puzzle_copie= JSON.parse(JSON.stringify(puzzleTab[0]));
       let puzzle = left(puzzle_copie);
                let puzzle2 = left(puzzle);
        //      console.log(puzzle2.robotDir);
        expect(puzzle2.robotDir).toBe(2);
                });
    test('test de predicat', () =>{
        let puzzle_copie= JSON.parse(JSON.stringify(puzzleTab[0]));
        let puzzle_copie2= JSON.parse(JSON.stringify(puzzleTab[3]));
        let ins=['LEFT', 'R'];
        let ins1=['MOVE','RED'];
        let inst2=['RIGHT','GREEN'];
        let inst3=['MOVE','NO_COLOR'];
        let a=predicat(ins1,puzzle_copie);
        expect(a).toBe(false);
        expect(predicat(inst3,puzzle_copie)).toBe(1);
        expect(predicat(ins,puzzle_copie2)).toBe(1);
        expect(predicat(inst2,puzzle_copie)).toBe(false);
    });
    
    test('test de pc_is_call', ()=>{
        let pc=[0,0];
        let pc_call=[0,2];      
        expect(pc_is_call(pc,solTab[0].sol)).toBe(0);
        expect(pc_is_call(pc_call, solTab[0].sol)).toBe(1);
    });
    test('test de pc_is_limit', ()=>{
        let pc=[0,0];
        let pc_limit=[0,3];     
        expect(pc_is_limit(pc,solTab[0].sol)).toBe(0);
        expect(pc_is_limit(pc_limit,solTab[0].sol)).toBe(1);
    });
    test('test de action', ()=>{
        let puzzle_copie= JSON.parse(JSON.stringify(puzzleTab[0]));
        let puzzle_copie2= JSON.parse(JSON.stringify(puzzleTab[1]));
        let inst=['RIGHT','RED'];
        let inst2=['MOVE','BLUE'];
        let inst3=['LEFT','BLUE'];
        let inst4=['TURNRED','GREEN'];
        let inst5=['TURNBLUE','BLUE'];
        let inst6=['TURNRED','RED'];
        let inst7=['TURNBLACK','GREEN'];
        let inst8=['TURNGREEN','GREEN'];

        action(inst6,puzzle_copie2);
        action(inst,puzzle_copie);
        action(inst2,puzzle_copie2);
        action(inst5,puzzle_copie2);
        expect(puzzle_copie2.robotDir).toBe(0);
        action(inst3,puzzle_copie2);
        action(inst4,puzzle_copie2);
        action(inst8,puzzle_copie2);
        action(inst7,puzzle_copie2);
        expect(puzzle_copie2.robotDir).toBe(1);
        expect(puzzle_copie.robotDir).toBe(3);
    });
    
    test('test de executeInstOnPuzzle', ()=>{
        let puzzle_copie= JSON.parse(JSON.stringify(puzzleTab[0]));
        let puzzle=executeInstOnPuzzle(['LEFT', 'NO_COLOR'],
                                            puzzle_copie);
        expect(puzzle.robotDir).toBe(1);
    });
    test('test de newPC', ()=>{
        expect(newPC([0,2], solTab[0].sol)).toStrictEqual([0,0]);
        let prog=[[["CALL_2","NO_COLOR"]],[["MOVE","NO_COLOR"]]];
        expect(newPC([0,0],prog)).toStrictEqual([1,0]);
     let prog1=[[["CALL_3","NO_COLOR"]],[["MOVE","NO_COLOR"]],[["MOVE","NO_COLOR"]]];
        expect(newPC([0,0],prog1)).toStrictEqual([2,0]);
    });
    test('test de turnToColor', ()=>{
        let puzzle_copie= JSON.parse(JSON.stringify(puzzleTab[0]));
        turnToColor(puzzle_copie, 'b');
        expect(puzzle_copie.board[puzzle_copie.robotRow][puzzle_copie.robotCol]).toBe('b');
    });
    test('test de gameOver', ()=>{
        let puzzle=puzzleTab[0];
        
        let context = {"puzzle":puzzle,"stack":[[0,0]],"pc":[-1,0],"num":0};    
        let context1 = {"puzzle":puzzle,"stack":[[0,0]],"pc":[0,0],"num":0};
        let a=gameOver(context);
        let a1=gameOver(context1);
        expect(a).toBe(1);      
        expect(a1).toBe(0);
    });
    
    test(' test de removeStar', ()=>{
                let puzzle= JSON.parse(JSON.stringify(puzzleTab[0]));
                let puzzle2= JSON.parse(JSON.stringify(puzzleTab[2]));
                puzzle.robotRow=4;
                puzzle.robotCol=11;
                puzzle2.robotCol=3;
                let C={"puzzle":puzzle,"stack":[[0,0]],"pc":[0,1],"num":0};
                let C2={"puzzle":puzzle2,"stack":[[0,1]],"pc":[0,1],"num":0};
                removeStar(C);
                removeStar(C2);
                expect(puzzle2.stars).toBe(3);
                expect(puzzle.stars).toBe(0);
    });
        test('test moveRobot',()=>{
                let puzzle= JSON.parse(JSON.stringify(puzzleTab[0]));
                let prog=solTab[0].sol;
                let C={"puzzle":puzzle,"prog":prog,"stack":[[0,0]],"pc":[0,0],"num":0};
                moveRobot(C,term);
                expect(puzzle.robotDir).toBe(0);

        });
        //
        test('test term',()=>{
            let puzzle= JSON.parse(JSON.stringify(puzzleTab[0]));
            let C={"puzzle":puzzle,"stack":[[0,0]],"pc":[0,1],"num":1};
            term(C);
            expect(puzzle.stars).toBe(1);
        });
        test('test executeProgOnPuzzle',()=>{
           
            let puzzle= JSON.parse(JSON.stringify(puzzleTab[0]));
            let prog=solTab[0].sol;
            let C={"puzzle":puzzle,"prog":prog,"stack":[[0,0]],"pc":[0,0],"num":0};
            executeProgOnPuzzle(C);
            expect(puzzle.stars).toBe(1);
        });
//
        test('test step',()=>{
            let puzzle= JSON.parse(JSON.stringify(puzzleTab[3]));
            let puzzle2= JSON.parse(JSON.stringify(puzzleTab[1]));
            let prog=solTab[3].sol;
            let prog2=solTab[0].sol;
            let C={"puzzle":puzzle,"prog":prog,"stack":[[0,0],[0,1],[0,2]],"pc":[0,3],"num":2};
            let C2={"puzzle":puzzle2,"prog":prog2,"stack":[[0,0]],"pc":[0,1],"num":2};
            let newpc=step(C);
            let newpc2=step(C2);
            let sol_test=[[["MOVE","BLUE"],["CALL_1","NO_COLOR"],["MOVE","GREEN"]]];
            let C3={"puzzle":puzzle2,"prog":sol_test,"stack":[[0,0],[0,0]],"pc":[0,2],"num":2};
            let newpc3=step(C3);
            expect(newpc[1]).toBe(0);
            expect(newpc[0]).toBe(0);
            expect(newpc2[1]).toBe(2);
            expect(newpc2[0]).toBe(0);
            expect(newpc3[0]).toBe(0);
            C3.stack=[[0,0]];
            let newpc4=step(C3);
            expect(newpc4[1]).toBe(-1);
        });
        //
      test('test of invalid instructions',()=>{
           
            let puzzle= JSON.parse(JSON.stringify(puzzleTab[0]));
            let inst=["MOVE","BLACK"];
            let inst1=[-1,'RED'];
            let prog=[[[]]];
            let error="";
            let C={"puzzle":puzzle,"prog":prog,"error":error,"stack":[[0,0]],"pc":[0,0],"num":0};
           
            let tmp3=verifyInstruction(C,inst);        
           
            expect(C["error"]).toBe('The instruction color is UNDEFINE');
                tmp3=verifyInstruction(C,inst1);   
               expect(C["error"]).toBe('The instruction move is UNDEFINE');     
               
                let good_inst=["MOVE","NO_COLOR"];
                tmp3=verifyInstruction(C,good_inst);
                expect(tmp3).toBe(true);
      });

test('test of invalid program',()=>{
           
    let puzzle= JSON.parse(JSON.stringify(puzzleTab[0]));
    let goodprog=solTab[0].sol;
    let error="NONE";
    //let prog2=[[["MOVE","NO_COLOR"],["MOVE","NO_COLOR"],["MOVE","NO_COLOR"],["MOVE","NO_COLOR"],["MOVE","NO_COLOR"],["MOVE","NO_COLOR"]]];
   
    let prog=[[["MOVE","NO_COLOR"],["MOVE","NO_COLOR"],["MOVE","NO_COLOR"],["MOVE","NO_COLOR"],["MOVE","NO_COLOR"],["MOVE","NO_COLOR"]],[],[],[],[], []];
   
    let C={"puzzle":puzzle,"prog":prog,"error":error,"stack":[[0,0]],"pc":[0,0],"num":0};
    let tmp=verifyProgram(C); 
    expect(C["error"]).toBe('excess functions in program');
    C={"puzzle":puzzle,"prog":[[["MOVE","NO_COLOR", "MOVE"]]],"error":error,"stack":[[0,0]],"pc":[0,0],"num":0};

    tmp=verifyProgram(C);
    expect(C["error"]).toBe('excess elements in instructions');


    C={"puzzle":puzzle,"prog":[[["MOVE","NO_COLOR", "MOVE"],["MOVE","NO_COLOR", "MOVE"],["MOVE","NO_COLOR", "MOVE"],["MOVE","NO_COLOR", "MOVE"],["MOVE","NO_COLOR", "MOVE"],["MOVE","NO_COLOR", "MOVE"],["MOVE","NO_COLOR", "MOVE"]]],"error":error,"stack":[[0,0]],"pc":[0,0],"num":0};

    tmp=verifyProgram(C);
    expect(C["error"]).toBe('excess instructions in functions');

    C["prog"]="aaaaa";
    expect(verifyProgram(C)).toBe(0);
    expect(C["error"]).toBe('Invalid program should be an array');

     C["prog"]=["aaaaa"];
    expect(verifyProgram(C)).toBe(false);
    expect(C["error"]).toBe('Invalid function in program should be an array');

     C["prog"]=[["aaaaa"]];
    expect(verifyProgram(C)).toBe(false);
    expect(C["error"]).toBe('Invalid instructions in function should be an array');
    
    C["prog"]=goodprog;
    tmp=verifyProgram(C);
    expect(tmp).toBe(true);
    
});

test('test of invalid puzzle',()=>{
           
    let puzzle= JSON.parse(JSON.stringify(puzzle_test));
    let prog=solTab[0].sol;
    let error="";
    let C={"puzzle":puzzle,"prog":prog,"error":error,"stack":[[0,0]],"pc":[0,0],"num":0};
    puzzle.id=-1;
    let tmp=verifyPuzzle(C);
    expect(tmp).toBe(0);
    puzzle.id=1;
    let tmp2=verifyPuzzle(C);
    
    expect(tmp2).toBe(0);
    
});


    test('test of display',()=>{
    let puzzle= JSON.parse(JSON.stringify(puzzle_test));
    display(puzzleTab[2]);
    display(puzzleTab[5]);
    display(puzzle);
    puzzle.robotDir=1;
    display(puzzle);    
    puzzle.robotDir=2;
    display(puzzle);
    puzzle.robotDir=3;
    display(puzzle);
    

          
});

	
});
