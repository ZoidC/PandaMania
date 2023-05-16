import { move } from "./board";
import { Direction } from "./types/Direction";
import { Position } from "./types/Position";
import { Tile } from "./types/Tile";

// Board Init

const boardArray = [
    [
        Tile.Barrel,
        Tile.Barrel,
        Tile.Barrel,
        Tile.Barrel,
        Tile.Barrel,
        Tile.Barrel,
        Tile.Barrel,
        Tile.Barrel,
        Tile.Barrel,
    ],
    [Tile.Barrel, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Barrel],
    [Tile.Barrel, Tile.Empty, Tile.Barrel, Tile.Barrel, Tile.Empty, Tile.Barrel, Tile.Barrel, Tile.Empty, Tile.Barrel],
    [Tile.Barrel, Tile.Empty, Tile.Barrel, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Barrel, Tile.Empty, Tile.Barrel],
    [Tile.Barrel, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Barrel, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Barrel],
    [Tile.Barrel, Tile.Empty, Tile.Barrel, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Barrel, Tile.Empty, Tile.Barrel],
    [Tile.Barrel, Tile.Empty, Tile.Barrel, Tile.Barrel, Tile.Empty, Tile.Barrel, Tile.Barrel, Tile.Empty, Tile.Barrel],
    [Tile.Barrel, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Character, Tile.Barrel],
    [
        Tile.Barrel,
        Tile.Barrel,
        Tile.Barrel,
        Tile.Barrel,
        Tile.Barrel,
        Tile.Barrel,
        Tile.Barrel,
        Tile.Barrel,
        Tile.Barrel,
    ],
];

const getCharacterPosition = (boardArray: number[][]): Position => {
    let pos: Position = { x: -1, y: -1 };
    for (let x = 0; x < boardArray.length; x++) {
        if (boardArray[x].indexOf(Tile.Character) != -1) {
            pos = { x, y: boardArray[x].indexOf(Tile.Character) };
            break;
        }
    }
    return pos;
};

let characterPosition = getCharacterPosition(boardArray);

// HTML

const board = document.getElementById("board");
const upController = document.getElementById("up");
const rightController = document.getElementById("right");
const downController = document.getElementById("down");
const leftController = document.getElementById("left");

const createBoard = (boardArray: number[][]) => {
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");

    for (let x = 0; x < boardArray.length; x++) {
        const row = document.createElement("tr");

        for (let y = 0; y < boardArray[x].length; y++) {
            const cell = document.createElement("td");
            const tile = document.createElement("div");
            tile.classList.add("tile");

            let specificTile;
            switch (boardArray[x][y]) {
                case 100:
                    specificTile = "character";
                    break;
                case 101:
                    specificTile = "barrel";
                    break;
                default:
            }

            if (specificTile) {
                const img = document.createElement("img");
                img.src = "/resources/" + specificTile + ".png";
                tile.appendChild(img);
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

const listenToKeyboard = () => {
    document.onkeydown = function (e) {
        switch (e.code) {
            case "ArrowUp":
            case "KeyW":
                characterPosition = move(Direction.Up, boardArray, characterPosition);
                boardRefresh();
                break;
            case "ArrowRight":
            case "KeyE":
            case "KeyD":
                characterPosition = move(Direction.Right, boardArray, characterPosition);
                boardRefresh();
                break;
            case "ArrowDown":
            case "KeyS":
                characterPosition = move(Direction.Down, boardArray, characterPosition);
                boardRefresh();
                break;
            case "ArrowLeft":
            case "KeyQ":
            case "KeyA":
                characterPosition = move(Direction.Left, boardArray, characterPosition);
                boardRefresh();
                break;
            default:
        }
    };
};

listenToKeyboard();

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
    const table = board?.querySelector("table");
    if (table) board?.removeChild(table);
    createBoard(boardArray);
};
