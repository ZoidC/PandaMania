import gsap from "gsap";
import { move } from "./board";
import { BARREL, CHARACTER } from "./constants";
import { Direction } from "./types/Direction";
import { Position } from "./types/Position";
import { Tile } from "./types/Tile";

// Board JS

let characterPosition: Position;

const boardArray: Tile[][] = [
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

const domArray: HTMLTableCellElement[][] = [];

// Board HTML

const board = document.getElementById("board");

const createBoard = (boardArray: number[][]) => {
    // Character
    const character = document.createElement("img");
    character.classList.add(CHARACTER);
    character.src = "/resources/" + CHARACTER + ".png";
    board?.appendChild(character);

    // Board
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");

    for (let x = 0; x < boardArray.length; x++) {
        const row = document.createElement("tr");
        domArray.push([]);

        for (let y = 0; y < boardArray[x].length; y++) {
            const tile = document.createElement("td");
            tile.classList.add("tile");

            let specificTile;
            switch (boardArray[x][y]) {
                case 100:
                    characterPosition = { x, y };
                    break;
                case 101:
                    specificTile = BARREL;
                    break;
                default:
            }

            if (specificTile) {
                const img = document.createElement("img");
                img.classList.add(specificTile);
                img.src = "/resources/" + specificTile + ".png";
                tile.appendChild(img);
            }

            row.appendChild(tile);
            domArray[x].push(tile);
        }

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    board?.appendChild(table);

    // Position Character
    const characterPositionDom = domArray[characterPosition.x][characterPosition.y].getBoundingClientRect();
    gsap.set(`.${CHARACTER}`, {
        x: characterPositionDom.x,
        y: characterPositionDom.y,
    });
};

createBoard(boardArray);

// Controllers

const upController = document.getElementById("up");
const rightController = document.getElementById("right");
const downController = document.getElementById("down");
const leftController = document.getElementById("left");

document.onkeydown = function (e) {
    switch (e.code) {
        case "ArrowUp":
        case "KeyW":
            characterPosition = move(Direction.Up, boardArray, domArray, characterPosition);
            break;
        case "ArrowRight":
        case "KeyE":
        case "KeyD":
            characterPosition = move(Direction.Right, boardArray, domArray, characterPosition);
            break;
        case "ArrowDown":
        case "KeyS":
            characterPosition = move(Direction.Down, boardArray, domArray, characterPosition);
            break;
        case "ArrowLeft":
        case "KeyQ":
        case "KeyA":
            characterPosition = move(Direction.Left, boardArray, domArray, characterPosition);
            break;
        default:
    }
};

upController?.addEventListener("click", () => {
    characterPosition = move(Direction.Up, boardArray, domArray, characterPosition);
});
rightController?.addEventListener("click", () => {
    characterPosition = move(Direction.Right, boardArray, domArray, characterPosition);
});
downController?.addEventListener("click", () => {
    characterPosition = move(Direction.Down, boardArray, domArray, characterPosition);
});
leftController?.addEventListener("click", () => {
    characterPosition = move(Direction.Left, boardArray, domArray, characterPosition);
});
