export class GameEngine {
    constructor(mode) {
        this.mode = mode;
    }

    handleMove(board, row, col, playerColor) {
        return this.mode.applyMove(board, row, col, playerColor);
    }
}