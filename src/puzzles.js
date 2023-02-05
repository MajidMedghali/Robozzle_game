
let solTab=[
    {
	id:1,
	sol:[[["MOVE", "NO_COLOR"], ["RIGHT", "RED"], ["CALL_1", "NO_COLOR"]]],
    },
    {
	id:2,
	sol:[[["MOVE", "NO_COLOR"], ["RIGHT", "RED"], ["LEFT", "GREEN"], ["CALL_1", "NO_COLOR"]]],
    },
    { id:3,
      sol:[[["MOVE" ,"NO_COLOR"], ["RIGHT", "RED"], ["CALL_1", "NO_COLOR"]]],
    },
    {
	id:4,
	sol:[[["MOVE", "NO_COLOR"], ["LEFT", "RED"], ["LEFT", "RED"], ["CALL_1", "NO_COLOR"]]],
    },
    {
	id:330,
        sol:[[["CALL_2", "NO_COLOR"], ["RIGHT", "NO_COLOR"], ["MOVE", "NO_COLOR"]], [["MOVE", "NO_COLOR"], ["RIGHT", "RED"], ["CALL_2", "BLUE"], ["MOVE", "NO_COLOR"]]],
    },
    {id:644,
     sol:[[["MOVE", "NO_COLOR"], ["LEFT", "GREEN"], ["CALL_2", "RED"], ["CALL_1", "NO_COLOR"]], [["RIGHT", "RED"], ["RIGHT", "GREEN"], ["MOVE", "NO_COLOR"], ["CALL_2", "NO_COLOR"]]]
    },
    {
	id:571,

        sol:[[["MOVE", "NO_COLOR"], ["LEFT", "GREEN"], ["RIGHT", "RED"], ["TURNRED", "GREEN"], ["CALL_1", "NO_COLOR"] ]]
    },
    {
	id:17,
        sol:[[["MOVE", "NO_COLOR"], ["LEFT", "NO_COLOR"], ["LEFT", "BLUE"], ["CALL_1", "NO_COLOR"]]]

    }
];


let puzzleTab=[
    {
    id:1,
    title:"puzzle1",
    stars:1,
    about:"",
    robotCol:3,
    robotRow:1,
    robotDir:0,
    subs:[3, 0, 0, 0, 0],
    
    board:['                ',
           '   bbbbbbbbr    ',
           '           b    ',
           '           b    ',
           '           B    ',
           '                ',
           '                ',
           '                ',
           '                ',
           '                ',
           '                ',
           '                ']
    
},
{
    id:2,
    stars:2,
    title:"puzzle2",
    about:"",
    robotCol:3,
    robotRow:1,
    robotDir:0,
    subs:[4, 0, 0, 0, 0],
    
    board:[ '                ',
            
            '   bbbbbbbbr    ',
            '           b    ',
            '           b    ',
            '           B    ',
            '      gbbbbr    ',
            '      b         ',
            '      b         ',
            '      B         ',
            '                ',
            '                ',
            '                ']
    
},
{
    id:3,
    stars:4,
    title:"puzzle3",
    about:"",
    robotCol:5,
    robotRow:3,
    robotDir:2,
    subs:[3, 0, 0, 0, 0],
    
    board:[ '                ',
            
            '   rbbbBbbbr    ',
            '   b       b    ',
            '   Rbb     B    ',
            '           b    ',
            '           R    ',
            '                ',
            '                ',
            '                ',
            '                ',
            '                ',
            '                ']
    
},
{
    id:4,
    title:"ssh",
    stars:1,
    about:"",
    robotCol:12,
    robotRow:3,
    robotDir:2,
    subs:[6, 0, 0, 0, 0],
    allowedCommands:0,
    board:[ '                ',
            '                ',
            '                ',
            ' rbbbbbbbbbbbbB ',
            '                ',
            '                ',
            '                ',
            '                ',
            '                ',
            '                ',
            '                ',
            '                ' ]
},
    {
    id:330,
    title:"Learning Stack",
    stars:1,
    about:"",
    robotCol:1,
    robotRow:11,
    robotDir:1,
    subs:[3, 5, 0, 0, 0],
    allowedCommands:0,
    board:[
            ' rbbbbbbbbbbb   ',
            ' b          B   ',
            ' b              ',
            ' b              ',
            ' b              ',
            ' b              ',
            ' b              ',
            ' b              ',
            ' b              ',
            ' b              ',
            ' b              ',
            ' b              ']
},
{
    id:644,
    title:"Right On Red",
    about:"",
    robotCol:7,
    robotRow:6,
    robotDir:0,
    stars:2,
    subs:[5, 4, 0, 0, 0],
    allowedCommands:0,
    board:[ '                ',
            '                ',
            '                ',
            '     gbbbbbbg   ',
            '     b      b   ',
            '     b      b   ',
            '     b bbbbbg   ',
            '     b          ',
            '   B Grg        ',
            '   b  b         ',
            '   gbbg         ',
            '                ' ]
},
     {
    id:571,
    title:"Bumbling Bee",
    stars:21,
    about:"",
    robotCol:0,
    robotRow:5,
    robotDir:0,
    subs:[5, 0, 0, 0, 0],
    
    board:['                ',
           '                ',
           '                ',
           '                ',
           '    GG GG GG GG ',
           'bbbbbGbbGbbGbbGB',
           '    GG GG GG GG ',
           '                ',
           '                ',
           '                ',
           '                ',
           '                ']
    
},
     {
    id:17,
    title:"The star-studded path I",
    stars:44,
    about:"",
    robotCol:3,
    robotRow:11,
    robotDir:1,
    subs:[4, 0, 0, 0, 0],
    
    board:['      ggg ggg   ',
           '   gggRRRgRRRg  ',
           '  gRRRRbRRRbRg  ',
           '  gRbbbbbbbbRg  ',
           '  gRbbbbbbbbRg  ',
           '  gRRRRRRRbbRg  ',
           '   ggggggrbbRg  ',
           '    bbb    bRg  ',
           '  bbRRRb   bRg  ',
           '  bRRgRbbbbbRg  ',
           '  bRggRRRRRRRg  ',
           '  brggggggggg   ']
    
}
];



//return puzzle from id number_puzzles
function getPuzzleFrmId(id,tab) {
    if(tab.length===0 )
	return puzzleTab[0];
    if( tab[0].id === id) {
        return tab[0];
    }
    return getPuzzleFrmId(id, tab.slice(1, tab.length));//default
}


//return puzzle from name
function getPuzzleFrmName(name) {
    let j=0;
    puzzleTab.forEach((x,i)=>{ if(name === x.title)
                               {j=i;}});
    return puzzleTab[j];//par defaut
}

export {getPuzzleFrmId,getPuzzleFrmName,puzzleTab, solTab} ;

