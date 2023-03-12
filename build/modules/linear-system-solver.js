export class LinearSystemSolver {
    constructor(matrix, vector) {
        this.matrix = matrix;
        this.vector = vector;
        this.tolerance = 0.0001;
    }
    solve() {
        const result = [];
        const size = this.vector.length;
        for (let i = 0; i < size; i++) {
            result[i] = this.vector[i] / this.matrix[i][i];
        }
        const Xn = [];
        do {
            for (let i = 0; i < size; i++) {
                Xn[i] = this.vector[i] / this.matrix[i][i];
                for (let j = 0; j < size; j++) {
                    if (i === j) {
                        continue;
                    }
                    else {
                        Xn[i] -= (this.matrix[i][j] / this.matrix[i][i]) * result[j];
                    }
                }
            }
            let flag = true;
            for (let i = 0; i < size - 1; i++) {
                if (Math.abs(Xn[i] - result[i]) > this.tolerance) {
                    flag = false;
                    break;
                }
            }
            for (let i = 0; i < size; i++) {
                result[i] = Xn[i];
            }
            if (flag) {
                break;
            }
        } while (1);
        return result;
    }
}
//# sourceMappingURL=linear-system-solver.js.map