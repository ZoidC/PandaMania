import { move } from "./board";
import { BARREL, CHARACTER } from "./constants/index";
import { Direction } from "./types/Direction";
import { Position } from "./types/Position";

const boardArray = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [BARREL,0,0,0,0,0,0,0,CHARACTER]
];

const getCharacterPosition = (boardArray: number[][]): Position => {
    let pos: Position = { x: -1, y: -1 };
    for(let x = 0; x < boardArray.length; x++) {
        if (boardArray[x].indexOf(CHARACTER) != -1) {
            pos = { x, y: boardArray[x].indexOf(CHARACTER) };
            break;
        }
    }
    return pos;
};

let characterPosition = getCharacterPosition(boardArray);

const board = document.getElementById('board');
const upController = document.getElementById('up');
const rightController = document.getElementById('right');
const downController = document.getElementById('down');
const leftController = document.getElementById('left');

const createBoard = (boardArray: number[][]) => {

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    for (let x = 0; x < boardArray.length; x++) {
        const row = document.createElement('tr');

        for (let y = 0; y < boardArray[x].length; y++) {
            const cell = document.createElement('td');
            const tile = document.createElement('div');
            switch (boardArray[x][y]) {
            case 0:
                tile.classList.add("tile");
                break;
            case 100:
                tile.classList.add("tile", "character");
                break;
            case 101:
                tile.classList.add("tile", "barrel");
                break;
            default:
            }
            cell.appendChild(tile);
            row.appendChild(cell);
        }

        tbody.appendChild(row);
    }

    table.appendChild(tbody);

    board?.appendChild(table);
};

createBoard(boardArray);

upController?.addEventListener("click", () => {
    characterPosition = move(Direction.Up, boardArray, characterPosition);
    boardRefresh();
});
rightController?.addEventListener("click", () => {
    characterPosition = move(Direction.Right, boardArray, characterPosition);
    boardRefresh();
});
downController?.addEventListener("click", () => {
    characterPosition = move(Direction.Down, boardArray, characterPosition);
    boardRefresh();
});
leftController?.addEventListener("click", () => {
    characterPosition = move(Direction.Left, boardArray, characterPosition);
    boardRefresh();
});

const boardRefresh = () => {
    const table = board?.querySelector('table');
    if (table) board?.removeChild(table);
    createBoard(boardArray);
};
