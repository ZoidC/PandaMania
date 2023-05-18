import gsap from "gsap";
import { Direction } from "./types/Direction";
import { Position } from "./types/Position";
import { Tile } from "./types/Tile";

export const move = (
    direction: Direction,
    board: Tile[][],
    dom: HTMLTableCellElement[][],
    currentPosition: Position
): Position => {
    const endPosition = { x: currentPosition.x, y: currentPosition.y };
    switch (direction) {
        case Direction.Up:
            endPosition.x = endPosition.x - 1;
            break;
        case Direction.Right:
            endPosition.y = endPosition.y + 1;
            break;
        case Direction.Down:
            endPosition.x = endPosition.x + 1;
            break;
        case Direction.Left:
            endPosition.y = endPosition.y - 1;
            break;
        default:
    }

    if (canMove(board, endPosition)) {
        // Update Board JS
        board[endPosition.x][endPosition.y] = Tile.Character;
        board[currentPosition.x][currentPosition.y] = Tile.Empty;

        // Update Board HTML
        const tableCellEndPosition = dom[endPosition.x][endPosition.y].getBoundingClientRect();
        // Improvement : Check for a timeline gsap to not overlap each animation
        gsap.to(".character", {
            x: tableCellEndPosition.x,
            y: tableCellEndPosition.y,
            duration: 1,
        });

        return endPosition;
    }

    return currentPosition;
};

const canMove = (board: number[][], endPosition: Position) => {
    try {
        return board[endPosition.x][endPosition.y] <= Tile.Limit;
    } catch (error) {
        return false;
    }
};
