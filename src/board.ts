import { Direction } from "./types/Direction";
import { Position } from "./types/Position";
import { Tile } from "./types/Tile";

export const move = (direction: Direction, board: number[][], currentPosition: Position): Position => {
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
        board[endPosition.x][endPosition.y] = board[currentPosition.x][currentPosition.y];
        board[currentPosition.x][currentPosition.y] = Tile.Empty;
        return endPosition;
    }

    return currentPosition;
};

const canMove = (board: number[][], endPosition: Position) => {
    try {
        return board[endPosition.x][endPosition.y] < 10;
    } catch (error) {
        return false;
    }
};
