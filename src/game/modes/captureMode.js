export const CaptureMode = {
    applyMove(board, row, col, color) {
        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = color;
        return newBoard;
    }
}